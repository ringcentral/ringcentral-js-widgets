"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _SettingsPanel = require("../../components/SettingsPanel");
var _phoneContext = require("../../lib/phoneContext");
var _default = exports["default"] = (0, _phoneContext.connectModule)(function (phone) {
  return phone.settingsUI;
})(_SettingsPanel.SettingsPanel);
//# sourceMappingURL=index.js.map
