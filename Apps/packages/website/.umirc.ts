import { defineConfig } from "umi";
export default defineConfig({
  routes: [
    { path: "/docs", component: 'docs1' },
    {path:'/',component:'homePage'}
  ],
  npmClient: 'pnpm',
});
