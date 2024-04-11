import { defineConfig } from "@umijs/max";

console.log(`Github`);

export default defineConfig({
  publicPath: "./",
  history: {
    type: "hash"
  }
});
