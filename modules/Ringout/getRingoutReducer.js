"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getRingoutReducer;
exports.getRingoutStatusReducer = getRingoutStatusReducer;

var _redux = require("redux");

var _getModuleStatusReducer = _interopRequireDefault(require("../../lib/getModuleStatusReducer"));

var _ringoutStatus = _interopRequireDefault(require("./ringoutStatus"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getRingoutStatusReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _ringoutStatus["default"].idle;

    var _ref = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref.type;

    switch (type) {
      case types.startToConnect:
        return _ringoutStatus["default"].connecting;

      case types.connectSuccess:
      case types.connectError:
        return _ringoutStatus["default"].idle;

      default:
        return state;
    }
  };
}

function getRingoutReducer(types) {
  return (0, _redux.combineReducers)({
    status: (0, _getModuleStatusReducer["default"])(types),
    ringoutStatus: getRingoutStatusReducer(types)
  });
}
//# sourceMappingURL=getRingoutReducer.js.map
