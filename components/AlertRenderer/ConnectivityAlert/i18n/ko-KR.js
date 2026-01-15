"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.number.constructor.js");
var _ConnectivityManager = require("../../../../modules/ConnectivityManager");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /* eslint-disable */
var _default = exports["default"] = _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, _ConnectivityManager.connectivityTypes.networkLoss, '죄송합니다. 문제가 발생했습니다. 네트워크 연결을 확인하고 다시 시도하세요.'), _ConnectivityManager.connectivityTypes.offline, '서버에 연결할 수 없습니다. 나중에 다시 시도하세요.'), _ConnectivityManager.connectivityTypes.serverUnavailable, '죄송합니다. 시스템에서 문제가 발생했습니다. 나중에 다시 시도하세요.'), _ConnectivityManager.connectivityTypes.voipOnly, '죄송합니다. 시스템에서 문제가 발생했지만 문제를 해결하기 위해 최선을 다하고 있습니다. 전화를 걸 수 있지만, 현재 다른 기능은 제한됩니다.'), _ConnectivityManager.connectivityTypes.survival, '죄송합니다. 시스템에서 문제가 발생했지만 문제를 해결하기 위해 최선을 다하고 있습니다. 특정 기능에 대한 액세스가 제한될 수 있습니다. 앱을 사용할 수 있게 되면 바로 자동으로 복구됩니다.'); // @key: @#@"[connectivityTypes.networkLoss]"@#@ @source: @#@"Sorry, something went wrong, check your network connection and try again."@#@
// @key: @#@"[connectivityTypes.offline]"@#@ @source: @#@"Cannot connect to the server. Please retry later."@#@
// @key: @#@"[connectivityTypes.serverUnavailable]"@#@ @source: @#@"Sorry, something went wrong on our end. Try again later."@#@
// @key: @#@"[connectivityTypes.voipOnly]"@#@ @source: @#@"Sorry, something went wrong on our end, but we are working hard to fix it. You can still make calls, but other functions are currently limited."@#@
// @key: @#@"[connectivityTypes.survival]"@#@ @source: @#@"Sorry, something went wrong on our end, but we are working hard to fix it. You may have limited access to certain features. The app will recover automatically as soon as it’s available."@#@
//# sourceMappingURL=ko-KR.js.map
