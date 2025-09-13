import { useMemo, useState } from "react";
import { useAppStore } from "@/app/store";
import { GroupSection } from "./ui/GroupSection";
import { BoardHeader } from "./ui/BoardHeader";
import { ActionButtons } from "./ui/ActionButtons";
import { CreateGroupModal } from "@/features/groups/CreateGroupModal";
import { CreateZoneModal } from "@/features/zones/CreateZoneModal";

export function ZonesBoard() {
  const [newGroupOpen, setNewGroupOpen] = useState(false);
  const [newZoneOpen, setNewZoneOpen] = useState(false);

  const zones = useAppStore((state) => state.zones);
  const groups = useAppStore((state) => state.groups);

  const grouped = useMemo(() => {
    return groups.map((group) => ({
      group,
      zones: zones.filter((zone) => zone.groupId === group.id),
    }));
  }, [zones, groups]);

  return (
    <>
      <BoardHeader>
        <ActionButtons
          onNewGroupClick={() => setNewGroupOpen(true)}
          onNewZoneClick={() => setNewZoneOpen(true)}
        />
      </BoardHeader>
      {grouped.map(({ group, zones }) => (
        <GroupSection key={group.id} group={group} zones={zones} />
      ))}
      <CreateZoneModal
        isOpen={newZoneOpen}
        onClose={() => setNewZoneOpen(false)}
      />
      <CreateGroupModal
        isOpen={newGroupOpen}
        onClose={() => setNewGroupOpen(false)}
      />
    </>
  );
}
