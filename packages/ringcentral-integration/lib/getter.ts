const WRAPPER = Symbol('wrapper');

/**
 * @deprecated
 */
export default function getter(
  prototype: any,
  property: any,
  { initializer, value, get }: any,
) {
  console.warn('"@getter" is deprecated. Use "@computed()" instead.');
  return {
    configurable: true,
    enumerable: true,
    // @ts-expect-error TS(7023): 'get' implicitly has return type 'any' because it ... Remove this comment to see the full error message
    get() {
      // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      if (!this[WRAPPER]) {
        // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        this[WRAPPER] = {};
      }
      // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      if (!this[WRAPPER][property]) {
        const targetSymbol = Symbol(`${property}-target`);

        // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        this[targetSymbol] = initializer
          ? initializer.call(this)
          : value || get;

        // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        this[WRAPPER][property] =
          // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          typeof this[targetSymbol] === 'function'
            ? // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
              () => this[targetSymbol]()
            : // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
              () => this[targetSymbol];
      }
      // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      return this[WRAPPER][property]();
    },
  };
}
