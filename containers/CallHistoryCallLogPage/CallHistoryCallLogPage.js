"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallHistoryCallLogPage = void 0;
var _CallHistoryCallLogPanel = require("../../components/CallHistoryCallLogPanel");
var _connectModule = require("../../lib/connectModule");
var CallHistoryCallLogPage = exports.CallHistoryCallLogPage = (0, _connectModule.connectModule)(function (phone) {
  return phone.evActivityCallUI;
})(_CallHistoryCallLogPanel.CallHistoryCallLogPanel);
//# sourceMappingURL=CallHistoryCallLogPage.js.map
