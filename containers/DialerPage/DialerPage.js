"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DialerPage = void 0;
var _DialerPanel = require("../../components/DialerPanel");
var _connectModule = require("../../lib/connectModule");
var DialerPage = (0, _connectModule.connectModule)(function (phone) {
  return phone.evDialerUI;
})(_DialerPanel.DialerPanel);
exports.DialerPage = DialerPage;
//# sourceMappingURL=DialerPage.js.map
