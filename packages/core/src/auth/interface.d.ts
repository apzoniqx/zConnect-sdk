import type { AuthProvider } from '../types/config.js';
export { AuthProvider };
export declare class ApiKeyAuth implements AuthProvider {
    private apiKey;
    constructor(apiKey: string);
    resolveHeaders(): Promise<Record<string, string>>;
}
export declare class BearerAuth implements AuthProvider {
    private token;
    constructor(token: string);
    resolveHeaders(): Promise<Record<string, string>>;
}
//# sourceMappingURL=interface.d.ts.map