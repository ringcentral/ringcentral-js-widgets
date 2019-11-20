"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setUTCTime = setUTCTime;

function setUTCTime() {
  var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();

  var _time = new Date(time);

  var year = _time.getFullYear();

  var month = _time.getMonth();

  var date = _time.getDate();

  return Date.UTC(year, month, date);
}
//# sourceMappingURL=timeFormatHelper.js.map
