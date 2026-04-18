export declare class ZConnectError extends Error {
    readonly requestId?: string;
    constructor(message: string, requestId?: string);
}
export declare class ApiError extends ZConnectError {
    readonly statusCode: number;
    readonly errorCode?: string;
    constructor(message: string, statusCode: number, requestId?: string, errorCode?: string);
}
export declare class AuthError extends ApiError {
    constructor(message: string, statusCode: number, requestId?: string);
}
export declare class NotFoundError extends ApiError {
    constructor(message: string, requestId?: string);
}
export declare class RateLimitError extends ApiError {
    readonly retryAfter?: number;
    constructor(message: string, requestId?: string, retryAfter?: string);
}
export declare class NetworkError extends ZConnectError {
    constructor(message: string, requestId?: string);
}
//# sourceMappingURL=base.d.ts.map