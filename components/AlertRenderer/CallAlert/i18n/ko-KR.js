"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _callErrors = _interopRequireDefault(require("@ringcentral-integration/commons/modules/Call/callErrors"));

var _callErrors$emergency;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_callErrors$emergency = {}, _defineProperty(_callErrors$emergency, _callErrors["default"].emergencyNumber, "긴급 전화를 사용할 수 없습니다. 응급 서비스에 연락하려면 다른 전화를 사용하세요"), _defineProperty(_callErrors$emergency, _callErrors["default"].noToNumber, "유효한 전화번호를 입력하세요."), _defineProperty(_callErrors$emergency, _callErrors["default"].noAreaCode, "7자리 지역 전화번호를 사용하도록 {areaCodeLink}을(를) 설정하세요."), _defineProperty(_callErrors$emergency, _callErrors["default"].connectFailed, "연결하지 못했습니다. 나중에 다시 시도하세요."), _defineProperty(_callErrors$emergency, _callErrors["default"].internalError, "내부 오류로 인해 연결할 수 없습니다. 나중에 다시 시도하세요."), _defineProperty(_callErrors$emergency, _callErrors["default"].notAnExtension, "존재하지 않는 내선 번호입니다."), _defineProperty(_callErrors$emergency, _callErrors["default"].networkError, "네트워크 문제로 인해 연결할 수 없습니다. 나중에 다시 시도하세요."), _defineProperty(_callErrors$emergency, _callErrors["default"].noInternational, "국제 전화를 걸 수 있는 권한이 없습니다. {brand} 계정 관리자에게 문의하여 업그레이드하세요."), _defineProperty(_callErrors$emergency, _callErrors["default"].noRingoutEnable, "내선에서 데스크톱 앱을 사용하여 전화를 걸 수 있습니다.\n    다른 통화 옵션으로 전환하려면\n    계정 관리자에게 문의하여 업그레이드하세요."), _defineProperty(_callErrors$emergency, "areaCode", "지역 코드"), _defineProperty(_callErrors$emergency, "telus911", "긴급 전화 걸기는 지원되지 않습니다."), _callErrors$emergency); // @key: @#@"[callErrors.emergencyNumber]"@#@ @source: @#@"Emergency calling is not available. Please use another phone to contact emergency services"@#@
// @key: @#@"[callErrors.noToNumber]"@#@ @source: @#@"Please enter a valid phone number."@#@
// @key: @#@"[callErrors.noAreaCode]"@#@ @source: @#@"Please set {areaCodeLink} to use 7-digit local phone numbers."@#@
// @key: @#@"[callErrors.connectFailed]"@#@ @source: @#@"Connection failed. Please try again later."@#@
// @key: @#@"[callErrors.internalError]"@#@ @source: @#@"Cannot connect due to internal errors. Please try again later."@#@
// @key: @#@"[callErrors.notAnExtension]"@#@ @source: @#@"The extension number does not exist."@#@
// @key: @#@"[callErrors.networkError]"@#@ @source: @#@"Cannot connect due to network issues. Please try again later."@#@
// @key: @#@"[callErrors.noInternational]"@#@ @source: @#@"You don't have permissions to make international calls. Please contact your {brand} account administrator for an upgrade."@#@
// @key: @#@"[callErrors.noRingoutEnable]"@#@ @source: @#@"Your extension is allowed to make calls with desktop app.\n    If you wish to switch to other calling options\n    please contact your account administrator for an upgrade."@#@
// @key: @#@"areaCode"@#@ @source: @#@"area code"@#@
// @key: @#@"telus911"@#@ @source: @#@"Emergency dialing is not supported."@#@


exports["default"] = _default;
//# sourceMappingURL=ko-KR.js.map
