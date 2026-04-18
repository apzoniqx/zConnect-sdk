import type { ClientConfig } from './types/config.js';
export declare class ZConnectClient {
    private transport;
    private defaultMiddlewares;
    constructor(config: ClientConfig);
    private config;
    request<T>(method: string, path: string, options?: {
        body?: unknown;
        query?: Record<string, string | number | boolean | undefined>;
        headers?: Record<string, string>;
    }): Promise<T>;
    get<T>(path: string, options?: Parameters<typeof this.request>[2]): Promise<T>;
    post<T>(path: string, body?: unknown, options?: Omit<Parameters<typeof this.request>[2], 'body'>): Promise<T>;
    put<T>(path: string, body?: unknown, options?: Omit<Parameters<typeof this.request>[2], 'body'>): Promise<T>;
    patch<T>(path: string, body?: unknown, options?: Omit<Parameters<typeof this.request>[2], 'body'>): Promise<T>;
    delete<T>(path: string, options?: Parameters<typeof this.request>[2]): Promise<T>;
}
//# sourceMappingURL=client.d.ts.map