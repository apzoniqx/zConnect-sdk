import type { Middleware, SDKRequest, SDKResponse } from '../types/config.js';

export function withIdempotencyKey(): Middleware {
  return async (
    request: SDKRequest,
    next: (request: SDKRequest) => Promise<SDKResponse<unknown>>,
  ): Promise<SDKResponse<unknown>> => {
    // Auto-inject idempotency key for POST/PUT/PATCH operations
    if (
      ['POST', 'PUT', 'PATCH'].includes(request.method) &&
      !request.headers?.['X-Idempotency-Key']
    ) {
      request.headers = {
        ...request.headers,
        'X-Idempotency-Key': crypto.randomUUID(),
      };
    }

    return next(request);
  };
}
