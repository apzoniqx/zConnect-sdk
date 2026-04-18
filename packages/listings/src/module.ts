import type { ZConnectClient } from '@zoniqx/sdk-core';
import * as operations from './operations/index.js';

export class ListingsModule {
  constructor(private client: ZConnectClient) {}

  create = (input: Parameters<typeof operations.createListing>[1]) =>
    operations.createListing(this.client, input);

  list = (input?: Parameters<typeof operations.listListings>[1]) =>
    operations.listListings(this.client, input);

  get = (id: Parameters<typeof operations.getListing>[1]) =>
    operations.getListing(this.client, id);

  update = (
    id: Parameters<typeof operations.updateListing>[1],
    input: Parameters<typeof operations.updateListing>[2],
  ) => operations.updateListing(this.client, id, input);

  delete = (id: Parameters<typeof operations.deleteListing>[1]) =>
    operations.deleteListing(this.client, id);

  getMarketplace = (
    input?: Parameters<typeof operations.getMarketplaceListings>[1],
  ) => operations.getMarketplaceListings(this.client, input);

  getConnectedIssuersListings = (
    input?: Parameters<typeof operations.getConnectedIssuersListings>[1],
  ) => operations.getConnectedIssuersListings(this.client, input);

  syncFromDeal = (input: Parameters<typeof operations.syncFromDeal>[1]) =>
    operations.syncFromDeal(this.client, input);
}
