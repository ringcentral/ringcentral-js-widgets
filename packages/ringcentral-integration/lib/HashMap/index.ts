const sDefinition = Symbol('definition');
const sValueMap = Symbol('valueMap');

export function defaultGetFunction(item) {
  return item;
}

/**
 * @class HashMap
 * @description Simple hash map class
 */
export default class HashMap {
  /**
   * @constructor
   * @param {Object} definition
   */
  constructor(definition) {
    this[sDefinition] = Object.assign({}, definition);
    this[sValueMap] = new Map();

    for (const key in definition) {
      /* istanbul ignore else */
      if (Object.prototype.hasOwnProperty.call(definition, key)) {
        Object.defineProperty(this, key, {
          get() {
            return this[sDefinition][key];
          },
          enumerable: true,
        });
        this[sValueMap].set(this[sDefinition][key], key);
      }
    }
    Object.freeze(this);
  }

  static getKey(map, value) {
    return map[sValueMap].get(value);
  }

  static hasValue(map, value) {
    return map[sValueMap].has(value);
  }

  static fromSet({
    set,
    getKey = defaultGetFunction,
    getValue = defaultGetFunction,
  }) {
    const definition = {};
    [...set].forEach((item) => {
      const key = getKey(item);
      const value = getValue(item);
      if (typeof key !== 'undefined' && key !== null && key !== '') {
        definition[key] = value;
      }
    });
    return new HashMap(definition);
  }
}

export function createHashMap<V extends string, P>(
  definition: { [K in V]: string },
): { [K in V]: string } & { [K in keyof P]: string } {
  return new HashMap(definition) as any;
}
