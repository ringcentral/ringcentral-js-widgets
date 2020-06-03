import { createSelector } from 'reselect';

const SELECTORS = Symbol('selectors');

/**
 * @function
 * @description Decorator function that convert a class method to a getter
 */
export function selector(prototype, property, { initializer }) {
  return {
    configurable: true,
    enumerable: true,
    get() {
      if (!this[SELECTORS]) {
        this[SELECTORS] = new Map();
      }
      if (!this[SELECTORS].has(prototype)) {
        this[SELECTORS].set(prototype, new Map());
      }
      const proto = this[SELECTORS].get(prototype);
      if (!proto.has(property)) {
        const targetSymbol = Symbol(`${property}-target`);
        this[targetSymbol] = createSelector(...initializer.call(this));
        proto.set(property, () => this[targetSymbol]());
      }
      return proto.get(property)();
    },
  };
}
