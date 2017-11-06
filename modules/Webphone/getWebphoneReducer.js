'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getVideoElementPreparedReducer = getVideoElementPreparedReducer;
exports.getConnectionStatusReducer = getConnectionStatusReducer;
exports.getErrorCodeReducer = getErrorCodeReducer;
exports.getConnectRetryCountsReducer = getConnectRetryCountsReducer;
exports.getActiveSessionIdReducer = getActiveSessionIdReducer;
exports.getRingSessionIdReducer = getRingSessionIdReducer;
exports.getLastEndedSessionsReducer = getLastEndedSessionsReducer;
exports.getSessionsReducer = getSessionsReducer;
exports.default = getWebphoneReducer;

var _redux = require('redux');

var _getModuleStatusReducer = require('../../lib/getModuleStatusReducer');

var _getModuleStatusReducer2 = _interopRequireDefault(_getModuleStatusReducer);

var _connectionStatus = require('./connectionStatus');

var _connectionStatus2 = _interopRequireDefault(_connectionStatus);

var _webphoneHelper = require('./webphoneHelper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getVideoElementPreparedReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var _ref = arguments[1];
    var type = _ref.type;

    if (type === types.videoElementPrepared) return true;
    return state;
  };
}

function getConnectionStatusReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _connectionStatus2.default.disconnected;
    var _ref2 = arguments[1];
    var type = _ref2.type;

    switch (type) {
      case types.connect:
      case types.reconnect:
        return _connectionStatus2.default.connecting;
      case types.registered:
        return _connectionStatus2.default.connected;
      case types.unregistered:
        return _connectionStatus2.default.disconnected;
      case types.disconnect:
        return _connectionStatus2.default.disconnecting;
      case types.connectError:
      case types.registrationFailed:
        return _connectionStatus2.default.connectFailed;
      default:
        return state;
    }
  };
}

function getErrorCodeReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var _ref3 = arguments[1];
    var type = _ref3.type,
        _ref3$errorCode = _ref3.errorCode,
        errorCode = _ref3$errorCode === undefined ? state : _ref3$errorCode;

    switch (type) {
      case types.connectError:
      case types.registrationFailed:
        return errorCode;
      case types.registered:
        return null;
      default:
        return state;
    }
  };
}

function getConnectRetryCountsReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var _ref4 = arguments[1];
    var type = _ref4.type;

    switch (type) {
      case types.reconnect:
        return state + 1;
      case types.resetRetryCounts:
      case types.registered:
        return 0;
      default:
        return state;
    }
  };
}

function getActiveSessionIdReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var _ref5 = arguments[1];
    var type = _ref5.type,
        _ref5$session = _ref5.session,
        session = _ref5$session === undefined ? {} : _ref5$session,
        _ref5$sessions = _ref5.sessions,
        sessions = _ref5$sessions === undefined ? [] : _ref5$sessions;

    var onHoldSessions = void 0;
    switch (type) {
      case types.callStart:
        return session.id;
      case types.callEnd:
        if (session.id !== state) {
          return state;
        }
        onHoldSessions = sessions.filter(function (sessionItem) {
          return (0, _webphoneHelper.isOnHold)(sessionItem);
        });
        if (onHoldSessions && onHoldSessions[0]) {
          return onHoldSessions[0].id;
        }
        return null;
      case types.disconnect:
        return null;
      default:
        return state;
    }
  };
}

function getRingSessionIdReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var _ref6 = arguments[1];
    var type = _ref6.type,
        _ref6$session = _ref6.session,
        session = _ref6$session === undefined ? {} : _ref6$session,
        _ref6$sessions = _ref6.sessions,
        sessions = _ref6$sessions === undefined ? [] : _ref6$sessions;

    var ringSessions = void 0;
    switch (type) {
      case types.callRing:
        return session.id;
      case types.callStart:
      case types.callEnd:
        if (session.id !== state) {
          return state;
        }
        ringSessions = sessions.filter(function (sessionItem) {
          return (0, _webphoneHelper.isRing)(sessionItem);
        });
        if (ringSessions && ringSessions[0]) {
          return ringSessions[0].id;
        }
        return null;
      case types.disconnect:
        return null;
      default:
        return state;
    }
  };
}

function getLastEndedSessionsReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var _ref7 = arguments[1];
    var type = _ref7.type,
        _ref7$session = _ref7.session,
        session = _ref7$session === undefined ? {} : _ref7$session;

    var lastSessions = void 0;
    switch (type) {
      case types.callEnd:
        if (
        /**
        * don't add incoming call that isn't relied by current app
        *   to end sessions. this call can be answered by other apps
        */
        !session.startTime && !session.isToVoicemail && !session.isForwarded && !session.isReplied) {
          return state;
        }
        lastSessions = [session].concat(state.filter(function (sessionItem) {
          return sessionItem.id !== session.id;
        }));
        return lastSessions.slice(0, 5);
      default:
        return state;
    }
  };
}

function getSessionsReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var _ref8 = arguments[1];
    var type = _ref8.type,
        sessions = _ref8.sessions;

    switch (type) {
      case types.updateSessions:
        return sessions;
      case types.destroySessions:
        return [];
      default:
        return state;
    }
  };
}

function getWebphoneReducer(types) {
  return (0, _redux.combineReducers)({
    status: (0, _getModuleStatusReducer2.default)(types),
    videoElementPrepared: getVideoElementPreparedReducer(types),
    connectionStatus: getConnectionStatusReducer(types),
    connectRetryCounts: getConnectRetryCountsReducer(types),
    errorCode: getErrorCodeReducer(types),
    activeSessionId: getActiveSessionIdReducer(types),
    ringSessionId: getRingSessionIdReducer(types),
    sessions: getSessionsReducer(types),
    lastEndedSessions: getLastEndedSessionsReducer(types)
  });
}
//# sourceMappingURL=getWebphoneReducer.js.map
