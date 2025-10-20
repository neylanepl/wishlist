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

// Helper to convert a ProductDTO into the domain Product type.
// Parsing is defensive: non-numeric values fall back to 0.
export function normalizeProduct(input: unknown): Product {
  const obj = (input ?? {}) as Record<string, unknown>;

  const toNumber = (v: unknown) => {
    if (typeof v === "number") return v as number;
    if (typeof v === "string") {
      const n = parseInt(v, 10);
      return Number.isFinite(n) ? n : 0;
    }
    return 0;
  };

  const details = obj.details as Record<string, unknown> | undefined;

  return {
    code: String(obj.code ?? ""),
    name: String(obj.name ?? ""),
    image: String(obj.image ?? ""),
    priceInCents: toNumber(obj.priceInCents),
    salePriceInCents: toNumber(obj.salePriceInCents),
    rating: typeof obj.rating === "number" ? (obj.rating as number) : 0,
    stockAvailable: typeof obj.stockAvailable === "boolean" ? (obj.stockAvailable as boolean) : false,
    details: details
      ? { name: String(details.name ?? ""), description: String(details.description ?? "") }
      : { name: String(obj.name ?? ""), description: String("") },
  } as Product;
}
