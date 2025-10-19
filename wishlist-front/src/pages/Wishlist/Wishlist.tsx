import ProductCard from "../../components/ProductCard/ProductCard";
import MainLayout from "../../components/MainLayout/MainLayout";
import { useWishlist } from "../../hooks/useWishlist";
import styles from "./Wishlist.module.scss";

export default function Wishlist() {
  const { wishlist, toggleProduct } = useWishlist();

  return (
    <MainLayout 
      breadcrumbItems={[
        { label: "Home", to: "/" },
        { label: "Wishlist", to: "/wishlist" },
      ]}
    >
      {wishlist.length === 0 && (
        <p className={styles.state}>Nenhum produto salvo na wishlist.</p>
      )}

      {wishlist.length > 0 && (
        <div className={styles.grid}>
          {wishlist.map((product) => (
            <ProductCard
              key={product.code}
              product={product}
              isSaved={true}
              onToggle={toggleProduct}
            />
          ))}
        </div>
      )}
    </MainLayout>
  );
}
