import { useCallback } from "react";
import PropTypes from "prop-types";
import "./styles/ZoneCard.css";
import { getZoneState, getSubtitle } from "./lib/zoneCardUtilities";

const ARIA_LABELS = {
  zoneLabel: (name) => `Zone: ${name}`,
  powerOn: "Turn off",
  powerOff: "Turn on",
};

export function ZoneCard({ zone, onToggle }) {
  const zoneState = getZoneState(zone);
  const subtitle = getSubtitle(zone);

  const handleToggle = useCallback(
    (e) => {
      e.stopPropagation();
      onToggle(zone.id);
    },
    [onToggle, zone.id]
  );

  return (
    <article
      className={`zone-card state-${zoneState}`}
      aria-label={ARIA_LABELS.zoneLabel(zone.name)}
    >
      <div className="bg-comfort" aria-hidden="true" />
      <div className="decorative-icon" aria-hidden="true" />
      <div className="zone-card__active">
        <header className="zc-head">
          <div className="zc-temp">
            <span className="zc-temp__value">{zone.temperature}°</span>
          </div>

          <div className="zc-icons">
            <button
              className="zc-power"
              aria-pressed={zone.power}
              aria-label={
                zone.power ? ARIA_LABELS.powerOn : ARIA_LABELS.powerOff
              }
              onClick={handleToggle}
              type="button"
            >
              <div className="zc-power__icon" aria-hidden="true" />
            </button>
          </div>
        </header>

        <footer className="zc-foot">
          <div className="zc-name" title={zone.name}>
            {zone.name}
          </div>
          <div className="zc-sub">{subtitle}</div>
        </footer>
      </div>
    </article>
  );
}

ZoneCard.propTypes = {
  zone: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    temperature: PropTypes.number.isRequired,
    desiredTemp: PropTypes.number.isRequired,
    power: PropTypes.bool.isRequired,
  }).isRequired,
  onToggle: PropTypes.func.isRequired,
};
