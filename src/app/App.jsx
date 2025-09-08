import { useAppStore } from "./store";
import { ZoneCard } from "../entities/ZoneCard";

function App() {
  const zones = useAppStore((state) => state.zones);
  const toggleZone = useAppStore((state) => state.toggleZone);
  const mappedZones = zones.map((zone) => ({
    ...zone,
    desiredTemp: zone.desiredTemp,
    on: zone.power,
  }));

  return (
    <>
      <div className="app-container">
        <main className="container">
          <div className="text">Cards</div>
          <div className="zones-grid" role="list">
            {mappedZones.map((zone) => (
              <div role="listitem" key={zone.id}>
                <ZoneCard zone={zone} onToggle={toggleZone} />
              </div>
            ))}
            {zones.length === 0 && (
              <p style={{ opacity: 0.7 }}>No hay zonas en este grupo</p>
            )}
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
