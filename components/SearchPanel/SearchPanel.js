"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.array.filter");
require("core-js/modules/es.array.is-array");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchPanel = void 0;
var _react = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
var _contexts = require("../../contexts");
var _i18n = _interopRequireDefault(require("./i18n"));
var _SearchResult = require("./SearchResult");
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
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
    className: (0, _classnames["default"])(_styles["default"].root, classes.root)
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].searchInput, classes.searchInput)
  }, !filter &&
  /*#__PURE__*/
  // IE polyfill
  _react["default"].createElement("span", {
    className: (0, _classnames["default"])(_styles["default"].placeholder, classes.placeholder)
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
    className: (0, _classnames["default"])(_styles["default"].searchResults, classes.searchResults),
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
