'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.getConferenceCallStatusReducer = getConferenceCallStatusReducer;
exports.getMakeConferenceCallReducer = getMakeConferenceCallReducer;
exports.getMergingStatusReducer = getMergingStatusReducer;
exports.getMergingPairReducer = getMergingPairReducer;
exports.getCurrentConferenceIdReducer = getCurrentConferenceIdReducer;
exports.default = getConferenceCallReducer;

var _redux = require('redux');

var _getModuleStatusReducer = require('../../lib/getModuleStatusReducer');

var _getModuleStatusReducer2 = _interopRequireDefault(_getModuleStatusReducer);

var _conferenceCallStatus = require('./conferenceCallStatus');

var _conferenceCallStatus2 = _interopRequireDefault(_conferenceCallStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getConferenceCallStatusReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _conferenceCallStatus2.default.idle;
    var _ref = arguments[1];
    var type = _ref.type;

    switch (type) {
      case types.makeConference:
      case types.terminateConference:
      case types.updateConference:
      case types.bringInConference:
      case types.removeFromConference:
      case types.getParty:
        return _conferenceCallStatus2.default.requesting;

      case types.makeConferenceSucceeded:
      case types.makeConferenceFailed:
      case types.terminateConferenceSucceeded:
      case types.terminateConferenceFailed:
      case types.updateConferenceSucceeded:
      case types.updateConferenceFailed:
      case types.bringInConferenceSucceeded:
      case types.bringInConferenceFailed:
      case types.removeFromConferenceSucceeded:
      case types.removeFromConferenceFailed:
      case types.getPartySucceeded:
      case types.getPartyFailed:
      case types.resetSuccess:
        return _conferenceCallStatus2.default.idle;

      default:
        return state;
    }
  };
}

function getMakeConferenceCallReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var _ref2 = arguments[1];
    var type = _ref2.type,
        conference = _ref2.conference,
        sessionId = _ref2.sessionId,
        partyProfile = _ref2.partyProfile;

    var res = (0, _extends3.default)({}, state);
    switch (type) {
      case types.resetSuccess:
        return {};
      case types.makeConferenceSucceeded:
      case types.updateConferenceSucceeded:
        res[conference.id] = {
          conference: conference,
          sessionId: sessionId,
          profiles: res[conference.id] && res[conference.id].profiles || []
        };
        return res;
      case types.bringInConferenceSucceeded:
        res[conference.id] = {
          conference: conference,
          sessionId: sessionId,
          profiles: [].concat((0, _toConsumableArray3.default)(res[conference.id].profiles), [partyProfile])
        };
        return res;
      case types.terminateConferenceSucceeded:
        delete res[conference.id];
        return res;
      default:
        return state;
    }
  };
}

function getMergingStatusReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var _ref3 = arguments[1];
    var type = _ref3.type;

    switch (type) {
      case types.mergeStart:
        return true;
      case types.mergeSucceeded:
      case types.mergeFailed:
      case types.resetSuccess:
        return false;
      default:
        return state;
    }
  };
}

/**
 * interface MergingPairState = {fromSessionId:string, toSessionId:string}
 *
 * The `from` and `to` is relative to the [adding call](https://app.zeplin.io/project/59df2e4346294d03f96d15a9/screen/5b2c64f7db2860b90ddd5939) flow
 * which is in [RCINT-7378](https://jira.ringcentral.com/browse/RCINT-7378)
 */
function getMergingPairReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var _ref4 = arguments[1];
    var type = _ref4.type,
        fromSessionId = _ref4.fromSessionId,
        toSessionId = _ref4.toSessionId;

    switch (type) {
      case types.updateFromSession:
        return { fromSessionId: fromSessionId };
      case types.updateToSession:
        return (0, _extends3.default)({}, state, { toSessionId: toSessionId });
      case types.closeMergingPair:
      case types.mergeSucceeded:
      case types.resetSuccess:
        return {};
      // restore the pair when failure
      default:
        return state;
    }
  };
}

function getCurrentConferenceIdReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var _ref5 = arguments[1];
    var type = _ref5.type,
        conferenceId = _ref5.conferenceId;

    switch (type) {
      case types.updateCurrentConferenceId:
        return conferenceId;
      case types.initSuccess:
      case types.resetSuccess:
        return null;
      default:
        return state;
    }
  };
}

function getConferenceCallReducer(types) {
  return (0, _redux.combineReducers)({
    status: (0, _getModuleStatusReducer2.default)(types),
    conferences: getMakeConferenceCallReducer(types),
    conferenceCallStatus: getConferenceCallStatusReducer(types),
    isMerging: getMergingStatusReducer(types),
    mergingPair: getMergingPairReducer(types),
    currentConferenceId: getCurrentConferenceIdReducer(types)
  });
}
//# sourceMappingURL=getConferenceCallReducer.js.map
