import type { SDKRequest, SDKResponse } from "../types/config.js";
export interface HttpTransport {
    request<T>(req: SDKRequest): Promise<SDKResponse<T>>;
}
export declare class NativeFetchTransport implements HttpTransport {
    private baseUrl;
    private timeout;
    constructor(baseUrl: string, timeout?: number);
    request<T>(req: SDKRequest): Promise<SDKResponse<T>>;
    private handleError;
}
//# sourceMappingURL=http.d.ts.map