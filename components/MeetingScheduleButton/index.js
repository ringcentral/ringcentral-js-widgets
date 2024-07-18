"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {};
exports["default"] = void 0;
var _MeetingScheduleButton = require("./MeetingScheduleButton");
Object.keys(_MeetingScheduleButton).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _MeetingScheduleButton[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _MeetingScheduleButton[key];
    }
  });
});
var _default = _MeetingScheduleButton.MeetingScheduleButton;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
