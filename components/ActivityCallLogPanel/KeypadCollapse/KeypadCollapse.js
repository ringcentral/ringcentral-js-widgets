"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.name.js");
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
exports.KeypadCollapse = void 0;
require("core-js/modules/es.array.is-array.js");
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
var _react = _interopRequireWildcard(require("react"));
var _i18n = _interopRequireDefault(require("./i18n"));
var _KeyPadWrapper = require("./styles/KeyPadWrapper");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var KeypadCollapse = exports.KeypadCollapse = function KeypadCollapse(_ref) {
  var currentLocale = _ref.currentLocale,
    isKeypadOpen = _ref.isKeypadOpen,
    keypadValue = _ref.keypadValue,
    setKeypadValue = _ref.setKeypadValue,
    setKeypadIsOpen = _ref.setKeypadIsOpen;
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    keypadOpenHover = _useState2[0],
    setkeypadOpenHover = _useState2[1];
  var _useState3 = (0, _react.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    forceToolTipHide = _useState4[0],
    setForceToolTipHide = _useState4[1];
  return /*#__PURE__*/_react["default"].createElement(_KeyPadWrapper.Wrapper, {
    open: isKeypadOpen
  }, /*#__PURE__*/_react["default"].createElement(_KeyPadWrapper.Backdrop, {
    open: isKeypadOpen,
    "data-sign": "keypadGreyBackground"
  }), /*#__PURE__*/_react["default"].createElement(_KeyPadWrapper.StyledCollapse, {
    "in": isKeypadOpen,
    collapsedHeight: "32px",
    open: isKeypadOpen,
    onEnter: function onEnter() {
      setForceToolTipHide(true);
    },
    onExited: function onExited() {
      setForceToolTipHide(false);
    }
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcPaper, {
    elevation: 0
  }, isKeypadOpen ? /*#__PURE__*/_react["default"].createElement(_KeyPadWrapper.KeyPadCloseButton, null, /*#__PURE__*/_react["default"].createElement(_juno.RcIconButton, {
    "data-sign": "keypadCloseButton",
    variant: "plain",
    size: "medium",
    symbol: _junoIcon.Close,
    title: _i18n["default"].getString('close', currentLocale),
    onClick: function onClick() {
      setKeypadIsOpen(false);
      setkeypadOpenHover(false);
    }
  })) : /*#__PURE__*/_react["default"].createElement(_juno.RcTooltip, {
    placement: "top",
    title: _i18n["default"].getString('keypad', currentLocale),
    open: keypadOpenHover,
    tooltipForceHide: forceToolTipHide
  }, /*#__PURE__*/_react["default"].createElement(_KeyPadWrapper.Footer, {
    onClick: function onClick() {
      if (!isKeypadOpen) {
        setKeypadIsOpen(true);
      }
    },
    onMouseOver: function onMouseOver() {
      if (!isKeypadOpen) {
        setkeypadOpenHover(true);
      }
    },
    onMouseLeave: function onMouseLeave() {
      setkeypadOpenHover(false);
    },
    keypadOpenHover: keypadOpenHover,
    open: isKeypadOpen,
    "data-sign": "keypadOpenButton"
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcIconButton, {
    variant: "plain",
    size: "small",
    symbol: _junoIcon.Keypad
  }))), /*#__PURE__*/_react["default"].createElement(_juno.RcDialer, null, isKeypadOpen && /*#__PURE__*/_react["default"].createElement(_juno.RcDialTextField, {
    "data-sign": "keypadTextField",
    value: keypadValue,
    align: "center",
    textVariant: "subheading1",
    fullWidth: true,
    onlyAllowKeypadValue: true,
    onChange: setKeypadValue,
    autoFocus: isKeypadOpen,
    keypadMode: true,
    onKeyDown: function onKeyDown(e) {
      if (e.key === 'Backspace' || e.key === '-' || e.key === '\\') {
        e.preventDefault();
      }
    }
  }), /*#__PURE__*/_react["default"].createElement(_juno.RcDialPad, {
    sounds: _juno.RcDialerPadSoundsMPEG,
    "data-sign": "keypadCollapse"
  })))));
};
//# sourceMappingURL=KeypadCollapse.js.map
