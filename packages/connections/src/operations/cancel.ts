import type { ZConnectClient } from '@zoniqx/sdk-core';

export async function cancelConnection(
  client: ZConnectClient,
  connectionId: string,
): Promise<void> {
  return client.delete<void>(`/api/v1/connections/${connectionId}`);
}
