"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
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
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HeaderNavView = void 0;
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.sort.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
var _nextCore = require("@ringcentral-integration/next-core");
var _HeaderNav = require("@ringcentral-integration/next-widgets/deprecated/components/HeaderNav");
var _hasActiveCalls = require("@ringcentral-integration/widgets/lib/hasActiveCalls");
var _react = _interopRequireWildcard(require("react"));
var _services = require("../../services");
var _i18n = require("./i18n");
var _tabs = require("./utils/tabs");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _dec34, _dec35, _dec36, _dec37, _dec38, _dec39, _dec40, _dec41, _dec42, _dec43, _dec44, _dec45, _dec46, _dec47, _dec48, _dec49, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;
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
var HeaderNavView = exports.HeaderNavView = (_dec = (0, _nextCore.injectable)({
  name: 'HeaderNavView'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)('Manifest')(target, undefined, 2);
}, _dec3 = function _dec3(target, key) {
  return (0, _nextCore.optional)('HeaderNavViewOptions')(target, undefined, 3);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _services.Locale === "undefined" ? Object : _services.Locale, typeof _nextCore.RouterPlugin === "undefined" ? Object : _nextCore.RouterPlugin, typeof Manifest === "undefined" ? Object : Manifest, typeof HeaderNavViewOptions === "undefined" ? Object : HeaderNavViewOptions]), _dec6 = (0, _nextCore.dynamic)('MessageStore'), _dec7 = Reflect.metadata("design:type", typeof MessageStore === "undefined" ? Object : MessageStore), _dec8 = (0, _nextCore.dynamic)('AppFeatures'), _dec9 = Reflect.metadata("design:type", typeof AppFeatures === "undefined" ? Object : AppFeatures), _dec0 = (0, _nextCore.dynamic)('CallingSettings'), _dec1 = Reflect.metadata("design:type", typeof CallingSettings === "undefined" ? Object : CallingSettings), _dec10 = (0, _nextCore.dynamic)('Webphone'), _dec11 = Reflect.metadata("design:type", typeof Webphone === "undefined" ? Object : Webphone), _dec12 = (0, _nextCore.dynamic)('CallMonitor'), _dec13 = Reflect.metadata("design:type", typeof CallMonitor === "undefined" ? Object : CallMonitor), _dec14 = (0, _nextCore.computed)(function (that) {
  return [that._router.currentPath];
}), _dec15 = Reflect.metadata("design:type", Function), _dec16 = Reflect.metadata("design:paramtypes", []), _dec17 = (0, _nextCore.computed)(function (that) {
  return [that._router.currentPath];
}), _dec18 = Reflect.metadata("design:type", Function), _dec19 = Reflect.metadata("design:paramtypes", []), _dec20 = (0, _nextCore.computed)(function (that) {
  return [that._router.currentPath];
}), _dec21 = Reflect.metadata("design:type", Function), _dec22 = Reflect.metadata("design:paramtypes", []), _dec23 = (0, _nextCore.computed)(function (that) {
  return [that._router.currentPath];
}), _dec24 = Reflect.metadata("design:type", Function), _dec25 = Reflect.metadata("design:paramtypes", []), _dec26 = (0, _nextCore.computed)(function (that) {
  return [that._dialerActive, that.currentLocale];
}), _dec27 = Reflect.metadata("design:type", Function), _dec28 = Reflect.metadata("design:paramtypes", []), _dec29 = (0, _nextCore.computed)(function (that) {
  return [that._callsActive, that.currentLocale];
}), _dec30 = Reflect.metadata("design:type", Function), _dec31 = Reflect.metadata("design:paramtypes", []), _dec32 = (0, _nextCore.computed)(function (that) {
  return [that.currentLocale];
}), _dec33 = Reflect.metadata("design:type", Function), _dec34 = Reflect.metadata("design:paramtypes", []), _dec35 = (0, _nextCore.computed)(function (that) {
  return [that._messageActive, that.unreadCounts, that.currentLocale];
}), _dec36 = Reflect.metadata("design:type", Function), _dec37 = Reflect.metadata("design:paramtypes", []), _dec38 = (0, _nextCore.computed)(function (that) {
  return [that._contactsActive, that.currentLocale];
}), _dec39 = Reflect.metadata("design:type", Function), _dec40 = Reflect.metadata("design:paramtypes", []), _dec41 = (0, _nextCore.computed)(function (that) {
  return [that.currentLocale];
}), _dec42 = Reflect.metadata("design:type", Function), _dec43 = Reflect.metadata("design:paramtypes", []), _dec44 = (0, _nextCore.computed)(function (that) {
  return [that._settingsActive, that.currentLocale];
}), _dec45 = Reflect.metadata("design:type", Function), _dec46 = Reflect.metadata("design:paramtypes", []), _dec47 = (0, _nextCore.computed)(function (that) {
  var _that$_appFeatures, _that$_appFeatures2, _that$_appFeatures3, _that$_appFeatures4, _that$_appFeatures5, _that$_appFeatures6, _that$_callingSetting, _that$_callingSetting2;
  return [(_that$_appFeatures = that._appFeatures) === null || _that$_appFeatures === void 0 ? void 0 : _that$_appFeatures.isCallingEnabled, (_that$_appFeatures2 = that._appFeatures) === null || _that$_appFeatures2 === void 0 ? void 0 : _that$_appFeatures2.hasReadExtensionCallLog, (_that$_appFeatures3 = that._appFeatures) === null || _that$_appFeatures3 === void 0 ? void 0 : _that$_appFeatures3.hasReadMessagesPermission, (_that$_appFeatures4 = that._appFeatures) === null || _that$_appFeatures4 === void 0 ? void 0 : _that$_appFeatures4.isContactsEnabled, (_that$_appFeatures5 = that._appFeatures) === null || _that$_appFeatures5 === void 0 ? void 0 : _that$_appFeatures5.hasMeetingsPermission, (_that$_appFeatures6 = that._appFeatures) === null || _that$_appFeatures6 === void 0 ? void 0 : _that$_appFeatures6.isCallingEnabled, (_that$_callingSetting = that._callingSettings) === null || _that$_callingSetting === void 0 ? void 0 : _that$_callingSetting.ready, (_that$_callingSetting2 = that._callingSettings) === null || _that$_callingSetting2 === void 0 ? void 0 : _that$_callingSetting2.callWith, that.dialTab, that.callsTab, that.historyTab, that.messageTab, that.contactsTab, that.meetingTab, that.settingsTab];
}), _dec48 = Reflect.metadata("design:type", Function), _dec49 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = (_class2 = /*#__PURE__*/function (_RcViewModule) {
  function HeaderNavView(_locale, _router, _manifest, _headerNavViewOptions) {
    var _this;
    _classCallCheck(this, HeaderNavView);
    _this = _callSuper(this, HeaderNavView);
    _this._locale = _locale;
    _this._router = _router;
    _this._manifest = _manifest;
    _this._headerNavViewOptions = _headerNavViewOptions;
    _initializerDefineProperty(_this, "_messageStore", _descriptor, _this);
    _initializerDefineProperty(_this, "_appFeatures", _descriptor2, _this);
    _initializerDefineProperty(_this, "_callingSettings", _descriptor3, _this);
    _initializerDefineProperty(_this, "_webphone", _descriptor4, _this);
    _initializerDefineProperty(_this, "_callMonitor", _descriptor5, _this);
    return _this;
  }
  _inherits(HeaderNavView, _RcViewModule);
  return _createClass(HeaderNavView, [{
    key: "unreadCounts",
    get: function get() {
      var _this$_messageStore$u, _this$_messageStore;
      return (_this$_messageStore$u = (_this$_messageStore = this._messageStore) === null || _this$_messageStore === void 0 ? void 0 : _this$_messageStore.unreadCounts) !== null && _this$_messageStore$u !== void 0 ? _this$_messageStore$u : 0;
    }
  }, {
    key: "currentLocale",
    get: function get() {
      return this._locale.currentLocale;
    }
  }, {
    key: "_dialerActive",
    get: function get() {
      return this._router.currentPath === '/dialer';
    }
  }, {
    key: "_callsActive",
    get: function get() {
      var currentPath = this._router.currentPath;
      return currentPath === '/calls' || currentPath === '/calls/active';
    }
  }, {
    key: "_messageActive",
    get: function get() {
      var currentPath = this._router.currentPath;
      return currentPath === '/messages' ||
      // * here is new logic difference with the old one
      currentPath === '/composeText' || currentPath.indexOf('/conversations/') !== -1;
    }
  }, {
    key: "_contactsActive",
    get: function get() {
      var currentPath = this._router.currentPath;
      return currentPath.substring(0, 9) === '/contacts';
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
        title: (0, _i18n.t)('dialpadLabel'),
        to: '/dialer',
        active: this._dialerActive,
        dataSign: 'dialerTab'
      });
    }
  }, {
    key: "callsTab",
    get: function get() {
      return _objectSpread(_objectSpread({}, _tabs.defaultTabMap.calls), {}, {
        title: (0, _i18n.t)('callsLabel'),
        to: '/calls',
        active: this._callsActive,
        dataSign: 'callsTab'
      });
    }
  }, {
    key: "historyTab",
    get: function get() {
      return _objectSpread(_objectSpread({}, _tabs.defaultTabMap.history), {}, {
        title: (0, _i18n.t)('historyLabel'),
        to: '/history',
        dataSign: 'historyTab'
      });
    }
  }, {
    key: "messageTab",
    get: function get() {
      return _objectSpread(_objectSpread({}, _tabs.defaultTabMap.messages), {}, {
        title: (0, _i18n.t)('messagesLabel'),
        to: '/messages',
        BadgeProps: {
          badgeContent: this.unreadCounts
        },
        active: this._messageActive,
        dataSign: 'messagesTab'
      });
    }
  }, {
    key: "contactsTab",
    get: function get() {
      return _objectSpread(_objectSpread({}, _tabs.defaultTabMap.contacts), {}, {
        title: (0, _i18n.t)('contactsLabel'),
        to: '/contacts',
        active: this._contactsActive,
        dataSign: 'contactsTab'
      });
    }
  }, {
    key: "meetingTab",
    get: function get() {
      return _objectSpread(_objectSpread({}, _tabs.defaultTabMap.meeting), {}, {
        title: (0, _i18n.t)('meetingLabel'),
        to: '/meeting',
        dataSign: 'meetingTab'
      });
    }
  }, {
    key: "settingsTab",
    get: function get() {
      return _objectSpread(_objectSpread({}, _tabs.defaultTabMap.settings), {}, {
        title: (0, _i18n.t)('settingsLabel'),
        to: '/settings',
        active: this._settingsActive,
        dataSign: 'settingsTab'
      });
    }
  }, {
    key: "tabs",
    get: function get() {
      var _this$_appFeatures, _this$_appFeatures2, _this$_appFeatures3, _this$_appFeatures4, _this$_appFeatures5, _this$_manifest;
      var showDialPad = (_this$_appFeatures = this._appFeatures) === null || _this$_appFeatures === void 0 ? void 0 : _this$_appFeatures.isCallingEnabled;
      var showHistory = (_this$_appFeatures2 = this._appFeatures) === null || _this$_appFeatures2 === void 0 ? void 0 : _this$_appFeatures2.hasReadExtensionCallLog;
      var showMessages = (_this$_appFeatures3 = this._appFeatures) === null || _this$_appFeatures3 === void 0 ? void 0 : _this$_appFeatures3.hasReadMessagesPermission;
      var showContacts = (_this$_appFeatures4 = this._appFeatures) === null || _this$_appFeatures4 === void 0 ? void 0 : _this$_appFeatures4.isContactsEnabled;
      var showMeeting = (_this$_appFeatures5 = this._appFeatures) === null || _this$_appFeatures5 === void 0 ? void 0 : _this$_appFeatures5.hasMeetingsPermission;
      // const showCalls =
      //   this._appFeatures.isCallingEnabled &&
      //   this._callingSettings.ready &&
      //   this._callingSettings.callWith !== callingOptions.browser;

      var tabs = [];
      showDialPad && tabs.push(this.dialTab);
      // TODO: calls still not implemented, should check after
      // showCalls && tabs.push(this.callsTab);
      showHistory && tabs.push(this.historyTab);
      showMessages && tabs.push(this.messageTab);
      showContacts && tabs.push(this.contactsTab);
      showMeeting && tabs.push(this.meetingTab);
      tabs.push(this.settingsTab);
      var tabLayout = (_this$_manifest = this._manifest) === null || _this$_manifest === void 0 ? void 0 : _this$_manifest.config.tabLayout;
      if (tabLayout) {
        var _tabLayout = tabLayout.map(function (item) {
          return "/".concat(item);
        });
        return tabs.sort(function (a, b) {
          return _tabLayout.indexOf(a.to) - _tabLayout.indexOf(b.to);
        }).filter(function (tab) {
          return _tabLayout.indexOf(tab.to) !== -1;
        });
      }
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
          if (!to) return;
          if (to === '/dialer' &&
          // * that use to meet old and new version modules
          (0, _hasActiveCalls.hasActiveCalls)({
            callingSettings: _this2._callingSettings,
            webphone: _this2._webphone,
            callMonitor: _this2._callMonitor
          })) {
            _this2._router.push('/calls');
          } else {
            _this2._router.push(to);
          }
        }
      };
    }
  }, {
    key: "component",
    value: function component(props) {
      var _this3 = this,
        _this$_headerNavViewO,
        _this$_headerNavViewO2;
      var _useRef = (0, _react.useRef)(this.getUIFunctions()),
        uiFunctions = _useRef.current;
      var _props = (0, _nextCore.useConnector)(function () {
        var uiProps = _this3.getUIProps();
        return _objectSpread(_objectSpread({}, props), uiProps);
      });
      var HeaderNavPanel = (_this$_headerNavViewO = (_this$_headerNavViewO2 = this._headerNavViewOptions) === null || _this$_headerNavViewO2 === void 0 ? void 0 : _this$_headerNavViewO2.component) !== null && _this$_headerNavViewO !== void 0 ? _this$_headerNavViewO : _HeaderNav.HeaderNav;
      return /*#__PURE__*/_react["default"].createElement(HeaderNavPanel, _extends({}, _props, uiFunctions));
    }
  }]);
}(_nextCore.RcViewModule), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_messageStore", [_dec6, _dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_appFeatures", [_dec8, _dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_callingSettings", [_dec0, _dec1], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_webphone", [_dec10, _dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_callMonitor", [_dec12, _dec13], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, "_callsActive", [_dec14, _dec15, _dec16], Object.getOwnPropertyDescriptor(_class2.prototype, "_callsActive"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_messageActive", [_dec17, _dec18, _dec19], Object.getOwnPropertyDescriptor(_class2.prototype, "_messageActive"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_contactsActive", [_dec20, _dec21, _dec22], Object.getOwnPropertyDescriptor(_class2.prototype, "_contactsActive"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_settingsActive", [_dec23, _dec24, _dec25], Object.getOwnPropertyDescriptor(_class2.prototype, "_settingsActive"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "dialTab", [_dec26, _dec27, _dec28], Object.getOwnPropertyDescriptor(_class2.prototype, "dialTab"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "callsTab", [_dec29, _dec30, _dec31], Object.getOwnPropertyDescriptor(_class2.prototype, "callsTab"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "historyTab", [_dec32, _dec33, _dec34], Object.getOwnPropertyDescriptor(_class2.prototype, "historyTab"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "messageTab", [_dec35, _dec36, _dec37], Object.getOwnPropertyDescriptor(_class2.prototype, "messageTab"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "contactsTab", [_dec38, _dec39, _dec40], Object.getOwnPropertyDescriptor(_class2.prototype, "contactsTab"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "meetingTab", [_dec41, _dec42, _dec43], Object.getOwnPropertyDescriptor(_class2.prototype, "meetingTab"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "settingsTab", [_dec44, _dec45, _dec46], Object.getOwnPropertyDescriptor(_class2.prototype, "settingsTab"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "tabs", [_dec47, _dec48, _dec49], Object.getOwnPropertyDescriptor(_class2.prototype, "tabs"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class) || _class);
//# sourceMappingURL=HeaderNav.view.js.map
