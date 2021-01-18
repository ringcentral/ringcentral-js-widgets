"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchPanel = void 0;

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.array.filter");

var _Search = _interopRequireDefault(require("@ringcentral/juno/icon/Search"));

var _react = _interopRequireWildcard(require("react"));

var _juno = require("@ringcentral/juno");

var _classnames = _interopRequireDefault(require("classnames"));

var _SearchResult = require("./SearchResult");

var _contexts = require("../../contexts");

var _styles = _interopRequireDefault(require("./styles.scss"));

var _i18n = _interopRequireDefault(require("./i18n"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var SearchPanel = function SearchPanel(_ref) {
  var placeholder = _ref.placeholder,
      options = _ref.options,
      searchOption = _ref.searchOption,
      currentLocale = _ref.currentLocale,
      renderListItem = _ref.renderListItem,
      renderList = _ref.renderList,
      classes = _ref.classes;

  var _useState = (0, _react.useState)(null),
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
  }, placeholder || _i18n["default"].getString('search', currentLocale)), /*#__PURE__*/_react["default"].createElement(_juno.RcOutlineTextField, {
    size: "small",
    radiusType: "circle",
    iconPosition: "left",
    symbol: _Search["default"],
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
SearchPanel.defaultProps = {
  classes: {}
};
//# sourceMappingURL=SearchPanel.js.map
