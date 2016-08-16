'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

exports.default = getSubscriptionReducer;

var _reduxHelper = require('../../lib/redux-helper');

var _subscriptionActions = require('./subscription-actions');

var _subscriptionActions2 = _interopRequireDefault(_subscriptionActions);

var _subscriptionEvents = require('./subscription-events');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = {
  cacheKey: null,
  filters: [],
  status: _subscriptionEvents.subscriptionEvents.pending
};

function getSubscriptionReducer(prefix) {
  var actions = (0, _reduxHelper.prefixActions)(_subscriptionActions2.default, prefix);
  return function (state, action) {
    if (typeof state === 'undefined') return (0, _assign2.default)({}, initialState);
    if (!action) return state;
    switch (action.type) {
      case actions.updateStatus:
        return (0, _assign2.default)({}, state, {
          status: action.status,
          subscription: actions.subscription
        });

      case actions.updateFilters:
        return (0, _assign2.default)({}, state, {
          filters: action.filters.slice()
        });

      default:
        return state;
    }
  };
}
//# sourceMappingURL=subscription-reducer.js.map
