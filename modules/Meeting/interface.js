"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "MeetingScheduleResource", {
  enumerable: true,
  get: function get() {
    return _MeetingScheduleResource["default"];
  }
});
exports.AUDIO_OPTIONS = void 0;

var _MeetingScheduleResource = _interopRequireDefault(require("ringcentral-client/build/definitions/MeetingScheduleResource"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var AUDIO_OPTIONS = {
  ComputerAudio: 'ComputerAudio',
  Phone: 'Phone'
};
exports.AUDIO_OPTIONS = AUDIO_OPTIONS;
//# sourceMappingURL=interface.js.map
