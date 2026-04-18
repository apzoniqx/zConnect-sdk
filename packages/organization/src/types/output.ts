export interface Organization {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  [key: string]: unknown;
}

export interface OrganizationsListResponse {
  data: Organization[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
