declare namespace API {
  type ArticleControllerFindAllParams = {
    /** query by category */
    category?: any;
    /** query by id */
    id?: any;
  };

  type ArticleEntity = {
    /** 文章id */
    id: number;
    /** 文章标题 */
    title: string;
    /** 文章描述 */
    desc: string;
    /** 文章内容 */
    content: string;
    /** 文章分类 */
    category: 1 | 2 | 3 | 4 | 5 | 6 | 7;
    /** 点赞次数 */
    like_cnt: number;
    /** 收藏次数 */
    collect_cnt: number;
  };

  type searchDto = {
    /** 搜索内容 */
    search: string;
  };
}
