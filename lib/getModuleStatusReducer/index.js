"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getModuleStatusReducer = exports["default"] = getModuleStatusReducer;

var _moduleStatuses = _interopRequireDefault(require("../../enums/moduleStatuses"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
