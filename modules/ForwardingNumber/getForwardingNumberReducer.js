'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getForwardingNumberReducer;

var _ActionMap = require('../../lib/ActionMap');

var _forwardingNumberActions = require('./forwardingNumberActions');

var _forwardingNumberActions2 = _interopRequireDefault(_forwardingNumberActions);

var _forwardingNumberStatus = require('./forwardingNumberStatus');

var _forwardingNumberStatus2 = _interopRequireDefault(_forwardingNumberStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getForwardingNumberReducer(prefix) {
  var actions = (0, _ActionMap.prefixActions)({ actions: _forwardingNumberActions2.default, prefix: prefix });
  return function (state, action) {
    if (!state) {
      return {
        status: _forwardingNumberStatus2.default.pending,
        error: null
      };
    }
    if (!action) {
      return state;
    }
    switch (action.type) {
      case actions.ready:
        return {
          status: _forwardingNumberStatus2.default.ready,
          error: null
        };
      case actions.fetch:
        return {
          status: _forwardingNumberStatus2.default.fetching,
          error: null
        };
      case actions.fetchSuccess:
        return {
          status: _forwardingNumberStatus2.default.ready,
          error: null
        };
      case actions.fetchError:
        return {
          status: _forwardingNumberStatus2.default.ready,
          error: action.error
        };
      case actions.reset:
        return {
          status: _forwardingNumberStatus2.default.pending,
          error: null
        };
      default:
        return state;
    }
  };
}
//# sourceMappingURL=getForwardingNumberReducer.js.map
