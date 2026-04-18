import type { ClientConfig, SDKRequest, SDKResponse } from './types/config.js';
import { NativeFetchTransport } from './transport/http.js';
import { compose } from './middleware/pipeline.js';
import { withLogger } from './middleware/logger.js';
import { withRetry } from './middleware/retry.js';
import { withRateLimit } from './middleware/rate-limit.js';
import { withIdempotencyKey } from './middleware/idempotency.js';
import { ZConnectError, ApiError, NetworkError } from './errors/base.js';

export class ZConnectClient {
  private transport: NativeFetchTransport;
  private defaultMiddlewares: ReturnType<typeof compose>;

  constructor(config: ClientConfig) {
    const {
      baseUrl,
      auth,
      tenantId,
      organizationId,
      headers: customHeaders,
      timeout = 30000,
      retries = {},
      middlewares = [],
    } = config;

    this.transport = new NativeFetchTransport(baseUrl, timeout);

    // Build middleware pipeline
    const defaultMiddlewares = [
      withLogger(),
      withRetry(retries),
      withRateLimit(),
      withIdempotencyKey(),
      ...middlewares,
    ];

    this.defaultMiddlewares = compose(...defaultMiddlewares);

    // Store config for request building
    this.config = {
      baseUrl,
      auth,
      tenantId,
      organizationId,
      headers: customHeaders,
    };
  }

  private config: {
    baseUrl: string;
    auth: ClientConfig['auth'];
    tenantId?: string;
    organizationId?: string;
    headers?: Record<string, string>;
  };

  async request<T>(
    method: string,
    path: string,
    options: {
      body?: unknown;
      query?: Record<string, string | number | boolean | undefined>;
      headers?: Record<string, string>;
    } = {},
  ): Promise<T> {
    const { body, query, headers: customHeaders } = options;

    // Resolve auth headers
    const authHeaders = await this.config.auth.resolveHeaders();

    // Build request
    const request: SDKRequest = {
      method,
      path,
      headers: {
        ...this.config.headers,
        ...customHeaders,
        ...authHeaders,
        ...(this.config.tenantId && { 'x-tenant-id': this.config.tenantId }),
        ...(this.config.organizationId && {
          'x-organization-id': this.config.organizationId,
        }),
      },
      body,
      query,
    };

    try {
      const response = await this.defaultMiddlewares(request, (req) =>
        this.transport.request<T>(req),
      );
      return response.data as T;
    } catch (error) {
      if (error instanceof ZConnectError) {
        throw error;
      }
      if (error instanceof Error && 'statusCode' in error) {
        throw new ApiError(
          error.message,
          (error as any).statusCode,
          (error as any).requestId,
        );
      }
      throw new NetworkError(error instanceof Error ? error.message : 'Network error');
    }
  }

  get<T>(path: string, options?: Parameters<typeof this.request>[2]): Promise<T> {
    return this.request<T>('GET', path, options);
  }

  post<T>(
    path: string,
    body?: unknown,
    options?: Omit<Parameters<typeof this.request>[2], 'body'>,
  ): Promise<T> {
    return this.request<T>('POST', path, { ...options, body });
  }

  put<T>(
    path: string,
    body?: unknown,
    options?: Omit<Parameters<typeof this.request>[2], 'body'>,
  ): Promise<T> {
    return this.request<T>('PUT', path, { ...options, body });
  }

  patch<T>(
    path: string,
    body?: unknown,
    options?: Omit<Parameters<typeof this.request>[2], 'body'>,
  ): Promise<T> {
    return this.request<T>('PATCH', path, { ...options, body });
  }

  delete<T>(path: string, options?: Parameters<typeof this.request>[2]): Promise<T> {
    return this.request<T>('DELETE', path, options);
  }
}
