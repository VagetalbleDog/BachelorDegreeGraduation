import { CategoryTextMap } from "@/consts/enum";
import { FC, useContext } from "react";
import { AppControlContext } from "../hooks/useAppControl";
import styles from "./index.module.less";

interface IProps {
  articles: API.ArticleEntity[];
}
const Article: FC<IProps> = ({ articles }) => {
  const { AppAction } = useContext(AppControlContext);
  console.log(articles);
  const i = articles[0];
  return (
    <div className={styles.articleListCtn}>
      <div className={styles.articleItemCtn}>
        <header className={styles.articleItemHeader}>
          <span>zhuwenfu</span> |<span>2月前</span>|
          <span>{CategoryTextMap[i.category]}</span>
        </header>
        <h4>
          {i.title}
          <span>{i.desc}</span>
        </h4>
        <div>{i.content}</div>
        <footer className={styles.articleItemFooter}>
          <span>点赞{i.like_cnt}</span>
          <span>收藏{i.collect_cnt}</span>
          <span>评论73</span>
        </footer>
      </div>
    </div>
  );
};

export default Article;
