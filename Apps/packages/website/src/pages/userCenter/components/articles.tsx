import Article from "@/pages/homePage/list";
import { TagColor } from "@/utils/tagColor";
import {
  CommentOutlined,
  HeartOutlined,
  LikeOutlined,
} from "@ant-design/icons";
import { Empty, Pagination, Typography } from "antd";
import { isEmpty } from "lodash";
import { FC, memo, useMemo, useState } from "react";
import { Link } from "umi";
import styles from "../index.module.less";
interface Iprops {
  articles: API.ArticleEntity[];
  type: "my" | "collect" | "liked";
}

const Articles: FC<Iprops> = ({ articles, type }) => {
  const { Title } = Typography;
  const [page, setPage] = useState<number>(1);
  const showArticle = useMemo(() => {
    return articles.slice((page - 1) * 4, page * 4);
  }, [page, articles]);
  return (
    <div className={styles.articleCtn}>
      <Title level={4} style={{ marginTop: 0 }}>
        我的{type === "my" ? "文章" : type === "collect" ? "收藏" : "点赞"}
      </Title>
      <div className={styles.articleListCtn}>
        {showArticle.map((i) => (
          <div key={i.id} className={styles.articleItemCtn}>
            <header className={styles.articleItemHeader}>
              <span className={styles.author}>zhuwenfu</span> |
              <span>
                <TagColor category={i.category} />
              </span>
            </header>
            <Link to={`/article/${i.id}`}>
              <h4 className={styles.articleItemTitle}>{i.title}</h4>
              <div className={styles.articleItemDesc}>{i.content}</div>
            </Link>
            <footer className={styles.articleItemFooter}>
              <span>
                <LikeOutlined className={styles.actionIcon} />
                &nbsp;
                {i.likedBy?.length || 0}
              </span>
              <span>
                <HeartOutlined className={styles.actionIcon} />
                &nbsp;
                {i.collectBy?.length || 0}
              </span>
              <span>
                <CommentOutlined />
                &nbsp;{i.comments?.length || 0}
              </span>
            </footer>
          </div>
        ))}
        {isEmpty(showArticle) && (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            className={styles.empty}
            description="暂无相关文章哦～"
          />
        )}
      </div>
      <Pagination
        size="small"
        className={styles.pagination}
        onChange={setPage}
        pageSize={4}
        current={page}
        total={articles.length}
        showSizeChanger={false}
        showTotal={(total) => <span>共{total}篇帖子</span>}
      />
    </div>
  );
};

export default memo(Articles);
