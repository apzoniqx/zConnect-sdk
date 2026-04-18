export interface ClientConfig {
    baseUrl: string;
    auth: AuthProvider;
    tenantId?: string;
    organizationId?: string;
    headers?: Record<string, string>;
    timeout?: number;
    retries?: RetryConfig;
    middlewares?: Middleware[];
}
export interface RetryConfig {
    maxAttempts?: number;
    backoff?: 'linear' | 'exponential';
    initialDelay?: number;
}
export interface AuthProvider {
    resolveHeaders(): Promise<Record<string, string>>;
}
export interface SDKRequest {
    method: string;
    path: string;
    headers?: Record<string, string>;
    body?: unknown;
    query?: Record<string, string | number | boolean | undefined>;
}
export interface SDKResponse<T> {
    data: T;
    requestId?: string;
}
export type Middleware = (request: SDKRequest, next: (request: SDKRequest) => Promise<SDKResponse<unknown>>) => Promise<SDKResponse<unknown>>;
//# sourceMappingURL=config.d.ts.map