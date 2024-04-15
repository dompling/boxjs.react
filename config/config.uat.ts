import { defineConfig } from "@umijs/max";

console.log(`Github`);

export default defineConfig({
  // base: "/boxjs.react/",
  publicPath: "./",
  history: {
    type: "hash",
  },
  links: [
    {
      rel: "Bookmark",
      href: "https://raw.githubusercontent.com/chavyleung/scripts/master/BOXJS.png",
    },
    {
      rel: "shortcut icon",
      type: "image/x-icon",
      href: "https://raw.githubusercontent.com/chavyleung/scripts/master/BOXJS.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "60x60",
      href: "https://raw.githubusercontent.com/chavyleung/scripts/master/BOXJS.png",
    },
  ],
});
