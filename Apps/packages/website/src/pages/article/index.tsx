import { Link, useParams, history } from "umi";
import {
  Anchor,
  Button,
  Descriptions,
  Empty,
  Layout,
  Popconfirm,
  Typography,
} from "antd";
import React, { FC, useContext } from "react";
import styles from "./index.module.less";
import { AppControlContext } from "@/hooks/useAppControl";
import { markdown } from "@/utils/markdown";
import Wrapper from "@/component/wrapper";
import { TagColor } from "@/utils/tagColor";
import { avatarIdMap } from "@/utils/avatarList";

interface IProps {}
const { Title } = Typography;
const ArticleDetail: FC<IProps> = () => {
  const id = useParams().id || 1;
  const { AppAction } = useContext(AppControlContext);
  const detailData = AppAction.computedState.articleDetail(id);
  const userInfo = AppAction.computedState.userInfo();
  if (!detailData.content) {
    return <></>;
  }
  const { html, tocList } = markdown(detailData.content);
  return (
    <Wrapper>
      <div className={styles.container}>
        <div className={styles.markdownCtn}>
          <Title level={4} style={{ marginTop: 0, textAlign: "center" }}>
            信息看板
          </Title>
          <Descriptions bordered>
            <Descriptions.Item label="文章标题">
              {detailData.title}
            </Descriptions.Item>
            <Descriptions.Item label="文章概要">
              {detailData.desc}
            </Descriptions.Item>
            <Descriptions.Item label="文章分类">
              <TagColor category={detailData.category} />
            </Descriptions.Item>
            <Descriptions.Item label="点赞数">
              {detailData.likedBy.length}
            </Descriptions.Item>
            <Descriptions.Item label="收藏数">
              {detailData.collectBy.length}
            </Descriptions.Item>
            <Descriptions.Item label="评论数">
              {detailData.comments.length}
            </Descriptions.Item>
            <Descriptions.Item label="作者">
              <Link to={`/userCenter/${detailData.author.id}`}>
                <span className={styles.authorItem}>
                  <img
                    src={
                      avatarIdMap.find(
                        (item) => item.id == detailData.author.avatar
                      )?.img
                    }
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                    }}
                  />
                  <span>{detailData.author.nickname}</span>
                </span>
              </Link>
            </Descriptions.Item>
            {userInfo && userInfo?.id === detailData?.author?.id && (
              <>
                <Descriptions.Item label="操作">
                  <Popconfirm
                    title="您确定要删除吗"
                    okText="确定"
                    cancelText="取消"
                    onConfirm={() =>
                      AppAction.deleteArticle(detailData.id, userInfo)
                    }
                  >
                    <Button danger type="primary">
                      删除
                    </Button>
                  </Popconfirm>
                  <Link to={`/write/${detailData.id}`}>
                    <Button type="primary" style={{ marginLeft: 8 }}>
                      修改
                    </Button>
                  </Link>
                </Descriptions.Item>
              </>
            )}
          </Descriptions>
        </div>
        <div className={styles.markdownCtn}>
          <Title level={4} style={{ marginTop: 0, textAlign: "center" }}>
            文章内容
          </Title>
          <Descriptions bordered></Descriptions>
          <div
            className="markdown-body"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
      <Anchor className={styles.toc}>{tocList.map((i) => i)}</Anchor>
    </Wrapper>
  );
};

export default React.memo(ArticleDetail);
