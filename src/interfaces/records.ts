import { Author } from "./author";
import { User } from "./users";

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

export interface ResponseBuys {
  data: PaginationBuys;
  error: boolean;
  message: string;
}

export interface PaginationBuys {
  docs: Buys[];
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

export interface Buys {
  _id?: string;
  user?: string;
  title: string;
  author: string;
  count: number;
  price?: number;
  type: string;
  ip?: string[];
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
}

export interface IAddBuy {
  data: Buys;
}
export interface Record {
  [key: string]: any;
  _id: string;
  user?: User;
  authors?: Author[];
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
  strong_issues?: StrongIssues[];
  weak_issues?: WeakIssues[];
  books?: OtherRecords[];
  movies?: OtherRecords[];
  series?: OtherRecords[];
  reviews: Review[];
  similar_records?: OtherRecords[];
  tags?: string[];
  quality?: number;
  explanation?: string;
  links?: {
    title: string;
    url: string;
  }[];
  urls?: string[];
  fonts?: string[];
  image?: string;
  dilve?: Dilve;
  fetchs?: string[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface StrongIssues {
  name: string;
  description: string;
}

export interface WeakIssues {
  name: string;
  description: string;
}

export interface OtherRecords {
  title: string;
  authors: string[];
  genres: string[];
  summary: string;
  tags: string[];
  reason: string;
}

export interface IFindAllRecords {
  page: number;
  limit: number;
  active: boolean;
  query: string;
  startDate: string;
  endDate: string;
}

export interface IBuysRecords {
  page: number;
  limit: number;
}

export interface IUpdateRecord {
  id: string;
  data: Record;
}

export interface IFindRecord {
  id?: string;
}

export interface IDeleteRecord {
  id: string;
}

export interface IUploadCsvRecords {
  data: FormData;
}

export interface ISearchKohaRecords {
  id: number;
}

export interface RecordStats {
  author: { totalCost: number; count: number };
  entity: { totalCost: number; count: number };
  book: { totalCost: number; count: number };
  article: { totalCost: number; count: number };
  magazine: { totalCost: number; count: number };
  film: { totalCost: number; count: number };
}

export interface AverageCosts {
  [key: string]: number;
  author: number;
  entity: number;
  book: number;
  article: number;
  magazine: number;
  film: number;
}

export interface Dilve {
  getRecordsXResponse: GetRecordsXResponse;
}

export interface GetRecordsXResponse {
  xmlns: string;
  version: string;
  ONIXMessage: ONIXMessage;
}

export interface ONIXMessage {
  release: string;
  xmlns: string;
  Header: Header;
  Product: Product;
}

export interface Header {
  Sender: Sender;
  SentDateTime: string;
  DefaultLanguageOfText: string;
}

export interface Sender {
  SenderName: string;
}

export interface Product {
  RecordReference: string;
  NotificationType: string;
  ProductIdentifier: ProductIdentifier[];
  DescriptiveDetail: DescriptiveDetail;
  CollateralDetail: CollateralDetail;
  PublishingDetail: PublishingDetail;
  ProductSupply: ProductSupply;
}

export interface CollateralDetail {
  SupportingResource: SupportingResource[] | SupportingResource;
  TextContent: TextContent[] | TextContent;
}

export interface TextContent {
  TextType: string;
  ContentAudience: string;
  Text: Text;
}

export interface Text {
  $t: string;
}

export interface SupportingResource {
  ResourceContentType: string;
  ContentAudience: string;
  ResourceMode: string;
  ResourceVersion: ResourceVersion;
}

export interface ResourceVersion {
  ResourceForm: string;
  ResourceLink: string;
}

export interface DescriptiveDetail {
  ProductComposition: string;
  ProductForm: string;
  Measure: Measure[];
  ProductPart: ProductPart;
  Collection: Collection;
  TitleDetail: TitleDetailElement[];
  Contributor: Contributor;
  Language: Language;
  Extent: Extent;
  Subject: Subject;
}

export interface Collection {
  CollectionType: string;
  TitleDetail: CollectionTitleDetail;
}

export interface CollectionTitleDetail {
  TitleType: string;
  TitleElement: TitleElementElement[];
}

export interface TitleElementElement {
  TitleElementLevel: string;
  TitleText?: string;
  PartNumber?: string;
}

export interface Contributor {
  SequenceNumber: string;
  ContributorRole: string;
  PersonNameInverted: string;
}

export interface Extent {
  ExtentType: string;
  ExtentValue: string;
  ExtentUnit: string;
}

export interface Language {
  LanguageRole: string;
  LanguageCode: string;
}

export interface Measure {
  MeasureType: string;
  Measurement: string;
  MeasureUnitCode: string;
}

export interface ProductPart {
  ProductForm: string;
  NumberOfItemsOfThisForm: string;
}

export interface Subject {
  SubjectSchemeIdentifier: string;
  SubjectCode: string;
  SubjectHeadingText: string;
}

export interface TitleDetailElement {
  TitleType: string;
  TitleElement: PurpleTitleElement;
}

export interface PurpleTitleElement {
  TitleElementLevel: string;
  TitleText: string;
  Subtitle?: string;
}

export interface ProductIdentifier {
  ProductIDType: string;
  IDValue: string;
  IDTypeName?: string;
}

export interface ProductSupply {
  Market: Market;
  MarketPublishingDetail: MarketPublishingDetail;
  SupplyDetail: SupplyDetail;
}

export interface Market {
  Territory: Territory;
}

export interface Territory {
  CountriesIncluded: string;
}

export interface MarketPublishingDetail {
  MarketPublishingStatus: string;
  MarketDate: MarketDate;
}

export interface MarketDate {
  MarketDateRole: string;
  Date: DateClass;
}

export interface DateClass {
  dateformat: string;
  $t: string;
}

export interface SupplyDetail {
  Supplier: Supplier;
  ProductAvailability: string;
  Price: Price;
}

export interface Price {
  PriceType: string;
  PriceAmount: string;
  Tax: Tax;
  CurrencyCode: string;
  Territory: Territory;
  PriceDate: PriceDate;
}

export interface PriceDate {
  PriceDateRole: string;
  Date: DateClass;
}

export interface Tax {
  TaxType: string;
  TaxRateCode: string;
  TaxRatePercent: string;
  TaxableAmount: string;
}

export interface Supplier {
  SupplierRole: string;
  SupplierName: string;
}

export interface PublishingDetail {
  Imprint: Imprint;
  Publisher: Publisher;
  CountryOfPublication: string;
  PublishingStatus: string;
  PublishingDate: PublishingDate;
}

export interface Imprint {
  ImprintName: string;
}

export interface Publisher {
  PublishingRole: string;
  PublisherIdentifier: PublisherIdentifier;
  PublisherName: string;
}

export interface PublisherIdentifier {
  PublisherIDType: string;
  IDTypeName: string;
  IDValue: string;
}

export interface PublishingDate {
  PublishingDateRole: string;
  Date: DateClass;
}

export interface Review {
  name: string;
  comment: string;
  rating: number;
  date: string;
}
