import { find } from 'ramda';

const sDefinition = Symbol('definition');
const RUNTIME = {
  usingFactory: false,
};

function factory<T>(
  prototype: T,
  property: string,
  descriptor: PropertyDescriptor,
) {
  const baseFunction = descriptor.value;
  return {
    ...descriptor,
    value(this: ThisType<T>, ...args) {
      RUNTIME.usingFactory = true;
      const result = baseFunction.call(this, ...args);
      RUNTIME.usingFactory = false;
      return result;
    },
  };
}

export type ObjectMapKey<D> = D extends ObjectMap<infer K, infer V, infer T> &
  infer T
  ? K
  : never;

export type ObjectMapValue<D> = D extends ObjectMap<infer K, infer V, infer T> &
  infer T
  ? V
  : never;

export function prefixString(str: string, prefix: string = ''): string {
  return prefix === '' ? str : `${prefix}-${str}`;
}

export class ObjectMap<
  K extends keyof T,
  V extends T[K],
  T extends Record<string | number, any>
> {
  private readonly [sDefinition] = new Map();

  constructor(definition: T) {
    if (!RUNTIME.usingFactory) {
      throw TypeError(
        'Instantiating ObjectMap with `new ObjectMap(definition)` is not recommended. ' +
          'Please use one of the ObjectMap factory functions.',
      );
    }
    if (definition) {
      for (const key in definition) {
        if (Object.prototype.hasOwnProperty.call(definition, key)) {
          this[sDefinition].set(key, definition[key]);
          Object.defineProperty(this, key, {
            get() {
              return this[sDefinition].get(key);
            },
            enumerable: true,
          });
        }
      }
    }
  }

  @factory
  static fromObject<
    K extends keyof T,
    V extends T[K],
    T extends Record<string | number, any>
  >(definition: T) {
    return new ObjectMap(definition) as ObjectMap<K, V, T> & T;
  }

  @factory
  static fromKeys<T extends string>(keys: T[]) {
    const definition = {} as Record<T, T>;
    for (const key of keys) {
      definition[key] = key;
    }
    return new ObjectMap(definition) as ObjectMap<T, T, { [K in T]: K }> &
      { [K in T]: K };
  }

  @factory
  static prefixKeys<T extends string, K extends T>(
    keys: K[],
    prefix: string = '',
  ) {
    const definition = {} as Record<K, string>;
    for (const key of keys) {
      definition[key] = prefixString(key, prefix);
    }
    return new ObjectMap(definition) as ObjectMap<
      K,
      string,
      { [V in K]: string }
    > &
      { [V in K]: string };
  }

  static getKey<K extends keyof T, V extends T[K], T>(
    instance: ObjectMap<K, V, T> & T,
    value: V,
  ): K {
    const [key = null] =
      find<[K, V]>(([, v]) => v === value, [...ObjectMap.entries(instance)]) ||
      [];
    return key;
  }

  static entries<K extends keyof T, V extends T[K], T>(
    instance: ObjectMap<K, V, T> & T,
  ): IterableIterator<[K, V]> {
    return instance[sDefinition].entries();
  }

  static size<K extends keyof T, V extends T[K], T>(
    instance: ObjectMap<K, V, T> & T,
  ): number {
    return instance[sDefinition].size;
  }

  static has<K extends keyof T, V extends T[K], T>(
    instance: ObjectMap<K, V, T> & T,
    key: K,
  ): boolean {
    return instance[sDefinition].has(key);
  }

  static hasValue<K extends keyof T, V extends T[K], T>(
    instance: ObjectMap<K, V, T> & T,
    value: V,
  ): boolean {
    return !!ObjectMap.getKey(instance, value);
  }

  static keys<K extends keyof T, V extends T[K], T>(
    instance: ObjectMap<K, V, T> & T,
  ): IterableIterator<K> {
    return instance[sDefinition].keys();
  }

  static values<K extends keyof T, V extends T[K], T>(
    instance: ObjectMap<K, V, T> & T,
  ): IterableIterator<V> {
    return instance[sDefinition].values();
  }

  static forEach<K extends keyof T, V extends T[K], T>(
    fn: (value: V, key: K, map: ObjectMap<K, V, T> & T) => void,
    instance: ObjectMap<K, V, T> & T,
  ): void {
    return instance[sDefinition].forEach((v, k) => fn(v, k, instance));
  }
}
