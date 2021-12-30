/**
 * @class Subscribable
 * @description Simple subscribable base class
 */
export default class Subscribable {
  constructor() {
    this._handlers = new Set();
  }
  /**
   * @function
   * @param {Function} handler
   * @return {Function} unsubscriber
   */
  subscribe(handler) {
    this._handlers.add(handler);
    return () => {
      this.unsubscribe(handler);
    };
  }
  /**
   * @function
   * @param {Function} handler
   */
  unsubscribe(handler) {
    this._handlers.delete(handler);
  }
  /**
   * @function
   */
  trigger() {
    [...this._handlers].forEach((handler) => {
      try {
        handler();
      } catch (e) {
        /* ignore error */
      }
    });
  }
}
