export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export async function* paginate<T>(
  operation: (cursor?: string) => Promise<PaginatedResponse<T>>,
): AsyncIterable<T> {
  let cursor: string | undefined = undefined;

  while (true) {
    const response = await operation(cursor);
    
    for (const item of response.data) {
      yield item;
    }

    if (response.page >= response.totalPages) {
      break;
    }

    cursor = String(response.page + 1);
  }
}
