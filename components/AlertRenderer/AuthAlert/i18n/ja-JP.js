"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _authMessages = _interopRequireDefault(require("@ringcentral-integration/commons/modules/Auth/authMessages"));

var _authMessages$interna;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_authMessages$interna = {}, _defineProperty(_authMessages$interna, _authMessages["default"].internalError, "内部エラーにより、ログインに失敗しました。後でもう一度やり直してください。"), _defineProperty(_authMessages$interna, _authMessages["default"].accessDenied, "アクセスが拒否されました。サポートにお問い合わせください。"), _defineProperty(_authMessages$interna, _authMessages["default"].sessionExpired, "セッションの有効期限が切れました。サインインしてください。"), _authMessages$interna); // @key: @#@"[authMessages.internalError]"@#@ @source: @#@"Login failed due to internal errors. Please try again later."@#@
// @key: @#@"[authMessages.accessDenied]"@#@ @source: @#@"Access denied. Please contact support."@#@
// @key: @#@"[authMessages.sessionExpired]"@#@ @source: @#@"Session expired. Please sign in."@#@


exports["default"] = _default;
//# sourceMappingURL=ja-JP.js.map
