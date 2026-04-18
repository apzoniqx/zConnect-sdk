export interface CreateWalletInput {
  address: string;
  chainId: string;
  [key: string]: string | number | boolean | undefined;
}

export interface ListWalletsInput {
  page?: number;
  limit?: number;
  [key: string]: string | number | boolean | undefined;
}
