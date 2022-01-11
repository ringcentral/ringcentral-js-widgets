"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getDataReducer;
exports.getAutoLogReducer = getAutoLogReducer;

var _redux = require("redux");

function getAutoLogReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    var _ref = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref.type,
        autoLog = _ref.autoLog;

    if (type === types.setAutoLog) return !!autoLog;
    return state;
  };
}

function getDataReducer(types) {
  return (0, _redux.combineReducers)({
    autoLog: getAutoLogReducer(types)
  });
}
//# sourceMappingURL=getDataReducer.js.map
