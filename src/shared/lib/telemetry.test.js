import { describe, it, expect, beforeEach, vi } from "vitest";
import { randomTempAround, emitOnce } from "./telemetry";
import { useAppStore } from "@/app/store";

describe("telemetryUtils", () => {
  describe("randomTempAround", () => {
    it("should generate temperature within specified range", () => {
      const base = 24;
      const amp = 2.5;

      for (let i = 0; i < 10; i++) {
        const temp = randomTempAround(base, amp);
        expect(temp).toBeGreaterThanOrEqual(base - amp);
        expect(temp).toBeLessThanOrEqual(base + amp);
      }
    });

    it("should use default values when no parameters provided", () => {
      const temp = randomTempAround();
      expect(temp).toBeGreaterThanOrEqual(21.5);
      expect(temp).toBeLessThanOrEqual(26.5);
    });
  });

  describe("emitOnce", () => {
    let mockSocket;

    beforeEach(() => {
      useAppStore.setState({
        zones: [
          { id: "zone1", desiredTemp: 22 },
          { id: "zone2", desiredTemp: 24 },
        ],
      });

      mockSocket = {
        send: vi.fn(),
      };
    });

    it("should emit correctly formatted telemetry data", () => {
      emitOnce(mockSocket);

      expect(mockSocket.send).toHaveBeenCalledTimes(1);
      const sentData = JSON.parse(mockSocket.send.mock.calls[0][0]);

      expect(sentData).toEqual({
        type: "telemetry",
        at: expect.any(Number),
        items: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            temperature: expect.any(Number),
          }),
        ]),
      });

      const items = sentData.items;
      expect(items).toHaveLength(2);
      items.forEach((item) => {
        const zone = useAppStore.getState().zones.find((z) => z.id === item.id);
        expect(zone).toBeDefined();
        expect(item.temperature).toBeGreaterThanOrEqual(zone.desiredTemp - 2.5);
        expect(item.temperature).toBeLessThanOrEqual(zone.desiredTemp + 2.5);
      });
    });

    it("should handle socket errors gracefully", () => {
      mockSocket.send = vi.fn().mockImplementation(() => {
        throw new Error("Socket closed");
      });

      expect(() => emitOnce(mockSocket)).not.toThrow();
    });

    it("should use default temperature when desiredTemp is not defined", () => {
      useAppStore.setState({
        zones: [{ id: "zone3" }],
      });

      emitOnce(mockSocket);

      const sentData = JSON.parse(mockSocket.send.mock.calls[0][0]);
      const temp = sentData.items[0].temperature;

      expect(temp).toBeGreaterThanOrEqual(21.5);
      expect(temp).toBeLessThanOrEqual(26.5);
    });
  });
});
