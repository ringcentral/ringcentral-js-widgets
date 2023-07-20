"use strict";

require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.slice");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getHoursList = getHoursList;
exports.getMinutesList = getMinutesList;
var _ramda = require("ramda");
function getMinutesList(MINUTE_SCALE) {
  return (0, _ramda.reduce)(function (result) {
    var index = result.length;
    var value = 60 / MINUTE_SCALE * index;
    var text = "".concat("".concat(value, "0").slice(0, 2), " min");
    return result.concat({
      // @ts-expect-error TS(2769): No overload matches this call.
      value: value,
      text: text
    });
  }, [], new Array(MINUTE_SCALE));
}
function getHoursList(HOUR_SCALE) {
  if (HOUR_SCALE > 23) {
    throw new Error('HOUR_SCALE must be less than 23.');
  }
  return (0, _ramda.reduce)(function (result) {
    var value = result.length;
    var text = "".concat("0".concat(value, "0").slice(-3, -1), " hr");
    return result.concat({
      // @ts-expect-error TS(2769): No overload matches this call.
      value: value,
      text: text
    });
  }, [], new Array(HOUR_SCALE));
}
//# sourceMappingURL=helpers.js.map
