"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.index-of");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchSelectField = void 0;
var _CallLogFields = require("@ringcentral-integration/widgets/components/CallLogFields");
var _SelectList = require("@ringcentral-integration/widgets/components/SelectList");
var _juno = require("@ringcentral/juno");
var _react = _interopRequireWildcard(require("react"));
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) { ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } } return n; }, _extends.apply(null, arguments); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) { ; } } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) { o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) { if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } } return t; }
var SearchSelectField = function SearchSelectField(_ref) {
  var listRenderer = _ref.listRenderer,
    input = _ref.input,
    InputProps = _ref.InputProps,
    title = _ref.title,
    open = _ref.open,
    _onBackClick = _ref.onBackClick,
    currentLocale = _ref.currentLocale,
    rest = _objectWithoutProperties(_ref, ["listRenderer", "input", "InputProps", "title", "open", "onBackClick", "currentLocale"]);
  var _useState = (0, _react.useState)(open),
    _useState2 = _slicedToArray(_useState, 2),
    currentOpen = _useState2[0],
    setCurrentOpen = _useState2[1];
  var toggleOpen = function toggleOpen() {
    return setCurrentOpen(!currentOpen);
  };
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, input && /*#__PURE__*/_react["default"].createElement(_CallLogFields.SelectListTextField, _extends({}, InputProps, {
    label: title,
    onClick: function onClick() {
      return toggleOpen();
    }
  })), /*#__PURE__*/_react["default"].createElement(_SelectList.SelectListBasicWithScrollCheck, _extends({}, rest, {
    title: title,
    onBackClick: function onBackClick() {
      toggleOpen();
      _onBackClick();
    },
    placeholder: _i18n["default"].getString('search', currentLocale),
    currentLocale: currentLocale,
    open: currentOpen,
    selectListBasicClassName: _styles["default"].selectListBasic,
    classes: {
      searchInput: _styles["default"].searchInput,
      noResult: _styles["default"].noResult,
      placeholder: _styles["default"].placeholder
    },
    rightIcon: /*#__PURE__*/_react["default"].createElement("div", {
      className: _styles["default"].fillRight
    }),
    backHeaderClassName: _styles["default"].backHeader,
    renderListView: function renderListView(options, type, filter, scrollCheck) {
      return /*#__PURE__*/_react["default"].createElement(_juno.RcList, null, listRenderer(options, scrollCheck, toggleOpen));
    }
  })));
};
exports.SearchSelectField = SearchSelectField;
SearchSelectField.defaultProps = {
  input: false,
  InputProps: {},
  onBackClick: function onBackClick() {}
};
//# sourceMappingURL=SearchSelectField.js.map
