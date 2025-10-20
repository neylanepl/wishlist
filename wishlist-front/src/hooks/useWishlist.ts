import { useState, useEffect, useCallback, useMemo } from "react";
import type { Product } from "../types/product";
import { normalizeProduct } from "../utils/formatters";

export function useWishlist(): { wishlist: Product[]; wishlistCodes: ReadonlySet<string>; toggleProduct: (product: Product) => void } {
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const raw = localStorage.getItem("wishlist");
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw) as unknown[];
      return parsed.map(normalizeProduct);
    } catch (e) {
      console.warn("Invalid wishlist data in localStorage, resetting to empty.", e);
      localStorage.removeItem("wishlist");
      return [];
    }
  });

  const toggleProduct = useCallback((product: Product) => {
    setWishlist((prev) => {
      const exists = prev.find((p) => p.code === product.code);
      return exists ? prev.filter((p) => p.code !== product.code) : [...prev, product];
    });
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    } catch (e) {
      console.warn("Failed to persist wishlist to localStorage", e);
    }
  }, [wishlist]);

  const wishlistCodes = useMemo<ReadonlySet<string>>(() => {
    return new Set(wishlist.map((p) => p.code));
  }, [wishlist]);

  return useMemo(() => ({ wishlist, wishlistCodes, toggleProduct }), [wishlist, wishlistCodes, toggleProduct]);
}
