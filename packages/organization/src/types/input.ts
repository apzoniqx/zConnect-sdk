export interface CreateOrganizationInput {
  name: string;
  description?: string;
  [key: string]: string | number | boolean | undefined;
}

export interface UpdateOrganizationInput {
  name?: string;
  description?: string;
  [key: string]: string | number | boolean | undefined;
}

export interface ListOrganizationsInput {
  page?: number;
  limit?: number;
  [key: string]: string | number | boolean | undefined;
}
