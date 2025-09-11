import { render, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { NotFoundPage } from "./index";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

describe("NotFoundPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders not found message", () => {
    const { getByText } = render(<NotFoundPage />);
    expect(getByText("Zona no encontrada")).toBeInTheDocument();
    expect(
      getByText("La zona a la que intentas acceder no existe")
    ).toBeInTheDocument();
  });

  it("navigates to home when button is clicked", () => {
    const { getByText } = render(<NotFoundPage />);
    const button = getByText("Volver al inicio");

    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
