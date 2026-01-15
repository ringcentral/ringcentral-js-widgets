"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.number.constructor.js");
var _CallingSettings = require("@ringcentral-integration/commons/modules/CallingSettings");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /* eslint-disable */
var _default = exports["default"] = _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, _CallingSettings.callingSettingsMessages.saveSuccess, '설정이 성공적으로 저장되었습니다.'), _CallingSettings.callingSettingsMessages.saveSuccessWithSoftphone, '설정이 성공적으로 저장되었습니다. 컴퓨터에 {brand}이(가) 설치되어 있는지 확인하세요.'), _CallingSettings.callingSettingsMessages.permissionChanged, '최근 권한이 변경되었습니다. {link}(으)로 이동하여 통화 옵션을 확인하세요.'), _CallingSettings.callingSettingsMessages.phoneNumberChanged, '최근 전화번호 정보가 변경되었습니다. {link}(으)로 이동하여 통화 옵션을 확인하세요.'), "link", '설정 > 통화'), _CallingSettings.callingSettingsMessages.webphonePermissionRemoved, '권한이 변경되어 브라우저를 사용하여 전화를 걸 수 없습니다. 자세한 내용은 계정 관리자에게 문의하세요.'), _CallingSettings.callingSettingsMessages.emergencyCallingNotAvailable, '긴급 또는 특별 서비스 번호로 전화 걸기는 지원되지 않습니다. 비상시에는 기존 유선 전화 또는 무선 전화를 사용하여 긴급 번호로 전화를 거세요.'), _CallingSettings.callingSettingsMessages.saveSuccessWithJupiter, '설정이 성공적으로 저장되었습니다. 컴퓨터에 {brand}이(가) 설치되어 있는지 확인하세요.'), _CallingSettings.callingSettingsMessages.disableEmergencyInJapan, '일본에서는 긴급 서비스를 이용할 수 없습니다.'); // @key: @#@"[callingSettingsMessages.saveSuccess]"@#@ @source: @#@"Settings saved successfully."@#@
// @key: @#@"[callingSettingsMessages.saveSuccessWithSoftphone]"@#@ @source: @#@"Settings saved successfully. Please make sure you have {brand} installed in your computer."@#@
// @key: @#@"[callingSettingsMessages.permissionChanged]"@#@ @source: @#@"Your permissions have been changed recently. Please go to {link} to check your Calling options."@#@
// @key: @#@"[callingSettingsMessages.phoneNumberChanged]"@#@ @source: @#@"Your phone number information has been changed recently. Please go to {link} to check your Calling options."@#@
// @key: @#@"link"@#@ @source: @#@"Settings > Calling"@#@
// @key: @#@"[callingSettingsMessages.webphonePermissionRemoved]"@#@ @source: @#@"Your permissions have been changed and you cannot make calls with Browser. For details please contact your account administrator."@#@
// @key: @#@"[callingSettingsMessages.emergencyCallingNotAvailable]"@#@ @source: @#@"Dialing emergency or special service numbers is not supported. In an emergency, use your traditional wireline or wireless phone to call an emergency number."@#@
// @key: @#@"[callingSettingsMessages.saveSuccessWithJupiter]"@#@ @source: @#@"Settings saved successfully. Please make sure you have {brand} installed in your computer."@#@
// @key: @#@"[callingSettingsMessages.disableEmergencyInJapan]"@#@ @source: @#@"Emergency service is not available in Japan."@#@
//# sourceMappingURL=ko-KR.js.map
