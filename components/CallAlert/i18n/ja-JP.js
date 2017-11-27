'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _callErrors$noToNumbe;

var _callErrors = require('ringcentral-integration/modules/Call/callErrors');

var _callErrors2 = _interopRequireDefault(_callErrors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (_callErrors$noToNumbe = {}, (0, _defineProperty3.default)(_callErrors$noToNumbe, _callErrors2.default.noToNumber, '\u6709\u52B9\u306A\u96FB\u8A71\u756A\u53F7\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002'), (0, _defineProperty3.default)(_callErrors$noToNumbe, _callErrors2.default.noAreaCode, '7\u6841\u306E\u56FD\u5185\u96FB\u8A71\u756A\u53F7\u3092\u4F7F\u7528\u3059\u308B\u306B\u306F\u3001{areaCodeLink}\u3092\u8A2D\u5B9A\u3057\u3066\u304F\u3060\u3055\u3044\u3002'), (0, _defineProperty3.default)(_callErrors$noToNumbe, _callErrors2.default.specialNumber, '\u7DCA\u6025\u30B5\u30FC\u30D3\u30B9\u307E\u305F\u306F\u7279\u5225\u306A\u30B5\u30FC\u30D3\u30B9\u306E\u756A\u53F7\u3078\u306E\u30C0\u30A4\u30E4\u30EB\u306F\u30B5\u30DD\u30FC\u30C8\u3055\u308C\u3066\u3044\u307E\u305B\u3093\u3002'), (0, _defineProperty3.default)(_callErrors$noToNumbe, _callErrors2.default.connectFailed, '\u63A5\u7D9A\u306B\u5931\u6557\u3057\u307E\u3057\u305F\u3002\u5F8C\u3067\u3082\u3046\u4E00\u5EA6\u3084\u308A\u76F4\u3057\u3066\u304F\u3060\u3055\u3044\u3002'), (0, _defineProperty3.default)(_callErrors$noToNumbe, _callErrors2.default.internalError, '\u5185\u90E8\u30A8\u30E9\u30FC\u306B\u3088\u308A\u3001\u63A5\u7D9A\u3067\u304D\u307E\u305B\u3093\u3002\u5F8C\u3067\u3082\u3046\u4E00\u5EA6\u3084\u308A\u76F4\u3057\u3066\u304F\u3060\u3055\u3044\u3002'), (0, _defineProperty3.default)(_callErrors$noToNumbe, _callErrors2.default.notAnExtension, '\u3053\u306E\u5185\u7DDA\u756A\u53F7\u306F\u5B58\u5728\u3057\u307E\u305B\u3093\u3002'), (0, _defineProperty3.default)(_callErrors$noToNumbe, _callErrors2.default.networkError, '\u30CD\u30C3\u30C8\u30EF\u30FC\u30AF\u306E\u554F\u984C\u306B\u3088\u308A\u3001\u63A5\u7D9A\u3067\u304D\u307E\u305B\u3093\u3002\u5F8C\u3067\u3082\u3046\u4E00\u5EA6\u3084\u308A\u76F4\u3057\u3066\u304F\u3060\u3055\u3044\u3002'), (0, _defineProperty3.default)(_callErrors$noToNumbe, _callErrors2.default.noRingoutEnable, '\u304A\u4F7F\u3044\u306E\u5185\u7DDA\u306F\u3001\u30C7\u30B9\u30AF\u30C8\u30C3\u30D7\u30A2\u30D7\u30EA\u3092\u4F7F\u7528\u3057\u305F\u901A\u8A71\u767A\u4FE1\u304C\u8A31\u53EF\u3055\u308C\u3066\u3044\u307E\u3059\u3002\n    \u4ED6\u306E\u901A\u8A71\u30AA\u30D7\u30B7\u30E7\u30F3\u306B\u5207\u308A\u66FF\u3048\u305F\u3044\u5834\u5408\u306F\u3001\n    \u30A2\u30C3\u30D7\u30B0\u30EC\u30FC\u30C9\u306B\u3064\u3044\u3066\u30A2\u30AB\u30A6\u30F3\u30C8\u7BA1\u7406\u8005\u306B\u304A\u554F\u3044\u5408\u308F\u305B\u304F\u3060\u3055\u3044\u3002'), (0, _defineProperty3.default)(_callErrors$noToNumbe, 'areaCode', '市外局番'), (0, _defineProperty3.default)(_callErrors$noToNumbe, 'telus911', '\u7DCA\u6025\u30C0\u30A4\u30E4\u30EB\u306F\u30B5\u30DD\u30FC\u30C8\u3055\u308C\u3066\u3044\u307E\u305B\u3093\u3002'), _callErrors$noToNumbe);

// @key: @#@"[callErrors.noToNumber]"@#@ @source: @#@"Please enter a valid phone number."@#@
// @key: @#@"[callErrors.noAreaCode]"@#@ @source: @#@"Please set {areaCodeLink} to use 7-digit local phone numbers."@#@
// @key: @#@"[callErrors.specialNumber]"@#@ @source: @#@"Dialing emergency or special service numbers is not supported."@#@
// @key: @#@"[callErrors.connectFailed]"@#@ @source: @#@"Connection failed. Please try again later."@#@
// @key: @#@"[callErrors.internalError]"@#@ @source: @#@"Cannot connect due to internal errors. Please try again later."@#@
// @key: @#@"[callErrors.notAnExtension]"@#@ @source: @#@"The extension number does not exist."@#@
// @key: @#@"[callErrors.networkError]"@#@ @source: @#@"Cannot connect due to network issues. Please try again later."@#@
// @key: @#@"[callErrors.noRingoutEnable]"@#@ @source: @#@"Your extension is allowed to make calls with desktop app.\n    If you wish to switch to other calling options\n    please contact your account administrator for an upgrade."@#@
// @key: @#@"areaCode"@#@ @source: @#@"area code"@#@
// @key: @#@"telus911"@#@ @source: @#@"Emergency dialing is not supported."@#@
//# sourceMappingURL=ja-JP.js.map
