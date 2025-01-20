import { Record } from "./records";

export interface Language {
  key: string;
  name: string;
  _id?: string;
}

export interface IGoogleTranslate {
  text?: Record;
  target?: string;
}

export interface IGetLanguages {
  page?: number;
  limit?: number;
  query?: string;
}
