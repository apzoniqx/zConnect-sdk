export interface CreateConnectionInput {
  issuerId: string;
  message?: string;
}

export interface ListConnectionsInput {
  page?: number;
  limit?: number;
  status?: string;
  [key: string]: string | number | boolean | undefined;
}

export interface ListIssuersInput {
  page?: number;
  limit?: number;
  status?: string;
  [key: string]: string | number | boolean | undefined;
}

export interface ListOrganizationsInput {
  page?: number;
  limit?: number;
  status?: string;
  [key: string]: string | number | boolean | undefined;
}
