export interface IGetRecommendations {
  id: string;
  isbn?: string;
}

export interface IRecommendations {
  dataBiblionumber?: DataBiblionumber[];
  dataIsbn?: DataIsbn[];
}

export interface DataBiblionumber {
  biblionumber_unico: string;
  copyrightdate: number;
  indice: string;
  publishercode: null | string;
  isbn: string;
  biblionumber: number | string;
  author: string;
  pages: string;
  editorial: string;
  biblioteca: string;
  size: string;
  "@version": string;
  "@timestamp": Date;
  resumen: string;
  materia1: string[];
  red: string;
  title: string;
  datecreated: Date;
  issn: null;
  url: null;
  timestamp: Date;
  edicion: string;
  rating: number;
  image: string;
  "600"?: any[];
  "610"?: any[];
  "611"?: any[];
  illus?: string;
  volume?: string;
  biblioitemnumber?: string;
  reserves?: string;
  items?: Items;
  lccn?: string;
  issues?: string;
  place?: string;
  marcxml?: string;
  cn_sort?: CNSort;
}

export interface CNSort {}

export interface Items {
  item: Item;
}

export interface Item {
  homebranch: string;
  datelastborrowed: Date;
  timestamp: Date;
  biblioitemnumber: string;
  location_description: string;
  datelastseen: Date;
  barcode: string;
  notforloan: string;
  issues: string;
  homebranchname: string;
  biblionumber: string;
  copynumber: string;
  withdrawn: string;
  itype: string;
  holdingbranch: string;
  replacementpricedate: Date;
  damaged: string;
  itemnumber: string;
  holdingbranchname: string;
  booksellerid: string;
  itemlost: string;
  permanent_location: string;
  itemcallnumber: string;
  stocknumber: string;
  itype_description: string;
  dateaccessioned: Date;
  location: string;
  cn_sort: string;
}

export interface DataIsbn {
  biblionumber_unico: string;
  copyrightdate: number;
  indice: string;
  publishercode: null;
  isbn: string;
  biblionumber: number;
  author: string;
  pages: string;
  editorial: string;
  biblioteca: string;
  size: string;
  "@version": string;
  "@timestamp": Date;
  resumen: string;
  materia1: string[];
  red: string;
  title: string;
  datecreated: Date;
  issn: null;
  url: null | string;
  timestamp: Date;
  edicion: string;
  rating: number;
  image: string;
}
