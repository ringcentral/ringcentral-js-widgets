"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallsListPage = void 0;
var _reactHooks = require("@ringcentral-integration/react-hooks");
var _react = _interopRequireDefault(require("react"));
var _CallsList = require("./CallsList");
var _Filter = require("./Filter");
var _excluded = ["calls", "searchInput", "onSearchInputChange", "viewCallsFilter", "setViewCallsFilter", "viewCallsFilterSelections", "onFocus"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var CallsListPage = exports.CallsListPage = function CallsListPage(_ref) {
  var calls = _ref.calls,
    searchInput = _ref.searchInput,
    onSearchInputChange = _ref.onSearchInputChange,
    viewCallsFilter = _ref.viewCallsFilter,
    setViewCallsFilter = _ref.setViewCallsFilter,
    viewCallsFilterSelections = _ref.viewCallsFilterSelections,
    onFocus = _ref.onFocus,
    rest = _objectWithoutProperties(_ref, _excluded);
  (0, _reactHooks.useEffectOnDocumentFocus)(function () {
    onFocus === null || onFocus === void 0 ? void 0 : onFocus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_Filter.Filter, {
    className: "flex-none",
    searchInput: searchInput,
    onSearchInputChange: onSearchInputChange,
    viewCallsFilter: viewCallsFilter,
    setViewCallsFilter: setViewCallsFilter,
    viewCallsFilterSelections: viewCallsFilterSelections
  }), /*#__PURE__*/_react["default"].createElement(_CallsList.CallsList, _extends({
    searchInput: searchInput,
    className: "flex-auto overflow-y-auto overflow-x-hidden",
    viewCallsFilter: viewCallsFilter,
    calls: calls
  }, rest)));
};
CallsListPage.displayName = 'CallsListPage';
//# sourceMappingURL=CallsListPage.js.map
