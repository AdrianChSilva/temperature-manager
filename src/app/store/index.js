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
        const setPoint = Number.isFinite(desiredTemp) ? Number(desiredTemp) : temp;
        const zone = {
          id: crypto.randomUUID(),
          groupId,
          name,
          power: power,
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
