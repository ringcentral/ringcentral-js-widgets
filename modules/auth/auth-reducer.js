'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

exports.default = getAuthReducer;

var _reduxHelper = require('../../lib/redux-helper');

var _authActions = require('./auth-actions');

var _authActions2 = _interopRequireDefault(_authActions);

var _loginStatus = require('./login-status');

var _loginStatus2 = _interopRequireDefault(_loginStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = {
  status: _loginStatus2.default.pending,
  token: null,
  error: null
};

function getAuthReducer(prefix) {
  var actions = (0, _reduxHelper.prefixActions)(_authActions2.default, prefix);
  return function (state, action) {
    if (typeof state === 'undefined') return (0, _assign2.default)({}, initialState);
    if (!action) return state;
    switch (action.type) {

      case actions.init:
        return (0, _extends3.default)({}, state, {
          status: action.status,
          token: action.token
        });

      case actions.login:
        return (0, _extends3.default)({}, state, {
          status: _loginStatus2.default.loggingIn,
          error: null
        });

      case actions.logout:
        return (0, _extends3.default)({}, state, {
          status: _loginStatus2.default.loggingOut,
          error: null
        });

      case actions.loginSuccess:
        return {
          status: _loginStatus2.default.loggedIn,
          token: action.token,
          error: null
        };

      case actions.logoutSuccess:
        return {
          status: _loginStatus2.default.notLoggedIn,
          token: null,
          error: null
        };

      case actions.loginError:
        return (0, _extends3.default)({}, state, {
          status: _loginStatus2.default.notLoggedIn,
          error: action.error
        });

      case actions.logoutError:
        return (0, _extends3.default)({}, state, {
          status: _loginStatus2.default.loggedIn,
          error: action.error
        });

      case actions.refreshSuccess:
        return (0, _extends3.default)({}, state, {
          token: action.token
        });

      case actions.refreshError:
        return {
          status: _loginStatus2.default.notLoggedIn,
          token: null,
          error: actions.error
        };

      default:
        return state;
    }
  };
}
//# sourceMappingURL=auth-reducer.js.map
