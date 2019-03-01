"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.object.define-property");

var _callingOptions = _interopRequireDefault(require("ringcentral-integration/modules/CallingSettings/callingOptions"));

var _title$callingOptions;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_title$callingOptions = {
  title: "正在撥號"
}, _defineProperty(_title$callingOptions, _callingOptions.default.softphone, "桌面版 {brand}"), _defineProperty(_title$callingOptions, _callingOptions.default.myphone, "我的 {brand} 電話"), _defineProperty(_title$callingOptions, _callingOptions.default.otherphone, "其他電話"), _defineProperty(_title$callingOptions, _callingOptions.default.customphone, "自訂電話"), _defineProperty(_title$callingOptions, _callingOptions.default.browser, "瀏覽器"), _defineProperty(_title$callingOptions, "makeCallsWith", "我的通話進行時使用"), _defineProperty(_title$callingOptions, "ringoutHint", "先對我的位置響鈴，然後接通受話方"), _defineProperty(_title$callingOptions, "myLocationLabel", "我的位置"), _defineProperty(_title$callingOptions, "press1ToStartCallLabel", "在接通通話前提示我按 1"), _defineProperty(_title$callingOptions, "".concat(_callingOptions.default.browser, "Tooltip"), "請使用這個選項，透過您電腦的麥克風和喇叭撥出與接聽電話。"), _defineProperty(_title$callingOptions, "".concat(_callingOptions.default.softphone, "Tooltip"), "請使用這個選項，透過您的 {brand} 桌面版應用程式撥出與接聽電話。"), _defineProperty(_title$callingOptions, "".concat(_callingOptions.default.myphone, "Tooltip"), "請使用這個選項，透過您的 {brand} 電話來進行通話。"), _defineProperty(_title$callingOptions, "".concat(_callingOptions.default.myphone, "Tooltip1"), "對於您所撥出的電話，您的 {brand} 電話將會先對受話方響鈴。"), _defineProperty(_title$callingOptions, "".concat(_callingOptions.default.otherphone, "Tooltip"), "請使用這個選項，透過您已在 {brand} 分機中加入的家用電話或行動電話等其他電話進行通話。"), _defineProperty(_title$callingOptions, "".concat(_callingOptions.default.otherphone, "Tooltip1"), "對於您所撥出的電話，這支電話將會先對受話方響鈴。"), _defineProperty(_title$callingOptions, "".concat(_callingOptions.default.customphone, "Tooltip"), "請使用這個選項，在以下欄位輸入有效的電話號碼，使用任選的任何電話，進行通話。"), _defineProperty(_title$callingOptions, "".concat(_callingOptions.default.customphone, "Tooltip1"), "對於您所撥出的電話，這支電話將會先對受話方響鈴。"), _title$callingOptions); // @key: @#@"title"@#@ @source: @#@"Calling"@#@
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


exports.default = _default;
//# sourceMappingURL=zh-TW.js.map
