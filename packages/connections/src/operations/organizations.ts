import type { ZConnectClient } from '@zoniqx/sdk-core';
import type { ListOrganizationsInput } from '../types/input.js';
import type { OrganizationWithConnectionStatus } from '../types/output.js';

export async function getOrganizationsWithConnectionStatus(
  client: ZConnectClient,
  input: ListOrganizationsInput = {},
): Promise<OrganizationWithConnectionStatus[]> {
  return client.get<OrganizationWithConnectionStatus[]>(
    '/api/v1/connections/organizations',
    { query: input },
  );
}

export async function getOrganizationWithConnectionStatus(
  client: ZConnectClient,
  orgId: string,
): Promise<OrganizationWithConnectionStatus> {
  return client.get<OrganizationWithConnectionStatus>(
    `/api/v1/connections/organizations/${orgId}`,
  );
}
