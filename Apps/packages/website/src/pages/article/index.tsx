import { FC, useContext } from "react";
import { AppControlContext } from "../hooks/useAppControl";
interface IProps {
  artices: API.ArticleEntity[];
}
const ArticleList: FC<IProps> = () => {
  const { AppAction } = useContext(AppControlContext);
  console.log(AppAction);
  return <>this is article</>;
};

export default ArticleList;
