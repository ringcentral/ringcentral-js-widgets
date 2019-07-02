"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasLimitedStatusErrorReducer = hasLimitedStatusErrorReducer;
exports.isLimitedModeReducer = isLimitedModeReducer;
exports.isVoIPOnlyModeReducer = isVoIPOnlyModeReducer;
exports["default"] = AvailabilityMonitorReducer;

var _redux = require("redux");

var _getModuleStatusReducer = _interopRequireDefault(require("../../lib/getModuleStatusReducer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function hasLimitedStatusErrorReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    var _ref = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref.type;

    switch (type) {
      case types.limitedModeStatusError:
        {
          return true;
        }

      case types.normalMode:
        {
          return false;
        }

      default:
        return state;
    }
  };
}

function isLimitedModeReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    var _ref2 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref2.type;

    switch (type) {
      case types.limitedMode:
        {
          return true;
        }

      case types.normalMode:
        {
          return false;
        }

      default:
        return state;
    }
  };
}

function isVoIPOnlyModeReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    var _ref3 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref3.type;

    switch (type) {
      case types.VoIPOnlyMode:
        {
          return true;
        }

      case types.VoIPOnlyReset:
        {
          return false;
        }

      case types.normalMode:
        {
          return false;
        }

      default:
        return state;
    }
  };
}

function AvailabilityMonitorReducer(types) {
  return (0, _redux.combineReducers)({
    status: (0, _getModuleStatusReducer["default"])(types),
    hasLimitedStatusError: hasLimitedStatusErrorReducer(types),
    isLimitedMode: isLimitedModeReducer(types),
    isVoIPOnlyMode: isVoIPOnlyModeReducer(types)
  });
}
//# sourceMappingURL=availabilityMonitorReducer.js.map
