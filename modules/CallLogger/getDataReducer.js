'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLogOnRingingReducer = getLogOnRingingReducer;
exports.getAutoLogReducer = getAutoLogReducer;
exports.default = getDataReducer;

var _redux = require('redux');

function getLogOnRingingReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    var _ref = arguments[1];
    var type = _ref.type,
        logOnRinging = _ref.logOnRinging;

    if (type === types.setLogOnRinging) return !!logOnRinging;
    return state;
  };
}

function getAutoLogReducer(types) {
  var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var _ref2 = arguments[1];
    var type = _ref2.type,
        autoLog = _ref2.autoLog;

    if (type === types.setAutoLog) return !!autoLog;
    return state;
  };
}

/* istanbul ignore next */
function getDataReducer(types) {
  var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return (0, _redux.combineReducers)({
    autoLog: getAutoLogReducer(types, initialState.autoLog),
    logOnRinging: getLogOnRingingReducer(types)
  });
}
//# sourceMappingURL=getDataReducer.js.map
