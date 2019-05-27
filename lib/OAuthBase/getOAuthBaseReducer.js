"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOAuthReadyReducer = getOAuthReadyReducer;
exports["default"] = getOAuthBaseReducer;

var _redux = require("redux");

var _getModuleStatusReducer = _interopRequireDefault(require("ringcentral-integration/lib/getModuleStatusReducer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getOAuthReadyReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    var _ref = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref.type;

    switch (type) {
      case types.setupOAuth:
        return true;

      case types.destroyOAuth:
        return false;

      default:
        return state;
    }
  };
}

function getOAuthBaseReducer(types) {
  return (0, _redux.combineReducers)({
    status: (0, _getModuleStatusReducer["default"])(types),
    oAuthReady: getOAuthReadyReducer(types)
  });
}
//# sourceMappingURL=getOAuthBaseReducer.js.map
