"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.symbol.to-primitive");
require("core-js/modules/es.date.to-primitive");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.object.to-string");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regionSettingsMessages = require("@ringcentral-integration/commons/modules/RegionSettings/regionSettingsMessages");
var _region$regionSetting;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _default = (_region$regionSetting = {
  region: "지역"
}, _defineProperty(_region$regionSetting, _regionSettingsMessages.regionSettingsMessages.saveSuccess, "설정이 성공적으로 저장되었습니다."), _defineProperty(_region$regionSetting, _regionSettingsMessages.regionSettingsMessages.dialingPlansChanged, "이전 지역은 계정에 대해 더 이상 지원되지 않습니다.\n    새 {regionSettingsLink}을(를) 확인하세요."), _defineProperty(_region$regionSetting, "regionSettings", "지역 설정"), _defineProperty(_region$regionSetting, _regionSettingsMessages.regionSettingsMessages.areaCodeInvalid, "유효한 지역 코드를 입력하세요."), _region$regionSetting); // @key: @#@"region"@#@ @source: @#@"Region"@#@
// @key: @#@"[regionSettingsMessages.saveSuccess]"@#@ @source: @#@"Settings saved successfully."@#@
// @key: @#@"[regionSettingsMessages.dialingPlansChanged]"@#@ @source: @#@"The previous region is no longer supported for your account.\n    Please verify your new {regionSettingsLink}."@#@
// @key: @#@"regionSettings"@#@ @source: @#@"region settings"@#@
// @key: @#@"[regionSettingsMessages.areaCodeInvalid]"@#@ @source: @#@"Please enter a valid area code."@#@
exports["default"] = _default;
//# sourceMappingURL=ko-KR.js.map
