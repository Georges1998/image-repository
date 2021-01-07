export interface IImage {
  _id?: string;
  price: number;
  purchased?: boolean;
  title: string;
  url: string;
  user?: string;
  discount?: number;
  delete?: boolean;
}
