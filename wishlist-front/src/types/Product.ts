// DTO types (shape received from the API)
export interface ProductDTO {
  code: string;
  name: string;
  image: string;
  // The API returns prices as strings (e.g. "1990") — keep that in the DTO
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

// Domain types (used across the UI) — prices are numbers for safer arithmetic
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
