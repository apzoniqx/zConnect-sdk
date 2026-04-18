import type { ZConnectClient } from '@apzoniqx/sdk-core';

export async function deleteListing(
  client: ZConnectClient,
  id: string,
): Promise<void> {
  return client.delete<void>(`/api/v1/listings/${id}`);
}
