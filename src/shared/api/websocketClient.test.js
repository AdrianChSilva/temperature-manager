import { describe, it, expect, vi, beforeEach } from "vitest";
import { Server } from "mock-socket";
import { WS_URL, ensureMockServer } from "./websocketClient";
import { emitOnce } from "../lib/telemetry";

vi.mock("../lib/telemetry", () => ({
  emitOnce: vi.fn(),
}));

vi.mock("mock-socket", () => ({
  Server: vi.fn(),
}));

describe("websocketClient", () => {
  let mockServer;
  let mockSocket;
  let onConnectionCallback;

  beforeEach(() => {
    vi.clearAllMocks();

    mockSocket = { on: vi.fn() };
    mockServer = {
      on: vi.fn((event, callback) => {
        if (event === "connection") {
          onConnectionCallback = callback;
        }
      }),
    };

    Server.mockImplementation(() => mockServer);
    vi.stubGlobal(
      "setInterval",
      vi.fn(() => 123)
    );
    vi.stubGlobal("clearInterval", vi.fn());
  });

  it("should export correct WebSocket URL", () => {
    expect(WS_URL).toBe("ws://localhost:77777/telemetry");
  });

  it("should create mock server and setup connection handler", () => {
    ensureMockServer();

    expect(Server).toHaveBeenCalledWith(WS_URL);
    expect(mockServer.on).toHaveBeenCalledWith(
      "connection",
      expect.any(Function)
    );
  });

  it("should emit telemetry immediately and setup interval on connection", () => {
    ensureMockServer();
    onConnectionCallback(mockSocket);

    expect(emitOnce).toHaveBeenCalledWith(mockSocket);
    expect(setInterval).toHaveBeenCalledWith(expect.any(Function), 2500);
  });
});
