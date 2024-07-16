import { createSelector } from 'reselect';

const SELECTORS = Symbol('selectors');

/**
 * @function
 * @description Decorator function that convert a class method to a getter
 */
export function selector(prototype: any, property: any, { initializer }: any) {
  return {
    configurable: true,
    enumerable: true,
    // @ts-expect-error TS(7023): 'get' implicitly has return type 'any' because it ... Remove this comment to see the full error message
    get() {
      // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      if (!this[SELECTORS]) {
        // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        this[SELECTORS] = new Map();
      }
      // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      if (!this[SELECTORS].has(prototype)) {
        // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        this[SELECTORS].set(prototype, new Map());
      }
      // @ts-expect-error TS(7022): 'proto' implicitly has type 'any' because it does ... Remove this comment to see the full error message
      const proto = this[SELECTORS].get(prototype);
      if (!proto.has(property)) {
        const targetSymbol = Symbol(`${property}-target`);
        // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        this[targetSymbol] = createSelector(...initializer.call(this));
        // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        proto.set(property, () => this[targetSymbol]());
      }
      return proto.get(property)();
    },
  };
}
