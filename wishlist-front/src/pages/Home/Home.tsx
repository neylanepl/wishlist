import type { Product } from "../../types/Product";
import ProductCard from "../../components/ProductCard/ProductCard";
import MainLayout from "../../components/MainLayout/MainLayout";
import { useWishlist } from "../../hooks/useWishlist";
import { useProducts } from "../../hooks/useProducts";
import styles from "./Home.module.scss";

export default function Home() {
  const { products, isLoading, error }: { products: Product[]; isLoading: boolean; error: string | null } = useProducts();
  const { wishlistCodes, toggleProduct }: { wishlistCodes: ReadonlySet<string>; toggleProduct: (product: Product) => void } = useWishlist();

  function renderContent() {
    if (isLoading) return <p className={styles.state}>Carregando produtos...</p>;
    if (error) return <p className={`${styles.state} ${styles.error}`}>{error}</p>;
    if (products.length === 0) return <p className={styles.state}>Nenhum produto disponível no momento.</p>;

    return (
      <div className={styles.grid}>
          {products.map((p: Product) => (
          <ProductCard
            key={p.code}
            product={p}
              isSaved={wishlistCodes.has(p.code)}
            onToggle={toggleProduct}
          />
        ))}
      </div>
    );
  }

  return (
    <MainLayout 
      breadcrumbItems={[
        { label: "Home", to: "/" },
      ]}
    >
      {renderContent()}
    </MainLayout>
  );
}
