export interface ProductDTO {
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

export interface ProductsResponseDTO {
  total: number;
  pageSize: number;
  totalPages: number;
  products: ProductDTO[];
}

export interface Product {
  code: string;
  name: string;
  image: string;
  priceInCents: number;
  salePriceInCents: number;
  rating: number;
  stockAvailable: boolean;
  details: {
    name: string;
    description: string;
  };
}

export interface ProductsResponse {
  total: number;
  pageSize: number;
  totalPages: number;
  products: Product[];
}
