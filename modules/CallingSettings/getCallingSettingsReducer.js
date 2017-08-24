'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCallWithReducer = getCallWithReducer;
exports.getRingoutPromptReducer = getRingoutPromptReducer;
exports.getMyLocationReducer = getMyLocationReducer;
exports.getTimestampReducer = getTimestampReducer;
exports.getFromNumberReducer = getFromNumberReducer;
exports.default = getCallingSettingsReducer;

var _redux = require('redux');

var _getModuleStatusReducer = require('../../lib/getModuleStatusReducer');

var _getModuleStatusReducer2 = _interopRequireDefault(_getModuleStatusReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getCallWithReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var _ref = arguments[1];
    var type = _ref.type,
        _ref$callWith = _ref.callWith,
        callWith = _ref$callWith === undefined ? state : _ref$callWith;

    if (type === types.setData) return callWith;
    return state;
  };
}

function getRingoutPromptReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    var _ref2 = arguments[1];
    var type = _ref2.type,
        _ref2$ringoutPrompt = _ref2.ringoutPrompt,
        ringoutPrompt = _ref2$ringoutPrompt === undefined ? state : _ref2$ringoutPrompt;

    if (type === types.setData) return ringoutPrompt;
    return state;
  };
}

function getMyLocationReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var _ref3 = arguments[1];
    var type = _ref3.type,
        _ref3$myLocation = _ref3.myLocation,
        myLocation = _ref3$myLocation === undefined ? state : _ref3$myLocation;

    if (type === types.setData) return myLocation;
    return state;
  };
}

function getTimestampReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var _ref4 = arguments[1];
    var type = _ref4.type,
        _ref4$timestamp = _ref4.timestamp,
        timestamp = _ref4$timestamp === undefined ? state : _ref4$timestamp;

    if (type === types.setData) return timestamp;
    return state;
  };
}

function getFromNumberReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var _ref5 = arguments[1];
    var type = _ref5.type,
        number = _ref5.number;

    switch (type) {
      case types.updateFromNumber:
        return number;
      default:
        return state;
    }
  };
}

function getCallingSettingsReducer(types) {
  return (0, _redux.combineReducers)({
    status: (0, _getModuleStatusReducer2.default)(types)
  });
}
//# sourceMappingURL=getCallingSettingsReducer.js.map
