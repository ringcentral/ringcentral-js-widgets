'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCachedSubscriptionReducer = getCachedSubscriptionReducer;
exports.getSubscriptionStatusReducer = getSubscriptionStatusReducer;
exports.getMessageReducer = getMessageReducer;
exports.getFiltersReducer = getFiltersReducer;
exports.default = getSubscriptionReducer;

var _redux = require('redux');

var _getModuleStatusReducer = require('../../lib/getModuleStatusReducer');

var _getModuleStatusReducer2 = _interopRequireDefault(_getModuleStatusReducer);

var _subscriptionStatus = require('./subscriptionStatus');

var _subscriptionStatus2 = _interopRequireDefault(_subscriptionStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getCachedSubscriptionReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var _ref = arguments[1];
    var type = _ref.type,
        subscription = _ref.subscription;

    switch (type) {
      case types.renewSuccess:
      case types.subscribeSuccess:
        return subscription;

      case types.removeSuccess:
      case types.subscribeError:
      case types.renewError:
        return null;

      default:
        return state;
    }
  };
}

function getSubscriptionStatusReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _subscriptionStatus2.default.notSubscribed;
    var _ref2 = arguments[1];
    var type = _ref2.type;

    switch (type) {
      case types.subscribe:
        return _subscriptionStatus2.default.subscribing;

      case types.subscribeSuccess:
      case types.renewSuccess:
        return _subscriptionStatus2.default.subscribed;

      case types.renewError:
      case types.resetSuccess:
      case types.removeSuccess:
      case types.removeError:
      case types.subscribeError:
        return _subscriptionStatus2.default.notSubscribed;

      case types.remove:
        return _subscriptionStatus2.default.unsubscribing;

      default:
        return state;
    }
  };
}

function getMessageReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var _ref3 = arguments[1];
    var type = _ref3.type,
        _ref3$message = _ref3.message,
        message = _ref3$message === undefined ? state : _ref3$message;

    if (type === types.notification) {
      return message;
    } else if (type === types.resetSuccess) {
      return null;
    }
    return state;
  };
}

function getFiltersReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var _ref4 = arguments[1];
    var type = _ref4.type,
        filters = _ref4.filters;

    switch (type) {
      case types.setFilters:
        return filters;

      case types.addFilters:
        {
          var filterMap = {};
          return state.concat(filters).filter(function (f) {
            if (!filterMap[f]) {
              filterMap[f] = true;
              return true;
            }
            return false;
          });
        }
      case types.removeFilters:
        {
          var _filterMap = {};
          filters.forEach(function (f) {
            _filterMap[f] = true;
          });
          return state.filter(function (f) {
            return !_filterMap[f];
          });
        }
      case types.resetSuccess:
        return [];

      default:
        return state;
    }
  };
}

function getSubscriptionReducer(types) {
  return (0, _redux.combineReducers)({
    status: (0, _getModuleStatusReducer2.default)(types),
    message: getMessageReducer(types),
    filters: getFiltersReducer(types),
    subscriptionStatus: getSubscriptionStatusReducer(types)
  });
}
//# sourceMappingURL=getSubscriptionReducer.js.map
