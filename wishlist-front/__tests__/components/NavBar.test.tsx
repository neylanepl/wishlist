import { render, screen, fireEvent } from "@testing-library/react";
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
    // Link do react-router-dom deve renderizar um <a href="/wishlist"> quando utilizado dentro de um Router
    expect(wishlistLink.getAttribute("href")).toBe("/wishlist");
  });

  it("mostra e esconde o dropdown do perfil ao passar o mouse", async () => {
    render(<NavBar />, { wrapper: MemoryRouter });

    // o botão do perfil é filho direto do container com tabIndex=0
    const profileButton = screen.getByRole("button");
    const profileContainer = profileButton.parentElement as HTMLElement;
    expect(profileContainer).toBeTruthy();

    // inicialmente o menu não deve estar visível
  expect(screen.queryByText(/Entrar/i)).toBeNull();

    // ao passar o mouse o dropdown aparece
    fireEvent.mouseEnter(profileContainer);
  expect(await screen.findByText(/Entrar/i)).toBeTruthy();
  expect(screen.getByText(/Minha Conta/i)).toBeTruthy();

    // ao remover o mouse o dropdown some
    fireEvent.mouseLeave(profileContainer);
  expect(screen.queryByText(/Entrar/i)).toBeNull();
  });

  it("o container de perfil é focusable (tabIndex=0) e clicar no botão não abre o menu", () => {
    render(<NavBar />, { wrapper: MemoryRouter });

    const profileButton = screen.getByRole("button");
    const profileContainer = profileButton.parentElement as HTMLElement;
  expect(profileContainer.getAttribute("tabindex")).toBe("0");

    // clicar no botão não altera o estado do menu (comportamento atual)
    fireEvent.click(profileButton);
  expect(screen.queryByText(/Entrar/i)).toBeNull();
  });
});
