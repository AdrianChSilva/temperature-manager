import PropTypes from "prop-types";
import { useState, useRef, useEffect } from "react";

export function GroupActions({ anyZoneOn, onRename, onDelete, onTogglePower }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleToggle = () => setIsOpen((value) => !value);
  const close = () => setIsOpen(false);

  useEffect(() => {
    const handleDocumentClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleDocumentClick);
    window.addEventListener("resize", handleResize);
    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
      document.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleAction = (callback) => () => {
    callback();
    close();
  };

  return (
    <>
      {/* Desktop */}
      <div className="group-header__actions">
        <button className="btn" onClick={onRename} title="Renombrar">
          ✎
        </button>
        <button className="btn" onClick={onDelete} title="Eliminar">
          🗑
        </button>

        <button
          className={`chip chip--ghost ${!anyZoneOn ? "is-active" : ""}`}
          onClick={() => onTogglePower(false)}
        >
          OFF
        </button>
        <button
          className={`chip chip--ghost ${anyZoneOn ? "is-active" : ""}`}
          onClick={() => onTogglePower(true)}
        >
          ON
        </button>
      </div>

      {/* Mobile */}
      <div className="group-header__actions--mobile" ref={dropdownRef}>
        <button
          className="group-header__dropdown-toggle"
          onClick={handleToggle}
          title="Más acciones"
        >
          ⋯
        </button>

        <div className={`group-header__dropdown ${isOpen ? "is-open" : ""}`}>
          <button
            className="group-header__dropdown-item"
            onClick={handleAction(onRename)}
          >
            Renombrar
          </button>

          <div className="group-header__dropdown-divider" />

          <button
            className={`group-header__dropdown-item ${
              !anyZoneOn ? "is-active" : ""
            }`}
            onClick={handleAction(() => onTogglePower(false))}
          >
            OFF
          </button>
          <button
            className={`group-header__dropdown-item ${
              anyZoneOn ? "is-active" : ""
            }`}
            onClick={handleAction(() => onTogglePower(true))}
          >
            ON
          </button>

          <>
            <div className="group-header__dropdown-divider" />
            <button
              className="group-header__dropdown-item group-header__dropdown-item--danger"
              onClick={handleAction(onDelete)}
            >
              Eliminar grupo
            </button>
          </>
        </div>
      </div>
    </>
  );
}

GroupActions.propTypes = {
  anyZoneOn: PropTypes.bool.isRequired,
  onRename: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onTogglePower: PropTypes.func.isRequired,
};
