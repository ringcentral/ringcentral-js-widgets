"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatDuration = formatDuration;
exports.formatDurationWithLocale = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.join.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.number.is-nan.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.parse-int.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.pad-start.js");
var _dayjs = _interopRequireDefault(require("dayjs"));
var _duration = _interopRequireDefault(require("dayjs/plugin/duration"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
_dayjs["default"].extend(_duration["default"]);
var getDuration = function getDuration(duration) {
  if (duration === null || duration === undefined || Number.isNaN(duration)) {
    return null;
  }
  var dur = _dayjs["default"].duration(typeof duration === 'number' ? duration : parseInt(duration, 10), 'seconds');
  return dur;
};

/**
 * format duration to string, 'hh:mm:ss'
 *
 * if duration is NaN or undefined, return '--:--'
 *
 * when you need to format duration with locale, try use `formatDurationWithLocale` instead
 */
function formatDuration(duration) {
  var invalidDisplay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '--:--';
  var dur = getDuration(duration);
  if (!dur) return invalidDisplay;
  var hours = dur.hours();
  var minutes = dur.minutes();
  var seconds = dur.seconds();
  var hourString = hours > 0 ? "".concat(hours.toString().padStart(2, '0'), ":") : '';
  var minuteString = minutes.toString().padStart(2, '0');
  var secondString = seconds.toString().padStart(2, '0');
  return "".concat(hourString).concat(minuteString, ":").concat(secondString);
}
/**
 * Formats a duration provided in seconds into a localized string representation.
 *
 * Trailing zero units are omitted from the output.
 *
 * like `1 hr 2 min 5 secs`
 *
 * @param duration - The duration in seconds. Can be null or undefined.
 * @returns A formatted duration string based on the provided duration and locale.
 *
 * @example
 * formatDurationWithLocale(3725, {
 *   day: 'days',
 *   hr: 'hr',
 *   min: 'min',
 *   sec: 'secs'
 * })
 * - // Returns: "1 hr 2 min 5 secs"
 *
 * @example
 * formatDurationWithLocale(3720, {
 *   day: 'days',
 *   hr: 'hr',
 *   min: 'min',
 *   sec: 'secs'
 * })
 * - // Returns: "1 hr 2 min" (trailing 0 secs omitted)
 */
var formatDurationWithLocale = exports.formatDurationWithLocale = function formatDurationWithLocale(duration, _ref) {
  var day = _ref.day,
    hr = _ref.hr,
    min = _ref.min,
    sec = _ref.sec;
  var dur = getDuration(duration);
  if (!dur) return '';
  var totalDays = Math.floor(dur.asDays());
  var hours = dur.hours();
  var minutes = dur.minutes();
  var seconds = dur.seconds();
  var parts = [];
  if (totalDays > 0) {
    parts.push("".concat(totalDays, " ").concat(day));
  }
  if (hours > 0) {
    parts.push("".concat(hours, " ").concat(hr));
  }
  if (minutes > 0) {
    parts.push("".concat(minutes, " ").concat(min));
  }
  if (seconds > 0) {
    parts.push("".concat(seconds, " ").concat(sec));
  }
  return parts.join(' ');
};
//# sourceMappingURL=formatDuration.js.map
