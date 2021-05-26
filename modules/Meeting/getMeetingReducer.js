"use strict";

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.array.filter");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMeetingInfoReducer = getMeetingInfoReducer;
exports.getMeetingSchedulingStatusReducer = getMeetingSchedulingStatusReducer;
exports.getMeetingUpdatingStatusReducer = getMeetingUpdatingStatusReducer;
exports.getMeetingStorageReducer = getMeetingStorageReducer;
exports.getDefaultMeetingSettingReducer = getDefaultMeetingSettingReducer;
exports.getMeetingPreferencesReducer = getMeetingPreferencesReducer;
exports.getMeetingPreferencesStateReducer = getMeetingPreferencesStateReducer;
exports.getUserSettingsReducer = getUserSettingsReducer;
exports.getLockedSettingsReducer = getLockedSettingsReducer;
exports.getPersonalMeetingReducer = getPersonalMeetingReducer;
exports.getDelegatorsReducer = getDelegatorsReducer;
exports["default"] = void 0;

var _redux = require("redux");

var _ramda = require("ramda");

var _scheduleStatus = _interopRequireDefault(require("./scheduleStatus"));

var _getModuleStatusReducer = _interopRequireDefault(require("../../lib/getModuleStatusReducer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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

function getMeetingPreferencesReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var _ref6 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref6.type,
        preferences = _ref6.preferences;

    switch (type) {
      case types.updateMeetingPreferences:
        return preferences;

      default:
        return state;
    }
  };
}

function getMeetingPreferencesStateReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    var _ref7 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref7.type,
        isPreferencesChanged = _ref7.isPreferencesChanged;

    switch (type) {
      case types.saveMeetingPreferencesState:
        return isPreferencesChanged;

      default:
        return state;
    }
  };
}

function getUserSettingsReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var _ref8 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref8.type,
        userSettings = _ref8.userSettings;

    switch (type) {
      case types.updateUserSettings:
        return userSettings;

      default:
        return state;
    }
  };
}

function getLockedSettingsReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var _ref9 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref9.type,
        lockedSettings = _ref9.lockedSettings;

    switch (type) {
      case types.updateLockedSettings:
        return lockedSettings;

      default:
        return state;
    }
  };
}

function getPersonalMeetingReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    var _ref10 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref10.type,
        _ref10$meeting = _ref10.meeting,
        meeting = _ref10$meeting === void 0 ? null : _ref10$meeting;

    switch (type) {
      case types.updatePersonalMeeting:
        return meeting;

      case types.resetPersonalMeeting:
        return {};

      default:
        return state;
    }
  };
}

function getDelegatorsReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    var _ref11 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref11.type,
        _ref11$delegators = _ref11.delegators,
        delegators = _ref11$delegators === void 0 ? [] : _ref11$delegators;

    switch (type) {
      case types.updateDelegatorList:
        return delegators;

      default:
        return state;
    }
  };
}

var _default = function _default(types, reducers) {
  return (0, _redux.combineReducers)(_objectSpread(_objectSpread({}, reducers), {}, {
    status: (0, _getModuleStatusReducer["default"])(types),
    meeting: getMeetingInfoReducer(types),
    delegators: getDelegatorsReducer(types),
    schedulingStatus: getMeetingSchedulingStatusReducer(types),
    updatingStatus: getMeetingUpdatingStatusReducer(types),
    preferences: getMeetingPreferencesReducer(types),
    isPreferencesChanged: getMeetingPreferencesStateReducer(types),
    userSettings: getUserSettingsReducer(types),
    lockedSettings: getLockedSettingsReducer(types)
  }));
};

exports["default"] = _default;
//# sourceMappingURL=getMeetingReducer.js.map
