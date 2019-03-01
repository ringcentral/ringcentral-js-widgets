"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLogOnRingingReducer = getLogOnRingingReducer;
exports.getAutoLogReducer = getAutoLogReducer;
exports.getTransferredCallsReducer = getTransferredCallsReducer;
exports.default = getDataReducer;

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.is-array");

var _redux = require("redux");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var DEFAULT_OPACITY = 20;

function getLogOnRingingReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

    var _ref = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref.type,
        logOnRinging = _ref.logOnRinging;

    if (type === types.setLogOnRinging) return !!logOnRinging;
    return state;
  };
}

function getAutoLogReducer(types) {
  var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;

    var _ref2 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref2.type,
        autoLog = _ref2.autoLog;

    if (type === types.setAutoLog) return !!autoLog;
    return state;
  };
}

function getTransferredCallsReducer(types) {
  var opacity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_OPACITY;
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    var _ref3 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref3.type,
        sessionId = _ref3.sessionId,
        transferredMiddleNumber = _ref3.transferredMiddleNumber;

    if (type === types.addTransferredCall) {
      return [].concat(_toConsumableArray(state.slice(state.length >= opacity ? 1 : 0, opacity)), [_defineProperty({}, sessionId, {
        transferredMiddleNumber: transferredMiddleNumber
      })]);
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
