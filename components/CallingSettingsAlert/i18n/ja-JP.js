'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _callingSettingsMessa;

var _callingSettingsMessages = require('ringcentral-integration/modules/CallingSettings/callingSettingsMessages');

var _callingSettingsMessages2 = _interopRequireDefault(_callingSettingsMessages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (_callingSettingsMessa = {}, (0, _defineProperty3.default)(_callingSettingsMessa, _callingSettingsMessages2.default.saveSuccess, '\u8A2D\u5B9A\u304C\u6B63\u5E38\u306B\u4FDD\u5B58\u3055\u308C\u307E\u3057\u305F\u3002'), (0, _defineProperty3.default)(_callingSettingsMessa, _callingSettingsMessages2.default.saveSuccessWithSoftphone, '\u8A2D\u5B9A\u304C\u6B63\u5E38\u306B\u4FDD\u5B58\u3055\u308C\u307E\u3057\u305F\u3002\u304A\u4F7F\u3044\u306E\u30B3\u30F3\u30D4\u30E5\u30FC\u30BF\u30FC\u306B{brand} for Desktop\u304C\u30A4\u30F3\u30B9\u30C8\u30FC\u30EB\u3055\u308C\u3066\u3044\u308B\u3053\u3068\u3092\u78BA\u8A8D\u3057\u3066\u304F\u3060\u3055\u3044\u3002'), (0, _defineProperty3.default)(_callingSettingsMessa, _callingSettingsMessages2.default.firstLogin, '[\u901A\u8A71]\u30BB\u30AF\u30B7\u30E7\u30F3\u3067\u3001\u767A\u4FE1\u65B9\u6CD5\u3092\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044\u3002[\u5730\u57DF]\u30BB\u30AF\u30B7\u30E7\u30F3\u3067\u56FD\u3068\u5E02\u5916\u5C40\u756A(\u4F7F\u7528\u53EF\u80FD\u306A\u5834\u5408)\u3092\u6307\u5B9A\u3057\u3066\u4F4D\u7F6E\u60C5\u5831\u3092\u304A\u77E5\u3089\u305B\u3044\u305F\u3060\u3051\u308B\u3068\u3001\u30A2\u30D7\u30EA\u3092\u4F7F\u7528\u3057\u305F\u56FD\u5185\u901A\u8A71\u304C\u53EF\u80FD\u306B\u306A\u308A\u307E\u3059\u3002'), (0, _defineProperty3.default)(_callingSettingsMessa, _callingSettingsMessages2.default.firstLoginOther, '[\u901A\u8A71]\u30BB\u30AF\u30B7\u30E7\u30F3\u3067\u3001\u767A\u4FE1\u65B9\u6CD5\u3092\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044\u3002'), (0, _defineProperty3.default)(_callingSettingsMessa, _callingSettingsMessages2.default.permissionChanged, '\u30A2\u30AF\u30BB\u30B9\u8A31\u53EF\u304C\u6700\u8FD1\u5909\u66F4\u3055\u308C\u307E\u3057\u305F\u3002{Link}\u306E\u9806\u306B\u79FB\u52D5\u3057\u3066\u3001[\u901A\u8A71]\u306E\u30AA\u30D7\u30B7\u30E7\u30F3\u3092\u78BA\u8A8D\u3057\u3066\u304F\u3060\u3055\u3044\u3002'), (0, _defineProperty3.default)(_callingSettingsMessa, _callingSettingsMessages2.default.phoneNumberChanged, '\u96FB\u8A71\u756A\u53F7\u60C5\u5831\u304C\u6700\u8FD1\u5909\u66F4\u3055\u308C\u307E\u3057\u305F\u3002{Link}\u306E\u9806\u306B\u79FB\u52D5\u3057\u3066\u3001[\u901A\u8A71]\u306E\u30AA\u30D7\u30B7\u30E7\u30F3\u3092\u78BA\u8A8D\u3057\u3066\u304F\u3060\u3055\u3044\u3002'), (0, _defineProperty3.default)(_callingSettingsMessa, 'link', '[設定] > [通話]'), (0, _defineProperty3.default)(_callingSettingsMessa, _callingSettingsMessages2.default.webphonePermissionRemoved, '\u30A2\u30AF\u30BB\u30B9\u8A31\u53EF\u304C\u5909\u66F4\u3055\u308C\u305F\u305F\u3081\u3001\u30D6\u30E9\u30A6\u30B6\u30FC\u3092\u4F7F\u7528\u3057\u305F\u901A\u8A71\u306F\u3067\u304D\u307E\u305B\u3093\u3002\u8A73\u7D30\u306B\u3064\u3044\u3066\u306F\u3001\u30A2\u30AB\u30A6\u30F3\u30C8\u7BA1\u7406\u8005\u306B\u304A\u554F\u3044\u5408\u308F\u305B\u304F\u3060\u3055\u3044\u3002'), (0, _defineProperty3.default)(_callingSettingsMessa, _callingSettingsMessages2.default.emergencyCallingNotAvailable, '\u7DCA\u6025\u30B5\u30FC\u30D3\u30B9\u307E\u305F\u306F\u7279\u5225\u306A\u30B5\u30FC\u30D3\u30B9\u306E\u756A\u53F7\u3078\u306E\u30C0\u30A4\u30E4\u30EB\u306F\u30B5\u30DD\u30FC\u30C8\u3055\u308C\u3066\u3044\u307E\u305B\u3093\u3002\u7DCA\u6025\u6642\u306F\u3001\u5F93\u6765\u306E\u6709\u7DDA\u96FB\u8A71\u307E\u305F\u306F\u643A\u5E2F\u96FB\u8A71\u3092\u4F7F\u7528\u3057\u3066\u3001\u7DCA\u6025\u96FB\u8A71\u756A\u53F7\u306B\u96FB\u8A71\u3057\u3066\u304F\u3060\u3055\u3044\u3002'), _callingSettingsMessa);

// @key: @#@"[callingSettingsMessages.saveSuccess]"@#@ @source: @#@"Settings saved successfully."@#@
// @key: @#@"[callingSettingsMessages.saveSuccessWithSoftphone]"@#@ @source: @#@"Settings saved successfully. Please make sure you have {brand} for Desktop installed in your computer."@#@
// @key: @#@"[callingSettingsMessages.firstLogin]"@#@ @source: @#@"Please select in Calling section how you want to make your call. It would be nice if you let us know your location by specifying the country and area code (if available) in Region section, so you can do local dialing with the app."@#@
// @key: @#@"[callingSettingsMessages.firstLoginOther]"@#@ @source: @#@"Please select in Calling section how you want to make your call."@#@
// @key: @#@"[callingSettingsMessages.permissionChanged]"@#@ @source: @#@"Your permissions have been changed recently. Please go to {link} to check your Calling options."@#@
// @key: @#@"[callingSettingsMessages.phoneNumberChanged]"@#@ @source: @#@"Your phone number information has been changed recently. Please go to {link} to check your Calling options."@#@
// @key: @#@"link"@#@ @source: @#@"Settings > Calling"@#@
// @key: @#@"[callingSettingsMessages.webphonePermissionRemoved]"@#@ @source: @#@"Your permissions have been changed and you cannot make calls with Browser. For details please contact your account administrator."@#@
// @key: @#@"[callingSettingsMessages.emergencyCallingNotAvailable]"@#@ @source: @#@"Dialing emergency or special service numbers is not supported. In an emergency, use your traditional wireline or wireless phone to call an emergency number."@#@
//# sourceMappingURL=ja-JP.js.map
