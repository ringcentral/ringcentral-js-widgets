"use strict";

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.array.reduce");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDataReducer = getDataReducer;
exports.getTelephonyStatusReducer = getTelephonyStatusReducer;
exports.default = getDetailedPresenceReducer;

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.find");

require("core-js/fn/array/find");

require("core-js/fn/array/find-index");

var _ramda = require("ramda");

var _getPresenceReducer = _interopRequireDefault(require("../Presence/getPresenceReducer"));

var _callLogHelpers = require("../../lib/callLogHelpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var removeIntermediateCall = (0, _ramda.reduce)(function (result, activeCall) {
  if (!(0, _callLogHelpers.isIntermediateCall)(activeCall) && !(0, _ramda.find)(function (item) {
    return item.sessionId === activeCall.sessionId && item.direction === activeCall.direction;
  }, result)) {
    result.push(activeCall);
  }

  return result;
});

function getDataReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    var _ref = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref.type,
        timestamp = _ref.timestamp,
        _ref$activeCalls = _ref.activeCalls,
        activeCalls = _ref$activeCalls === void 0 ? [] : _ref$activeCalls,
        _ref$totalActiveCalls = _ref.totalActiveCalls,
        totalActiveCalls = _ref$totalActiveCalls === void 0 ? 0 : _ref$totalActiveCalls;

    switch (type) {
      case types.fetchSuccess:
      case types.notification:
        {
          if (activeCalls.length !== totalActiveCalls) {
            return state;
          }

          return (0, _ramda.map)(function (activeCall) {
            var existingCall = state.find(function (call) {
              return call.sessionId === activeCall.sessionId;
            });

            if (!existingCall) {
              var normalizedCall = (0, _callLogHelpers.normalizeStartTime)((0, _callLogHelpers.normalizeFromTo)(activeCall));
              var startTime = normalizedCall.startTime || timestamp;
              var offset = Math.min(timestamp - startTime, 0);
              return _objectSpread({}, normalizedCall, {
                startTime: startTime,
                offset: offset
              });
            }

            return _objectSpread({}, existingCall, (0, _callLogHelpers.normalizeStartTime)((0, _callLogHelpers.normalizeFromTo)(activeCall)));
          }, removeIntermediateCall([], activeCalls));
        }

      case types.resetSuccess:
        return [];

      default:
        return state;
    }
  };
}

function getTelephonyStatusReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    var _ref2 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref2.type,
        _ref2$telephonyStatus = _ref2.telephonyStatus,
        telephonyStatus = _ref2$telephonyStatus === void 0 ? state : _ref2$telephonyStatus;

    switch (type) {
      case types.fetchSuccess:
      case types.notification:
        return telephonyStatus;

      case types.resetSuccess:
        return null;

      default:
        return state;
    }
  };
}

function getDetailedPresenceReducer(types) {
  var reducers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return (0, _getPresenceReducer.default)(types, _objectSpread({}, reducers, {
    data: getDataReducer(types),
    telephonyStatus: getTelephonyStatusReducer(types)
  }));
}
//# sourceMappingURL=getDetailedPresenceReducer.js.map
