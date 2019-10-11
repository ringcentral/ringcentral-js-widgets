"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Enum = require("../../lib/Enum");

var _default = (0, _Enum.createEnum)(['idle', 'scheduling', 'scheduled'], 'meetingScheduleStatus');

exports["default"] = _default;
//# sourceMappingURL=scheduleStatus.js.map
