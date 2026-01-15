"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getClockByTimestamp = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.join.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.parse-int.js");
// TODO: refactor with juno methods
/**
 * get clock time from timestamp
 * @returns 10:00:00
 */
var getClockByTimestamp = exports.getClockByTimestamp = function getClockByTimestamp(time) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    _ref$useCeil = _ref.useCeil,
    useCeil = _ref$useCeil === void 0 ? false : _ref$useCeil;
  var number = time / 1000;
  var _int = useCeil ? Math.ceil(number) : Math.floor(number);
  var hour = parseInt("".concat(_int / 60 / 60 % 24), 10);
  var minute = parseInt("".concat(_int / 60 % 60), 10);
  var second = parseInt("".concat(_int % 60), 10);
  return [hour, minute, second].map(function (time) {
    return "".concat(String(time).length < 2 ? '0' : '').concat(time);
  }).join(':');
};
//# sourceMappingURL=getClockByTimestamp.js.map
