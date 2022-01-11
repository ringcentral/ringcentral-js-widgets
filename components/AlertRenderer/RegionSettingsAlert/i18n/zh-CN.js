"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _regionSettingsMessages = require("@ringcentral-integration/commons/modules/RegionSettings/regionSettingsMessages");

var _region$regionSetting;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_region$regionSetting = {
  region: "地区"
}, _defineProperty(_region$regionSetting, _regionSettingsMessages.regionSettingsMessages.saveSuccess, "设置已成功保存。"), _defineProperty(_region$regionSetting, _regionSettingsMessages.regionSettingsMessages.dialingPlansChanged, "您的帐户不再支持以前的地区。\n    请验证您的新{regionSettingsLink}。"), _defineProperty(_region$regionSetting, "regionSettings", "地区设置"), _defineProperty(_region$regionSetting, _regionSettingsMessages.regionSettingsMessages.areaCodeInvalid, "请输入有效的区号。"), _region$regionSetting); // @key: @#@"region"@#@ @source: @#@"Region"@#@
// @key: @#@"[regionSettingsMessages.saveSuccess]"@#@ @source: @#@"Settings saved successfully."@#@
// @key: @#@"[regionSettingsMessages.dialingPlansChanged]"@#@ @source: @#@"The previous region is no longer supported for your account.\n    Please verify your new {regionSettingsLink}."@#@
// @key: @#@"regionSettings"@#@ @source: @#@"region settings"@#@
// @key: @#@"[regionSettingsMessages.areaCodeInvalid]"@#@ @source: @#@"Please enter a valid area code."@#@


exports["default"] = _default;
//# sourceMappingURL=zh-CN.js.map
