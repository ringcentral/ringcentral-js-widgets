"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.object.define-property");

var _authMessages = _interopRequireDefault(require("ringcentral-integration/modules/Auth/authMessages"));

var _authMessages$interna;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_authMessages$interna = {}, _defineProperty(_authMessages$interna, _authMessages.default.internalError, "由于内部错误，登录失败：请稍后再试。"), _defineProperty(_authMessages$interna, _authMessages.default.accessDenied, "访问被拒绝。请联系支持。"), _defineProperty(_authMessages$interna, _authMessages.default.sessionExpired, "会话已过期。请登录。"), _authMessages$interna); // @key: @#@"[authMessages.internalError]"@#@ @source: @#@"Login failed due to internal errors. Please try again later."@#@
// @key: @#@"[authMessages.accessDenied]"@#@ @source: @#@"Access denied. Please contact support."@#@
// @key: @#@"[authMessages.sessionExpired]"@#@ @source: @#@"Session expired. Please sign in."@#@


exports.default = _default;
//# sourceMappingURL=zh-CN.js.map
