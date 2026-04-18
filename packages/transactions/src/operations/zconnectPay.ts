import type { ZConnectClient } from '@zoniqx/sdk-core';
import type { ZconnectPayInput } from '../types/input.js';
import type { Transaction } from '../types/output.js';

export async function zconnectPay(
  client: ZConnectClient,
  input: ZconnectPayInput,
): Promise<Transaction> {
  return client.post<Transaction>('/api/v1/payments', input);
}
