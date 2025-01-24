export interface Author {
  _id: string;
  user: string;
  name: string;
  ORCID: string;
  affiliation: Affiliation[];
  biography: string;
  quality: number;
  explanation: string;
  fonts: Font[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface Font {
  title: string;
  url: string;
}

export interface Affiliation {
  name: string;
}
