"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isLimitedAvailabilityModeReducer = isLimitedAvailabilityModeReducer;
exports.isAppInitialErrorModeReducer = isAppInitialErrorModeReducer;
exports["default"] = AvailabilityMonitorReducer;

var _redux = require("redux");

var _availabilityStatus = _interopRequireDefault(require("./availabilityStatus"));

var _getModuleStatusReducer = _interopRequireDefault(require("../../lib/getModuleStatusReducer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function isLimitedAvailabilityModeReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      mode: _availabilityStatus["default"].NORMAL
    };

    var _ref = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref.type;

    switch (type) {
      case types.limitedMode:
        {
          return {
            mode: _availabilityStatus["default"].LIMITED
          };
        }

      case types.normalMode:
        {
          return {
            mode: _availabilityStatus["default"].NORMAL
          };
        }

      default:
        return state;
    }
  };
}

function isAppInitialErrorModeReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      mode: _availabilityStatus["default"].NORMAL
    };

    var _ref2 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref2.type;

    switch (type) {
      case types.appInitialError:
        {
          return {
            mode: _availabilityStatus["default"].APP_INITIAL_ERROR
          };
        }

      case types.normalMode:
        {
          return {
            mode: _availabilityStatus["default"].NORMAL
          };
        }

      default:
        return state;
    }
  };
}

function AvailabilityMonitorReducer(types) {
  return (0, _redux.combineReducers)({
    status: (0, _getModuleStatusReducer["default"])(types),
    isLimitedAvailabilityMode: isLimitedAvailabilityModeReducer(types),
    isAppInitialError: isAppInitialErrorModeReducer(types)
  });
}
//# sourceMappingURL=availabilityMonitorReducer.js.map
