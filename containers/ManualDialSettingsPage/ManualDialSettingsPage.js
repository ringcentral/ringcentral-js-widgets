"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ManualDialSettingsPage = void 0;
var _ManualDialSettingsPanel = require("../../components/ManualDialSettingsPanel");
var _connectModule = require("../../lib/connectModule");
var ManualDialSettingsPage = (0, _connectModule.connectModule)(function (phone) {
  return phone.evManualDialSettingsUI;
})(_ManualDialSettingsPanel.ManualDialSettingsPanel);
exports.ManualDialSettingsPage = ManualDialSettingsPage;
//# sourceMappingURL=ManualDialSettingsPage.js.map
