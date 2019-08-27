"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _phoneContext = require("../../lib/phoneContext");

var _MeetingPanel = _interopRequireDefault(require("../../components/MeetingPanel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var MeetingPage = (0, _phoneContext.connectModule)(function (phone) {
  return phone.meetingUI;
})(_MeetingPanel["default"]);
var _default = MeetingPage;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
