import type { SDKRequest, SDKResponse } from "../types/config.js";

export interface HttpTransport {
  request<T>(req: SDKRequest): Promise<SDKResponse<T>>;
}

export class NativeFetchTransport implements HttpTransport {
  constructor(private baseUrl: string, private timeout: number = 30000) {}

  async request<T>(req: SDKRequest): Promise<SDKResponse<T>> {
    const url = new URL(req.path, this.baseUrl);

    if (req.query) {
      Object.entries(req.query).forEach(([key, value]) => {
        if (value !== undefined) {
          url.searchParams.set(key, String(value));
        }
      });
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url.toString(), {
        method: req.method,
        headers: {
          "Content-Type": "application/json",
          ...req.headers,
        },
        body: req.body ? JSON.stringify(req.body) : undefined,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const requestId = response.headers.get("X-Request-ID") || undefined;

      if (!response.ok) {
        throw await this.handleError(response, requestId);
      }

      const data = (await response.json()) as T;
      return { data, requestId };
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  private async handleError(
    response: Response,
    requestId?: string,
  ): Promise<Error> {
    const body = await response.text();
    const message = body || response.statusText;

    const error: any = new Error(message);
    error.statusCode = response.status;
    error.requestId = requestId;

    if (response.status === 401 || response.status === 403) {
      error.name = "AuthError";
    } else if (response.status === 404) {
      error.name = "NotFoundError";
    } else if (response.status === 429) {
      error.name = "RateLimitError";
      error.retryAfter = response.headers.get("Retry-After");
    } else {
      error.name = "ApiError";
    }

    return error;
  }
}
