"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FileName = void 0;
var _react = _interopRequireDefault(require("react"));
var _TextMiddleEllipsis = require("./TextMiddleEllipsis");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var FileName = exports.FileName = function FileName(_ref) {
  var fileName = _ref.fileName;
  return /*#__PURE__*/_react["default"].createElement(_TextMiddleEllipsis.TextMiddleEllipsis, {
    className: "text-neutral-b0 typography-mainText"
  }, fileName);
};
//# sourceMappingURL=FileName.js.map
