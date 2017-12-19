'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMeetingInfoReducer = getMeetingInfoReducer;
exports.getMeetingSchedulingStatusReducer = getMeetingSchedulingStatusReducer;
exports.getMeetingStorageReducer = getMeetingStorageReducer;

var _redux = require('redux');

var _scheduleStatus = require('./scheduleStatus');

var _scheduleStatus2 = _interopRequireDefault(_scheduleStatus);

var _getModuleStatusReducer = require('../../lib/getModuleStatusReducer');

var _getModuleStatusReducer2 = _interopRequireDefault(_getModuleStatusReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getMeetingInfoReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var _ref = arguments[1];
    var type = _ref.type,
        _ref$meeting = _ref.meeting,
        meeting = _ref$meeting === undefined ? null : _ref$meeting;

    switch (type) {
      case types.updateMeeting:
        return meeting;
      case types.clearMeeting:
        return null;
      default:
        return state;
    }
  };
}

function getMeetingSchedulingStatusReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _scheduleStatus2.default.idle;
    var _ref2 = arguments[1];
    var type = _ref2.type;

    switch (type) {
      case types.initScheduling:
        return _scheduleStatus2.default.scheduling;
      case types.scheduled:
        return _scheduleStatus2.default.scheduled;
      case types.resetScheduling:
        return _scheduleStatus2.default.idle;
      default:
        return state;
    }
  };
}

function getMeetingStorageReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var _ref3 = arguments[1];
    var type = _ref3.type,
        _ref3$meeting = _ref3.meeting,
        meeting = _ref3$meeting === undefined ? null : _ref3$meeting;

    switch (type) {
      case types.scheduled:
        return meeting ? {
          startHostVideo: meeting.startHostVideo,
          startParticipantsVideo: meeting.startParticipantsVideo,
          allowJoinBeforeHost: meeting.allowJoinBeforeHost,
          audioOptions: meeting.audioOptions,
          _saved: meeting._saved
        } : {};
      default:
        return state;
    }
  };
}

exports.default = function (types) {
  return (0, _redux.combineReducers)({
    status: (0, _getModuleStatusReducer2.default)(types),
    meeting: getMeetingInfoReducer(types),
    schedulingStatus: getMeetingSchedulingStatusReducer(types)
  });
};
//# sourceMappingURL=getMeetingReducer.js.map
