export class ZConnectError extends Error {
  public readonly requestId?: string;

  constructor(message: string, requestId?: string) {
    super(message);
    this.name = 'ZConnectError';
    this.requestId = requestId;
  }
}

export class ApiError extends ZConnectError {
  public readonly statusCode: number;
  public readonly errorCode?: string;

  constructor(
    message: string,
    statusCode: number,
    requestId?: string,
    errorCode?: string,
  ) {
    super(message, requestId);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.errorCode = errorCode;
  }
}

export class AuthError extends ApiError {
  constructor(message: string, statusCode: number, requestId?: string) {
    super(message, statusCode, requestId);
    this.name = 'AuthError';
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string, requestId?: string) {
    super(message, 404, requestId);
    this.name = 'NotFoundError';
  }
}

export class RateLimitError extends ApiError {
  public readonly retryAfter?: number;

  constructor(
    message: string,
    requestId?: string,
    retryAfter?: string,
  ) {
    super(message, 429, requestId);
    this.name = 'RateLimitError';
    if (retryAfter) {
      this.retryAfter = parseInt(retryAfter, 10);
    }
  }
}

export class NetworkError extends ZConnectError {
  constructor(message: string, requestId?: string) {
    super(message, requestId);
    this.name = 'NetworkError';
  }
}
