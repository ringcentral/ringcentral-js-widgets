"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

exports.default = once;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @function
 * @description Decorator function that make the class method run only once.
 */
function once(prototype, property, _ref) {
  var value = _ref.value,
      descriptor = (0, _objectWithoutProperties3.default)(_ref, ["value"]);

  var run = false;
  function wrappedFn() {
    if (!run) {
      run = true;
      return value.call(this);
    }
    return undefined;
  }
  return (0, _extends3.default)({}, descriptor, {
    value: wrappedFn
  });
}
//# sourceMappingURL=once.js.map
