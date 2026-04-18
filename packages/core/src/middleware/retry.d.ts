import type { Middleware } from '../types/config.js';
import type { RetryConfig } from '../types/config.js';
interface RetryOptions extends RetryConfig {
    maxAttempts?: number;
    backoff?: 'linear' | 'exponential';
    initialDelay?: number;
}
export declare function withRetry(options?: RetryOptions): Middleware;
export {};
//# sourceMappingURL=retry.d.ts.map