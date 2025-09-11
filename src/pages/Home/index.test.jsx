import { render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { HomePage } from "./index";

vi.mock("@/widgets/ZonesBoard", () => ({
  ZonesBoard: () => <div data-testid="zones-board">Zones Board</div>,
}));

describe("HomePage", () => {
  it("renders ZonesBoard component", () => {
    const { getByTestId } = render(<HomePage />);
    expect(getByTestId("zones-board")).toBeInTheDocument();
  });
});
