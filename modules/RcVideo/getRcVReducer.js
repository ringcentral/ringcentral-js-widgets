"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRcVideoInfoReducer = getRcVideoInfoReducer;
exports.getRcVideoCreatingStatusReducer = getRcVideoCreatingStatusReducer;
exports.getDefaultVideoSettingReducer = getDefaultVideoSettingReducer;
exports.getPersonalMeetingReducer = getPersonalMeetingReducer;
exports.getLastVideoStorageReducer = getLastVideoStorageReducer;
exports["default"] = void 0;

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

var _redux = require("redux");

var _getModuleStatusReducer = _interopRequireDefault(require("../../lib/getModuleStatusReducer"));

var _createStatus = _interopRequireDefault(require("./createStatus"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getRcVideoInfoReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

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

function getRcVideoCreatingStatusReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _createStatus["default"].idle;

    var _ref2 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref2.type;

    switch (type) {
      case types.initCreating:
        return _createStatus["default"].creating;

      case types.created:
        return _createStatus["default"].created;

      case types.resetCreating:
        return _createStatus["default"].idle;

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

      default:
        return state;
    }
  };
}

function getLastVideoStorageReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var _ref5 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref5.type,
        _ref5$meeting = _ref5.meeting,
        meeting = _ref5$meeting === void 0 ? null : _ref5$meeting;

    switch (type) {
      case types.saveLastVideoSetting:
        return _objectSpread(_objectSpread({}, state), meeting);

      default:
        return state;
    }
  };
}

var _default = function _default(types, reducers) {
  return (0, _redux.combineReducers)(_objectSpread(_objectSpread({}, reducers), {}, {
    meeting: getRcVideoInfoReducer(types),
    status: (0, _getModuleStatusReducer["default"])(types),
    creatingStatus: getRcVideoCreatingStatusReducer(types)
  }));
};

exports["default"] = _default;
//# sourceMappingURL=getRcVReducer.js.map
