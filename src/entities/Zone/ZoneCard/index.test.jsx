import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { ZoneCard } from "./index";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

describe("ZoneCard", () => {
  const zoneMock = {
    id: "zone-1",
    name: "Dormitorio",
    power: true,
    temperature: 23,
    desiredTemp: 22,
  };

  it("displays the name and allows the user to toggle it on", async () => {
    const onToggle = vi.fn();
    const { getByText, getByRole } = render(
      <ZoneCard zone={zoneMock} onToggle={onToggle} />
    );

    expect(getByText(/Dormitorio/i)).toBeInTheDocument();

    const powerBtn = getByRole("button", { pressed: true });
    expect(powerBtn).toBeTruthy();
    expect(powerBtn).toHaveAttribute("aria-pressed", "true");

    await userEvent.click(powerBtn);
    expect(onToggle).toHaveBeenCalledWith("zone-1");
  });

  it("displays the name and allows the user to toggle it off", async () => {
    const onToggle = vi.fn();
    const { getByText, getByRole } = render(
      <ZoneCard zone={{ ...zoneMock, power: false }} onToggle={onToggle} />
    );

    expect(getByText(/Dormitorio/i)).toBeInTheDocument();

    const powerBtn = getByRole("button", { pressed: false });
    expect(powerBtn).toBeTruthy();
    expect(powerBtn).toHaveAttribute("aria-pressed", "false");

    await userEvent.click(powerBtn);
    expect(onToggle).toHaveBeenCalledWith("zone-1");
  });

  it("has white background when power is OFF", () => {
    const onToggle = vi.fn();
    const { container } = render(
      <ZoneCard zone={{ ...zoneMock, power: false }} onToggle={onToggle} />
    );

    const zoneCard = container.querySelector(".zone-card");
    expect(zoneCard).toHaveClass("state-off");
  });
});
