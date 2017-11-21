"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

exports.default = wrapDescriptor;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @function
 * @description helper function to wrap property descriptors with fn
 * @param {Object} descriptor
 * @param {function} fn
 */
function wrapDescriptor(descriptor, fn) {
  var wrappedDescriptor = (0, _extends3.default)({}, descriptor);
  if (descriptor.get) {
    wrappedDescriptor.get = function get() {
      fn.call(this);
      return descriptor.get.call(this);
    };
  }
  if (descriptor.set) {
    wrappedDescriptor.set = function set(value) {
      fn.call(this);
      return descriptor.set.call(this, value);
    };
  }
  if (descriptor.value) {
    wrappedDescriptor.value = function value() {
      var _descriptor$value;

      fn.call(this);
      return (_descriptor$value = descriptor.value).call.apply(_descriptor$value, [this].concat(Array.prototype.slice.call(arguments)));
    };
  }
  if (descriptor.initializer) {
    wrappedDescriptor.initializer = function initializer() {
      var _this = this;

      var target = descriptor.initializer.call(this);
      return function () {
        fn.call(_this);
        return target.call.apply(target, [_this].concat(Array.prototype.slice.call(arguments)));
      };
    };
  }
  return wrappedDescriptor;
}
//# sourceMappingURL=wrapDescriptor.js.map
