import { useAppStore } from "@/app/store";
import { ZoneCard } from "@/entities/ZoneCard";
import "./styles/GroupSection.css";

export function GroupSection({ group, zones }) {
  const ui = useAppStore((s) => s.ui);
  const toggleGroupPower = useAppStore((s) => s.toggleGroupPower);
  const expandGroup = useAppStore((s) => s.expandGroup);
  const collapseGroup = useAppStore((s) => s.collapseGroup);
  const toggleZone = useAppStore((s) => s.toggleZone);

  const expanded = ui.expandedGroups.includes(group.id);
  const anyTurnedOn = zones.some((z) => z.power);

  const handleTogglePower = (powerState) => {
    toggleGroupPower(group.id, powerState);
  };

  return (
    <section
      key={group.id}
      aria-label={`Group ${group.name}`}
      style={{ marginBottom: 16 }}
    >
      <header className="group-header">
        <button
          className="group-header__toggle"
          aria-expanded={expanded}
          onClick={() =>
            expanded ? collapseGroup(group.id) : expandGroup(group.id)
          }
          title={expanded ? "Contract" : "Expand"}
        >
          {expanded ? "▾" : "▸"}
        </button>

        <div className="group-header__title">{group.name}</div>

        <div className="group-header__actions">
          <button
            className={`chip chip--ghost ${!anyTurnedOn ? "is-active" : ""}`}
            onClick={() => handleTogglePower(false)}
          >
            OFF
          </button>
          <button
            className={`chip chip--ghost ${anyTurnedOn ? "is-active" : ""}`}
            onClick={() => handleTogglePower(true)}
          >
            ON
          </button>
        </div>
      </header>

      {expanded && (
        <div className="zones-grid" role="list">
          {zones.map((z) => (
            <div role="listitem" key={z.id}>
              <ZoneCard zone={z} onToggle={toggleZone} />
            </div>
          ))}
          {zones.length === 0 && (
            <p style={{ opacity: 0.7 }}>No hay zonas en este grupo</p>
          )}
        </div>
      )}
    </section>
  );
}
