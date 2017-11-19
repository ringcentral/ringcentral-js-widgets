"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDataReducer = getDataReducer;
function getDataReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var _ref = arguments[1];
    var type = _ref.type,
        data = _ref.data;

    switch (type) {
      case types.fetchSuccess:
        return data;
      case types.resetSuccess:
        return null;
      default:
        return state;
    }
  };
}
//# sourceMappingURL=getReducer.js.map
