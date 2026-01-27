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
exports.HeaderView = void 0;
require("core-js/modules/es.object.get-own-property-descriptor.js");
var _nextCore = require("@ringcentral-integration/next-core");
var _HeaderView2 = require("@ringcentral-integration/widgets/components/HeaderView");
var _react = _interopRequireWildcard(require("react"));
var _services = require("../../services");
var _HeaderPanel = require("./HeaderPanel");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8;
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
var HeaderView = exports.HeaderView = (_dec = (0, _nextCore.injectable)({
  name: 'HeaderView'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)('HeaderViewOptions')(target, undefined, 3);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _nextCore.RouterPlugin === "undefined" ? Object : _nextCore.RouterPlugin, typeof _services.Locale === "undefined" ? Object : _services.Locale, typeof _services.Brand === "undefined" ? Object : _services.Brand, typeof HeaderViewOptions === "undefined" ? Object : HeaderViewOptions]), _dec5 = (0, _nextCore.dynamic)('Auth'), _dec6 = Reflect.metadata("design:type", typeof Auth === "undefined" ? Object : Auth), _dec7 = (0, _nextCore.dynamic)('CallMonitor'), _dec8 = Reflect.metadata("design:type", typeof CallMonitor === "undefined" ? Object : CallMonitor), _dec9 = (0, _nextCore.dynamic)('Webphone'), _dec0 = Reflect.metadata("design:type", typeof Webphone === "undefined" ? Object : Webphone), _dec1 = (0, _nextCore.dynamic)('Presence'), _dec10 = Reflect.metadata("design:type", typeof Presence === "undefined" ? Object : Presence), _dec11 = (0, _nextCore.dynamic)('UserGuide'), _dec12 = Reflect.metadata("design:type", typeof UserGuide === "undefined" ? Object : UserGuide), _dec13 = (0, _nextCore.dynamic)('QuickAccess'), _dec14 = Reflect.metadata("design:type", typeof QuickAccess === "undefined" ? Object : QuickAccess), _dec15 = (0, _nextCore.dynamic)('ExtensionInfo'), _dec16 = Reflect.metadata("design:type", typeof ExtensionInfo === "undefined" ? Object : ExtensionInfo), _dec17 = (0, _nextCore.dynamic)('UserInfo'), _dec18 = Reflect.metadata("design:type", typeof UserInfo === "undefined" ? Object : UserInfo), _dec19 = Reflect.metadata("design:type", Function), _dec20 = Reflect.metadata("design:paramtypes", []), _dec21 = Reflect.metadata("design:type", Function), _dec22 = Reflect.metadata("design:paramtypes", []), _dec23 = Reflect.metadata("design:type", Function), _dec24 = Reflect.metadata("design:paramtypes", []), _dec25 = Reflect.metadata("design:type", Function), _dec26 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (_class2 = /*#__PURE__*/function (_RcViewModule) {
  function HeaderView(_router, _locale, _brand, _headerViewOptions) {
    var _this;
    _classCallCheck(this, HeaderView);
    _this = _callSuper(this, HeaderView);
    _this._router = _router;
    _this._locale = _locale;
    _this._brand = _brand;
    _this._headerViewOptions = _headerViewOptions;
    _initializerDefineProperty(_this, "_auth", _descriptor, _this);
    _initializerDefineProperty(_this, "_callMonitor", _descriptor2, _this);
    _initializerDefineProperty(_this, "_webphone", _descriptor3, _this);
    _initializerDefineProperty(_this, "_presence", _descriptor4, _this);
    _initializerDefineProperty(_this, "_userGuide", _descriptor5, _this);
    _initializerDefineProperty(_this, "_quickAccess", _descriptor6, _this);
    _initializerDefineProperty(_this, "_extensionInfo", _descriptor7, _this);
    _initializerDefineProperty(_this, "_userInfo", _descriptor8, _this);
    return _this;
  }
  _inherits(HeaderView, _RcViewModule);
  return _createClass(HeaderView, [{
    key: "ringingCalls",
    get: function get() {
      var _this$_callMonitor$ac, _this$_callMonitor;
      return (_this$_callMonitor$ac = (_this$_callMonitor = this._callMonitor) === null || _this$_callMonitor === void 0 ? void 0 : _this$_callMonitor.activeRingCalls) !== null && _this$_callMonitor$ac !== void 0 ? _this$_callMonitor$ac : [];
    }
  }, {
    key: "onHoldCalls",
    get: function get() {
      var _this$_callMonitor$ac2, _this$_callMonitor2;
      return (_this$_callMonitor$ac2 = (_this$_callMonitor2 = this._callMonitor) === null || _this$_callMonitor2 === void 0 ? void 0 : _this$_callMonitor2.activeOnHoldCalls) !== null && _this$_callMonitor$ac2 !== void 0 ? _this$_callMonitor$ac2 : [];
    }
  }, {
    key: "currentCalls",
    get: function get() {
      var _this$_callMonitor$ac3, _this$_callMonitor3;
      return (_this$_callMonitor$ac3 = (_this$_callMonitor3 = this._callMonitor) === null || _this$_callMonitor3 === void 0 ? void 0 : _this$_callMonitor3.activeCurrentCalls) !== null && _this$_callMonitor$ac3 !== void 0 ? _this$_callMonitor$ac3 : [];
    }
  }, {
    key: "userContact",
    get: function get() {
      var _this$_extensionInfo, _userInfo$contact;
      var userInfo = (_this$_extensionInfo = this._extensionInfo) === null || _this$_extensionInfo === void 0 ? void 0 : _this$_extensionInfo.info;
      var phoneNumber = userInfo === null || userInfo === void 0 ? void 0 : (_userInfo$contact = userInfo.contact) === null || _userInfo$contact === void 0 ? void 0 : _userInfo$contact.businessPhone;
      return userInfo ? _objectSpread(_objectSpread({}, userInfo), {}, {
        id: "".concat(userInfo.id),
        type: 'company',
        phoneNumber: phoneNumber
      }) : undefined;
    }
  }, {
    key: "getUIProps",
    value: function getUIProps(_ref) {
      var _this$_brand$brandCon, _this$_auth, _this$_presence, _this$_presence2, _this$_auth2, _this$_presence3, _this$_webphone, _this$_webphone2, _this$_presence4, _this$_userInfo;
      var standAlone = _ref.standAlone;
      var logoUrl = (_this$_brand$brandCon = this._brand.brandConfig.assets) === null || _this$_brand$brandCon === void 0 ? void 0 : _this$_brand$brandCon.logo;
      return {
        standAlone: standAlone,
        logoUrl: logoUrl,
        userStatus: (((_this$_auth = this._auth) === null || _this$_auth === void 0 ? void 0 : _this$_auth.loggedIn) &&
        // TODO: spring-ui use presenceStatus as the user status, because presenceStatus will group the user status and telephony status, that be real user status(in meeting also will be busy)
        process.env.THEME_SYSTEM === 'spring-ui' ? (_this$_presence = this._presence) === null || _this$_presence === void 0 ? void 0 : _this$_presence.presenceStatus : (_this$_presence2 = this._presence) === null || _this$_presence2 === void 0 ? void 0 : _this$_presence2.userStatus) || undefined,
        dndStatus: ((_this$_auth2 = this._auth) === null || _this$_auth2 === void 0 ? void 0 : _this$_auth2.loggedIn) && ((_this$_presence3 = this._presence) === null || _this$_presence3 === void 0 ? void 0 : _this$_presence3.dndStatus) || undefined,
        ringingCalls: this.ringingCalls,
        onHoldCalls: this.onHoldCalls,
        currentCalls: this.currentCalls,
        currentPath: this._router.currentPath,
        currentLocale: this._locale.currentLocale,
        activeSessionId: ((_this$_webphone = this._webphone) === null || _this$_webphone === void 0 ? void 0 : _this$_webphone.activeSessionId) || '',
        incomingCallPageMinimized: !((_this$_webphone2 = this._webphone) === null || _this$_webphone2 === void 0 ? void 0 : _this$_webphone2.ringSession) || this._webphone.ringSession.minimized,
        presenceReady: (_this$_presence4 = this._presence) === null || _this$_presence4 === void 0 ? void 0 : _this$_presence4.ready,
        userContact: this.userContact,
        loginNumber: (_this$_userInfo = this._userInfo) === null || _this$_userInfo === void 0 ? void 0 : _this$_userInfo.formattedLoginNumber
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(_) {
      var _this2 = this;
      return {
        onCurrentCallBtnClick: function onCurrentCallBtnClick() {
          if (_this2._router.currentPath !== '/calls/active') {
            _this2._router.push('/calls/active');
          }
          _this2.dismissUserGuideAndExitQuickAccess();
        },
        onViewCallBtnClick: function onViewCallBtnClick() {
          if (_this2._router.currentPath !== '/calls') {
            _this2._router.push('/calls');
          }
          _this2.dismissUserGuideAndExitQuickAccess();
        },
        // old UI
        setAvailable: function setAvailable() {
          var _this2$_presence;
          return (_this2$_presence = _this2._presence) === null || _this2$_presence === void 0 ? void 0 : _this2$_presence.setAvailable();
        },
        setBusy: function setBusy() {
          var _this2$_presence2;
          return (_this2$_presence2 = _this2._presence) === null || _this2$_presence2 === void 0 ? void 0 : _this2$_presence2.setBusy();
        },
        setDoNotDisturb: function setDoNotDisturb() {
          var _this2$_presence3;
          return (_this2$_presence3 = _this2._presence) === null || _this2$_presence3 === void 0 ? void 0 : _this2$_presence3.setDoNotDisturb();
        },
        setInvisible: function setInvisible() {
          var _this2$_presence4;
          return (_this2$_presence4 = _this2._presence) === null || _this2$_presence4 === void 0 ? void 0 : _this2$_presence4.setInvisible();
        },
        // spring-ui only
        onActionClick: function onActionClick(action) {
          var _this2$_auth;
          switch (action) {
            case 'logout':
              (_this2$_auth = _this2._auth) === null || _this2$_auth === void 0 ? void 0 : _this2$_auth.logout({
                reason: 'Manually sign out'
              });
              break;
            default:
              break;
          }
        },
        onPresenceChange: function onPresenceChange(status) {
          var _this2$_presence5, _this2$_presence6, _this2$_presence7, _this2$_presence8;
          switch (status) {
            case 'available':
              (_this2$_presence5 = _this2._presence) === null || _this2$_presence5 === void 0 ? void 0 : _this2$_presence5.setAvailable();
              break;
            case 'busy':
              (_this2$_presence6 = _this2._presence) === null || _this2$_presence6 === void 0 ? void 0 : _this2$_presence6.setBusy();
              break;
            case 'DND':
              (_this2$_presence7 = _this2._presence) === null || _this2$_presence7 === void 0 ? void 0 : _this2$_presence7.setDoNotDisturb();
              break;
            case 'offline':
              (_this2$_presence8 = _this2._presence) === null || _this2$_presence8 === void 0 ? void 0 : _this2$_presence8.setInvisible();
              break;
            default:
              break;
          }
        }
      };
    }
  }, {
    key: "dismissUserGuideAndExitQuickAccess",
    value: function dismissUserGuideAndExitQuickAccess() {
      var _this$_userGuide, _this$_quickAccess, _this$_webphone3;
      (_this$_userGuide = this._userGuide) === null || _this$_userGuide === void 0 ? void 0 : _this$_userGuide.dismiss();
      (_this$_quickAccess = this._quickAccess) === null || _this$_quickAccess === void 0 ? void 0 : _this$_quickAccess.exit();
      var ringSession = (_this$_webphone3 = this._webphone) === null || _this$_webphone3 === void 0 ? void 0 : _this$_webphone3.ringSession;
      if (ringSession && !ringSession.minimized) {
        this._webphone.toggleMinimized(ringSession.id);
      }
    }
  }, {
    key: "component",
    value: function component(props) {
      var _this3 = this,
        _this$_headerViewOpti2;
      var _useRef = (0, _react.useRef)(this.getUIFunctions(props)),
        uiFunctions = _useRef.current;
      var _props = (0, _nextCore.useConnector)(function () {
        var uiProps = _this3.getUIProps(props);
        return _objectSpread(_objectSpread({}, props), uiProps);
      });
      if (process.env.THEME_SYSTEM === 'spring-ui') {
        var _this$_headerViewOpti;
        var _Component = ((_this$_headerViewOpti = this._headerViewOptions) === null || _this$_headerViewOpti === void 0 ? void 0 : _this$_headerViewOpti.component) || _HeaderPanel.HeaderPanel;
        return /*#__PURE__*/_react["default"].createElement(_Component, _extends({}, _props, uiFunctions));
      }
      var Component = ((_this$_headerViewOpti2 = this._headerViewOptions) === null || _this$_headerViewOpti2 === void 0 ? void 0 : _this$_headerViewOpti2.component) || _HeaderView2.HeaderView;
      return /*#__PURE__*/_react["default"].createElement(Component, _extends({}, _props, uiFunctions));
    }
  }]);
}(_nextCore.RcViewModule), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_auth", [_dec5, _dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_callMonitor", [_dec7, _dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_webphone", [_dec9, _dec0], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_presence", [_dec1, _dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_userGuide", [_dec11, _dec12], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "_quickAccess", [_dec13, _dec14], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "_extensionInfo", [_dec15, _dec16], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "_userInfo", [_dec17, _dec18], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, "ringingCalls", [_nextCore.computed, _dec19, _dec20], Object.getOwnPropertyDescriptor(_class2.prototype, "ringingCalls"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "onHoldCalls", [_nextCore.computed, _dec21, _dec22], Object.getOwnPropertyDescriptor(_class2.prototype, "onHoldCalls"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "currentCalls", [_nextCore.computed, _dec23, _dec24], Object.getOwnPropertyDescriptor(_class2.prototype, "currentCalls"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "userContact", [_nextCore.computed, _dec25, _dec26], Object.getOwnPropertyDescriptor(_class2.prototype, "userContact"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class);
//# sourceMappingURL=Header.view.js.map
