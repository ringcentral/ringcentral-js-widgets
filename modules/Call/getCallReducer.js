'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.getCallStatusReducer = getCallStatusReducer;
exports.getToNumberEntitiesReducer = getToNumberEntitiesReducer;
exports.getLastPhoneNumberReducer = getLastPhoneNumberReducer;
exports.getLastRecipientReducer = getLastRecipientReducer;
exports.default = getCallReducer;

var _redux = require('redux');

var _getModuleStatusReducer = require('../../lib/getModuleStatusReducer');

var _getModuleStatusReducer2 = _interopRequireDefault(_getModuleStatusReducer);

var _callStatus = require('./callStatus');

var _callStatus2 = _interopRequireDefault(_callStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getCallStatusReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _callStatus2.default.idle;
    var _ref = arguments[1];
    var type = _ref.type;

    switch (type) {
      case types.connect:
        return _callStatus2.default.connecting;

      case types.connectSuccess:
      case types.connectError:
        return _callStatus2.default.idle;

      default:
        return state;
    }
  };
}

function getToNumberEntitiesReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var _ref2 = arguments[1];
    var type = _ref2.type,
        data = _ref2.data;

    switch (type) {
      case types.toNumberMatched:
        return [].concat((0, _toConsumableArray3.default)(state), [data]);
      case types.cleanToNumberEntities:
      case types.resetSuccess:
        return [];
      default:
        return state;
    }
  };
}

function getLastPhoneNumberReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var _ref3 = arguments[1];
    var type = _ref3.type,
        _ref3$phoneNumber = _ref3.phoneNumber,
        phoneNumber = _ref3$phoneNumber === undefined ? null : _ref3$phoneNumber;

    switch (type) {
      case types.connect:
        return phoneNumber;
      default:
        return state;
    }
  };
}
function getLastRecipientReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var _ref4 = arguments[1];
    var type = _ref4.type,
        _ref4$recipient = _ref4.recipient,
        recipient = _ref4$recipient === undefined ? null : _ref4$recipient;

    switch (type) {
      case types.connect:
        return recipient;
      default:
        return state;
    }
  };
}

function getCallReducer(types) {
  return (0, _redux.combineReducers)({
    status: (0, _getModuleStatusReducer2.default)(types),
    callStatus: getCallStatusReducer(types),
    toNumberEntities: getToNumberEntitiesReducer(types)
  });
}
//# sourceMappingURL=getCallReducer.js.map
