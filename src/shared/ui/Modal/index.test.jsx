import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Modal } from "./index";

describe("Modal", () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
  };
  const headerTextMock = "Test Modal";
  const contentTextMock = "Test content";
  const role = "dialog";

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Modal visibility", () => {
    it("renders when isOpen is true", () => {
      render(
        <Modal {...defaultProps}>
          <Modal.Header>{headerTextMock}</Modal.Header>
          <Modal.Body>{contentTextMock}</Modal.Body>
        </Modal>
      );

      expect(screen.getByRole(role)).toBeInTheDocument();
      expect(screen.getByText(headerTextMock)).toBeInTheDocument();
      expect(screen.getByText(contentTextMock)).toBeInTheDocument();
    });

    it("does not render when isOpen is false", () => {
      render(
        <Modal {...defaultProps} isOpen={false}>
          <Modal.Header>{headerTextMock}</Modal.Header>
          <Modal.Body>{contentTextMock}</Modal.Body>
        </Modal>
      );

      expect(screen.queryByRole(role)).not.toBeInTheDocument();
      expect(screen.queryByText(headerTextMock)).not.toBeInTheDocument();
    });
  });

  describe("Modal interaction", () => {
    it("calls onClose when overlay is clicked", async () => {
      const onClose = vi.fn();
      render(
        <Modal {...defaultProps} onClose={onClose}>
          <Modal.Header>{headerTextMock}</Modal.Header>
          <Modal.Body>{contentTextMock}</Modal.Body>
        </Modal>
      );

      const overlay = screen.getByRole(role);
      await userEvent.click(overlay);

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("does not call onClose when modal content is clicked", async () => {
      const onClose = vi.fn();
      render(
        <Modal {...defaultProps} onClose={onClose}>
          <Modal.Header>{headerTextMock}</Modal.Header>
          <Modal.Body>{contentTextMock}</Modal.Body>
        </Modal>
      );

      const modalContent = screen.getByText(contentTextMock);
      await userEvent.click(modalContent);

      expect(onClose).not.toHaveBeenCalled();
    });
  });

  describe("Modal.Header", () => {
    it("renders header with title and close button", () => {
      render(
        <Modal {...defaultProps}>
          <Modal.Header>My Modal Title</Modal.Header>
        </Modal>
      );

      expect(screen.getByText("My Modal Title")).toBeInTheDocument();
      expect(screen.getByLabelText("Cerrar")).toBeInTheDocument();
      expect(screen.getByText("✕")).toBeInTheDocument();
    });

    it("calls onClose when close button is clicked", async () => {
      const onClose = vi.fn();
      render(
        <Modal {...defaultProps} onClose={onClose}>
          <Modal.Header>{headerTextMock}</Modal.Header>
        </Modal>
      );

      const closeButton = screen.getByLabelText("Cerrar");
      await userEvent.click(closeButton);

      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe("Modal.Body", () => {
    it("renders body content", () => {
      render(
        <Modal {...defaultProps}>
          <Modal.Body>
            <p>This is the modal body content</p>
            <button>Action Button</button>
          </Modal.Body>
        </Modal>
      );

      expect(
        screen.getByText("This is the modal body content")
      ).toBeInTheDocument();
      expect(screen.getByText("Action Button")).toBeInTheDocument();
    });
  });

  describe("Modal.Footer", () => {
    it("renders footer content", () => {
      render(
        <Modal {...defaultProps}>
          <Modal.Footer>
            <button>Cancel</button>
            <button>Save</button>
          </Modal.Footer>
        </Modal>
      );

      expect(screen.getByText("Cancel")).toBeInTheDocument();
      expect(screen.getByText("Save")).toBeInTheDocument();
    });
  });

  describe("Complete modal composition", () => {
    it("renders all modal parts together", () => {
      render(
        <Modal {...defaultProps}>
          <Modal.Header>Complete Modal</Modal.Header>
          <Modal.Body>Modal body with some content</Modal.Body>
          <Modal.Footer>
            <button>Footer Button</button>
          </Modal.Footer>
        </Modal>
      );

      expect(screen.getByText("Complete Modal")).toBeInTheDocument();
      expect(
        screen.getByText("Modal body with some content")
      ).toBeInTheDocument();
      expect(screen.getByText("Footer Button")).toBeInTheDocument();
      expect(screen.getByLabelText("Cerrar")).toBeInTheDocument();
    });

    it("has correct accessibility attributes", () => {
      render(
        <Modal {...defaultProps}>
          <Modal.Header>Accessible Modal</Modal.Header>
          <Modal.Body>Content</Modal.Body>
        </Modal>
      );

      const dialog = screen.getByRole(role);
      expect(dialog).toHaveAttribute("aria-modal", "true");
    });
  });

  describe("Context functionality", () => {
    it("provides onClose function to child components via context", async () => {
      const onClose = vi.fn();
      function CustomHeader() {
        return <Modal.Header>Custom Header with Context</Modal.Header>;
      }

      render(
        <Modal {...defaultProps} onClose={onClose}>
          <CustomHeader />
        </Modal>
      );

      const closeButton = screen.getByLabelText("Cerrar");
      await userEvent.click(closeButton);

      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });
});
