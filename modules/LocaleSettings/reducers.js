"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSavedLocaleReducer = getSavedLocaleReducer;

function getSavedLocaleReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    var _ref = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref.type,
        locale = _ref.locale;

    if (type === types.saveLocale) {
      return locale;
    }

    return state;
  };
}
//# sourceMappingURL=reducers.js.map
