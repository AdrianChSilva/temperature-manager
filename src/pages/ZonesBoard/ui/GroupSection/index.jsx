import { useAppStore } from "@/app/store";
import { useState } from "react";
import PropTypes from "prop-types";
import { ZoneCard } from "@/entities/Zone/ZoneCard";
import { GroupHeader } from "./ui/GroupHeader";
import { GroupEditForm } from "./ui/GroupEditForm";
import { GroupActions } from "./ui/GroupActions";
import "./styles/GroupSection.css";

export function GroupSection({ group, zones }) {
  const ui = useAppStore((state) => state.ui);
  const toggleGroupPower = useAppStore((state) => state.toggleGroupPower);
  const toggleGroupExpansion = useAppStore(
    (state) => state.toggleGroupExpansion
  );
  const toggleZonePower = useAppStore((state) => state.toggleZonePower);
  const deleteGroup = useAppStore((state) => state.deleteGroup);
  const renameGroup = useAppStore((state) => state.renameGroup);

  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");

  const expanded = ui.expandedGroups.includes(group.id);
  const anyTurnedOn = zones.some((zone) => zone.power);

  const handleTogglePower = (powerState) => {
    toggleGroupPower(group.id, powerState);
  };
  const handleToggleExpansion = () => {
    toggleGroupExpansion(group.id);
  };

  const handleRename = () => {
    setEditingId(group.id);
    setEditName(group.name);
  };

  const handleDelete = () => {
    const zonesToDelete = zones.filter(
      (zones) => zones.groupId === group.id
    ).length;
    const ok = confirm(
      `¿Eliminar el grupo "${group.name}"?\n\n` +
        `Se eliminarán ${zonesToDelete} zona(s) pertenecientes a este grupo. ` +
        "Esta acción no se puede deshacer."
    );
    if (ok) deleteGroup(group.id);
  };

  const handleSaveEdit = () => {
    const name = editName.trim();
    if (name) renameGroup(group.id, name);
    setEditingId(null);
    setEditName("");
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditName("");
  };
  return (
    <section
      key={group.id}
      aria-label={`Group ${group.name}`}
      style={{ marginBottom: 16 }}
    >
      <GroupHeader
        groupName={group.name}
        isExpanded={expanded}
        onToggleExpansion={handleToggleExpansion}
      >
        {editingId === group.id ? (
          <GroupEditForm
            editName={editName}
            onEditNameChange={setEditName}
            onSave={handleSaveEdit}
            onCancel={handleCancelEdit}
          />
        ) : (
          <GroupActions
            anyZoneOn={anyTurnedOn}
            onRename={handleRename}
            onDelete={handleDelete}
            onTogglePower={handleTogglePower}
          />
        )}
      </GroupHeader>

      {expanded && (
        <div className="zones-grid" role="list">
          {zones.map((zone) => (
            <div role="listitem" key={zone.id}>
              <ZoneCard zone={zone} onToggle={toggleZonePower} />
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

GroupSection.propTypes = {
  group: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  zones: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      power: PropTypes.bool,
      groupId: PropTypes.string,
    })
  ).isRequired,
};
