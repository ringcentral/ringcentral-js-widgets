'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.getMessagesReducer = getMessagesReducer;
exports.default = getAlertReducer;

var _redux = require('redux');

require('core-js/fn/array/find');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getMessagesReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var _ref = arguments[1];
    var type = _ref.type,
        message = _ref.message,
        payload = _ref.payload,
        ttl = _ref.ttl,
        level = _ref.level,
        ids = _ref.ids,
        timestamp = _ref.timestamp,
        id = _ref.id,
        allowDuplicates = _ref.allowDuplicates;

    switch (type) {
      case types.alert:
        if (!allowDuplicates && state.find(function (item) {
          return item.message === message;
        })) {
          return state;
        }
        return [].concat((0, _toConsumableArray3.default)(state), [{
          id: id,
          message: message,
          payload: payload,
          ttl: ttl,
          level: level,
          timestamp: timestamp
        }]);
      case types.dismiss:
        return state.filter(function (item) {
          return ids.indexOf(item.id) === -1;
        });
      case types.dismissAll:
        return [];
      default:
        return state;
    }
  };
}

function getAlertReducer(types) {
  return (0, _redux.combineReducers)({
    messages: getMessagesReducer(types)
  });
}
//# sourceMappingURL=getAlertReducer.js.map
