import Wrapper from './wrapper';

const hasOwnProperty = {}.hasOwnProperty;

export default class Enum extends Wrapper {
  constructor(definition) {
    super(Object.assign({}, definition));
    for (const key in definition) {
      if (hasOwnProperty.call(definition, key)) {
        // defineProperty can be a performance hit
        Object.defineProperty(this, key, {
          get() {
            return this.base[key];
          },
          enumerable: true,
        });
      }
    }
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

