import type { ZConnectClient } from '@apzoniqx/sdk-core';
import type { InitiateKYCInput, ListKYCInput } from '../types/input.js';
import type { KYCRequest, KYCListResponse } from '../types/output.js';

export async function initiateKYC(
  client: ZConnectClient,
  input: InitiateKYCInput,
): Promise<KYCRequest> {
  return client.post<KYCRequest>('/api/v1/kyc/initiate', input);
}

export async function getKYCRequests(
  client: ZConnectClient,
  input: ListKYCInput = {},
): Promise<KYCListResponse> {
  return client.get<KYCListResponse>('/api/v1/kyc', { query: input });
}

export async function getKYCRequest(
  client: ZConnectClient,
  id: string,
): Promise<KYCRequest> {
  return client.get<KYCRequest>(`/api/v1/kyc/${id}`);
}
