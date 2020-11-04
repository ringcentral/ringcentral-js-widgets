"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleToClockTime = void 0;

require("core-js/modules/es6.array.map");

var handleToClockTime = function handleToClockTime(time) {
  // const hour = Math.floor(time / 1000 / 3600);
  var rest = time / 1000 % 3600;
  var minute = parseInt("".concat(rest / 60), 10);
  var second = parseInt("".concat(rest % 60), 10);
  return [minute, second].map(function (time) {
    return "".concat(String(time).length < 2 ? '0' : '').concat(time);
  }).join(':');
};

exports.handleToClockTime = handleToClockTime;
//# sourceMappingURL=time.js.map
