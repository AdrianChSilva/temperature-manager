import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { RealtimeButton } from "./index";

describe("RealtimeButton", () => {
  const mockSetActive = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render OFF state when inactive", () => {
    render(<RealtimeButton isActive={false} setActive={mockSetActive} />);

    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("Realtime OFF");
    expect(button).toHaveAttribute("aria-pressed", "false");
    expect(button).toHaveAttribute("title", "Realtime desactivado");
  });

  it("should render ON state when active", () => {
    render(<RealtimeButton isActive={true} setActive={mockSetActive} />);

    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("Realtime ON");
    expect(button).toHaveAttribute("aria-pressed", "true");
    expect(button).toHaveAttribute("title", "Realtime activado");
  });

  it("should toggle state when clicked", async () => {
    render(<RealtimeButton isActive={false} setActive={mockSetActive} />);

    const button = screen.getByRole("button");
    await userEvent.click(button);

    expect(mockSetActive).toHaveBeenCalledWith(true);
  });
});
