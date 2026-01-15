"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SettingsPage = void 0;
var _SettingsPanel = require("../../components/SettingsPanel");
var _connectModule = require("../../lib/connectModule");
var SettingsPage = exports.SettingsPage = (0, _connectModule.connectModule)(function (phone) {
  return phone.evSettingsUI;
})(_SettingsPanel.SettingsPanel);
//# sourceMappingURL=SettingsPage.js.map
