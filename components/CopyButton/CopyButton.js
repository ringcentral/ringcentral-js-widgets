"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _IconButton = require("@ringcentral/juno/es6/components/Buttons/IconButton/IconButton.js");

var _Copy = _interopRequireDefault(require("@ringcentral/juno/es6/icon/Copy.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var CopyButton = function CopyButton(_ref) {
  var executeCopy = _ref.executeCopy;
  return /*#__PURE__*/_react["default"].createElement(_IconButton.RcIconButton, {
    onClick: executeCopy,
    symbol: _Copy["default"],
    size: "small"
  });
};

var _default = CopyButton;
exports["default"] = _default;
//# sourceMappingURL=CopyButton.js.map
