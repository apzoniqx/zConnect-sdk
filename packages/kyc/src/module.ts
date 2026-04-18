import type { ZConnectClient } from '@zoniqx/sdk-core';
import * as operations from './operations/index.js';

export class KYCModule {
  constructor(private client: ZConnectClient) {}

  initiate = (input: Parameters<typeof operations.initiateKYC>[1]) =>
    operations.initiateKYC(this.client, input);

  list = (input?: Parameters<typeof operations.getKYCRequests>[1]) =>
    operations.getKYCRequests(this.client, input);

  get = (id: Parameters<typeof operations.getKYCRequest>[1]) =>
    operations.getKYCRequest(this.client, id);
}
