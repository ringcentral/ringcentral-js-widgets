"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.getDataReducer = getDataReducer;
exports.getTimestampReducer = getTimestampReducer;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getDataReducer(types) {
  // use [] instead of null as initial state to avoid add or delete to error out
  // in case initial load failed but an update was made through subscription
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var _ref = arguments[1];
    var type = _ref.type,
        data = _ref.data,
        id = _ref.id;

    switch (type) {
      case types.fetchSuccess:
        return data;
      case types.add:
        return [].concat((0, _toConsumableArray3.default)(state), [data]);
      case types.delete:
        return state.filter(function (item) {
          return item.id !== id;
        });
      case types.resetSuccess:
        return [];
      default:
        return state;
    }
  };
}

function getTimestampReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var _ref2 = arguments[1];
    var type = _ref2.type,
        timestamp = _ref2.timestamp;

    switch (type) {
      case types.fetchSuccess:
      case types.add:
      case types.delete:
        return timestamp;
      case types.resetSuccess:
        return null;
      default:
        return state;
    }
  };
}
//# sourceMappingURL=getAccountExtensionReducer.js.map
