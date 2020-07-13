import { createSelectorWithArray } from './utils';
import { RcModuleV2 } from '../RcModule/RcModule';
/**
 * **Description:**
 *
 * You can use `@computed` to decorate a getter function for derived data,
 * which quickly solves performance problems for computing Derived Data.
 *
 * **Example:**
 *
 * ```ts
 * class Shop {
 *   @state
 *   fruits = [];
 *
 *   @state
 *   vegetables = [];
 *
 *   @computed(({ fruits, vegetables }: Shop) => [fruits, fruits])
 *   get sum() {
 *     return this.fruits.length + this.vegetables.length;
 *   }
 * }
 * ```
 */
export const computed = (depsCallback: (instance: any) => any[]) => (
  target: object,
  key: string,
  descriptor: TypedPropertyDescriptor<any>,
) => {
  if (process.env.NODE_ENV !== 'production') {
    if (typeof descriptor.get !== 'function') {
      throw new Error(`'@computed' should decorate a getter.`);
    }
    if (typeof depsCallback !== 'function') {
      throw new Error(
        `@computed() parameter should be a selector function for dependencies collection.`,
      );
    }
  }
  const depsCallbackSelector = createSelectorWithArray(
    (that: RcModuleV2) => [that._store.getState(), that.state],
    // eslint-disable-next-line func-names
    function(this: RcModuleV2) {
      return depsCallback(this);
    },
  );
  const selector = createSelectorWithArray(
    (that: RcModuleV2) => depsCallbackSelector.call(that),
    descriptor.get!,
  );
  return {
    ...descriptor,
    get(this: RcModuleV2) {
      return selector.call(this);
    },
  };
};
