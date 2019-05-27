"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMessageSenderStatusReducer = getMessageSenderStatusReducer;
exports["default"] = getMessageSenderReducer;

var _redux = require("redux");

var _getModuleStatusReducer = _interopRequireDefault(require("../../lib/getModuleStatusReducer"));

var _messageSenderStatus = _interopRequireDefault(require("./messageSenderStatus"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getMessageSenderStatusReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _messageSenderStatus["default"].idle;

    var _ref = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref.type;

    switch (type) {
      case types.validate:
        return _messageSenderStatus["default"].validating;

      case types.send:
        return _messageSenderStatus["default"].sending;

      case types.sendOver:
      case types.sendError:
      case types.validateError:
      case types.validateOver:
        return _messageSenderStatus["default"].idle;

      default:
        return state;
    }
  };
}

function getMessageSenderReducer(types) {
  return (0, _redux.combineReducers)({
    status: (0, _getModuleStatusReducer["default"])(types),
    sendStatus: getMessageSenderStatusReducer(types)
  });
}
//# sourceMappingURL=getMessageSenderReducer.js.map
