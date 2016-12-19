'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStatusReducer = getStatusReducer;
exports.getInfoReducer = getInfoReducer;
exports.getTimestampReducer = getTimestampReducer;
exports.default = getAccountInfoReducer;

var _redux = require('redux');

var _moduleStatus = require('../../enums/moduleStatus');

var _moduleStatus2 = _interopRequireDefault(_moduleStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getStatusReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _moduleStatus2.default.pending;
    var _ref = arguments[1];
    var type = _ref.type;

    switch (type) {

      case types.init:
        return _moduleStatus2.default.initializing;

      case types.initSuccess:
        return _moduleStatus2.default.ready;

      case types.reset:
        return _moduleStatus2.default.pending;

      default:
        return state;
    }
  };
}

function getInfoReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var _ref2 = arguments[1];
    var type = _ref2.type,
        info = _ref2.info;

    if (type === types.fetchSuccess) return info;
    return state;
  };
}

function getTimestampReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var _ref3 = arguments[1];
    var type = _ref3.type,
        timestamp = _ref3.timestamp;

    if (type === types.fetchSuccess) return timestamp;
    return state;
  };
}

function getAccountInfoReducer(types) {
  return (0, _redux.combineReducers)({
    status: getStatusReducer(types)
  });
}
//# sourceMappingURL=getAccountInfoReducer.js.map
