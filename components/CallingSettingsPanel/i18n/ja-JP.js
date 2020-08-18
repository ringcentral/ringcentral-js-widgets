"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _callingOptions = _interopRequireDefault(require("ringcentral-integration/modules/CallingSettings/callingOptions"));

var _title$callingOptions;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_title$callingOptions = {
  title: "通話"
}, _defineProperty(_title$callingOptions, _callingOptions["default"].softphone, "{brand}"), _defineProperty(_title$callingOptions, _callingOptions["default"].myphone, "自分の{brand}電話"), _defineProperty(_title$callingOptions, _callingOptions["default"].otherphone, "その他の電話"), _defineProperty(_title$callingOptions, _callingOptions["default"].customphone, "カスタム電話"), _defineProperty(_title$callingOptions, _callingOptions["default"].browser, "ブラウザー"), _defineProperty(_title$callingOptions, _callingOptions["default"].jupiter, "{brand}"), _defineProperty(_title$callingOptions, "makeCallsWith", "通話発信に使用する電話"), _defineProperty(_title$callingOptions, "ringoutHint", "最初に自分の場所で自身を呼び出した後、通話相手に接続する"), _defineProperty(_title$callingOptions, "myLocationLabel", "自分の場所"), _defineProperty(_title$callingOptions, "press1ToStartCallLabel", "通話接続前に「1」をダイヤルするように指示するメッセージを受け取る"), _defineProperty(_title$callingOptions, "".concat(_callingOptions["default"].browser, "Tooltip"), "通話の発着信にコンピューターのマイクロフォンとスピーカーを使用するには、このオプションを使用します。"), _defineProperty(_title$callingOptions, "".concat(_callingOptions["default"].softphone, "Tooltip"), "通話の発着信に{brand}を使用するには、このオプションを使用します。"), _defineProperty(_title$callingOptions, "".concat(_callingOptions["default"].myphone, "Tooltip"), "{brand}電話を使用して電話をかけるには、このオプションを使用します。"), _defineProperty(_title$callingOptions, "".concat(_callingOptions["default"].myphone, "Tooltip1"), "電話をかけた場合、最初に自分の{brand}電話が鳴ってから、通話相手の電話が鳴ります。"), _defineProperty(_title$callingOptions, "".concat(_callingOptions["default"].otherphone, "Tooltip"), "{brand}の内線に追加した自宅電話や携帯電話など、他の電話を使用して電話をかけるには、このオプションを使用します。"), _defineProperty(_title$callingOptions, "".concat(_callingOptions["default"].otherphone, "Tooltip1"), "電話をかけた場合、最初にこの電話が鳴ってから、通話相手の電話が鳴ります。"), _defineProperty(_title$callingOptions, "".concat(_callingOptions["default"].customphone, "Tooltip"), "以下のフィールドに有効な電話番号を入力することで任意の電話を使用して電話をかけるには、このオプションを使用します。"), _defineProperty(_title$callingOptions, "".concat(_callingOptions["default"].customphone, "Tooltip1"), "電話をかけた場合、最初にこの電話が鳴ってから、通話相手の電話が鳴ります。"), _defineProperty(_title$callingOptions, "".concat(_callingOptions["default"].jupiter, "Tooltip"), "通話の発着信に{brand}を使用するには、このオプションを使用します。"), _title$callingOptions); // @key: @#@"title"@#@ @source: @#@"Calling"@#@
// @key: @#@"[callingOptions.softphone]"@#@ @source: @#@"{brand}"@#@
// @key: @#@"[callingOptions.myphone]"@#@ @source: @#@"My {brand} Phone"@#@
// @key: @#@"[callingOptions.otherphone]"@#@ @source: @#@"Other Phone"@#@
// @key: @#@"[callingOptions.customphone]"@#@ @source: @#@"Custom Phone"@#@
// @key: @#@"[callingOptions.browser]"@#@ @source: @#@"Browser"@#@
// @key: @#@"[callingOptions.jupiter]"@#@ @source: @#@"{brand}"@#@
// @key: @#@"makeCallsWith"@#@ @source: @#@"Make my calls with"@#@
// @key: @#@"ringoutHint"@#@ @source: @#@"Ring me at my location first, then connect the called party"@#@
// @key: @#@"myLocationLabel"@#@ @source: @#@"My Location"@#@
// @key: @#@"press1ToStartCallLabel"@#@ @source: @#@"Prompt me to dial 1 before connecting the call"@#@
// @key: @#@"[`${callingOptions.browser}Tooltip`]"@#@ @source: @#@"Use this option to make and receive calls using your computer’s microphone and speaker."@#@
// @key: @#@"[`${callingOptions.softphone}Tooltip`]"@#@ @source: @#@"Use this option to make and receive calls using your {brand}."@#@
// @key: @#@"[`${callingOptions.myphone}Tooltip`]"@#@ @source: @#@"Use this option to make calls using your {brand} phone."@#@
// @key: @#@"[`${callingOptions.myphone}Tooltip1`]"@#@ @source: @#@"For the call you make, your {brand} phone will ring first then the party you called."@#@
// @key: @#@"[`${callingOptions.otherphone}Tooltip`]"@#@ @source: @#@"Use this option to make calls using your other phones such as home or cell phones that you have added in your {brand} Extension."@#@
// @key: @#@"[`${callingOptions.otherphone}Tooltip1`]"@#@ @source: @#@"For the call you make, this phone will ring first then the party you called."@#@
// @key: @#@"[`${callingOptions.customphone}Tooltip`]"@#@ @source: @#@"Use this option to make calls using any phone of your choice by entering a valid phone number in the field below."@#@
// @key: @#@"[`${callingOptions.customphone}Tooltip1`]"@#@ @source: @#@"For the call you make, this phone will ring first then the party you called."@#@
// @key: @#@"[`${callingOptions.jupiter}Tooltip`]"@#@ @source: @#@"Use this option to make and receive calls using your {brand}."@#@


exports["default"] = _default;
//# sourceMappingURL=ja-JP.js.map
