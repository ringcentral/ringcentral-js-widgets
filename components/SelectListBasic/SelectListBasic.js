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

var _iconSearch = _interopRequireDefault(require("@ringcentral-integration/rcui/icons/icon-search.svg"));

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _rcui = require("@ringcentral-integration/rcui");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _formatMessage = _interopRequireDefault(require("format-message"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _BackHeaderV = _interopRequireDefault(require("../BackHeaderV2"));

var _i18n = _interopRequireDefault(require("./i18n"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var SelectListBasic = function SelectListBasic(_ref) {
  var title = _ref.title,
      options = _ref.options,
      otherOptions = _ref.otherOptions,
      associatedOptions = _ref.associatedOptions,
      showAssociatedSection = _ref.showAssociatedSection,
      placeholder = _ref.placeholder,
      searchOption = _ref.searchOption,
      rightIcon = _ref.rightIcon,
      matchedTitle = _ref.matchedTitle,
      otherTitle = _ref.otherTitle,
      associatedTitle = _ref.associatedTitle,
      currentLocale = _ref.currentLocale,
      renderListView = _ref.renderListView,
      open = _ref.open,
      setOpen = _ref.setOpen,
      scrollCheck = _ref.scrollCheck,
      selectListBasicClassName = _ref.selectListBasicClassName,
      backHeaderClassName = _ref.backHeaderClassName,
      listContainerClassName = _ref.listContainerClassName,
      onBackClick = _ref.onBackClick,
      contactSearch = _ref.contactSearch,
      field = _ref.field,
      foundFromServerTitle = _ref.foundFromServerTitle,
      showFoundFromServer = _ref.showFoundFromServer,
      foundFromServerEntities = _ref.foundFromServerEntities,
      appName = _ref.appName,
      isSearching = _ref.isSearching,
      showSearchFromServerHint = _ref.showSearchFromServerHint,
      setShowSearchFromServerHint = _ref.setShowSearchFromServerHint;

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      filter = _useState2[0],
      setFilter = _useState2[1];

  var scrollElmRef = (0, _react.useRef)();
  var matchElmRef = (0, _react.useRef)();
  var hasSearch = searchOption && filter;
  var matchOptions = hasSearch ? options.filter(function (option) {
    return searchOption(option, filter);
  }) : options;
  var matchOtherOptions = hasSearch ? otherOptions.filter(function (option) {
    return searchOption(option, filter);
  }) : otherOptions;
  var matchAssociatedOptions = hasSearch ? associatedOptions.filter(function (option) {
    return searchOption(option, filter);
  }) : associatedOptions;
  var hasResult = matchOptions.length + matchOtherOptions.length + matchAssociatedOptions.length > 0 || options.length + otherOptions.length + associatedOptions.length === 0;

  var backHeaderOnclick = function backHeaderOnclick() {
    setOpen(false);
    setFilter(null);

    if (showFoundFromServer && typeof setShowSearchFromServerHint === 'function') {
      setShowSearchFromServerHint(false);
    }

    if (onBackClick) {
      return onBackClick();
    }
  };

  var foundFromServerHint = _react["default"].createElement("p", {
    className: _styles["default"].hint
  }, (0, _formatMessage["default"])(_i18n["default"].getString('foundFromServerHint', currentLocale), {
    appName: appName
  }));

  var notResultFoundFromServer = _react["default"].createElement("p", {
    className: _styles["default"].loading
  }, ' ', _i18n["default"].getString('notResultFoundFromServer', currentLocale));

  var loading = _react["default"].createElement("p", {
    className: _styles["default"].loading
  }, _i18n["default"].getString('loading', currentLocale));

  var notFoundFromServer = !isSearching && !showSearchFromServerHint ? notResultFoundFromServer : foundFromServerHint;
  var showLoading = isSearching ? loading : notFoundFromServer;
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
    className: _styles["default"].placeholder
  }, placeholder), _react["default"].createElement(_rcui.RcOutlineTextField, {
    size: "small",
    radiusType: "circle",
    fullWidth: true,
    iconPosition: "left",
    symbol: _iconSearch["default"],
    "data-sign": "searchBar",
    onChange: function onChange(event) {
      if (event.target) {
        var value = event.target.value || '';
        setFilter(value);
      }
    },
    onKeyDown: function onKeyDown(key) {
      // Press enter to search contacts from server
      if (showFoundFromServer && contactSearch && typeof contactSearch === 'function') {
        if (key && key.keyCode === 13 && filter && filter.length) {
          contactSearch({
            searchString: filter,
            fromField: field
          });

          if (setShowSearchFromServerHint && typeof setShowSearchFromServerHint === 'function' && filter && filter.length > 1) {
            setShowSearchFromServerHint(false);
          }
        }
      }
    }
  })), _react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].listContainer, listContainerClassName),
    ref: scrollElmRef,
    "data-sign": "searchResult"
  }, hasResult || showFoundFromServer ? _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement("div", {
    ref: matchElmRef,
    className: _styles["default"].text
  }, matchedTitle && _react["default"].createElement("div", {
    className: _styles["default"].title
  }, matchedTitle, " (", matchOptions.length, ")"), matchOptions.length > 0 && renderListView(matchOptions, 'matched', filter, function (elm, type) {
    return scrollCheck(scrollElmRef, matchElmRef, elm, type);
  })), _react["default"].createElement("div", {
    className: _styles["default"].text
  }, otherTitle && _react["default"].createElement("div", {
    className: _styles["default"].title
  }, otherTitle, " (", matchOtherOptions.length, ")"), matchOtherOptions.length > 0 && renderListView(matchOtherOptions, 'other', filter, function (elm, type) {
    return scrollCheck(scrollElmRef, matchElmRef, elm, type);
  })), showAssociatedSection && _react["default"].createElement("div", {
    className: _styles["default"].text
  }, associatedTitle && _react["default"].createElement("div", {
    className: _styles["default"].title
  }, associatedTitle, " (", matchAssociatedOptions.length, ")"), matchAssociatedOptions.length > 0 && renderListView(matchAssociatedOptions, 'other', filter, function (elm, type) {
    return scrollCheck(scrollElmRef, matchElmRef, elm, type);
  })), showFoundFromServer && _react["default"].createElement("div", {
    className: _styles["default"].text
  }, foundFromServerTitle && _react["default"].createElement("div", {
    className: _styles["default"].title
  }, foundFromServerTitle, " (", foundFromServerEntities.length, ")"), foundFromServerEntities && foundFromServerEntities.length > 0 ? renderListView(foundFromServerEntities, 'custom', filter, function (elm, type) {
    return scrollCheck(scrollElmRef, matchElmRef, elm, type);
  }) : showLoading)) : _react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].search, _styles["default"].text, 'text-break')
  }, "".concat(_i18n["default"].getString('noResultFoundFor', currentLocale), " '").concat(filter, "'"))))) : null);
};

exports.SelectListBasic = SelectListBasic;
SelectListBasic.propTypes = {
  title: _propTypes["default"].string.isRequired,
  options: _propTypes["default"].arrayOf(_propTypes["default"].object),
  otherOptions: _propTypes["default"].arrayOf(_propTypes["default"].object),
  associatedOptions: _propTypes["default"].arrayOf(_propTypes["default"].object),
  showAssociatedSection: _propTypes["default"].bool,
  placeholder: _propTypes["default"].string,
  searchOption: _propTypes["default"].func.isRequired,
  rightIcon: _propTypes["default"].element,
  currentLocale: _propTypes["default"].string.isRequired,
  matchedTitle: _propTypes["default"].string,
  otherTitle: _propTypes["default"].string,
  associatedTitle: _propTypes["default"].string,
  renderListView: _propTypes["default"].func,
  open: _propTypes["default"].bool,
  setOpen: _propTypes["default"].func,
  scrollCheck: _propTypes["default"].func,
  selectListBasicClassName: _propTypes["default"].string,
  backHeaderClassName: _propTypes["default"].string,
  listContainerClassName: _propTypes["default"].string,
  onBackClick: _propTypes["default"].func,
  contactSearch: _propTypes["default"].func,
  field: _propTypes["default"].string,
  foundFromServerTitle: _propTypes["default"].string,
  showFoundFromServer: _propTypes["default"].bool,
  foundFromServerEntities: _propTypes["default"].array,
  appName: _propTypes["default"].string,
  isSearching: _propTypes["default"].bool,
  setShowSearchFromServerHint: _propTypes["default"].func,
  showSearchFromServerHint: _propTypes["default"].bool
};
SelectListBasic.defaultProps = {
  options: [],
  otherOptions: [],
  associatedOptions: [],
  showAssociatedSection: false,
  placeholder: '',
  rightIcon: null,
  setOpen: function setOpen() {},
  open: false,
  renderListView: function renderListView() {},
  scrollCheck: function scrollCheck() {},
  selectListBasicClassName: null,
  backHeaderClassName: null,
  listContainerClassName: null,
  onBackClick: undefined,
  matchedTitle: null,
  otherTitle: null,
  associatedTitle: null,
  contactSearch: null,
  field: null,
  foundFromServerTitle: null,
  showFoundFromServer: false,
  foundFromServerEntities: [],
  appName: null,
  isSearching: false,
  setShowSearchFromServerHint: function setShowSearchFromServerHint() {},
  showSearchFromServerHint: true
};
//# sourceMappingURL=SelectListBasic.js.map
