import type { Product } from "../../types/Product";
import styles from "./ProductCard.module.scss";
import RatingStars from "../RatingStars/RatingStars";

interface ProductCardProps {
  product: Product;
  isSaved: boolean;
  onToggle: (product: Product) => void;
}

export default function ProductCard({ product, isSaved, onToggle }: ProductCardProps) {
  const price = Number(product.priceInCents) / 100;
  const salePrice = Number(product.salePriceInCents) / 100;
  const hasDiscount = salePrice > 0 && salePrice < price;

  return (
    <article className={styles.card} aria-label={product.name}>
      <button
        aria-label={isSaved ? "Remover da wishlist" : "Salvar na wishlist"}
        className={`${styles.wishlistBtn} ${isSaved ? styles.active : ""}`}
        onClick={() => onToggle(product)}
      >
        ♡
      </button>

      <img
        className={styles.image}
        src={product.image}
        alt={product.name}
        loading="lazy"
      />

      <h3 className={styles.name}>{product.name}</h3>

      <RatingStars value={product.rating} />

      <div className={styles.prices}>
        {hasDiscount && <span className={styles.old}>R$ {price.toFixed(2)}</span>}
        <span className={styles.current}>R$ {(hasDiscount ? salePrice : price).toFixed(2)}</span>
      </div>
    </article>
  );
}
