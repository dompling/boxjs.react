import { defineConfig } from "@umijs/max";

console.log(`Github`);

export default defineConfig({
  // base: "/boxjs.react/",
  publicPath: "./",
  history: {
    type: "hash"
  }
});
