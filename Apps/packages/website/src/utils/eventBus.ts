/* eslint-disable no-dupe-class-members */
// ts-bus: https://github.com/ryardley/ts-bus/blob/master/src/types.ts
import { EventEmitter2 as EventEmitter } from "eventemitter2";

export type BusEvent<T extends object = any> = {
  type: string;
  payload: T;
  meta?: any;
};

export type EventTypeDescriptor<T extends { type: string }> = {
  eventType: T["type"];
};

export type EventFrom<T extends (...args: any) => BusEvent> = ReturnType<T>;

export type DispatchFn<E> = (a: E) => void;

export type UnsubscribeFn = () => any;

export type SubscribeFn<E extends BusEvent> = (
  dispatch: DispatchFn<E>,
  bus: EventBus
) => UnsubscribeFn;

export type SubscriptionDef<T extends BusEvent> =
  | string
  | EventCreatorFn<T>
  | PredicateFn<T>
  | T["type"];

export type SubscribeWithPayloadDispatchFn<E extends BusEvent> = (
  dispatch: DispatchFn<E["payload"]>,
  bus: EventBus
) => UnsubscribeFn;

export type EventCreatorFn<T extends { type: string; payload: any }> = ((
  payload: T["payload"]
) => T) &
  EventTypeDescriptor<T>;

function showWarning(msg: string) {
  /* istanbul ignore next */
  if (process && process.env && process.env.NODE_ENV !== "production") {
    console.warn(msg);
  }
}

export type PredicateFn<T> = (event: T) => boolean;

function isEventDescriptor<T extends { type: string }>(
  descriptor: any
): descriptor is EventTypeDescriptor<T> {
  return !!descriptor && descriptor.eventType;
}

function isPredicateFn<T>(descriptor: any): descriptor is PredicateFn<T> {
  return !isEventDescriptor(descriptor) && typeof descriptor === "function";
}

type TestPredicateFn<P> = (payload: P) => boolean;

type EventDefinitionOptions<P> = {
  test?: (payload: P) => boolean;
};

export function createEventDefinition<P = void>(
  options?: EventDefinitionOptions<P> | TestPredicateFn<P>
) {
  return <T extends string>(type: T) => {
    function eventCreator(payload: P) {
      // Allow runtime payload checking for plain JavaScript usage
      if (options && payload) {
        const testFn = typeof options === "function" ? options : options.test;
        /* istanbul ignore next */
        if (testFn && !testFn(payload)) {
          showWarning(
            `${JSON.stringify(payload)} does not match expected payload.`
          );
        }
      }

      return {
        type,
        payload,
      };
    }
    eventCreator.eventType = type;
    eventCreator.toString = () => type; // allow String coercion to deliver the eventType
    return eventCreator;
  };
}

export function defineEvent<T extends BusEvent>(type: T["type"]) {
  showWarning(
    "defineEvent is deprecated and will be removed in the future. Please use createEventDefinition instead."
  );

  const eventCreator = (payload: T["payload"]) => ({
    type,
    payload,
  });

  eventCreator.eventType = type;
  return eventCreator as EventCreatorFn<T>;
}

function getEventType(descriptor: string | EventTypeDescriptor<any>) {
  if (isEventDescriptor(descriptor)) return descriptor.eventType;
  return descriptor as string;
}

function filter<T>(predicate: PredicateFn<T>, handler: (a: any) => void) {
  return (event: any) => {
    if (predicate(event)) return handler(event);
  };
}

export class EventBus {
  emitter = new EventEmitter({ wildcard: true });

  publish<T extends BusEvent>(event: T, meta?: any) {
    this.emitter.emit(
      event.type,
      !meta ? event : { ...event, meta: { ...event.meta, ...meta } }
    );
  }

  // Using overloads to ensure passing in event creator functions resukts in correct typings
  // TODO: How to create a test to guard against regressions?
  subscribe<T extends BusEvent>(
    subscription: string,
    handler: (e: BusEvent) => void
  ): () => void;

  // eslint-disable-next-line no-dupe-class-members
  subscribe<T extends BusEvent>(
    subscription: EventCreatorFn<T>,
    handler: (e: ReturnType<typeof subscription>) => void
  ): () => void;

  // eslint-disable-next-line no-dupe-class-members
  subscribe<T extends BusEvent>(
    subscription: PredicateFn<T>,
    handler: (e: T) => void
  ): () => void;

  // eslint-disable-next-line no-dupe-class-members
  subscribe<T extends { type: string }>(
    subscription: T["type"],
    handler: (e: T) => void
  ): () => void;

  // eslint-disable-next-line no-dupe-class-members
  subscribe<T extends BusEvent>(
    subscription: SubscriptionDef<T> | SubscriptionDef<T>[],
    handler: (e: T) => void
  ): () => void {
    // store emitter on closure
    const { emitter } = this;

    const subscribeToSubdef = (subdef: SubscriptionDef<T>) => {
      if (isPredicateFn<T>(subdef)) {
        const filteredHandler = filter(subdef, handler);
        emitter.on("**", filteredHandler);
        return () => emitter.off("**", filteredHandler);
      }

      const type = getEventType(subdef);

      emitter.on(type, handler);

      return () => emitter.off(type, handler);
    };

    const subs = Array.isArray(subscription) ? subscription : [subscription];

    const unsubscribers = subs.map(subscribeToSubdef);
    return () => unsubscribers.forEach((u) => u());
  }
}

export default new EventBus();
