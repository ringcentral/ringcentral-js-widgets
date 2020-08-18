"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _iconCopy = _interopRequireDefault(require("@ringcentral-integration/rcui/icons/icon-copy.svg"));

var _rcui = require("@ringcentral-integration/rcui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var CopyButton = function CopyButton(_ref) {
  var executeCopy = _ref.executeCopy;
  return /*#__PURE__*/_react["default"].createElement(_rcui.RcIconButton, {
    onClick: executeCopy,
    symbol: _iconCopy["default"],
    size: "small"
  });
};

var _default = CopyButton;
exports["default"] = _default;
//# sourceMappingURL=CopyButton.js.map
