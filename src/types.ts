export interface Item {
  _id: string;
  name: string;
  description?: string;
  price?: number;
  image: string;
}
export interface Category {
  _id: string;
  name: string;
  image: string;
  items: [Item];
}
