"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTimeStamp = getTimeStamp;

var _momentTimezone = _interopRequireDefault(require("moment-timezone"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getTimeStamp(time) {
  var timezone = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'America/New_York';
  return new Date(_momentTimezone["default"].tz(time, timezone).format()).getTime();
}
//# sourceMappingURL=helper.js.map
