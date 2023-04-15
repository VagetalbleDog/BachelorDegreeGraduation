import { defineConfig } from "umi";
export default defineConfig({
  routes: [
    { path: "/", component: "homePage" },
    { path: "/article/:id", component: "article" },
    { path: "/register", component: "register" },
    { path: "/login", component: "login" },
    { path: "/userCenter/:userId", component: "userCenter" },
    { path: "/write", component: "write" },
    { path: "/write/:id", component: "write" },
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
