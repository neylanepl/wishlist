import { useEffect, useState } from "react";
import type { Product } from "../types/Product";
import { getProducts } from "../service/products";
import ProductCard from "../components/ProductCard";
import { useWishlist } from "../hooks/useWishlist";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const { wishlist, toggleProduct } = useWishlist();

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  return (
    <div>
      <h1> Home </h1>
      <div className="grid">
        {products.map((p) => (
          <ProductCard
            key={p.code}
            product={p}
            isSaved={wishlist.some((w) => w.code === p.code)}
            onToggle={toggleProduct}
          />
        ))}
      </div>
    </div>
  );
}
