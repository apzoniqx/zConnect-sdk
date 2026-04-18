import type { ZConnectClient } from '@apzoniqx/sdk-core';
import type { ListIssuersInput } from '../types/input.js';
import type { IssuerWithConnectionStatus } from '../types/output.js';

export async function getIssuersWithConnectionStatus(
  client: ZConnectClient,
  input: ListIssuersInput = {},
): Promise<IssuerWithConnectionStatus[]> {
  return client.get<IssuerWithConnectionStatus[]>('/api/v1/connections/issuers', {
    query: input,
  });
}

export async function getIssuerWithConnectionStatus(
  client: ZConnectClient,
  issuerId: string,
): Promise<IssuerWithConnectionStatus> {
  return client.get<IssuerWithConnectionStatus>(
    `/api/v1/connections/issuers/${issuerId}`,
  );
}
