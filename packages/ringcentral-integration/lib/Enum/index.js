import HashMap from '../HashMap';

const { hasOwnProperty } = Object.prototype;
/**
 * @class
 * @description helper class for creating redux action definition maps
 */
export default class Enum extends HashMap {
  /**
   * @constructor
   * @param {String[]} actions - list of action strings
   * @extends HashMap
   */
  constructor(values = [], prefix = '') {
    const definition = {};
    values.forEach((value) => {
      definition[value] = prefix !== '' ? `${prefix}-${value}` : value;
    });
    super(definition);
  }
}
const prefixCache = new Map();

/**
 * @function
 * @description helper function to return a prefixed action definition maps
 */
export function prefixEnum({ enumMap, prefix, base = enumMap }) {
  if (!prefix || prefix === '') return base;

  if (!prefixCache.has(prefix)) {
    prefixCache.set(prefix, new Map());
  }

  const cache = prefixCache.get(prefix);

  if (!cache.has(base)) {
    const definition = {};
    for (const type in base) {
      /* istanbul ignore else */
      if (base::hasOwnProperty(type)) {
        definition[type] = `${prefix}-${base[type]}`;
      }
    }
    cache.set(base, new HashMap(definition));
  }
  return cache.get(base);
}
