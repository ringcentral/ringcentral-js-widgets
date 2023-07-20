"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityCallLogPage = void 0;
var _ActivityCallLogPanel = require("../../components/ActivityCallLogPanel");
var _connectModule = require("../../lib/connectModule");
var ActivityCallLogPage = (0, _connectModule.connectModule)(function (phone) {
  return phone.evActivityCallUI;
})(_ActivityCallLogPanel.ActivityCallLogPanel);
exports.ActivityCallLogPage = ActivityCallLogPage;
//# sourceMappingURL=ActivityCallLogPage.js.map
