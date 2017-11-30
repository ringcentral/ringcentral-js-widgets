"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCurrentLocaleReducer = getCurrentLocaleReducer;
exports.getProxyLocaleReducer = getProxyLocaleReducer;
function getCurrentLocaleReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var _ref = arguments[1];
    var type = _ref.type,
        locale = _ref.locale;

    if (type === types.setLocaleSuccess) return locale;
    return state;
  };
}

function getProxyLocaleReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var _ref2 = arguments[1];
    var type = _ref2.type,
        locale = _ref2.locale;

    if (type === types.syncProxyLocale) return locale;
    return state;
  };
}
//# sourceMappingURL=reducers.js.map
