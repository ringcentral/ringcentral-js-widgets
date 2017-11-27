'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _messageSenderMessage;

var _messageSenderMessages = require('ringcentral-integration/modules/MessageSender/messageSenderMessages');

var _messageSenderMessages2 = _interopRequireDefault(_messageSenderMessages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (_messageSenderMessage = {}, (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.sendSuccess, '\u9001\u4FE1\u304C\u6210\u529F\u3057\u307E\u3057\u305F\u3002'), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.sendError, '\u30E1\u30C3\u30BB\u30FC\u30B8\u306E\u9001\u4FE1\u6642\u306B\u554F\u984C\u304C\u767A\u751F\u3057\u307E\u3057\u305F\u3002'), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.numberValidateError, '\u96FB\u8A71\u756A\u53F7\u306E\u691C\u8A3C\u30A8\u30E9\u30FC\u3002'), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.textEmpty, '\u9001\u4FE1\u3059\u308B\u30C6\u30AD\u30B9\u30C8\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002'), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.noPermission, '\u30E1\u30C3\u30BB\u30FC\u30B8\u3092\u9001\u4FE1\u3059\u308B\u305F\u3081\u306E\u30A2\u30AF\u30BB\u30B9\u8A31\u53EF\u304C\u3042\u308A\u307E\u305B\u3093\u3002'), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.senderEmpty, '\u304A\u4F7F\u3044\u306E\u96FB\u8A71\u756A\u53F7\u304B\u3089\u9001\u4FE1\u7528\u306E\u96FB\u8A71\u756A\u53F7\u3092\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044\u3002'), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.noToNumber, '\u96FB\u8A71\u756A\u53F7\u304C\u7121\u52B9\u3067\u3059\u3002'), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.recipientsEmpty, '\u6709\u52B9\u306A\u53D7\u4FE1\u8005\u756A\u53F7\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002'), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.textTooLong, '\u30C6\u30AD\u30B9\u30C8\u304C\u9577\u3059\u304E\u307E\u3059\u3002\u4E0A\u9650\u306F1,000\u6587\u5B57\u3067\u3059'), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.recipientNumberInvalids, '受信者番号が無効です'), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.noAreaCode, '7\u6841\u306E\u56FD\u5185\u96FB\u8A71\u756A\u53F7\u3092\u4F7F\u7528\u3059\u308B\u306B\u306F\u3001{areaCodeLink}\u3092\u8A2D\u5B9A\u3057\u3066\u304F\u3060\u3055\u3044\u3002'), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.specialNumber, '\u7DCA\u6025\u30B5\u30FC\u30D3\u30B9\u307E\u305F\u306F\u7279\u5225\u306A\u30B5\u30FC\u30D3\u30B9\u306E\u756A\u53F7\u3078\u306E\u30C0\u30A4\u30E4\u30EB\u306F\u30B5\u30DD\u30FC\u30C8\u3055\u308C\u3066\u3044\u307E\u305B\u3093\u3002'), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.connectFailed, '\u63A5\u7D9A\u306B\u5931\u6557\u3057\u307E\u3057\u305F\u3002\u5F8C\u3067\u3082\u3046\u4E00\u5EA6\u3084\u308A\u76F4\u3057\u3066\u304F\u3060\u3055\u3044\u3002'), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.internalError, '\u5185\u90E8\u30A8\u30E9\u30FC\u306B\u3088\u308A\u3001\u63A5\u7D9A\u3067\u304D\u307E\u305B\u3093\u3002\u5F8C\u3067\u3082\u3046\u4E00\u5EA6\u3084\u308A\u76F4\u3057\u3066\u304F\u3060\u3055\u3044\u3002'), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.notAnExtension, '\u3053\u306E\u5185\u7DDA\u756A\u53F7\u306F\u5B58\u5728\u3057\u307E\u305B\u3093\u3002'), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.networkError, '\u30CD\u30C3\u30C8\u30EF\u30FC\u30AF\u306E\u554F\u984C\u306B\u3088\u308A\u3001\u63A5\u7D9A\u3067\u304D\u307E\u305B\u3093\u3002\u5F8C\u3067\u3082\u3046\u4E00\u5EA6\u3084\u308A\u76F4\u3057\u3066\u304F\u3060\u3055\u3044\u3002'), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.senderNumberInvalid, '\u793E\u5916\u306E\u53D7\u4FE1\u8005\u306B\u30C6\u30AD\u30B9\u30C8\u30E1\u30C3\u30BB\u30FC\u30B8\u3092\u9001\u4FE1\u3059\u308B\u306B\u306F\u3001\u6709\u52B9\u306A\u96FB\u8A71\u756A\u53F7\u304C\u5FC5\u8981\u3067\u3059\u3002\u7BA1\u7406\u8005\u306B\u9023\u7D61\u3057\u3066\u3001\u30C0\u30A4\u30EC\u30AF\u30C8\u30CA\u30F3\u30D0\u30FC\u3092\u30A2\u30AB\u30A6\u30F3\u30C8\u306B\u8FFD\u52A0\u3057\u3066\u304F\u3060\u3055\u3044\u3002'), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.notSmsToExtension, '\u4EE3\u8868\u96FB\u8A71\u756A\u53F7\u304C\u4ED8\u3044\u305F\u5185\u7DDA\u756A\u53F7\u306B\u9001\u4FE1\u3059\u308B\u3053\u3068\u306F\u3067\u304D\u307E\u305B\u3093\u3002\u5185\u7DDA\u756A\u53F7\u306B\u9001\u4FE1\u3059\u308B\u5834\u5408\u306F\u3001\u5185\u7DDA\u756A\u53F7\u3060\u3051\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002'), (0, _defineProperty3.default)(_messageSenderMessage, _messageSenderMessages2.default.internationalSMSNotSupported, '\u56FD\u969B\u96FB\u8A71\u756A\u53F7\u3078\u306ESMS\u9001\u4FE1\u306F\u30B5\u30DD\u30FC\u30C8\u3055\u308C\u3066\u3044\u307E\u305B\u3093\u3002'), (0, _defineProperty3.default)(_messageSenderMessage, 'areaCode', '市外局番'), _messageSenderMessage);

// @key: @#@"[messageSenderMessages.sendSuccess]"@#@ @source: @#@"Send Success."@#@
// @key: @#@"[messageSenderMessages.sendError]"@#@ @source: @#@"Something wrong happened when send message."@#@
// @key: @#@"[messageSenderMessages.numberValidateError]"@#@ @source: @#@"Phone Number Validate Error."@#@
// @key: @#@"[messageSenderMessages.textEmpty]"@#@ @source: @#@"Please enter the text to be sent."@#@
// @key: @#@"[messageSenderMessages.noPermission]"@#@ @source: @#@"You have no permission to send message."@#@
// @key: @#@"[messageSenderMessages.senderEmpty]"@#@ @source: @#@"You must select a number from your phone numbers to send"@#@
// @key: @#@"[messageSenderMessages.noToNumber]"@#@ @source: @#@"Invalid phone number."@#@
// @key: @#@"[messageSenderMessages.recipientsEmpty]"@#@ @source: @#@"Please enter a valid receiver number."@#@
// @key: @#@"[messageSenderMessages.textTooLong]"@#@ @source: @#@"Text is too long, 1000 Limited"@#@
// @key: @#@"[messageSenderMessages.recipientNumberInvalids]"@#@ @source: @#@"Recipient number is invalids"@#@
// @key: @#@"[messageSenderMessages.noAreaCode]"@#@ @source: @#@"Please set {areaCodeLink} to use 7-digit local phone numbers."@#@
// @key: @#@"[messageSenderMessages.specialNumber]"@#@ @source: @#@"Dialing emergency or special service numbers is not supported."@#@
// @key: @#@"[messageSenderMessages.connectFailed]"@#@ @source: @#@"Connection failed. Please try again later."@#@
// @key: @#@"[messageSenderMessages.internalError]"@#@ @source: @#@"Cannot connect due to internal errors. Please try again later."@#@
// @key: @#@"[messageSenderMessages.notAnExtension]"@#@ @source: @#@"The extension number does not exist."@#@
// @key: @#@"[messageSenderMessages.networkError]"@#@ @source: @#@"Cannot connect due to network issues. Please try again later."@#@
// @key: @#@"[messageSenderMessages.senderNumberInvalid]"@#@ @source: @#@"A valid Phone Number is required to send text message to recipients outside of your company. Please contact your Administrator to add a direct number to your account."@#@
// @key: @#@"[messageSenderMessages.notSmsToExtension]"@#@ @source: @#@"Cannot send To a extension number with main phone number. If you want to sent to a extension Number, please just enter extension Number."@#@
// @key: @#@"[messageSenderMessages.internationalSMSNotSupported]"@#@ @source: @#@"Sending SMS to international phone number is not supported."@#@
// @key: @#@"areaCode"@#@ @source: @#@"area code"@#@
//# sourceMappingURL=ja-JP.js.map
