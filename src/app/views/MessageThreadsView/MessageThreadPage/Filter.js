"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Filter = void 0;
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.object.to-string.js");
var _hooks = require("@ringcentral-integration/micro-core/src/app/hooks");
var _reactHooks = require("@ringcentral-integration/react-hooks");
var _springIcon = require("@ringcentral/spring-icon");
var _springUi = require("@ringcentral/spring-ui");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _rxjs = require("rxjs");
var _components = require("../../../components");
var _i18n = _interopRequireDefault(require("../../ConversationsViewSpring/ConversationsPage/i18n"));
var _FilterPopper = require("./FilterPopper");
var _i18n2 = _interopRequireDefault(require("./i18n"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var filterStyle = 'sui-filter-button sui-filter-button-root max-w-[120px]';
var Filter = exports.Filter = function Filter(_ref) {
  var className = _ref.className,
    form = _ref.form,
    _ref$onSharedSearchFo = _ref.onSharedSearchFormUpdate,
    onSharedSearchFormUpdate = _ref$onSharedSearchFo === void 0 ? _rxjs.noop : _ref$onSharedSearchFo,
    _ref$callQueues = _ref.callQueues,
    callQueues = _ref$callQueues === void 0 ? [] : _ref$callQueues,
    assignmentOptions = _ref.assignmentOptions;
  var _useLocale = (0, _hooks.useLocale)(_i18n2["default"], _i18n["default"]),
    t = _useLocale.t;
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    filterPopperOpen = _useState2[0],
    setFilterPopperOpen = _useState2[1];
  var _useState3 = (0, _react.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    searchExpanded = _useState4[0],
    setSearchExpanded = _useState4[1];
  var filterIconRef = (0, _react.useRef)(null);
  var debouncedOnSearchInputChange = (0, _springUi.useDebounce)(function (value) {
    onSharedSearchFormUpdate({
      searchInput: value
    });
  }, 500);
  var _useAsyncState = (0, _reactHooks.useAsyncState)(form.searchInput, function (value) {
      debouncedOnSearchInputChange(value);
    }),
    _useAsyncState2 = _slicedToArray(_useAsyncState, 2),
    searchInput = _useAsyncState2[0],
    setSearchInput = _useAsyncState2[1];
  var handleFilterIconClick = function handleFilterIconClick() {
    setFilterPopperOpen(function (prev) {
      return !prev;
    });
  };
  var filter = form.filter,
    statusFilter = form.statusFilter,
    selectedAssignees = form.selectedAssignees,
    selectedCallQueues = form.selectedCallQueues;
  var activeFilterCount = (0, _react.useMemo)(function () {
    var count = 0;
    // If not all statuses are selected (meaning some are filtered out)
    if (statusFilter.length < 2) {
      count += 1;
    }
    // If selectedAssignees length equals max possible (assignmentOptions.length), treat as 0 (all selected)
    count += selectedAssignees.length === assignmentOptions.length ? 0 : selectedAssignees.length;
    // If selectedCallQueues length equals max possible (callQueues.length), treat as 0 (all selected)
    count += selectedCallQueues.length === callQueues.length && callQueues.length > 0 ? 0 : selectedCallQueues.length;
    return count;
  }, [statusFilter, selectedAssignees, selectedCallQueues, callQueues, assignmentOptions]);
  var hasActiveFilters = activeFilterCount > 0;
  var prevFilter = (0, _springUi.usePrevious)(function () {
    return filter;
  });

  // Determine which filter to show on the right button and if it's active
  var rightButtonState = (0, _react.useMemo)(function () {
    // When search is expanded, show only active filter
    var isActive = filter === 'Unread' || filter === 'AssignedToMe';
    var filterValue = filter === 'All' ? prevFilter !== null && prevFilter !== void 0 ? prevFilter : 'AssignedToMe' : filter;
    return {
      filter: filterValue,
      isActive: isActive
    };
  }, [filter, prevFilter]);
  var handleAllClick = function handleAllClick() {
    // All is an independent action that clears all filters
    onSharedSearchFormUpdate('reset');
  };
  var handleRightButtonClick = function handleRightButtonClick(filter) {
    // Toggle between AssignedToMe and Unread
    onSharedSearchFormUpdate(_objectSpread({
      filter: filter
    }, filter === 'AssignedToMe' ? {
      selectedAssignees: ['__CURRENT_USER__']
    } : {}));
  };
  var allText = t('all');
  var allButton = /*#__PURE__*/_react["default"].createElement("button", {
    className: (0, _clsx["default"])(filterStyle, !rightButtonState.isActive && 'sui-selected'),
    title: allText,
    "aria-current": !rightButtonState.isActive,
    type: "button",
    onClick: handleAllClick,
    "data-sign": "filterAllButton"
  }, allText);
  var rightText = rightButtonState.filter === 'Unread' ? t('unread') : t('assignedToMe');
  var rightButton = /*#__PURE__*/_react["default"].createElement("button", {
    className: (0, _clsx["default"])(filterStyle, rightButtonState.isActive && 'sui-selected'),
    title: rightText,
    "aria-current": rightButtonState.isActive,
    type: "button",
    onClick: function onClick() {
      return handleRightButtonClick(rightButtonState.filter === 'Unread' ? 'Unread' : 'AssignedToMe');
    },
    "data-sign": "filterToggleButton"
  }, rightText);
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx["default"])('flex px-3 py-1 items-center gap-2', className)
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex-auto"
  }, /*#__PURE__*/_react["default"].createElement(_components.SearchInputToggle, {
    "data-sign": "sharedThreadSearch",
    searchInput: searchInput,
    onSearchInputChange: function onSearchInputChange(e) {
      return setSearchInput(e.currentTarget.value);
    },
    expanded: searchExpanded,
    onExpandedChange: setSearchExpanded,
    placeholder: t('searchText')
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center flex-shrink-0 gap-1"
  }, searchExpanded ? rightButtonState.isActive ? /*#__PURE__*/_react["default"].createElement("div", {
    className: "sui-single-filter sui-single-filter-root"
  }, rightButton) : /*#__PURE__*/_react["default"].createElement("div", {
    className: "sui-single-filter sui-single-filter-root"
  }, allButton) : /*#__PURE__*/_react["default"].createElement("div", {
    className: "sui-single-filter sui-single-filter-root"
  }, allButton, rightButton), /*#__PURE__*/_react["default"].createElement("div", {
    className: "relative flex items-center"
  }, /*#__PURE__*/_react["default"].createElement(_springUi.IconButton, {
    ref: filterIconRef,
    variant: "icon",
    size: "small",
    className: "flex items-center flex-row",
    color: hasActiveFilters ? 'primary' : 'secondary',
    onClick: handleFilterIconClick,
    "data-sign": "messageThreadFilterIcon"
  }, /*#__PURE__*/_react["default"].createElement(_springUi.Icon, {
    symbol: _springIcon.FilterMd,
    size: "small"
  }), hasActiveFilters && /*#__PURE__*/_react["default"].createElement("span", {
    className: "typography-descriptor"
  }, "(", activeFilterCount, ")"))))), /*#__PURE__*/_react["default"].createElement(_FilterPopper.FilterPopper, {
    anchorEl: filterIconRef.current,
    open: filterPopperOpen,
    onClose: function onClose() {
      return setFilterPopperOpen(false);
    },
    selectedAssignees: selectedAssignees,
    statusFilter: statusFilter,
    callQueues: callQueues,
    selectedCallQueues: form.selectedCallQueues,
    filter: filter,
    onSharedSearchFormUpdate: onSharedSearchFormUpdate
  }));
};
//# sourceMappingURL=Filter.js.map
