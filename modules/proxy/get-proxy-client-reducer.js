'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

exports.default = getProxyClientReducer;

var _reduxHelper = require('../../lib/redux-helper');

var _proxyActions = require('./proxy-actions');

var _proxyActions2 = _interopRequireDefault(_proxyActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getProxyClientReducer(prefix, moduleReducer) {
  var actions = (0, _reduxHelper.prefixActions)(_proxyActions2.default, prefix);
  return function (state, action) {
    if (!state) {
      return {
        lastAction: null,
        actionNumber: -1,
        module: moduleReducer()
      };
    }
    if (!action) {
      return state;
    }
    switch (action.type) {
      case actions.action:
        if (action.actionNumber === state.actionNumber + 1) {
          return (0, _assign2.default)({}, state, {
            lastAction: action.action,
            actionNumber: action.actionNumber,
            module: moduleReducer(state.module, action.action)
          });
        }
        return state;
      case actions.sync:
        return {
          module: action.module,
          lastAction: action.lastAction,
          actionNumber: action.actionNumber
        };
      default:
        return state;
    }
  };
}
//# sourceMappingURL=get-proxy-client-reducer.js.map
