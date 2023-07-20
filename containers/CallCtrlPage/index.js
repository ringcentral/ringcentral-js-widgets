"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "CallCtrlContainer", {
  enumerable: true,
  get: function get() {
    return _CallCtrlContainer.CallCtrlContainer;
  }
});
exports["default"] = void 0;
var _phoneContext = require("../../lib/phoneContext");
var _CallCtrlContainer = require("../../components/CallCtrlContainer");
var CallCtrlPage = (0, _phoneContext.connectModule)(function (phone) {
  return phone.callControlUI;
})(_CallCtrlContainer.CallCtrlContainer);
exports["default"] = CallCtrlPage;
//# sourceMappingURL=index.js.map
