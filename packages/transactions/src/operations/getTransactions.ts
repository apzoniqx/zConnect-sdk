import type { ZConnectClient } from '@apzoniqx/sdk-core';
import type { GetTransactionsInput } from '../types/input.js';
import type { TransactionsListResponse, Transaction } from '../types/output.js';

export async function getTransactions(
  client: ZConnectClient,
  input: GetTransactionsInput = {},
): Promise<TransactionsListResponse> {
  return client.get<TransactionsListResponse>('/api/v1/payments', { query: input });
}

export async function getTransaction(
  client: ZConnectClient,
  id: string,
): Promise<Transaction> {
  return client.get<Transaction>(`/api/v1/payments/${id}`);
}
