import { render } from "@testing-library/react";
import { test, expect, vi } from "vitest";
import { ZonesBoard } from ".";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

test("ZonesBoard renders", () => {
  const { container } = render(<ZonesBoard />);
  expect(container.firstChild).toBeTruthy();
});
