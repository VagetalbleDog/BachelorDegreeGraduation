export enum CategoryType {
  ALL = 0,
  FRONTEND = 1,
  BACKEND = 2,
  CLIENT = 3,
  ALGORITHM = 4,
  IOS = 5,
  QA = 6,
  MAINTAIN = 7,
}
export const CategoryTextMap = {
  [CategoryType.ALL]: "为您推荐",
  [CategoryType.FRONTEND]: "前端",
  [CategoryType.BACKEND]: "后端",
  [CategoryType.CLIENT]: "客户端",
  [CategoryType.ALGORITHM]: "算法",
  [CategoryType.IOS]: "IOS",
  [CategoryType.QA]: "测试",
  [CategoryType.MAINTAIN]: "运维",
};
