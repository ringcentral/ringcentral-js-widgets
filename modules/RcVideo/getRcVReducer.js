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

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
exports.getDefaultVideoSettingReducer = getDefaultVideoSettingReducer;
exports.getDelegatorListReducer = getDelegatorListReducer;
exports.getDelegatorReducer = getDelegatorReducer;
exports.getHasSettingChangedReducer = getHasSettingChangedReducer;
exports.getPersonalMeetingReducer = getPersonalMeetingReducer;
exports.getRcVideoInfoReducer = getRcVideoInfoReducer;
exports.getRcVideoPreferencesReducer = getRcVideoPreferencesReducer;
exports.getRcVideoPreferencesStateReducer = getRcVideoPreferencesStateReducer;
exports.getRcVideoSettingLocksReducer = getRcVideoSettingLocksReducer;
exports.getRcVideoStatusReducer = getRcVideoStatusReducer;

require("core-js/modules/es6.object.define-property");

var _redux = require("redux");

var _getModuleStatusReducer = _interopRequireDefault(require("../../lib/getModuleStatusReducer"));

var _videoStatus = require("./videoStatus");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getRcVideoInfoReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    var _ref = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref.type,
        _ref$meeting = _ref.meeting,
        meeting = _ref$meeting === void 0 ? null : _ref$meeting,
        _ref$patch = _ref.patch,
        patch = _ref$patch === void 0 ? true : _ref$patch;

    switch (type) {
      case types.updateMeetingSettings:
        {
          return patch ? _objectSpread(_objectSpread({}, state), meeting) : meeting;
        }

      default:
        return state;
    }
  };
}

function getRcVideoStatusReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _videoStatus.videoStatus.idle;

    var _ref2 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref2.type;

    switch (type) {
      case types.initSettingsStart:
        return _videoStatus.videoStatus.initializing;

      case types.initSettingsEnd:
        return _videoStatus.videoStatus.initialized;

      case types.initCreating:
        return _videoStatus.videoStatus.creating;

      case types.created:
        return _videoStatus.videoStatus.created;

      case types.initUpdating:
        return _videoStatus.videoStatus.updating;

      case types.updated:
        return _videoStatus.videoStatus.updated;

      case types.resetCreating:
      case types.resetUpdating:
        return _videoStatus.videoStatus.idle;

      default:
        return state;
    }
  };
}

function getDefaultVideoSettingReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var _ref3 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref3.type,
        _ref3$meeting = _ref3.meeting,
        meeting = _ref3$meeting === void 0 ? null : _ref3$meeting;

    switch (type) {
      case types.saveAsDefaultSetting:
        return _objectSpread(_objectSpread({}, state), meeting);

      default:
        return state;
    }
  };
}

function getPersonalMeetingReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    var _ref4 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref4.type,
        _ref4$meeting = _ref4.meeting,
        meeting = _ref4$meeting === void 0 ? null : _ref4$meeting;

    switch (type) {
      case types.savePersonalMeeting:
        return _objectSpread(_objectSpread({}, state), meeting);

      case types.resetPersonalMeeting:
        return {};

      default:
        return state;
    }
  };
}

function getRcVideoSettingLocksReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var _ref5 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref5.type,
        settingLocks = _ref5.settingLocks;

    switch (type) {
      case types.updateMeetingSettingLocks:
        return settingLocks;

      default:
        return state;
    }
  };
}

function getRcVideoPreferencesReducer(types) {
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

function getRcVideoPreferencesStateReducer(types) {
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

function getDelegatorListReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    var _ref8 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref8.type,
        delegators = _ref8.delegators;

    switch (type) {
      case types.updateDelegatorList:
        return delegators;

      default:
        return state;
    }
  };
}

function getDelegatorReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    var _ref9 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref9.type,
        delegator = _ref9.delegator;

    switch (type) {
      case types.updateDelegator:
        return delegator;

      default:
        return state;
    }
  };
}

function getHasSettingChangedReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    var _ref10 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref10.type,
        isChanged = _ref10.isChanged;

    switch (type) {
      case types.saveHasSettingChanged:
        return isChanged;

      default:
        return state;
    }
  };
}

var _default = function _default(types, reducers) {
  return (0, _redux.combineReducers)(_objectSpread(_objectSpread({}, reducers), {}, {
    meeting: getRcVideoInfoReducer(types),
    status: (0, _getModuleStatusReducer["default"])(types),
    videoStatus: getRcVideoStatusReducer(types),
    delegators: getDelegatorListReducer(types),
    preferences: getRcVideoPreferencesReducer(types),
    isPreferencesChanged: getRcVideoPreferencesStateReducer(types),
    settingLocks: getRcVideoSettingLocksReducer(types),
    delegator: getDelegatorReducer(types),
    hasSettingsChanged: getHasSettingChangedReducer(types)
  }));
};

exports["default"] = _default;
//# sourceMappingURL=getRcVReducer.js.map
