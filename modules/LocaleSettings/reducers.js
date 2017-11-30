"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSavedLocaleReducer = getSavedLocaleReducer;
function getSavedLocaleReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var _ref = arguments[1];
    var type = _ref.type,
        locale = _ref.locale;

    if (type === types.saveLocale) {
      return locale;
    }
    return state;
  };
}
//# sourceMappingURL=reducers.js.map
