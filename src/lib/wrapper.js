const BASE = Symbol();

/**
 * @class Wrapper
 * Base wrapper class that provide easy access to the wrapped object.
 */
export default class Wrapper {
  constructor(base) {
    this[BASE] = base;
  }
  get base() {
    return this[BASE];
  }
}
