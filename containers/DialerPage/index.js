"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _DialerPanel = require("../../components/DialerPanel");
var _phoneContext = require("../../lib/phoneContext");
var _default = (0, _phoneContext.connectModule)(function (phone) {
  return phone.dialerUI;
})(_DialerPanel.DialerPanel);
exports["default"] = _default;
//# sourceMappingURL=index.js.map
