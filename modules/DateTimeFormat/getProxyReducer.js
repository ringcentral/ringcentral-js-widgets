"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getProxyReducer;

var _redux = require("redux");

var _getProxyStatusReducer = _interopRequireDefault(require("../../lib/getProxyStatusReducer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getProxyReducer(types) {
  return (0, _redux.combineReducers)({
    status: (0, _getProxyStatusReducer["default"])(types)
  });
}
//# sourceMappingURL=getProxyReducer.js.map
