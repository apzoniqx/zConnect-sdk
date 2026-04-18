import type { AuthProvider } from '../types/config.js';

export { AuthProvider };

export class ApiKeyAuth implements AuthProvider {
  constructor(private apiKey: string) {}

  async resolveHeaders(): Promise<Record<string, string>> {
    return {
      'X-API-Key': this.apiKey,
    };
  }
}

export class BearerAuth implements AuthProvider {
  constructor(private token: string) {}

  async resolveHeaders(): Promise<Record<string, string>> {
    return {
      Authorization: `Bearer ${this.token}`,
    };
  }
}
