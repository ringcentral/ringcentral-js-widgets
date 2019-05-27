"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getConnectivityReducer = getConnectivityReducer;
exports["default"] = getConnectivityMonitorReducer;

var _redux = require("redux");

var _getModuleStatusReducer = _interopRequireDefault(require("../../lib/getModuleStatusReducer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getConnectivityReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

    var _ref = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref.type;

    switch (type) {
      case types.connectFail:
        return false;

      case types.connectSuccess:
        return true;

      default:
        return state;
    }
  };
}

function getConnectivityMonitorReducer(types) {
  return (0, _redux.combineReducers)({
    status: (0, _getModuleStatusReducer["default"])(types),
    connectivity: getConnectivityReducer(types)
  });
}
//# sourceMappingURL=getConnectivityMonitorReducer.js.map
