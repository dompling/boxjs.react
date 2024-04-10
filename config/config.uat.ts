import { defineConfig } from "@umijs/max";

console.log(`ENV：uat`);

export default defineConfig({
  hash: true,
  history: {
    type: "hash",
  },
});
