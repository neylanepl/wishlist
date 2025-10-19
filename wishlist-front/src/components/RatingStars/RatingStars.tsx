import styles from "./RatingStars.module.scss";
import RatingIcon from "../../assets/icons/rating.svg?react";
import HalfRatingIcon from "../../assets/icons/half-rating.svg?react";

interface RatingStarsProps {
  value: number; // Ex: 3.5
  max?: number; // Padrão: 5
}

export default function RatingStars({ value, max = 5 }: RatingStarsProps) {
  const stars = Array.from({ length: max }, (_, i) => i + 1);

  return (
    <div className={styles.rating} aria-label={`Avaliação ${value} de ${max}`}>
      {stars.map((star) => {
        const full = star <= Math.floor(value);
        const half = !full && star - value <= 0.5;
        return (
          <span
            key={star}
            className={`${styles.star} ${full ? styles.full : ""} ${half ? styles.half : ""}`}
          >
            {!half ? (
              <RatingIcon className={styles.star} />
            ) : (
              <HalfRatingIcon className={`${styles.star} ${styles.half}`} />
            )}
          </span>
        );
      })}
      <span className={styles.value}>{value.toFixed(1)}</span>
    </div>
  );
}
