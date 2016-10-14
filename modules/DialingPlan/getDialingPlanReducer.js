'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getDialingPlanReducer;

var _ActionMap = require('../../lib/ActionMap');

var _dialingPlanActions = require('./dialingPlanActions');

var _dialingPlanActions2 = _interopRequireDefault(_dialingPlanActions);

var _dialingPlanStatus = require('./dialingPlanStatus');

var _dialingPlanStatus2 = _interopRequireDefault(_dialingPlanStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getDialingPlanReducer(prefix) {
  var actions = (0, _ActionMap.prefixActions)({ actions: _dialingPlanActions2.default, prefix: prefix });
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
//# sourceMappingURL=getDialingPlanReducer.js.map
