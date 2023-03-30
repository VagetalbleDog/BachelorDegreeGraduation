import { defineConfig } from "umi";
export default defineConfig({
  routes: [
    { path: "/", component: "homePage" },
    { path: "/article/:id", component: "article" },
  ],
  npmClient: "pnpm",
  proxy: {
    "/api": {
      target: "http://localhost:4000",
      changeOrigin: true,
      pathRewrite: { "^/api": "/" },
    },
  },
});
