"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getModuleStatusReducer = exports["default"] = getModuleStatusReducer;
var _moduleStatuses = _interopRequireDefault(require("../../enums/moduleStatuses"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function getModuleStatusReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _moduleStatuses["default"].pending;
    var _ref = arguments.length > 1 ? arguments[1] : undefined,
      type = _ref.type;
    switch (type) {
      case types.init:
        return _moduleStatuses["default"].initializing;
      case types.initSuccess:
        return _moduleStatuses["default"].ready;
      case types.reset:
        return _moduleStatuses["default"].resetting;
      case types.resetSuccess:
        return _moduleStatuses["default"].pending;
      default:
        return state;
    }
  };
}
//# sourceMappingURL=index.js.map
