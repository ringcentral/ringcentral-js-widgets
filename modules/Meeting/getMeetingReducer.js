"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMeetingInfoReducer = getMeetingInfoReducer;
exports.getMeetingSchedulingStatusReducer = getMeetingSchedulingStatusReducer;
exports.getMeetingUpdatingStatusReducer = getMeetingUpdatingStatusReducer;
exports.getMeetingStorageReducer = getMeetingStorageReducer;
exports.getDefaultMeetingSettingReducer = getDefaultMeetingSettingReducer;
exports["default"] = void 0;

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.is-array");

var _redux = require("redux");

var _ramda = require("ramda");

var _scheduleStatus = _interopRequireDefault(require("./scheduleStatus"));

var _getModuleStatusReducer = _interopRequireDefault(require("../../lib/getModuleStatusReducer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function getMeetingInfoReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    var _ref = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref.type,
        _ref$meeting = _ref.meeting,
        meeting = _ref$meeting === void 0 ? null : _ref$meeting;

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
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _scheduleStatus["default"].idle;

    var _ref2 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref2.type;

    switch (type) {
      case types.initScheduling:
        return _scheduleStatus["default"].scheduling;

      case types.scheduled:
        return _scheduleStatus["default"].scheduled;

      case types.resetScheduling:
        return _scheduleStatus["default"].idle;

      default:
        return state;
    }
  };
}

function getMeetingUpdatingStatusReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    var _ref3 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref3.type,
        meetingId = _ref3.meetingId;

    switch (type) {
      case types.initUpdating:
        return [].concat(_toConsumableArray(state), [{
          // using object type for further recording
          meetingId: meetingId
        }]);

      case types.updated:
      case types.resetUpdating:
        return (0, _ramda.filter)(function (obj) {
          return obj.meetingId !== meetingId;
        }, state);

      default:
        return state;
    }
  };
}

function getMeetingStorageReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var _ref4 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref4.type,
        _ref4$meeting = _ref4.meeting,
        meeting = _ref4$meeting === void 0 ? null : _ref4$meeting;

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

function getDefaultMeetingSettingReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var _ref5 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref5.type,
        _ref5$meeting = _ref5.meeting,
        meeting = _ref5$meeting === void 0 ? null : _ref5$meeting;

    switch (type) {
      case types.saveAsDefaultSetting:
        {
          return meeting ? {
            startHostVideo: !!meeting.startHostVideo,
            startParticipantsVideo: !!meeting.startParticipantsVideo,
            allowJoinBeforeHost: !!meeting.allowJoinBeforeHost,
            audioOptions: meeting.audioOptions,
            _saved: !!meeting._saved,
            password: meeting.password,
            _requireMeetingPassword: !!meeting._requireMeetingPassword
          } : {};
        }

      default:
        return state;
    }
  };
}

var _default = function _default(types, reducers) {
  return (0, _redux.combineReducers)(_objectSpread({}, reducers, {
    status: (0, _getModuleStatusReducer["default"])(types),
    meeting: getMeetingInfoReducer(types),
    schedulingStatus: getMeetingSchedulingStatusReducer(types),
    updatingStatus: getMeetingUpdatingStatusReducer(types)
  }));
};

exports["default"] = _default;
//# sourceMappingURL=getMeetingReducer.js.map
