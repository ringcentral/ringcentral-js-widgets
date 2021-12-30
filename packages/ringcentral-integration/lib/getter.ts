const WRAPPER = Symbol('wrapper');

/**
 * @deprecated
 */
export default function getter(
  prototype,
  property,
  { initializer, value, get },
) {
  console.warn('"@getter" is deprecated. Use "@computed()" instead.');
  return {
    configurable: true,
    enumerable: true,
    get() {
      if (!this[WRAPPER]) {
        this[WRAPPER] = {};
      }
      if (!this[WRAPPER][property]) {
        const targetSymbol = Symbol(`${property}-target`);

        this[targetSymbol] = initializer
          ? initializer.call(this)
          : value || get;

        this[WRAPPER][property] =
          typeof this[targetSymbol] === 'function'
            ? () => this[targetSymbol]()
            : () => this[targetSymbol];
      }
      return this[WRAPPER][property]();
    },
  };
}
