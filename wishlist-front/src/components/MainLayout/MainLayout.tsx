import React from "react";
import NavBar from "../NavBar/NavBar";
import styles from "./MainLayout.module.scss";

type MainLayoutProps = {
  title: string; // título da página
  children: React.ReactNode; // conteúdo da página
};

export default function MainLayout({ title, children }: MainLayoutProps) {
  return (
    <div className={styles.container}>
      <NavBar />
      <div className={styles.page}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.separator} />
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}