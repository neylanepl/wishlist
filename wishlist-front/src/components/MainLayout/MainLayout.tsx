import React from "react";
import NavBar from "../NavBar/NavBar";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import type { BreadcrumbItem } from "../Breadcrumb/Breadcrumb";
import styles from "./MainLayout.module.scss";

type MainLayoutProps = {
  breadcrumbItems: BreadcrumbItem[];
  children: React.ReactNode;
};

export default function MainLayout({ breadcrumbItems, children }: MainLayoutProps) {
  return (
    <div className={styles.container}>
      <NavBar />
      <div className={styles.page}>
        <div className={styles.breadcrumbContainer}>
          <Breadcrumb items={breadcrumbItems} />
        </div>
        <div className={styles.separator} />
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}