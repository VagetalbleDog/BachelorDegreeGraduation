import api from "@/api";
import { CategoryType } from "@/consts/enum";
import { generateFormAssets } from "@/utils";
import { AppControl } from "@/utils/AppControl";
import { useMount, useSetState } from "ahooks";
import { isEmpty } from "lodash";
import { createContext, useEffect, useState } from "react";

export const useAppControl = () => {
  // 表单资源
  const appFormAssest = generateFormAssets({
    regsiter: ["username", "nickName", "age", "work"],
  });
  // 表单初始值
  const formInitValue = {};
  class AppAction extends AppControl({
    globalState: {
      loadingArticle: false,
      loadingDetail: false,
    },
  }) {
    // 定义一些功能逻辑

    static a: () => {};

    // 计算属性
    static computedState = {
      loading: {
        loadingArticle: AppAction.Base.globalState.loadingArticle,
        loadingDetail: AppAction.Base.globalState.loadingDetail,
      },
      articleList: (category: number, search: string) => {
        const [data, setData] = useState<API.ArticleEntity[]>([]);
        useEffect(() => {
          if (category === CategoryType.ALL) {
            category = undefined as any;
          }
          AppAction.Base.setGlobalState({ loadingArticle: true });
          if (!isEmpty(search)) {
            api.Article.ArticleControllerSearch({ search }).then(({ data }) => {
              setData(data);
              AppAction.Base.setGlobalState({ loadingArticle: false });
            });
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
      articleDetail: (id: number | string) => {
        const [data, setData] = useState<API.ArticleEntity>(
          {} as API.ArticleEntity
        );
        useEffect(() => {
          AppAction.Base.setGlobalState({ loadingDetail: true });
          api.Article.ArticleControllerFindAll({ id }).then((res) => {
            setData(res?.data[0]);
            AppAction.Base.setGlobalState({ loadingDetail: false });
          });
        }, [id]);
        return data;
      },
    };
  }

  return {
    AppAction,
    formInitValue,
  };
};

export type AppControlRtn = ReturnType<typeof useAppControl>;
export const AppControlContext = createContext<AppControlRtn>(
  {} as AppControlRtn
);
