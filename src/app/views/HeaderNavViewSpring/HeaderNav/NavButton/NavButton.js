"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavButton = void 0;
var _springUi = require("@ringcentral/spring-ui");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _excluded = ["active", "activeSymbol", "symbol", "title", "tooltip", "dataSign", "onClick", "className", "id", "to", "BadgeProps", "TooltipProps"];
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var NavButton = exports.NavButton = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var active = _ref.active,
    activeSymbol = _ref.activeSymbol,
    symbol = _ref.symbol,
    title = _ref.title,
    tooltip = _ref.tooltip,
    dataSign = _ref.dataSign,
    _onClick = _ref.onClick,
    className = _ref.className,
    id = _ref.id,
    to = _ref.to,
    BadgeProps = _ref.BadgeProps,
    TooltipProps = _ref.TooltipProps,
    rest = _objectWithoutProperties(_ref, _excluded);
  var currentIcon = active ? activeSymbol : symbol;
  var Button = /*#__PURE__*/_react["default"].createElement("button", _extends({
    ref: ref,
    type: "button",
    onClick: function onClick(e) {
      return _onClick === null || _onClick === void 0 ? void 0 : _onClick(e, to);
    },
    className: (0, _clsx["default"])('flex flex-col items-center justify-center', active ? 'text-cobranding-f' : 'text-neutral-b0', className),
    id: id,
    "data-sign": dataSign
  }, rest), /*#__PURE__*/_react["default"].createElement("div", {
    className: "relative flex"
  }, /*#__PURE__*/_react["default"].createElement(_springUi.Icon, {
    symbol: currentIcon,
    size: "medium"
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "absolute top-2 left-6"
  }, /*#__PURE__*/_react["default"].createElement(_springUi.Badge, _extends({
    variant: "outlined",
    overlap: "rectangular",
    forceOverlap: true
  }, BadgeProps)))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-10/12 text-ellipsis overflow-hidden typography-mainText"
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: "typography-descriptorMini whitespace-normal text-center",
    title: !tooltip ? title : undefined
  }, title)));
  if (!tooltip) {
    return Button;
  }
  return /*#__PURE__*/_react["default"].createElement(_springUi.Tooltip, _extends({
    title: tooltip
  }, TooltipProps), Button);
});
//# sourceMappingURL=NavButton.js.map
