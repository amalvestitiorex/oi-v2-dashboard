export interface Log {
  createdAt: string;
  error: string;
  message: string;
  type: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

export interface Logs {
  docs: Log[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number;
  nextPage: number;
}
