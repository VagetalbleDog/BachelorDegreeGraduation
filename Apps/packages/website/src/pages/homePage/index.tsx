import React, { FC, useEffect, useState } from "react";
import icon from "@/assets/icon.png";
import styles from "./index.module.less";
import slogan from "@/assets/slogan.png";
import { BellFilled, BellOutlined } from "@ant-design/icons";
import { Button, Input, Menu } from "antd";
import { isEmpty } from "lodash";
import { AppControlContext, useAppControl } from "../hooks/useAppControl";
import ArticleList from "./list";
import ContextComposer from "@/utils/ContextComposer";
import { useSetState } from "ahooks";

type SelectType = "home" | "loved" | "collect" | "article" | "write";
const Home: FC = () => {
  // 页面视图state
  const [select, setSelect] = useState<SelectType>("home");
  const [articleSelectInfo, setArticleSelectInfo] = useSetState({
    category: undefined,
    search: "",
  });
  // hooks
  const appControlIns = useAppControl();
  const { AppAction, formInitValue } = appControlIns;
  const articles = AppAction.computedState.articleList(
    articleSelectInfo.category,
    articleSelectInfo.search
  );
  return (
    <div>
      <AppControlContext.Provider value={appControlIns}>
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
                <Button
                  type="text"
                  style={
                    select === "home"
                      ? { marginLeft: 16, color: "#1e80ff" }
                      : { marginLeft: 16 }
                  }
                  onClick={() => setSelect("home")}
                >
                  首页
                </Button>
                <Button
                  type="text"
                  style={select === "collect" ? { color: "#1e80ff" } : {}}
                  onClick={() => setSelect("collect")}
                >
                  我的收藏
                </Button>
                <Button
                  type="text"
                  style={select === "loved" ? { color: "#1e80ff" } : {}}
                  onClick={() => setSelect("loved")}
                >
                  我的点赞
                </Button>
                <Button
                  type="text"
                  style={select === "article" ? { color: "#1e80ff" } : {}}
                  onClick={() => setSelect("article")}
                >
                  我的文章
                </Button>
                <Button
                  type="text"
                  style={select === "write" ? { color: "#1e80ff" } : {}}
                  onClick={() => setSelect("write")}
                >
                  写文章
                </Button>
              </nav>
            </div>
            <img src={slogan} style={{ height: 48 }} />
            <div className={styles.right}>
              <Input.Search
                style={{ width: "320px" }}
                placeholder="请输入关键词以搜索文章"
              />
              <BellOutlined style={{ fontSize: 30 }} />
              <Button type="primary">用户中心</Button>
              <img
                alt="avatar"
                src="https://p3-passport.byteimg.com/img/user-avatar/587c5216244f7bd910286b8bf345084f~100x100.awebp"
                style={{ width: "42px", height: "42px", borderRadius: "50%" }}
              />
            </div>
          </div>
          <div className={styles.navBar}></div>
        </header>
        <ArticleList articles={articles} />
      </AppControlContext.Provider>
    </div>
  );
};

export default React.memo(Home);
