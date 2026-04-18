import type { ZConnectClient } from '@zoniqx/sdk-core';
import type { CreateListingInput } from '../types/input.js';
import type { Listing } from '../types/output.js';

export async function createListing(
  client: ZConnectClient,
  input: CreateListingInput,
): Promise<Listing> {
  return client.post<Listing>('/api/v1/listings', input);
}
