import { describe, it, expect, beforeEach } from "vitest";
import { useAppStore } from "./index";

describe("AppStore", () => {
  beforeEach(() => {
    useAppStore.setState({
      zones: [],
      groups: [],
      ui: {
        expandedGroups: [],
      },
    });
  });

  describe("Zone Management", () => {
    it("should toggle zone power", () => {
      const zone = {
        id: "test-1",
        name: "Test Zone",
        power: false,
        temperature: 22,
        desiredTemp: 22,
        groupId: "g1",
      };
      useAppStore.setState({ zones: [zone] });

      useAppStore.getState().toggleZone("test-1");
      expect(useAppStore.getState().zones[0].power).toBe(true);

      useAppStore.getState().toggleZone("test-1");
      expect(useAppStore.getState().zones[0].power).toBe(false);
    });
  });

  describe("Group Management", () => {
    it("should add a new group", () => {
      useAppStore.getState().addGroup("New Group");

      const groups = useAppStore.getState().groups;
      expect(groups).toHaveLength(1);
      expect(groups[0].name).toBe("New Group");
    });

    it("should rename a group", () => {
      const group = { id: "g1", name: "Old Name" };
      useAppStore.setState({ groups: [group] });

      useAppStore.getState().renameGroup("g1", "New Name");
      expect(useAppStore.getState().groups[0].name).toBe("New Name");
    });

    it("should toggle group power state", () => {
      const zones = [
        { id: "z1", groupId: "g1", power: false },
        { id: "z2", groupId: "g1", power: false },
        { id: "z3", groupId: "g2", power: false },
      ];
      useAppStore.setState({ zones });

      useAppStore.getState().toggleGroupPower("g1", true);

      const updatedZones = useAppStore.getState().zones;
      expect(updatedZones.find((z) => z.id === "z1").power).toBe(true);
      expect(updatedZones.find((z) => z.id === "z2").power).toBe(true);
      expect(updatedZones.find((z) => z.id === "z3").power).toBe(false);
    });

    it("should delete group and its zones", () => {
      const initialState = {
        groups: [
          { id: "g1", name: "Group 1" },
          { id: "g2", name: "Group 2" },
        ],
        zones: [
          { id: "z1", groupId: "g1" },
          { id: "z2", groupId: "g1" },
          { id: "z3", groupId: "g2" },
        ],
        ui: {
          expandedGroups: ["g1", "g2"],
        },
      };
      useAppStore.setState(initialState);

      useAppStore.getState().deleteGroup("g1");

      const state = useAppStore.getState();
      expect(state.groups).toHaveLength(1);
      expect(state.zones).toHaveLength(1);
      expect(state.ui.expandedGroups).toEqual(["g2"]);
    });
  });

  describe("UI State", () => {
    it("should expand and collapse groups", () => {
      useAppStore.getState().expandGroup("g1");
      expect(useAppStore.getState().ui.expandedGroups).toContain("g1");

      useAppStore.getState().collapseGroup("g1");
      expect(useAppStore.getState().ui.expandedGroups).not.toContain("g1");
    });
  });

  describe("Zone Group Operations", () => {
    it("should add zone to group with defaults", () => {
      useAppStore.getState().addZone({
        name: "New Zone",
      });

      const zone = useAppStore.getState().zones[0];
      expect(zone).toEqual(
        expect.objectContaining({
          name: "New Zone",
          temperature: 24,
          desiredTemp: 24,
          power: false,
        })
      );
    });
  });
});
