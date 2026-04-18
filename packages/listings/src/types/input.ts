export interface CreateListingInput {
  // Fields from CreateListingDto in OpenAPI spec
  [key: string]: unknown;
}

export interface UpdateListingInput {
  // Fields from UpdateListingDto in OpenAPI spec
  [key: string]: unknown;
}

export interface SyncFromDealInput {
  dealId: string;
  role: string;
}

export interface ListListingsInput {
  page?: number;
  limit?: number;
  status?: "DRAFT" | "COMPLETED" | "ACTIVE" | "INACTIVE";
  creatorId?: string;
  tenantId?: string;
  sortOrder?: "asc" | "desc";
  [key: string]: string | number | boolean | undefined;
}

export interface GetMarketplaceInput {
  page?: number;
  limit?: number;
  sortOrder?: "asc" | "desc";
  [key: string]: string | number | boolean | undefined;
}

export interface GetConnectedIssuersListingsInput {
  page?: number;
  limit?: number;
  status?: string;
  sortOrder?: "asc" | "desc";
  [key: string]: string | number | boolean | undefined;
}
