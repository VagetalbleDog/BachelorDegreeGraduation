import { message } from "antd";
import * as React from "react";
import { useReducer, useCallback } from "react";
import { FormInstance } from "antd";
import { useForm } from "antd/lib/form/Form";

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
