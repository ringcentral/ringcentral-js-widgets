"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomArrowButton = void 0;

var _rcui = require("@ringcentral-integration/rcui");

var _react = _interopRequireDefault(require("react"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var CustomArrowButton = function CustomArrowButton(_ref) {
  var disabled = _ref.disabled,
      onClick = _ref.onClick,
      icon = _ref.icon;
  return _react["default"].createElement(_rcui.RcIconButton, {
    "data-sign": "arrow_icon",
    className: _styles["default"].button,
    variant: "round",
    size: "medium",
    disabled: disabled,
    icon: icon,
    onClick: onClick
  });
};

exports.CustomArrowButton = CustomArrowButton;
CustomArrowButton.defaultProps = {
  disabled: false,
  onClick: function onClick() {},
  icon: 'arrow_right'
};
//# sourceMappingURL=CustomArrowButton.js.map
