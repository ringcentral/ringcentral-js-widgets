"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserMediaReducer = getUserMediaReducer;
exports.default = getCallingSettingsReducer;

var _redux = require("redux");

var _getModuleStatusReducer = _interopRequireDefault(require("../../lib/getModuleStatusReducer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getAvailableDevicesReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    var _ref = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref.type,
        _ref$devices = _ref.devices,
        devices = _ref$devices === void 0 ? [] : _ref$devices;

    switch (type) {
      case types.setAvailableDevices:
        return devices;

      case types.getUserMediaError:
      case types.reset:
        return [];

      default:
        return state;
    }
  };
}

function getUserMediaReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    var _ref2 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref2.type;

    switch (type) {
      case types.getUserMediaSuccess:
        return true;

      case types.getUserMediaError:
        return false;

      default:
        return state;
    }
  };
}

function getCallingSettingsReducer(types) {
  return (0, _redux.combineReducers)({
    status: (0, _getModuleStatusReducer.default)(types),
    availableDevices: getAvailableDevicesReducer(types),
    userMedia: getUserMediaReducer(types)
  });
}
//# sourceMappingURL=getAudioSettingsReducer.js.map
