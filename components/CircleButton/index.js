"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.index-of");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.CircleButtonWithTitle = void 0;
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) { ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) { o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) { if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } } return t; }
var CircleButton = function CircleButton(_ref) {
  var _ref$showBorder = _ref.showBorder,
    showBorder = _ref$showBorder === void 0 ? true : _ref$showBorder,
    _ref$disabled = _ref.disabled,
    disabled = _ref$disabled === void 0 ? false : _ref$disabled,
    _ref$width = _ref.width,
    width = _ref$width === void 0 ? '100%' : _ref$width,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? '100%' : _ref$height,
    _ref$x = _ref.x,
    x = _ref$x === void 0 ? 0 : _ref$x,
    _ref$y = _ref.y,
    y = _ref$y === void 0 ? 0 : _ref$y,
    _ref$iconWidth = _ref.iconWidth,
    iconWidth = _ref$iconWidth === void 0 ? 200 : _ref$iconWidth,
    _ref$iconHeight = _ref.iconHeight,
    iconHeight = _ref$iconHeight === void 0 ? 200 : _ref$iconHeight,
    title = _ref.title,
    _ref$iconX = _ref.iconX,
    iconX = _ref$iconX === void 0 ? 150 : _ref$iconX,
    _ref$iconY = _ref.iconY,
    iconY = _ref$iconY === void 0 ? 150 : _ref$iconY,
    _ref$showRipple = _ref.showRipple,
    showRipple = _ref$showRipple === void 0 ? false : _ref$showRipple,
    iconProp = _ref.icon,
    onClickProp = _ref.onClick,
    iconClassName = _ref.iconClassName,
    dataSign = _ref.dataSign,
    className = _ref.className;
  var icon;
  if (iconProp) {
    var Icon = iconProp;
    icon = /*#__PURE__*/_react["default"].createElement(Icon, {
      className: (0, _clsx["default"])(_styles["default"].icon, iconClassName),
      width: iconWidth,
      height: iconHeight,
      x: iconX,
      y: iconY
    });
  }
  var circleClass = (0, _clsx["default"])(_styles["default"].circle, !showBorder && _styles["default"].noBorder);
  var _onClick = disabled ? null : onClickProp;
  return /*#__PURE__*/_react["default"].createElement("svg", {
    "data-sign": dataSign,
    xmlns: "http://www.w3.org/2000/svg",
    className: (0, _clsx["default"])(_styles["default"].btnSvg, className),
    viewBox: "0 0 500 500",
    "aria-disabled": disabled,
    onClick: function onClick(e) {
      if (
      // Add NODE_ENV as a workaround for integration test env when triggering its events by data-sign
      process.env.NODE_ENV === 'test' || e.target && e.target.tagName !== 'svg') {
        _onClick === null || _onClick === void 0 ? void 0 : _onClick(e);
      }
    },
    width: width,
    height: height,
    x: x,
    y: y
    // TODO: add title to svg for we can check with title
    // @ts-ignore
    ,
    title: title
  }, title ? /*#__PURE__*/_react["default"].createElement("title", null, title) : null, /*#__PURE__*/_react["default"].createElement("g", {
    className: _styles["default"].btnSvgGroup
  }, /*#__PURE__*/_react["default"].createElement("circle", {
    className: circleClass,
    cx: "250",
    cy: "250",
    r: "245"
  }), icon, showRipple ? /*#__PURE__*/_react["default"].createElement("circle", {
    className: _styles["default"].ripple,
    cx: "250",
    cy: "250",
    r: "245"
  }) : null));
};
var _default = CircleButton; // TODO: that component for wrap CircleButton error write way for not support title
exports["default"] = _default;
var CircleButtonWithTitle = /*#__PURE__*/(0, _react.forwardRef)(function (_ref2, ref) {
  var title = _ref2.title,
    rest = _objectWithoutProperties(_ref2, ["title"]);
  return /*#__PURE__*/_react["default"].createElement("span", {
    title: title,
    ref: ref
  }, /*#__PURE__*/_react["default"].createElement(CircleButton, _extends({
    title: title
  }, rest)));
});
exports.CircleButtonWithTitle = CircleButtonWithTitle;
//# sourceMappingURL=index.js.map
