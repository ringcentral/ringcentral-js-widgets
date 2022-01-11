"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _ConnectivityManager = require("../../../../modules/ConnectivityManager");

var _connectivityTypes$ne;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_connectivityTypes$ne = {}, _defineProperty(_connectivityTypes$ne, _ConnectivityManager.connectivityTypes.networkLoss, "죄송합니다. 문제가 발생했습니다. 네트워크 연결을 확인하고 다시 시도하세요."), _defineProperty(_connectivityTypes$ne, _ConnectivityManager.connectivityTypes.offline, "서버에 연결할 수 없습니다. 나중에 다시 시도하세요."), _defineProperty(_connectivityTypes$ne, _ConnectivityManager.connectivityTypes.serverUnavailable, "죄송합니다. 당사 시스템에서 문제가 발생했습니다. 나중에 다시 시도해 보세요."), _defineProperty(_connectivityTypes$ne, _ConnectivityManager.connectivityTypes.voipOnly, "죄송합니다. 시스템에서 문제가 발생했지만 문제를 해결하기 위해 최선을 다하고 있습니다. 전화를 걸 수 있지만, 현재 다른 기능은 제한됩니다."), _defineProperty(_connectivityTypes$ne, _ConnectivityManager.connectivityTypes.survival, "죄송합니다. 시스템에서 문제가 발생했지만 문제를 해결하기 위해 최선을 다하고 있습니다. 특정 기능에 대한 액세스가 제한될 수 있습니다. 앱을 사용할 수 있게 되면 바로 자동으로 복구됩니다."), _connectivityTypes$ne); // @key: @#@"[connectivityTypes.networkLoss]"@#@ @source: @#@"Sorry, something went wrong, check your network connection and try again."@#@
// @key: @#@"[connectivityTypes.offline]"@#@ @source: @#@"Cannot connect to the server. Please retry later."@#@
// @key: @#@"[connectivityTypes.serverUnavailable]"@#@ @source: @#@"Sorry, something went wrong on our end. Try again later."@#@
// @key: @#@"[connectivityTypes.voipOnly]"@#@ @source: @#@"Sorry, something went wrong on our end, but we are working hard to fix it. You can still make calls, but other functions are currently limited."@#@
// @key: @#@"[connectivityTypes.survival]"@#@ @source: @#@"Sorry, something went wrong on our end, but we are working hard to fix it. You may have limited access to certain features. The app will recover automatically as soon as it’s available."@#@


exports["default"] = _default;
//# sourceMappingURL=ko-KR.js.map
