import { useEffect, useState, useCallback } from "react";
import { getProducts } from "../services/productService";
import type { Product } from "../types/Product";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getProducts();
      setProducts(data.products);
    } catch (err) {
      setError(
        err instanceof Error 
          ? err.message 
          : "Erro ao carregar produtos. Tente novamente mais tarde."
      );
      console.error("Erro ao buscar produtos:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, isLoading, error, refetch: fetchProducts };
}
