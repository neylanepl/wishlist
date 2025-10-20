import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from "../../src/components/ProductCard/ProductCard";
import type { Product } from "../../src/types/product";

describe("ProductCard", () => {
  const mockProduct: Product = {
    code: "test-code",
    name: "Test Product",
    priceInCents: 10000,
    salePriceInCents: 8000,
    image: "test-image.jpg",
    rating: 4.5,
    stockAvailable: true,
    details: {
      name: "Test Product",
      description: "This is a test product.",
    },
  };

  const onToggleMock = jest.fn();

  it("renderiza os detalhes do produto corretamente", () => {
    render(
      <ProductCard
        product={mockProduct}
        isSaved={false}
        onToggle={onToggleMock}
      />
    );

    expect(screen.getByText("Test Product")).toBeInTheDocument();
  expect(screen.getByText("R$ 100,00")).toBeInTheDocument();
    expect(screen.getByAltText("Test Product")).toBeInTheDocument();
  });

  it("mostra o preço de venda quando há desconto", () => {
    render(
      <ProductCard
        product={mockProduct}
        isSaved={false}
        onToggle={onToggleMock}
      />
    );

  expect(screen.getByText("R$ 100,00")).toBeInTheDocument();
  expect(screen.getByText("R$ 80,00")).toBeInTheDocument();
  });

  it("chama onToggle quando o botão da wishlist é clicado", () => {
    render(
      <ProductCard
        product={mockProduct}
        isSaved={false}
        onToggle={onToggleMock}
      />
    );

    const button = screen.getByRole("button", { name: "Salvar na wishlist" });
    fireEvent.click(button);

    expect(onToggleMock).toHaveBeenCalledWith(mockProduct);
  });

  it("renderiza o ícone de remoção quando isWishlistPage é verdadeiro", () => {
    render(
      <ProductCard
        product={mockProduct}
        isSaved={true}
        onToggle={onToggleMock}
        isWishlistPage={true}
      />
    );

    expect(screen.getByLabelText("Remover da wishlist")).toBeInTheDocument();
  });
});