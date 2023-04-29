import api from "@/api";
import { ActionType, CategoryType } from "@/consts/enum";
import { generateFormAssets } from "@/utils";
import { AppControl } from "@/utils/AppControl";
import { transformInterestJson } from "@/utils/transformInterestJson";
import { useMount, useSetState } from "ahooks";
import { FormInstance, message } from "antd";
import { isEmpty } from "lodash";
import { createContext, useEffect, useState } from "react";
import { history } from "umi";

export const useAppControl = () => {
  // 表单资源
  const appFormAssest = generateFormAssets({
    regsiter: [
      "username",
      "password",
      "repeatPassword",
      "avatar",
      "nickname",
      "work",
      "selfDesc",
      "interestsJson",
      "skillJson",
    ],
    login: ["username", "password"],
    article: ["title", "category", "desc", "content"],
  });
  // 表单初始值
  const formInitValue = {};
  class AppAction extends AppControl({
    globalState: {
      loadingArticle: false,
      loadingDetail: false,
    },
  }) {
    // 定义功能逻辑

    /**
     * 注册用户
     * @param formValue 注册用户表单值
     */
    static onRegisterFinish = async (formValue: any) => {
      formValue.skillJson = "";
      formValue.interestsJson = JSON.stringify(
        transformInterestJson(formValue.work, formValue.interestsJson)
      );
      api.User.UserControllerRegsiterUser({
        user: formValue,
      }).then((res) => {
        if (res.code === 201) {
          message.success("用户注册成功,将跳转到登录页");
          // 通过路由控制
          history.push("/login");
        } else {
          message.error("注册失败,存在相同用户名");
        }
      });
    };
    /**
     * 用户登录
     */
    static onUserLogin = async (loginInfo: any) => {
      api.User.UserControllerLoginUser(loginInfo).then((res) => {
        if (res.code === 200) {
          message.success("登录成功");
          localStorage.setItem("userKey", res.token);
          history.push("/");
        } else {
          message.error("登录失败");
        }
      });
    };
    /**
     * 创建新文章
     */
    static createArticle = async (
      articleInfo: any,
      userInfo: API.UserEntity
    ) => {
      const { title, desc, category, content } = articleInfo;
      if (!title || !desc || !category || !content) {
        message.error("缺少必填项，请检查~");
        return;
      }
      if (!localStorage.getItem("userKey")) {
        message.error("您尚未登录,请登录后再发表文章哦~");
        return;
      }
      const param = {
        title,
        desc,
        category,
        content,
        author: userInfo,
      } as Pick<
        API.ArticleEntity,
        "author" | "category" | "desc" | "content" | "title"
      >;
      api.Article.ArticleControllerCreateArticle({
        id: 1,
        article: param as API.ArticleEntity,
      })
        .then((res: any) => {
          if (res.code === 201) {
            const { id } = res.res;
            message.success("文章发表成功，将为您跳转到文章详情页");
            setTimeout(() => history.push(`/article/${id}`), 800);
          } else {
            message.error("出了点问题哦~");
          }
        })
        .catch((e) => {
          console.error(e);
          message.error("服务端报错，请前往控制台查看");
        });
    };
    /**
     * 编辑文章
     */
    static editArticle = async (
      editInfo: any,
      articleInfo: API.ArticleEntity
    ) => {
      // 表单校验
      const { title, desc, category, content } = editInfo;
      if (!title || !desc || !category || !content) {
        message.error("缺少必填项");
        return;
      }
      if (!localStorage.getItem("userKey")) {
        message.error("您尚未登录,请登录后再操作哦~");
        return;
      }
      articleInfo.title = title;
      articleInfo.desc = desc;
      articleInfo.category = category;
      articleInfo.content = content;
      api.Article.ArticleControllerEditArticle({
        id: articleInfo.id,
        article: articleInfo,
      })
        .then((res: any) => {
          if (res.code === 201) {
            message.success("修改成功，将为您重定向回文章详情页");
            setTimeout(() => {
              history.push(`/article/${articleInfo.id}`);
            }, 1000);
          } else {
            message.error("似乎出了点问题");
          }
        })
        .catch((e) => {
          console.error(e);
          message.error("服务端报错，请前往控制台查看");
        });
    };
    /**
     * 删除文章
     */
    static deleteArticle = async (
      id: string | number,
      userInfo: API.UserEntity
    ) => {
      if (!id) {
        return;
      }
      api.Article.ArticleControllerDeleteArticle(
        {
          id: id,
        },
        {
          headers: {
            authorization: localStorage.getItem("userKey"), // 添加请求头
          },
        }
      )
        .then((res) => {
          if (res.code === 201) {
            message.success("删除成功，将为您跳转回用户主页");
            setTimeout(() => history.push(`/userCenter/${userInfo.id}`), 500);
          } else {
            message.error("删除失败，您没有权限");
          }
        })
        .catch((e) => console.error(e));
    };
    /**
     * 取消关注用户
     */
    static unfollowUser = async (fansId: number, followId: number) => {
      api.User.UserControllerUnFollowUser(
        {
          fansId,
          followId,
        },
        {
          headers: {
            authorization: localStorage.getItem("userKey"), // 添加请求头
          },
        }
      ).then((res) => {
        if (res.code === 200) {
          message.success("取消关注成功");
        } else {
          message.error("出了一点问题，请前往控制台查看");
        }
      });
    };
    /**
     * 关注用户
     * @param fansId 关注者id
     * @param followId 被关注者id
     */
    static followUser = async (fansId: number, followId: number) => {
      api.User.UserControllerFollowUser(
        {
          fansId,
          followId,
        },
        {
          headers: {
            authorization: localStorage.getItem("userKey"), // 添加请求头
          },
        }
      ).then((res) => {
        if (res.code === 200) {
          message.success("关注成功");
        } else {
          message.error("出了一点问题，请前往控制台查看");
        }
      });
    };
    /**
     * 点赞文章
     * @param userId
     * @param articleId
     */
    static likeArticle = async (userId: number, articleId: number) => {
      api.Article.ArticleControllerLikeArticle({
        userId,
        articleId,
      }).then((res) => {
        if (res.code === 200) {
          message.success("点赞成功");
        } else {
          message.error("出了一点问题，请前往控制台查看");
          console.log(res);
        }
      });
    };
    /**
     * 收藏文章
     * @param userId
     * @param articleId
     */
    static collectArticle = async (userId: number, articleId: number) => {
      api.Article.ArticleControllerCollectArticle({
        userId,
        articleId,
      }).then((res) => {
        if (res.code === 200) {
          message.success("收藏成功");
        } else {
          message.error("出了一点问题，请前往控制台查看");
          console.log(res);
        }
      });
    };
    /**
     * 取消收藏文章
     * @param userId
     * @param articleId
     */
    static unCollect = async (userId: number, articleId: number) => {
      api.Article.ArticleControllerUnCollect({
        userId,
        articleId,
      }).then((res) => {
        if (res.code === 200) {
          message.success("取消收藏成功");
        } else {
          message.error("出了一点问题，请前往控制台查看");
          console.log(res);
        }
      });
    };
    /**
     * 评论文章
     * @param fromId 评论用户
     * @param toId 被评论用户
     * @param articleId 文章id
     * @param content 评论内容
     */
    static comment = async (
      from: API.UserEntity,
      to: API.UserEntity,
      article: API.ArticleEntity,
      content: string
    ) => {
      if (isEmpty(from)) {
        message.error("登录后才能评论哦~");
        return false;
      }
      const comment = {
        content,
        article,
        to,
        from,
      } as API.CommentEntity;
      const res = await api.Article.ArticleControllerComment({
        comment,
      });
      if (res.res) {
        message.success("评论成功！");
        return true;
      } else {
        message.error("出了一点问题");
        return false;
      }
    };
    /**
     * 更新用户兴趣矩阵
     */
    static updateInterest = async (
      userId: number,
      category: CategoryType,
      actionType: ActionType
    ) => {
      if (!userId || !category || !actionType) {
        return;
      }
      api.User.UserControllerUpdateInterest(
        {
          userId,
          category,
          actionType,
        },
        {
          headers: {
            authorization: localStorage.getItem("userKey"), // 添加请求头
          },
        }
      ).then((res) => console.log(res));
    };
    // 计算属性
    static computedState = {
      /**
       * 页面loading态
       */
      loading: {
        loadingArticle: AppAction.Base.globalState.loadingArticle,
        loadingDetail: AppAction.Base.globalState.loadingDetail,
      },
      /**
       * 文章列表
       * @param category 文章分类
       * @param search 搜索词
       * @returns 文章列表
       */
      articleList: (
        category: number,
        search: string,
        userInfo: API.UserEntity
      ) => {
        const [data, setData] = useState<API.ArticleEntity[]>([]);
        useEffect(() => {
          if (category === CategoryType.ALL) {
            category = undefined as any;
          }
          AppAction.Base.setGlobalState({ loadingArticle: true });
          if (category === CategoryType.RECOMMEND && userInfo.id) {
            api.Article.ArticleControllerRecommend({
              userId: userInfo.id,
            }).then(({ data }) => {
              setData(data);
              AppAction.Base.setGlobalState({ loadingArticle: false });
            });
            return;
          }
          if (!isEmpty(search)) {
            api.Article.ArticleControllerSearch({ search, category }).then(
              ({ data }) => {
                setData(data);
                AppAction.Base.setGlobalState({ loadingArticle: false });
              }
            );
            return;
          }
          if (category !== CategoryType.RECOMMEND) {
            api.Article.ArticleControllerFindAll({ category }).then(
              ({ data }) => {
                setData(data);
                AppAction.Base.setGlobalState({ loadingArticle: false });
              }
            );
          }
        }, [category, search, userInfo]);
        return data;
      },
      /**
       * 文章详情
       * @param id 文章id
       * @returns
       */
      articleDetail: (id: number | string, needUpdate?: boolean) => {
        const [data, setData] = useState<API.ArticleEntity>(
          {} as API.ArticleEntity
        );
        useEffect(() => {
          if (!id) {
            return;
          }
          AppAction.Base.setGlobalState({ loadingDetail: true });
          api.Article.ArticleControllerFindDetailById({ id }).then((res) => {
            setData(res?.data);
            AppAction.Base.setGlobalState({ loadingDetail: false });
          });
        }, [id, needUpdate]);
        return data;
      },
      /**
       * 获取当前用户信息(通过token)
       * @returns USERENTITY
       */
      userInfo: () => {
        const [userInfo, setUserinfo] = useState<API.UserEntity>(
          {} as API.UserEntity
        );
        useEffect(() => {
          if (!localStorage.getItem("userKey")) {
            return;
          }
          api.User.UserControllerGetUserInfo({
            headers: {
              authorization: localStorage.getItem("userKey"), // 添加请求头
            },
          }).then((res) => {
            setUserinfo(res.data);
          });
        }, [localStorage.getItem("userKey")]);
        return userInfo;
      },
      /**
       * 用户是否登录
       * @param
       * @returns
       */
      isLogin: () => {
        const [login, setLogin] = useState(false);
        useEffect(() => {
          if (!localStorage.getItem("userKey")) {
            setLogin(false);
          } else {
            setLogin(true);
          }
        });
        return login;
      },
      /**
       * 用户是否为管理员
       */
      isAdmin: (userInfo: API.UserEntity) => {
        const [isAdmin, setIsAdmin] = useState(false);
        useEffect(() => {
          if (userInfo.username === "administrator") {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        }, [userInfo]);
        return isAdmin;
      },
      /**
       * 根据id获取用户信息
       */
      userInfoById: (id: string | number) => {
        const [userInfo, setUserInfo] = useState<API.UserEntity>(
          {} as API.UserEntity
        );
        useEffect(() => {
          if (!localStorage.getItem("userKey") || !id) {
            return;
          }
          api.User.UserControllerGetUserInfoById(
            {
              userId: id,
            },
            {
              headers: {
                authorization: localStorage.getItem("userKey"), // 添加请求头
              },
            }
          ).then((res) => {
            if (res.code === 200) {
              setUserInfo(res.data);
            }
          });
        }, [id]);
        return userInfo;
      },
    };
  }

  return {
    AppAction,
    formInitValue,
    appFormAssest,
  };
};

export type AppControlRtn = ReturnType<typeof useAppControl>;
export const AppControlContext = createContext<AppControlRtn>(
  {} as AppControlRtn
);
