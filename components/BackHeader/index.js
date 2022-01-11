"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _DynamicsFont = _interopRequireDefault(require("../../assets/DynamicsFont/DynamicsFont.scss"));

var _Header = require("../Header");

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var BackHeader = function BackHeader(props) {
  var buttons = props.buttons || [];

  var defaultBackButton = /*#__PURE__*/_react["default"].createElement("i", {
    "data-sign": "backButton",
    className: (0, _classnames["default"])(_DynamicsFont["default"].arrow, _styles["default"].iconRotate)
  });

  buttons.push({
    label: props.backButton || defaultBackButton,
    onClick: props.onBackClick,
    placement: 'left'
  });
  return /*#__PURE__*/_react["default"].createElement(_Header.Header, {
    buttons: buttons,
    className: props.className
  }, props.children);
};

BackHeader.defaultProps = {
  className: '',
  children: undefined,
  buttons: undefined,
  backButton: undefined,
  onBackClick: undefined
};
var _default = BackHeader;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
