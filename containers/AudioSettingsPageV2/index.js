"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AudioSettingsPage = void 0;
var _AudioSettingsPanelV = require("../../components/AudioSettingsPanelV2");
var _phoneContext = require("../../lib/phoneContext");
var AudioSettingsPage = (0, _phoneContext.connectModule)(function (phone) {
  return phone.audioSettingsUI;
})(_AudioSettingsPanelV.AudioSettingsPanel);
exports.AudioSettingsPage = AudioSettingsPage;
//# sourceMappingURL=index.js.map
