"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(utcString) {
  var now = new Date();
  var t = new Date(utcString);
  return now.getFullYear() === t.getFullYear() && now.getMonth() === t.getMonth() && now.getDate() === t.getDate();
}
//# sourceMappingURL=isToday.js.map
