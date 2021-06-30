"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _messageSenderMessages = _interopRequireDefault(require("@ringcentral-integration/commons/modules/MessageSender/messageSenderMessages"));

var _messageSenderMessages2 = _interopRequireDefault(require("@ringcentral-integration/commons/modules/MessageSenderV2/messageSenderMessages"));

var _messageSenderMessage;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_messageSenderMessage = {}, _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].sendSuccess, "傳送成功。"), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].sendError, "傳送訊息時發生錯誤。"), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].numberValidateError, "電話號碼驗證錯誤。"), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].textEmpty, "請輸入要傳送的簡訊文字。"), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].noPermission, "您沒有傳送訊息的權限。"), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].senderEmpty, "您必須從電話號碼中選擇一個號碼以進行傳送"), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].noToNumber, "請輸入有效的電話號碼。"), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].recipientsEmpty, "請輸入有效的接收者號碼。"), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].textTooLong, "文字過長，上限為 1000 字元"), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].multipartTextTooLong, "文字過長，上限為 5000 字元"), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].recipientNumberInvalids, "請輸入有效的電話號碼。"), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].noAreaCode, "請設定讓{areaCodeLink}使用 7 位數的本地電話號碼。"), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].specialNumber, "不支援傳送文字簡訊至緊急/特別服務號碼。"), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].connectFailed, "連線失敗。請稍後再試一次。"), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].internalError, "因為內部錯誤導致無法連線。請稍後再試一次。"), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].notAnExtension, "分機號碼不存在。"), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].networkError, "因為網路問題導致無法連線。請稍後再試一次。"), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].senderNumberInvalid, "需要用到有效的電話號碼，才能將簡訊訊息傳送至您公司外的收件者，請聯絡您的管理員，為您的帳戶加入直撥號碼。"), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].notSmsToExtension, "無法使用主要電話號碼傳送至分機號碼。若您希望傳送至分機號碼，請僅輸入分機號碼。"), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].internationalSMSNotSupported, "不支援對國際電話號碼傳送簡訊。"), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].noInternalSMSPermission, "您沒有寄送訊息的權限。請聯絡您的 {brand} 帳戶管理員進行升級。"), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].noSMSPermission, "您沒有向組織以外之收件者寄送訊息的權限。"), _defineProperty(_messageSenderMessage, _messageSenderMessages2["default"].attachmentCountLimitation, "最多 10 個附件為限。"), _defineProperty(_messageSenderMessage, _messageSenderMessages2["default"].attachmentSizeLimitation, "附件大小不可超過 1.5MB。"), _defineProperty(_messageSenderMessage, _messageSenderMessages2["default"].noAttachmentToExtension, "不支援傳送多媒體訊息至分機。"), _defineProperty(_messageSenderMessage, "areaCode", "區碼"), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].sending, "訊息傳送中…可能需要一些時間來完成。"), _messageSenderMessage); // @key: @#@"[messageSenderMessages.sendSuccess]"@#@ @source: @#@"Send Success."@#@
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
// @key: @#@"[messageSenderMessages.notSmsToExtension]"@#@ @source: @#@"Cannot send To a extension number with main phone number. If you want to sent to a extension Number, please just enter extension Number."@#@
// @key: @#@"[messageSenderMessages.internationalSMSNotSupported]"@#@ @source: @#@"Sending SMS to international phone number is not supported."@#@
// @key: @#@"[messageSenderMessages.noInternalSMSPermission]"@#@ @source: @#@"You don't have permission to send messages. Please contact your {brand} account administrator for upgrade."@#@
// @key: @#@"[messageSenderMessages.noSMSPermission]"@#@ @source: @#@"You don't have permission to send messages to recipients outside of your organization."@#@
// @key: @#@"[messageSenderMessagesV2.attachmentCountLimitation]"@#@ @source: @#@"Maximum 10 attachments."@#@
// @key: @#@"[messageSenderMessagesV2.attachmentSizeLimitation]"@#@ @source: @#@"Attachments size is limited to 1.5M bytes."@#@
// @key: @#@"[messageSenderMessagesV2.noAttachmentToExtension]"@#@ @source: @#@"It isn't supported to send MMS to an extension."@#@
// @key: @#@"areaCode"@#@ @source: @#@"area code"@#@
// @key: @#@"[messageSenderMessages.sending]"@#@ @source: @#@"Message being sent…It may take a couple of minutes to complete."@#@


exports["default"] = _default;
//# sourceMappingURL=zh-HK.js.map
