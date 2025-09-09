import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useAppStore = create(
  persist(
    (set, get) => ({
      zones: [
        {
          id: "z1",
          name: "Salón",
          power: true,
          temperature: 22,
          desiredTemp: 22,
          groupId: "g1",
        },
        {
          id: "z2",
          name: "Dormitorio",
          power: false,
          temperature: 24,
          desiredTemp: 22,
          groupId: "g1",
        },
        {
          id: "z3",
          name: "Oficina",
          power: true,
          temperature: 20,
          desiredTemp: 22,
          groupId: "g2",
        },
      ],

      groups: [
        { id: "g1", name: "Planta Baja" },
        { id: "g2", name: "Planta Alta" },
      ],

      ui: {
        expandedGroups: ["g1", "g2"],
      },

      addZone({ groupId, name, temperature, desiredTemp, power }) {
        const defaultAmbient = 24;

        const temp = Number.isFinite(temperature)
          ? Number(temperature)
          : defaultAmbient;

        const setPoint = Number.isFinite(desiredTemp)
          ? Number(desiredTemp)
          : temp;

        const isOn = typeof on === "boolean" ? power : false;
        const zone = {
          id: crypto.randomUUID(),
          groupId,
          name,
          power: isOn,
          temperature: temp,
          desiredTemp: setPoint,
        };
        set({ zones: [...get().zones, zone] });
      },

      toggleZone(id) {
        set({
          zones: get().zones.map((zone) =>
            zone.id === id ? { ...zone, power: !zone.power } : zone
          ),
        });
      },

      addGroup(name) {
        const group = { id: crypto.randomUUID(), name };
        set({ groups: [...get().groups, group] });
        return group.id;
      },

      renameGroup(id, name) {
        set({
          groups: get().groups.map((group) =>
            group.id === id ? { ...group, name } : group
          ),
        });
      },

      deleteGroup(id) {
        const filteredGroups = get().groups.filter((group) => group.id !== id);
        const filteredZones = get().zones.filter((zone) => zone.groupId !== id);
        // Also remove from expandedGroups UI state
        const expanded = get().ui.expandedGroups.filter((gid) => gid !== id);
        set({
          groups: filteredGroups,
          zones: filteredZones,
          ui: {
            ...get().ui,
            expandedGroups: expanded,
          },
        });
      },

      toggleGroupPower(groupId, powerState) {
        const targetZoneIds = new Set(
          get()
            .zones.filter((zone) => zone.groupId === groupId)
            .map((zone) => zone.id)
        );

        set({
          zones: get().zones.map((zone) =>
            targetZoneIds.has(zone.id) ? { ...zone, power: powerState } : zone
          ),
        });
      },

      expandGroup(groupId) {
        const currentExpanded = get().ui.expandedGroups;
        if (!currentExpanded.includes(groupId)) {
          set({
            ui: {
              ...get().ui,
              expandedGroups: [...currentExpanded, groupId],
            },
          });
        }
      },

      collapseGroup(groupId) {
        set({
          ui: {
            ...get().ui,
            expandedGroups: get().ui.expandedGroups.filter(
              (id) => id !== groupId
            ),
          },
        });
      },
    }),
    {
      name: "temperature-management",
      storage: createJSONStorage(() => localStorage),
      version: 1,
      partialize: (state) => ({
        zones: state.zones,
        groups: state.groups,
        ui: state.ui,
      }),
    }
  )
);
