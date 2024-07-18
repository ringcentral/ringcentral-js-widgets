"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.is-array");
require("core-js/modules/es.array.map");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuButton = void 0;
var _juno = require("@ringcentral/juno");
var _react = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) { ; } } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var MenuButton = /*#__PURE__*/(0, _react.memo)(function (_ref) {
  var icon = _ref.icon,
    label = _ref.label,
    disabled = _ref.disabled,
    subMenu = _ref.subMenu,
    dataSign = _ref.dataSign;
  var _useState = (0, _react.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    anchorEl = _useState2[0],
    setAnchorEl = _useState2[1];
  var handleClick = function handleClick(event) {
    setAnchorEl(event.currentTarget);
  };
  var handleClose = function handleClose() {
    setAnchorEl(null);
  };
  var renderMenuItem = function renderMenuItem(_ref2) {
    var icon = _ref2.icon,
      label = _ref2.label,
      disabled = _ref2.disabled,
      action = _ref2.action,
      subMenu = _ref2.subMenu,
      dataSign = _ref2.dataSign;
    var menuIcon = icon && /*#__PURE__*/_react["default"].createElement(_juno.RcIcon, {
      symbol: icon,
      size: "small"
    });
    if (action) {
      return /*#__PURE__*/_react["default"].createElement(_juno.RcMenuItem, {
        onClick: action,
        icon: menuIcon,
        key: label,
        disabled: disabled,
        "data-sign": dataSign
      }, label);
    }
    if (subMenu) {
      return /*#__PURE__*/_react["default"].createElement(_juno.RcSubMenu, {
        title: label,
        icon: menuIcon,
        key: label,
        disabled: disabled,
        "data-sign": dataSign
      }, subMenu.map(renderMenuItem));
    }
  };
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_juno.RcIconButton, {
    onClick: handleClick,
    symbol: icon,
    size: "medium",
    variant: "plain",
    disabled: disabled,
    "data-sign": dataSign
  }), /*#__PURE__*/_react["default"].createElement(_juno.RcMenu, {
    anchorEl: anchorEl,
    keepMounted: true,
    autoClose: true,
    open: Boolean(anchorEl),
    onClose: handleClose
  }, subMenu.map(renderMenuItem)));
});
exports.MenuButton = MenuButton;
//# sourceMappingURL=MenuButton.js.map
