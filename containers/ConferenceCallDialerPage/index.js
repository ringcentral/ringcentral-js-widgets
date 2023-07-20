"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.ConferenceCallDialerPage = void 0;
var _ConferenceDialerPanel = require("../../components/ConferenceDialerPanel");
var _phoneContext = require("../../lib/phoneContext");
var ConferenceCallDialerPage = (0, _phoneContext.connectModule)(function (phone) {
  return phone.conferenceDialerUI;
})(_ConferenceDialerPanel.ConferenceDialerPanel);
exports.ConferenceCallDialerPage = ConferenceCallDialerPage;
var _default = ConferenceCallDialerPage;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
