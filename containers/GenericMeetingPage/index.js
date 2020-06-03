"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _phoneContext = require("../../lib/phoneContext");

var _GenericMeetingPanel = require("../../components/GenericMeetingPanel");

var GenericMeetingPage = (0, _phoneContext.connectModule)(function (phone) {
  return phone.genericMeetingUI;
})(_GenericMeetingPanel.GenericMeetingPanel);
var _default = GenericMeetingPage;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
