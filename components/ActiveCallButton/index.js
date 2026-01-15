"use strict";

require("core-js/modules/es.array.map");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.regexp.exec");
require("core-js/modules/es.string.replace");
require("core-js/modules/es.string.split");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireDefault(require("react"));
var _CircleButton = _interopRequireDefault(require("../CircleButton"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var ActiveCallButton = function ActiveCallButton(props) {
  var className = (0, _clsx["default"])(_styles["default"].btnSvg, props.className);
  var buttonClassName = (0, _clsx["default"])(_styles["default"].button, props.buttonClassName, props.active ? _styles["default"].buttonActive : null, props.disabled ? _styles["default"].buttonDisabled : null);
  var text = props.title && props.title.split('\n').map(function (line, index) {
    return /*#__PURE__*/_react["default"].createElement("tspan", {
      dy: index ? '1.1em' : 0,
      x: "250",
      key: line,
      "data-sign": line.replace(' ', '_')
    }, line);
  });
  var buttonSize = 383.8;
  return /*#__PURE__*/_react["default"].createElement("svg", {
    className: (0, _clsx["default"])(_styles["default"].svg, className),
    viewBox: "0 0 500 600",
    width: props.width,
    height: props.height,
    x: props.x,
    y: props.y
  }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
    width: buttonSize.toString(),
    height: buttonSize.toString(),
    x: 500 / 2 - buttonSize / 2,
    y: 0,
    className: buttonClassName,
    onClick: props.onClick,
    icon: props.icon,
    disabled: props.disabled,
    showBorder: props.showBorder,
    iconClassName: props.buttonClassName,
    iconWidth: props.iconWidth,
    iconHeight: props.iconHeight,
    iconX: props.iconX,
    iconY: props.iconY,
    showRipple: props.showRipple,
    dataSign: props.dataSign
  }), /*#__PURE__*/_react["default"].createElement("text", {
    className: _styles["default"].buttonTitle,
    x: "250",
    y: "500",
    textAnchor: "middle"
  }, text));
};
ActiveCallButton.defaultProps = {
  className: undefined,
  buttonClassName: undefined,
  onClick: undefined,
  disabled: false,
  active: false,
  icon: undefined,
  showBorder: true,
  width: '100%',
  height: '100%',
  x: 0,
  y: 0,
  iconWidth: undefined,
  iconHeight: undefined,
  iconX: undefined,
  iconY: undefined,
  showRipple: false
};
var _default = ActiveCallButton;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
