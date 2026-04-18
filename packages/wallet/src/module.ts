import type { ZConnectClient } from '@apzoniqx/sdk-core';
import * as operations from './operations/index.js';

export class WalletModule {
  constructor(private client: ZConnectClient) {}

  create = (input: Parameters<typeof operations.createWallet>[1]) =>
    operations.createWallet(this.client, input);

  list = (input?: Parameters<typeof operations.getWallets>[1]) =>
    operations.getWallets(this.client, input);

  get = (id: Parameters<typeof operations.getWallet>[1]) =>
    operations.getWallet(this.client, id);
}
