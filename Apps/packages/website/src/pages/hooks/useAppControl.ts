import api from "@/api";
import { generateFormAssets } from "@/utils";
import { AppControl } from "@/utils/AppControl";
import { useMount, useSetState } from "ahooks";
import { isEmpty } from "lodash";
import { createContext, useEffect } from "react";

export const useAppControl = () => {
  // 表单资源
  const appFormAssest = generateFormAssets({
    regsiter: ["username", "nickName", "age", "work"],
  });
  // 表单初始值
  const formInitValue = {};
  class AppAction extends AppControl({
    globalState: {},
  }) {
    // 定义一些功能逻辑

    static a: () => {};

    // 计算属性
    static computedState = {
      articleList: (category: number | undefined, search: string) => {
        const [data, setData] = useSetState<API.ArticleEntity[]>([]);
        useEffect(() => {
          if (!isEmpty(search)) {
            api.Article.ArticleControllerSearch({ search }).then((res) =>
              setData(res)
            );
            return;
          }
          api.Article.ArticleControllerFindAll({ category }).then((res) =>
            setData(res)
          );
        }, [category, search]);
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
