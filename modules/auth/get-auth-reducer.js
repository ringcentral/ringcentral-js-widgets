'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = getAuthReducer;

var _reduxHelper = require('../../lib/redux-helper');

var _authActions = require('./auth-actions');

var _authActions2 = _interopRequireDefault(_authActions);

var _authStatus = require('./auth-status');

var _authStatus2 = _interopRequireDefault(_authStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getAuthReducer(prefix) {
  var actions = (0, _reduxHelper.prefixActions)(_authActions2.default, prefix);
  return function (state, action) {
    if (typeof state === 'undefined') {
      return {
        status: _authStatus2.default.pending,
        token: null,
        error: null
      };
    }
    if (!action) return state;
    switch (action.type) {

      case actions.init:
        return (0, _extends3.default)({}, state, {
          status: action.status,
          token: action.token
        });

      case actions.login:
        return (0, _extends3.default)({}, state, {
          status: _authStatus2.default.loggingIn,
          error: null
        });

      case actions.logout:
        return (0, _extends3.default)({}, state, {
          status: _authStatus2.default.loggingOut,
          error: null
        });

      case actions.loginSuccess:
        return {
          status: _authStatus2.default.loggedIn,
          token: action.token,
          error: null
        };

      case actions.logoutSuccess:
        return {
          status: _authStatus2.default.notLoggedIn,
          token: null,
          error: null
        };

      case actions.loginError:
        return (0, _extends3.default)({}, state, {
          status: _authStatus2.default.notLoggedIn,
          error: action.error
        });

      case actions.logoutError:
        return (0, _extends3.default)({}, state, {
          status: _authStatus2.default.loggedIn,
          error: action.error
        });

      case actions.refreshSuccess:
        return (0, _extends3.default)({}, state, {
          token: action.token
        });

      case actions.refreshError:
        return {
          status: _authStatus2.default.notLoggedIn,
          token: null,
          error: actions.error
        };

      default:
        return state;
    }
  };
}
//# sourceMappingURL=get-auth-reducer.js.map
