'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = getDataReducer;

var _redux = require('redux');

var _helpers = require('./helpers');

var _activeCallControlStatus = require('../../enums/activeCallControlStatus');

var _activeCallControlStatus2 = _interopRequireDefault(_activeCallControlStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function updateActiveSessionStatus(_ref) {
  var state = _ref.state,
      party = _ref.party,
      sessionId = _ref.sessionId;

  var newState = (0, _extends3.default)({}, state);
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
    newState[sessionId][id] = (0, _extends3.default)({}, newState[sessionId][id], {
      standAlone: standAlone,
      sessionId: sessionId,
      isOnMute: muted,
      isOnHold: code === _activeCallControlStatus2.default.hold,
      isReject: (0, _helpers.isReject)({ direction: direction, code: code })
    });
  }
  return newState;
}

function setActiveSessionStatus(state, activeSession, obj) {
  var sessionId = activeSession.sessionId,
      partyId = activeSession.partyId;

  var newState = (0, _extends3.default)({}, state);
  if (!newState[sessionId]) {
    newState[sessionId] = {};
  }
  newState[sessionId][partyId] = (0, _extends3.default)({}, newState[sessionId][partyId], obj);
  return newState;
}
function getActiveSessionIdReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var _ref2 = arguments[1];
    var type = _ref2.type,
        sessionId = _ref2.sessionId;

    switch (type) {
      case types.setActiveSessionId:
        {
          return sessionId;
        }
      case types.resetSuccess:
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
    var _ref3 = arguments[1];
    var type = _ref3.type,
        activeSession = _ref3.activeSession,
        response = _ref3.response;

    switch (type) {
      case types.startRecord:
        {
          var sessionId = activeSession.sessionId,
              partyId = activeSession.partyId;

          var newState = (0, _extends3.default)({}, state);
          if (!newState[sessionId]) {
            newState[sessionId] = {};
          }
          newState[sessionId][partyId] = (0, _extends3.default)({}, response);
          return newState;
        }
      case types.stopRecord:
        {
          var _sessionId = activeSession.sessionId;

          var _newState = (0, _extends3.default)({}, state);
          if (_newState[_sessionId]) {
            delete _newState[_sessionId];
          }
          return _newState;
        }
      case types.recordFail:
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
    var _ref4 = arguments[1];
    var type = _ref4.type,
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
      case types.startRecord:
      case types.stopRecord:
        {
          return setActiveSessionStatus(state, activeSession, { isOnRecording: type === types.startRecord });
        }
      case types.mute:
      case types.unmute:
        {
          return setActiveSessionStatus(state, activeSession, { isOnMute: type === types.mute });
        }
      case types.hold:
      case types.unhold:
        {
          return setActiveSessionStatus(state, activeSession, { isOnHold: type === types.hold });
        }
      case types.removeActiveSession:
        {
          var _newState2 = (0, _extends3.default)({}, state);
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
    var _ref5 = arguments[1];
    var type = _ref5.type,
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
function getDataReducer(types) {
  return (0, _redux.combineReducers)({
    activeSessionId: getActiveSessionIdReducer(types),
    activeSessionsStatus: getActiveSessionsStatusReducer(types),
    recordingIds: getRecordingIdsStatusReducer(types),
    timestamp: getTimestampReducer(types)
  });
}
//# sourceMappingURL=getDataReducer.js.map
