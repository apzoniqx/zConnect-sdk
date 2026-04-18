import type { ZConnectClient } from '@apzoniqx/sdk-core';
import type { SyncFromDealInput } from '../types/input.js';
import type { Listing } from '../types/output.js';

export async function syncFromDeal(
  client: ZConnectClient,
  input: SyncFromDealInput,
): Promise<Listing> {
  const { dealId, role } = input;
  return client.post<Listing>(`/api/v1/listings/sync/${dealId}`, null, {
    headers: { role },
  });
}
