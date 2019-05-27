"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getChangeCounterReducer = getChangeCounterReducer;
exports.getServerReducer = getServerReducer;
exports.getRecordingHostReducer = getRecordingHostReducer;
exports.getEnabledReducer = getEnabledReducer;
exports["default"] = getEnvironmentReducer;

var _redux = require("redux");

var _getModuleStatusReducer = _interopRequireDefault(require("../../lib/getModuleStatusReducer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getChangeCounterReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    var _ref = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref.type,
        environmentChanged = _ref.environmentChanged;

    if (type === types.setData && environmentChanged) return state + 1;
    return state;
  };
}

function getServerReducer(_ref2) {
  var types = _ref2.types,
      defaultServer = _ref2.defaultServer;
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultServer;

    var _ref3 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref3.type,
        server = _ref3.server;

    if (type === types.setData) return server;
    return state;
  };
}

function getRecordingHostReducer(_ref4) {
  var types = _ref4.types,
      defaultRecordingHost = _ref4.defaultRecordingHost;
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultRecordingHost;

    var _ref5 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref5.type,
        recordingHost = _ref5.recordingHost;

    if (type === types.setData) return recordingHost;
    return state;
  };
}

function getEnabledReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    var _ref6 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref6.type,
        enabled = _ref6.enabled;

    if (type === types.setData) return enabled;
    return state;
  };
}

function getEnvironmentReducer(types) {
  return (0, _redux.combineReducers)({
    status: (0, _getModuleStatusReducer["default"])(types),
    changeCounter: getChangeCounterReducer(types)
  });
}
//# sourceMappingURL=getEnvironmentReducer.js.map
