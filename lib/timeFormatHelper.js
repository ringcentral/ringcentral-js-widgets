"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDateFromUTCDay = getDateFromUTCDay;
exports.setUTCTime = setUTCTime;

require("core-js/modules/es6.date.now");

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function setUTCTime() {
  var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Date.now();

  var _time = new Date(time);

  var year = _time.getFullYear();

  var month = _time.getMonth();

  var date = _time.getDate();

  return Date.UTC(year, month, date);
}

function getDateFromUTCDay(timeStamp) {
  return new Date(_moment["default"].utc(timeStamp).format('MM/DD/YYYY'));
}
//# sourceMappingURL=timeFormatHelper.js.map
