import { CategoryType } from "@/consts/enum";

export const transformInterestJson = (
  work: CategoryType,
  interests: CategoryType[]
) => {
  const init: any = {
    [CategoryType.ALGORITHM]: 60,
    [CategoryType.BACKEND]: 60,
    [CategoryType.CLIENT]: 60,
    [CategoryType.FRONTEND]: 60,
    [CategoryType.IOS]: 60,
    [CategoryType.MAINTAIN]: 60,
    [CategoryType.QA]: 60,
  };
  for (const cate in init) {
    if (Number(cate) == work) {
      init[cate] = init[cate] + 40;
    }
    if (interests.includes(cate as any)) {
      init[cate] = init[cate] + 20;
    }
  }
  return init;
};
