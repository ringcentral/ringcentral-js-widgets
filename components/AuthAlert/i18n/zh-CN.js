"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _authMessages$interna;

var _authMessages = require("ringcentral-integration/modules/Auth/authMessages");

var _authMessages2 = _interopRequireDefault(_authMessages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (_authMessages$interna = {}, (0, _defineProperty3.default)(_authMessages$interna, _authMessages2.default.internalError, "由于内部错误，登录失败：请稍后再试。"), (0, _defineProperty3.default)(_authMessages$interna, _authMessages2.default.accessDenied, "访问被拒绝。请联系支持。"), (0, _defineProperty3.default)(_authMessages$interna, _authMessages2.default.sessionExpired, "会话已过期。请登录。"), _authMessages$interna);

// @key: @#@"[authMessages.internalError]"@#@ @source: @#@"Login failed due to internal errors. Please try again later."@#@
// @key: @#@"[authMessages.accessDenied]"@#@ @source: @#@"Access denied. Please contact support."@#@
// @key: @#@"[authMessages.sessionExpired]"@#@ @source: @#@"Session expired. Please sign in."@#@
//# sourceMappingURL=zh-CN.js.map
