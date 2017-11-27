'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _title$save$callingOp;

var _callingOptions = require('ringcentral-integration/modules/CallingSettings/callingOptions');

var _callingOptions2 = _interopRequireDefault(_callingOptions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (_title$save$callingOp = {
  title: '通話',
  save: '保存'
}, (0, _defineProperty3.default)(_title$save$callingOp, _callingOptions2.default.softphone, '{brand} for Desktop'), (0, _defineProperty3.default)(_title$save$callingOp, _callingOptions2.default.myphone, '自分の{brand}電話'), (0, _defineProperty3.default)(_title$save$callingOp, _callingOptions2.default.otherphone, 'その他の電話'), (0, _defineProperty3.default)(_title$save$callingOp, _callingOptions2.default.customphone, 'カスタム電話'), (0, _defineProperty3.default)(_title$save$callingOp, _callingOptions2.default.browser, 'ブラウザー'), (0, _defineProperty3.default)(_title$save$callingOp, 'makeCallsWith', '通話発信に使用する電話'), (0, _defineProperty3.default)(_title$save$callingOp, 'ringoutHint', '\u6700\u521D\u306B\u81EA\u5206\u306E\u5834\u6240\u3067\u81EA\u8EAB\u3092\u547C\u3073\u51FA\u3057\u305F\u5F8C\u3001\u901A\u8A71\u76F8\u624B\u306B\u63A5\u7D9A\u3059\u308B'), (0, _defineProperty3.default)(_title$save$callingOp, 'myLocationLabel', '自分の場所'), (0, _defineProperty3.default)(_title$save$callingOp, 'press1ToStartCallLabel', '\u901A\u8A71\u63A5\u7D9A\u524D\u306B\u30E6\u30FC\u30B6\u30FC\u306B\u300C1\u300D\u3092\u30C0\u30A4\u30E4\u30EB\u3059\u308B\u3088\u3046\u306B\u6307\u793A\u3059\u308B'), (0, _defineProperty3.default)(_title$save$callingOp, _callingOptions2.default.browser + 'Tooltip', '\u901A\u8A71\u306E\u767A\u7740\u4FE1\u306B\u30B3\u30F3\u30D4\u30E5\u30FC\u30BF\u30FC\u306E\u30DE\u30A4\u30AF\u30ED\u30D5\u30A9\u30F3\u3068\u30B9\u30D4\u30FC\u30AB\u30FC\u3092\u4F7F\u7528\u3059\u308B\u306B\u306F\u3001\u3053\u306E\u30AA\u30D7\u30B7\u30E7\u30F3\u3092\u4F7F\u7528\u3057\u307E\u3059\u3002'), (0, _defineProperty3.default)(_title$save$callingOp, _callingOptions2.default.softphone + 'Tooltip', '\u901A\u8A71\u306E\u767A\u7740\u4FE1\u306B{brand} for Desktop\u30A2\u30D7\u30EA\u3092\u4F7F\u7528\u3059\u308B\u306B\u306F\u3001\u3053\u306E\u30AA\u30D7\u30B7\u30E7\u30F3\u3092\u4F7F\u7528\u3057\u307E\u3059\u3002'), (0, _defineProperty3.default)(_title$save$callingOp, _callingOptions2.default.myphone + 'Tooltip', '{brand}\u96FB\u8A71\u3092\u4F7F\u7528\u3057\u3066\u96FB\u8A71\u3092\u304B\u3051\u308B\u306B\u306F\u3001\u3053\u306E\u30AA\u30D7\u30B7\u30E7\u30F3\u3092\u4F7F\u7528\u3057\u307E\u3059\u3002'), (0, _defineProperty3.default)(_title$save$callingOp, _callingOptions2.default.myphone + 'Tooltip1', '\u96FB\u8A71\u3092\u304B\u3051\u305F\u5834\u5408\u3001\u6700\u521D\u306B\u81EA\u5206\u306E{brand}\u96FB\u8A71\u304C\u9CF4\u3063\u3066\u304B\u3089\u3001\u901A\u8A71\u76F8\u624B\u306E\u96FB\u8A71\u304C\u9CF4\u308A\u307E\u3059\u3002'), (0, _defineProperty3.default)(_title$save$callingOp, _callingOptions2.default.otherphone + 'Tooltip', '{brand}\u306E\u5185\u7DDA\u306B\u8FFD\u52A0\u3057\u305F\u81EA\u5B85\u96FB\u8A71\u3084\u643A\u5E2F\u96FB\u8A71\u306A\u3069\u3001\u4ED6\u306E\u96FB\u8A71\u3092\u4F7F\u7528\u3057\u3066\u96FB\u8A71\u3092\u304B\u3051\u308B\u306B\u306F\u3001\u3053\u306E\u30AA\u30D7\u30B7\u30E7\u30F3\u3092\u4F7F\u7528\u3057\u307E\u3059\u3002'), (0, _defineProperty3.default)(_title$save$callingOp, _callingOptions2.default.otherphone + 'Tooltip1', '\u96FB\u8A71\u3092\u304B\u3051\u305F\u5834\u5408\u3001\u6700\u521D\u306B\u3053\u306E\u96FB\u8A71\u304C\u9CF4\u3063\u3066\u304B\u3089\u3001\u901A\u8A71\u76F8\u624B\u306E\u96FB\u8A71\u304C\u9CF4\u308A\u307E\u3059\u3002'), (0, _defineProperty3.default)(_title$save$callingOp, _callingOptions2.default.customphone + 'Tooltip', '\u4EE5\u4E0B\u306E\u30D5\u30A3\u30FC\u30EB\u30C9\u306B\u6709\u52B9\u306A\u96FB\u8A71\u756A\u53F7\u3092\u5165\u529B\u3059\u308B\u3053\u3068\u3067\u4EFB\u610F\u306E\u96FB\u8A71\u3092\u4F7F\u7528\u3057\u3066\u96FB\u8A71\u3092\u304B\u3051\u308B\u306B\u306F\u3001\u3053\u306E\u30AA\u30D7\u30B7\u30E7\u30F3\u3092\u4F7F\u7528\u3057\u307E\u3059\u3002'), (0, _defineProperty3.default)(_title$save$callingOp, _callingOptions2.default.customphone + 'Tooltip1', '\u96FB\u8A71\u3092\u304B\u3051\u305F\u5834\u5408\u3001\u6700\u521D\u306B\u3053\u306E\u96FB\u8A71\u304C\u9CF4\u3063\u3066\u304B\u3089\u3001\u901A\u8A71\u76F8\u624B\u306E\u96FB\u8A71\u304C\u9CF4\u308A\u307E\u3059\u3002'), _title$save$callingOp);

// @key: @#@"title"@#@ @source: @#@"Calling"@#@
// @key: @#@"[callingOptions.softphone]"@#@ @source: @#@"{brand} for Desktop"@#@
// @key: @#@"[callingOptions.myphone]"@#@ @source: @#@"My {brand} Phone"@#@
// @key: @#@"[callingOptions.otherphone]"@#@ @source: @#@"Other Phone"@#@
// @key: @#@"[callingOptions.customphone]"@#@ @source: @#@"Custom Phone"@#@
// @key: @#@"[callingOptions.browser]"@#@ @source: @#@"Browser"@#@
// @key: @#@"makeCallsWith"@#@ @source: @#@"Make my calls with"@#@
// @key: @#@"ringoutHint"@#@ @source: @#@"Ring me at my location first, then connect the called party"@#@
// @key: @#@"myLocationLabel"@#@ @source: @#@"My Location"@#@
// @key: @#@"press1ToStartCallLabel"@#@ @source: @#@"Prompt me to dial 1 before connecting the call"@#@
// @key: @#@"[`${callingOptions.browser}Tooltip`]"@#@ @source: @#@"Use this option to make and receive calls using your computer’s microphone and speaker."@#@
// @key: @#@"[`${callingOptions.softphone}Tooltip`]"@#@ @source: @#@"Use this option to make and receive calls using your {brand} for Desktop app."@#@
// @key: @#@"[`${callingOptions.myphone}Tooltip`]"@#@ @source: @#@"Use this option to make calls using your {brand} phone."@#@
// @key: @#@"[`${callingOptions.myphone}Tooltip1`]"@#@ @source: @#@"For the call you make, your {brand} phone will ring first then the party you called."@#@
// @key: @#@"[`${callingOptions.otherphone}Tooltip`]"@#@ @source: @#@"Use this option to make calls using your other phones such as home or cell phones that you have added in your {brand} Extension."@#@
// @key: @#@"[`${callingOptions.otherphone}Tooltip1`]"@#@ @source: @#@"For the call you make, this phone will ring first then the party you called."@#@
// @key: @#@"[`${callingOptions.customphone}Tooltip`]"@#@ @source: @#@"Use this option to make calls using any phone of your choice by entering a valid phone number in the field below."@#@
// @key: @#@"[`${callingOptions.customphone}Tooltip1`]"@#@ @source: @#@"For the call you make, this phone will ring first then the party you called."@#@
//# sourceMappingURL=ja-JP.js.map
