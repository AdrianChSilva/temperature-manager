import PropTypes from "prop-types";

export function GroupEditForm({
  editName,
  onEditNameChange,
  onSave,
  onCancel,
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave();
      }}
      className="actions-buttons"
    >
      <input
        className="btn"
        value={editName}
        onChange={(e) => onEditNameChange(e.target.value)}
        aria-label="Nuevo nombre del grupo"
        autoFocus
      />
      <button className="btn" type="submit">
        Guardar
      </button>
      <button className="btn" type="button" onClick={onCancel}>
        Cancelar
      </button>
    </form>
  );
}

GroupEditForm.propTypes = {
  editName: PropTypes.string.isRequired,
  onEditNameChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
