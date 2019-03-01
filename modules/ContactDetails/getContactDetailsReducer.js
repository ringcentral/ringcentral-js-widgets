"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getContactSearchConditions = getContactSearchConditions;
exports.default = getContactDetailsReducer;

var _redux = require("redux");

var _getModuleStatusReducer = _interopRequireDefault(require("../../lib/getModuleStatusReducer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getContactSearchConditions(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    var _ref = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref.type,
        condition = _ref.condition;

    switch (type) {
      case types.updateCondition:
        if (condition) return condition;
        return state;

      case types.resetCondition:
        return null;

      default:
        return state;
    }
  };
}

function getContactDetailsReducer(types) {
  return (0, _redux.combineReducers)({
    status: (0, _getModuleStatusReducer.default)(types),
    condition: getContactSearchConditions(types)
  });
}
//# sourceMappingURL=getContactDetailsReducer.js.map
