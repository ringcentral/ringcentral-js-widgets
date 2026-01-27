"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HeaderNavViewSpring = void 0;
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.string.includes.js");
var _nextCore = require("@ringcentral-integration/next-core");
var _react = _interopRequireWildcard(require("react"));
var _services = require("../../services");
var _HeaderNav = require("./HeaderNav");
var _i18n = require("./i18n");
var _tabs = require("./utils/tabs");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
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
var HeaderNavViewSpring = exports.HeaderNavViewSpring = (_dec = (0, _nextCore.injectable)({
  name: 'HeaderNavViewSpring'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)('HeaderNavViewOptions')(target, undefined, 2);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _services.Locale === "undefined" ? Object : _services.Locale, typeof _nextCore.RouterPlugin === "undefined" ? Object : _nextCore.RouterPlugin, typeof HeaderNavViewSpringOptions === "undefined" ? Object : HeaderNavViewSpringOptions]), _dec5 = (0, _nextCore.dynamic)('CallHistory'), _dec6 = Reflect.metadata("design:type", typeof CallHistory === "undefined" ? Object : CallHistory), _dec7 = (0, _nextCore.dynamic)('MessageStore'), _dec8 = Reflect.metadata("design:type", typeof MessageStore === "undefined" ? Object : MessageStore), _dec9 = (0, _nextCore.dynamic)('MessageThread'), _dec0 = Reflect.metadata("design:type", typeof MessageThread === "undefined" ? Object : MessageThread), _dec1 = (0, _nextCore.dynamic)('AppFeatures'), _dec10 = Reflect.metadata("design:type", typeof AppFeatures === "undefined" ? Object : AppFeatures), _dec11 = Reflect.metadata("design:type", Function), _dec12 = Reflect.metadata("design:paramtypes", []), _dec13 = Reflect.metadata("design:type", Function), _dec14 = Reflect.metadata("design:paramtypes", []), _dec15 = Reflect.metadata("design:type", Function), _dec16 = Reflect.metadata("design:paramtypes", []), _dec17 = Reflect.metadata("design:type", Function), _dec18 = Reflect.metadata("design:paramtypes", []), _dec19 = Reflect.metadata("design:type", Function), _dec20 = Reflect.metadata("design:paramtypes", []), _dec21 = Reflect.metadata("design:type", Function), _dec22 = Reflect.metadata("design:paramtypes", []), _dec23 = Reflect.metadata("design:type", Function), _dec24 = Reflect.metadata("design:paramtypes", []), _dec25 = Reflect.metadata("design:type", Function), _dec26 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (_class2 = /*#__PURE__*/function (_RcViewModule) {
  function HeaderNavViewSpring(_locale, _router, _headerNavViewOptions) {
    var _this;
    _classCallCheck(this, HeaderNavViewSpring);
    _this = _callSuper(this, HeaderNavViewSpring);
    _this._locale = _locale;
    _this._router = _router;
    _this._headerNavViewOptions = _headerNavViewOptions;
    _initializerDefineProperty(_this, "_callHistory", _descriptor, _this);
    _initializerDefineProperty(_this, "_messageStore", _descriptor2, _this);
    _initializerDefineProperty(_this, "_messageThread", _descriptor3, _this);
    _initializerDefineProperty(_this, "_appFeatures", _descriptor4, _this);
    return _this;
  }
  _inherits(HeaderNavViewSpring, _RcViewModule);
  return _createClass(HeaderNavViewSpring, [{
    key: "textUnReadCounts",
    get: function get() {
      var _this$_messageStore$t, _this$_messageStore, _this$_messageThread$, _this$_messageThread;
      return ((_this$_messageStore$t = (_this$_messageStore = this._messageStore) === null || _this$_messageStore === void 0 ? void 0 : _this$_messageStore.textUnreadCounts) !== null && _this$_messageStore$t !== void 0 ? _this$_messageStore$t : 0) + ((_this$_messageThread$ = (_this$_messageThread = this._messageThread) === null || _this$_messageThread === void 0 ? void 0 : _this$_messageThread.threadUnreadCount) !== null && _this$_messageThread$ !== void 0 ? _this$_messageThread$ : 0);
    }
  }, {
    key: "voicemailUnReadCounts",
    get: function get() {
      var _this$_messageStore$v, _this$_messageStore2;
      return (_this$_messageStore$v = (_this$_messageStore2 = this._messageStore) === null || _this$_messageStore2 === void 0 ? void 0 : _this$_messageStore2.voiceUnreadCounts) !== null && _this$_messageStore$v !== void 0 ? _this$_messageStore$v : 0;
    }
  }, {
    key: "missedCallsUnreadCounts",
    get: function get() {
      var _this$_callHistory$mi, _this$_callHistory;
      return (_this$_callHistory$mi = (_this$_callHistory = this._callHistory) === null || _this$_callHistory === void 0 ? void 0 : _this$_callHistory.missedCallsUnreadCounts) !== null && _this$_callHistory$mi !== void 0 ? _this$_callHistory$mi : 0;
    }
  }, {
    key: "faxUnReadCounts",
    get: function get() {
      var _this$_messageStore$f, _this$_messageStore3;
      return (_this$_messageStore$f = (_this$_messageStore3 = this._messageStore) === null || _this$_messageStore3 === void 0 ? void 0 : _this$_messageStore3.faxUnreadCounts) !== null && _this$_messageStore$f !== void 0 ? _this$_messageStore$f : 0;
    }
  }, {
    key: "currentLocale",
    get: function get() {
      return this._locale.currentLocale;
    }
  }, {
    key: "_dialerActive",
    get: function get() {
      var _this$_router$current;
      return (_this$_router$current = this._router.currentPath) === null || _this$_router$current === void 0 ? void 0 : _this$_router$current.includes('/dialer');
    }
  }, {
    key: "_videoActive",
    get: function get() {
      var _this$_router$current2;
      return (_this$_router$current2 = this._router.currentPath) === null || _this$_router$current2 === void 0 ? void 0 : _this$_router$current2.includes('/meeting');
    }
  }, {
    key: "_textActive",
    get: function get() {
      var currentPath = this._router.currentPath;
      return currentPath === '/messages' ||
      // * here is new logic difference with the old one
      currentPath === '/composeText' || currentPath.indexOf('/conversations/') !== -1;
    }
  }, {
    key: "_settingsActive",
    get: function get() {
      var currentPath = this._router.currentPath;
      return currentPath.substring(0, 9) === '/settings';
    }
  }, {
    key: "dialTab",
    get: function get() {
      return _objectSpread(_objectSpread({}, _tabs.defaultTabMap.dialer), {}, {
        title: (0, _i18n.t)('phone'),
        tooltip: /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", null, (0, _i18n.t)('keypad')), /*#__PURE__*/_react["default"].createElement("div", null, (0, _i18n.t)('calls')), /*#__PURE__*/_react["default"].createElement("div", null, (0, _i18n.t)('voicemails'))),
        to: '/dialer',
        active: this._dialerActive,
        dataSign: 'dialerTab',
        BadgeProps: {
          max: 99,
          count: this.voicemailUnReadCounts + this.missedCallsUnreadCounts
        }
      });
    }
  }, {
    key: "textTab",
    get: function get() {
      return _objectSpread(_objectSpread({}, _tabs.defaultTabMap.text), {}, {
        title: (0, _i18n.t)('text'),
        // TODO: change to /text in the future
        to: '/messages',
        dataSign: 'textTab',
        active: this._textActive,
        BadgeProps: {
          max: 99,
          count: this.textUnReadCounts
        }
      });
    }
  }, {
    key: "videoTab",
    get: function get() {
      return _objectSpread(_objectSpread({}, _tabs.defaultTabMap.video), {}, {
        title: (0, _i18n.t)('video'),
        active: this._videoActive,
        to: '/meeting',
        dataSign: 'videoTab'
      });
    }
  }, {
    key: "faxTab",
    get: function get() {
      return _objectSpread(_objectSpread({}, _tabs.defaultTabMap.fax), {}, {
        title: (0, _i18n.t)('fax'),
        to: '/fax',
        dataSign: 'faxTab',
        BadgeProps: {
          max: 99,
          count: this.faxUnReadCounts
        }
      });
    }
  }, {
    key: "settingsTab",
    get: function get() {
      return _objectSpread(_objectSpread({}, _tabs.defaultTabMap.settings), {}, {
        title: (0, _i18n.t)('settings'),
        to: '/settings',
        active: this._settingsActive,
        dataSign: 'settingsTab'
      });
    }
  }, {
    key: "tabs",
    get: function get() {
      var _this$_appFeatures, _this$_appFeatures2, _this$_appFeatures3, _this$_headerNavViewO;
      var appFeatures = this._appFeatures;
      var showDialPad = appFeatures && (appFeatures.isCallingEnabled || appFeatures.hasReadExtensionCallLog);
      var showText = (_this$_appFeatures = this._appFeatures) === null || _this$_appFeatures === void 0 ? void 0 : _this$_appFeatures.hasReadTextPermission;
      var showFax = (_this$_appFeatures2 = this._appFeatures) === null || _this$_appFeatures2 === void 0 ? void 0 : _this$_appFeatures2.hasReadFaxPermission;
      var showVideo = (_this$_appFeatures3 = this._appFeatures) === null || _this$_appFeatures3 === void 0 ? void 0 : _this$_appFeatures3.hasMeetingsPermission;
      var tabs = [];
      showDialPad && tabs.push(this.dialTab);
      showText && tabs.push(this.textTab);
      showFax && tabs.push(this.faxTab);
      if ((_this$_headerNavViewO = this._headerNavViewOptions) === null || _this$_headerNavViewO === void 0 ? void 0 : _this$_headerNavViewO.enableVideoTab) {
        showVideo && tabs.push(this.videoTab);
      }
      tabs.push(this.settingsTab);
      return tabs;
    }
  }, {
    key: "getUIProps",
    value: function getUIProps() {
      return {
        tabs: this.tabs,
        currentPath: this._router.currentPath
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions() {
      var _this2 = this;
      return {
        onChange: function onChange(to) {
          if (!to ||
          // when route be same also not push again
          _this2._router.currentPath === to) {
            return;
          }
          _this2._router.push(to);
        }
      };
    }
  }, {
    key: "component",
    value: function component(props) {
      var _this3 = this,
        _this$_headerNavViewO2,
        _this$_headerNavViewO3;
      var _useRef = (0, _react.useRef)(this.getUIFunctions()),
        uiFunctions = _useRef.current;
      var _props = (0, _nextCore.useConnector)(function () {
        var uiProps = _this3.getUIProps();
        return _objectSpread(_objectSpread({}, props), uiProps);
      });
      var HeaderNavPanel = (_this$_headerNavViewO2 = (_this$_headerNavViewO3 = this._headerNavViewOptions) === null || _this$_headerNavViewO3 === void 0 ? void 0 : _this$_headerNavViewO3.component) !== null && _this$_headerNavViewO2 !== void 0 ? _this$_headerNavViewO2 : _HeaderNav.HeaderNav;
      return /*#__PURE__*/_react["default"].createElement(HeaderNavPanel, _extends({}, _props, uiFunctions));
    }
  }]);
}(_nextCore.RcViewModule), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_callHistory", [_dec5, _dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_messageStore", [_dec7, _dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_messageThread", [_dec9, _dec0], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_appFeatures", [_dec1, _dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, "_textActive", [_nextCore.computed, _dec11, _dec12], Object.getOwnPropertyDescriptor(_class2.prototype, "_textActive"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_settingsActive", [_nextCore.computed, _dec13, _dec14], Object.getOwnPropertyDescriptor(_class2.prototype, "_settingsActive"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "dialTab", [_nextCore.computed, _dec15, _dec16], Object.getOwnPropertyDescriptor(_class2.prototype, "dialTab"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "textTab", [_nextCore.computed, _dec17, _dec18], Object.getOwnPropertyDescriptor(_class2.prototype, "textTab"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "videoTab", [_nextCore.computed, _dec19, _dec20], Object.getOwnPropertyDescriptor(_class2.prototype, "videoTab"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "faxTab", [_nextCore.computed, _dec21, _dec22], Object.getOwnPropertyDescriptor(_class2.prototype, "faxTab"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "settingsTab", [_nextCore.computed, _dec23, _dec24], Object.getOwnPropertyDescriptor(_class2.prototype, "settingsTab"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "tabs", [_nextCore.computed, _dec25, _dec26], Object.getOwnPropertyDescriptor(_class2.prototype, "tabs"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class);
//# sourceMappingURL=HeaderNav.view.js.map
