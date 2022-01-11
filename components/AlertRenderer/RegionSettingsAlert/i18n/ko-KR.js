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
  region: "지역"
}, _defineProperty(_region$regionSetting, _regionSettingsMessages.regionSettingsMessages.saveSuccess, "설정이 성공적으로 저장되었습니다."), _defineProperty(_region$regionSetting, _regionSettingsMessages.regionSettingsMessages.dialingPlansChanged, "이전 지역은 계정에 대해 더 이상 지원되지 않습니다.\n    새 {regionSettingsLink}을(를) 확인하세요."), _defineProperty(_region$regionSetting, "regionSettings", "지역 설정"), _defineProperty(_region$regionSetting, _regionSettingsMessages.regionSettingsMessages.areaCodeInvalid, "유효한 지역 코드를 입력하세요."), _region$regionSetting); // @key: @#@"region"@#@ @source: @#@"Region"@#@
// @key: @#@"[regionSettingsMessages.saveSuccess]"@#@ @source: @#@"Settings saved successfully."@#@
// @key: @#@"[regionSettingsMessages.dialingPlansChanged]"@#@ @source: @#@"The previous region is no longer supported for your account.\n    Please verify your new {regionSettingsLink}."@#@
// @key: @#@"regionSettings"@#@ @source: @#@"region settings"@#@
// @key: @#@"[regionSettingsMessages.areaCodeInvalid]"@#@ @source: @#@"Please enter a valid area code."@#@


exports["default"] = _default;
//# sourceMappingURL=ko-KR.js.map
