import { Link, useParams } from "umi";
import { Anchor, Button, Empty, Layout } from "antd";
import React, { FC, useContext } from "react";
import styles from "./index.module.less";
import { AppControlContext } from "@/hooks/useAppControl";
import { markdown } from "@/utils/markdown";
import Wrapper from "@/component/wrapper";

interface IProps {}
const ArticleDetail: FC<IProps> = () => {
  const id = useParams().id || 1;
  const { AppAction } = useContext(AppControlContext);
  const detailData = AppAction.computedState.articleDetail(id);
  if (!detailData.content) {
    return <></>;
  }
  const { html, tocList } = markdown(detailData.content);
  return (
    <Wrapper>
      <div className={styles.markdownCtn}>
        <div
          className="markdown-body"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
      <Anchor className={styles.toc}>{tocList.map((i) => i)}</Anchor>
    </Wrapper>
  );
};

export default React.memo(ArticleDetail);
