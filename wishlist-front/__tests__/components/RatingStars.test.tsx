import { render, screen } from "@testing-library/react";
import RatingStars from "../../src/components/RatingStars/RatingStars";

describe("RatingStars", () => {
  it("renders the correct number of full stars", () => {
    render(<RatingStars value={3} max={5} />);

    const fullStars = screen.getAllByRole("img", { name: "star full" });
    expect(fullStars).toHaveLength(3);
  });

  it("renders a half star when the value is a decimal", () => {
    render(<RatingStars value={3.5} max={5} />);

    const halfStars = screen.getAllByRole("img", { name: "star half" });
    expect(halfStars).toHaveLength(1);
  });

  it("renders the correct number of empty stars", () => {
    render(<RatingStars value={3} max={5} />);

    const emptyStars = screen.getAllByRole("img", { name: "empty star" });
    expect(emptyStars).toHaveLength(2);
  });

  it("displays the correct rating value", () => {
    render(<RatingStars value={4.5} max={5} />);

    expect(screen.getByText("4.5")).toBeInTheDocument();
  });

  it("renders correctly when max is greater than 5", () => {
    render(<RatingStars value={6} max={10} />);

    const fullStars = screen.getAllByRole("img", { name: "star full" });
    expect(fullStars).toHaveLength(6);

  const emptyStars = screen.getAllByRole("img", { name: "empty star" });
    expect(emptyStars).toHaveLength(4);
  });
});