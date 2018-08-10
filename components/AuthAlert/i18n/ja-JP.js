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

exports.default = (_authMessages$interna = {}, (0, _defineProperty3.default)(_authMessages$interna, _authMessages2.default.internalError, "内部エラーにより、ログインに失敗しました。後でもう一度やり直してください。"), (0, _defineProperty3.default)(_authMessages$interna, _authMessages2.default.accessDenied, "アクセスが拒否されました。サポートにお問い合わせください。"), (0, _defineProperty3.default)(_authMessages$interna, _authMessages2.default.sessionExpired, "セッションの有効期限が切れました。サインインしてください。"), _authMessages$interna);

// @key: @#@"[authMessages.internalError]"@#@ @source: @#@"Login failed due to internal errors. Please try again later."@#@
// @key: @#@"[authMessages.accessDenied]"@#@ @source: @#@"Access denied. Please contact support."@#@
// @key: @#@"[authMessages.sessionExpired]"@#@ @source: @#@"Session expired. Please sign in."@#@
//# sourceMappingURL=ja-JP.js.map
