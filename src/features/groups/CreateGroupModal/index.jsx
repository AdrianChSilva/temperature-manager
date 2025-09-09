import { NewGroupForm } from "@/entities/Group/NewGroupForm";
import { useAppStore } from "@/app/store";
import PropTypes from "prop-types";

export function CreateGroupModal({ isOpen, onClose }) {
  const addGroup = useAppStore((s) => s.addGroup);

  const handleCreate = (name) => {
    addGroup(name);
  };

  return (
    <NewGroupForm isOpen={isOpen} onClose={onClose} onCreate={handleCreate} />
  );
}

CreateGroupModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
