"use strict";

require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.slice");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MINUTE_SCALE = exports.HOUR_SCALE = void 0;
exports.getHoursList = getHoursList;
exports.getMinutesList = getMinutesList;
var _utils = require("@ringcentral-integration/utils");
var _ramda = require("ramda");
var _i18n = _interopRequireDefault(require("../../components/MeetingConfigsV2/i18n"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var MINUTE_SCALE = 4;
exports.MINUTE_SCALE = MINUTE_SCALE;
var HOUR_SCALE = 13;
exports.HOUR_SCALE = HOUR_SCALE;
function getMinutesList(MINUTE_SCALE, currentLocale) {
  return (0, _ramda.reduce)(function (result) {
    var index = result.length;
    var value = 60 / MINUTE_SCALE * index;
    var text = (0, _utils.format)(_i18n["default"].getString('minutes', currentLocale), {
      howMany: "".concat(value, "0").slice(0, 2)
    });
    return result.concat({
      // @ts-expect-error TS(2769): No overload matches this call.
      value: value,
      text: text
    });
  }, [], new Array(MINUTE_SCALE));
}
function getHoursList(HOUR_SCALE, currentLocale) {
  if (HOUR_SCALE > 23) {
    throw new Error('HOUR_SCALE must be less than 23.');
  }
  return (0, _ramda.reduce)(function (result) {
    var value = result.length;
    var text = (0, _utils.format)(_i18n["default"].getString('hours', currentLocale), {
      howMany: "0".concat(value, "0").slice(-3, -1)
    });
    return result.concat({
      // @ts-expect-error TS(2769): No overload matches this call.
      value: value,
      text: text
    });
  }, [], new Array(HOUR_SCALE));
}
//# sourceMappingURL=index.js.map
