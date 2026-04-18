export interface ZconnectPayInput {
  listingId: string;
  amount: number;
  currency?: string;
}

export interface GetTransactionsInput {
  page?: number;
  limit?: number;
  listingId?: string;
  status?: string;
  [key: string]: string | number | boolean | undefined;
}
