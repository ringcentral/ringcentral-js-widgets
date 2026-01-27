"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallsList = void 0;
var _hooks = require("@ringcentral-integration/micro-core/src/app/hooks");
var _reactHooks = require("@ringcentral-integration/react-hooks");
var _no_calls = _interopRequireDefault(require("@ringcentral-integration/next-core/assets/no_calls.svg"));
var _springUi = require("@ringcentral/spring-ui");
var _react = _interopRequireDefault(require("react"));
var _CallsListItem = require("./CallsListItem");
var _i18n = _interopRequireDefault(require("./i18n"));
var _excluded = ["calls", "className", "lastPosition", "setLastPosition", "viewCallsFilter", "searchInput"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var CallsList = exports.CallsList = function CallsList(_ref) {
  var calls = _ref.calls,
    className = _ref.className,
    lastPosition = _ref.lastPosition,
    setLastPosition = _ref.setLastPosition,
    viewCallsFilter = _ref.viewCallsFilter,
    searchInput = _ref.searchInput,
    rest = _objectWithoutProperties(_ref, _excluded);
  var _useVirtuosoScrollPos = (0, _reactHooks.useVirtuosoScrollPosition)(function (snapshot) {
      return setLastPosition(viewCallsFilter, snapshot);
    }),
    virtuosoActionsRef = _useVirtuosoScrollPos.virtuosoActionsRef,
    scrollerRef = _useVirtuosoScrollPos.scrollerRef;
  var _useLocale = (0, _hooks.useLocale)(_i18n["default"]),
    t = _useLocale.t;
  var searchMode = searchInput && searchInput.length > 0;
  if (calls.length === 0) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      "data-sign": "no-calls",
      className: "flex-auto flex justify-center items-center overflow-auto"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex-col flex justify-center items-center gpa-4"
    }, /*#__PURE__*/_react["default"].createElement(_no_calls["default"], null), /*#__PURE__*/_react["default"].createElement("div", {
      className: "text-center text-14 text-gray-500 mt-4"
    }, searchMode ? t('noSearchResults') : t('noCalls'))));
  }
  return /*#__PURE__*/_react["default"].createElement("div", {
    "data-sign": "callsList",
    className: "h-full"
  }, /*#__PURE__*/_react["default"].createElement(_springUi.VirtualizedList, {
    key: viewCallsFilter,
    className: className,
    data: calls,
    virtuosoActions: virtuosoActionsRef,
    scrollerRef: scrollerRef
    // null is not a valid type for restoreStateFrom, if lastPosition is null, it should use undefined
    ,
    restoreStateFrom: lastPosition || undefined
  }, function (index, call) {
    return /*#__PURE__*/_react["default"].createElement(_CallsListItem.CallsListItem, _extends({
      key: call.id || call.telephonySessionId,
      call: call,
      index: index
    }, rest));
  }));
};
//# sourceMappingURL=CallsList.js.map
