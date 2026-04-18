import type { ZConnectClient } from '@zoniqx/sdk-core';
import type { ListConnectionsInput } from '../types/input.js';
import type { ConnectionsListResponse, Connection } from '../types/output.js';

export async function getConnections(
  client: ZConnectClient,
  input: ListConnectionsInput = {},
): Promise<ConnectionsListResponse> {
  return client.get<ConnectionsListResponse>('/api/v1/connections', { query: input });
}

export async function getConnection(
  client: ZConnectClient,
  connectionId: string,
): Promise<Connection> {
  return client.get<Connection>(`/api/v1/connections/${connectionId}`);
}
