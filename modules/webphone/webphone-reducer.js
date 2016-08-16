'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

exports.default = getReducer;

var _reduxHelper = require('../../lib/redux-helper');

var _webphoneActions = require('./webphone-actions');

var _webphoneActions2 = _interopRequireDefault(_webphoneActions);

var _webphoneStatus = require('./webphone-status');

var _webphoneStatus2 = _interopRequireDefault(_webphoneStatus);

var _callReducer = require('./call-reducer');

var _callReducer2 = _interopRequireDefault(_callReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = {
  status: _webphoneStatus2.default.preRegister,
  // assign from UI
  toNumber: '',
  fromNumber: '',
  // sip info return from sip server
  remoteIdentity: null,
  localIdentity: null,
  operation: (0, _callReducer2.default)(),
  error: null
};

function getReducer(prefix) {
  var actions = (0, _reduxHelper.prefixActions)(_webphoneActions2.default, prefix);

  return function (state, action) {
    if (typeof state === 'undefined') return (0, _assign2.default)({}, initialState);
    if (!action) return state;
    switch (action.type) {

      case actions.registerSuccess:
        return (0, _assign2.default)({}, state, {
          status: _webphoneStatus2.default.registerSuccessed
        });
      case actions.registerError:
        return (0, _assign2.default)({}, state, {
          status: _webphoneStatus2.default.registerFailed,
          error: action.error
        });
      case actions.unregister:
        return initialState;
      case actions.call:
        return (0, _assign2.default)({}, state, {
          status: _webphoneStatus2.default.callConnecting,
          toNumber: action.payload.toNumber,
          fromNumber: action.payload.fromNumber
        });
      case actions.callIncoming:
        return (0, _assign2.default)({}, state, {
          status: _webphoneStatus2.default.callIncoming,
          remoteIdentity: action.payload.remoteIdentity,
          localIdentity: action.payload.localIdentity
        });
      // TODO: update fromNumber, toNumber
      case actions.callConnect:
        return (0, _assign2.default)({}, state, {
          status: _webphoneStatus2.default.callConnected,
          remoteIdentity: action.payload.remoteIdentity,
          localIdentity: action.payload.localIdentity
        });
      case actions.callAccept:
        return (0, _assign2.default)({}, state, {
          status: _webphoneStatus2.default.callConnected
        });
      case actions.callEnd:
        return (0, _assign2.default)({}, initialState, {
          status: _webphoneStatus2.default.registerSuccessed,
          error: action.error
        });
      case actions.callError:
        return (0, _assign2.default)({}, state, {
          status: _webphoneStatus2.default.callFailed,
          error: action.error
        });
      case actions.callOperation:
        return (0, _assign2.default)({}, state, {
          operation: (0, _callReducer2.default)(state.operation, action.operation)
        });
      case actions.sessionError:
        return (0, _assign2.default)({}, initialState, {
          error: action.error
        });

      default:
        return state;
    }
  };
}
//# sourceMappingURL=webphone-reducer.js.map
