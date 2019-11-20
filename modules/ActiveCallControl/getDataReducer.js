"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getDataReducer;

var _redux = require("redux");

function getActiveSessionIdReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    var _ref = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref.type,
        telephonySessionId = _ref.telephonySessionId;

    switch (type) {
      case types.setActiveSessionId:
        {
          return telephonySessionId;
        }

      case types.resetSuccess:
      case types.rejectSuccess:
      case types.hangUpSuccess:
      case types.removeActiveSession:
        {
          return null;
        }

      default:
        return state;
    }
  };
}

function getTimestampReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    var _ref2 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref2.type,
        timestamp = _ref2.timestamp;

    switch (type) {
      case types.updateActiveSessions:
        return timestamp;

      case types.resetSuccess:
        return null;

      default:
        return state;
    }
  };
}

function getBusyReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    var _ref3 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref3.type,
        timestamp = _ref3.timestamp;

    switch (type) {
      case types.hold:
      case types.unhold:
      case types.mute:
      case types.unmute:
      case types.transfer:
      case types.reject:
      case types.hangUp:
      case types.flip:
        return timestamp;

      case types.holdSuccess:
      case types.holdError:
      case types.unholdSuccess:
      case types.unholdError:
      case types.muteSuccess:
      case types.muteError:
      case types.unmuteSuccess:
      case types.unmuteError:
      case types.transferSuccess:
      case types.transferError:
      case types.rejectSuccess:
      case types.rejectError:
      case types.hangUpSuccess:
      case types.hangUpError:
      case types.flipSuccess:
      case types.flipError:
        return 0;

      default:
        return state;
    }
  };
}

function getSessionsReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    var _ref4 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref4.type,
        sessionDatas = _ref4.sessionDatas;

    switch (type) {
      case types.updateActiveSessions:
        return sessionDatas;

      case types.resetSuccess:
        return [];

      default:
        return state;
    }
  };
}

function getDataReducer(types) {
  return (0, _redux.combineReducers)({
    activeSessionId: getActiveSessionIdReducer(types),
    busy: getBusyReducer(types),
    timestamp: getTimestampReducer(types),
    sessions: getSessionsReducer(types)
  });
}
//# sourceMappingURL=getDataReducer.js.map
