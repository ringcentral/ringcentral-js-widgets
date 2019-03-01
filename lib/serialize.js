"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = serialize;

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.promise");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * A decorator for making sure specific function being invoked serializely.
 *
 * Usage:
 * class A {
 *   @serialize
 *   async foo() {}
 * }
 *
 */
function serialize(target, key, descriptor) {
  var prev = null;

  function serializeFunc() {
    var _this = this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var next = function next() {
      return Promise.resolve(descriptor.value.apply(_this, args)).then(function () {
        prev = null;
      });
    };

    prev = prev ? prev.then(next) : next();
    return prev;
  }

  return _objectSpread({}, descriptor, {
    value: serializeFunc
  });
}
//# sourceMappingURL=serialize.js.map
