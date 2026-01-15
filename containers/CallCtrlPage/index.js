"use strict";

require("core-js/modules/es.object.define-property.js");
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
var _CallCtrlContainer = require("../../components/CallCtrlContainer");
var _phoneContext = require("../../lib/phoneContext");
var CallCtrlPage = exports["default"] = (0, _phoneContext.connectModule)(function (phone) {
  return phone.callControlUI;
})(_CallCtrlContainer.CallCtrlContainer);
//# sourceMappingURL=index.js.map
