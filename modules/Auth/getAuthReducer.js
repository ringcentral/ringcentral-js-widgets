'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLoginStatusReducer = getLoginStatusReducer;
exports.getTokenReducer = getTokenReducer;
exports.getFreshLoginReducer = getFreshLoginReducer;
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

function getTokenReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var _ref2 = arguments[1];
    var type = _ref2.type,
        token = _ref2.token,
        refreshTokenValid = _ref2.refreshTokenValid;

    switch (type) {
      case types.loginSuccess:
      case types.refreshSuccess:
        return {
          ownerId: token.owner_id,
          endpointId: token.endpoint_id,
          accessToken: token.access_token,
          expireTime: token.expire_time,
          expiresIn: token.expires_in
        };
      case types.loginError:
      case types.logoutSuccess:
      case types.logoutError:
        return {};

      case types.refreshError:
        if (refreshTokenValid) {
          return state;
        }
        return {};
      case types.initSuccess:
      case types.tabSync:
        if (token) {
          return {
            ownerId: token.owner_id,
            endpointId: token.endpoint_id,
            accessToken: token.access_token,
            expireTime: token.expire_time,
            expiresIn: token.expires_in
          };
        }
        return {};
      default:
        return state;
    }
  };
}

function getFreshLoginReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var _ref3 = arguments[1];
    var type = _ref3.type,
        loggedIn = _ref3.loggedIn;

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

function getAuthReducer(types) {
  return (0, _redux.combineReducers)({
    status: (0, _getModuleStatusReducer2.default)(types),
    loginStatus: getLoginStatusReducer(types),
    freshLogin: getFreshLoginReducer(types),
    token: getTokenReducer(types)
  });
}
//# sourceMappingURL=getAuthReducer.js.map
