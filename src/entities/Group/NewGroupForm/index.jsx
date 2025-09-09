import { useState } from "react";
import { Modal } from "@/shared/ui/Modal";
import PropTypes from "prop-types";

export function NewGroupForm({ isOpen, onClose, onCreate }) {
  const [name, setName] = useState("");

  const handleClose = () => {
    onClose();
    setName("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    onCreate(trimmed);
    handleClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <Modal.Header>Nuevo grupo</Modal.Header>
      <Modal.Body>
        <form
          id="new-group-form"
          name="new-group-form"
          onSubmit={handleSubmit}
          className="modal__body"
        >
          <label className="field">
            <span>Nombre del grupo *</span>
            <input
              required
              placeholder="Ej: Cocina"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-label="Ej: Cocina"
              autoFocus
            />
          </label>

          <Modal.Footer>
            <button type="button" className="btn" onClick={handleClose}>
              Cancelar
            </button>
            <button type="submit" className="btn">
              Crear
            </button>
          </Modal.Footer>
        </form>
      </Modal.Body>
    </Modal>
  );
}

NewGroupForm.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
};
