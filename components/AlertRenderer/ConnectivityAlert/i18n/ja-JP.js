"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _ConnectivityManager = require("../../../../modules/ConnectivityManager");

var _connectivityTypes$ne;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_connectivityTypes$ne = {}, _defineProperty(_connectivityTypes$ne, _ConnectivityManager.connectivityTypes.networkLoss, '申し訳ございません。問題が発生した場合は、ネットワーク接続を確認し、もう一度試してください。'), _defineProperty(_connectivityTypes$ne, _ConnectivityManager.connectivityTypes.offline, 'サーバーに接続できません。後でやり直してください。'), _defineProperty(_connectivityTypes$ne, _ConnectivityManager.connectivityTypes.serverUnavailable, '申し訳ございません。こちら側で問題が発生しました。後でもう一度やり直してください。'), _defineProperty(_connectivityTypes$ne, _ConnectivityManager.connectivityTypes.voipOnly, '申し訳ございません。こちら側で問題が発生しましたが、問題を修正しようとしているところです。通話を行うことはできますが、現在その他の機能は制限されています。'), _defineProperty(_connectivityTypes$ne, _ConnectivityManager.connectivityTypes.survival, '申し訳ございません。こちら側で問題が発生しましたが、問題を修正しようとしているところです。特定の機能へのアクセスが制限されている可能性があります。アプリは、使用できるようになると自動的に復元されます。'), _connectivityTypes$ne); // @key: @#@"[connectivityTypes.networkLoss]"@#@ @source: @#@"Sorry, something went wrong, check your network connection and try again."@#@
// @key: @#@"[connectivityTypes.offline]"@#@ @source: @#@"Cannot connect to the server. Please retry later."@#@
// @key: @#@"[connectivityTypes.serverUnavailable]"@#@ @source: @#@"Sorry, something went wrong on our end. Try again later."@#@
// @key: @#@"[connectivityTypes.voipOnly]"@#@ @source: @#@"Sorry, something went wrong on our end, but we are working hard to fix it. You can still make calls, but other functions are currently limited."@#@
// @key: @#@"[connectivityTypes.survival]"@#@ @source: @#@"Sorry, something went wrong on our end, but we are working hard to fix it. You may have limited access to certain features. The app will recover automatically as soon as it’s available."@#@


exports["default"] = _default;
//# sourceMappingURL=ja-JP.js.map
