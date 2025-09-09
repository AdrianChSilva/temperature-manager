import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { NewGroupForm } from "./index";

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

describe("NewGroupForm", () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    onCreate: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders form when open", () => {
    render(<NewGroupForm {...defaultProps} />);

    expect(screen.getByText("Nuevo grupo")).toBeInTheDocument();
    expect(screen.getByLabelText("Ej: Cocina")).toBeInTheDocument();
    expect(screen.getByText("Cancelar")).toBeInTheDocument();
    expect(screen.getByText("Crear")).toBeInTheDocument();
  });

  it("does not render when closed", () => {
    render(<NewGroupForm {...defaultProps} isOpen={false} />);

    expect(screen.queryByText("Nuevo grupo")).not.toBeInTheDocument();
  });

  it("calls onCreate with trimmed name when form is submitted", async () => {
    const onCreate = vi.fn();
    render(<NewGroupForm {...defaultProps} onCreate={onCreate} />);

    const input = screen.getByLabelText("Ej: Cocina");
    const submitButton = screen.getByText("Crear");

    await userEvent.type(input, "Planta Baja");
    await userEvent.click(submitButton);

    expect(onCreate).toHaveBeenCalledWith("Planta Baja");
  });

  it("does not call onCreate when name is empty", async () => {
    const onCreate = vi.fn();
    render(<NewGroupForm {...defaultProps} onCreate={onCreate} />);

    const submitButton = screen.getByText("Crear");
    await userEvent.click(submitButton);

    expect(onCreate).not.toHaveBeenCalled();
  });

  it("calls onClose when cancel button is clicked", async () => {
    const onClose = vi.fn();
    render(<NewGroupForm {...defaultProps} onClose={onClose} />);

    const cancelButton = screen.getByText("Cancelar");
    await userEvent.click(cancelButton);

    expect(onClose).toHaveBeenCalled();
  });
});
