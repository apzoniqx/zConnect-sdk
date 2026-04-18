import type { ZConnectClient } from '@zoniqx/sdk-core';
import type { CreateConnectionInput } from '../types/input.js';
import type { Connection } from '../types/output.js';

export async function createConnection(
  client: ZConnectClient,
  input: CreateConnectionInput,
): Promise<Connection> {
  return client.post<Connection>('/api/v1/connections', input);
}
