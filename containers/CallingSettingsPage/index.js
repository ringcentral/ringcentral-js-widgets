"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _CallingSettingsPanel = require("../../components/CallingSettingsPanel");

var _phoneContext = require("../../lib/phoneContext");

var _default = (0, _phoneContext.connectModule)(function (phone) {
  return phone.callingSettingsUI;
})(_CallingSettingsPanel.CallingSettingsPanel);

exports["default"] = _default;
//# sourceMappingURL=index.js.map
