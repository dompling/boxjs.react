import { defineConfig } from "@umijs/max";

console.log(`ENV：prod`);

export default defineConfig({
  history: {
    type: "memory",
  },
  publicPath: "/",
});
