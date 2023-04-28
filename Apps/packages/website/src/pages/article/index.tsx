import { Link, useParams, history } from "umi";
import {
  Anchor,
  Button,
  Descriptions,
  Empty,
  Form,
  Input,
  Layout,
  message,
  Modal,
  Popconfirm,
  Tag,
  Typography,
} from "antd";
import React, { FC, useContext, useEffect, useState } from "react";
import styles from "./index.module.less";
import { AppControlContext } from "@/hooks/useAppControl";
import { markdown } from "@/utils/markdown";
import Wrapper from "@/component/wrapper";
import { TagColor } from "@/utils/tagColor";
import { avatarIdMap } from "@/utils/avatarList";
import { Comment } from "@ant-design/compatible";
import {
  CaretRightOutlined,
  CommentOutlined,
  HeartFilled,
  HeartOutlined,
  LikeFilled,
  LikeOutlined,
} from "@ant-design/icons";
import { useSetState } from "ahooks";

interface IProps {}
const { Title } = Typography;
const ArticleDetail: FC<IProps> = () => {
  const id = useParams().id || 1;
  const { AppAction } = useContext(AppControlContext);
  const { likeArticle, collectArticle, unCollect, comment } = AppAction;
  const userInfo = AppAction.computedState.userInfo();
  const [showComment, setShow] = useState(false);
  const [needUpdate, setNeedUpdate] = useState(true);
  const detailData = AppAction.computedState.articleDetail(id, needUpdate);
  const [reployTo, setReployTo] = useState<API.UserEntity>(detailData.author);

  const [commentForm] = Form.useForm();
  // 页面state
  const [already, setAlready] = useSetState({
    like: false,
    collect: false,
  });
  useEffect(() => {
    if (!detailData || !userInfo) {
      return;
    }
    setReployTo(detailData.author);
    if (detailData.likedBy?.some((user) => user.id === userInfo.id)) {
      setAlready({ like: true });
    }
    if (detailData.collectBy?.some((user) => user.id === userInfo.id)) {
      setAlready({ collect: true });
    }
  }, [detailData, userInfo]);
  if (!detailData.content) {
    return <></>;
  }
  const { html, tocList } = markdown(detailData.content);
  return (
    <Wrapper>
      <div>
        <div className={styles.mainCtn}>
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
                  <Link to={`/userCenter/${detailData.author?.id}`}>
                    <span className={styles.authorItem}>
                      <img
                        src={
                          avatarIdMap.find(
                            (item) => item.id == detailData.author?.avatar
                          )?.img
                        }
                        style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "50%",
                        }}
                      />
                      <span>{detailData.author?.nickname}</span>
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
        </div>
        <div className={styles.buttonGroup}>
          <Button
            shape="round"
            onClick={() => {
              if (!userInfo?.id) {
                message.error("登录后才能点赞哦~");
                return;
              }
              if (already.like) {
                message.info("您已经点赞过了");
                return;
              }
              likeArticle(userInfo?.id, detailData?.id);
              setAlready({ like: true });
            }}
          >
            {already.like ? (
              <LikeFilled className={styles.buttonIcon} />
            ) : (
              <LikeOutlined className={styles.buttonIcon} />
            )}
          </Button>
          {already.collect ? (
            <Button shape="round" onClick={() => {}}>
              <HeartFilled
                onClick={() => {
                  unCollect(userInfo?.id, detailData?.id);
                  setAlready({ collect: false });
                }}
                className={styles.buttonIcon}
              />
            </Button>
          ) : (
            <Button
              shape="round"
              onClick={() => {
                if (!userInfo?.id) {
                  message.error("登录后才能收藏哦~");
                  return;
                }
                collectArticle(userInfo?.id, detailData?.id);
                setAlready({ collect: true });
              }}
            >
              <HeartOutlined className={styles.buttonIcon} />
            </Button>
          )}
          <Button
            shape="round"
            onClick={() => {
              setShow(true);
            }}
          >
            <CommentOutlined className={styles.buttonIcon} />
          </Button>
        </div>
        <div className={styles.commentListCtn}>
          <Title level={4} style={{ marginTop: 0, textAlign: "center" }}>
            评论
          </Title>
          {detailData?.comments?.map((i) => (
            <div className={styles.commentCtn}>
              <div className={styles.commentTitle}>
                <Link to={`/userCenter/${i?.from?.id}`}>
                  <span className={styles.authorItem}>
                    <img
                      src={
                        avatarIdMap.find((item) => item.id == i?.from?.avatar)
                          ?.img
                      }
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                      }}
                    />
                    <span>{i?.from?.nickname}</span>
                    {i.from?.id === detailData.author?.id && (
                      <Tag color="gold">作者</Tag>
                    )}
                  </span>
                </Link>
                <CaretRightOutlined />
                <Link to={`/userCenter/${i?.to?.id}`}>
                  <span className={styles.authorItem}>
                    <img
                      src={
                        avatarIdMap.find((item) => item.id == i?.to?.avatar)
                          ?.img
                      }
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                      }}
                    />
                    <span>{i?.to?.nickname}</span>
                    {i.to?.id === detailData.author?.id && (
                      <Tag color="gold">作者</Tag>
                    )}
                  </span>
                </Link>
              </div>
              <div className={styles.commentContent}>{i.content}</div>
              <footer
                className={styles.reploy}
                onClick={() => {
                  setShow(true);
                  setReployTo(i.from);
                }}
              >
                Reploy To
              </footer>
            </div>
          ))}
          {detailData?.comments?.length === 0 && (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="暂无评论，快点击上方评论按钮回复作者吧~"
            />
          )}
        </div>
      </div>
      <Modal
        title="评论"
        open={showComment}
        onCancel={() => setShow(false)}
        okText={"回复"}
        cancelText={"取消"}
        destroyOnClose
        onOk={() => {
          const content = commentForm.getFieldValue("content");
          if (!content) {
            message.info("评论内容不能为空");
            return;
          }
          comment(userInfo, reployTo, detailData, content).then((res) => {
            if (res) {
              setNeedUpdate(!needUpdate);
              commentForm.resetFields();
            }
          });
          setShow(false);
        }}
      >
        <Typography.Title level={5} className={styles.reployTo}>
          回复给{" "}
          <span
            className={styles.authorItem}
            style={{ display: "inline-flex" }}
          >
            <img
              src={avatarIdMap.find((item) => item.id == reployTo?.avatar)?.img}
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
              }}
            />
            <span>{reployTo?.nickname}</span>
          </span>
          {reployTo?.id === detailData.author?.id && (
            <Tag color="gold">作者</Tag>
          )}
        </Typography.Title>
        <Form form={commentForm} name="comment">
          <Form.Item name="content" required>
            <Input.TextArea
              placeholder="友好的评论别人更愿意回复你哦~"
              rows={3}
            />
          </Form.Item>
        </Form>
      </Modal>
    </Wrapper>
  );
};

export default React.memo(ArticleDetail);
