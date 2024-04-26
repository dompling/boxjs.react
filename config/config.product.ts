import { defineConfig } from "@umijs/max";

console.log(`Vercel`);

export default defineConfig({
  base: "/",
  publicPath: "/",
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
      rel: "manifest",
      href: "/manifest.json",
    },
    {
      rel: "apple-touch-icon",
      sizes: "60x60",
      href: "https://raw.githubusercontent.com/chavyleung/scripts/master/BOXJS.png",
    },
  ],
});
