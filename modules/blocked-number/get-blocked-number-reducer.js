'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getBlockedNumberReducer;

var _reduxHelper = require('../../lib/redux-helper');

var _blockedNumberActions = require('./blocked-number-actions');

var _blockedNumberActions2 = _interopRequireDefault(_blockedNumberActions);

var _blockedNumberStatus = require('./blocked-number-status');

var _blockedNumberStatus2 = _interopRequireDefault(_blockedNumberStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getBlockedNumberReducer(prefix) {
  var actions = (0, _reduxHelper.prefixActions)(_blockedNumberActions2.default, prefix);
  return function (state, action) {
    if (!state) {
      return {
        status: _blockedNumberStatus2.default.pending,
        error: null
      };
    }
    if (!action) {
      return state;
    }
    switch (action.type) {
      case actions.ready:
        return {
          status: _blockedNumberStatus2.default.ready,
          error: null
        };
      case actions.fetch:
        return {
          status: _blockedNumberStatus2.default.fetching,
          error: null
        };
      case actions.fetchSuccess:
        return {
          status: _blockedNumberStatus2.default.ready,
          error: null
        };
      case actions.fetchError:
        return {
          status: _blockedNumberStatus2.default.ready,
          error: action.error
        };
      case actions.reset:
        return {
          status: _blockedNumberStatus2.default.pending,
          error: null
        };
      default:
        return state;
    }
  };
}
//# sourceMappingURL=get-blocked-number-reducer.js.map
