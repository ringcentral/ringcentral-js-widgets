"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

exports.default = background;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @background is a decorator designed for explicitly making the function
 * to be executed in background instead of client.
 * It can be used for decorating UI-driven function calls so that it will
 * only be called in background.
 */
function background(target, name, _ref) {
  var value = _ref.value,
      descriptor = (0, _objectWithoutProperties3.default)(_ref, ["value"]);

  function wrappedFn() {
    // Only clinet has transport
    if (!this._transport) {
      return value.call.apply(value, [this].concat(Array.prototype.slice.call(arguments)));
    }
    return null;
  }
  return (0, _extends3.default)({}, descriptor, {
    value: wrappedFn
  });
}
//# sourceMappingURL=index.js.map
