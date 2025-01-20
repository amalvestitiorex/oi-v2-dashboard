export interface Locale {
  key: string;
  value: string;
  lang: string;
  _id?: string;
}

export interface IGetLocales {
  page: number;
  limit: number;
  query: string;
}
