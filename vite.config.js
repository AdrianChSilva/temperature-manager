import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "src") },
  },
  base: "./",
  server: {
    host: true,
  },
  test: {
    environment: "jsdom",
    setupFiles: ["src/shared/test/setupTests.js"],
    globals: true,
    include: ["src/**/*.{test,spec}.{js,jsx}"],
    coverage: {
      reporter: ["text", "html", "lcov"],
      reportsDirectory: "coverage",
      include: ["src/**/*.{js,jsx}"],
      exclude: [
        "src/main.jsx",
        "src/app/App.jsx",
        "**/*.{test,spec}.?(js|jsx)",
        "node_modules/**",
      ],
    },
  },
});
