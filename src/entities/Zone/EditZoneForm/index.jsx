import { useState } from "react";
import PropTypes from "prop-types";
import { Modal } from "@/shared/ui/Modal";

export function EditZoneForm({ zone, onSave, onCancel, isOpen }) {
  const [name, setName] = useState(zone.name);
  const [desiredTemp, setDesiredTemp] = useState(zone.desiredTemp);

  const handleClose = () => {
    setName(zone.name);
    setDesiredTemp(zone.desiredTemp);
    onCancel();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) return;
    onSave(trimmedName, Number(desiredTemp));
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <Modal.Header>Editar zona</Modal.Header>
      <Modal.Body>
        <form
          id="edit-zone-form"
          name="edit-zone-form"
          onSubmit={handleSubmit}
          className="modal__body"
        >
          <label className="field">
            <span>Nombre de la zona *</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej: Cocina"
              required
              autoFocus
            />
          </label>

          <label className="field">
            <span>Temperatura deseada *</span>
            <input
              type="number"
              value={desiredTemp}
              onChange={(e) => setDesiredTemp(e.target.value)}
              min="5"
              max="35"
              step="0.5"
              required
            />
          </label>

          <Modal.Footer>
            <button type="button" className="btn" onClick={handleClose}>
              Cancelar
            </button>
            <button type="submit" className="btn">
              Guardar cambios
            </button>
          </Modal.Footer>
        </form>
      </Modal.Body>
    </Modal>
  );
}

EditZoneForm.propTypes = {
  zone: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    desiredTemp: PropTypes.number.isRequired,
  }).isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};
