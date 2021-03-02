"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallHistoryCallLogPage = void 0;

var _CallHistoryCallLogPanel = require("../../components/CallHistoryCallLogPanel");

var _connectModule = require("../../lib/connectModule");

var CallHistoryCallLogPage = (0, _connectModule.connectModule)(function (phone) {
  return phone.evActivityCallUI;
})(_CallHistoryCallLogPanel.CallHistoryCallLogPanel);
exports.CallHistoryCallLogPage = CallHistoryCallLogPage;
//# sourceMappingURL=CallHistoryCallLogPage.js.map
