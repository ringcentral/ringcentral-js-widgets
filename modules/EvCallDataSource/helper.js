"use strict";

require("core-js/modules/es.date.to-string");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTimeStamp = getTimeStamp;
var _dayjs = _interopRequireDefault(require("dayjs"));
var _utc = _interopRequireDefault(require("dayjs/plugin/utc"));
var _timezone = _interopRequireDefault(require("dayjs/plugin/timezone"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
_dayjs["default"].extend(_utc["default"]);
_dayjs["default"].extend(_timezone["default"]);
function getTimeStamp(time) {
  var timezone = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'America/New_York';
  return new Date(_dayjs["default"].tz(time, timezone).format()).getTime();
}
//# sourceMappingURL=helper.js.map
