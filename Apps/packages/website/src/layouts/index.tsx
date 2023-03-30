import { AppControlContext, useAppControl } from "@/hooks/useAppControl";
import { Link, Outlet } from "umi";
import styles from "./index.less";

export default function Layout() {
  const appControlIns = useAppControl();
  const { AppAction, formInitValue } = appControlIns;
  document.title = "BetterCode";
  return (
    <AppControlContext.Provider value={appControlIns}>
      <Outlet />
    </AppControlContext.Provider>
  );
}
