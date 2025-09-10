import { render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { CreateGroupModal } from "./index";

vi.mock("@/entities/Group/NewGroupForm", () => ({
  NewGroupForm: ({ onCreate }) => {
    if (onCreate) {
      onCreate("Test Group");
    }
    return <div data-testid="new-group-form">Mocked NewGroupForm</div>;
  },
}));

const mockAddGroup = vi.fn();
vi.mock("@/app/store", () => ({
  useAppStore: () => mockAddGroup,
}));

describe("CreateGroupModal", () => {
  it("should call addGroup when onCreate is triggered", () => {
    render(<CreateGroupModal isOpen={true} onClose={vi.fn()} />);

    expect(mockAddGroup).toHaveBeenCalledWith("Test Group");
  });
});
