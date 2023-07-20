"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallLogCallCtrlContainer = void 0;
var _CallLogCallCtrlPanel = require("../../components/CallLogCallCtrlPanel");
var _phoneContext = require("../../lib/phoneContext");
var CallLogCallCtrlContainer = (0, _phoneContext.connectModule)(function (phone) {
  return phone.callLogCallCtrlUI;
})(_CallLogCallCtrlPanel.CallLogCallCtrlPanel);
exports.CallLogCallCtrlContainer = CallLogCallCtrlContainer;
//# sourceMappingURL=index.js.map
