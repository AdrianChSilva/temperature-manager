import { useState } from "react";
import { Modal } from "@/shared/ui/Modal";
import PropTypes from "prop-types";

const initialFormState = {
  name: "",
  groupId: "",
  desiredTemp: "",
  power: false,
};

export function NewZoneForm({ isOpen, onClose, onCreate, groups }) {
  const [form, setForm] = useState(initialFormState);

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = form.name.trim();
    if (!name) return;
    const payload = {
      groupId: form.groupId || groups[0]?.id,
      name,
      desiredTemp: form.desiredTemp === "" ? null : Number(form.desiredTemp),
      power: form.power,
    };
    onCreate(payload);
    onClose();
    setForm(initialFormState);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Header>Nueva zona</Modal.Header>
      <Modal.Body>
        <form
          id="new-zone-form"
          name="new-zone-form"
          onSubmit={handleSubmit}
          className="modal__body"
        >
          <label className="field">
            <span>Nombre *</span>
            <input
              required
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="Ej. Salón"
            />
          </label>

          <label className="field">
            <span>Grupo</span>
            <select
              value={form.groupId || groups[0]?.id}
              onChange={(e) =>
                setForm((f) => ({ ...f, groupId: e.target.value }))
              }
            >
              {groups.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.name}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>Temperatura objetivo (opcional)</span>
            <input
              type="number"
              min="0"
              max="50"
              placeholder="Ej. 22"
              value={form.desiredTemp}
              onChange={(e) =>
                setForm((f) => ({ ...f, desiredTemp: e.target.value }))
              }
            />
          </label>

          <label className="field field--row" style={{ alignItems: "center" }}>
            <input
              type="checkbox"
              checked={form.power}
              onChange={(e) =>
                setForm((f) => ({ ...f, power: e.target.checked }))
              }
            />
            <span>Encendida</span>
          </label>

          <Modal.Footer>
            <button type="button" className="btn" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn">
              Crear zona
            </button>
          </Modal.Footer>
        </form>
      </Modal.Body>
    </Modal>
  );
}

NewZoneForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.bool.isRequired,
  onCreate: PropTypes.func.isRequired,
  groups: PropTypes.array.isRequired,
};
