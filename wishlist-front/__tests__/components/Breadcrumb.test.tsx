import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Breadcrumb, { BreadcrumbItem } from "../../src/components/Breadcrumb/Breadcrumb";
import styles from "../../src/components/Breadcrumb/Breadcrumb.module.css";

describe("Breadcrumb", () => {
  const renderBreadcrumb = (items: BreadcrumbItem[]) => {
    render(
      <BrowserRouter>
        <Breadcrumb items={items} />
      </BrowserRouter>
    );
  };

  it("renderiza itens de Breadcrumb corretamente", () => {
    const items: BreadcrumbItem[] = [
      { label: "Home", to: "/" },
      { label: "Products", to: "/products" },
      { label: "Details" },
    ];

    renderBreadcrumb(items);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Products")).toBeInTheDocument();
    expect(screen.getByText("Details")).toBeInTheDocument();

    expect(screen.getByText("Home").closest("a")).toHaveAttribute("href", "/");
    expect(screen.getByText("Products").closest("a")).toHaveAttribute("href", "/products");

    expect(screen.getByText("Details").closest("a")).toBeNull();
  });

  it("renderiza separadores corretamente", () => {
    const items: BreadcrumbItem[] = [
      { label: "Home", to: "/" },
      { label: "Products", to: "/products" },
      { label: "Details" },
    ];

    renderBreadcrumb(items);

    const separators = screen.getAllByText("/");
    expect(separators).toHaveLength(items.length - 1);
  });

  it("aplica classe ativa ao último item", () => {
    const items: BreadcrumbItem[] = [
      { label: "Home", to: "/" },
      { label: "Products", to: "/products" },
      { label: "Details" },
    ];

    renderBreadcrumb(items);

    const lastItem = screen.getByText("Details");
    expect(lastItem).toHaveClass(styles.item);
  });
});