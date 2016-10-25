'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStatusReducer = getStatusReducer;
exports.getErrorReducer = getErrorReducer;
exports.getOwnerIdReducer = getOwnerIdReducer;
exports.getFreshLoginReducer = getFreshLoginReducer;
exports.default = getAuthReducer;

var _redux = require('redux');

var _Enum = require('../../lib/Enum');

var _authActionTypes = require('./authActionTypes');

var _authActionTypes2 = _interopRequireDefault(_authActionTypes);

var _authStatus = require('./authStatus');

var _authStatus2 = _interopRequireDefault(_authStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getStatusReducer(prefix) {
  var prefixedTypes = (0, _Enum.prefixEnum)({ enumMap: _authActionTypes2.default, prefix: prefix });
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _authStatus2.default.pending;
    var _ref = arguments[1];
    var type = _ref.type,
        loggedIn = _ref.loggedIn;

    switch (type) {
      case prefixedTypes.login:
        return _authStatus2.default.loggingIn;

      case prefixedTypes.loginSuccess:
      case prefixedTypes.refreshSuccess:
      case prefixedTypes.cancelLogout:
        return _authStatus2.default.loggedIn;

      case prefixedTypes.loginError:
      case prefixedTypes.logoutSuccess:
      case prefixedTypes.logoutError:
      case prefixedTypes.refreshError:
        return _authStatus2.default.notLoggedIn;

      case prefixedTypes.logout:
        return _authStatus2.default.loggingOut;

      case prefixedTypes.beforeLogout:
        return _authStatus2.default.beforeLogout;

      case prefixedTypes.init:
        return loggedIn ? _authStatus2.default.loggedIn : _authStatus2.default.notLoggedIn;

      case prefixedTypes.refresh:
      default:
        return state;
    }
  };
}

function getErrorReducer(prefix) {
  var prefixedTypes = (0, _Enum.prefixEnum)({ enumMap: _authActionTypes2.default, prefix: prefix });
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var _ref2 = arguments[1];
    var type = _ref2.type,
        _ref2$error = _ref2.error,
        error = _ref2$error === undefined ? null : _ref2$error;

    switch (type) {
      case prefixedTypes.loginError:
      case prefixedTypes.logoutError:
      case prefixedTypes.refreshError:
      case prefixedTypes.cancelLogout:
        return error;
      case prefixedTypes.login:
      case prefixedTypes.loginSuccess:
      case prefixedTypes.logout:
      case prefixedTypes.logoutSuccess:
      case prefixedTypes.refresh:
      case prefixedTypes.refreshSuccess:
      case prefixedTypes.beforeLogout:
      case prefixedTypes.init:
        return null;
      default:
        return state;
    }
  };
}

function getOwnerIdReducer(prefix) {
  var prefixedTypes = (0, _Enum.prefixEnum)({ enumMap: _authActionTypes2.default, prefix: prefix });
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var _ref3 = arguments[1];
    var type = _ref3.type,
        token = _ref3.token;

    switch (type) {

      case prefixedTypes.loginSuccess:
      case prefixedTypes.refreshSuccess:
        return token.owner_id;

      case _authActionTypes2.default.loginError:
      case _authActionTypes2.default.logoutSuccess:
      case _authActionTypes2.default.logoutError:
      case _authActionTypes2.default.refreshError:
        return null;

      case prefixedTypes.init:
        return token && token.owner_id || null;

      default:
        return state;
    }
  };
}

function getFreshLoginReducer(prefix) {
  var prefixedTypes = (0, _Enum.prefixEnum)({ enumMap: _authActionTypes2.default, prefix: prefix });
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var _ref4 = arguments[1];
    var type = _ref4.type,
        loggedIn = _ref4.loggedIn;

    switch (type) {

      case prefixedTypes.init:
        return loggedIn ? false : null;

      case prefixedTypes.login:
        return true;

      case prefixedTypes.loginError:
      case prefixedTypes.refreshError:
      case prefixedTypes.logoutSuccess:
      case prefixedTypes.logoutError:
        return null;

      case prefixedTypes.cancelLogout:
      case prefixedTypes.loginSuccess:
      case prefixedTypes.logout:
      case prefixedTypes.refresh:
      case prefixedTypes.refreshSuccess:
      case prefixedTypes.beforeLogout:
      default:
        return state;
    }
  };
}

function getAuthReducer(prefix) {
  return (0, _redux.combineReducers)({
    status: getStatusReducer(prefix),
    freshLogin: getFreshLoginReducer(prefix),
    error: getErrorReducer(prefix),
    ownerId: getOwnerIdReducer(prefix)
  });
}
//# sourceMappingURL=getAuthReducer.js.map
