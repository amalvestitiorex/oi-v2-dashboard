export interface PaginationUsers {
  docs: User[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

export interface User {
  _id?: string;
  name: string;
  email: string;
  password: string;
  base_url: string;
  api_url: string;
  koha_id: string;
  role: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
}

export interface IFindAllUsers {
  page: number;
  limit: number;
  query: string;
}
