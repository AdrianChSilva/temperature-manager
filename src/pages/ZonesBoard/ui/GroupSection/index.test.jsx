import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { GroupSection } from "./index";

// Mock del store
const mockStoreActions = {
  toggleGroupPower: vi.fn(),
  toggleGroupExpansion: vi.fn(),
  toggleZonePower: vi.fn(),
  deleteGroup: vi.fn(),
  renameGroup: vi.fn(),
};

const mockUiState = {
  expandedGroups: ["g1"],
};

vi.mock("@/app/store", () => ({
  useAppStore: (selector) => {
    const mockStore = {
      ui: mockUiState,
      ...mockStoreActions,
    };
    return selector(mockStore);
  },
}));

vi.mock("@/entities/Zone/ZoneCard", () => ({
  ZoneCard: ({ zone, onToggle }) => (
    <div data-testid={`zone-card-${zone.id}`}>
      <span>{zone.name}</span>
      <button onClick={() => onToggle(zone.id)}>
        {zone.power ? "ON" : "OFF"}
      </button>
    </div>
  ),
}));

Object.defineProperty(window, "confirm", {
  writable: true,
  value: vi.fn(),
});

describe("GroupSection", () => {
  const mockGroup = {
    id: "g1",
    name: "Planta Baja",
  };

  const mockZones = [
    {
      id: "z1",
      name: "Salón",
      power: true,
      groupId: "g1",
    },
    {
      id: "z2",
      name: "Dormitorio",
      power: false,
      groupId: "g1",
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    mockUiState.expandedGroups = ["g1"];
  });

  it("renders group section with correct name", () => {
    render(<GroupSection group={mockGroup} zones={mockZones} />);

    expect(screen.getByLabelText("Group Planta Baja")).toBeInTheDocument();
    expect(screen.getByText("Planta Baja")).toBeInTheDocument();
  });

  it("shows zones when expanded", () => {
    render(<GroupSection group={mockGroup} zones={mockZones} />);

    expect(screen.getByTestId("zone-card-z1")).toBeInTheDocument();
    expect(screen.getByTestId("zone-card-z2")).toBeInTheDocument();
  });

  it("hides zones when collapsed", () => {
    mockUiState.expandedGroups = [];

    render(<GroupSection group={mockGroup} zones={mockZones} />);

    expect(screen.queryByTestId("zone-card-z1")).not.toBeInTheDocument();
  });

  it("toggles group expansion", async () => {
    render(<GroupSection group={mockGroup} zones={mockZones} />);

    const toggleButton = screen.getByTitle("Contraer");
    await userEvent.click(toggleButton);

    expect(mockStoreActions.toggleGroupExpansion).toHaveBeenCalledWith("g1");
  });

  it("toggles group power", async () => {
    render(<GroupSection group={mockGroup} zones={mockZones} />);

    const onButton = screen
      .getAllByText("ON")
      .find((btn) => btn.classList.contains("chip"));
    await userEvent.click(onButton);

    expect(mockStoreActions.toggleGroupPower).toHaveBeenCalledWith("g1", true);
  });

  it("enters rename mode", async () => {
    render(<GroupSection group={mockGroup} zones={mockZones} />);

    const renameButton = screen.getByTitle("Renombrar");
    await userEvent.click(renameButton);

    expect(screen.getByDisplayValue("Planta Baja")).toBeInTheDocument();
    expect(screen.getByText("Guardar")).toBeInTheDocument();
  });

  it("saves group name when renamed", async () => {
    render(<GroupSection group={mockGroup} zones={mockZones} />);
    await userEvent.click(screen.getByTitle("Renombrar"));

    const input = screen.getByDisplayValue("Planta Baja");
    await userEvent.clear(input);
    await userEvent.type(input, "Nueva Planta");
    await userEvent.click(screen.getByText("Guardar"));

    expect(mockStoreActions.renameGroup).toHaveBeenCalledWith(
      "g1",
      "Nueva Planta"
    );
  });

  it("cancels rename when cancel button is clicked", async () => {
    render(<GroupSection group={mockGroup} zones={mockZones} />);

    await userEvent.click(screen.getByTitle("Renombrar"));

    await userEvent.click(screen.getByText("Cancelar"));

    expect(screen.queryByDisplayValue("Planta Baja")).not.toBeInTheDocument();
  });

  it("shows delete confirmation", async () => {
    window.confirm.mockReturnValue(false);

    render(<GroupSection group={mockGroup} zones={mockZones} />);

    await userEvent.click(screen.getByTitle("Eliminar"));

    expect(window.confirm).toHaveBeenCalledWith(
      expect.stringContaining('¿Eliminar el grupo "Planta Baja"?')
    );
  });

  it("deletes group when confirmed", async () => {
    window.confirm.mockReturnValue(true);

    render(<GroupSection group={mockGroup} zones={mockZones} />);

    await userEvent.click(screen.getByTitle("Eliminar"));

    expect(mockStoreActions.deleteGroup).toHaveBeenCalledWith("g1");
  });

  it("handles zone toggle", async () => {
    render(<GroupSection group={mockGroup} zones={mockZones} />);

    const zoneCard = screen.getByTestId("zone-card-z1");
    const zoneButton = zoneCard.querySelector("button");
    await userEvent.click(zoneButton);

    expect(mockStoreActions.toggleZonePower).toHaveBeenCalledWith("z1");
  });
});
