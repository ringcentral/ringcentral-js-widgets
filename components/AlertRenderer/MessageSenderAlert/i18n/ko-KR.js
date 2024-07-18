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
var _MessageSender = require("@ringcentral-integration/commons/modules/MessageSender");
var _messageSenderMessage;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _default = (_messageSenderMessage = {}, _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.sendSuccess, "보내기 성공"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.sendError, "메시지를 보낼 때 문제가 발생했습니다."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.numberValidateError, "전화번호 유효성 검사 오류입니다."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.textEmpty, "보낼 텍스트를 입력하세요."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.noPermission, "메시지를 보낼 수 있는 권한이 없습니다."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.senderEmpty, "전화번호에서 보낼 번호를 선택해야 합니다."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.noToNumber, "유효한 전화번호를 입력하세요."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.recipientsEmpty, "유효한 수신자 번호를 입력하세요."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.textTooLong, "텍스트가 너무 깁니다. 1,000자로 제한됩니다."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.multipartTextTooLong, "텍스트가 너무 깁니다. 5,000자로 제한됩니다."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.recipientNumberInvalids, "유효한 전화번호를 입력하세요."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.noAreaCode, "7자리 지역 전화번호를 사용하도록 {areaCodeLink}을(를) 설정하세요."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.specialNumber, "긴급/특별 서비스 번호로 문자 보내기는 지원되지 않습니다."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.connectFailed, "연결하지 못했습니다. 나중에 다시 시도하세요."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.internalError, "내부 오류로 인해 연결할 수 없습니다. 나중에 다시 시도하세요."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.notAnExtension, "존재하지 않는 내선 번호입니다."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.networkError, "네트워크 문제로 인해 연결할 수 없습니다. 나중에 다시 시도하세요."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.senderNumberInvalid, "회사 외부의 수신자에게 문자 메시지를 보내려면 유효한 전화번호가 필요합니다. 관리자에게 문의하여 계정에 직통 번호를 추가하세요."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.notSmsToExtension, "대표 전화번호가 포함된 내선 번호로 보낼 수 없습니다. 내선 번호로 보내려면 내선 번호만 입력하세요."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.internationalSMSNotSupported, "국제 전화번호로 SMS 보내기는 지원되지 않습니다."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.noInternalSMSPermission, "메시지를 보낼 권한이 없습니다. 업그레이드에 대한 자세한 내용은 {brand} 계정 관리자에게 문의하세요."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.noSMSPermission, "조직 외부의 수신자에게 메시지를 보낼 수 있는 권한이 없습니다."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.attachmentCountLimitation, "최대 10개의 첨부 파일."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.attachmentSizeLimitation, "첨부 파일은 1.5M바이트로 제한됩니다."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.noAttachmentToExtension, "내선으로 MMS 보내기는 지원되지 않습니다."), _defineProperty(_messageSenderMessage, "areaCode", "지역 코드"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.sending, "메시지를 보내는 중... 완료하는 데 몇 분 정도 걸릴 수 있습니다."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.shortNumbersNotAvailable, "단축 번호로는 SMS를 보낼 수 없습니다."), _messageSenderMessage); // @key: @#@"[messageSenderMessages.sendSuccess]"@#@ @source: @#@"Send Success."@#@
// @key: @#@"[messageSenderMessages.sendError]"@#@ @source: @#@"Something wrong happened when send message."@#@
// @key: @#@"[messageSenderMessages.numberValidateError]"@#@ @source: @#@"Phone Number Validate Error."@#@
// @key: @#@"[messageSenderMessages.textEmpty]"@#@ @source: @#@"Please enter the text to be sent."@#@
// @key: @#@"[messageSenderMessages.noPermission]"@#@ @source: @#@"You have no permission to send message."@#@
// @key: @#@"[messageSenderMessages.senderEmpty]"@#@ @source: @#@"You must select a number from your phone numbers to send"@#@
// @key: @#@"[messageSenderMessages.noToNumber]"@#@ @source: @#@"Please enter a valid phone number."@#@
// @key: @#@"[messageSenderMessages.recipientsEmpty]"@#@ @source: @#@"Please enter a valid receiver number."@#@
// @key: @#@"[messageSenderMessages.textTooLong]"@#@ @source: @#@"Text is too long, 1000 Limited"@#@
// @key: @#@"[messageSenderMessages.multipartTextTooLong]"@#@ @source: @#@"Text is too long, 5000 Limited"@#@
// @key: @#@"[messageSenderMessages.recipientNumberInvalids]"@#@ @source: @#@"Please enter a valid phone number."@#@
// @key: @#@"[messageSenderMessages.noAreaCode]"@#@ @source: @#@"Please set {areaCodeLink} to use 7-digit local phone numbers."@#@
// @key: @#@"[messageSenderMessages.specialNumber]"@#@ @source: @#@"Sending text to emergency/special service numbers is not supported."@#@
// @key: @#@"[messageSenderMessages.connectFailed]"@#@ @source: @#@"Connection failed. Please try again later."@#@
// @key: @#@"[messageSenderMessages.internalError]"@#@ @source: @#@"Cannot connect due to internal errors. Please try again later."@#@
// @key: @#@"[messageSenderMessages.notAnExtension]"@#@ @source: @#@"The extension number does not exist."@#@
// @key: @#@"[messageSenderMessages.networkError]"@#@ @source: @#@"Cannot connect due to network issues. Please try again later."@#@
// @key: @#@"[messageSenderMessages.senderNumberInvalid]"@#@ @source: @#@"A valid Phone Number is required to send text message to recipients outside of your company, Please contact your Administrator to add a direct number to your account."@#@
// @key: @#@"[messageSenderMessages.notSmsToExtension]"@#@ @source: @#@"Cannot send to an extension number with main phone number. If you want to send to an extension number, please just enter extension number."@#@
// @key: @#@"[messageSenderMessages.internationalSMSNotSupported]"@#@ @source: @#@"Sending SMS to international phone number is not supported."@#@
// @key: @#@"[messageSenderMessages.noInternalSMSPermission]"@#@ @source: @#@"You don't have permission to send messages. Please contact your {brand} account administrator for upgrade."@#@
// @key: @#@"[messageSenderMessages.noSMSPermission]"@#@ @source: @#@"You don't have permission to send messages to recipients outside of your organization."@#@
// @key: @#@"[messageSenderMessages.attachmentCountLimitation]"@#@ @source: @#@"Maximum 10 attachments."@#@
// @key: @#@"[messageSenderMessages.attachmentSizeLimitation]"@#@ @source: @#@"Attachments size is limited to 1.5M bytes."@#@
// @key: @#@"[messageSenderMessages.noAttachmentToExtension]"@#@ @source: @#@"It isn't supported to send MMS to an extension."@#@
// @key: @#@"areaCode"@#@ @source: @#@"area code"@#@
// @key: @#@"[messageSenderMessages.sending]"@#@ @source: @#@"Message being sent…It may take a couple of minutes to complete."@#@
// @key: @#@"[messageSenderMessages.shortNumbersNotAvailable]"@#@ @source: @#@"Sending SMS to short numbers is not available."@#@
exports["default"] = _default;
//# sourceMappingURL=ko-KR.js.map
