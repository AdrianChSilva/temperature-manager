import { NewZoneForm } from "@/entities/Zone/NewZoneForm";
import { useAppStore } from "@/app/store";
import PropTypes from "prop-types";

export function CreateZoneModal({ isOpen, onClose }) {
  const groups = useAppStore((s) => s.groups);
  const addZone = useAppStore((s) => s.addZone);

  const handleCreate = (payload) => {
    addZone(payload);
  };

  return (
    <NewZoneForm
      isOpen={isOpen}
      onClose={onClose}
      onCreate={handleCreate}
      groups={groups}
    />
  );
}

CreateZoneModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
