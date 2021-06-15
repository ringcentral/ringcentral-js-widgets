"use strict";

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.is-array");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLogOnRingingReducer = getLogOnRingingReducer;
exports.getAutoLogReducer = getAutoLogReducer;
exports.getTransferredCallsReducer = getTransferredCallsReducer;
exports["default"] = getDataReducer;

require("core-js/modules/es6.array.slice");

var _redux = require("redux");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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
