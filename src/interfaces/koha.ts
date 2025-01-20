export interface Koha {
  issues: string;
  biblioitemnumber: string;
  biblionumber: string;
  place: string;
  reserves: string;
  publishercode: string;
  items: Items;
  cn_sort: CNSort;
  isbn: string;
  timestamp: Date;
  marcxml: Marcxml;
}

export interface CNSort {}

export interface Items {
  item: Item;
}

export interface Item {
  itemcallnumber: string;
  biblionumber: string;
  itemlost: string;
  permanent_location: string;
  withdrawn: string;
  issues: string;
  location: string;
  holdingbranchname: string;
  homebranchname: string;
  itemnotes: string;
  homebranch: string;
  damaged: string;
  dateaccessioned: Date;
  replacementpricedate: Date;
  datelastseen: Date;
  location_description: string;
  ccode: string;
  itemnumber: string;
  itype: string;
  biblioitemnumber: string;
  notforloan: string;
  itype_description: string;
  timestamp: Date;
  copynumber: CNSort;
  cn_sort: string;
  stocknumber: string;
  itemnotes_nonpublic: string;
  holdingbranch: string;
  barcode: string;
}

export interface Marcxml {
  "xmlns:xsi": string;
  "xsi:schemaLocation": string;
  xmlns: string;
  leader: string;
  controlfield: Controlfield[];
  datafield: Datafield[];
}

export interface Controlfield {
  tag: string;
  $t: string;
}

export interface Datafield {
  tag: string;
  ind1: Ind;
  ind2: Ind;
  subfield: SubfieldElement[] | SubfieldElement;
}

export enum Ind {
  Empty = " ",
}

export interface SubfieldElement {
  code: string;
  $t: string;
}
