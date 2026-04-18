export interface PaginatedResponse<T> {
    data: T[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}
export declare function paginate<T>(operation: (cursor?: string) => Promise<PaginatedResponse<T>>): AsyncIterable<T>;
//# sourceMappingURL=paginator.d.ts.map