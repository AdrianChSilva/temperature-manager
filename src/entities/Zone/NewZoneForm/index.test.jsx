import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { NewZoneForm } from "./index";

// Mock del Modal
vi.mock("@/shared/ui/Modal", () => {
  const Modal = ({ isOpen, onClose, children }) =>
    isOpen ? (
      <div data-testid="modal" onClick={onClose}>
        {children}
      </div>
    ) : null;

  Modal.Header = ({ children }) => (
    <div data-testid="modal-header">{children}</div>
  );
  Modal.Body = ({ children }) => <div data-testid="modal-body">{children}</div>;
  Modal.Footer = ({ children }) => (
    <div data-testid="modal-footer">{children}</div>
  );

  return { Modal };
});

describe("NewZoneForm", () => {
  const mockGroups = [
    { id: "g1", name: "Planta Baja" },
    { id: "g2", name: "Planta Alta" },
  ];

  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    onCreate: vi.fn(),
    groups: mockGroups,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders form when open", () => {
    render(<NewZoneForm {...defaultProps} />);

    expect(screen.getByText("Nueva zona")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Ej. Salón")).toBeInTheDocument();
    expect(screen.getByText("Grupo")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Ej. 22")).toBeInTheDocument();
    expect(screen.getByText("Encendida")).toBeInTheDocument();
  });

  it("does not render when closed", () => {
    render(<NewZoneForm {...defaultProps} isOpen={false} />);

    expect(screen.queryByText("Nueva zona")).not.toBeInTheDocument();
  });

  it("calls onCreate with correct payload when form is submitted", async () => {
    const onCreate = vi.fn();
    render(<NewZoneForm {...defaultProps} onCreate={onCreate} />);

    const nameInput = screen.getByPlaceholderText("Ej. Salón");
    const tempInput = screen.getByPlaceholderText("Ej. 22");
    const powerCheckbox = screen.getByRole("checkbox");
    const submitButton = screen.getByText("Crear zona");

    await userEvent.type(nameInput, "Salón Principal");
    await userEvent.type(tempInput, "23");
    await userEvent.click(powerCheckbox);
    await userEvent.click(submitButton);

    expect(onCreate).toHaveBeenCalledWith({
      groupId: "g1",
      name: "Salón Principal",
      desiredTemp: 23,
      power: true,
    });
  });

  it("does not call onCreate when name is empty", async () => {
    const onCreate = vi.fn();
    render(<NewZoneForm {...defaultProps} onCreate={onCreate} />);

    const submitButton = screen.getByText("Crear zona");
    await userEvent.click(submitButton);

    expect(onCreate).not.toHaveBeenCalled();
  });

  it("handles group selection change", async () => {
    const onCreate = vi.fn();
    render(<NewZoneForm {...defaultProps} onCreate={onCreate} />);

    const nameInput = screen.getByPlaceholderText("Ej. Salón");
    const groupSelect = screen.getByDisplayValue("Planta Baja");
    const submitButton = screen.getByText("Crear zona");

    await userEvent.type(nameInput, "Test Zone");
    await userEvent.selectOptions(groupSelect, "g2");
    await userEvent.click(submitButton);

    expect(onCreate).toHaveBeenCalledWith({
      groupId: "g2",
      name: "Test Zone",
      desiredTemp: null,
      power: false,
    });
  });

  it("handles temperature input with numeric value", async () => {
    const onCreate = vi.fn();
    render(<NewZoneForm {...defaultProps} onCreate={onCreate} />);

    const nameInput = screen.getByPlaceholderText("Ej. Salón");
    const tempInput = screen.getByPlaceholderText("Ej. 22");
    const submitButton = screen.getByText("Crear zona");

    await userEvent.type(nameInput, "Test Zone");
    await userEvent.type(tempInput, "25");
    await userEvent.click(submitButton);

    expect(onCreate).toHaveBeenCalledWith({
      groupId: "g1",
      name: "Test Zone",
      desiredTemp: 25,
      power: false,
    });
  });

  it("handles power checkbox toggle", async () => {
    const onCreate = vi.fn();
    render(<NewZoneForm {...defaultProps} onCreate={onCreate} />);

    const nameInput = screen.getByPlaceholderText("Ej. Salón");
    const powerCheckbox = screen.getByRole("checkbox");
    const submitButton = screen.getByText("Crear zona");

    await userEvent.type(nameInput, "Test Zone");
    await userEvent.click(powerCheckbox);
    await userEvent.click(submitButton);

    expect(onCreate).toHaveBeenCalledWith({
      groupId: "g1",
      name: "Test Zone",
      desiredTemp: null,
      power: true,
    });
  });

  it("calls onClose when cancel button is clicked", async () => {
    const onClose = vi.fn();
    render(<NewZoneForm {...defaultProps} onClose={onClose} />);

    const cancelButton = screen.getByText("Cancelar");
    await userEvent.click(cancelButton);

    expect(onClose).toHaveBeenCalled();
  });
});
