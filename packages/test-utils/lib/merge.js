module.exports = function(objA, objB) {
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
