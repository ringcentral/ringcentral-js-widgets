"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useReferencePopper = exports.ReferenceMainContent = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _springUi = require("@ringcentral/spring-ui");
var _react = _interopRequireWildcard(require("react"));
var _FilterAndSearchHint = require("./FilterAndSearchHint");
var _ReferenceList = require("./ReferenceList");
var _i18n = require("./i18n");
var _excluded = ["referenceProps"];
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
var ReferenceMainContent = exports.ReferenceMainContent = function ReferenceMainContent(_ref) {
  var filterTerm = _ref.filterTerm,
    formKey = _ref.formKey,
    allDisplayList = _ref.allDisplayList,
    currentValue = _ref.currentValue,
    onItemClick = _ref.onItemClick,
    enableSearch = _ref.enableSearch,
    errorHint = _ref.errorHint,
    searchFn = _ref.searchFn,
    useMenuList = _ref.useMenuList,
    getIcon = _ref.getIcon;
  var selectedMap = (0, _react.useMemo)(function () {
    return currentValue.reduce(function (acc, item) {
      acc[item.id] = true;
      return acc;
    }, {});
  }, [currentValue]);
  var allDisplayItemMap = (0, _react.useMemo)(function () {
    return allDisplayList.reduce(function (acc, item) {
      item.values.forEach(function (record) {
        acc[record.id] = true;
      });
      return acc;
    }, {});
  }, [allDisplayList]);
  var fromAllList = currentValue.filter(function (item) {
    return !allDisplayItemMap[item.id];
  });
  var finalList = (0, _react.useMemo)(function () {
    return fromAllList.length ? [{
      label: (0, _i18n.t)('fromAllListLabel'),
      values: fromAllList
    }].concat(_toConsumableArray(allDisplayList)) : allDisplayList;
  }, [fromAllList, allDisplayList]);
  var displayList = (0, _react.useMemo)(function () {
    return finalList.map(function (item) {
      var records = item.values.filter(function (record) {
        var _record$name;
        return (_record$name = record.name) === null || _record$name === void 0 ? void 0 : _record$name.toLowerCase().includes(filterTerm.toLowerCase());
      });
      return {
        icon: item.icon,
        label: item.label,
        values: records,
        toolTipText: item.toolTipText,
        customCallBack: item.customCallBack
      };
    }).filter(function (item) {
      return !!item;
    });
  }, [finalList, filterTerm]);
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_FilterAndSearchHint.FilterAndSearchHint, {
    searchValue: filterTerm,
    onClickHandler: searchFn,
    enableSearch: enableSearch,
    errorHint: errorHint
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "overflow-y-auto overflow-x-hidden max-h-80"
  }, displayList.map(function (displayListItem) {
    return /*#__PURE__*/_react["default"].createElement(_ReferenceList.ReferenceList, {
      onItemClick: onItemClick,
      selectedMap: selectedMap,
      key: displayListItem.label,
      list: displayListItem.values,
      showGroupLabel: true,
      label: displayListItem.label,
      groupIcon: displayListItem.icon,
      toolTipText: displayListItem.toolTipText,
      customCallBack: displayListItem.customCallBack,
      highLightText: filterTerm,
      useMenuList: useMenuList,
      getIcon: getIcon
    });
  })));
};
var ReferencePopperComponent = /*#__PURE__*/(0, _react.forwardRef)(function (_ref2, ref) {
  var referenceProps = _ref2.referenceProps,
    rest = _objectWithoutProperties(_ref2, _excluded);
  return /*#__PURE__*/_react["default"].createElement(_springUi.Popper, _extends({}, rest, {
    ref: ref,
    "data-sign": 'call-log-reference-popper',
    padding: {
      bottom: 60
    }
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "bg-neutral-base rounded-sui-sm shadow-sui-md border border-neutral-b4 overflow-hidden",
    "data-sign": "".concat(referenceProps.formKey, "-popper")
  }, /*#__PURE__*/_react["default"].createElement(ReferenceMainContent, referenceProps)));
});
var useReferencePopper = exports.useReferencePopper = function useReferencePopper(_ref3) {
  var filterTerm = _ref3.filterTerm,
    allDisplayList = _ref3.allDisplayList,
    currentValue = _ref3.currentValue,
    formKey = _ref3.formKey,
    onItemClick = _ref3.onItemClick,
    _ref3$enableSearch = _ref3.enableSearch,
    enableSearch = _ref3$enableSearch === void 0 ? true : _ref3$enableSearch,
    searchFn = _ref3.searchFn,
    useMenuList = _ref3.useMenuList,
    getIcon = _ref3.getIcon,
    _anchorEl = _ref3.anchorEl;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  var MemoizedReferencePopperComponent = (0, _react.useCallback)(/*#__PURE__*/(0, _react.forwardRef)(function (props, ref) {
    return /*#__PURE__*/_react["default"].createElement(ReferencePopperComponent, _extends({}, props, {
      anchorEl:
      // use outer anchorEl if provided, otherwise use inner default anchorEl
      function anchorEl() {
        if (_anchorEl) {
          if (typeof _anchorEl !== 'function') {
            return _anchorEl;
          }
          var elm = _anchorEl();
          if (elm) return elm;
        }
        if (props.anchorEl) {
          if (typeof props.anchorEl !== 'function') {
            return props.anchorEl;
          }
          var _elm = props.anchorEl();
          if (_elm) return _elm;
        }
        return null;
      },
      ref: ref,
      referenceProps: {
        searchFn: searchFn,
        onItemClick: onItemClick,
        formKey: formKey,
        allDisplayList: allDisplayList,
        filterTerm: filterTerm,
        currentValue: currentValue,
        enableSearch: enableSearch,
        useMenuList: useMenuList,
        getIcon: getIcon
      }
    }));
  }), [_anchorEl, formKey, allDisplayList, onItemClick, currentValue, filterTerm, enableSearch, searchFn, useMenuList, getIcon]);
  return MemoizedReferencePopperComponent;
};
//# sourceMappingURL=ReferencePopper.js.map
