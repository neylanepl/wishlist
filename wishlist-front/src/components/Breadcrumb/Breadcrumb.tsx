import { Link } from "react-router-dom";
import styles from "./Breadcrumb.module.scss";

export type BreadcrumbItem = {
  label: string;
  to?: string;
};

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className={styles.breadcrumb} aria-label="breadcrumb">
      <ol>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li
              key={index}
              className={`${styles.item} ${isLast ? styles.active : ""}`}
              aria-current={isLast ? "page" : undefined}
            >
              {item.to && !isLast ? (
                <Link to={item.to}>{item.label}</Link>
              ) : (
                <span>{item.label}</span>
              )}
              {!isLast && (
                <span className={styles.separator} aria-hidden="true">/</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
