"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actionTypeGenerator = actionTypeGenerator;

function actionTypeGenerator(action) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$useSuccess = _ref.useSuccess,
      useSuccess = _ref$useSuccess === void 0 ? true : _ref$useSuccess,
      _ref$useError = _ref.useError,
      useError = _ref$useError === void 0 ? true : _ref$useError;

  var types = [action];

  if (useSuccess) {
    types.push("".concat(action, "Success"));
  }

  if (useError) {
    types.push("".concat(action, "Error"));
  }

  return types;
}
//# sourceMappingURL=actionTypeGenerator.js.map
