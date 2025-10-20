import { render, screen } from "@testing-library/react";
import RatingStars from "../../src/components/RatingStars/RatingStars";

describe("RatingStars", () => {
  it("renderiza o número correto de estrelas cheias", () => {
    render(<RatingStars value={3} max={5} />);

    const fullStars = screen.getAllByRole("img", { name: "star full" });
    expect(fullStars).toHaveLength(3);
  });

  it("renderiza uma estrela meia quando o valor é decimal", () => {
    render(<RatingStars value={3.5} max={5} />);

    const halfStars = screen.getAllByRole("img", { name: "star half" });
    expect(halfStars).toHaveLength(1);
  });

  it("renderiza o número correto de estrelas vazias", () => {
    render(<RatingStars value={3} max={5} />);

    const emptyStars = screen.getAllByRole("img", { name: "empty star" });
    expect(emptyStars).toHaveLength(2);
  });

  it("exibe o valor de classificação correto", () => {
    render(<RatingStars value={4.5} max={5} />);

    expect(screen.getByText("4.5")).toBeInTheDocument();
  });

  it("renderiza corretamente quando max é maior que 5", () => {
    render(<RatingStars value={6} max={10} />);

    const fullStars = screen.getAllByRole("img", { name: "star full" });
    expect(fullStars).toHaveLength(6);

  const emptyStars = screen.getAllByRole("img", { name: "empty star" });
    expect(emptyStars).toHaveLength(4);
  });
});