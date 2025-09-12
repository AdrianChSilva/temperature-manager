import { render, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { ZoneDetailPage } from "./index";

const mockNavigate = vi.fn();
const mockToggleZone = vi.fn();
const mockUpdateZone = vi.fn();
const mockDeleteZone = vi.fn();

vi.mock("react-router-dom", () => ({
  useParams: () => ({ zoneId: "1" }),
  useNavigate: () => mockNavigate,
}));

vi.mock("@/app/store", () => {
  const mockStore = (selector) =>
    selector({
      zones: [
        {
          id: "1",
          name: "Cocina",
          temperature: 22,
          desiredTemp: 24,
          power: true,
        },
      ],
      toggleZone: mockToggleZone,
      updateZone: mockUpdateZone,
      deleteZone: mockDeleteZone,
    });

  mockStore._mockImpl = mockStore;

  return {
    useAppStore: mockStore,
  };
});

vi.mock("@/entities/Zone/EditZoneForm", () => ({
  EditZoneForm: ({ isOpen }) => (
    <div data-testid="edit-zone-form" data-open={isOpen}>
      Editar Zona
    </div>
  ),
}));

vi.mock("@/entities/Zone/ZoneCard/lib/zoneCardUtilities", () => ({
  getSubtitle: () => "Heating to 22°",
}));

Object.defineProperty(window, "confirm", {
  writable: true,
  value: vi.fn(),
});

describe("ZoneDetailPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.confirm.mockReturnValue(false);
  });

  it("renders zone details", () => {
    const { getByText } = render(<ZoneDetailPage />);
    expect(getByText("Cocina")).toBeInTheDocument();
    expect(getByText("22°")).toBeInTheDocument();
    expect(getByText("Heating to 22°")).toBeInTheDocument();
  });

  it("navigates back when back button is clicked", () => {
    const { getByLabelText } = render(<ZoneDetailPage />);
    const backButton = getByLabelText("Volver al inicio");

    fireEvent.click(backButton);

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("toggles zone power when power button is clicked", () => {
    const { getByLabelText } = render(<ZoneDetailPage />);
    const powerButton = getByLabelText("Apagar");

    fireEvent.click(powerButton);

    expect(mockToggleZone).toHaveBeenCalledWith("1");
  });

  it("opens edit form when edit button is clicked", () => {
    const { getByTitle, getByTestId } = render(<ZoneDetailPage />);
    const editButton = getByTitle("Editar zona");

    fireEvent.click(editButton);

    const editForm = getByTestId("edit-zone-form");
    expect(editForm).toHaveAttribute("data-open", "true");
  });

  it("saves zone changes when edit form is saved", () => {
    const { getByTitle, getByTestId } = render(<ZoneDetailPage />);
    const editButton = getByTitle("Editar zona");

    fireEvent.click(editButton);

    const editForm = getByTestId("edit-zone-form");
    expect(editForm).toHaveAttribute("data-open", "true");
  });

  it("cancels edit when edit form is cancelled", () => {
    const { getByTitle, getByTestId } = render(<ZoneDetailPage />);
    const editButton = getByTitle("Editar zona");

    fireEvent.click(editButton);

    expect(getByTestId("edit-zone-form")).toHaveAttribute("data-open", "true");
  });

  it("does not delete zone when user cancels confirmation", () => {
    window.confirm.mockReturnValue(false);

    const { getByTitle } = render(<ZoneDetailPage />);
    const deleteButton = getByTitle("Eliminar zona");

    fireEvent.click(deleteButton);

    expect(window.confirm).toHaveBeenCalled();
    expect(mockDeleteZone).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("deletes zone and navigates when user confirms", () => {
    window.confirm.mockReturnValue(true);

    const { getByTitle } = render(<ZoneDetailPage />);
    const deleteButton = getByTitle("Eliminar zona");

    fireEvent.click(deleteButton);

    expect(window.confirm).toHaveBeenCalledWith(
      '¿Estás seguro de que quieres eliminar la zona "Cocina"?\n\nEsta acción no se puede deshacer.'
    );
    expect(mockDeleteZone).toHaveBeenCalledWith("1");
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
