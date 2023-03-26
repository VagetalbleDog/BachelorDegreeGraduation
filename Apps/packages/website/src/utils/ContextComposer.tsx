import React, {
  Context,
  ReactElement,
  ReactComponentElement,
  FC,
  ReactNode,
} from "react";

interface Props {
  contexts: ReactElement<any>[] | Context<any>[];
  children: ReactNode;
}

const ContextComposer: FC<Props> = function ({ contexts, children }) {
  const contextsForUse = contexts.slice().reverse();

  if (typeof children === "function") {
    const providerValues: any[] = [];
    const childrenForUse = (
      contextsForUse: Context<any>[]
    ): ReactComponentElement<any> => {
      if (!contextsForUse.length) {
        return (children as (props: any) => ReactElement)(providerValues);
      }
      const activeContext = contextsForUse.pop() as Context<any>;
      return (
        <activeContext.Consumer>
          {(providedContext) => {
            providerValues.push(providedContext);
            return childrenForUse(contextsForUse);
          }}
        </activeContext.Consumer>
      );
    };
    return childrenForUse(contextsForUse as Context<any>[]);
  } else {
    return (contextsForUse as ReactElement<any>[]).reduce(
      (children, parent) => {
        return React.cloneElement(parent, {
          children,
        });
      },
      children as ReactElement
    );
  }
};

export default ContextComposer;
