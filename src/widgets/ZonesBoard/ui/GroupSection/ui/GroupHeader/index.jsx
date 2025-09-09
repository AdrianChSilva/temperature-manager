import PropTypes from "prop-types";

export function GroupHeader({
  groupName,
  isExpanded,
  onToggleExpansion,
  children,
}) {
  return (
    <header className="group-header">
      <button
        className="group-header__toggle"
        aria-expanded={isExpanded}
        onClick={onToggleExpansion}
        title={isExpanded ? "Contraer" : "Expandir"}
      >
        {isExpanded ? "▾" : "▸"}
      </button>

      <div className="group-header__title">{groupName}</div>

      {children}
    </header>
  );
}

GroupHeader.propTypes = {
  groupName: PropTypes.string.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  onToggleExpansion: PropTypes.func.isRequired,
  children: PropTypes.node,
};
