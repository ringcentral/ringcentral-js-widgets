/**
 * merge all config together, that will merge all `array`, `object` together,
 * and replace other value with `objectB`
 * @param {*} objA source object
 * @param {*} objB target object
 * @returns merge result object
 *
 * @example
 * merge({a: 1}, {a: 2}) // {a: 2}
 * merge({a: 1}, {b: 2}) // {a: 1, b: 2}
 * merge({a: 1}, {a: 2, b: 2}) // {a: 2, b: 2}
 * merge({a: [1]}, {a: [2]}) // {a: [1, 2]}
 */
const merge = (objA, objB) => {
  Object.entries(objB).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      objA[key] = [...(objA[key] || []), ...value];
    } else if (typeof value === 'object') {
      objA[key] = { ...(objA[key] || {}), ...value };
    } else {
      objA[key] = value;
    }
  });
  return objA;
};

module.exports = merge;
