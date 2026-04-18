import type { ZConnectClient } from '@apzoniqx/sdk-core';
import type { Listing } from '../types/output.js';

export async function getListing(
  client: ZConnectClient,
  id: string,
): Promise<Listing> {
  return client.get<Listing>(`/api/v1/listings/${id}`);
}
