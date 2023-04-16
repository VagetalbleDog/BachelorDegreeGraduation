import { Link, history } from "umi";
import { Anchor, Button, Empty, Layout } from "antd";
import React, { FC, useContext } from "react";
import styles from "./index.module.less";
import icon from "@/assets/icon.png";
import { BellOutlined } from "@ant-design/icons";
import { AppControlContext } from "@/hooks/useAppControl";
import { avatarIdMap } from "@/utils/avatarList";

const { Content, Footer } = Layout;
const Wrapper = ({ children }: any) => {
  const { AppAction } = useContext(AppControlContext);
  const isLogin = AppAction.computedState.isLogin();
  const userInfo = AppAction.computedState.userInfo();
  const isAdmin = AppAction.computedState.isAdmin(userInfo);
  return (
    <>
      <Layout className={styles.layout}>
        <header className={styles.header}>
          <div className={styles.brandBar}>
            <div className={styles.left}>
              <img
                alt="betterCode"
                src={icon}
                style={{ width: "60px", height: "60px" }}
              />
              <span className={styles.brandName}>BetterCode</span>
              <nav>
                <Link to={"/"}>
                  <Button type="text" style={{ marginLeft: 16 }}>
                    首页
                  </Button>
                </Link>
                <Button
                  type="text"
                  onClick={() => history.push("/write")}
                  disabled={!isLogin || isAdmin}
                >
                  写文章
                </Button>
              </nav>
            </div>
            <div className={styles.right}>
              {isLogin ? (
                <>
                  {isAdmin ? (
                    <Button
                      type="primary"
                      onClick={() => history.push("/adminCenter")}
                    >
                      管理员中心
                    </Button>
                  ) : (
                    <Link to={`/userCenter/${userInfo.id}`}>
                      <Button type="primary">用户中心</Button>
                    </Link>
                  )}
                  <Button
                    type="primary"
                    danger
                    onClick={() => {
                      localStorage.clear();
                      history.push("/login");
                    }}
                  >
                    注销
                  </Button>
                </>
              ) : (
                <>
                  <Button type="primary" onClick={() => history.push("/login")}>
                    登录
                  </Button>
                  <Button
                    type="primary"
                    onClick={() => history.push("/register")}
                  >
                    注册
                  </Button>
                </>
              )}
              {isLogin && (
                <>
                  <BellOutlined style={{ fontSize: 24 }} />
                  <img
                    src={
                      avatarIdMap.find((item) => item.id == userInfo.avatar)
                        ?.img
                    }
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                    }}
                  />
                </>
              )}
            </div>
          </div>
          <div className={styles.navBar}></div>
        </header>
        <Content className={styles.content}>{children}</Content>
        <Footer className={styles.footer}>
          <p>
            Copyright © 2023 BetterCode Design By Zhu.WF NorthEastern University
          </p>
        </Footer>
      </Layout>
    </>
  );
};

export default React.memo(Wrapper);
