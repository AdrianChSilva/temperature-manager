import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  use: {
    baseURL: "http://localhost:5173",
    screenshot: "only-on-failure",
  },
  webServer: {
    command: "pnpm dev",
    url: "http://localhost:5173",
    // eslint-disable-next-line no-undef
    reuseExistingServer: !process.env.CI,
  },
});
