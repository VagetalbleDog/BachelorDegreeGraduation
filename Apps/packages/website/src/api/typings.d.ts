declare namespace API {
  type ArticleControllerDeleteArticleParams = {
    /** 文章id */
    id: any;
  };

  type ArticleControllerFindAllParams = {
    /** query by category */
    category?: any;
  };

  type ArticleControllerFindDetailByIdParams = {
    /** 文章id */
    id: any;
  };

  type ArticleEditOrCreateReqDTO = {
    id: number;
    article: ArticleEntity;
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
    /** 评论 */
    comments: CommentEntity[];
    /** 文章分类 */
    category: 1 | 2 | 3 | 4 | 5 | 6 | 7;
    /** 点赞的用户 */
    likedBy: UserEntity[];
    /** 收藏的用户 */
    collectBy: UserEntity[];
    /** 作者 */
    author: UserEntity;
  };

  type ArticleResDTO = {
    code: number;
    data: ArticleEntity[];
  };

  type ArtilceDetailResDTO = {
    code: number;
    data: ArticleEntity;
  };

  type CommentEntity = {
    /** 评论id */
    id: number;
    /** 评论内容 */
    content: string;
    /** 评论目标用户 */
    to: UserEntity;
    /** 评论来自用户 */
    from: UserEntity;
    /** 评论文章 */
    article: ArticleEntity;
  };

  type ExecutionResDTO = {
    code: number;
    success: boolean;
  };

  type SearchReqDTO = {
    /** 搜索内容 */
    search: string;
    /** 文章类型 */
    category: number;
  };

  type UserControllerGetUserInfoByIdParams = {
    /** 用户ID */
    userId: any;
  };

  type UserEntity = {
    /** 用户id */
    id: number;
    /** 用户名 */
    username: string;
    /** 密码 */
    password: string;
    /** 头像 */
    avatar: string;
    /** 社区名 */
    nickname: string;
    /** 职业 */
    work: number;
    /** 个人描述 */
    selfDesc: string;
    /** 感兴趣领域 */
    interestsJson: string;
    /** 是否为管理员 */
    isAdmin: number;
    /** 我的文章 */
    articles: ArticleEntity[];
    /** 我喜欢的文章 */
    likedArticles: ArticleEntity[];
    /** 我收藏的文章 */
    collectArticles: ArticleEntity[];
    /** 我的粉丝 */
    fans: UserEntity[];
    /** 我的关注 */
    follows: UserEntity[];
  };

  type UserLoginDTO = {
    /** 账号 */
    username: string;
    /** 密码 */
    password: string;
  };

  type UserRegsiterDTO = {
    /** 用户信息 */
    user: UserEntity;
  };
}
