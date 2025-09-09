import { render } from "@testing-library/react";
import { test, expect } from "vitest";
import { ZonesBoard } from ".";

test("ZonesBoard renders", () => {
  const { container } = render(<ZonesBoard />);
  expect(container.firstChild).toBeTruthy();
});
