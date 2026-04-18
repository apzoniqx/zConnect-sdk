import type { ZConnectClient } from '@apzoniqx/sdk-core';
import type { CreateWalletInput, ListWalletsInput } from '../types/input.js';
import type { Wallet, WalletsListResponse } from '../types/output.js';

export async function createWallet(
  client: ZConnectClient,
  input: CreateWalletInput,
): Promise<Wallet> {
  return client.post<Wallet>('/api/v1/wallets', input);
}

export async function getWallets(
  client: ZConnectClient,
  input: ListWalletsInput = {},
): Promise<WalletsListResponse> {
  return client.get<WalletsListResponse>('/api/v1/wallets', { query: input });
}

export async function getWallet(
  client: ZConnectClient,
  id: string,
): Promise<Wallet> {
  return client.get<Wallet>(`/api/v1/wallets/${id}`);
}
