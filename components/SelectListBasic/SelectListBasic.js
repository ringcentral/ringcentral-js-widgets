"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectListBasic = void 0;

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

require("core-js/modules/es6.regexp.search");

require("core-js/modules/es6.array.filter");

var _rcui = require("@ringcentral-integration/rcui");

var _iconSearch = _interopRequireDefault(require("@ringcentral-integration/rcui/icons/icon-search.svg"));

var _classnames = _interopRequireDefault(require("classnames"));

var _formatMessage = _interopRequireDefault(require("format-message"));

var _react = _interopRequireWildcard(require("react"));

var _AnimationPanel = require("../AnimationPanel");

var _BackHeaderV = _interopRequireDefault(require("../BackHeaderV2"));

var _Tooltip = require("../Rcui/Tooltip");

var _i18n = _interopRequireDefault(require("./i18n"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _toolTipDelayTime = require("../../lib/toolTipDelayTime");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

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
  var matchElmRef = (0, _react.useRef)(); // When open change clear filter

  (0, _react.useEffect)(function () {
    setFilter(null);
  }, [open]);
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

    if (showFoundFromServer && typeof setShowSearchFromServerHint === 'function') {
      setShowSearchFromServerHint(false);
    }

    if (onBackClick) {
      return onBackClick();
    }
  };

  var foundFromServerHint = /*#__PURE__*/_react["default"].createElement("p", {
    className: _styles["default"].hint
  }, (0, _formatMessage["default"])(_i18n["default"].getString('foundFromServerHint', currentLocale), {
    appName: appName
  }));

  var notResultFoundFromServer = /*#__PURE__*/_react["default"].createElement("p", {
    className: _styles["default"].loading
  }, ' ', _i18n["default"].getString('notResultFoundFromServer', currentLocale));

  var loading = /*#__PURE__*/_react["default"].createElement("p", {
    className: _styles["default"].loading
  }, _i18n["default"].getString('loading', currentLocale));

  var notFoundFromServer = !isSearching && !showSearchFromServerHint ? notResultFoundFromServer : foundFromServerHint;
  var showLoading = isSearching ? loading : notFoundFromServer;
  return /*#__PURE__*/_react["default"].createElement(_AnimationPanel.AnimationPanel, {
    open: open,
    className: selectListBasicClassName
  }, open ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_BackHeaderV["default"], {
    currentLocale: currentLocale,
    title: title,
    onBackClick: backHeaderOnclick,
    rightIcon: rightIcon,
    className: backHeaderClassName
  }), /*#__PURE__*/_react["default"].createElement("main", {
    className: _styles["default"].main,
    "data-sign": "selectList"
  }, /*#__PURE__*/_react["default"].createElement(_Tooltip.Tooltip, {
    title: placeholder,
    enterDelay: _toolTipDelayTime.TOOLTIP_DEFAULT_DELAY_TIME
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].search
  }, !filter && /*#__PURE__*/_react["default"].createElement("span", {
    className: _styles["default"].placeholder
  }, placeholder), /*#__PURE__*/_react["default"].createElement(_rcui.RcOutlineTextField, {
    size: "small",
    radiusType: "circle",
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
  }))), /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].listContainer, listContainerClassName),
    ref: scrollElmRef,
    "data-sign": "searchResult"
  }, hasResult || showFoundFromServer ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
    ref: matchElmRef,
    className: _styles["default"].text
  }, matchedTitle && /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].title
  }, matchedTitle, " (", matchOptions.length, ")"), matchOptions.length > 0 && renderListView(matchOptions, 'matched', filter, function (elm, type) {
    return scrollCheck(scrollElmRef, matchElmRef, elm, type);
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].text
  }, otherTitle && /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].title
  }, otherTitle, " (", matchOtherOptions.length, ")"), matchOtherOptions.length > 0 && renderListView(matchOtherOptions, 'other', filter, function (elm, type) {
    return scrollCheck(scrollElmRef, matchElmRef, elm, type);
  })), showAssociatedSection && /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].text
  }, associatedTitle && /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].title
  }, associatedTitle, " (", matchAssociatedOptions.length, ")"), matchAssociatedOptions.length > 0 && renderListView(matchAssociatedOptions, 'other', filter, function (elm, type) {
    return scrollCheck(scrollElmRef, matchElmRef, elm, type);
  })), showFoundFromServer && /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].text
  }, foundFromServerTitle && /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].title
  }, foundFromServerTitle, " (", foundFromServerEntities.length, ")"), foundFromServerEntities && foundFromServerEntities.length > 0 ? renderListView(foundFromServerEntities, 'custom', filter, function (elm, type) {
    return scrollCheck(scrollElmRef, matchElmRef, elm, type);
  }) : showLoading)) : /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].search, _styles["default"].text)
  }, "".concat(_i18n["default"].getString('noResultFoundFor', currentLocale), " \"").concat(filter, "\""))))) : null);
};

exports.SelectListBasic = SelectListBasic;
SelectListBasic.defaultProps = {
  options: [],
  otherOptions: [],
  associatedOptions: [],
  showAssociatedSection: false,
  placeholder: '',
  rightIcon: null,
  setOpen: function setOpen() {},
  open: false,
  renderListView: function renderListView() {
    return null;
  },
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
