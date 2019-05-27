"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getDataReducer;

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

var _redux = require("redux");

var _helpers = require("./helpers");

var _activeCallControlStatus = _interopRequireDefault(require("../../enums/activeCallControlStatus"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function updateActiveSessionStatus(_ref) {
  var state = _ref.state,
      party = _ref.party,
      sessionId = _ref.sessionId;

  var newState = _objectSpread({}, state);

  var muted = party.muted,
      standAlone = party.standAlone,
      code = party.status.code,
      direction = party.direction,
      id = party.id;

  if ((0, _helpers.isHangUp)(code) && newState[sessionId]) {
    delete newState[sessionId];
  } else {
    if (!newState[sessionId]) {
      newState[sessionId] = {};
    }

    newState[sessionId][id] = _objectSpread({}, newState[sessionId][id], {
      standAlone: standAlone,
      sessionId: sessionId,
      isOnMute: muted,
      isOnHold: code === _activeCallControlStatus["default"].hold,
      isReject: (0, _helpers.isReject)({
        direction: direction,
        code: code
      })
    });
  }

  return newState;
}

function setActiveSessionStatus(state, activeSession, obj) {
  var sessionId = activeSession.sessionId,
      partyId = activeSession.partyId;

  var newState = _objectSpread({}, state);

  if (!newState[sessionId]) {
    newState[sessionId] = {};
  }

  newState[sessionId][partyId] = _objectSpread({}, newState[sessionId][partyId], obj);
  return newState;
}

function getActiveSessionIdReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    var _ref2 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref2.type,
        sessionId = _ref2.sessionId;

    switch (type) {
      case types.setActiveSessionId:
        {
          return sessionId;
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

function getRecordingIdsStatusReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var _ref3 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref3.type,
        activeSession = _ref3.activeSession,
        response = _ref3.response;

    switch (type) {
      case types.startRecord:
        {
          var sessionId = activeSession.sessionId,
              partyId = activeSession.partyId;

          var newState = _objectSpread({}, state);

          if (!newState[sessionId]) {
            newState[sessionId] = {};
          }

          newState[sessionId][partyId] = _objectSpread({}, response);
          return newState;
        }

      case types.stopRecord:
        {
          var _sessionId = activeSession.sessionId;

          var _newState = _objectSpread({}, state);

          if (_newState[_sessionId]) {
            delete _newState[_sessionId];
          }

          return _newState;
        }

      case types.recordFail:
      case types.rejectSuccess:
      case types.hangUpSuccess:
      case types.removeActiveSession:
      case types.resetSuccess:
        return {};

      default:
        return state;
    }
  };
}

function getActiveSessionsStatusReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var _ref4 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref4.type,
        sessionId = _ref4.sessionId,
        party = _ref4.party,
        activeSessionsMap = _ref4.activeSessionsMap,
        activeSession = _ref4.activeSession;

    switch (type) {
      case types.updateActiveSessions:
        {
          var newState = null;

          for (var _sessionId2 in activeSessionsMap) {
            if (_sessionId2) {
              newState = updateActiveSessionStatus({
                state: state,
                party: activeSessionsMap[_sessionId2],
                sessionId: _sessionId2
              });
            }
          }

          return newState;
        }

      case types.updateActiveSessionStatus:
        {
          return updateActiveSessionStatus({
            state: state,
            party: party,
            sessionId: sessionId
          });
        }

      case types.holdSuccess:
      case types.unholdSuccess:
        {
          return setActiveSessionStatus(state, activeSession, {
            isOnHold: type === types.holdSuccess
          });
        }

      case types.rejectSuccess:
      case types.hangUpSuccess:
      case types.removeActiveSession:
        {
          var _newState2 = _objectSpread({}, state);

          if (_newState2[sessionId]) {
            delete _newState2[sessionId];
          }

          return _newState2;
        }

      case types.resetSuccess:
        {
          return {};
        }

      default:
        return state;
    }
  };
}

function getTimestampReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    var _ref5 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref5.type,
        timestamp = _ref5.timestamp;

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

    var _ref6 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref6.type,
        timestamp = _ref6.timestamp;

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

function getDataReducer(types) {
  return (0, _redux.combineReducers)({
    activeSessionId: getActiveSessionIdReducer(types),
    activeSessionsStatus: getActiveSessionsStatusReducer(types),
    busy: getBusyReducer(types),
    recordingIds: getRecordingIdsStatusReducer(types),
    timestamp: getTimestampReducer(types)
  });
}
//# sourceMappingURL=getDataReducer.js.map
