import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { resolve } = require("path");
export default defineConfig({
  resolve: {
    alias: {
      "@pages": resolve(__dirname, "src", "pages"),
      "@components": resolve(__dirname, "src", "components"),
      "@stores": resolve(__dirname, "src", "stores"),
      "@services": resolve(__dirname, "src", "services"),
      "@utils": resolve(__dirname, "src", "utils"),
    },
  },
  plugins: [react()],
});
