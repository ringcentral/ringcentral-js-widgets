"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _callingOptions = _interopRequireDefault(require("@ringcentral-integration/commons/modules/CallingSettings/callingOptions"));

var _title$callingOptions;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_title$callingOptions = {
  title: "撥號"
}, _defineProperty(_title$callingOptions, _callingOptions["default"].softphone, "電腦版 {brand}"), _defineProperty(_title$callingOptions, _callingOptions["default"].browser, "瀏覽器"), _defineProperty(_title$callingOptions, _callingOptions["default"].jupiter, "{brand}"), _defineProperty(_title$callingOptions, "makeCallsWith", "我的通話進行時使用"), _defineProperty(_title$callingOptions, "ringoutHint", "先對我的位置響鈴，然後接通受話方"), _defineProperty(_title$callingOptions, "myLocationLabel", "我的位置"), _defineProperty(_title$callingOptions, "press1ToStartCallLabel", "在接通通話前提示我按 1"), _defineProperty(_title$callingOptions, "".concat(_callingOptions["default"].browser, "Tooltip"), "請使用這個選項，透過您電腦的麥克風和喇叭撥出與接聽電話。"), _defineProperty(_title$callingOptions, "".concat(_callingOptions["default"].softphone, "Tooltip"), "請使用這個選項，透過您的 {brand} 撥出與接聽電話。"), _defineProperty(_title$callingOptions, "".concat(_callingOptions["default"].ringout, "Tooltip"), "使用此選項即可使用選擇或輸入的電話號碼撥打電話。"), _defineProperty(_title$callingOptions, "".concat(_callingOptions["default"].ringout, "Tooltip1"), "在您撥號通話時，這部電話會先響起鈴聲，接著您致電的對象才會鈴響。"), _defineProperty(_title$callingOptions, "".concat(_callingOptions["default"].jupiter, "Tooltip"), "請使用這個選項，透過您的 {brand} 撥出與接聽電話。"), _title$callingOptions); // @key: @#@"title"@#@ @source: @#@"Calling"@#@
// @key: @#@"[callingOptions.softphone]"@#@ @source: @#@"{brand} for Desktop"@#@
// @key: @#@"[callingOptions.browser]"@#@ @source: @#@"Browser"@#@
// @key: @#@"[callingOptions.jupiter]"@#@ @source: @#@"{brand}"@#@
// @key: @#@"makeCallsWith"@#@ @source: @#@"Make my calls with"@#@
// @key: @#@"ringoutHint"@#@ @source: @#@"Ring me at my location first, then connect the called party"@#@
// @key: @#@"myLocationLabel"@#@ @source: @#@"My Location"@#@
// @key: @#@"press1ToStartCallLabel"@#@ @source: @#@"Prompt me to dial 1 before connecting the call"@#@
// @key: @#@"[`${callingOptions.browser}Tooltip`]"@#@ @source: @#@"Use this option to make and receive calls using your computer’s microphone and speaker."@#@
// @key: @#@"[`${callingOptions.softphone}Tooltip`]"@#@ @source: @#@"Use this option to make and receive calls using your {brand}."@#@
// @key: @#@"[`${callingOptions.ringout}Tooltip`]"@#@ @source: @#@"Use this option to make calls using your selected or entered phone number."@#@
// @key: @#@"[`${callingOptions.ringout}Tooltip1`]"@#@ @source: @#@"For the call you make, this phone will ring first then the party you called."@#@
// @key: @#@"[`${callingOptions.jupiter}Tooltip`]"@#@ @source: @#@"Use this option to make and receive calls using your {brand}."@#@


exports["default"] = _default;
//# sourceMappingURL=zh-HK.js.map
