import type { ZConnectClient } from '@apzoniqx/sdk-core';
import type { UpdateListingInput } from '../types/input.js';
import type { Listing } from '../types/output.js';

export async function updateListing(
  client: ZConnectClient,
  id: string,
  input: UpdateListingInput,
): Promise<Listing> {
  return client.patch<Listing>(`/api/v1/listings/${id}`, input);
}
