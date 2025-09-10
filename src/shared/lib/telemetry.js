import { useAppStore } from "@/app/store";

const DEFAULT_TEMPERATURE = 24;
const DEFAULT_TEMPERATURE_AMPLITUDE = 2.5;
const TEMPERATURE_DECIMAL_PLACES = 1;

const RANDOM_MULTIPLIER = 2;
const RANDOM_OFFSET = 1;

export function randomTempAround(
  baseTemperature = DEFAULT_TEMPERATURE,
  amplitude = DEFAULT_TEMPERATURE_AMPLITUDE
) {
  const randomDeviation =
    (Math.random() * RANDOM_MULTIPLIER - RANDOM_OFFSET) * amplitude;
  const temperature = baseTemperature + randomDeviation;
  return Number(temperature.toFixed(TEMPERATURE_DECIMAL_PLACES));
}

export function emitOnce(socket) {
  const { zones } = useAppStore.getState();

  const telemetryData = {
    type: "telemetry",
    at: Date.now(),
    items: zones.map((zone) => ({
      id: zone.id,
      temperature: randomTempAround(zone.setpoint ?? DEFAULT_TEMPERATURE),
    })),
  };

  try {
    socket.send(JSON.stringify(telemetryData));
  } catch (error) {
    console.error("WebSocket send failed:", error.message);
  }
}
