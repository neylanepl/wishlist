export interface Product {
  code: string;
  name: string;
  image: string;
  priceInCents: string;
  salePriceInCents: string;
  rating: number;
  stockAvailable: boolean;
  details: {
    name: string;
    description: string;
  };
}
