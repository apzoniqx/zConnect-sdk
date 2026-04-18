export interface Connection {
  id: string;
  organizationId: string;
  issuerId: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'CANCELLED';
  message?: string;
  createdAt: string;
  updatedAt: string;
  issuer?: {
    id: string;
    name: string;
    [key: string]: unknown;
  };
  organization?: {
    id: string;
    name: string;
    [key: string]: unknown;
  };
}

export interface IssuerWithConnectionStatus {
  id: string;
  name: string;
  connectionStatus?: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'CANCELLED' | 'NONE';
  [key: string]: unknown;
}

export interface OrganizationWithConnectionStatus {
  id: string;
  name: string;
  connectionStatus?: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'CANCELLED' | 'NONE';
  [key: string]: unknown;
}

export interface ConnectionsListResponse {
  data: Connection[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
