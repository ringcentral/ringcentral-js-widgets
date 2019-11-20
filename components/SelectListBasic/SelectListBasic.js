"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectListBasic = void 0;

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.regexp.search");

require("core-js/modules/es6.array.filter");

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _rcui = require("@ringcentral-integration/rcui");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _BackHeaderV = _interopRequireDefault(require("../BackHeaderV2"));

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var SelectListBasic = function SelectListBasic(_ref) {
  var title = _ref.title,
      options = _ref.options,
      otherOptions = _ref.otherOptions,
      placeholder = _ref.placeholder,
      searchOption = _ref.searchOption,
      rightIcon = _ref.rightIcon,
      matchedTitle = _ref.matchedTitle,
      otherTitle = _ref.otherTitle,
      currentLocale = _ref.currentLocale,
      renderListView = _ref.renderListView,
      open = _ref.open,
      setOpen = _ref.setOpen,
      scrollCheck = _ref.scrollCheck,
      selectListBasicClassName = _ref.selectListBasicClassName,
      backHeaderClassName = _ref.backHeaderClassName,
      listContainerClassName = _ref.listContainerClassName,
      onBackClick = _ref.onBackClick;

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      filter = _useState2[0],
      setFilter = _useState2[1];

  var hasSearch = searchOption && filter;
  var matchOptions = hasSearch ? options.filter(function (option) {
    return searchOption(option, filter);
  }) : options;
  var matchOtherOptions = hasSearch ? otherOptions.filter(function (option) {
    return searchOption(option, filter);
  }) : otherOptions;
  var scrollElmRef = (0, _react.useRef)();
  var matchElmRef = (0, _react.useRef)();
  var hasResult = matchOptions.length + matchOtherOptions.length > 0 || options.length + otherOptions.length === 0;

  var backHeaderOnclick = function backHeaderOnclick() {
    if (onBackClick) {
      return onBackClick();
    }

    setOpen(false);
    setFilter(null);
  };

  return _react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].list, open ? _styles["default"].active : null, selectListBasicClassName)
  }, open ? _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement(_BackHeaderV["default"], {
    currentLocale: currentLocale,
    title: title,
    onBackClick: backHeaderOnclick,
    rightIcon: rightIcon,
    className: backHeaderClassName
  }), _react["default"].createElement("main", {
    "data-sign": "selectList"
  }, _react["default"].createElement("div", {
    className: _styles["default"].search
  }, !filter && _react["default"].createElement("span", {
    className: (0, _classnames["default"])(_styles["default"].placeholder, 'text-ellipsis')
  }, placeholder), _react["default"].createElement(_rcui.RcOutlineTextField, {
    size: "small",
    type: "circle",
    fullWidth: true,
    icon: "search",
    iconSize: "small",
    "data-sign": "searchBar",
    onChange: function onChange(event) {
      if (event.target) {
        var value = event.target.value || '';
        setFilter(value);
      }
    }
  })), _react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].listContainer, listContainerClassName),
    ref: scrollElmRef,
    "data-sign": "searchResult"
  }, hasResult ? _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement("div", {
    ref: matchElmRef,
    className: _styles["default"].text
  }, _react["default"].createElement("div", {
    className: _styles["default"].title
  }, matchedTitle), matchOptions.length > 0 && renderListView(matchOptions, 'matched', filter, function (elm, type) {
    return scrollCheck(scrollElmRef, matchElmRef, elm, type);
  })), _react["default"].createElement("div", {
    className: _styles["default"].text
  }, _react["default"].createElement("div", {
    className: _styles["default"].title
  }, otherTitle), matchOtherOptions.length > 0 && renderListView(matchOtherOptions, 'other', filter, function (elm, type) {
    return scrollCheck(scrollElmRef, matchElmRef, elm, type);
  }))) : _react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].search, _styles["default"].text, 'text-break')
  }, "".concat(_i18n["default"].getString('noResultFoundFor', currentLocale), " '").concat(filter, "'"))))) : null);
};

exports.SelectListBasic = SelectListBasic;
SelectListBasic.propTypes = {
  title: _propTypes["default"].string.isRequired,
  options: _propTypes["default"].arrayOf(_propTypes["default"].object),
  otherOptions: _propTypes["default"].arrayOf(_propTypes["default"].object),
  placeholder: _propTypes["default"].string,
  searchOption: _propTypes["default"].func.isRequired,
  rightIcon: _propTypes["default"].element,
  currentLocale: _propTypes["default"].string.isRequired,
  matchedTitle: _propTypes["default"].string.isRequired,
  otherTitle: _propTypes["default"].string.isRequired,
  renderListView: _propTypes["default"].func,
  open: _propTypes["default"].bool,
  setOpen: _propTypes["default"].func,
  scrollCheck: _propTypes["default"].func,
  selectListBasicClassName: _propTypes["default"].string,
  backHeaderClassName: _propTypes["default"].string,
  listContainerClassName: _propTypes["default"].string,
  onBackClick: _propTypes["default"].func
};
SelectListBasic.defaultProps = {
  options: [],
  otherOptions: [],
  placeholder: '',
  rightIcon: null,
  setOpen: function setOpen() {},
  open: false,
  renderListView: function renderListView() {},
  scrollCheck: function scrollCheck() {},
  selectListBasicClassName: null,
  backHeaderClassName: null,
  listContainerClassName: null,
  onBackClick: undefined
};
//# sourceMappingURL=SelectListBasic.js.map
