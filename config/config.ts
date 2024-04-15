import { defineConfig } from "@umijs/max";
import MonacoWebpackPlugin from "monaco-editor-webpack-plugin";
import routes from "./routes";

export default defineConfig({
  routes,
  hash: true,
  reactRouter5Compat: {},
  title: "BoxJs",
  //打包路径
  codeSplitting: {
    jsStrategy: "bigVendors",
  },
  metas: [
    {
      name: "viewport",
      content:
        "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover",
    },
    {
      "http-equiv": "Permissions-Policy",
      content: "interest-cohort=()",
    },
    {
      name: "keywords",
      content: "react, boxjs, umi, surge, qx,loon ,stash",
    },
    {
      name: "description",
      content: "online boxjs",
    },
    {
      name: "apple-mobile-web-app-capable",
      content: "yes",
    },
    {
      name: "mobile-web-app-capable",
      content: "yes",
    },
    {
      name: "apple-mobile-web-app-title",
      content: "BoxJs",
    },
    {
      name: "apple-mobile-web-app-status-bar-style",
      content: "black-translucent",
    },
    {
      name: "apple-touch-startup-image",
      content:
        "https://raw.githubusercontent.com/chavyleung/scripts/master/BOXJS.png",
    },
  ],
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
  model: {},
  antd: false,
  request: {},
  initialState: {},
  npmClient: "pnpm",
  locale: {
    antd: false, // 如果项目依赖中包含 `antd`，则默认为 true
    baseNavigator: false,
    baseSeparator: "-",
    default: "zh-CN",
    title: false,
    useLocalStorage: true,
  },
  esbuildMinifyIIFE: true,
  chainWebpack: function (config) {
    config.plugin("monaco-editor-webpack-plugin").use(MonacoWebpackPlugin, [
      {
        languages: ["javascript", "typescript"],
        features: ["codeAction", "codelens"],
      },
    ]);

    config.merge({
      optimization: {
        minimize: true,
        splitChunks: {
          chunks: "async",
          minSize: 30000,
          minChunks: 3,
          automaticNameDelimiter: ".",
          cacheGroups: {
            mui: {
              name: "mui",
              chunks: "all",
              test: /[\\/]node_modules[\\/](@mui)/,
              priority: 10,
            },
            vendors: {
              name: "vendors",
              chunks: "all",
              test: /[\\/]node_modules[\\/](lodash|moment|react|dva|postcss|mapbox-gl)/,
              priority: 10,
            },
            commons: {
              name: "commons",
              // 其余同步加载包
              chunks: "all",
              minChunks: 2,
              priority: 1,
              // 这里需要注意下，webpack5会有问题， 需加上这个 enforce: true，
              // refer: https://github.com/webpack-contrib/mini-css-extract-plugin/issues/257#issuecomment-432594711
              enforce: true,
            },
          },
        },
      },
    });
    return config;
  },
  analyze: {
    analyzerMode: "server",
    analyzerPort: 8888,
    openAnalyzer: true,
    // generate stats file while ANALYZE_DUMP exist
    generateStatsFile: false,
    statsFilename: "stats.json",
    logLevel: "info",
    defaultSizes: "parsed", // stat  // gzip
  },
});
