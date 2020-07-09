type Proxy<T> = T & {
  get(): T;
  set(value: T): void;
};
type Proxify<T> = {
  [P in keyof T]: Proxy<T[P]>;
};
type Key = string;
type Decorator = {
  configurable: boolean;
  enumerable: boolean;
  writable: boolean;
};

const warn = (key: Key) => {
  throw new Error(`Property '${key}' is read only.`);
};

function freeze<T extends object>(object: T) {
  return new Proxy(object, {
    set(target: T, key: Key) {
      return warn(key);
    },
    get(target: T, key: Key) {
      return Reflect.get(target, key);
    },
    deleteProperty(target: T, key: Key) {
      return warn(key);
    },
    setPrototypeOf() {
      throw new Error(`Frozen Object is read only.`);
    },
    defineProperty(target: T, key: Key) {
      return warn(key);
    },
  }) as Proxify<T>;
}

export { freeze as default };
