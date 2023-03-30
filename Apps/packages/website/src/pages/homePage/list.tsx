import { CategoryTextMap } from "@/consts/enum";
import { TagColor } from "@/utils/tagColor";
import {
  CommentOutlined,
  HeartOutlined,
  LikeOutlined,
} from "@ant-design/icons";
import { Empty, Pagination, Spin } from "antd";
import { FC, useContext, useMemo, useState } from "react";
import { AppControlContext } from "@/hooks/useAppControl";
import styles from "./index.module.less";
import { Link } from "umi";
import { isEmpty } from "lodash";

interface IProps {
  articles: API.ArticleEntity[];
}
const Article: FC<IProps> = ({ articles }) => {
  const { AppAction } = useContext(AppControlContext);

  // 分页相关
  const [page, setPage] = useState<number>(1);
  const showArticle = useMemo(() => {
    return articles.slice((page - 1) * 5, page * 5);
  }, [page, articles]);
  // laoding
  const loading = AppAction.computedState.loading.loadingArticle;
  return (
    <div className={styles.articleListCtn}>
      <Spin spinning={loading}>
        {showArticle.map((i) => (
          <div key={i.id} className={styles.articleItemCtn}>
            <header className={styles.articleItemHeader}>
              <span className={styles.author}>zhuwenfu</span> |
              <span>2月前</span>|
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
                {i.like_cnt}
              </span>
              <span>
                <HeartOutlined className={styles.actionIcon} />
                &nbsp;
                {i.collect_cnt}
              </span>
              <span>
                <CommentOutlined />
                &nbsp; 73
              </span>
            </footer>
          </div>
        ))}
      </Spin>
      {isEmpty(showArticle) && (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          style={{
            height: "45%",
            position: "absolute",
            marginTop: "50%",
          }}
          description="暂无相关文章哦～"
        />
      )}
      <Pagination
        size="small"
        className={styles.pagination}
        onChange={setPage}
        pageSize={5}
        current={page}
        total={articles.length}
        showSizeChanger={false}
        showTotal={(total) => <span>共{total}篇帖子</span>}
      />
    </div>
  );
};

export default Article;
