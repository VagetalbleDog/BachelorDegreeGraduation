import { message } from "antd";
import * as React from "react";
import { useReducer, useCallback } from "react";
import { FormInstance } from "antd";
import { useForm } from "antd/lib/form/Form";
import { DefaultOptionType } from "antd/es/select";
import { CategoryTextMap, CategoryType } from "@/consts/enum";

export function strEnum<T extends string>(o: Array<T>): { [K in T]: K } {
  return o.reduce((res, key) => {
    res[key] = key;
    return res;
  }, Object.create(null));
}

export function generateFormAssets<T extends string, U extends string>(
  opt: Record<T, U[]>
) {
  const formsName = strEnum(Object.keys(opt) as T[]);
  const formInstances = {} as Record<T, FormInstance>;
  let formFieldsName = {} as { [K in U]: K };

  Object.keys(opt).forEach((k) => {
    [formInstances[k as T]] = useForm();
    formFieldsName = {
      ...formFieldsName,
      ...strEnum(opt[k as T]),
    };
  });

  return {
    formInstances,
    formsName,
    formFieldsName,
  };
}

export function generateFormValue<
  T extends Record<string, string>,
  U extends Record<string, string>,
  FormValueType extends { [k in keyof T]: any }
>(opt: { formFieldsName: T; formsName: U }) {
  type FieldChangeType = { [K in keyof T]: FormValueType[K] };
  type FormChangeType = Record<keyof typeof opt.formsName, FieldChangeType>;

  const { formFieldsName, formsName } = opt;

  const formChangeReducer = (
    state: FormChangeType,
    options: { formName: string; changedFields: FieldChangeType }
  ) => {
    const { formName, changedFields } = options;
    return { ...state, [formName]: { ...state[formName], ...changedFields } };
  };

  const [fieldsValue, triggerFieldChange] = useReducer(
    formChangeReducer,
    Object.keys(formsName).reduce(
      (pre, k) => ({ ...pre, [formsName[k]]: {} }),
      Object.create(null)
    )
  );

  const onFieldChange =
    (formName: string) => (changedFields: FieldChangeType) => {
      if (!opt.formsName[formName]) {
        console.warn(
          "formName is not exist, please check your triggerFieldChange method parameters"
        );
        return;
      }

      triggerFieldChange({
        formName,
        changedFields,
      });
    };

  return {
    fieldsValue,
    onFieldChange,
  };
}

export function enumMapToOptions<T extends Record<number, string>>(
  enumMap: T,
  opt?: { includeEnum?: (keyof T)[]; excludeEnum?: (keyof T)[] }
) {
  return Object.keys(enumMap)
    .map((key: string) => ({
      value: Number(key),
      label: enumMap[Number(key)],
    }))
    .filter((option) => {
      if (!opt?.includeEnum) return true;
      return opt.includeEnum.includes(option.value as keyof T);
    })
    .filter((option) => {
      if (!opt?.excludeEnum) return true;
      return !opt.excludeEnum.includes(option.value as keyof T);
    });
}

export function enumMapToRadioOptions<T extends Record<number, string>>(
  enumMap: T,
  opt?: { includeEnum?: (keyof T)[]; excludeEnum?: (keyof T)[] }
) {
  return Object.keys(enumMap)
    .map((key: string) => ({
      id: Number(key),
      name: enumMap[Number(key)],
    }))
    .filter((option) => {
      if (!opt?.includeEnum) return true;
      return opt.includeEnum.includes(option.id as keyof T);
    })
    .filter((option) => {
      if (!opt?.excludeEnum) return true;
      return !opt.excludeEnum.includes(option.id as keyof T);
    });
}

export function enumToArray<T extends Record<number, string>>(enumObj: T) {
  const arr = Object.keys(enumObj).filter((key) => !Number.isNaN(Number(key)));
  return arr.map((key) => Number(key));
}
export const enumToOptions = <T extends any>(
  textMap: T
): DefaultOptionType[] => {
  const options: DefaultOptionType[] = [];
  for (const key in textMap) {
    options.push({
      label: textMap[key] as any,
      value: key,
    });
  }
  return options;
};

export const InterestJsonToArray = (json: string) => {
  if (!json) {
    return;
  }
  const interestsObj = JSON.parse(json);
  const arr: any[] = [];
  for (const key in interestsObj) {
    arr.push({
      category: Number(key),
      value: interestsObj[key],
    });
  }
  arr.sort((a, b) => b.value - a.value);
  return arr;
};

export const articleToEchartValue = (articles: API.ArticleEntity[]) => {
  if (!articles) {
    return [0];
  }
  const value: number[] = [];
  const categorys = [
    CategoryType.ALGORITHM,
    CategoryType.BACKEND,
    CategoryType.CLIENT,
    CategoryType.FRONTEND,
    CategoryType.IOS,
    CategoryType.MAINTAIN,
    CategoryType.QA,
  ];
  for (const category of categorys) {
    let count = 0;
    articles.forEach((i) => {
      if (i.category === category) {
        count++;
      }
    });
    value.push(count);
  }
  return value;
};
export const InterestJsonToEchartValue = (json: string) => {
  if (!json) {
    return;
  }
  const interestsObj = JSON.parse(json);
  const categorys = [
    CategoryType.ALGORITHM,
    CategoryType.BACKEND,
    CategoryType.CLIENT,
    CategoryType.FRONTEND,
    CategoryType.IOS,
    CategoryType.MAINTAIN,
    CategoryType.QA,
  ];
  const value: number[] = [];
  for (const category of categorys) {
    value.push(interestsObj[String(category)]);
  }
  return value;
};

export const barOption = (
  value1: number[],
  value2: number[],
  value3: number[]
) => {
  const option = {
    backgroundColor: "#fff",
    title: {
      text: "创作/点赞/收藏 数据分析",
      textAlign: "center",
      left: "49.5%",
      textStyle: {
        color: "#262626",
        fontSize: 18,
        fontWeight: "600",
      },
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {},
    },
    grid: {
      bottom: "0%",
      top: "18%",
      containLabel: true,
    },
    legend: {
      top: "10%",
      right: "5%",
    },
    xAxis: [
      {
        type: "category",
        data: ["算法", "后端", "客户端", "前端", "IOS", "运维", "测试"],
      },
    ],
    yAxis: [
      {
        type: "value",
        name: "（篇）",
        nameTextStyle: {
          color: "rgba(73,80,87,0.9)",
          fontSize: 12,
          padding: [0, 0, 6, -60],
        },
      },
    ],
    series: [
      {
        name: "创作",
        type: "bar",
        emphasis: {
          focus: "series",
        },
        data: [10, 6, 7, 2, 1, 0, 4],
      },
      {
        name: "点赞",
        type: "bar",
        stack: "Ad",
        emphasis: {
          focus: "series",
        },
        data: [6, 8, 2, 4, 10, 1, 7],
      },
      {
        name: "收藏",
        type: "bar",
        stack: "Ad",
        emphasis: {
          focus: "series",
        },
        data: [1, 1, 4, 2, 8, 4, 10],
      },
    ],
  };
  return option;
};

export const pieOptions = (value: any[]) => {
  console.log(value);
  value = value?.map((i) => ({
    name: CategoryTextMap[i.category as CategoryType],
    value: i.value,
  }));
  const option = {
    title: {
      text: "兴趣分布图",
      textAlign: "center",
      left: "49.5%",
      textStyle: {
        color: "#262626",
        fontSize: 18,
        fontWeight: "600",
      },
    },
    legend: {
      itemWidth: 14,
      orient: "vertical",
      right: "3%",
      top: "9%",
      textStyle: {
        align: "left",
        color: "#",
        verticalAlign: "middle",
        rich: {
          name: {
            width: 80,
            fontSize: 16,
          },
          value: {
            width: 20,
            align: "right",
            fontFamily: "Medium",
            fontSize: 16,
          },
          rate: { width: 10, align: "right", fontSize: 16 },
        },
      },
      data: value,
    },
    tooltip: {
      trigger: "item",
      formatter: function (params: any) {
        console.log(params);
        return `${params.name},兴趣值:${params.value} (${params.percent}%)`;
      },
    },
    series: [
      {
        name: "兴趣分布图",
        type: "pie",
        radius: ["30%", "80%"],
        center: ["50%", "55%"],
        roseType: "radius",
        label: {
          formatter: function (params: any) {
            console.log(params);
            return `${params.name}`;
          },
        },
        labelLine: {
          length: 1,
          length2: 20,
        },
        data: value,
      },
    ],
  };
  return option;
};
