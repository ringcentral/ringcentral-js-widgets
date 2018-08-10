"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _messageSenderMessage;

var _messageSenderMessages = require("ringcentral-integration/modules/MessageSender/messageSenderMessages");

var _messageSenderMessages2 = _interopRequireDefault(_messageSenderMessages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (_messageSenderMessage = {}, (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.sendSuccess, "送信が成功しました。"), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.sendError, "メッセージの送信時に問題が発生しました。"), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.numberValidateError, "電話番号の検証エラー。"), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.textEmpty, "送信するテキストを入力してください。"), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.noPermission, "メッセージを送信するためのアクセス許可がありません。"), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.senderEmpty, "お使いの電話番号から送信用の電話番号を選択してください。"), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.noToNumber, "有効な電話番号を入力してください。"), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.recipientsEmpty, "有効な受信者番号を入力してください。"), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.textTooLong, "テキストが長すぎます。上限は1,000文字です"), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.multipartTextTooLong, "テキストが長すぎます。上限は5,000文字です"), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.recipientNumberInvalids, "有効な電話番号を入力してください。"), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.noAreaCode, "7桁の国内電話番号を使用するには、{areaCodeLink}を設定してください。"), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.specialNumber, "緊急サービスまたは特別なサービスの番号へのテキストの送信はサポートされていません。"), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.connectFailed, "接続に失敗しました。後でもう一度やり直してください。"), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.internalError, "内部エラーにより、接続できません。後でもう一度やり直してください。"), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.notAnExtension, "この内線番号は存在しません。"), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.networkError, "ネットワークの問題により、接続できません。後でもう一度やり直してください。"), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.senderNumberInvalid, "社外の受信者にテキストメッセージを送信するには、有効な電話番号が必要です。管理者に連絡して、ダイレクトナンバーをアカウントに追加してください。"), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.notSmsToExtension, "代表電話番号が付いた内線番号に送信することはできません。内線番号に送信する場合は、内線番号だけを入力してください。"), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.internationalSMSNotSupported, "国際電話番号へのSMS送信はサポートされていません。"), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.noInternalSMSPermission, "メッセージを送信するためのアクセス許可がありません。アップグレードについて{brand}アカウント管理者にお問い合わせください。"), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.noSMSPermission, "組織外部の受信者にメッセージを送信するためのアクセス許可がありません。"), (0, _defineProperty3.default)(_messageSenderMessage, "areaCode", "市外局番"), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.sending, "メッセージを送信しています…完了するまで数分かかる場合があります。"), _messageSenderMessage);

// @key: @#@"[messageSenderMessages.sendSuccess]"@#@ @source: @#@"Send Success."@#@
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
// @key: @#@"areaCode"@#@ @source: @#@"area code"@#@
// @key: @#@"[messageSenderMessages.sending]"@#@ @source: @#@"Message being sent…It may take a couple of minutes to complete."@#@
//# sourceMappingURL=ja-JP.js.map
