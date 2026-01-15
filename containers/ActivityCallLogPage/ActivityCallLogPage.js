"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityCallLogPage = void 0;
var _ActivityCallLogPanel = require("../../components/ActivityCallLogPanel");
var _connectModule = require("../../lib/connectModule");
var ActivityCallLogPage = exports.ActivityCallLogPage = (0, _connectModule.connectModule)(function (phone) {
  return phone.evActivityCallUI;
})(_ActivityCallLogPanel.ActivityCallLogPanel);
//# sourceMappingURL=ActivityCallLogPage.js.map
