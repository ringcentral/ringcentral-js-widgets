"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectListBasic = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.search.js");
require("core-js/modules/es.string.trim.js");
var _utils = require("@ringcentral-integration/utils");
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _toolTipDelayTime = require("../../lib/toolTipDelayTime");
var _AnimationPanel = require("../AnimationPanel");
var _BackHeaderV = _interopRequireDefault(require("../BackHeaderV2"));
var _Tooltip = require("../Rcui/Tooltip");
var _i18n = _interopRequireDefault(require("../SelectList/i18n"));
var _i18n2 = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
var _excluded = ["options", "otherOptions", "associatedOptions", "showOtherSection", "showAssociatedSection", "showRecentlySection", "placeholder", "rightIcon", "setOpen", "open", "renderListView", "scrollCheck", "selectListBasicClassName", "backHeaderClassName", "listContainerClassName", "classes", "onBackClick", "matchedTitle", "otherTitle", "associatedTitle", "recentlyTitle", "contactSearch", "field", "foundFromServerTitle", "showFoundFromServer", "foundFromServerEntities", "recentlyEntities", "serverEntitiesClientFilter", "appName", "isSearching", "disabled", "title", "searchOption", "currentLocale", "showMatched"];
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var defaultRenderListView = function defaultRenderListView() {
  return null;
};
var SelectListBasic = exports.SelectListBasic = function SelectListBasic(_ref) {
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
    _ref$showRecentlySect = _ref.showRecentlySection,
    showRecentlySection = _ref$showRecentlySect === void 0 ? false : _ref$showRecentlySect,
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
    _ref$recentlyTitle = _ref.recentlyTitle,
    recentlyTitle = _ref$recentlyTitle === void 0 ? null : _ref$recentlyTitle,
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
    recentlyEntities = _ref.recentlyEntities,
    serverEntitiesClientFilter = _ref.serverEntitiesClientFilter,
    _ref$appName = _ref.appName,
    appName = _ref$appName === void 0 ? null : _ref$appName,
    _ref$isSearching = _ref.isSearching,
    isSearching = _ref$isSearching === void 0 ? false : _ref$isSearching,
    _ref$disabled = _ref.disabled,
    disabled = _ref$disabled === void 0 ? false : _ref$disabled,
    title = _ref.title,
    searchOption = _ref.searchOption,
    currentLocale = _ref.currentLocale,
    _ref$showMatched = _ref.showMatched,
    showMatched = _ref$showMatched === void 0 ? true : _ref$showMatched,
    rest = _objectWithoutProperties(_ref, _excluded);
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
  var filteredFoundFromServerOptions = hasSearch && serverEntitiesClientFilter !== 'none' ? foundFromServerEntities.filter(function (option) {
    return searchOption(option, filter);
  }) : foundFromServerEntities;
  var matchRecentlyOptions = hasSearch && recentlyEntities ? recentlyEntities.filter(function (option) {
    return searchOption(option, filter);
  }) : recentlyEntities;
  var hasResult = matchOptions.length + matchOtherOptions.length + matchAssociatedOptions.length + ((matchRecentlyOptions === null || matchRecentlyOptions === void 0 ? void 0 : matchRecentlyOptions.length) || 0) > 0 || options.length + otherOptions.length + associatedOptions.length + ((recentlyEntities === null || recentlyEntities === void 0 ? void 0 : recentlyEntities.length) || 0) === 0;
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
  recentlyTitle = recentlyTitle || _i18n["default"].getString('recently', currentLocale);
  return (
    /*#__PURE__*/
    // @ts-expect-error TS(2322): Type 'string | null' is not assignable to type 'st... Remove this comment to see the full error message
    _react["default"].createElement(_AnimationPanel.AnimationPanel, _extends({
      open: open,
      className: selectListBasicClassName
    }, rest), open ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_BackHeaderV["default"], {
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
      className: (0, _clsx["default"])(_styles["default"].search, classes.searchInput)
    }, !filter && /*#__PURE__*/_react["default"].createElement("span", {
      className: (0, _clsx["default"])(_styles["default"].placeholder, classes.placeholder)
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
      onKeyDown: function onKeyDown(event) {
        // Press enter to search contacts from server
        if (event.key !== 'Enter' || !showFoundFromServer) return;
        if (typeof contactSearch === 'function') {
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
      className: (0, _clsx["default"])(_styles["default"].listContainer, listContainerClassName)
      // @ts-expect-error TS(2322): Type 'MutableRefObject<undefined>' is not assignab... Remove this comment to see the full error message
      ,
      ref: scrollElmRef,
      "data-sign": "searchResult"
    }, hasResult || showFoundFromServer ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, showRecentlySection && /*#__PURE__*/_react["default"].createElement("div", {
      className: _styles["default"].text,
      "data-sign": "recently"
    }, recentlyTitle && /*#__PURE__*/_react["default"].createElement("div", {
      className: _styles["default"].title
    }, recentlyTitle, " (", (matchRecentlyOptions === null || matchRecentlyOptions === void 0 ? void 0 : matchRecentlyOptions.length) || 0, ")"), matchRecentlyOptions && matchRecentlyOptions.length > 0 && renderListView(matchRecentlyOptions, 'recently', filter, function (elm, type) {
      return scrollCheck(scrollElmRef, matchElmRef, elm, type);
    })), showMatched && /*#__PURE__*/_react["default"].createElement("div", {
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
      className: _styles["default"].text,
      "data-sign": "Associated"
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
      className: (0, _clsx["default"])(_styles["default"].search, _styles["default"].text, classes.noResult)
    }, "".concat(_i18n2["default"].getString('noResultFoundFor', currentLocale), " \"").concat(filter, "\""))))) : null)
  );
};
//# sourceMappingURL=SelectListBasic.js.map
