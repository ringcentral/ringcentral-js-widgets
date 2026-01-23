"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Drawer = void 0;
var _springUi = require("@ringcentral/spring-ui");
var _clsx = _interopRequireDefault(require("clsx"));
var _framerMotion = require("framer-motion");
var _react = _interopRequireWildcard(require("react"));
var _excluded = ["open", "onClose", "children", "onKeyDown", "onEscapeKeyDown", "disableEscapeKeyDown", "disablePortal", "container", "disableRestoreFocus", "backdropProps", "bodyProps", "disableBackdropAnimation", "onExitComplete"];
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
// TODO: spring-ui still not have drawer component, so we use a custom drawer component
var Drawer = exports.Drawer = function Drawer(_ref) {
  var open = _ref.open,
    onClose = _ref.onClose,
    children = _ref.children,
    _onKeyDown = _ref.onKeyDown,
    onEscapeKeyDown = _ref.onEscapeKeyDown,
    disableEscapeKeyDown = _ref.disableEscapeKeyDown,
    disablePortal = _ref.disablePortal,
    container = _ref.container,
    disableRestoreFocus = _ref.disableRestoreFocus,
    backdropProps = _ref.backdropProps,
    bodyProps = _ref.bodyProps,
    disableBackdropAnimation = _ref.disableBackdropAnimation,
    onExitComplete = _ref.onExitComplete,
    rest = _objectWithoutProperties(_ref, _excluded);
  (0, _react.useEffect)(function () {
    if (open) {
      setShouldRender(true);
    } else {
      if (disableBackdropAnimation) {
        setShouldRender(false);
      }
    }
  }, [open, disableBackdropAnimation]);
  var prevOpen = (0, _springUi.usePrevious)(function () {
    return open;
  });
  var _useState = (0, _react.useState)(open),
    _useState2 = _slicedToArray(_useState, 2),
    shouldRender = _useState2[0],
    setShouldRender = _useState2[1];
  (0, _react.useEffect)(function () {
    if (prevOpen && !open) {
      onClose === null || onClose === void 0 ? void 0 : onClose({}, 'closeButtonClick');
    }
  }, [prevOpen, open, onClose]);
  var onAnimationComplete = function onAnimationComplete(e) {
    if (!open) {
      onExitComplete === null || onExitComplete === void 0 ? void 0 : onExitComplete();
      setShouldRender(false);
    }
  };
  return shouldRender ? /*#__PURE__*/_react["default"].createElement(_springUi.Portal, {
    disablePortal: disablePortal,
    container: container
  }, /*#__PURE__*/_react["default"].createElement(_framerMotion.motion.div, _extends({
    className: "fixed inset-0 z-drawer flex items-end justify-center",
    role: "presentation"
  }, rest), /*#__PURE__*/_react["default"].createElement("div", _extends({
    "aria-hidden": true,
    "data-sign": "backdrop",
    className: (0, _clsx["default"])('absolute inset-0 bg-neutral-b0/50 transition-opacity duration-300', open ? 'opacity-100' : 'opacity-0'),
    onClick: function onClick(e) {
      return onClose === null || onClose === void 0 ? void 0 : onClose(e, 'backdropClick');
    }
  }, backdropProps)), /*#__PURE__*/_react["default"].createElement(_springUi.SlideIn, {
    toggle: open,
    from: "bottom",
    className: "w-full",
    onAnimationComplete: onAnimationComplete
  }, /*#__PURE__*/_react["default"].createElement("div", _extends({
    role: "dialog",
    "aria-modal": "true",
    className: 'relative w-full bg-neutral-base rounded-t-lg shadow-lg transform transition-transform duration-300 ease-out',
    style: {
      maxHeight: '80vh'
    },
    onKeyDown: function onKeyDown(e) {
      _onKeyDown === null || _onKeyDown === void 0 ? void 0 : _onKeyDown(e);
      if (!disableEscapeKeyDown && e.key === 'Escape') {
        onEscapeKeyDown === null || onEscapeKeyDown === void 0 ? void 0 : onEscapeKeyDown(e);
        onClose === null || onClose === void 0 ? void 0 : onClose(e, 'escapeKeyDown');
      }
    }
  }, bodyProps), /*#__PURE__*/_react["default"].createElement(_springUi.FocusTrap, {
    open: open,
    disableRestoreFocus: disableRestoreFocus
  }, /*#__PURE__*/_react["default"].createElement("div", {
    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
    tabIndex: 0,
    className: "overflow-y-auto"
  }, children)))))) : null;
};
//# sourceMappingURL=Drawer.js.map
