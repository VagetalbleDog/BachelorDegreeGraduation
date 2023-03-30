import React, { FC, useContext, useEffect, useState } from "react";
import icon from "@/assets/icon.png";
import styles from "./index.module.less";
import slogan from "@/assets/slogan.png";
import { BellFilled, BellOutlined } from "@ant-design/icons";
import { Button, Input, Menu } from "antd";
import { isEmpty } from "lodash";
import { AppControlContext, useAppControl } from "../../hooks/useAppControl";
import ArticleList from "./list";
import ContextComposer from "@/utils/ContextComposer";
import { useSetState } from "ahooks";
import { CategoryTextMap, CategoryType } from "@/consts/enum";
import { enumToArray } from "@/utils";

type SelectType = "home" | "collect" | "article" | "write";
const Home: FC = () => {
  // 页面视图state
  const [select, setSelect] = useState<SelectType>("home");
  const [category, setCategory] = useState<CategoryType>(CategoryType.ALL);
  const [search, setSearch] = useState<string>("");
  // hooks
  const { AppAction, formInitValue } = useContext(AppControlContext);
  const articles = AppAction.computedState.articleList(category, search);
  return (
    <div>
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
              onSearch={(val) => setSearch(val)}
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
      <CategoryBar setCategory={setCategory} />
      <ArticleList articles={articles} />
    </div>
  );
};

interface ICategoryBarProps {
  setCategory: Function;
}
const CategoryBar: FC<ICategoryBarProps> = React.memo(({ setCategory }) => {
  const { Item } = Menu;
  const categorys = enumToArray(CategoryType);
  return (
    <Menu
      className={styles.sideMenu}
      defaultSelectedKeys={[String(CategoryType.ALL)]}
    >
      {categorys.map((i) => (
        <Item key={i} onClick={() => setCategory(i)}>
          {CategoryTextMap[i as CategoryType]}
        </Item>
      ))}
    </Menu>
  );
});
export default React.memo(Home);
