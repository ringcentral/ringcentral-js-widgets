'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStatusReducer = getStatusReducer;
exports.getAuthStatusReducer = getAuthStatusReducer;
exports.getOwnerIdReducer = getOwnerIdReducer;
exports.getFreshLoginReducer = getFreshLoginReducer;
exports.default = getAuthReducer;

var _redux = require('redux');

var _authStatus = require('./authStatus');

var _authStatus2 = _interopRequireDefault(_authStatus);

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

function getAuthStatusReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var _ref2 = arguments[1];
    var type = _ref2.type,
        loggedIn = _ref2.loggedIn,
        refreshTokenValid = _ref2.refreshTokenValid;

    switch (type) {
      case types.login:
        return _authStatus2.default.loggingIn;

      case types.loginSuccess:
      case types.refreshSuccess:
      case types.cancelLogout:
        return _authStatus2.default.loggedIn;

      case types.loginError:
      case types.logoutSuccess:
      case types.logoutError:
        return _authStatus2.default.notLoggedIn;

      case types.refreshError:
        return refreshTokenValid ? state : _authStatus2.default.notLoggedIn;

      case types.logout:
        return _authStatus2.default.loggingOut;

      case types.beforeLogout:
        return _authStatus2.default.beforeLogout;

      case types.initSuccess:
        return loggedIn ? _authStatus2.default.loggedIn : _authStatus2.default.notLoggedIn;

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
    authStatus: getAuthStatusReducer(types),
    freshLogin: getFreshLoginReducer(types),
    ownerId: getOwnerIdReducer(types)
  });
}
//# sourceMappingURL=getAuthReducer.js.map
