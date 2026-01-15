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
var _webphoneErrors = _interopRequireDefault(require("@ringcentral-integration/commons/modules/Webphone/webphoneErrors"));
var _webphoneMessages = _interopRequireDefault(require("@ringcentral-integration/commons/modules/Webphone/webphoneMessages"));
var _webphoneErrors$conne;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /* eslint-disable */
var _default = (_webphoneErrors$conne = {}, _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].connectFailed, '죄송합니다. 현재 전화 기능을 사용할 수 없습니다. 나중에 다시 시도하세요. '), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].connected, 'WebPhone이 등록되었습니다.'), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].browserNotSupported, '죄송합니다. 이 브라우저를 사용하여 전화를 거는 것은 지원되지 않습니다.'), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].webphoneCountOverLimit, '최대 5개의 WebPhone을 등록할 수 있습니다.'), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].checkDLError, '발신 전화를 걸 수 없습니다. 이 오류가 계속 표시되면 {brandName}에 문의하여 지원을 받으세요.'), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].noOutboundCallWithoutDL, '현재 내선에서 브라우저를 사용하여 발신 전화를 걸 수 없습니다. 계정 담당자에게 문의하여 업그레이드하세요.'), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].provisionUpdate, '죄송합니다. 시스템에서 문제가 발생했습니다. 곧 자동으로 다시 연결하려고 시도합니다.'), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].serverConnecting, '죄송합니다. 전화 서버에 연결하는 데 문제가 있습니다.'), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].toVoiceMailError, '내부 오류로 인해 통화를 음성 사서함으로 보낼 수 없습니다.'), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].muteError, '현재 통화를 음소거할 수 없습니다.'), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].holdError, '현재 통화를 대기할 수 없습니다.'), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].flipError, '통화를 전환할 수 없습니다. 나중에 다시 시도하세요.'), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].recordError, '현재 통화를 녹음할 수 없습니다. 오류 코드: {errorCode}'), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].pauseRecordError, '죄송합니다. 통화 녹음을 중지할 수 없습니다. 나중에 다시 시도하세요.'), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].recordDisabled, '죄송합니다. 계정에 통화를 녹음하는 기능이 없습니다. 계정 관리자에게 문의하세요.'), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].transferError, '통화를 전달할 수 없습니다. 나중에 다시 시도하세요.'), _defineProperty(_webphoneErrors$conne, _webphoneMessages["default"].parked, '위치 {parkedNumber}에서 통화가 대기되었습니다.'), _defineProperty(_webphoneErrors$conne, "failWithStatusCode", '죄송합니다. 오류({errorCode})가 발생했습니다. 문제가 지속되면 {brandName} 지원팀에 이 오류를 보고하세요.'), _defineProperty(_webphoneErrors$conne, "registeringWithStatusCode", '죄송합니다. 문제가 발생했습니다. 문제가 발생하여 다시 연결하고 있습니다. 문제가 지속되면 {brandName} 지원팀에 이 오류를 보고하세요. 오류 코드: {errorCode}.'), _defineProperty(_webphoneErrors$conne, "failWithoutStatusCode", '죄송합니다. 시스템에서 문제가 발생했습니다. 문제가 지속되면 {brandName} 지원팀에 이 오류를 보고하세요.'), _defineProperty(_webphoneErrors$conne, "registeringWithoutStatusCode", '죄송합니다. 문제가 발생했습니다. 문제가 발생하여 다시 연결하고 있습니다. 문제가 지속되면 {brandName} 지원팀에 이 오류를 보고하세요.'), _webphoneErrors$conne); // @key: @#@"[webphoneErrors.connectFailed]"@#@ @source: @#@"Sorry, phone features are currently unavailable. Please retry later. "@#@
// @key: @#@"[webphoneErrors.connected]"@#@ @source: @#@"Web phone registered."@#@
// @key: @#@"[webphoneErrors.browserNotSupported]"@#@ @source: @#@"Sorry, making calls using this browser is not supported."@#@
// @key: @#@"[webphoneErrors.webphoneCountOverLimit]"@#@ @source: @#@"A maximum of 5 web phones could be registered."@#@
// @key: @#@"[webphoneErrors.checkDLError]"@#@ @source: @#@"Unable to make outgoing call. Contact {brandName} for support if this error keeps showing."@#@
// @key: @#@"[webphoneErrors.noOutboundCallWithoutDL]"@#@ @source: @#@"Your extension is not allowed to make outbound calls with browser currently, please contact your account representative for an upgrade."@#@
// @key: @#@"[webphoneErrors.provisionUpdate]"@#@ @source: @#@"Sorry, something went wrong on our end. We will automatically try to reconnect shortly."@#@
// @key: @#@"[webphoneErrors.serverConnecting]"@#@ @source: @#@"Sorry, we are having an issue connecting to the phone server."@#@
// @key: @#@"[webphoneErrors.toVoiceMailError]"@#@ @source: @#@"Cannot send call to voicemail due to internal error"@#@
// @key: @#@"[webphoneErrors.muteError]"@#@ @source: @#@"Call cannot be muted at the moment."@#@
// @key: @#@"[webphoneErrors.holdError]"@#@ @source: @#@"Call cannot be hold at the moment."@#@
// @key: @#@"[webphoneErrors.flipError]"@#@ @source: @#@"Cannot flip the call. Please try again later."@#@
// @key: @#@"[webphoneErrors.recordError]"@#@ @source: @#@"You cannot record the call at the moment. Error code: {errorCode}"@#@
// @key: @#@"[webphoneErrors.pauseRecordError]"@#@ @source: @#@"Sorry, we weren't able to stop recording the call. Try again later."@#@
// @key: @#@"[webphoneErrors.recordDisabled]"@#@ @source: @#@"Sorry, your account does not have the feature to record a call. Please contact your account administrator."@#@
// @key: @#@"[webphoneErrors.transferError]"@#@ @source: @#@"Cannot transfer the call. Please try again later."@#@
// @key: @#@"[webphoneMessages.parked]"@#@ @source: @#@"Your call is parked at location: {parkedNumber}"@#@
// @key: @#@"failWithStatusCode"@#@ @source: @#@"Sorry, we've encountered an error: {errorCode}. If the problem persists, report this error to {brandName} support."@#@
// @key: @#@"registeringWithStatusCode"@#@ @source: @#@"Sorry, something went wrong. We are trying to reconnect. If the problem persists, please report this error to {brandName} support. Error code: {errorCode}."@#@
// @key: @#@"failWithoutStatusCode"@#@ @source: @#@"Sorry, something went wrong on our end. If the error persists, report this error to {brandName} support."@#@
// @key: @#@"registeringWithoutStatusCode"@#@ @source: @#@"Sorry, something went wrong. We are trying to reconnect. If the problem persists, please report this error to {brandName} support."@#@
exports["default"] = _default;
//# sourceMappingURL=ko-KR.js.map
