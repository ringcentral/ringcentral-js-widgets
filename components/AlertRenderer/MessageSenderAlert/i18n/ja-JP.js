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
var _default = (_messageSenderMessage = {}, _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.sendSuccess, "送信が成功しました。"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.sendError, "メッセージの送信時に問題が発生しました。"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.numberValidateError, "電話番号の検証エラー。"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.textEmpty, "送信するテキストを入力してください。"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.noPermission, "メッセージを送信するアクセス許可がありません。"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.senderEmpty, "登録している電話番号から送信先番号を選択する必要があります。"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.noToNumber, "有効な電話番号を入力してください。"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.recipientsEmpty, "有効な受信者の番号を入力してください。"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.textTooLong, "テキストが長すぎます(最大1000文字)"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.multipartTextTooLong, "テキストが長すぎます(最大5000文字)"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.recipientNumberInvalids, "有効な電話番号を入力してください。"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.noAreaCode, "7桁の地域の電話番号を使用できるように{areaCodeLink}を設定してください。"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.specialNumber, "緊急サービスまたは特別なサービスの番号へのテキスト送信はサポートされていません。"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.connectFailed, "接続に失敗しました。後でもう一度やり直してください。"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.internalError, "内部エラーにより、接続できません。後でもう一度やり直してください。"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.notAnExtension, "この内線番号は存在しません。"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.networkError, "ネットワークの問題により、接続できません。後でもう一度やり直してください。"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.senderNumberInvalid, "社外の受信者にテキストメッセージを送信するには、有効な電話番号が必要です。管理者に連絡して、アカウントにダイレクトナンバーを追加してください。"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.notSmsToExtension, "代表電話番号の付いた内線番号には送信できません。内線番号に送信する場合は、内線番号だけを入力してください。"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.internationalSMSNotSupported, "国際電話番号へのSMS送信はサポートされていません。"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.noInternalSMSPermission, "メッセージを送信するためのアクセス許可がありません。アップグレードする場合は、{brand}のアカウント管理者に問い合わせてください。"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.noSMSPermission, "テキストメッセージを組織外の受信者に送信するアクセス許可がありません。"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.attachmentCountLimitation, "添付ファイルは最大10件です。"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.attachmentSizeLimitation, "添付ファイルのサイズの上限は1.5メガバイトです。"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.noAttachmentToExtension, "MMSの内線への送信はサポートされていません。"), _defineProperty(_messageSenderMessage, "areaCode", "市外局番"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.sending, "メッセージを送信しています…完了するまで数分かかる場合があります。"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.shortNumbersNotAvailable, "短縮番号へのSMSの送信はできません。"), _messageSenderMessage); // @key: @#@"[messageSenderMessages.sendSuccess]"@#@ @source: @#@"Send Success."@#@
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
//# sourceMappingURL=ja-JP.js.map
