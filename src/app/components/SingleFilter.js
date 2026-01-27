"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SingleFilter = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.includes.js");
var _springUi = require("@ringcentral/spring-ui");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var filterButtonStyle = 'sui-filter-button sui-filter-button-root max-w-[120px]';
/**
 * Single filter component with more menu button
 *
 * for replace the spring-ui SingleFilter component, which is not working as expected, buggy.
 */
var SingleFilter = exports.SingleFilter = function SingleFilter(_ref) {
  var data = _ref.data,
    value = _ref.value,
    onSelect = _ref.onSelect,
    _ref$visibleCount = _ref.visibleCount,
    visibleCount = _ref$visibleCount === void 0 ? 2 : _ref$visibleCount,
    className = _ref.className,
    MenuProps = _ref.MenuProps,
    MoreButtonProps = _ref.MoreButtonProps;
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    menuOpen = _useState2[0],
    setMenuOpen = _useState2[1];
  var menuButtonRef = (0, _react.useRef)(null);

  // Fix visibleCount when menu opens, until it closes
  var _useState3 = (0, _react.useState)(null),
    _useState4 = _slicedToArray(_useState3, 2),
    fixedVisibleCount = _useState4[0],
    setFixedVisibleCount = _useState4[1];

  // Calculate visible items (follow original data order)
  var visibleItems = (0, _react.useMemo)(function () {
    var visibleItems = data.slice(0, visibleCount);
    if (visibleItems.find(function (item) {
      return item.value === value;
    })) {
      return visibleItems;
    }

    // when not in the visible list, replace end of item to target selected item
    return [].concat(_toConsumableArray(visibleItems.slice(0, -1)), [data.find(function (item) {
      return item.value === value;
    })]);
  }, [data, value, visibleCount]);

  // Calculate hidden items
  var hiddenItems = (0, _react.useMemo)(function () {
    // exclude visible items
    return data.filter(function (item) {
      return !visibleItems.includes(item);
    });
  }, [data, visibleItems]);
  var handleMenuOpen = function handleMenuOpen() {
    setMenuOpen(true);
    // Fix the visible count when menu opens
    if (fixedVisibleCount === null) {
      setFixedVisibleCount(visibleCount);
    }
  };
  var handleMenuClose = function handleMenuClose() {
    var _MenuProps$onClose;
    setMenuOpen(false);
    // Reset fixed visible count when menu closes
    setFixedVisibleCount(null);
    // Call the onClose from MenuProps if provided
    MenuProps === null || MenuProps === void 0 ? void 0 : (_MenuProps$onClose = MenuProps.onClose) === null || _MenuProps$onClose === void 0 ? void 0 : _MenuProps$onClose.call(MenuProps, {}, 'backdropClick');
  };
  var handleItemClick = function handleItemClick(itemValue) {
    onSelect(itemValue);
    handleMenuClose();
  };
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx["default"])('sui-single-filter sui-single-filter-root', className)
  }, visibleItems.map(function (item) {
    return /*#__PURE__*/_react["default"].createElement("button", {
      key: item.value,
      className: (0, _clsx["default"])(filterButtonStyle, value === item.value && 'sui-selected'),
      title: item.label,
      "aria-current": value === item.value,
      type: "button",
      onClick: function onClick() {
        return handleItemClick(item.value);
      },
      "data-sign": "filter-".concat(item.value)
    }, item.label);
  }), hiddenItems.length > 0 && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_springUi.IconButton, _extends({
    ref: menuButtonRef,
    shape: "squircle",
    variant: "contained",
    size: "small",
    color: "secondary",
    background: false,
    className: "sui-single-filter-more",
    onClick: handleMenuOpen,
    "aria-expanded": menuOpen,
    "data-prevent-blur": "true"
  }, MoreButtonProps), /*#__PURE__*/_react["default"].createElement(_springUi.ExpandCollapseCaret, {
    orientation: "vertical",
    expanded: menuOpen
  })), /*#__PURE__*/_react["default"].createElement(_springUi.Menu, _extends({
    anchorEl: menuButtonRef.current,
    open: menuOpen
  }, MenuProps, {
    onClose: handleMenuClose
  }), /*#__PURE__*/_react["default"].createElement(_springUi.MenuList, null, hiddenItems.map(function (item) {
    return /*#__PURE__*/_react["default"].createElement(_springUi.MenuItem, {
      key: item.value,
      selected: value === item.value,
      onClick: function onClick() {
        return handleItemClick(item.value);
      },
      title: item.label
    }, item.label);
  })))));
};
//# sourceMappingURL=SingleFilter.js.map
