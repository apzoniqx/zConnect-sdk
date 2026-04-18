import type { ZConnectClient } from '@apzoniqx/sdk-core';
import type { ListListingsInput } from '../types/input.js';
import type { ListingsListResponse } from '../types/output.js';

export async function listListings(
  client: ZConnectClient,
  input: ListListingsInput = {},
): Promise<ListingsListResponse> {
  return client.get<ListingsListResponse>('/api/v1/listings', { query: input });
}
