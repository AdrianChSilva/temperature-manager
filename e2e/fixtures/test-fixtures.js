import { test as base, expect } from "@playwright/test";
import { TemperatureManagerPage } from "../pages/TemperatureManagerPage.js";

export const test = base.extend({
  temperatureManagerPage: async ({ page }, use) => {
    const temperatureManagerPage = new TemperatureManagerPage(page);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    await use(temperatureManagerPage);
  },
});

export { expect };
