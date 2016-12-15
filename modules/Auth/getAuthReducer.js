'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStatusReducer = getStatusReducer;
exports.getLoginStatusReducer = getLoginStatusReducer;
exports.getOwnerIdReducer = getOwnerIdReducer;
exports.getFreshLoginReducer = getFreshLoginReducer;
exports.default = getAuthReducer;

var _redux = require('redux');

var _loginStatus = require('./loginStatus');

var _loginStatus2 = _interopRequireDefault(_loginStatus);

var _moduleStatus = require('../../enums/moduleStatus');

var _moduleStatus2 = _interopRequireDefault(_moduleStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getStatusReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _moduleStatus2.default.pending;
    var _ref = arguments[1];
    var type = _ref.type;

    switch (type) {
      case types.init:
        return _moduleStatus2.default.initializing;
      case types.initSuccess:
        return _moduleStatus2.default.ready;
      default:
        return state;
    }
  };
}

function getLoginStatusReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var _ref2 = arguments[1];
    var type = _ref2.type,
        loggedIn = _ref2.loggedIn,
        refreshTokenValid = _ref2.refreshTokenValid;

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
    var _ref3 = arguments[1];
    var type = _ref3.type,
        token = _ref3.token;

    switch (type) {

      case types.loginSuccess:
      case types.refreshSuccess:
        return token.owner_id;

      case types.loginError:
      case types.logoutSuccess:
      case types.logoutError:
      case types.refreshError:
        return null;

      case types.initSuccess:
      case types.tabSync:
        return token && token.owner_id || null;

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

function getAuthReducer(types) {
  return (0, _redux.combineReducers)({
    status: getStatusReducer(types),
    loginStatus: getLoginStatusReducer(types),
    freshLogin: getFreshLoginReducer(types),
    ownerId: getOwnerIdReducer(types)
  });
}
//# sourceMappingURL=getAuthReducer.js.map
