"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallHistoryPage = void 0;
var _CallHistoryPanel = require("@ringcentral-integration/widgets/components/CallHistoryPanel");
var _connectModule = require("../../lib/connectModule");
var CallHistoryPage = exports.CallHistoryPage = (0, _connectModule.connectModule)(function (phone) {
  return phone.evCallHistoryUI;
})(_CallHistoryPanel.CallHistoryPanel);
//# sourceMappingURL=CallHistoryPage.js.map
