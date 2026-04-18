import type { ZConnectClient } from '@zoniqx/sdk-core';
import * as operations from './operations/index.js';

export class TransactionsModule {
  constructor(private client: ZConnectClient) {}

  zconnectPay = (input: Parameters<typeof operations.zconnectPay>[1]) =>
    operations.zconnectPay(this.client, input);

  getTransactions = (input?: Parameters<typeof operations.getTransactions>[1]) =>
    operations.getTransactions(this.client, input);

  getTransaction = (id: Parameters<typeof operations.getTransaction>[1]) =>
    operations.getTransaction(this.client, id);
}
