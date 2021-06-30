"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallHistoryPage = void 0;

var _CallHistoryPanel = require("@ringcentral-integration/widgets/components/CallHistoryPanel");

var _connectModule = require("../../lib/connectModule");

var CallHistoryPage = (0, _connectModule.connectModule)(function (phone) {
  return phone.evCallHistoryUI;
})(_CallHistoryPanel.CallHistoryPanel);
exports.CallHistoryPage = CallHistoryPage;
//# sourceMappingURL=CallHistoryPage.js.map
