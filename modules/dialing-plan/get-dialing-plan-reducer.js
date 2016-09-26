'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getDialingPlanReducer;

var _reduxHelper = require('../../lib/redux-helper');

var _dialingPlanActions = require('./dialing-plan-actions');

var _dialingPlanActions2 = _interopRequireDefault(_dialingPlanActions);

var _dialingPlanStatus = require('./dialing-plan-status');

var _dialingPlanStatus2 = _interopRequireDefault(_dialingPlanStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getDialingPlanReducer(prefix) {
  var actions = (0, _reduxHelper.prefixActions)(_dialingPlanActions2.default, prefix);
  return function (state, action) {
    if (!state) {
      return {
        status: _dialingPlanStatus2.default.pending,
        error: null
      };
    }
    if (!action) {
      return state;
    }
    switch (action.type) {
      case actions.ready:
        return {
          status: _dialingPlanStatus2.default.ready,
          error: null
        };
      case actions.fetch:
        return {
          status: _dialingPlanStatus2.default.fetching,
          error: null
        };
      case actions.fetchSuccess:
        return {
          status: _dialingPlanStatus2.default.ready,
          error: null
        };
      case actions.fetchError:
        return {
          status: _dialingPlanStatus2.default.ready,
          error: action.error
        };
      case actions.reset:
        return {
          status: _dialingPlanStatus2.default.pending,
          error: null
        };
      default:
        return state;
    }
  };
}
//# sourceMappingURL=get-dialing-plan-reducer.js.map
