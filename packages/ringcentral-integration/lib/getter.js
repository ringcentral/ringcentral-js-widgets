const WRAPPER = Symbol('wrapper');

/**
 * @function
 * @description Decorator function that convert a class method to a getter
 */
export default function selector(prototype, property, { initializer, value, get }) {
  return {
    configurable: true,
    enumerable: true,
    get() {
      if (!this[WRAPPER]) {
        this[WRAPPER] = {};
      }
      if (!this[WRAPPER][property]) {
        const targetSymbol = Symbol(`${property}-target`);

        this[targetSymbol] = initializer ?
          this::initializer() :
          (value || get);

        this[WRAPPER][property] = typeof this[targetSymbol] === 'function' ?
          () => this[targetSymbol]() :
          () => this[targetSymbol];
      }
      return this[WRAPPER][property]();
    }
  };
}
