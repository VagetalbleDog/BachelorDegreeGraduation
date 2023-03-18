declare namespace API {
  type ArticleControllerFindAllParams = {
    /** query by category */
    category?: any;
    /** query by id */
    id?: any;
  };

  type ArticleControllerSearchByTitleParams = {
    /** 文章标题搜索 */
    title?: any;
  };
}
