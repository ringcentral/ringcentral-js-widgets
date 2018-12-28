import { createSelector } from 'reselect';

const WRAPPER = Symbol('wrapper');

/**
 * @function
 * @description Decorator function that convert a class method to a getter
 */
export function selector(prototype, property, { initializer }) {
  return {
    configurable: true,
    enumerable: true,
    get() {
      if (!this[WRAPPER]) {
        this[WRAPPER] = {};
      }
      if (!this[WRAPPER][property]) {
        const targetSymbol = Symbol(`${property}-target`);

        this[targetSymbol] = createSelector(...this::initializer());

        this[WRAPPER][property] = () => this[targetSymbol]();
      }
      return this[WRAPPER][property]();
    }
  };
}
