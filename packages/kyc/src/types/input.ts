export interface InitiateKYCInput {
  userId: string;
  type: 'INDIVIDUAL' | 'ORGANIZATION';
  [key: string]: string | number | boolean | undefined;
}

export interface ListKYCInput {
  page?: number;
  limit?: number;
  status?: string;
  [key: string]: string | number | boolean | undefined;
}
