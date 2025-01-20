export interface Author {
  _id: string;
  user: string;
  name: string;
  affiliation: any[];
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
