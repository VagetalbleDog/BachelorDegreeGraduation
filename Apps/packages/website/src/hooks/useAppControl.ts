import api from "@/api";
import { CategoryType } from "@/consts/enum";
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
      articleList: (category: number, search: string) => {
        const [data, setData] = useState<API.ArticleEntity[]>([]);
        useEffect(() => {
          if (category === CategoryType.ALL) {
            category = undefined as any;
          }
          AppAction.Base.setGlobalState({ loadingArticle: true });
          if (!isEmpty(search)) {
            api.Article.ArticleControllerSearch({ search, category }).then(
              ({ data }) => {
                setData(data);
                AppAction.Base.setGlobalState({ loadingArticle: false });
              }
            );
            return;
          }
          api.Article.ArticleControllerFindAll({ category }).then(
            ({ data }) => {
              setData(data);
              AppAction.Base.setGlobalState({ loadingArticle: false });
            }
          );
        }, [category, search]);
        return data;
      },
      /**
       * 文章详情
       * @param id 文章id
       * @returns
       */
      articleDetail: (id: number | string) => {
        const [data, setData] = useState<API.ArticleEntity>(
          {} as API.ArticleEntity
        );
        useEffect(() => {
          AppAction.Base.setGlobalState({ loadingDetail: true });
          api.Article.ArticleControllerFindDetailById({ id }).then((res) => {
            setData(res?.data);
            AppAction.Base.setGlobalState({ loadingDetail: false });
          });
        }, [id]);
        return data;
      },
      /**
       * 获取用户信息
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
