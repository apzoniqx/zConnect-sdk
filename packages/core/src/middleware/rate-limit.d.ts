import type { Middleware } from '../types/config.js';
interface RateLimitOptions {
    rps?: number;
}
export declare function withRateLimit(options?: RateLimitOptions): Middleware;
export {};
//# sourceMappingURL=rate-limit.d.ts.map