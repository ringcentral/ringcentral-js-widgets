"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomArrowButton = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _rcui = require("@ringcentral-integration/rcui");

var _react = _interopRequireDefault(require("react"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var CustomArrowButton = function CustomArrowButton(_ref) {
  var disabled = _ref.disabled,
      onClick = _ref.onClick,
      rotate = _ref.rotate;
  return _react["default"].createElement(_rcui.RcIconButton, {
    "data-sign": "arrow_icon",
    className: _styles["default"].button,
    style: {
      transform: "rotate(".concat(rotate, "deg)")
    },
    variant: "round",
    size: "medium",
    disabled: disabled,
    icon: "arrow_right",
    onClick: onClick
  });
};

exports.CustomArrowButton = CustomArrowButton;
CustomArrowButton.propTypes = {
  rotate: _propTypes["default"].number,
  disabled: _propTypes["default"].bool,
  onClick: _propTypes["default"].func
};
CustomArrowButton.defaultProps = {
  rotate: 0,
  disabled: false,
  onClick: function onClick() {}
};
//# sourceMappingURL=CustomButton.js.map
