import { Link, useParams } from "umi";
import { Anchor, Button, Empty, Layout } from "antd";
import React, { FC, useContext } from "react";
import styles from "./index.module.less";
import icon from "@/assets/icon.png";
import { BellOutlined } from "@ant-design/icons";
import { AppControlContext } from "@/hooks/useAppControl";
import ReactMarkdown from "react-markdown";
import { marked } from "marked";
import gfm from "remark-gfm";
import { markdown } from "@/utils/markdown";

interface IProps {}
const { Content, Footer } = Layout;
const ArticleDetail: FC<IProps> = () => {
  const id = useParams().id || 1;
  const { AppAction } = useContext(AppControlContext);
  const detailData = AppAction.computedState.articleDetail(id);
  if (!detailData.content) {
    return <></>;
  }
  const { html, tocList } = markdown(detailData.content);
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
                <Button type="text">我的文章</Button>
                <Button type="text">写文章</Button>
              </nav>
            </div>
            <div className={styles.right}>
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
        <Content className={styles.content}>
          <div className={styles.markdownCtn}>
            <div
              className="markdown-body"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
          <Anchor className={styles.toc}>{tocList.map((i) => i)}</Anchor>
        </Content>
        <Footer className={styles.footer}>
          <p>Copyright © 2021 My Website</p>
        </Footer>
      </Layout>
    </>
  );
};

export default React.memo(ArticleDetail);
