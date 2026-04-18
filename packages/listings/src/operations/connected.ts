import type { ZConnectClient } from '@zoniqx/sdk-core';
import type { GetConnectedIssuersListingsInput } from '../types/input.js';
import type { ListingsListResponse } from '../types/output.js';

export async function getConnectedIssuersListings(
  client: ZConnectClient,
  input: GetConnectedIssuersListingsInput = {},
): Promise<ListingsListResponse> {
  return client.get<ListingsListResponse>('/api/v1/listings/connected', {
    query: input,
  });
}
