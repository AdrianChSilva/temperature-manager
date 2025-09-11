import { render, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { EditZoneForm } from "./index";

const mockZone = {
  id: "1",
  name: "Cocina",
  desiredTemp: 24,
};

const mockOnSave = vi.fn();
const mockOnCancel = vi.fn();

vi.mock("@/shared/ui/Modal", () => {
  const MockModal = ({ children, isOpen }) => (
    <div data-testid="modal" data-open={isOpen}>
      {children}
    </div>
  );

  MockModal.Header = ({ children }) => (
    <div data-testid="modal-header">{children}</div>
  );
  MockModal.Body = ({ children }) => (
    <div data-testid="modal-body">{children}</div>
  );
  MockModal.Footer = ({ children }) => (
    <div data-testid="modal-footer">{children}</div>
  );

  return {
    Modal: MockModal,
  };
});

describe("EditZoneForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders form when open", () => {
    const { getByTestId, getByDisplayValue } = render(
      <EditZoneForm
        zone={mockZone}
        isOpen={true}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />
    );

    expect(getByTestId("modal")).toHaveAttribute("data-open", "true");
    expect(getByDisplayValue(mockZone.name)).toBeInTheDocument();
    expect(getByDisplayValue(mockZone.desiredTemp)).toBeInTheDocument();
  });

  it("calls onSave when form is submitted", () => {
    const { getByRole } = render(
      <EditZoneForm
        zone={mockZone}
        isOpen={true}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />
    );

    const submitButton = getByRole("button", { name: /guardar/i });
    fireEvent.click(submitButton);

    expect(mockOnSave).toHaveBeenCalledWith(mockZone.name, 24);
  });

  it("calls onCancel when cancel button is clicked", () => {
    const { getByRole } = render(
      <EditZoneForm
        zone={mockZone}
        isOpen={true}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />
    );

    const cancelButton = getByRole("button", { name: /cancelar/i });
    fireEvent.click(cancelButton);

    expect(mockOnCancel).toHaveBeenCalled();
  });
});
