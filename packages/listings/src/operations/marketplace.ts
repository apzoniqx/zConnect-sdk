import type { ZConnectClient } from '@apzoniqx/sdk-core';
import type { GetMarketplaceInput } from '../types/input.js';
import type { MarketplaceListing } from '../types/output.js';

export async function getMarketplaceListings(
  client: ZConnectClient,
  input: GetMarketplaceInput = {},
): Promise<MarketplaceListing[]> {
  return client.get<MarketplaceListing[]>('/api/v1/listings/marketplace', {
    query: input,
  });
}
