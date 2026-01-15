"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.ConferenceCallDialerPage = void 0;
var _ConferenceDialerPanel = require("../../components/ConferenceDialerPanel");
var _phoneContext = require("../../lib/phoneContext");
var ConferenceCallDialerPage = exports.ConferenceCallDialerPage = (0, _phoneContext.connectModule)(function (phone) {
  return phone.conferenceDialerUI;
})(_ConferenceDialerPanel.ConferenceDialerPanel);
var _default = exports["default"] = ConferenceCallDialerPage;
//# sourceMappingURL=index.js.map
