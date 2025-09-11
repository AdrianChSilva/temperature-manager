import { describe, it, expect } from "vitest";
import { getZoneState, getSubtitle } from "./zoneCardUtilities";

describe("zoneCardUtilities", () => {
  describe("getZoneState", () => {
    it("returns 'off' when zone power is false", () => {
      const zone = { power: false, temperature: 20, desiredTemp: 22 };
      expect(getZoneState(zone)).toBe("off");
    });

    it("returns 'heating' when temperature is below desired", () => {
      const zone = { power: true, temperature: 18, desiredTemp: 22 };
      expect(getZoneState(zone)).toBe("heating");
    });

    it("returns 'cooling' when temperature is above desired", () => {
      const zone = { power: true, temperature: 26, desiredTemp: 22 };
      expect(getZoneState(zone)).toBe("cooling");
    });

    it("returns 'comfort' when temperature equals desired", () => {
      const zone = { power: true, temperature: 22, desiredTemp: 22 };
      expect(getZoneState(zone)).toBe("comfort");
    });
  });

  describe("getSubtitle", () => {
    it("returns heating message when zone is heating", () => {
      const zone = { power: true, temperature: 18, desiredTemp: 22 };
      expect(getSubtitle(zone)).toBe("Heating to 22°");
    });

    it("returns cooling message when zone is cooling", () => {
      const zone = { power: true, temperature: 26, desiredTemp: 22 };
      expect(getSubtitle(zone)).toBe("Cooling to 22°");
    });

    it("returns success message when zone is in comfort", () => {
      const zone = { power: true, temperature: 22, desiredTemp: 22 };
      expect(getSubtitle(zone)).toBe("Success");
    });

    it("returns OFF when zone power is false", () => {
      const zone = { power: false, temperature: 20, desiredTemp: 22 };
      expect(getSubtitle(zone)).toBe("OFF");
    });
  });
});
