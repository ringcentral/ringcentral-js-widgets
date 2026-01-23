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
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.freeze.js");
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
exports.NavButton = void 0;
var _combineProps = require("@ringcentral/juno/es6/foundation/utils/combineProps.js");
var _Badge = require("@ringcentral/juno/es6/components/Badge/Badge.js");
var _classes = require("@ringcentral/juno/es6/foundation/utils/classes.js");
var _Icon = require("@ringcentral/juno/es6/components/Icon/Icon.js");
var _styledComponents = _interopRequireDefault(require("@ringcentral/juno/es6/foundation/styled-components.js"));
var _react = _interopRequireWildcard(require("react"));
var _Tooltip = require("../../Tooltip");
var _styles = require("./styles");
var _templateObject;
var _excluded = ["active", "activeSymbol", "symbol", "title", "dataSign", "onClick", "className", "id", "to", "BadgeProps", "TooltipProps"];
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var IntBadgeClasses = (0, _classes.RcClasses)(['badge'], 'Int');
var _NavButton = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var active = _ref.active,
    activeSymbol = _ref.activeSymbol,
    symbol = _ref.symbol,
    title = _ref.title,
    dataSign = _ref.dataSign,
    _onClick = _ref.onClick,
    className = _ref.className,
    id = _ref.id,
    to = _ref.to,
    BadgeProps = _ref.BadgeProps,
    TooltipProps = _ref.TooltipProps,
    rest = _objectWithoutProperties(_ref, _excluded);
  var currentIcon = active ? activeSymbol : symbol;
  var badgeClasses = (0, _react.useMemo)(function () {
    return (0, _combineProps.combineClasses)(_objectSpread(_objectSpread({}, IntBadgeClasses), {}, {
      // TODO: wait Juno fix, then that can be removed
      badge: "RcBadge-badge ".concat(IntBadgeClasses.badge)
    }), _objectSpread({}, BadgeProps === null || BadgeProps === void 0 ? void 0 : BadgeProps.classes));
  }, [BadgeProps]);
  return /*#__PURE__*/_react["default"].createElement(_Tooltip.Tooltip, _extends({
    title: title
  }, TooltipProps), /*#__PURE__*/_react["default"].createElement("button", _extends({
    ref: ref,
    type: "button",
    onClick: function onClick(e) {
      return _onClick === null || _onClick === void 0 ? void 0 : _onClick(e, to);
    },
    className: className,
    id: id,
    "data-sign": dataSign
  }, rest), /*#__PURE__*/_react["default"].createElement(_Badge.RcBadge, _extends({
    color: "danger.b03"
  }, BadgeProps, {
    classes: badgeClasses
  }), /*#__PURE__*/_react["default"].createElement(_Icon.RcIcon, {
    symbol: currentIcon,
    size: "medium"
  }))));
});
var NavButton = exports.NavButton = (0, _styledComponents["default"])(_NavButton)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  ", ";\n\n  ", " {\n    .", " {\n      height: 1.4em;\n      min-width: 1.4em;\n      margin-top: 3px;\n    }\n  }\n"])), _styles.navButtonStyle, _Badge.RcBadge, IntBadgeClasses.badge);
//# sourceMappingURL=NavButton.js.map
