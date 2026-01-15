"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatDateFromNow = void 0;
require("core-js/modules/es.array.concat.js");
var _dayjs = _interopRequireDefault(require("dayjs"));
var _duration = _interopRequireDefault(require("dayjs/plugin/duration"));
var _localizedFormat = _interopRequireDefault(require("dayjs/plugin/localizedFormat"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
_dayjs["default"].extend(_duration["default"]);
_dayjs["default"].extend(_localizedFormat["default"]);
var defaultTimeFormat = 'LT';

/**
 * return from now day format
 *
 * If the date is today, it returns the time in the default format.
 * If the date is yesterday, it returns 'yesterday' or 'yesterday, time' based on the startTimeMode.
 * If the date is within the current week, it returns the day of the week or 'day of the week, time' based on the startTimeMode.
 * If the date is within the current year, it returns the date in 'M/D' format or 'M/D, time' based on the startTimeMode.
 * Otherwise, it returns the date in localized format or 'localized format, time' based on the startTimeMode.
 *
 * @param date
 * @returns
 */
var formatDateFromNow = exports.formatDateFromNow = function formatDateFromNow(dateTime, _ref) {
  var yesterday = _ref.yesterday,
    baseTime = _ref.baseTime,
    _ref$timePresentation = _ref.timePresentationMode,
    timePresentationMode = _ref$timePresentation === void 0 ? 'withTime' : _ref$timePresentation;
  var withoutTime = timePresentationMode === 'withoutTime';
  if (!dateTime) return '';
  var date = (0, _dayjs["default"])(dateTime);
  var baseTimeDate = (0, _dayjs["default"])(baseTime);
  if (date.isSame(baseTimeDate, 'day')) return date.format(defaultTimeFormat);
  if (date.isSame(baseTimeDate.subtract(1, 'day'), 'day')) return withoutTime ? yesterday : "".concat(yesterday, ", ").concat(date.format(defaultTimeFormat));
  if (date.isSame(baseTimeDate, 'week')) return date.format(withoutTime ? 'ddd' : "ddd, ".concat(defaultTimeFormat));
  if (date.isSame(baseTimeDate, 'year')) return date.format(withoutTime ? 'M/D' : "M/D ".concat(defaultTimeFormat));
  return date.format(withoutTime ? 'l' : "l ".concat(defaultTimeFormat));
};
//# sourceMappingURL=formatDateFromNow.js.map
