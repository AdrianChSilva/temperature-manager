import { useAppStore } from "@/app/store";
import { useState } from "react";
import PropTypes from "prop-types";
import { ZoneCard } from "@/entities/Zone/ZoneCard";
import { GroupHeader } from "./ui/GroupHeader";
import { GroupEditForm } from "./ui/GroupEditForm";
import { GroupActions } from "./ui/GroupActions";
import "./styles/GroupSection.css";

export function GroupSection({ group, zones }) {
  const ui = useAppStore((s) => s.ui);
  const toggleGroupPower = useAppStore((s) => s.toggleGroupPower);
  const expandGroup = useAppStore((s) => s.expandGroup);
  const collapseGroup = useAppStore((s) => s.collapseGroup);
  const toggleZone = useAppStore((s) => s.toggleZone);
  const deleteGroup = useAppStore((s) => s.deleteGroup);
  const renameGroup = useAppStore((s) => s.renameGroup);

  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");

  const expanded = ui.expandedGroups.includes(group.id);
  const anyTurnedOn = zones.some((z) => z.power);

  const handleTogglePower = (powerState) => {
    toggleGroupPower(group.id, powerState);
  };
  const handleToggleExpansion = () => {
    expanded ? collapseGroup(group.id) : expandGroup(group.id);
  };

  const handleRename = () => {
    setEditingId(group.id);
    setEditName(group.name);
  };

  const handleDelete = () => {
    const zonesToDelete = zones.filter(
      (zonas) => zonas.groupId === group.id
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
