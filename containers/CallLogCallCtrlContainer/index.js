"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallLogCallCtrlContainer = void 0;

var _phoneContext = require("../../lib/phoneContext");

var _CallLogCallCtrlPanel = require("../../components/CallLogCallCtrlPanel");

var CallLogCallCtrlContainer = (0, _phoneContext.connectModule)(function (phone) {
  return phone.callLogCallCtrlUI;
})(_CallLogCallCtrlPanel.CallLogCallCtrlPanel);
exports.CallLogCallCtrlContainer = CallLogCallCtrlContainer;
//# sourceMappingURL=index.js.map
