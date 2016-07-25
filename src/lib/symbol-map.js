import Enum from './enum';

/**
 * @class
 * @description Helper class for creating a symbol mapping
 */
export default class SymbolMap extends Enum {
  /**
   * @constructor
   * @param {String[]} keys
   */
  constructor(keys) {
    const definition = {};
    keys.forEach(key => {
      definition[key] = Symbol();
    });
    super(definition);
  }
}
