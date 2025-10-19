import React from "react";
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
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span
            key={index}
            className={`${styles.item} ${isLast ? styles.active : ""}`}
          >
            {item.to && !isLast ? (
              <Link to={item.to}>{item.label}</Link>
            ) : (
              <span>{item.label}</span>
            )}
            {!isLast && <span className={styles.separator}>/</span>}
          </span>
        );
      })}
    </nav>
  );
}
