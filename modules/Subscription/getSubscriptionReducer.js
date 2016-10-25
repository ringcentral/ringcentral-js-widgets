'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.getMessageReducer = getMessageReducer;
exports.getStatusReducer = getStatusReducer;
exports.getFiltersReducer = getFiltersReducer;
exports.getErrorReducer = getErrorReducer;
exports.default = getSubscriptionReducer;

var _redux = require('redux');

var _Enum = require('../../lib/Enum');

var _subscriptionStatus = require('./subscriptionStatus');

var _subscriptionStatus2 = _interopRequireDefault(_subscriptionStatus);

var _subscriptionActionTypes = require('./subscriptionActionTypes');

var _subscriptionActionTypes2 = _interopRequireDefault(_subscriptionActionTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getMessageReducer(prefix) {
  var prefixedTypes = (0, _Enum.prefixEnum)({ enumMap: _subscriptionActionTypes2.default, prefix: prefix });
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var _ref = arguments[1];
    var type = _ref.type,
        message = _ref.message;

    if (type === prefixedTypes.notification) return message;

    return null;
  };
}

function getStatusReducer(prefix) {
  var prefixedTypes = (0, _Enum.prefixEnum)({ enumMap: _subscriptionActionTypes2.default, prefix: prefix });
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _subscriptionStatus2.default.pending;
    var _ref2 = arguments[1];
    var type = _ref2.type;

    switch (type) {
      case prefixedTypes.init:
      case prefixedTypes.renewError:
      case prefixedTypes.subscribeError:
      case prefixedTypes.removeSuccess:
        return _subscriptionStatus2.default.notSubscribed;

      case prefixedTypes.subscribeSuccess:
      case prefixedTypes.renewSuccess:
        return _subscriptionStatus2.default.subscribed;

      case prefixedTypes.reset:
        return _subscriptionStatus2.default.resetting;

      case prefixedTypes.resetSuccess:
        return _subscriptionStatus2.default.pending;

      default:
        return state;
    }
  };
}

function getFiltersReducer(prefix) {
  var prefixedTypes = (0, _Enum.prefixEnum)({ enumMap: _subscriptionActionTypes2.default, prefix: prefix });
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var _ref3 = arguments[1];
    var type = _ref3.type,
        filters = _ref3.filters;

    var coercedFilters = [].concat(filters);
    switch (type) {
      case prefixedTypes.setFilters:
        return filters;

      case prefixedTypes.addFilters:
        return [].concat((0, _toConsumableArray3.default)(new _set2.default([].concat((0, _toConsumableArray3.default)(state)).concat(coercedFilters))));

      case prefixedTypes.removeFilters:
        return state.filter(function (f) {
          return coercedFilters.indexOf(f) === -1;
        });

      case prefixedTypes.resetSuccess:
        return [];

      default:
        return state;
    }
  };
}

function getErrorReducer(prefix) {
  var prefixedTypes = (0, _Enum.prefixEnum)({ enumMap: _subscriptionActionTypes2.default, prefix: prefix });
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var _ref4 = arguments[1];
    var type = _ref4.type,
        error = _ref4.error;

    switch (type) {
      case prefixedTypes.subscribeError:
      case prefixedTypes.removeError:
      case prefixedTypes.renewError:
        return error;

      case prefixedTypes.subscribeSuccess:
      case prefixedTypes.renewSuccess:
      case prefixedTypes.removeSuccess:
      case prefixedTypes.reset:
      case prefixedTypes.resetSuccess:
      case prefixedTypes.init:
        return null;

      default:
        return state;
    }
  };
}

function getSubscriptionReducer(prefix) {
  return (0, _redux.combineReducers)({
    filters: getFiltersReducer(prefix),
    status: getStatusReducer(prefix),
    error: getErrorReducer(prefix),
    message: getMessageReducer(prefix)
  });
}
//# sourceMappingURL=getSubscriptionReducer.js.map
