"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getFeedbackReducer;

var _redux = require("redux");

var _getModuleStatusReducer = _interopRequireDefault(require("../../lib/getModuleStatusReducer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getFeedbackReducer(actionTypes) {
  return (0, _redux.combineReducers)({
    status: (0, _getModuleStatusReducer.default)(actionTypes)
  });
}
//# sourceMappingURL=getFeedbackReducer.js.map
