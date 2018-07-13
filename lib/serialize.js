"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

exports.default = serialize;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var next = function next() {
      return _promise2.default.resolve(descriptor.value.apply(_this, args)).then(function () {
        prev = null;
      });
    };
    prev = prev ? prev.then(next) : next();
    return prev;
  }

  return (0, _extends3.default)({}, descriptor, {
    value: serializeFunc
  });
}
//# sourceMappingURL=serialize.js.map
