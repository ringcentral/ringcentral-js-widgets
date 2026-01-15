"use strict";

require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.to-string.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MINUTE_SCALE = exports.HOUR_SCALE = void 0;
exports.getHoursList = getHoursList;
exports.getMinutesList = getMinutesList;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.slice.js");
var _utils = require("@ringcentral-integration/utils");
var _ramda = require("ramda");
var _i18n = _interopRequireDefault(require("../../components/MeetingConfigsV2/i18n"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var MINUTE_SCALE = exports.MINUTE_SCALE = 4;
var HOUR_SCALE = exports.HOUR_SCALE = 13;
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
