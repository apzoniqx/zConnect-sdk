import type { ZConnectClient } from '@zoniqx/sdk-core';
import type { Connection } from '../types/output.js';

export async function rejectConnection(
  client: ZConnectClient,
  connectionId: string,
): Promise<Connection> {
  return client.patch<Connection>(`/api/v1/connections/${connectionId}/reject`, null);
}
