export function getZoneState(z) {
  if (!z.power) return "off";
  if (z.temperature > z.desiredTemp) return "cooling";
  if (z.temperature < z.desiredTemp) return "heating";
  return "comfort";
}

export function getSubtitle(z) {
  const st = getZoneState(z);
  if (st === "heating") return `Heating to ${z.desiredTemp}°`;
  if (st === "cooling") return `Cooling to ${z.desiredTemp}°`;
  if (st === "comfort") return "Success";
  return "OFF";
}
