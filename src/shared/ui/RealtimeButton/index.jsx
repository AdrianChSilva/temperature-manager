import PropTypes from "prop-types";
import "./RealtimeButton.css";

export function RealtimeButton({ isActive, setActive }) {
  return (
    <button
      className={`realtime-fab ${isActive ? "realtime-fab--active" : ""}`}
      aria-pressed={isActive}
      onClick={() => setActive(!isActive)}
      title={`Realtime ${isActive ? "activado" : "desactivado"}`}
    >
      Realtime {isActive ? "ON" : "OFF"}
    </button>
  );
}
RealtimeButton.propTypes = {
  isActive: PropTypes.bool.isRequired,
  setActive: PropTypes.func.isRequired,
};
