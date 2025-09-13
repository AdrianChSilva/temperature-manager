import { useEffect, useRef, useState } from "react";
import { useAppStore } from "@/app/store";
import { ensureMockServer, WS_URL } from "../websocketClient";

export function useRealtimeWS() {
  useEffect(() => {
    ensureMockServer();
  }, []);

  const [active, setActive] = useState(true);
  const wsRef = useRef(null);

  useEffect(() => {
    if (!active) {
      try {
        wsRef.current?.close();
      } catch (error) {
        console.error("Error in activation:", error.message);
      }
      wsRef.current = null;
      return;
    }

    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        if (message?.type === "telemetry" && message.items?.length > 0) {
          message.items.forEach(({ id, temperature }) => {
            useAppStore.getState().updateZone(id, { temperature });
          });
        }
      } catch (error) {
        console.error("message send failed:", error.message);
      }
    };

    ws.onclose = () => {
      if (active && wsRef.current === ws) {
        setTimeout(() => {
          if (active && wsRef.current === ws) {
            const newWs = new WebSocket(WS_URL);
            wsRef.current = newWs;
            newWs.onmessage = ws.onmessage;
            newWs.onclose = ws.onclose;
          }
        }, 1200);
      }
    };

    return () => {
      try {
        ws.close();
      } catch (error) {
        console.error("Error WS Hook:", error.message);
      }
      if (wsRef.current === ws) {
        wsRef.current = null;
      }
    };
  }, [active]);

  return { active, setActive };
}
