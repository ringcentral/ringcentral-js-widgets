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

exports.default = (_authMessages$interna = {}, (0, _defineProperty3.default)(_authMessages$interna, _authMessages2.default.internalError, "因為內部錯誤導致登入失敗。請稍後再試一次。"), (0, _defineProperty3.default)(_authMessages$interna, _authMessages2.default.accessDenied, "存取遭拒。請聯絡支援部門。"), (0, _defineProperty3.default)(_authMessages$interna, _authMessages2.default.sessionExpired, "執行階段已過期。請登入。"), _authMessages$interna);

// @key: @#@"[authMessages.internalError]"@#@ @source: @#@"Login failed due to internal errors. Please try again later."@#@
// @key: @#@"[authMessages.accessDenied]"@#@ @source: @#@"Access denied. Please contact support."@#@
// @key: @#@"[authMessages.sessionExpired]"@#@ @source: @#@"Session expired. Please sign in."@#@
//# sourceMappingURL=zh-TW.js.map
