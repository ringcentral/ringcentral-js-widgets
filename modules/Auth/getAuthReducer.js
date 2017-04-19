'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLoginStatusReducer = getLoginStatusReducer;
exports.getOwnerIdReducer = getOwnerIdReducer;
exports.getEndpointIdReducer = getEndpointIdReducer;
exports.getFreshLoginReducer = getFreshLoginReducer;
exports.getProxyLoadedReducer = getProxyLoadedReducer;
exports.getProxyRetryCountReducer = getProxyRetryCountReducer;
exports.default = getAuthReducer;

var _redux = require('redux');

var _loginStatus = require('./loginStatus');

var _loginStatus2 = _interopRequireDefault(_loginStatus);

var _getModuleStatusReducer = require('../../lib/getModuleStatusReducer');

var _getModuleStatusReducer2 = _interopRequireDefault(_getModuleStatusReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getLoginStatusReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var _ref = arguments[1];
    var type = _ref.type,
        loggedIn = _ref.loggedIn,
        refreshTokenValid = _ref.refreshTokenValid;

    switch (type) {
      case types.login:
        return _loginStatus2.default.loggingIn;

      case types.loginSuccess:
      case types.refreshSuccess:
      case types.cancelLogout:
        return _loginStatus2.default.loggedIn;

      case types.loginError:
      case types.logoutSuccess:
      case types.logoutError:
        return _loginStatus2.default.notLoggedIn;

      case types.refreshError:
        return refreshTokenValid ? state : _loginStatus2.default.notLoggedIn;

      case types.logout:
        return _loginStatus2.default.loggingOut;

      case types.beforeLogout:
        return _loginStatus2.default.beforeLogout;

      case types.initSuccess:
      case types.tabSync:
        return loggedIn ? _loginStatus2.default.loggedIn : _loginStatus2.default.notLoggedIn;

      default:
        return state;
    }
  };
}

function getOwnerIdReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var _ref2 = arguments[1];
    var type = _ref2.type,
        token = _ref2.token,
        refreshTokenValid = _ref2.refreshTokenValid;

    switch (type) {

      case types.loginSuccess:
      case types.refreshSuccess:
        return token.owner_id;

      case types.loginError:
      case types.logoutSuccess:
      case types.logoutError:
        return null;

      case types.refreshError:
        return refreshTokenValid ? state : null;

      case types.initSuccess:
      case types.tabSync:
        return token && token.owner_id || null;

      default:
        return state;
    }
  };
}

function getEndpointIdReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var _ref3 = arguments[1];
    var type = _ref3.type,
        token = _ref3.token,
        refreshTokenValid = _ref3.refreshTokenValid;

    switch (type) {

      case types.loginSuccess:
      case types.refreshSuccess:
        return token.endpoint_id;

      case types.loginError:
      case types.logoutSuccess:
      case types.logoutError:
        return null;

      case types.refreshError:
        return refreshTokenValid ? state : null;

      case types.initSuccess:
      case types.tabSync:
        return token && token.endpoint_id || null;

      default:
        return state;
    }
  };
}

function getFreshLoginReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var _ref4 = arguments[1];
    var type = _ref4.type,
        loggedIn = _ref4.loggedIn;

    switch (type) {

      case types.initSuccess:
      case types.tabSync:
        return loggedIn ? false : null;

      case types.login:
        return true;

      case types.loginError:
      case types.refreshError:
      case types.logoutSuccess:
      case types.logoutError:
        return null;

      default:
        return state;
    }
  };
}

function getProxyLoadedReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var _ref5 = arguments[1];
    var type = _ref5.type;

    switch (type) {
      case types.proxyLoaded:
        return true;
      case types.proxyCleared:
        return false;
      default:
        return state;
    }
  };
}

function getProxyRetryCountReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var _ref6 = arguments[1];
    var type = _ref6.type;

    switch (type) {
      case types.proxySetup:
      case types.proxyCleared:
      case types.proxyLoaded:
        return 0;
      case types.proxyRetry:
        return state + 1;
      default:
        return state;
    }
  };
}

function getAuthReducer(types) {
  return (0, _redux.combineReducers)({
    status: (0, _getModuleStatusReducer2.default)(types),
    loginStatus: getLoginStatusReducer(types),
    freshLogin: getFreshLoginReducer(types),
    ownerId: getOwnerIdReducer(types),
    endpointId: getEndpointIdReducer(types),
    proxyLoaded: getProxyLoadedReducer(types),
    proxyRetryCount: getProxyRetryCountReducer(types)
  });
}
//# sourceMappingURL=getAuthReducer.js.map
