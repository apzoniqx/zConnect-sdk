import type { Middleware, SDKRequest, SDKResponse } from '../types/config.js';

export function withLogger(): Middleware {
  return async (
    request: SDKRequest,
    next: (request: SDKRequest) => Promise<SDKResponse<unknown>>,
  ): Promise<SDKResponse<unknown>> => {
    const start = Date.now();
    console.log(`[ZConnect] ${request.method} ${request.path}`);

    try {
      const response = await next(request);
      const duration = Date.now() - start;
      console.log(
        `[ZConnect] ${request.method} ${request.path} - ${response.requestId || 'no-id'} (${duration}ms)`,
      );
      return response;
    } catch (error) {
      const duration = Date.now() - start;
      console.error(
        `[ZConnect] ${request.method} ${request.path} - Error (${duration}ms):`,
        error,
      );
      throw error;
    }
  };
}
