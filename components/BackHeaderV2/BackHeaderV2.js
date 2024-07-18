"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.slice");
require("core-js/modules/es.object.define-properties");
require("core-js/modules/es.object.freeze");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
var _clsx2 = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) { ; } } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  max-width: ", "px;\n"]);
  _templateObject = function _templateObject() {
    return data;
  };
  return data;
}
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var initWidth = 67;
var Title = (0, _juno.styled)(_juno.RcTypography)(_templateObject(), function (_ref) {
  var $maxWidth = _ref.$maxWidth;
  return $maxWidth;
});

// TODO: use PageHeader to replace those

var BackHeader = function BackHeader(_ref2) {
  var onBackClick = _ref2.onBackClick,
    _ref2$title = _ref2.title,
    title = _ref2$title === void 0 ? '' : _ref2$title,
    _ref2$rightIcon = _ref2.rightIcon,
    rightIcon = _ref2$rightIcon === void 0 ? null : _ref2$rightIcon,
    className = _ref2.className,
    _ref2$currentLocale = _ref2.currentLocale,
    currentLocale = _ref2$currentLocale === void 0 ? 'en-US' : _ref2$currentLocale,
    _ref2$isWide = _ref2.isWide,
    isWide = _ref2$isWide === void 0 ? true : _ref2$isWide,
    _ref2$backIcon = _ref2.backIcon,
    backIcon = _ref2$backIcon === void 0 ? _junoIcon.ChevronLeft : _ref2$backIcon;
  var _useState = (0, _react.useState)(initWidth),
    _useState2 = _slicedToArray(_useState, 2),
    maxWidth = _useState2[0],
    setMaxWidth = _useState2[1];
  var rightRef = (0, _react.useRef)(null);
  var isClassic = !isWide;
  (0, _react.useEffect)(function () {
    if (isClassic && rightRef.current) {
      // this smallest clientWidth is 62.
      setMaxWidth(initWidth - (rightRef.current.clientWidth - 62));
    }
  }, [currentLocale, isClassic]);
  var rootClass = (0, _clsx2["default"])(_styles["default"].root, isClassic && _styles["default"].classic, className);
  // if right icon is empty then should occupy position to make title actually center align
  var rightIconClass = (0, _clsx2["default"])(_styles["default"].rightIcon, _defineProperty({}, _styles["default"].emptyRightIcon, !rightIcon));
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: rootClass
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcIconButton, {
    className: (0, _clsx2["default"])(_styles["default"].back),
    variant: "round",
    size: "small",
    symbol: backIcon,
    "data-sign": "backButton",
    onClick: onBackClick
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].title,
    "data-sign": "backHeaderTitle"
  }, title ? /*#__PURE__*/_react["default"].createElement(Title, {
    color: "neutral.f06",
    variant: "body2",
    component: "span",
    $maxWidth: isClassic ? maxWidth : undefined,
    title: title
  }, title) : null), /*#__PURE__*/_react["default"].createElement("div", {
    ref: rightRef,
    className: rightIconClass
  }, rightIcon));
};
var _default = BackHeader;
exports["default"] = _default;
//# sourceMappingURL=BackHeaderV2.js.map
