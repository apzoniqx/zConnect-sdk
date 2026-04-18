export interface Transaction {
  id: string;
  listingId: string;
  organizationId: string;
  amount: number;
  currency: string;
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';
  createdAt: string;
  updatedAt: string;
  [key: string]: unknown;
}

export interface TransactionsListResponse {
  data: Transaction[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
