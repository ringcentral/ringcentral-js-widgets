"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLastSessionIdReducer = getLastSessionIdReducer;
exports["default"] = getReducer;

var _getReducer = _interopRequireDefault(require("../DialerUI/getReducer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getLastSessionIdReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    var _ref = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref.type,
        sessionId = _ref.sessionId;

    switch (type) {
      case types.setLastSessionId:
        return sessionId;

      case types.resetSuccess:
        return null;

      default:
        return state;
    }
  };
}

function getReducer(types) {
  return (0, _getReducer["default"])(types, {
    lastSessionId: getLastSessionIdReducer(types)
  });
}
//# sourceMappingURL=getReducer.js.map
