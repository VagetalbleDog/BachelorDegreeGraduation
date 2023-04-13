import { CategoryTextMap, CategoryType } from "@/consts/enum";
import { Tag } from "antd";
import { FC } from "react";

const COLORS = [
  "lime",
  "cyan",
  "purple",
  "magenta",
  "volcano",
  "orange",
  "gold",
];
interface IProps {
  category: CategoryType;
  work?: boolean;
}
export const TagColor: FC<IProps> = ({ category, work }) => {
  return (
    <Tag color={COLORS[category]}>
      {CategoryTextMap[category]}
      {work ? "工程师" : ""}
    </Tag>
  );
};
