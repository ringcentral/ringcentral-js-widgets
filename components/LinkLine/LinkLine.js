"use strict";

require("core-js/modules/es.array.index-of");
require("core-js/modules/es.string.link");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireDefault(require("react"));
var _DynamicsFont = _interopRequireDefault(require("../../assets/DynamicsFont/DynamicsFont.scss"));
var _IconLine = _interopRequireDefault(require("../IconLine"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) { ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) { o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) { if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } } return t; }
var LinkLine = function LinkLine(_ref) {
  var _onClick = _ref.onClick,
    className = _ref.className,
    children = _ref.children,
    _ref$hideUnderline = _ref.hideUnderline,
    hideUnderline = _ref$hideUnderline === void 0 ? false : _ref$hideUnderline,
    hrefClassName = _ref.hrefClassName,
    iconClassName = _ref.iconClassName,
    tooltip = _ref.tooltip,
    dataSign = _ref.dataSign,
    pendoSignName = _ref.pendoSignName,
    rest = _objectWithoutProperties(_ref, ["onClick", "className", "children", "hideUnderline", "hrefClassName", "iconClassName", "tooltip", "dataSign", "pendoSignName"]);
  return /*#__PURE__*/_react["default"].createElement("a", _extends({
    onClick: function onClick(e) {
      e.preventDefault();
      _onClick();
    },
    title: tooltip,
    className: (0, _clsx["default"])(_styles["default"].link, hrefClassName),
    style: hideUnderline ? {
      textDecoration: 'none'
    } : {},
    "data-sign": dataSign || undefined,
    "data-pendo": pendoSignName || undefined
  }, rest), /*#__PURE__*/_react["default"].createElement(_IconLine["default"], {
    className: className,
    icon: /*#__PURE__*/_react["default"].createElement("span", {
      className: (0, _clsx["default"])(_DynamicsFont["default"].arrow, _styles["default"].icon, iconClassName)
    })
  }, children));
};
var _default = LinkLine;
exports["default"] = _default;
//# sourceMappingURL=LinkLine.js.map
