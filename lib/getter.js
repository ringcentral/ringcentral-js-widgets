'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * @function
 * @description Decorator function that convert a class method to a getter
 */
function selector(prototype, property, _ref) {
  var initializer = _ref.initializer,
      value = _ref.value,
      _get = _ref.get;

  var wrapper = void 0;
  return {
    configurable: true,
    enumerable: true,
    get: function get() {
      var _this = this;

      if (!wrapper) {
        wrapper = {};
        if (initializer) {
          wrapper.target = initializer.call(this);
        } else {
          wrapper.target = value || _get;
        }
        wrapper.fn = typeof wrapper.target === 'function' ? function () {
          return wrapper.target.call(_this);
        } : function () {
          return wrapper.target;
        };
      }
      return wrapper.fn();
    }
  };
}
exports.default = selector;
//# sourceMappingURL=getter.js.map
