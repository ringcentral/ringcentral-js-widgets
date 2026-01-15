"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallLogCallCtrlContainer = void 0;
var _CallLogCallCtrlPanel = require("../../components/CallLogCallCtrlPanel");
var _phoneContext = require("../../lib/phoneContext");
var CallLogCallCtrlContainer = exports.CallLogCallCtrlContainer = (0, _phoneContext.connectModule)(function (phone) {
  return phone.callLogCallCtrlUI;
})(_CallLogCallCtrlPanel.CallLogCallCtrlPanel);
//# sourceMappingURL=index.js.map
