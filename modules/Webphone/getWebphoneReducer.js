"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getVideoElementPreparedReducer = getVideoElementPreparedReducer;
exports.getConnectionStatusReducer = getConnectionStatusReducer;
exports.getErrorCodeReducer = getErrorCodeReducer;
exports.getStatusCodeReducer = getStatusCodeReducer;
exports.getConnectRetryCountsReducer = getConnectRetryCountsReducer;
exports.getActiveSessionIdReducer = getActiveSessionIdReducer;
exports.getRingSessionIdReducer = getRingSessionIdReducer;
exports.getLastEndedSessionsReducer = getLastEndedSessionsReducer;
exports.getSessionsReducer = getSessionsReducer;
exports.default = getWebphoneReducer;

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.array.find");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.sort");

require("core-js/modules/es6.array.filter");

var _redux = require("redux");

var _getModuleStatusReducer = _interopRequireDefault(require("../../lib/getModuleStatusReducer"));

var _connectionStatus = _interopRequireDefault(require("./connectionStatus"));

var _sessionStatus = _interopRequireDefault(require("./sessionStatus"));

var _webphoneHelper = require("./webphoneHelper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function getVideoElementPreparedReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    var _ref = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref.type;

    if (type === types.videoElementPrepared) return true;
    return state;
  };
}

function getConnectionStatusReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _connectionStatus.default.disconnected;

    var _ref2 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref2.type;

    switch (type) {
      case types.connect:
      case types.reconnect:
        return _connectionStatus.default.connecting;

      case types.registered:
        return _connectionStatus.default.connected;

      case types.unregistered:
        return _connectionStatus.default.disconnected;

      case types.disconnect:
        return _connectionStatus.default.disconnecting;

      case types.connectError:
      case types.registrationFailed:
        return _connectionStatus.default.connectFailed;

      default:
        return state;
    }
  };
}

function getErrorCodeReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    var _ref3 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref3.type,
        _ref3$errorCode = _ref3.errorCode,
        errorCode = _ref3$errorCode === void 0 ? state : _ref3$errorCode;

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

function getStatusCodeReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    var _ref4 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref4.type,
        _ref4$statusCode = _ref4.statusCode,
        statusCode = _ref4$statusCode === void 0 ? state : _ref4$statusCode;

    switch (type) {
      case types.connectError:
      case types.registrationFailed:
        return statusCode;

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

    var _ref5 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref5.type;

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

    var _ref6 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref6.type,
        _ref6$session = _ref6.session,
        session = _ref6$session === void 0 ? {} : _ref6$session,
        _ref6$sessions = _ref6.sessions,
        sessions = _ref6$sessions === void 0 ? [] : _ref6$sessions;

    switch (type) {
      case types.callStart:
        return session.id;

      case types.callEnd:
        {
          if (session.id !== state) {
            return state;
          }

          var activeSessions = sessions.filter(function (x) {
            return !(0, _webphoneHelper.isRing)(x);
          });
          activeSessions.sort(_webphoneHelper.sortByLastActiveTimeDesc);
          return activeSessions[0] && activeSessions[0].id || null;
        }

      case types.clearSessionCaching:
        {
          var _activeSessions = sessions.filter(function (x) {
            return !x.cached && !(0, _webphoneHelper.isRing)(x);
          });

          _activeSessions.sort(_webphoneHelper.sortByLastActiveTimeDesc);

          return _activeSessions[0] && _activeSessions[0].id || null;
        }

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

    var _ref7 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref7.type,
        _ref7$session = _ref7.session,
        session = _ref7$session === void 0 ? {} : _ref7$session,
        _ref7$sessions = _ref7.sessions,
        sessions = _ref7$sessions === void 0 ? [] : _ref7$sessions;

    switch (type) {
      case types.callRing:
        return session.id;

      case types.callStart:
      case types.callEnd:
        {
          if (session.id !== state) {
            return state;
          }

          var ringSessions = sessions.filter(function (x) {
            return (0, _webphoneHelper.isRing)(x);
          });
          return ringSessions[0] && ringSessions[0].id || null;
        }

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

    var _ref8 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref8.type,
        _ref8$session = _ref8.session,
        session = _ref8$session === void 0 ? {} : _ref8$session;

    switch (type) {
      case types.callEnd:
        {
          if (
          /**
          * don't add incoming call that isn't relied by current app
          *   to end sessions. this call can be answered by other apps
          */
          !session.startTime && !session.isToVoicemail && !session.isForwarded && !session.isReplied) {
            return state;
          }

          var lastSessions = [session].concat(state.filter(function (x) {
            return x.id !== session.id;
          }));
          return lastSessions.slice(0, 5);
        }

      default:
        return state;
    }
  };
}

function getSessionsReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    var _ref9 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref9.type,
        sessions = _ref9.sessions,
        cachingSessionIds = _ref9.cachingSessionIds;

    switch (type) {
      case types.updateSessions:
        {
          var cachedSessions = state.filter(function (x) {
            return x.cached;
          });
          cachedSessions.forEach(function (cachedSession) {
            var session = sessions.find(function (x) {
              return x.id === cachedSession.id;
            });

            if (session) {
              session.cached = true;
            } else {
              cachedSession.removed = true;
              sessions.push(cachedSession);
            }
          });
          return sessions.sort(_webphoneHelper.sortByLastActiveTimeDesc);
        }

      case types.setSessionCaching:
        {
          var needUpdate = false;
          cachingSessionIds.forEach(function (sessionId) {
            var session = state.find(function (x) {
              return x.id === sessionId;
            });

            if (session) {
              session.cached = true;
              needUpdate = true;
            }
          });
          return needUpdate ? _toConsumableArray(state) : state;
        }

      case types.clearSessionCaching:
        {
          var _needUpdate = false;
          state.forEach(function (session) {
            if (session.cached) {
              session.cached = false;
              _needUpdate = true;
            }
          });

          if (_needUpdate) {
            return state.filter(function (x) {
              return !x.removed;
            });
          }

          return state;
        }

      case types.onholdCachedSession:
        {
          var _needUpdate2 = false;
          state.forEach(function (session) {
            if (session.cached) {
              session.callStatus = _sessionStatus.default.onHold;
              session.isOnHold = true;
              _needUpdate2 = true;
            }
          });
          return _needUpdate2 ? _toConsumableArray(state) : state;
        }

      case types.destroySessions:
        return [];

      default:
        return state;
    }
  };
}

function getWebphoneReducer(types) {
  return (0, _redux.combineReducers)({
    status: (0, _getModuleStatusReducer.default)(types),
    videoElementPrepared: getVideoElementPreparedReducer(types),
    connectionStatus: getConnectionStatusReducer(types),
    connectRetryCounts: getConnectRetryCountsReducer(types),
    errorCode: getErrorCodeReducer(types),
    statusCode: getStatusCodeReducer(types),
    activeSessionId: getActiveSessionIdReducer(types),
    ringSessionId: getRingSessionIdReducer(types),
    sessions: getSessionsReducer(types),
    lastEndedSessions: getLastEndedSessionsReducer(types)
  });
}
//# sourceMappingURL=getWebphoneReducer.js.map
