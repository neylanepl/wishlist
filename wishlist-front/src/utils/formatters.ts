import type { Product } from "../types/product";

function toNumber(v: unknown): number {
  if (typeof v === "number") return v as number;
  if (typeof v === "string") {
    const n = parseInt(v, 10);
    return Number.isFinite(n) ? n : 0;
  }
  return 0;
}


export function formatCurrency(
  cents: number | string | null | undefined,
  locale = "pt-BR",
  currency = "BRL"
): string {
  const value = toNumber(cents) / 100;
  try {
    return new Intl.NumberFormat(locale, { style: "currency", currency }).format(value);
  } catch {
    const symbol = currency === "BRL" ? "R$ " : "";
    const str = value.toFixed(2);
    return currency === "BRL" ? symbol + str.replace(".", ",") : symbol + str;
  }
}


export function centsToUnits(cents: number | string | null | undefined): number {
  return toNumber(cents) / 100;
}


export function normalizeProduct(input: unknown): Product {
  const obj = (input ?? {}) as Record<string, unknown>;
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


export function normalizeProducts(input: unknown): Product[] {
  if (!Array.isArray(input)) return [];
  return input.map(normalizeProduct);
}
