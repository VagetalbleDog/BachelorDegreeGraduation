import { useSetState, useUnmount } from "ahooks";
import { isEmpty, pick, transform } from "lodash";
import { createEventDefinition, EventBus } from "@/utils/eventBus";
import { useCreation, useGetState, useMount } from "ahooks";
import { Dispatch, SetStateAction, useEffect } from "react";
import { Rule } from "antd/es/form";

export interface IAction<T, U = any> {
  type: T;
  payload?: U;
}

export interface IControlProps<T> {
  value?: T;
  onChange?: (value: NonNullable<IControlProps<T>["value"]>) => void;
  disabled?: boolean;
  id?: string; // 自定义组件 需要将id传递 并绑定到自定义组件wrapper上. 这样scrollToFirstError才能生效
}

export function AppControl<T extends Object>(params?: { globalState: T }) {
  const stateStation: Record<string, Function> = {};

  // 确保组件重渲染不会生成新的事件 bus
  const privateStation = useCreation(
    () => ({
      formChange: createEventDefinition<Record<string, any>>()(
        `${Math.random()}`
      ),
      bus: new EventBus(),
    }),
    []
  );

  const [globalState, setGlobalState] = useSetState<T>(
    params?.globalState || ({} as T)
  );

  abstract class AppControlClass {
    protected static Base = {
      globalState,
      setGlobalState,
      stateStation,
      useStationState: <S extends any>(
        name: string,
        initialState: S
      ): [S, Dispatch<SetStateAction<S>>] => {
        const [state, setState, getState] = useGetState<S>(initialState);
        stateStation[name] = getState;
        return [state, setState];
      },
      formMonitor: <T extends string, U extends string>(
        params: Record<T, U[]>
      ): {
        formChangeLinsteners: Record<
          T,
          (changedValues: any, values: any) => void
        >;
        useFormValueChange: Function;
      } => {
        const formChange = privateStation.formChange;
        const bus = privateStation.bus;

        const useFormValueChange = (Fn: Function, deps?: string[]) => {
          useEffect(() => {
            const unsubscribe = bus.subscribe(formChange, ({ payload }) => {
              // console.log('form change subscribe data: ', payload, deps);
              if (!deps) return Fn(payload?.changeValues, payload?.allValues);
              const subscribValues = pick(payload?.changeValues, ...deps);
              if (isEmpty(subscribValues)) return;
              Fn(subscribValues, payload?.allValues);
            });
            return unsubscribe;
          }, []);
        };

        const onFormValueChange =
          (fields?: string[]) =>
          (changeValues: Record<string, any>, allValues: any) => {
            // console.log('>>>>onFormValueChange changeValues', changeValues, allValues, fields);
            if (!fields)
              return bus.publish(formChange({ changeValues, allValues }));
            const fieldsValue = pick(changeValues, ...fields);
            if (isEmpty(fieldsValue)) return;
            bus.publish(formChange({ changeValues: fieldsValue, allValues }));
          };

        const formChangeLinsteners = transform(
          params,
          (result, v: U[], k: T) => {
            if (isEmpty(v)) return (result[k] = onFormValueChange());
            result[k] = onFormValueChange(v);
          },
          {} as Record<T, (changedValues: any, values: any) => void>
        );

        return {
          formChangeLinsteners,
          useFormValueChange,
        };
      },
    };

    public static uiState?: any;

    public static form?: any;

    public static computedState?: Record<string, any>;

    public static fieldValidator: Partial<Record<string, Rule[]>>;

    public static sideEffect?: Record<string, any>;

    public static onFormConfirm?: Function;

    public static onSearchConfirm?: Function;

    public static triggerFieldChange?: Function;

    public static triggerFormChange?: Function;
  }
  return AppControlClass;
}
