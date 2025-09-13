import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useRealtimeWS } from "./useRealtimeWS";
import { WebSocket } from "mock-socket";
import { useAppStore } from "@/app/store";

describe("useRealtimeWS", () => {
  let mockWebSocket;

  beforeEach(() => {
    vi.useFakeTimers();
    useAppStore.setState({
      zones: [
        { id: "zone1", temperature: 20 },
        { id: "zone2", temperature: 22 },
      ],
    });

    // Mock WebSocket
    mockWebSocket = {
      CONNECTING: 0,
      OPEN: 1,
      CLOSING: 2,
      CLOSED: 3,
      send: vi.fn(),
      close: vi.fn(),
    };

    vi.spyOn(window, "WebSocket").mockImplementation(() => mockWebSocket);
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("should establish connection on mount", () => {
    renderHook(() => useRealtimeWS());
    expect(window.WebSocket).toHaveBeenCalledWith(
      "ws://localhost:77777/telemetry"
    );
  });

  it("should update zones state when receiving telemetry", () => {
    renderHook(() => useRealtimeWS());

    const mockMessage = {
      type: "telemetry",
      items: [
        { id: "zone1", temperature: 23.5 },
        { id: "zone2", temperature: 24.5 },
      ],
    };

    act(() => {
      mockWebSocket.onmessage?.({ data: JSON.stringify(mockMessage) });
    });

    const zones = useAppStore.getState().zones;
    expect(zones[0].temperature).toBe(23.5);
    expect(zones[1].temperature).toBe(24.5);
  });

  it("should attempt reconnection when connection closes", () => {
    renderHook(() => useRealtimeWS());

    act(() => {
      mockWebSocket.onclose?.();
      vi.advanceTimersByTime(1300);
    });

    expect(window.WebSocket).toHaveBeenCalledTimes(2);
  });

  it("should close connection when active is set to false", () => {
    const { result } = renderHook(() => useRealtimeWS());

    act(() => {
      result.current.setActive(false);
    });

    expect(mockWebSocket.close).toHaveBeenCalled();
  });

  it("should handle malformed messages gracefully", () => {
    renderHook(() => useRealtimeWS());
    const initialState = useAppStore.getState().zones;

    act(() => {
      mockWebSocket.onmessage?.({ data: "invalid json" });
    });

    expect(useAppStore.getState().zones).toEqual(initialState);
  });

  it("should ignore connection errors during cleanup", () => {
    const { unmount } = renderHook(() => useRealtimeWS());

    mockWebSocket.close.mockImplementation(() => {
      throw new Error("Failed to close");
    });

    expect(() => unmount()).not.toThrow();
  });
});
