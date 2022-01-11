"use strict";

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = wrapDescriptor;

require("core-js/modules/es6.object.define-property");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @function
 * @description helper function to wrap property descriptors with fn
 * @param {Object} descriptor
 * @param {function} fn
 */
function wrapDescriptor(descriptor, fn) {
  var wrappedDescriptor = _objectSpread({}, descriptor);

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

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return (_descriptor$value = descriptor.value).call.apply(_descriptor$value, [this].concat(args));
    };
  }

  if (descriptor.initializer) {
    wrappedDescriptor.initializer = function initializer() {
      var _this = this;

      var target = descriptor.initializer.call(this);
      return function () {
        fn.call(_this);

        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        return target.call.apply(target, [_this].concat(args));
      };
    };
  }

  return wrappedDescriptor;
}
//# sourceMappingURL=wrapDescriptor.js.map
