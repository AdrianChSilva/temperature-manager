import { useMemo } from "react";
import { useAppStore } from "@/app/store";
import { GroupSection } from "./ui/GroupSection";

export function ZonesBoard() {
  const zones = useAppStore((state) => state.zones);
  const groups = useAppStore((state) => state.groups);

  const grouped = useMemo(() => {
    return groups.map((group) => ({
      group,
      zones: zones.filter((zone) => zone.groupId === group.id),
    }));
  }, [zones, groups]);

  return (
    <div className="page-wrap">
      {grouped.map(({ group, zones }) => (
        <GroupSection key={group.id} group={group} zones={zones} />
      ))}
    </div>
  );
}
