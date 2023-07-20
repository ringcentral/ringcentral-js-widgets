"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.filter");
require("core-js/modules/es.array.is-array");
require("core-js/modules/es.regexp.exec");
require("core-js/modules/es.string.search");
require("core-js/modules/es.string.trim");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectListBasic = void 0;
var _react = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _utils = require("@ringcentral-integration/utils");
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
var _toolTipDelayTime = require("../../lib/toolTipDelayTime");
var _AnimationPanel = require("../AnimationPanel");
var _BackHeaderV = _interopRequireDefault(require("../BackHeaderV2"));
var _Tooltip = require("../Rcui/Tooltip");
var _i18n = _interopRequireDefault(require("../SelectList/i18n"));
var _i18n2 = _interopRequireDefault(require("./i18n"));
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
var defaultRenderListView = function defaultRenderListView() {
  return null;
};
var SelectListBasic = function SelectListBasic(_ref) {
  var _ref$options = _ref.options,
    options = _ref$options === void 0 ? [] : _ref$options,
    _ref$otherOptions = _ref.otherOptions,
    otherOptions = _ref$otherOptions === void 0 ? [] : _ref$otherOptions,
    _ref$associatedOption = _ref.associatedOptions,
    associatedOptions = _ref$associatedOption === void 0 ? [] : _ref$associatedOption,
    _ref$showOtherSection = _ref.showOtherSection,
    showOtherSection = _ref$showOtherSection === void 0 ? true : _ref$showOtherSection,
    _ref$showAssociatedSe = _ref.showAssociatedSection,
    showAssociatedSection = _ref$showAssociatedSe === void 0 ? false : _ref$showAssociatedSe,
    _ref$placeholder = _ref.placeholder,
    placeholder = _ref$placeholder === void 0 ? '' : _ref$placeholder,
    _ref$rightIcon = _ref.rightIcon,
    rightIcon = _ref$rightIcon === void 0 ? null : _ref$rightIcon,
    _ref$setOpen = _ref.setOpen,
    setOpen = _ref$setOpen === void 0 ? _utils.emptyFn : _ref$setOpen,
    _ref$open = _ref.open,
    open = _ref$open === void 0 ? false : _ref$open,
    _ref$renderListView = _ref.renderListView,
    renderListView = _ref$renderListView === void 0 ? defaultRenderListView : _ref$renderListView,
    _ref$scrollCheck = _ref.scrollCheck,
    scrollCheck = _ref$scrollCheck === void 0 ? _utils.emptyFn : _ref$scrollCheck,
    _ref$selectListBasicC = _ref.selectListBasicClassName,
    selectListBasicClassName = _ref$selectListBasicC === void 0 ? null : _ref$selectListBasicC,
    _ref$backHeaderClassN = _ref.backHeaderClassName,
    backHeaderClassName = _ref$backHeaderClassN === void 0 ? null : _ref$backHeaderClassN,
    _ref$listContainerCla = _ref.listContainerClassName,
    listContainerClassName = _ref$listContainerCla === void 0 ? null : _ref$listContainerCla,
    _ref$classes = _ref.classes,
    classes = _ref$classes === void 0 ? {} : _ref$classes,
    _ref$onBackClick = _ref.onBackClick,
    onBackClick = _ref$onBackClick === void 0 ? undefined : _ref$onBackClick,
    _ref$matchedTitle = _ref.matchedTitle,
    matchedTitle = _ref$matchedTitle === void 0 ? null : _ref$matchedTitle,
    _ref$otherTitle = _ref.otherTitle,
    otherTitle = _ref$otherTitle === void 0 ? null : _ref$otherTitle,
    _ref$associatedTitle = _ref.associatedTitle,
    associatedTitle = _ref$associatedTitle === void 0 ? null : _ref$associatedTitle,
    _ref$contactSearch = _ref.contactSearch,
    contactSearch = _ref$contactSearch === void 0 ? null : _ref$contactSearch,
    _ref$field = _ref.field,
    field = _ref$field === void 0 ? null : _ref$field,
    _ref$foundFromServerT = _ref.foundFromServerTitle,
    foundFromServerTitle = _ref$foundFromServerT === void 0 ? null : _ref$foundFromServerT,
    _ref$showFoundFromSer = _ref.showFoundFromServer,
    showFoundFromServer = _ref$showFoundFromSer === void 0 ? false : _ref$showFoundFromSer,
    _ref$foundFromServerE = _ref.foundFromServerEntities,
    foundFromServerEntities = _ref$foundFromServerE === void 0 ? [] : _ref$foundFromServerE,
    _ref$appName = _ref.appName,
    appName = _ref$appName === void 0 ? null : _ref$appName,
    _ref$isSearching = _ref.isSearching,
    isSearching = _ref$isSearching === void 0 ? false : _ref$isSearching,
    _ref$disabled = _ref.disabled,
    disabled = _ref$disabled === void 0 ? false : _ref$disabled,
    title = _ref.title,
    searchOption = _ref.searchOption,
    currentLocale = _ref.currentLocale;
  var _useRefState = (0, _juno.useRefState)(''),
    _useRefState2 = _slicedToArray(_useRefState, 2),
    filterRef = _useRefState2[0],
    setFilter = _useRefState2[1];
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    showSearchFromServerHint = _useState2[0],
    setShowSearchFromServerHint = _useState2[1];
  var scrollElmRef = (0, _react.useRef)();
  var matchElmRef = (0, _react.useRef)();

  // When open change clear filter
  (0, _react.useEffect)(function () {
    setFilter('');
    setShowSearchFromServerHint(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);
  (0, _react.useEffect)(function () {
    if (isSearching) {
      setShowSearchFromServerHint(false);
    }
  }, [isSearching]);
  (0, _juno.useDepsChange)(function () {
    // null is invalid for RcTextField at disabled status but empty string works
    if (disabled) setFilter('', false);
  }, [disabled]);
  var filter = filterRef.current;

  // @ts-expect-error TS(2774): This condition will always return true since this ... Remove this comment to see the full error message
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
  var filteredFoundFromServerOptions = hasSearch ? foundFromServerEntities.filter(function (option) {
    return searchOption(option, filter);
  }) : foundFromServerEntities;
  var hasResult = matchOptions.length + matchOtherOptions.length + matchAssociatedOptions.length > 0 || options.length + otherOptions.length + associatedOptions.length === 0;
  var backHeaderOnclick = function backHeaderOnclick() {
    setOpen(false);
    if (onBackClick) {
      return onBackClick();
    }
  };
  var foundFromServerHint = /*#__PURE__*/_react["default"].createElement("p", {
    className: _styles["default"].hint
  }, (0, _utils.format)(_i18n2["default"].getString('foundFromServerHint', currentLocale), {
    appName: appName
  }));
  var notResultFoundFromServer = /*#__PURE__*/_react["default"].createElement("p", {
    className: _styles["default"].loading
  }, ' ', _i18n2["default"].getString('notResultFoundFromServer', currentLocale));
  var loading = /*#__PURE__*/_react["default"].createElement("p", {
    className: _styles["default"].loading
  }, _i18n2["default"].getString('loading', currentLocale));
  var notFoundFromServer = showSearchFromServerHint ? foundFromServerHint : notResultFoundFromServer;
  var showLoading = isSearching ? loading : notFoundFromServer;
  matchedTitle = matchedTitle || _i18n["default"].getString('matched', currentLocale);
  otherTitle = otherTitle || _i18n["default"].getString('other', currentLocale);
  foundFromServerTitle = foundFromServerTitle || (0, _utils.format)(_i18n["default"].getString('foundFromServer', currentLocale), {
    appName: appName
  });
  associatedTitle = associatedTitle || _i18n["default"].getString('associated', currentLocale);
  return (
    /*#__PURE__*/
    // @ts-expect-error TS(2322): Type 'string | null' is not assignable to type 'st... Remove this comment to see the full error message
    _react["default"].createElement(_AnimationPanel.AnimationPanel, {
      open: open,
      className: selectListBasicClassName
    }, open ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_BackHeaderV["default"], {
      currentLocale: currentLocale,
      title: title,
      onBackClick: backHeaderOnclick,
      rightIcon: rightIcon
      // @ts-expect-error TS(2322): Type 'string | null' is not assignable to type 'st... Remove this comment to see the full error message
      ,
      className: backHeaderClassName
    }), /*#__PURE__*/_react["default"].createElement("main", {
      className: _styles["default"].main,
      "data-sign": "selectList"
    }, /*#__PURE__*/_react["default"].createElement(_Tooltip.Tooltip, {
      title: placeholder,
      enterDelay: _toolTipDelayTime.TOOLTIP_LONG_DELAY_TIME
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: (0, _classnames["default"])(_styles["default"].search, classes.searchInput)
    }, !filter && /*#__PURE__*/_react["default"].createElement("span", {
      className: (0, _classnames["default"])(_styles["default"].placeholder, classes.placeholder)
    }, placeholder), /*#__PURE__*/_react["default"].createElement(_juno.RcTextField, {
      variant: "outline",
      size: "small",
      value: filter,
      fullWidth: true,
      radius: "round",
      InputProps: {
        startAdornment: /*#__PURE__*/_react["default"].createElement(_juno.RcIcon, {
          symbol: _junoIcon.Search,
          color: "neutral.f04",
          size: "small"
        })
      },
      "data-sign": "searchBar",
      onChange: function onChange(event) {
        if (event.target) {
          var value = event.target.value || '';
          setFilter(value);
        }
      },
      onKeyDown: function onKeyDown(key) {
        // Press enter to search contacts from server
        if (key && key.keyCode !== 13 || !showFoundFromServer) return;
        if (contactSearch && typeof contactSearch === 'function') {
          var searchString = filter ? filter.trim() : '';
          if (searchString.length) {
            contactSearch({
              searchString: searchString,
              // @ts-expect-error TS(2322): Type 'string | null' is not assignable to type 'st... Remove this comment to see the full error message
              fromField: field
            });
          }
        }
      },
      disabled: disabled
    }))), /*#__PURE__*/_react["default"].createElement("div", {
      className: (0, _classnames["default"])(_styles["default"].listContainer, listContainerClassName)
      // @ts-expect-error TS(2322): Type 'MutableRefObject<undefined>' is not assignab... Remove this comment to see the full error message
      ,
      ref: scrollElmRef,
      "data-sign": "searchResult"
    }, hasResult || showFoundFromServer ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
      // @ts-expect-error TS(2322): Type 'MutableRefObject<undefined>' is not assignab... Remove this comment to see the full error message
      ref: matchElmRef,
      className: _styles["default"].text,
      "data-sign": matchedTitle
    }, matchedTitle && /*#__PURE__*/_react["default"].createElement("div", {
      className: _styles["default"].title
    }, matchedTitle, " (", matchOptions.length, ")"), matchOptions.length > 0 && renderListView(matchOptions, 'matched', filter, function (elm, type) {
      return scrollCheck(scrollElmRef, matchElmRef, elm, type);
    })), showOtherSection && /*#__PURE__*/_react["default"].createElement("div", {
      className: _styles["default"].text,
      "data-sign": otherTitle
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
      className: _styles["default"].text,
      "data-sign": "foundFromServer"
    }, foundFromServerTitle && /*#__PURE__*/_react["default"].createElement("div", {
      className: _styles["default"].title
    }, foundFromServerTitle, " (", filteredFoundFromServerOptions.length, ")"), filteredFoundFromServerOptions && filteredFoundFromServerOptions.length > 0 ? renderListView(filteredFoundFromServerOptions, 'custom', filter, function (elm, type) {
      return scrollCheck(scrollElmRef, matchElmRef, elm, type);
    }) : showLoading)) : /*#__PURE__*/_react["default"].createElement("div", {
      className: (0, _classnames["default"])(_styles["default"].search, _styles["default"].text, classes.noResult)
    }, "".concat(_i18n2["default"].getString('noResultFoundFor', currentLocale), " \"").concat(filter, "\""))))) : null)
  );
};
exports.SelectListBasic = SelectListBasic;
//# sourceMappingURL=SelectListBasic.js.map
