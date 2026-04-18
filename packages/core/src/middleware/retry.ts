import type { Middleware, SDKRequest, SDKResponse } from '../types/config.js';
import type { RetryConfig } from '../types/config.js';
import { ZConnectError } from '../errors/base.js';

interface RetryOptions extends RetryConfig {
  maxAttempts?: number;
  backoff?: 'linear' | 'exponential';
  initialDelay?: number;
}

export function withRetry(options: RetryOptions = {}): Middleware {
  const {
    maxAttempts = 3,
    backoff = 'exponential',
    initialDelay = 1000,
  } = options;

  return async (
    request: SDKRequest,
    next: (request: SDKRequest) => Promise<SDKResponse<unknown>>,
  ): Promise<SDKResponse<unknown>> => {
    let lastError: Error;
    let delay = initialDelay;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        return await next(request);
      } catch (error) {
        lastError = error as Error;

        // Don't retry on client errors (4xx) except 429
        if (error instanceof ZConnectError && 
            'statusCode' in error && 
            (error as any).statusCode >= 400 && 
            (error as any).statusCode < 500 &&
            (error as any).statusCode !== 429) {
          throw error;
        }

        // Don't retry on last attempt
        if (attempt === maxAttempts) {
          throw error;
        }

        // Wait before retrying
        await new Promise((resolve) => setTimeout(resolve, delay));

        // Calculate next delay
        if (backoff === 'exponential') {
          delay *= 2;
        } else {
          delay += initialDelay;
        }
      }
    }

    throw lastError!;
  };
}
