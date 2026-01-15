"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.symbol.to-primitive");
require("core-js/modules/es.date.to-primitive");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.object.to-string");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _Auth = require("@ringcentral-integration/commons/modules/Auth");
var _authMessages$interna;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /* eslint-disable */
var _default = (_authMessages$interna = {}, _defineProperty(_authMessages$interna, _Auth.authMessages.internalError, '내부 오류로 인해 로그인하지 못했습니다. 나중에 다시 시도하세요.'), _defineProperty(_authMessages$interna, _Auth.authMessages.accessDenied, '액세스가 거부되었습니다. 지원팀에 문의하세요.'), _defineProperty(_authMessages$interna, _Auth.authMessages.sessionExpired, '세션이 만료되었습니다. 로그인해 주세요.'), _defineProperty(_authMessages$interna, _Auth.authMessages.siteAccessForbidden, '죄송합니다. 다른 계정을 사용하여 로그인하세요. IT 관리자에게 지원을 요청하세요.'), _authMessages$interna); // @key: @#@"[authMessages.internalError]"@#@ @source: @#@"Login failed due to internal errors. Please try again later."@#@
// @key: @#@"[authMessages.accessDenied]"@#@ @source: @#@"Access denied. Please contact support."@#@
// @key: @#@"[authMessages.sessionExpired]"@#@ @source: @#@"Session expired. Please sign in."@#@
// @key: @#@"[authMessages.siteAccessForbidden]"@#@ @source: @#@"Sorry, use a different account to sign in. Please ask your IT admin for assistance."@#@
exports["default"] = _default;
//# sourceMappingURL=ko-KR.js.map
