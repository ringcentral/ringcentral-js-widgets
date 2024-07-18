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
var _ConnectivityManager = require("../../../../modules/ConnectivityManager");
var _connectivityTypes$ne;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _default = (_connectivityTypes$ne = {}, _defineProperty(_connectivityTypes$ne, _ConnectivityManager.connectivityTypes.networkLoss, "申し訳ございませんが、問題が発生しました。ネットワーク接続を確認し、もう一度お試しください。"), _defineProperty(_connectivityTypes$ne, _ConnectivityManager.connectivityTypes.offline, "サーバーに接続できません。後でもう一度お試しください。"), _defineProperty(_connectivityTypes$ne, _ConnectivityManager.connectivityTypes.serverUnavailable, "申し訳ございません。こちら側で問題が発生しました。後でもう一度やり直してください。"), _defineProperty(_connectivityTypes$ne, _ConnectivityManager.connectivityTypes.voipOnly, "申し訳ございません。こちら側で問題が発生しましたが、問題を修正しようとしているところです。通話を行うことはできますが、現在その他の機能は制限されています。"), _defineProperty(_connectivityTypes$ne, _ConnectivityManager.connectivityTypes.survival, "申し訳ございません。こちら側で問題が発生しましたが、問題を修正しようとしているところです。特定の機能へのアクセスが制限されている可能性があります。アプリは、使用できるようになると自動的に復元されます。"), _connectivityTypes$ne); // @key: @#@"[connectivityTypes.networkLoss]"@#@ @source: @#@"Sorry, something went wrong, check your network connection and try again."@#@
// @key: @#@"[connectivityTypes.offline]"@#@ @source: @#@"Cannot connect to the server. Please retry later."@#@
// @key: @#@"[connectivityTypes.serverUnavailable]"@#@ @source: @#@"Sorry, something went wrong on our end. Try again later."@#@
// @key: @#@"[connectivityTypes.voipOnly]"@#@ @source: @#@"Sorry, something went wrong on our end, but we are working hard to fix it. You can still make calls, but other functions are currently limited."@#@
// @key: @#@"[connectivityTypes.survival]"@#@ @source: @#@"Sorry, something went wrong on our end, but we are working hard to fix it. You may have limited access to certain features. The app will recover automatically as soon as it’s available."@#@
exports["default"] = _default;
//# sourceMappingURL=ja-JP.js.map
