"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _callErrors$noToNumbe;

var _callErrors = require("ringcentral-integration/modules/Call/callErrors");

var _callErrors2 = _interopRequireDefault(_callErrors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (_callErrors$noToNumbe = {}, (0, _defineProperty3.default)(_callErrors$noToNumbe, _callErrors2.default.noToNumber, "请输入有效的电话号码。"), (0, _defineProperty3.default)(_callErrors$noToNumbe, _callErrors2.default.noAreaCode, "请将 {areaCodeLink} 设置为使用 7 位本地电话号码。"), (0, _defineProperty3.default)(_callErrors$noToNumbe, _callErrors2.default.specialNumber, "不支持紧急或特殊服务号码拨号。"), (0, _defineProperty3.default)(_callErrors$noToNumbe, _callErrors2.default.connectFailed, "连接失败。请稍后再试。"), (0, _defineProperty3.default)(_callErrors$noToNumbe, _callErrors2.default.internalError, "由于内部错误，无法连接：请稍后再试。"), (0, _defineProperty3.default)(_callErrors$noToNumbe, _callErrors2.default.notAnExtension, "分机号不存在。"), (0, _defineProperty3.default)(_callErrors$noToNumbe, _callErrors2.default.networkError, "由于网络问题，无法连接：请稍后再试。"), (0, _defineProperty3.default)(_callErrors$noToNumbe, _callErrors2.default.noInternational, "您没有权限拨打国际电话。请联系您的 {brand} 账户管理员进行升级。"), (0, _defineProperty3.default)(_callErrors$noToNumbe, _callErrors2.default.noRingoutEnable, "您的分机可以通过桌面应用拨打电话。\n    如果您要切换至其他呼叫选项，\n    请联系您的账户管理员进行升级。"), (0, _defineProperty3.default)(_callErrors$noToNumbe, "areaCode", "区号"), (0, _defineProperty3.default)(_callErrors$noToNumbe, "telus911", "不支持紧急拨号。"), _callErrors$noToNumbe);

// @key: @#@"[callErrors.noToNumber]"@#@ @source: @#@"Please enter a valid phone number."@#@
// @key: @#@"[callErrors.noAreaCode]"@#@ @source: @#@"Please set {areaCodeLink} to use 7-digit local phone numbers."@#@
// @key: @#@"[callErrors.specialNumber]"@#@ @source: @#@"Dialing emergency or special service numbers is not supported."@#@
// @key: @#@"[callErrors.connectFailed]"@#@ @source: @#@"Connection failed. Please try again later."@#@
// @key: @#@"[callErrors.internalError]"@#@ @source: @#@"Cannot connect due to internal errors. Please try again later."@#@
// @key: @#@"[callErrors.notAnExtension]"@#@ @source: @#@"The extension number does not exist."@#@
// @key: @#@"[callErrors.networkError]"@#@ @source: @#@"Cannot connect due to network issues. Please try again later."@#@
// @key: @#@"[callErrors.noInternational]"@#@ @source: @#@"You don't have permissions to make international calls. Please contact your {brand} account administrator for an upgrade."@#@
// @key: @#@"[callErrors.noRingoutEnable]"@#@ @source: @#@"Your extension is allowed to make calls with desktop app.\n    If you wish to switch to other calling options\n    please contact your account administrator for an upgrade."@#@
// @key: @#@"areaCode"@#@ @source: @#@"area code"@#@
// @key: @#@"telus911"@#@ @source: @#@"Emergency dialing is not supported."@#@
//# sourceMappingURL=zh-CN.js.map
