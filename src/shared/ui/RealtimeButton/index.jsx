import { useRealtimeWS } from "../../hooks/useRealtimeWS";
import "./RealtimeButton.css";

export function RealtimeButton() {
  const { active, setActive } = useRealtimeWS();

  return (
    <button
      className={`realtime-fab ${active ? "realtime-fab--active" : ""}`}
      aria-pressed={active}
      onClick={() => setActive(!active)}
      title={`Realtime ${active ? "activado" : "desactivado"}`}
    >
      Realtime {active ? "ON" : "OFF"}
    </button>
  );
}
