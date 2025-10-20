import type { Product } from "../../types/Product";
import { memo, useCallback } from "react";
import styles from "./ProductCard.module.scss";
import RatingStars from "../RatingStars/RatingStars";
import HeartIcon from "../../assets/icons/heart.svg?react";
import RemoveIcon from "../../assets/icons/remove.svg?react";

interface ProductCardProps {
  product: Product;
  isSaved: boolean;
  onToggle: (product: Product) => void;
  isWishlistPage?: boolean;
}

export default memo(ProductCard);

function ProductCard({ product, isSaved, onToggle, isWishlistPage = false }: ProductCardProps) {
  const handleToggle = useCallback(() => onToggle(product), [onToggle, product]);
  const price = product.priceInCents / 100;
  const salePrice = product.salePriceInCents / 100;
  const hasDiscount = salePrice > 0 && salePrice < price;

  return (
    <article className={styles.card} aria-label={product.name}>
      <button
        type="button"
        aria-pressed={isSaved}
        aria-label={isWishlistPage ? "Remover da wishlist" : (isSaved ? "Remover da wishlist" : "Salvar na wishlist")}
        className={`${styles.wishlistBtn} ${isSaved ? styles.active : ""} 
        ${isWishlistPage ? styles.removeMode : ""}`}
        onClick={handleToggle}
      >
        {isWishlistPage ? (
          <RemoveIcon className={styles.removeIcon} />
        ) : (
          <HeartIcon className={styles.heartIcon} />
        )}
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
