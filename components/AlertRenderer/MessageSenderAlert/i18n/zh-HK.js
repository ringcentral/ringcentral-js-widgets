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
var _default = (_messageSenderMessage = {}, _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.sendSuccess, "傳送成功。"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.sendError, "傳送訊息時發生錯誤。"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.numberValidateError, "電話號碼驗證錯誤。"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.textEmpty, "請輸入要傳送的文字簡訊。"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.noPermission, "您沒有傳送訊息的權限。"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.senderEmpty, "您必須從電話號碼中選擇一組號碼才能傳送"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.noToNumber, "請輸入有效的電話號碼。"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.recipientsEmpty, "請輸入有效的接收者號碼。"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.textTooLong, "文字過長，上限為 1000 字"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.multipartTextTooLong, "文字過長，上限為 5000 字"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.recipientNumberInvalids, "請輸入有效的電話號碼。"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.noAreaCode, "請設定 {areaCodeLink} 以使用 7 位數當地電話號碼。"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.specialNumber, "不支援傳送文字簡訊給緊急/特別服務號碼。"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.connectFailed, "連線失敗。請稍後再試。"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.internalError, "因為內部錯誤導致無法連線。請稍後再試。"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.notAnExtension, "分機號碼不存在。"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.networkError, "因網路問題，無法連線。請稍後再試。"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.senderNumberInvalid, "需要有效的電話號碼，才能將文字訊息傳送給您公司外的收件者，請聯絡您的管理員，為您的帳戶加入直撥號碼。"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.notSmsToExtension, "無法透過主要電話號碼傳送至分機號碼。如果要傳送至分機號碼，請只輸入分機號碼。"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.internationalSMSNotSupported, "不支援傳送簡訊給國際電話號碼。"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.noInternalSMSPermission, "您沒有傳送訊息的權限。請聯絡您的 {brand} 帳戶管理員以升級。"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.noSMSPermission, "您無權向組織以外的收件者傳送訊息。"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.attachmentCountLimitation, "最多 10 個附件為限。"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.attachmentSizeLimitation, "附件大小不可超過 1.5MB。"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.noAttachmentToExtension, "不支援傳送多媒體訊息至分機。"), _defineProperty(_messageSenderMessage, "areaCode", "區碼"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.sending, "訊息傳送中…可能需要一些時間才會完成。"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.shortNumbersNotAvailable, "無法向短號碼傳送簡訊。"), _messageSenderMessage); // @key: @#@"[messageSenderMessages.sendSuccess]"@#@ @source: @#@"Send Success."@#@
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
//# sourceMappingURL=zh-HK.js.map
