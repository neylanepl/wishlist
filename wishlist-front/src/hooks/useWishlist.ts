import { useState, useEffect } from "react";
import type { Product } from "../types/Product";

export function useWishlist() {
  const [wishlist, setWishlist] = useState<Product[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("wishlist");
    if (stored) {
      try {
        setWishlist(JSON.parse(stored));
      } catch (e) {
        // If corrupted, ignore and start with empty wishlist
        console.warn("Invalid wishlist data in localStorage, resetting to empty.", e);
        setWishlist([]);
        localStorage.removeItem("wishlist");
      }
    }
  }, []);

  function saveWishlist(newList: Product[]) {
    setWishlist(newList);
    localStorage.setItem("wishlist", JSON.stringify(newList));
  }

  function toggleProduct(product: Product) {
    const exists = wishlist.find((p) => p.code === product.code);
    const updated = exists
      ? wishlist.filter((p) => p.code !== product.code)
      : [...wishlist, product];

    saveWishlist(updated);
  }

  return { wishlist, toggleProduct };
}
