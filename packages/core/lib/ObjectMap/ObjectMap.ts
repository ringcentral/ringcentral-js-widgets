import { find } from 'ramda';

const sDefinition = Symbol('definition');
const RUNTIME = {
  usingFactory: false,
  prefixCache: new Map(),
};

function factory<T>(
  prototype: T,
  property: string,
  descriptor: PropertyDescriptor,
) {
  const baseFunction = descriptor.value;
  return {
    ...descriptor,
    value(this: ThisType<T>, ...args: any) {
      RUNTIME.usingFactory = true;
      const result = baseFunction.call(this, ...args);
      RUNTIME.usingFactory = false;
      return result;
    },
  };
}

export type ObjectMapKey<D> = D extends ObjectMap<infer D, infer K, infer V> &
  infer D
  ? K
  : never;

export type ObjectMapValue<D> = D extends ObjectMap<infer D, infer K, infer V> &
  infer D
  ? V
  : never;

export function prefixString(str: string, prefix: string = ''): string {
  return prefix === '' ? str : `${prefix}-${str}`;
}

export class ObjectMap<
  D extends Record<string | number, any>,
  K extends keyof D,
  V extends D[K],
> {
  private readonly [sDefinition] = new Map();

  constructor(definition: D) {
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
    D extends Record<string | number, any>,
    K extends keyof D,
    V extends D[K],
  >(definition: D) {
    return new ObjectMap(definition) as ObjectMap<D, K, V> & D;
  }

  @factory
  static fromKeys<K extends string>(keys: K[]) {
    const definition = {} as Record<K, K>;
    for (const key of keys) {
      definition[key] = key;
    }
    return new ObjectMap(definition) as ObjectMap<{ [V in K]: V }, K, K> & {
      [V in K]: V;
    };
  }

  @factory
  static prefixKeys<K extends string>(keys: K[], prefix: string = '') {
    const definition = {} as Record<K, string>;
    for (const key of keys) {
      definition[key] = prefixString(key, prefix);
    }
    return new ObjectMap(definition) as ObjectMap<
      { [V in K]: string },
      K,
      string
    > & { [V in K]: string };
  }

  static getKey<D, K extends keyof D, V extends D[K]>(
    instance: ObjectMap<D, K, V> & D,
    value: V,
  ): K | null {
    const [key = null] =
      find<[K, V]>(([, v]) => v === value, [...ObjectMap.entries(instance)]) ||
      [];
    return key;
  }

  static entries<D, K extends keyof D, V extends D[K]>(
    instance: ObjectMap<D, K, V> & D,
  ): IterableIterator<[K, V]> {
    return instance[sDefinition].entries();
  }

  static size<K extends keyof D, V extends D[K], D>(
    instance: ObjectMap<D, K, V> & D,
  ): number {
    return instance[sDefinition].size;
  }

  static has<K extends keyof D, V extends D[K], D>(
    instance: ObjectMap<D, K, V> & D,
    key: K,
  ): boolean {
    return instance[sDefinition].has(key);
  }

  static hasValue<D, K extends keyof D, V extends D[K]>(
    instance: ObjectMap<D, K, V> & D,
    value: V,
  ): boolean {
    return !!ObjectMap.getKey(instance, value);
  }

  static keys<D, K extends keyof D, V extends D[K]>(
    instance: ObjectMap<D, K, V> & D,
  ): IterableIterator<K> {
    return instance[sDefinition].keys();
  }

  static values<D, K extends keyof D, V extends D[K]>(
    instance: ObjectMap<D, K, V> & D,
  ): IterableIterator<V> {
    return instance[sDefinition].values();
  }

  static forEach<D, K extends keyof D, V extends D[K]>(
    fn: (value: V, key: K, map: ObjectMap<D, K, V> & D) => void,
    instance: ObjectMap<D, K, V> & D,
  ): void {
    return instance[sDefinition].forEach((v, k) => fn(v, k, instance));
  }

  static filter<D extends Record<K, V>, K extends keyof D, V extends D[K]>(
    fn: (value: V, key: K) => boolean,
    instance: ObjectMap<D, K, V> & D,
  ) {
    const obj = {} as Record<K, V>;
    ObjectMap.forEach((v, k) => {
      if (fn(v, k)) {
        obj[k] = v;
      }
    }, instance);
    return ObjectMap.fromObject(obj);
  }

  static prefixValues<
    D extends Record<K, string>,
    K extends keyof D,
    V extends D[K],
  >(instance: ObjectMap<D, K, V> & D, prefix = '') {
    if (prefix === '') {
      return instance;
    }
    if (!RUNTIME.prefixCache.has(prefix)) {
      RUNTIME.prefixCache.set(prefix, new Map());
    }
    if (!RUNTIME.prefixCache.get(prefix).has(instance)) {
      const definition = {} as Record<K, string>;
      ObjectMap.forEach((value, key) => {
        definition[key] = prefixString(value, prefix);
      }, instance);
      const prefixedInstance = ObjectMap.fromObject(definition);
      RUNTIME.prefixCache.get(prefix).set(instance, prefixedInstance);
    }
    return RUNTIME.prefixCache.get(prefix).get(instance) as ObjectMap<
      { [V in K]: string },
      K,
      string
    > & { [V in K]: string };
  }
}
