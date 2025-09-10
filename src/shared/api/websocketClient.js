import { Server } from "mock-socket";
import { emitOnce } from "../lib/telemetry";

export const WS_URL = "ws://localhost:77777/telemetry";
let server;

export function ensureMockServer() {
  if (server) return;

  server = new Server(WS_URL);

  server.on("connection", (socket) => {
    const intervalId = setInterval(() => {
      emitOnce(socket);
    }, 2500);

    emitOnce(socket);

    const cleanup = () => {
      clearInterval(intervalId);
    };
    socket.on("close", cleanup);
    socket.on("error", cleanup);
  });
}
