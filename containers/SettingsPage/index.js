"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _SettingsPanel = require("../../components/SettingsPanel");
var _phoneContext = require("../../lib/phoneContext");
var _default = (0, _phoneContext.connectModule)(function (phone) {
  return phone.settingsUI;
})(_SettingsPanel.SettingsPanel);
exports["default"] = _default;
//# sourceMappingURL=index.js.map
