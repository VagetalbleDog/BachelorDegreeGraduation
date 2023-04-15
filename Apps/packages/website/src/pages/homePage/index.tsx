import React, { FC, useContext, useEffect, useMemo, useState } from "react";
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
import { history, Link } from "umi";
import { avatarIdMap } from "@/utils/avatarList";

const Home: FC = () => {
  // 页面视图state
  const [category, setCategory] = useState<CategoryType>(CategoryType.ALL);
  const [search, setSearch] = useState<string>("");
  // hooks
  const { AppAction, formInitValue } = useContext(AppControlContext);
  const articles = AppAction.computedState.articleList(category, search);
  const isLogin = AppAction.computedState.isLogin();
  const userInfo = AppAction.computedState.userInfo();
  const isAdmin = AppAction.computedState.isAdmin(userInfo);
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
                onClick={() => history.push("/")}
                style={{ marginLeft: 16 }}
              >
                首页
              </Button>
              <Button
                type="text"
                onClick={() => history.push("/write")}
                disabled={!isLogin || isAdmin}
              >
                写文章
              </Button>
              {isAdmin && <Button type="text">官方通知</Button>}
            </nav>
          </div>
          <div className={styles.right}>
            <Input.Search
              style={{ width: "320px" }}
              placeholder="请输入关键词以搜索文章"
              allowClear
              onSearch={(val) => {
                setCategory(CategoryType.ALL);
                setSearch(val);
              }}
            />
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
                    avatarIdMap.find((item) => item.id == userInfo.avatar)?.img
                  }
                  style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                />
              </>
            )}
          </div>
        </div>
        <div className={styles.navBar}></div>
      </header>
      <CategoryBar val={category} setCategory={setCategory} />
      <ArticleList articles={articles} />
    </div>
  );
};

interface ICategoryBarProps {
  setCategory: Function;
  val: CategoryType;
}
const CategoryBar: FC<ICategoryBarProps> = React.memo(
  ({ setCategory, val }) => {
    const { Item } = Menu;
    const categorys = enumToArray(CategoryType);
    return (
      <Menu
        className={styles.sideMenu}
        defaultSelectedKeys={[String(CategoryType.ALL)]}
        selectedKeys={[String(val)]}
      >
        {categorys.map((i) => (
          <Item key={i} onClick={() => setCategory(i)}>
            {CategoryTextMap[i as CategoryType]}
          </Item>
        ))}
      </Menu>
    );
  }
);
export default React.memo(Home);
