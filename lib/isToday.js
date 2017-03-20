"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (utcString) {
  var now = new Date();
  var t = new Date(utcString);
  return now.getFullYear() === t.getFullYear() && now.getMonth() === t.getMonth() && now.getDate() === t.getDate();
};
//# sourceMappingURL=isToday.js.map
