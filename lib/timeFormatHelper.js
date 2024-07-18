"use strict";

require("core-js/modules/es.date.now");
require("core-js/modules/es.date.to-string");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDateFromUTCDay = getDateFromUTCDay;
exports.setUTCTime = setUTCTime;
var _dayjs = _interopRequireDefault(require("dayjs"));
var _utc = _interopRequireDefault(require("dayjs/plugin/utc"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
_dayjs["default"].extend(_utc["default"]);
function setUTCTime() {
  var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Date.now();
  var _time = new Date(time);
  var year = _time.getFullYear();
  var month = _time.getMonth();
  var date = _time.getDate();
  return Date.UTC(year, month, date);
}
function getDateFromUTCDay(timeStamp) {
  return new Date(_dayjs["default"].utc(timeStamp).format('MM/DD/YYYY'));
}
//# sourceMappingURL=timeFormatHelper.js.map
