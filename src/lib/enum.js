const hasOwnProperty = {}.hasOwnProperty;
const DEFINITION = Symbol();
const VALUES = Symbol();

export default class Enum {
  constructor(definition) {
    this[DEFINITION] = Object.assign({}, definition);
    this[VALUES] = new Set();

    for (const key in definition) {
      if (hasOwnProperty.call(definition, key)) {
        Object.defineProperty(this, key, {
          get() {
            return this[DEFINITION][key];
          },
          enumerable: true,
        });
        this[VALUES].add(this[DEFINITION][key]);
      }
    }
  }
  static hasValue(value) {
    return this[VALUES].has(value);
  }
}

/*
 * //with Proxy support
 *const enumHandler = {
 *  get(target, key) {
 *    return target[key];
 *  },
 *  set() {
 *    return;
 *  }
 *};
 *Enum = class Enum extends Proxy {
 *  constructor(definition) {
 *    super(Object.assign({}, definition), enumHandler);
 *  }
 *}
 */

