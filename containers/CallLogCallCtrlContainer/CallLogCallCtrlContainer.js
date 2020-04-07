"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _phoneContext = require("../../lib/phoneContext");

var _CallLogCallCtrl = require("./CallLogCallCtrl");

var _default = (0, _phoneContext.connectModule)(function (phone) {
  return phone.callLogCallCtrlUI;
})(_CallLogCallCtrl.CallLogCallCtrl);

exports["default"] = _default;
//# sourceMappingURL=CallLogCallCtrlContainer.js.map
