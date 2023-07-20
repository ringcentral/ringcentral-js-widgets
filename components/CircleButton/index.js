"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var CircleButton = function CircleButton(props) {
  var icon;
  if (props.icon) {
    var Icon = props.icon;
    icon = /*#__PURE__*/_react["default"].createElement(Icon, {
      className: (0, _classnames["default"])(_styles["default"].icon, props.iconClassName),
      width: props.iconWidth,
      height: props.iconHeight,
      x: props.iconX,
      y: props.iconY
    });
  }
  var circleClass = (0, _classnames["default"])(_styles["default"].circle, !props.showBorder && _styles["default"].noBorder);
  var _onClick = props.disabled ? null : props.onClick;
  return /*#__PURE__*/_react["default"].createElement("svg", {
    "data-sign": props.dataSign,
    xmlns: "http://www.w3.org/2000/svg",
    className: (0, _classnames["default"])(_styles["default"].btnSvg, props.className),
    viewBox: "0 0 500 500",
    "aria-disabled": props.disabled,
    onClick: function onClick(e) {
      // @ts-expect-error TS(2339): Property 'tagName' does not exist on type 'EventTa... Remove this comment to see the full error message
      if (e.target && e.target.tagName !== 'svg' && _onClick) {
        _onClick(e);
      }
    },
    width: props.width,
    height: props.height,
    x: props.x,
    y: props.y
  }, props.title ? /*#__PURE__*/_react["default"].createElement("title", null, props.title) : null, /*#__PURE__*/_react["default"].createElement("g", {
    className: _styles["default"].btnSvgGroup
  }, /*#__PURE__*/_react["default"].createElement("circle", {
    className: circleClass,
    cx: "250",
    cy: "250",
    r: "245"
  }), icon, props.showRipple ? /*#__PURE__*/_react["default"].createElement("circle", {
    className: _styles["default"].ripple,
    cx: "250",
    cy: "250",
    r: "245"
  }) : null));
};
CircleButton.defaultProps = {
  icon: undefined,
  className: undefined,
  dataSign: undefined,
  showBorder: true,
  iconClassName: undefined,
  disabled: false,
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type '((...args: ... Remove this comment to see the full error message
  onClick: null,
  width: '100%',
  height: '100%',
  x: 0,
  y: 0,
  iconWidth: 200,
  iconHeight: 200,
  iconX: 150,
  iconY: 150,
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
  title: null,
  showRipple: false
};
var _default = CircleButton;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
