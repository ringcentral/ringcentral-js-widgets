"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var CopyButton = function CopyButton(_ref) {
  var executeCopy = _ref.executeCopy;
  return /*#__PURE__*/_react["default"].createElement(_juno.RcIconButton, {
    onClick: executeCopy,
    symbol: _junoIcon.Copy,
    size: "small"
  });
};
var _default = exports["default"] = CopyButton;
//# sourceMappingURL=CopyButton.js.map
