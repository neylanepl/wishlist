// Utility formatters and normalizers used across the UI
import type { Product } from "../types/Product";

// Small helper to coerce numeric-ish values into integers (cents)
function toNumber(v: unknown): number {
  if (typeof v === "number") return v as number;
  if (typeof v === "string") {
    const n = parseInt(v, 10);
    return Number.isFinite(n) ? n : 0;
  }
  return 0;
}

/**
 * Format a value expressed in cents as a localized currency string.
 *
 * Examples:
 *  formatCurrency(1990)         -> "R$ 19,90" (with default pt-BR/BRL)
 *  formatCurrency("1990")       -> "R$ 19,90"
 *
 * Defaults to Brazilian locale/currency but accepts overrides.
 */
export function formatCurrency(
  cents: number | string | null | undefined,
  locale = "pt-BR",
  currency = "BRL"
): string {
  const value = toNumber(cents) / 100;
  try {
    return new Intl.NumberFormat(locale, { style: "currency", currency }).format(value);
  } catch {
    // Fallback to a simple formatting with 2 decimal places and BRL symbol
    const symbol = currency === "BRL" ? "R$ " : "";
    return symbol + value.toFixed(2);
  }
}

/**
 * Convenience helper that converts cents to a float value in currency units
 * (e.g. 1990 -> 19.9).
 */
export function centsToUnits(cents: number | string | null | undefined): number {
  return toNumber(cents) / 100;
}

/**
 * Normalize an incoming product-like object (API DTO, persisted JSON, or
 * already-normalized domain object) into the application's Product shape.
 *
 * This function is defensive: it accepts unknown input and ensures the
 * returned object matches the `Product` interface (using sensible defaults
 * for missing/invalid fields).
 */
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

/**
 * Normalize an array of unknown items into domain products. If the input is
 * not an array, an empty array is returned.
 */
export function normalizeProducts(input: unknown): Product[] {
  if (!Array.isArray(input)) return [];
  return input.map(normalizeProduct);
}
