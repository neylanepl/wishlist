import ProductCard from "../../components/ProductCard/ProductCard";
import MainLayout from "../../components/MainLayout/MainLayout";
import { useWishlist } from "../../hooks/useWishlist";
import { useProducts } from "../../hooks/useProducts";
import styles from "./Home.module.scss";

export default function Home() {
  const { products, isLoading, error } = useProducts();
  const { wishlist, toggleProduct } = useWishlist();

  return (
    <MainLayout 
                breadcrumbItems={[
                  { label: "Home", to: "/" },
                ]}
    >
      {isLoading && <p className={styles.state}>Carregando produtos...</p>}
      {error && <p className={`${styles.state} ${styles.error}`}>{error}</p>}

      {!isLoading && !error && products.length === 0 && (
        <p className={styles.state}>Nenhum produto disponível no momento.</p>
      )}

      {!isLoading && !error && products.length > 0 && (
        <div className={styles.grid}>
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
    </MainLayout>
  );
}
