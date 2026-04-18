export interface KYCRequest {
  id: string;
  userId: string;
  type: 'INDIVIDUAL' | 'ORGANIZATION';
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'IN_PROGRESS';
  createdAt: string;
  updatedAt: string;
  [key: string]: unknown;
}

export interface KYCListResponse {
  data: KYCRequest[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
