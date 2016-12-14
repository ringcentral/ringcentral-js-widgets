"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

exports.default = sleep;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function sleep() {
  var ms = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

  return new _promise2.default(function (resolve) {
    setTimeout(resolve, ms);
  });
}
//# sourceMappingURL=sleep.js.map
