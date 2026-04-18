import type { Middleware, SDKRequest, SDKResponse } from '../types/config.js';

interface RateLimitOptions {
  rps?: number;
}

export function withRateLimit(options: RateLimitOptions = {}): Middleware {
  const { rps = 20 } = options;
  const requests: number[] = [];

  return async (
    request: SDKRequest,
    next: (request: SDKRequest) => Promise<SDKResponse<unknown>>,
  ): Promise<SDKResponse<unknown>> => {
    const now = Date.now();
    const oneSecondAgo = now - 1000;

    // Remove requests older than 1 second
    while (requests.length > 0 && requests[0] < oneSecondAgo) {
      requests.shift();
    }

    // Check if we've exceeded the rate limit
    if (requests.length >= rps) {
      const oldestRequest = requests[0];
      const waitTime = 1000 - (now - oldestRequest);
      await new Promise((resolve) => setTimeout(resolve, waitTime));
    }

    requests.push(now);
    return next(request);
  };
}
