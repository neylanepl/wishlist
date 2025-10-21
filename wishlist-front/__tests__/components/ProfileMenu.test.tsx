import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProfileMenu from "../../src/components/ProfileMenu/ProfileMenu";
import { describe, it, expect } from "@jest/globals";

describe("ProfileMenu", () => {
  it("renderiza o botão do perfil com atributos ARIA e sem menu inicialmente", () => {
    render(<ProfileMenu />);

    const profileButton = screen.getByLabelText(/Abrir menu de perfil/i);
    expect(profileButton).toBeTruthy();

    const profileContainer = profileButton.parentElement as HTMLElement;
    expect(profileContainer).toBeTruthy();

    expect(profileContainer.getAttribute("aria-haspopup")).toBe("true");
    expect(profileContainer.getAttribute("aria-expanded")).toBe("false");

    expect(screen.queryByRole("menu")).toBeNull();
  });

  it("mostra e esconde o dropdown ao passar o mouse", async () => {
    render(<ProfileMenu />);

    const profileButton = screen.getByLabelText(/Abrir menu de perfil/i);
    const profileContainer = profileButton.parentElement as HTMLElement;

    expect(screen.queryByText(/Entrar/i)).toBeNull();

    fireEvent.mouseEnter(profileContainer);
    expect(await screen.findByText(/Entrar/i)).toBeTruthy();
    expect(screen.getByText(/Minha Conta/i)).toBeTruthy();

    fireEvent.mouseLeave(profileContainer);
    expect(screen.queryByText(/Entrar/i)).toBeNull();
  });

  it("abre e fecha o menu ao clicar no botão do perfil", () => {
    render(<ProfileMenu />);

    const profileButton = screen.getByLabelText(/Abrir menu de perfil/i);

    fireEvent.click(profileButton);
    expect(screen.getByText(/Entrar/i)).toBeTruthy();

    fireEvent.click(profileButton);
    expect(screen.queryByText(/Entrar/i)).toBeNull();
  });

  it("abre ao focar e fecha ao desfocar para fora do container", () => {
    render(<ProfileMenu />);

    const profileButton = screen.getByLabelText(/Abrir menu de perfil/i);
    const profileContainer = profileButton.parentElement as HTMLElement;

    fireEvent.focus(profileButton);
    expect(screen.getByText(/Entrar/i)).toBeTruthy();

    const outside = document.createElement("button");
    document.body.appendChild(outside);

    fireEvent.blur(profileContainer, { relatedTarget: outside });
    expect(screen.queryByText(/Entrar/i)).toBeNull();

    document.body.removeChild(outside);
  });

  it("mantem o menu aberto ao focar um item do menu", () => {
    render(<ProfileMenu />);

    const profileButton = screen.getByLabelText(/Abrir menu de perfil/i);

    fireEvent.click(profileButton);

    const entrarBtn = screen.getByRole("menuitem", { name: /Entrar/i });
    fireEvent.focus(entrarBtn);
    expect(screen.getByText(/Entrar/i)).toBeTruthy();
  });
});
