"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _GenericMeetingPanel = require("../../components/GenericMeetingPanel");
var _phoneContext = require("../../lib/phoneContext");
var GenericMeetingPage = (0, _phoneContext.connectModule)(function (phone) {
  return phone.genericMeetingUI;
})(_GenericMeetingPanel.GenericMeetingPanel);
var _default = exports["default"] = GenericMeetingPage;
//# sourceMappingURL=index.js.map
