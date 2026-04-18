import type { ZConnectClient } from '@zoniqx/sdk-core';
import * as operations from './operations/index.js';

export class ConnectionsModule {
  constructor(private client: ZConnectClient) {}

  create = (input: Parameters<typeof operations.createConnection>[1]) =>
    operations.createConnection(this.client, input);

  list = (input?: Parameters<typeof operations.getConnections>[1]) =>
    operations.getConnections(this.client, input);

  get = (connectionId: Parameters<typeof operations.getConnection>[1]) =>
    operations.getConnection(this.client, connectionId);

  accept = (connectionId: Parameters<typeof operations.acceptConnection>[1]) =>
    operations.acceptConnection(this.client, connectionId);

  reject = (connectionId: Parameters<typeof operations.rejectConnection>[1]) =>
    operations.rejectConnection(this.client, connectionId);

  cancel = (connectionId: Parameters<typeof operations.cancelConnection>[1]) =>
    operations.cancelConnection(this.client, connectionId);

  getIssuers = (input?: Parameters<typeof operations.getIssuersWithConnectionStatus>[1]) =>
    operations.getIssuersWithConnectionStatus(this.client, input);

  getIssuer = (issuerId: Parameters<typeof operations.getIssuerWithConnectionStatus>[1]) =>
    operations.getIssuerWithConnectionStatus(this.client, issuerId);

  getOrganizations = (input?: Parameters<typeof operations.getOrganizationsWithConnectionStatus>[1]) =>
    operations.getOrganizationsWithConnectionStatus(this.client, input);

  getOrganization = (orgId: Parameters<typeof operations.getOrganizationWithConnectionStatus>[1]) =>
    operations.getOrganizationWithConnectionStatus(this.client, orgId);
}
