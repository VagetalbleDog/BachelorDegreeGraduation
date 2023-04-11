import { DefaultOptionType } from "antd/es/select";
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
