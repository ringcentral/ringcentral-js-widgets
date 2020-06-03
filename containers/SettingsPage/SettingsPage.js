"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SettingsPage = void 0;

var _connectModule = require("../../lib/connectModule");

var _SettingsPanel = require("../../components/SettingsPanel");

var SettingsPage = (0, _connectModule.connectModule)(function (phone) {
  return phone.evSettingsUI;
})(_SettingsPanel.SettingsPanel);
exports.SettingsPage = SettingsPage;
//# sourceMappingURL=SettingsPage.js.map
