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
  title: "呼叫"
}, _defineProperty(_title$callingOptions, _callingOptions["default"].softphone, "{brand} 桌面版"), _defineProperty(_title$callingOptions, _callingOptions["default"].myphone, "我的 {brand} 电话"), _defineProperty(_title$callingOptions, _callingOptions["default"].otherphone, "其他电话"), _defineProperty(_title$callingOptions, _callingOptions["default"].customphone, "自定义电话"), _defineProperty(_title$callingOptions, _callingOptions["default"].browser, "浏览器"), _defineProperty(_title$callingOptions, "makeCallsWith", "通过以下方式拨打电话"), _defineProperty(_title$callingOptions, "ringoutHint", "先在我的位置振铃，然后连接被叫方"), _defineProperty(_title$callingOptions, "myLocationLabel", "我的位置"), _defineProperty(_title$callingOptions, "press1ToStartCallLabel", "连接通话前提示我拨 1"), _defineProperty(_title$callingOptions, "".concat(_callingOptions["default"].browser, "Tooltip"), "使用此选项通过计算机的麦克风和扬声器拨打和接听电话。"), _defineProperty(_title$callingOptions, "".concat(_callingOptions["default"].softphone, "Tooltip"), "使用此选项通过 {brand} 桌面版应用拨打和接听电话。"), _defineProperty(_title$callingOptions, "".concat(_callingOptions["default"].myphone, "Tooltip"), "使用此选项通过您的 {brand} 电话拨打电话。"), _defineProperty(_title$callingOptions, "".concat(_callingOptions["default"].myphone, "Tooltip1"), "对于您拨出的通话，您的 {brand} 电话会先振铃，然后您呼叫的对方电话再振铃。"), _defineProperty(_title$callingOptions, "".concat(_callingOptions["default"].otherphone, "Tooltip"), "使用此选项通过您的其他电话拨打电话，例如，您在 {brand} 分机中添加的家庭电话或手机。"), _defineProperty(_title$callingOptions, "".concat(_callingOptions["default"].otherphone, "Tooltip1"), "对于您拨出的通话，此电话会先振铃，然后您呼叫的对方电话再振铃。"), _defineProperty(_title$callingOptions, "".concat(_callingOptions["default"].customphone, "Tooltip"), "使用此选项通过在下面的字段中输入有效的电话号码，使用您选择的任意电话拨打电话。"), _defineProperty(_title$callingOptions, "".concat(_callingOptions["default"].customphone, "Tooltip1"), "对于您拨出的通话，此电话会先振铃，然后您呼叫的对方电话再振铃。"), _title$callingOptions); // @key: @#@"title"@#@ @source: @#@"Calling"@#@
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


exports["default"] = _default;
//# sourceMappingURL=zh-CN.js.map
