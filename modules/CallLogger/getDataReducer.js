'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.getLogOnRingingReducer = getLogOnRingingReducer;
exports.getAutoLogReducer = getAutoLogReducer;
exports.getTransferredCallsReducer = getTransferredCallsReducer;
exports.default = getDataReducer;

var _redux = require('redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_OPACITY = 20;

function getLogOnRingingReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    var _ref = arguments[1];
    var type = _ref.type,
        logOnRinging = _ref.logOnRinging;

    if (type === types.setLogOnRinging) return !!logOnRinging;
    return state;
  };
}

function getAutoLogReducer(types) {
  var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var _ref2 = arguments[1];
    var type = _ref2.type,
        autoLog = _ref2.autoLog;

    if (type === types.setAutoLog) return !!autoLog;
    return state;
  };
}

function getTransferredCallsReducer(types) {
  var opacity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_OPACITY;

  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var _ref3 = arguments[1];
    var type = _ref3.type,
        sessionId = _ref3.sessionId,
        transferredMiddleNumber = _ref3.transferredMiddleNumber;

    if (type === types.addTransferredCall) {
      return [].concat((0, _toConsumableArray3.default)(state.slice(state.length >= opacity ? 1 : 0, opacity)), [(0, _defineProperty3.default)({}, sessionId, { transferredMiddleNumber: transferredMiddleNumber })]);
    }
    return state;
  };
}

/* istanbul ignore next */
function getDataReducer(types) {
  var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return (0, _redux.combineReducers)({
    autoLog: getAutoLogReducer(types, initialState.autoLog),
    logOnRinging: getLogOnRingingReducer(types),
    transferredCallsMap: getTransferredCallsReducer(types)
  });
}
//# sourceMappingURL=getDataReducer.js.map
