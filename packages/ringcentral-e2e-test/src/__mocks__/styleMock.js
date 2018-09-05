module.exports = new Proxy({}, {
  get: function getter(target, key) {
    return key === '__esModule' ? false : key;
  }
});
