'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = getSubscriptionReducer;

var _ActionMap = require('../../lib/ActionMap');

var _subscriptionActions = require('./subscriptionActions');

var _subscriptionActions2 = _interopRequireDefault(_subscriptionActions);

var _subscriptionStatus = require('./subscriptionStatus');

var _subscriptionStatus2 = _interopRequireDefault(_subscriptionStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getSubscriptionReducer(prefix) {
  var actions = (0, _ActionMap.prefixActions)({ actions: _subscriptionActions2.default, prefix: prefix });
  return function (state, action) {
    if (typeof state === 'undefined') {
      return {
        filters: [],
        status: _subscriptionStatus2.default.pending,
        error: null,
        lastMessage: null
      };
    }
    if (!action) return state;

    switch (action.type) {

      case actions.setFilters:
        return (0, _extends3.default)({}, state, {
          filters: [].concat((0, _toConsumableArray3.default)(action.filters))
        });

      case actions.notification:
        return (0, _extends3.default)({}, state, {
          lastMessage: action.message
        });

      case actions.ready:
        return (0, _extends3.default)({}, state, {
          status: _subscriptionStatus2.default.notSubscribed
        });

      case actions.subscribeSuccess:
        return (0, _extends3.default)({}, state, {
          status: _subscriptionStatus2.default.subscribed,
          error: null
        });

      case actions.subscribeError:
        return (0, _extends3.default)({}, state, {
          status: _subscriptionStatus2.default.notSubscribed,
          error: action.error
        });

      case actions.renewSuccess:
        return (0, _extends3.default)({}, state, {
          status: _subscriptionStatus2.default.subscribed,
          error: null
        });

      case actions.renewError:
        return (0, _extends3.default)({}, state, {
          status: _subscriptionStatus2.default.notSubscribed,
          error: action.error
        });

      case actions.removeSuccess:
        return (0, _extends3.default)({}, state, {
          status: _subscriptionStatus2.default.notSubscribed,
          error: null
        });

      case actions.removeError:
        return (0, _extends3.default)({}, state, {
          status: _subscriptionStatus2.default.subscribed,
          error: action.error
        });

      case actions.reset:
        return (0, _extends3.default)({}, state, {
          lastMessage: null,
          error: null,
          status: _subscriptionStatus2.default.pending
        });

      default:
        return state;
    }
  };
}
//# sourceMappingURL=getSubscriptionReducer.js.map
