"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PageHeaderBackButton = exports.PageHeader = void 0;
var _hooks = require("@ringcentral-integration/micro-core/src/app/hooks");
var _springIcon = require("@ringcentral/spring-icon");
var _springUi = require("@ringcentral/spring-ui");
var _react = _interopRequireWildcard(require("react"));
var _i18n = _interopRequireDefault(require("./i18n"));
var _excluded = ["TooltipProps"],
  _excluded2 = ["className", "startAdornment", "endAdornment", "onBackClick", "children", "classes"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var PageHeaderBackButton = exports.PageHeaderBackButton = function PageHeaderBackButton(_ref) {
  var TooltipProps = _ref.TooltipProps,
    rest = _objectWithoutProperties(_ref, _excluded);
  var _useLocale = (0, _hooks.useLocale)(_i18n["default"]),
    t = _useLocale.t;
  return /*#__PURE__*/_react["default"].createElement(_springUi.IconButton, _extends({
    TooltipProps: _objectSpread({
      title: t('back')
    }, TooltipProps),
    symbol: _springIcon.CaretLeftMd,
    color: "secondary",
    variant: "contained",
    "data-sign": "backButton",
    size: "medium"
  }, rest));
};
var PageHeader = exports.PageHeader = /*#__PURE__*/(0, _react.forwardRef)(function (_ref2, ref) {
  var className = _ref2.className,
    startAdornment = _ref2.startAdornment,
    endAdornment = _ref2.endAdornment,
    onBackClick = _ref2.onBackClick,
    children = _ref2.children,
    classes = _ref2.classes,
    rest = _objectWithoutProperties(_ref2, _excluded2);
  var startRef = (0, _react.useRef)(null);
  var endRef = (0, _react.useRef)(null);
  (0, _springUi.useResizeObserver)(endRef, function () {
    if (startRef.current && endRef.current) {
      var startWidth = startRef.current.offsetWidth;
      var endWidth = endRef.current.offsetWidth;
      if (startWidth === endWidth) {
        return;
      }
      var maxWidth = Math.max(startWidth, endWidth);
      if (endWidth > startWidth) {
        startRef.current.style.width = "".concat(maxWidth, "px");
      } else {
        endRef.current.style.width = "".concat(maxWidth, "px");
      }
    }
  }, {
    mode: 'throttle'
  });
  return /*#__PURE__*/_react["default"].createElement("div", _extends({
    ref: ref,
    className: (0, _springUi.twMerge)('w-full h-[50px] py-0.5 flex items-center gap-3 justify-between flex-none px-2', className)
  }, rest), /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _springUi.twMerge)('flex justify-start items-center h-full flex-none', classes === null || classes === void 0 ? void 0 : classes.startAdornment),
    ref: startRef
  }, onBackClick && /*#__PURE__*/_react["default"].createElement(PageHeaderBackButton, {
    onClick: onBackClick
  }), startAdornment), children && /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex justify-center flex-auto overflow-hidden typography-subtitle"
  }, children), /*#__PURE__*/_react["default"].createElement("div", {
    ref: endRef,
    className: "flex justify-end items-center h-full flex-none"
  }, endAdornment));
});
//# sourceMappingURL=PageHeader.js.map
