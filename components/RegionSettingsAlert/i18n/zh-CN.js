"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _region$regionSetting;

var _regionSettingsMessages = require("ringcentral-integration/modules/RegionSettings/regionSettingsMessages");

var _regionSettingsMessages2 = _interopRequireDefault(_regionSettingsMessages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (_region$regionSetting = {
  region: "地区"
}, (0, _defineProperty3.default)(_region$regionSetting, _regionSettingsMessages2.default.saveSuccess, "设置已成功保存。"), (0, _defineProperty3.default)(_region$regionSetting, _regionSettingsMessages2.default.dialingPlansChanged, "您的账户不再支持以前的地区。\n    请验证您的新 {regionSettingsLink}。"), (0, _defineProperty3.default)(_region$regionSetting, "regionSettings", "地区设置"), (0, _defineProperty3.default)(_region$regionSetting, _regionSettingsMessages2.default.areaCodeInvalid, "请输入有效的区号。"), _region$regionSetting);

// @key: @#@"region"@#@ @source: @#@"Region"@#@
// @key: @#@"[regionSettingsMessages.saveSuccess]"@#@ @source: @#@"Settings saved successfully."@#@
// @key: @#@"[regionSettingsMessages.dialingPlansChanged]"@#@ @source: @#@"The previous region is no longer supported for your account.\n    Please verify your new {regionSettingsLink}."@#@
// @key: @#@"regionSettings"@#@ @source: @#@"region settings"@#@
// @key: @#@"[regionSettingsMessages.areaCodeInvalid]"@#@ @source: @#@"Please enter a valid area code."@#@
//# sourceMappingURL=zh-CN.js.map
