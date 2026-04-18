import type { ZConnectClient } from '@zoniqx/sdk-core';
import * as operations from './operations/index.js';

export class OrganizationModule {
  constructor(private client: ZConnectClient) {}

  create = (input: Parameters<typeof operations.createOrganization>[1]) =>
    operations.createOrganization(this.client, input);

  list = (input?: Parameters<typeof operations.getOrganizations>[1]) =>
    operations.getOrganizations(this.client, input);

  get = (id: Parameters<typeof operations.getOrganization>[1]) =>
    operations.getOrganization(this.client, id);

  update = (
    id: Parameters<typeof operations.updateOrganization>[1],
    input: Parameters<typeof operations.updateOrganization>[2],
  ) => operations.updateOrganization(this.client, id, input);

  delete = (id: Parameters<typeof operations.deleteOrganization>[1]) =>
    operations.deleteOrganization(this.client, id);

  getMy = () => operations.getMyOrganization(this.client);
}
