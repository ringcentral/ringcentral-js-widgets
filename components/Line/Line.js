"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Line = void 0;
var _springUi = require("@ringcentral/spring-ui");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireDefault(require("react"));
var _excluded = ["className", "onClick", "children", "divider", "component", "icon", "classes", "endAdornment", "title", "hintText"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var _Line = function _Line(_ref) {
  var className = _ref.className,
    onClick = _ref.onClick,
    children = _ref.children,
    _ref$divider = _ref.divider,
    divider = _ref$divider === void 0 ? true : _ref$divider,
    component = _ref.component,
    icon = _ref.icon,
    classes = _ref.classes,
    _ref$endAdornment = _ref.endAdornment,
    endAdornment = _ref$endAdornment === void 0 ? icon : _ref$endAdornment,
    title = _ref.title,
    hintText = _ref.hintText,
    rest = _objectWithoutProperties(_ref, _excluded);
  var Component = component !== null && component !== void 0 ? component : onClick ? 'button' : 'div';
  return /*#__PURE__*/_react["default"].createElement(Component, _extends({
    onClick: onClick,
    className: (0, _clsx["default"])('bg-neutral-b5/90 pl-4 pr-3 py-2 rounded-none w-full min-h-[32px] flex items-center outline-none relative', onClick && 'cursor-pointer hover:bg-neutral-b5/60 focus:bg-neutral-b5/60 active:bg-neutral-b5/80 focus-visible:focus-ring-inset focus-ring-rounded-md', className)
  }, rest), /*#__PURE__*/_react["default"].createElement("div", {
    className: "typography-mainText text-neutral-b0 flex items-center gap-1 overflow-hidden",
    title: title,
    "data-sign": "iconField"
  }, children), /*#__PURE__*/_react["default"].createElement("i", {
    className: "flex-auto"
  }), endAdornment && /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _springUi.twMerge)('flex text-neutral-b2 max-w-[45%]', classes === null || classes === void 0 ? void 0 : classes.endAdornment)
  }, endAdornment), hintText && /*#__PURE__*/_react["default"].createElement(_springUi.Text, {
    "data-sign": "hintText",
    color: "bg-neutral-b2",
    component: "p",
    noWrap: false,
    className: "text-xs font-normal mt-[15px]"
  }, hintText), divider && /*#__PURE__*/_react["default"].createElement("div", {
    "data-divider": true,
    className: "px-3 w-full top-0 left-0 absolute"
  }, /*#__PURE__*/_react["default"].createElement(_springUi.Divider, {
    orientation: "horizontal"
  })));
};
var Line = exports.Line = _Line;
//# sourceMappingURL=Line.js.map
