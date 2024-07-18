"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.filter");
require("core-js/modules/es.array.is-array");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchPanel = void 0;
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _contexts = require("../../contexts");
var _SearchResult = require("./SearchResult");
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) { ; } } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var SearchPanel = function SearchPanel(_ref) {
  var placeholder = _ref.placeholder,
    options = _ref.options,
    searchOption = _ref.searchOption,
    currentLocale = _ref.currentLocale,
    renderListItem = _ref.renderListItem,
    renderList = _ref.renderList,
    _ref$classes = _ref.classes,
    classes = _ref$classes === void 0 ? {} : _ref$classes;
  var _useState = (0, _react.useState)(''),
    _useState2 = _slicedToArray(_useState, 2),
    filter = _useState2[0],
    setFilter = _useState2[1];
  var _useContext = (0, _react.useContext)(_contexts.SelectListContext),
    scrollElmRef = _useContext.scrollElmRef;
  var filteredOptions = filter ? options.filter(function (option) {
    return searchOption(option, filter);
  }) : options;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx["default"])(_styles["default"].root, classes.root)
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx["default"])(_styles["default"].searchInput, classes.searchInput)
  }, !filter &&
  /*#__PURE__*/
  // IE polyfill
  _react["default"].createElement("span", {
    className: (0, _clsx["default"])(_styles["default"].placeholder, classes.placeholder)
  }, placeholder || _i18n["default"].getString('search', currentLocale)), /*#__PURE__*/_react["default"].createElement(_juno.RcTextField, {
    size: "small",
    fullWidth: true,
    variant: "outline",
    radius: "round",
    value: filter,
    InputProps: {
      startAdornment: /*#__PURE__*/_react["default"].createElement(_juno.RcIcon, {
        symbol: _junoIcon.Search,
        size: "small",
        color: "neutral.f04"
      })
    },
    "data-sign": "searchBar",
    onChange: function onChange(event) {
      if (event.target) {
        setFilter(event.target.value || '');
      }
    }
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx["default"])(_styles["default"].searchResults, classes.searchResults),
    ref: scrollElmRef
  }, renderList ? renderList() : /*#__PURE__*/_react["default"].createElement(_SearchResult.SearchResult, {
    options: options,
    filteredOptions: filteredOptions,
    filter: filter,
    currentLocale: currentLocale,
    renderListItem: renderListItem,
    classes: classes.searchResult
  })));
};
exports.SearchPanel = SearchPanel;
//# sourceMappingURL=SearchPanel.js.map
