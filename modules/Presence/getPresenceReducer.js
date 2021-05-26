"use strict";

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.array.reduce");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDndStatusReducer = getDndStatusReducer;
exports.getMeetingStatusReducer = getMeetingStatusReducer;
exports.getLastNotDisturbDndStatusReducer = getLastNotDisturbDndStatusReducer;
exports.getPresenceStatusReducer = getPresenceStatusReducer;
exports.getUserStatusReducer = getUserStatusReducer;
exports.getActiveCallsReducer = getActiveCallsReducer;
exports.getTelephonyStatusReducer = getTelephonyStatusReducer;
exports.getSequenceReducer = getSequenceReducer;
exports.getDataReducer = getDataReducer;
exports.removeIntermediateCall = void 0;

require("core-js/modules/es6.array.find");

var _redux = require("redux");

var _ramda = require("ramda");

var _dndStatus = _interopRequireDefault(require("./dndStatus"));

var _callLogHelpers = require("../../lib/callLogHelpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getDndStatusReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    var _ref = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref.type,
        _ref$data = _ref.data;

    _ref$data = _ref$data === void 0 ? {} : _ref$data;
    var _ref$data$dndStatus = _ref$data.dndStatus,
        dndStatus = _ref$data$dndStatus === void 0 ? state : _ref$data$dndStatus;

    switch (type) {
      case types.notification:
      case types.fetchSuccess:
      case types.updateSuccess:
      case types.updateError:
      case types.update:
        return dndStatus;

      case types.resetSuccess:
        return null;

      default:
        return state;
    }
  };
}

function getMeetingStatusReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    var _ref2 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref2.type,
        _ref2$data = _ref2.data;

    _ref2$data = _ref2$data === void 0 ? {} : _ref2$data;
    var _ref2$data$meetingSta = _ref2$data.meetingStatus,
        meetingStatus = _ref2$data$meetingSta === void 0 ? state : _ref2$data$meetingSta;

    switch (type) {
      case types.notification:
      case types.fetchSuccess:
      case types.updateSuccess:
      case types.updateError:
      case types.update:
        return meetingStatus;

      case types.resetSuccess:
        return null;

      default:
        return state;
    }
  };
}

function getLastNotDisturbDndStatusReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    var _ref3 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref3.type,
        _ref3$data = _ref3.data;

    _ref3$data = _ref3$data === void 0 ? {} : _ref3$data;
    var dndStatus = _ref3$data.dndStatus,
        _ref3$lastDndStatus = _ref3.lastDndStatus,
        lastDndStatus = _ref3$lastDndStatus === void 0 ? state : _ref3$lastDndStatus;

    switch (type) {
      case types.notification:
      case types.fetchSuccess:
      case types.updateSuccess:
      case types.update:
        if (lastDndStatus !== _dndStatus["default"].doNotAcceptAnyCalls && lastDndStatus !== dndStatus) {
          return lastDndStatus;
        }

        return state;

      case types.resetSuccess:
        return null;

      default:
        return state;
    }
  };
}

function getPresenceStatusReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    var _ref4 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref4.type,
        _ref4$data = _ref4.data;

    _ref4$data = _ref4$data === void 0 ? {} : _ref4$data;
    var _ref4$data$presenceSt = _ref4$data.presenceStatus,
        presenceStatus = _ref4$data$presenceSt === void 0 ? state : _ref4$data$presenceSt;

    switch (type) {
      case types.notification:
      case types.fetchSuccess:
      case types.updateSuccess:
        return presenceStatus;

      case types.resetSuccess:
        return null;

      default:
        return state;
    }
  };
}

function getUserStatusReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    var _ref5 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref5.type,
        _ref5$data = _ref5.data;

    _ref5$data = _ref5$data === void 0 ? {} : _ref5$data;
    var _ref5$data$userStatus = _ref5$data.userStatus,
        userStatus = _ref5$data$userStatus === void 0 ? state : _ref5$data$userStatus;

    switch (type) {
      case types.notification:
      case types.fetchSuccess:
      case types.updateSuccess:
      case types.update:
      case types.updateError:
        return userStatus;

      case types.resetSuccess:
        return null;

      default:
        return state;
    }
  };
}

var removeIntermediateCall = (0, _ramda.reduce)(function (result, activeCall) {
  if (!(0, _callLogHelpers.isIntermediateCall)(activeCall) && !(0, _ramda.find)(function (item) {
    return item.sessionId === activeCall.sessionId && item.direction === activeCall.direction;
  }, result)) {
    result.push(activeCall);
  }

  return result;
});
exports.removeIntermediateCall = removeIntermediateCall;

function getActiveCallsReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    var _ref6 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref6.type,
        timestamp = _ref6.timestamp,
        _ref6$data = _ref6.data;

    _ref6$data = _ref6$data === void 0 ? {} : _ref6$data;
    var _ref6$data$activeCall = _ref6$data.activeCalls,
        activeCalls = _ref6$data$activeCall === void 0 ? [] : _ref6$data$activeCall,
        _ref6$data$totalActiv = _ref6$data.totalActiveCalls,
        totalActiveCalls = _ref6$data$totalActiv === void 0 ? 0 : _ref6$data$totalActiv;

    switch (type) {
      case types.fetchSuccess:
      case types.notification:
        {
          if (activeCalls.length < totalActiveCalls) {
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
              return _objectSpread(_objectSpread({}, normalizedCall), {}, {
                startTime: startTime,
                offset: offset
              });
            }

            return _objectSpread(_objectSpread({}, existingCall), (0, _callLogHelpers.normalizeStartTime)((0, _callLogHelpers.normalizeFromTo)(activeCall)));
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

    var _ref7 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref7.type,
        _ref7$data = _ref7.data;

    _ref7$data = _ref7$data === void 0 ? {} : _ref7$data;
    var _ref7$data$telephonyS = _ref7$data.telephonyStatus,
        telephonyStatus = _ref7$data$telephonyS === void 0 ? state : _ref7$data$telephonyS;

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

function getSequenceReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    var _ref8 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref8.type,
        _ref8$data = _ref8.data;

    _ref8$data = _ref8$data === void 0 ? {} : _ref8$data;
    var _ref8$data$sequence = _ref8$data.sequence,
        sequence = _ref8$data$sequence === void 0 ? state : _ref8$data$sequence;

    switch (type) {
      case types.notification:
        return sequence;

      case types.resetSuccess:
        return 0;

      default:
        return state;
    }
  };
}

function getDataReducer(types) {
  return (0, _redux.combineReducers)({
    dndStatus: getDndStatusReducer(types),
    presenceStatus: getPresenceStatusReducer(types),
    userStatus: getUserStatusReducer(types),
    telephonyStatus: getTelephonyStatusReducer(types),
    meetingStatus: getMeetingStatusReducer(types),
    activeCalls: getActiveCallsReducer(types),
    lastDndStatus: getLastNotDisturbDndStatusReducer(types),
    sequence: getSequenceReducer(types)
  });
}
//# sourceMappingURL=getPresenceReducer.js.map
