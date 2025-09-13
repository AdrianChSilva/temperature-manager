import "./styles/ActionButtons.css";

export function ActionButtons({ onNewGroupClick, onNewZoneClick }) {
  return (
    <div className="action-buttons">
      <div className="action-buttons__left">
        <button className="btn" onClick={onNewGroupClick}>
          + Nuevo grupo
        </button>
        <button className="btn" onClick={onNewZoneClick}>
          + Nueva zona
        </button>
      </div>
    </div>
  );
}
