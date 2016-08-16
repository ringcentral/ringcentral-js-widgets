'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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
  error: null
};

function getAuthReducer(prefix) {
  var actions = (0, _reduxHelper.prefixActions)(_authActions2.default, prefix);
  return function (state, action) {
    if (typeof state === 'undefined') return (0, _assign2.default)({}, initialState);
    if (!action) return state;
    switch (action.type) {

      case actions.init:
        return (0, _assign2.default)({}, state, { status: action.status });

      case actions.login:
        return {
          status: _loginStatus2.default.loggingIn,
          error: null
        };

      case actions.logout:
        return {
          status: _loginStatus2.default.loggingOut,
          error: null
        };

      case actions.loginSuccess:
        return {
          status: _loginStatus2.default.loggedIn,
          error: null
        };

      case actions.logoutSuccess:
        return {
          status: _loginStatus2.default.notLoggedIn,
          error: null
        };

      case actions.loginError:
        return {
          status: _loginStatus2.default.notLoggedIn,
          error: action.error
        };

      case actions.logoutError:
        return {
          status: _loginStatus2.default.loggedIn,
          error: action.error
        };

      default:
        return state;
    }
  };
}
//# sourceMappingURL=auth-reducer.js.map
