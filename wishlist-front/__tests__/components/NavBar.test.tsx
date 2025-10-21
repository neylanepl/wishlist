import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import NavBar from "../../src/components/NavBar/NavBar";
import { describe, it, expect } from "@jest/globals";

describe("NavBar", () => {
  it("renderiza a logo Netshoes", () => {
    render(<NavBar />, { wrapper: MemoryRouter });
  expect(screen.getByAltText(/Netshoes/i)).toBeTruthy();
  });

  it("exibe o link para a Wishlist com o href correto", () => {
    render(<NavBar />, { wrapper: MemoryRouter });

    const wishlistLink = screen.getByRole("link", { name: /wishlist/i });
    expect(wishlistLink).toBeTruthy();
    expect(wishlistLink.getAttribute("href")).toBe("/wishlist");
  });

  it("exibe o header com role banner e aria-label", () => {
    render(<NavBar />, { wrapper: MemoryRouter });

    expect(
      screen.getByRole("banner", { name: /Navegação principal/i })
    ).toBeInTheDocument();
  });

  it("link do logo aponta para a home", () => {
    render(<NavBar />, { wrapper: MemoryRouter });

    const logoLink = screen.getByRole("link", { name: /Página inicial/i });
    expect(logoLink.getAttribute("href")).toBe("/");
  });

  it("renderiza o ProfileMenu (botão do perfil)", () => {
    render(<NavBar />, { wrapper: MemoryRouter });

    expect(screen.getByLabelText(/Abrir menu de perfil/i)).toBeInTheDocument();
  });
});
