import { CategoryTextMap, CategoryType } from "@/consts/enum";
import { Tag } from "antd";
import { FC } from "react";

const COLORS = [
  "magenta",
  "volcano",
  "orange",
  "gold",
  "lime",
  "cyan",
  "purple",
];
interface IProps {
  category: CategoryType;
}
export const TagColor: FC<IProps> = ({ category }) => {
  return <Tag color={COLORS[category]}>{CategoryTextMap[category]}</Tag>;
};
