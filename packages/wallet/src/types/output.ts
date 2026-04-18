export interface Wallet {
  id: string;
  userId: string;
  address: string;
  chainId: string;
  createdAt: string;
  updatedAt: string;
  [key: string]: unknown;
}

export interface WalletsListResponse {
  data: Wallet[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
