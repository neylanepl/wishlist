import { render, screen } from "@testing-library/react";
import MainLayout from "../../src/components/MainLayout/MainLayout";
import { BrowserRouter } from "react-router-dom";

describe("MainLayout", () => {
  const breadcrumbItems = [
    { label: "Home", to: "/" },
    { label: "Products", to: "/products" },
    { label: "Details" },
  ];

  it("renderiza o componente NavBar", () => {
    render(
      <BrowserRouter>
        <MainLayout breadcrumbItems={breadcrumbItems}>
          <div>Test Content</div>
        </MainLayout>
      </BrowserRouter>
    );

    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("renderiza o componente Breadcrumb com os itens corretos", () => {
    render(
      <BrowserRouter>
        <MainLayout breadcrumbItems={breadcrumbItems}>
          <div>Test Content</div>
        </MainLayout>
      </BrowserRouter>
    );

    breadcrumbItems.forEach((item) => {
      expect(screen.getByText(item.label)).toBeInTheDocument();
    });
  });

  it("renderiza o conteúdo filho", () => {
    render(
      <BrowserRouter>
        <MainLayout breadcrumbItems={breadcrumbItems}>
          <div>Test Content</div>
        </MainLayout>
      </BrowserRouter>
    );

    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });
});