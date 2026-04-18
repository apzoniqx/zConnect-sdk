import type { ZConnectClient } from '@zoniqx/sdk-core';
import type { CreateOrganizationInput, UpdateOrganizationInput, ListOrganizationsInput } from '../types/input.js';
import type { Organization, OrganizationsListResponse } from '../types/output.js';

export async function createOrganization(
  client: ZConnectClient,
  input: CreateOrganizationInput,
): Promise<Organization> {
  return client.post<Organization>('/api/v1/organizations', input);
}

export async function getOrganizations(
  client: ZConnectClient,
  input: ListOrganizationsInput = {},
): Promise<OrganizationsListResponse> {
  return client.get<OrganizationsListResponse>('/api/v1/organizations', { query: input });
}

export async function getOrganization(
  client: ZConnectClient,
  id: string,
): Promise<Organization> {
  return client.get<Organization>(`/api/v1/organizations/${id}`);
}

export async function updateOrganization(
  client: ZConnectClient,
  id: string,
  input: UpdateOrganizationInput,
): Promise<Organization> {
  return client.put<Organization>(`/api/v1/organizations/${id}`, input);
}

export async function deleteOrganization(
  client: ZConnectClient,
  id: string,
): Promise<void> {
  return client.delete<void>(`/api/v1/organizations/${id}`);
}

export async function getMyOrganization(
  client: ZConnectClient,
): Promise<Organization> {
  return client.get<Organization>('/api/v1/organizations/me');
}
