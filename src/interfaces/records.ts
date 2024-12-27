import { User } from "./auth";

export interface PaginationRecords {
  docs: Record[];
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

export interface Record {
  _id: string;
  user: User;
  authors?: User[];
  scimagojr?: string;
  id: string;
  id_isbn?: string;
  id_issn?: string;
  id_article?: string;
  title: string;
  year?: string;
  editorial?: string;
  article_source?: string;
  article_issn?: string;
  type?: string;
  summary?: string;
  extended_brief?: string;
  strong_issues?: string[];
  weak_issues?: string[];
  books?: string[];
  movies?: string[];
  series?: string[];
  similar_records?: string[];
  tags?: string[];
  quality?: number;
  explanation?: string;
  links?: string[];
  urls?: string[];
  fonts?: string[];
  image?: string;
  dilve?: object;
  fetchs?: string[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface IFindAllRecords {
  page: number;
  limit: number;
  active: boolean;
  query: string;
  startDate: string;
  endDate: string;
}

export interface IUpdateRecord {
  id: string;
  data: Record;
}

export interface IFindRecord {
  id: string;
}

export interface IDeleteRecord {
  id: string;
}
