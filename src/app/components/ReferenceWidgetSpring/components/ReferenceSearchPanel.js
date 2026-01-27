"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReferenceSearchPanel = void 0;
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.includes.js");
var _components = require("@ringcentral-integration/micro-core/src/app/components");
var _hooks = require("@ringcentral-integration/micro-core/src/app/hooks");
var _components2 = require("@ringcentral-integration/next-widgets/components");
var _springIcon = require("@ringcentral/spring-icon");
var _springUi = require("@ringcentral/spring-ui");
var _react = _interopRequireWildcard(require("react"));
var _FilterAndSearchHint = require("./FilterAndSearchHint");
var _ReferenceList = require("./ReferenceList");
var _i18n = _interopRequireDefault(require("./i18n"));
var _no_search_results = _interopRequireDefault(require("./no_search_results.svg"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t2 in e) "default" !== _t2 && {}.hasOwnProperty.call(e, _t2) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t2)) && (i.get || i.set) ? o(f, _t2, i) : f[_t2] = e[_t2]); return f; })(e, t); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var ReferenceSearchPanel = exports.ReferenceSearchPanel = function ReferenceSearchPanel(_ref) {
  var initValue = _ref.initValue,
    searchFn = _ref.searchFn,
    selectedMap = _ref.selectedMap,
    onItemClick = _ref.onItemClick,
    expandMode = _ref.expandMode,
    closePageFn = _ref.closePageFn,
    onCreateEntity = _ref.onCreateEntity,
    addEntityMenu = _ref.addEntityMenu,
    onBack = _ref.onBack,
    useMenuList = _ref.useMenuList,
    getIcon = _ref.getIcon,
    addEntityTooltip = _ref.addEntityTooltip;
  var _useLocale = (0, _hooks.useLocale)(_i18n["default"]),
    t = _useLocale.t;
  var _React$useState = _react["default"].useState(initValue),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    searchValue = _React$useState2[0],
    setSearchValue = _React$useState2[1];
  var _React$useState3 = _react["default"].useState(false),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    noChangeSearchTerm = _React$useState4[0],
    setNoChangeSearchTerm = _React$useState4[1];
  var _React$useState5 = _react["default"].useState(false),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    searching = _React$useState6[0],
    setSearching = _React$useState6[1];
  var _React$useState7 = _react["default"].useState(false),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    searchError = _React$useState8[0],
    setSearchError = _React$useState8[1];
  var _React$useState9 = _react["default"].useState(),
    _React$useState0 = _slicedToArray(_React$useState9, 2),
    searchResult = _React$useState0[0],
    setSearchResult = _React$useState0[1];

  // Menu state for search panel
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    menuOpen = _useState2[0],
    setMenuOpen = _useState2[1];
  var addEntityButtonRef = (0, _react.useRef)(null);
  var handleMenuOpen = function handleMenuOpen() {
    return setMenuOpen(true);
  };
  var handleMenuClose = function handleMenuClose() {
    return setMenuOpen(false);
  };
  var displayList = (0, _react.useMemo)(function () {
    return searchResult === null || searchResult === void 0 ? void 0 : searchResult.filter(function (record) {
      var _record$name;
      return (_record$name = record.name) === null || _record$name === void 0 ? void 0 : _record$name.toLowerCase().includes(searchValue.toLowerCase());
    });
  }, [searchResult, searchValue]);
  var searchHandler = (0, _react.useCallback)(/*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(searchTerm) {
      var res, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            setSearching(true);
            setSearchResult(void 0);
            _context.p = 1;
            _context.n = 2;
            return searchFn === null || searchFn === void 0 ? void 0 : searchFn(searchTerm);
          case 2:
            res = _context.v;
            setSearchResult(res);
            setNoChangeSearchTerm(true);
            _context.n = 4;
            break;
          case 3:
            _context.p = 3;
            _t = _context.v;
            setSearchError(true);
            setSearchResult(void 0);
          case 4:
            _context.p = 4;
            setSearching(false);
            return _context.f(4);
          case 5:
            return _context.a(2);
        }
      }, _callee, null, [[1, 3, 4, 5]]);
    }));
    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  }(), [searchFn]);
  (0, _react.useEffect)(function () {
    // init search
    searchHandler(searchValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  var searchTitle = t('search');
  var notFoundAnyResult = noChangeSearchTerm && (searchResult === null || searchResult === void 0 ? void 0 : searchResult.length) === 0;
  var noResultMainContent = /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex-col flex justify-center items-center gpa-3 mt-24"
  }, /*#__PURE__*/_react["default"].createElement(_no_search_results["default"], {
    height: 120,
    width: 120
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-center text-14 text-gray-500"
  }, t('noSearchResult')));
  var searchingContent = /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex-col flex justify-center items-center gpa-4 mt-40"
  }, /*#__PURE__*/_react["default"].createElement(_springUi.CircularProgressIndicator, {
    size: "large"
  }));
  var onPressEnter = (0, _react.useCallback)(function (e) {
    if (e.key === 'Enter') {
      if (searching || notFoundAnyResult) return;
      searchHandler(searchValue);
    }
  }, [searchHandler, searchValue, searching, notFoundAnyResult]);

  // Wrap onItemClick to close the panel after selection in menuList (single select) mode
  var handleItemClick = (0, _react.useCallback)(function (item, selected) {
    onItemClick(item, selected);
    if (useMenuList) {
      closePageFn();
    }
  }, [onItemClick, useMenuList, closePageFn]);
  return /*#__PURE__*/_react["default"].createElement(_components.ExpandedLayoutPopper, {
    expanded: Boolean(expandMode)
  }, /*#__PURE__*/_react["default"].createElement(_springUi.FocusTrap, {
    open: true
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "outline-none flex flex-col h-full",
    "data-sign": "referenceSearchPanel",
    tabIndex: -1
  }, /*#__PURE__*/_react["default"].createElement(_components2.PageHeader, {
    onBackClick: function onBackClick() {
      closePageFn();
      onBack === null || onBack === void 0 ? void 0 : onBack();
    },
    endAdornment: /*#__PURE__*/_react["default"].createElement(_springUi.IconButton, {
      TooltipProps: {
        title: addEntityTooltip
      },
      "data-sign": "addEntity",
      symbol: _springIcon.PlusMd,
      color: "secondary",
      variant: "icon",
      ref: addEntityButtonRef,
      onClick: function onClick() {
        if (addEntityMenu) {
          handleMenuOpen();
        } else {
          onCreateEntity === null || onCreateEntity === void 0 ? void 0 : onCreateEntity();
        }
      }
    }),
    className: "h-14"
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: "sui-text sui-text-root truncate",
    title: searchTitle
  }, searchTitle)), /*#__PURE__*/_react["default"].createElement("div", {
    className: "gap-3"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "mx-4"
  }, /*#__PURE__*/_react["default"].createElement(_springUi.TextField, {
    size: "medium",
    inputProps: {
      'data-sign': 'searchPanelSearchInput'
    },
    value: searchValue,
    disabled: searching,
    fullWidth: true,
    onChange: function onChange(e) {
      setSearchValue(e.target.value);
      setNoChangeSearchTerm(false);
    },
    clearBtn: true,
    startAdornment: /*#__PURE__*/_react["default"].createElement(_springUi.Icon, {
      symbol: _springIcon.SearchMd,
      size: "small"
    }),
    onKeyDown: onPressEnter
  })), searching && searchingContent, !searching && !notFoundAnyResult && /*#__PURE__*/_react["default"].createElement(_FilterAndSearchHint.FilterAndSearchHint, {
    searchValue: searchValue,
    onClickHandler: function onClickHandler() {
      return searchHandler(searchValue);
    },
    enableSearch: true
  })), !notFoundAnyResult && displayList && displayList.length > 0 && /*#__PURE__*/_react["default"].createElement(_ReferenceList.ReferenceList, {
    list: displayList,
    onItemClick: handleItemClick,
    selectedMap: selectedMap,
    highLightText: searchValue,
    useMenuList: useMenuList,
    getIcon: getIcon
  }), notFoundAnyResult && noResultMainContent)), addEntityMenu && /*#__PURE__*/_react["default"].createElement(_springUi.Menu, {
    open: menuOpen,
    anchorEl: function anchorEl() {
      return addEntityButtonRef.current;
    },
    onClose: handleMenuClose
  }, addEntityMenu.options.map(function (option) {
    return /*#__PURE__*/_react["default"].createElement(_springUi.MenuItem, {
      key: option.type,
      onClick: function onClick() {
        addEntityMenu.onSelect(option.type);
        handleMenuClose();
      }
    }, /*#__PURE__*/_react["default"].createElement("span", {
      className: "mr-2"
    }, option.icon), /*#__PURE__*/_react["default"].createElement(_springUi.MenuItemText, null, option.label));
  })));
};
//# sourceMappingURL=ReferenceSearchPanel.js.map
