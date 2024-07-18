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
var _Call = require("@ringcentral-integration/commons/modules/Call");
var _callErrors$emergency;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _default = (_callErrors$emergency = {}, _defineProperty(_callErrors$emergency, _Call.callErrors.emergencyNumber, '긴급 전화를 사용할 수 없습니다. 응급 서비스에 연락하려면 다른 전화를 사용하세요'), _defineProperty(_callErrors$emergency, _Call.callErrors.noToNumber, '유효한 전화번호를 입력하세요.'), _defineProperty(_callErrors$emergency, _Call.callErrors.noAreaCode, '7자리 지역 전화번호를 사용하도록 {areaCodeLink}을(를) 설정하세요.'), _defineProperty(_callErrors$emergency, _Call.callErrors.connectFailed, '연결하지 못했습니다. 나중에 다시 시도하세요.'), _defineProperty(_callErrors$emergency, _Call.callErrors.internalError, '내부 오류로 인해 연결할 수 없습니다. 나중에 다시 시도하세요.'), _defineProperty(_callErrors$emergency, _Call.callErrors.notAnExtension, '존재하지 않는 내선 번호입니다.'), _defineProperty(_callErrors$emergency, _Call.callErrors.networkError, '네트워크 문제로 인해 연결할 수 없습니다. 나중에 다시 시도하세요.'), _defineProperty(_callErrors$emergency, _Call.callErrors.noInternational, '국제 전화를 걸 수 있는 권한이 없습니다. {brand} 계정 관리자에게 문의하여 업그레이드하세요.'), _defineProperty(_callErrors$emergency, _Call.callErrors.noRingoutEnable, '내선에서 데스크톱 앱을 사용하여 전화를 걸 수 있습니다.\n    다른 통화 옵션으로 전환하려면\n    계정 관리자에게 문의하여 업그레이드하세요.'), _defineProperty(_callErrors$emergency, _Call.callErrors.numberParseError, '죄송합니다. 저희 측에서 문제가 발생했습니다. 나중에 다시 시도하세요.'), _defineProperty(_callErrors$emergency, "areaCode", '지역 코드'), _defineProperty(_callErrors$emergency, "telus911", '긴급 전화 걸기는 지원되지 않습니다.'), _defineProperty(_callErrors$emergency, _Call.callErrors.fromAndToNumberIsSame, 'RingOut 번호와 대상 번호가 동일할 수 없습니다. 번호를 업데이트한 후 다시 시도해 주세요.'), _callErrors$emergency); // @key: @#@"[callErrors.emergencyNumber]"@#@ @source: @#@"Emergency calling is not available. Please use another phone to contact emergency services"@#@
// @key: @#@"[callErrors.noToNumber]"@#@ @source: @#@"Please enter a valid phone number."@#@
// @key: @#@"[callErrors.noAreaCode]"@#@ @source: @#@"Please set {areaCodeLink} to use 7-digit local phone numbers."@#@
// @key: @#@"[callErrors.connectFailed]"@#@ @source: @#@"Connection failed. Please try again later."@#@
// @key: @#@"[callErrors.internalError]"@#@ @source: @#@"Cannot connect due to internal errors. Please try again later."@#@
// @key: @#@"[callErrors.notAnExtension]"@#@ @source: @#@"The extension number does not exist."@#@
// @key: @#@"[callErrors.networkError]"@#@ @source: @#@"Cannot connect due to network issues. Please try again later."@#@
// @key: @#@"[callErrors.noInternational]"@#@ @source: @#@"You don't have permissions to make international calls. Please contact your {brand} account administrator for an upgrade."@#@
// @key: @#@"[callErrors.noRingoutEnable]"@#@ @source: @#@"Your extension is allowed to make calls with desktop app.\n    If you wish to switch to other calling options\n    please contact your account administrator for an upgrade."@#@
// @key: @#@"[callErrors.numberParseError]"@#@ @source: @#@"Sorry, there was a problem on our end. Please try again later."@#@
// @key: @#@"areaCode"@#@ @source: @#@"area code"@#@
// @key: @#@"telus911"@#@ @source: @#@"Emergency dialing is not supported."@#@
// @key: @#@"[callErrors.fromAndToNumberIsSame]"@#@ @source: @#@"The RingOut number and destination number can't be the same. Please update the number and try again."@#@
exports["default"] = _default;
//# sourceMappingURL=ko-KR.js.map
