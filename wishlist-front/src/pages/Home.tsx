import ProductCard from "../components/ProductCard";
import { useWishlist } from "../hooks/useWishlist";
import { useProducts } from "../hooks/useProducts";

export default function Home() {
  const { products, isLoading, error } = useProducts();
  const { wishlist, toggleProduct } = useWishlist();

  return (
    <div>
      <h1>Home</h1>
      {isLoading && <p>Carregando produtos...</p>}
      {error && <p>{error}</p>}
      {!isLoading && !error && products.length === 0 && (
        <p>Nenhum produto disponível no momento.</p>
      )}
      {!isLoading && !error && products.length > 0 && (
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
      )}
    </div>
  );
}
