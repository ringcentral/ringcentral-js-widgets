"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createSimpleReducer;
function createSimpleReducer(type, data) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var action = arguments.length > 1 ? arguments[1] : undefined;
    if (action.type === type) return action[data];
    return state;
  };
}
//# sourceMappingURL=createSimpleReducer.js.map
