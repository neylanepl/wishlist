import styles from "./RatingStars.module.scss";
import RatingIcon from "../../assets/icons/rating.svg?react";
import HalfRatingIcon from "../../assets/icons/half-rating.svg?react";

interface RatingStarsProps {
  value: number;
  max?: number;
}

function getStarStatus(star: number, value: number): "full" | "half" | "empty" {
  if (star <= Math.floor(value)) return "full";
  if (star - value <= 0.5) return "half";
  return "empty";
}

const renderStarIcon = (type: "full" | "half" | "empty") => {
  switch (type) {
    case "half":
      return <HalfRatingIcon role="img" aria-label="star half" className={`${styles.star} ${styles.half}`} />;
    case "full":
      return <RatingIcon role="img" aria-label="star full" className={styles.star} />;
    default:
      return <RatingIcon role="img" aria-label="empty star" className={styles.star} />;
  }
};

export default function RatingStars({ value, max = 5 }: RatingStarsProps) {
  const stars = Array.from({ length: max }, (_, i) => i + 1);

  return (
    <div className={styles.rating} aria-label={`Avaliação ${value} de ${max}`}>
      {stars.map((star) => {
        const status = getStarStatus(star, value);
        return (
          <span
            key={star}
            className={`${styles.star} ${status === "full" ? styles.full : ""} ${status === "half" ? styles.half : ""}`}
          >
            {renderStarIcon(status)}
          </span>
        );
      })}
      <span className={styles.value}>{value.toFixed(1)}</span>
    </div>
  );
}
