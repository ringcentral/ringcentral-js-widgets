"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SyncTabView = exports.SyncTabId = exports.ConversationsSyncTabId = exports.CallLogSyncTabId = void 0;
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.entries.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/es.string.replace.js");
require("core-js/modules/web.dom-collections.for-each.js");
var _nextCore = require("@ringcentral-integration/next-core");
var _springUi = require("@ringcentral/spring-ui");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _rxjs = require("rxjs");
var _hooks = require("../../hooks");
var _i18n = _interopRequireDefault(require("./i18n"));
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _class, _class2, _descriptor;
var _excluded = ["children", "BadgeProps"],
  _excluded2 = ["id", "tabs", "defaultValue", "className", "children", "variant", "tabsContainerClassName", "tabClassName", "tabRootClassName"];
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var DEFAULT_STATE = {};
var MenuItemComponent = /*#__PURE__*/(0, _react.forwardRef)(function (props, ref) {
  var children = props.children,
    BadgeProps = props.BadgeProps,
    rest = _objectWithoutProperties(props, _excluded);
  return /*#__PURE__*/_react["default"].createElement(_springUi.MenuItem, _extends({
    ref: ref
  }, rest), children, /*#__PURE__*/_react["default"].createElement(_springUi.Badge, _extends({
    color: "secondary"
  }, BadgeProps)));
});

/**
 * Sync Tab View will use router state to sync the active tab between different tabs.
 *
 * you can specify the `id` to identify the tab group, and the `tabs` to specify the tabs.
 *
 * when you want to change the active tab, you can use
 *
 * ```ts
 * this._router.push('somePath that render the tab', { [id]: value });
 *
 * // for example
 * this._router.push('dialer', { dialPadTabs: 'dialer' });
 *
 * // you can use the setActive method to change the active tab when you on the page
 * this._syncTabView.setActive('dialPadTabs', 'dialer');
 * ```
 *
 * in current usage, suggest use enum `SyncTabId` to define the tab id and use in everywhere.
 */
var SyncTabView = exports.SyncTabView = (_dec = (0, _nextCore.injectable)({
  name: 'SyncTabView'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)('SyncTabViewOptions')(target, undefined, 2);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _nextCore.RouterPlugin === "undefined" ? Object : _nextCore.RouterPlugin, typeof _nextCore.PortManager === "undefined" ? Object : _nextCore.PortManager, typeof SyncTabViewOptions === "undefined" ? Object : SyncTabViewOptions]), _dec5 = Reflect.metadata("design:type", typeof Record === "undefined" ? Object : Record), _dec6 = Reflect.metadata("design:type", Function), _dec7 = Reflect.metadata("design:paramtypes", [String, Object]), _dec8 = (0, _nextCore.delegate)('server'), _dec9 = Reflect.metadata("design:type", Function), _dec0 = Reflect.metadata("design:paramtypes", [String, Object]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (_class2 = /*#__PURE__*/function (_RcViewModule) {
  function SyncTabView(_router, _portManager, _syncTabViewOptions) {
    var _this;
    _classCallCheck(this, SyncTabView);
    _this = _callSuper(this, SyncTabView);
    _this._router = _router;
    _this._portManager = _portManager;
    _this._syncTabViewOptions = _syncTabViewOptions;
    _initializerDefineProperty(_this, "tabInfo", _descriptor, _this);
    if (_this._portManager.shared) {
      _this._portManager.onServer(function () {
        _this.listenServerStateChange();
      });
    } else {
      _this.listenServerStateChange();
    }
    return _this;
  }
  _inherits(SyncTabView, _RcViewModule);
  return _createClass(SyncTabView, [{
    key: "_setTabInfo",
    value: function _setTabInfo(key, val) {
      if (this.tabInfo[key]) {
        Object.assign(this.tabInfo[key], val);
      } else {
        this.tabInfo[key] = val;
      }
    }
  }, {
    key: "setTabInfo",
    value: function () {
      var _setTabInfo2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(key, val) {
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              this._setTabInfo(key, val);
            case 1:
              return _context.a(2);
          }
        }, _callee, this);
      }));
      function setTabInfo(_x, _x2) {
        return _setTabInfo2.apply(this, arguments);
      }
      return setTabInfo;
    }()
  }, {
    key: "listenServerStateChange",
    value: function listenServerStateChange() {
      var _this2 = this;
      (0, _nextCore.fromWatchValue)(this, function () {
        return _this2.locationState;
      }).pipe((0, _rxjs.tap)(function (state) {
        Object.entries(state).forEach(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
            tabId = _ref2[0],
            activeTab = _ref2[1];
          _this2.setTabInfo(tabId, {
            active: activeTab
          });
        });
      }), _nextCore.takeUntilAppDestroy).subscribe();
    }
  }, {
    key: "locationState",
    get: function get() {
      var _this$_router$router;
      return ((_this$_router$router = this._router.router) === null || _this$_router$router === void 0 ? void 0 : _this$_router$router.location.state) || DEFAULT_STATE;
    }
  }, {
    key: "getActive",
    value: function getActive(tabId) {
      var _this$tabInfo$tabId;
      return (_this$tabInfo$tabId = this.tabInfo[tabId]) === null || _this$tabInfo$tabId === void 0 ? void 0 : _this$tabInfo$tabId.active;
    }

    /**
     * that should only use when target tabId's tab be rendered
     */
  }, {
    key: "setActive",
    value: function setActive(tabId, activeTab) {
      this.setTabInfo(tabId, {
        active: activeTab
      });
      this._router.push(this._router.currentPath, _objectSpread(_objectSpread({}, this.locationState), {}, _defineProperty({}, tabId, activeTab)));
    }

    /**
     * replace the active tab
     */
  }, {
    key: "replaceActive",
    value: (function () {
      var _replaceActive = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(tabId, activeTab) {
        var _this$tabInfo$tabId2;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              if (!(((_this$tabInfo$tabId2 = this.tabInfo[tabId]) === null || _this$tabInfo$tabId2 === void 0 ? void 0 : _this$tabInfo$tabId2.active) === activeTab)) {
                _context2.n = 1;
                break;
              }
              return _context2.a(2);
            case 1:
              this.setTabInfo(tabId, {
                active: activeTab
              });

              // wait a tick to avoid the dom tree be destroyed during rendering
              _context2.n = 2;
              return Promise.resolve();
            case 2:
              this._router.replace(this._router.currentPath, _objectSpread(_objectSpread({}, this.locationState), {}, _defineProperty({}, tabId, activeTab)));
            case 3:
              return _context2.a(2);
          }
        }, _callee2, this);
      }));
      function replaceActive(_x3, _x4) {
        return _replaceActive.apply(this, arguments);
      }
      return replaceActive;
    }())
  }, {
    key: "component",
    value: function component(_ref3) {
      var _this3 = this,
        _tabMap$currentTab;
      var id = _ref3.id,
        tabs = _ref3.tabs,
        defaultValueProp = _ref3.defaultValue,
        className = _ref3.className,
        children = _ref3.children,
        variantProp = _ref3.variant,
        tabsContainerClassName = _ref3.tabsContainerClassName,
        tabClassName = _ref3.tabClassName,
        tabRootClassName = _ref3.tabRootClassName,
        rest = _objectWithoutProperties(_ref3, _excluded2);
      var tabInfo = (0, _nextCore.useConnector)(function () {
        return _this3.tabInfo[id];
      });
      var _useLocale = (0, _hooks.useLocale)(_i18n["default"]),
        t = _useLocale.t;
      var tabMap = (0, _react.useMemo)(function () {
        return tabs.reduce(function (acc, _ref4) {
          var tabKey = _ref4.id,
            component = _ref4.component;
          acc[tabKey] = component;
          return acc;
        }, {});
      }, [tabs]);
      var defaultValue = defaultValueProp !== null && defaultValueProp !== void 0 ? defaultValueProp : tabs[0].id;
      var currentTab = (0, _react.useMemo)(function () {
        var _tabInfo$active;
        var activeKey = (_tabInfo$active = tabInfo === null || tabInfo === void 0 ? void 0 : tabInfo.active) !== null && _tabInfo$active !== void 0 ? _tabInfo$active : defaultValue;
        var keys = Object.keys(tabMap);

        // when the currentTab not exist in the tabMap, use the first as render tab
        if (!tabMap[activeKey] && keys.length > 0) return keys[0];
        return activeKey;
      }, [defaultValue, tabInfo === null || tabInfo === void 0 ? void 0 : tabInfo.active, tabMap]);
      var _useState = (0, _react.useState)(0),
        _useState2 = _slicedToArray(_useState, 2),
        moreMenuBadgeCount = _useState2[0],
        setMoreMenuBadgeCount = _useState2[1];
      var variant = variantProp !== null && variantProp !== void 0 ? variantProp : 'moreMenu';
      var moreProps = (0, _react.useMemo)(function () {
        return variant === 'moreMenu' ? {
          onGroupInfoUpdate: function onGroupInfoUpdate(_, hiddenItemValues) {
            var count = tabs.filter(function (_ref5) {
              var tabKey = _ref5.id;
              return hiddenItemValues.includes(tabKey);
            }).reduce(function (acc, _ref6) {
              var _BadgeProps$count;
              var BadgeProps = _ref6.BadgeProps;
              return acc + ((_BadgeProps$count = BadgeProps === null || BadgeProps === void 0 ? void 0 : BadgeProps.count) !== null && _BadgeProps$count !== void 0 ? _BadgeProps$count : 0);
            }, 0);
            setMoreMenuBadgeCount(count);
          },
          MoreMenuProps: {
            title: t('more'),
            BadgeProps: {
              count: moreMenuBadgeCount
            },
            ButtonProps: {
              'aria-label': t('more')
            },
            MenuItemComponent: MenuItemComponent
          }
        } : {};
      }, [moreMenuBadgeCount, t, tabs, variant]);
      var tabRootClasses = (0, _clsx["default"])('h-7 p-0 pl-2 pr-2 flex items-center', tabRootClassName);
      var tabWidthClasses = (0, _clsx["default"])('flex-1', tabClassName);
      return /*#__PURE__*/_react["default"].createElement(_springUi.TabContext, {
        defaultValue: defaultValue,
        value: currentTab,
        onChange: function onChange(_, value) {
          _this3.setActive(id, value);
        }
      },
      // only when tabs.length > 1, need show the tab selection
      tabs.length > 1 && /*#__PURE__*/_react["default"].createElement(_springUi.Tabs, _extends({
        variant: variant,
        className: (0, _clsx["default"])(className, 'h-7', tabsContainerClassName)
      }, moreProps, rest), tabs.map(function (_ref7) {
        var tabKey = _ref7.id,
          label = _ref7.label,
          BadgeProps = _ref7.BadgeProps;
        return /*#__PURE__*/_react["default"].createElement(_springUi.Tab, {
          id: tabKey,
          key: tabKey,
          value: tabKey,
          "data-sign": "".concat(tabKey, "Tab"),
          label: label,
          BadgeProps: BadgeProps,
          className: tabWidthClasses,
          classes: {
            root: tabRootClasses
          }
        });
      })), (_tabMap$currentTab = tabMap[currentTab]) !== null && _tabMap$currentTab !== void 0 ? _tabMap$currentTab : children);
    }
  }]);
}(_nextCore.RcViewModule), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "tabInfo", [_nextCore.state, _dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_setTabInfo", [_nextCore.action, _dec6, _dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "_setTabInfo"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setTabInfo", [_dec8, _dec9, _dec0], Object.getOwnPropertyDescriptor(_class2.prototype, "setTabInfo"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class);
var SyncTabId = exports.SyncTabId = /*#__PURE__*/function (SyncTabId) {
  SyncTabId["DIALPAD"] = "dialPadTabs";
  SyncTabId["CALL_LOG"] = "callLogTabs";
  SyncTabId["CONVERSATIONS"] = "conversationsTabs";
  return SyncTabId;
}({});
var CallLogSyncTabId = exports.CallLogSyncTabId = /*#__PURE__*/function (CallLogSyncTabId) {
  CallLogSyncTabId["LOG"] = "callLog";
  CallLogSyncTabId["AI_NOTE"] = "aiNote";
  return CallLogSyncTabId;
}({});
var ConversationsSyncTabId = exports.ConversationsSyncTabId = /*#__PURE__*/function (ConversationsSyncTabId) {
  ConversationsSyncTabId["PERSONAL"] = "personal";
  ConversationsSyncTabId["SHARED"] = "shared";
  return ConversationsSyncTabId;
}({});
//# sourceMappingURL=SyncTab.view.js.map
