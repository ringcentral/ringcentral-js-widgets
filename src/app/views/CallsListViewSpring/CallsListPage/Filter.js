"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Filter = void 0;
require("core-js/modules/es.array.is-array.js");
var _hooks = require("@ringcentral-integration/micro-core/src/app/hooks");
var _components = require("@ringcentral-integration/micro-message/src/app/components");
var _react = _interopRequireWildcard(require("react"));
var _i18n = _interopRequireDefault(require("./i18n"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var Filter = exports.Filter = function Filter(_ref) {
  var searchInput = _ref.searchInput,
    _onSearchInputChange = _ref.onSearchInputChange,
    viewCallsFilter = _ref.viewCallsFilter,
    setViewCallsFilter = _ref.setViewCallsFilter,
    viewCallsFilterSelections = _ref.viewCallsFilterSelections;
  var _useLocale = (0, _hooks.useLocale)(_i18n["default"]),
    t = _useLocale.t;
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    searchExpanded = _useState2[0],
    setSearchExpanded = _useState2[1];
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex px-3 py-1 items-center gap-2"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex-auto"
  }, /*#__PURE__*/_react["default"].createElement(_components.SearchInputToggle, {
    searchInput: searchInput || '',
    onSearchInputChange: function onSearchInputChange(e) {
      _onSearchInputChange === null || _onSearchInputChange === void 0 ? void 0 : _onSearchInputChange(e.target.value);
    },
    placeholder: t('searchAll'),
    "data-sign": "callsListSearch",
    expanded: searchExpanded,
    onExpandedChange: setSearchExpanded
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex-none",
    "data-sign": "callsListFilter"
  }, /*#__PURE__*/_react["default"].createElement(_components.SingleFilter, {
    data: viewCallsFilterSelections,
    visibleCount: searchExpanded ? 1 : 2,
    value: viewCallsFilter,
    onSelect: function onSelect(value) {
      setViewCallsFilter === null || setViewCallsFilter === void 0 ? void 0 : setViewCallsFilter(value);
    },
    MoreButtonProps: {
      'data-sign': 'callsListFilterExpand'
    },
    MenuProps: {
      onClose: function onClose() {
        setSearchExpanded(false);
      }
    }
  })));
};
//# sourceMappingURL=Filter.js.map
