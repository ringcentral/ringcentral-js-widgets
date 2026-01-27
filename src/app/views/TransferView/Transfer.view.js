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
require("core-js/modules/es.promise.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TransferView = void 0;
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.replace.js");
var _trackEvents = require("@ringcentral-integration/commons/enums/trackEvents");
var _formatNumber = require("@ringcentral-integration/commons/lib/formatNumber");
var _services = require("@ringcentral-integration/micro-auth/src/app/services");
var _services2 = require("@ringcentral-integration/micro-contacts/src/app/services");
var _services3 = require("@ringcentral-integration/micro-core/src/app/services");
var _nextCore = require("@ringcentral-integration/next-core");
var _TransferPanel = require("@ringcentral-integration/widgets/components/TransferPanel");
var _usePrevious = require("@ringcentral/juno/es6/foundation/hooks/usePrevious/usePrevious.js");
var _react = _interopRequireWildcard(require("react"));
var _services4 = require("../../services");
var _i18n = require("./i18n");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _class, _class2;
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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
var TransferView = exports.TransferView = (_dec = (0, _nextCore.injectable)({
  name: 'TransferView'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 7);
}, _dec3 = function _dec3(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 8);
}, _dec4 = function _dec4(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 9);
}, _dec5 = function _dec5(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 10);
}, _dec6 = function _dec6(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 11);
}, _dec7 = function _dec7(target, key) {
  return (0, _nextCore.optional)('TransferViewOptions')(target, undefined, 12);
}, _dec8 = Reflect.metadata("design:type", Function), _dec9 = Reflect.metadata("design:paramtypes", [typeof _services3.Locale === "undefined" ? Object : _services3.Locale, typeof _services.RegionSettings === "undefined" ? Object : _services.RegionSettings, typeof _nextCore.RouterPlugin === "undefined" ? Object : _nextCore.RouterPlugin, typeof _services.AccountInfo === "undefined" ? Object : _services.AccountInfo, typeof _services3.Toast === "undefined" ? Object : _services3.Toast, typeof _services4.CallingSettings === "undefined" ? Object : _services4.CallingSettings, typeof _nextCore.PortManager === "undefined" ? Object : _nextCore.PortManager, typeof _services4.AudioSettings === "undefined" ? Object : _services4.AudioSettings, typeof _services2.ContactSearch === "undefined" ? Object : _services2.ContactSearch, typeof _services4.Webphone === "undefined" ? Object : _services4.Webphone, typeof _services4.ActiveCallControl === "undefined" ? Object : _services4.ActiveCallControl, typeof _services2.CompanyContacts === "undefined" ? Object : _services2.CompanyContacts, typeof TransferViewOptions === "undefined" ? Object : TransferViewOptions]), _dec0 = (0, _services.track)(function (that, eventName, contactType) {
  return [eventName, {
    contactType: contactType,
    location: 'Transfer'
  }];
}), _dec1 = Reflect.metadata("design:type", Function), _dec10 = Reflect.metadata("design:paramtypes", [String, String]), _dec11 = (0, _services.track)(_trackEvents.trackEvents.coldTransferCall), _dec12 = Reflect.metadata("design:type", Function), _dec13 = Reflect.metadata("design:paramtypes", []), _dec14 = (0, _nextCore.computed)(function (that) {
  var _that$_activeCallCont, _that$_webphone;
  return [that.sessionId, that.type, (_that$_activeCallCont = that._activeCallControl) === null || _that$_activeCallCont === void 0 ? void 0 : _that$_activeCallCont.sessions, (_that$_webphone = that._webphone) === null || _that$_webphone === void 0 ? void 0 : _that$_webphone.sessions];
}), _dec15 = Reflect.metadata("design:type", Function), _dec16 = Reflect.metadata("design:paramtypes", []), _dec17 = (0, _services.track)(_trackEvents.trackEvents.transferAskFirst), _dec18 = Reflect.metadata("design:type", Function), _dec19 = Reflect.metadata("design:paramtypes", []), _dec20 = (0, _services.track)(_trackEvents.trackEvents.transferToVoicemail), _dec21 = Reflect.metadata("design:type", Function), _dec22 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = _dec7(_class = _dec8(_class = _dec9(_class = (_class2 = /*#__PURE__*/function (_RcViewModule) {
  function TransferView(_locale, _regionSettings, _router, _accountInfo, _toast, _callingSettings, _portManager, _audioSettings, _contactSearch, _webphone, _activeCallControl, _companyContacts, _transferViewOptions) {
    var _this;
    _classCallCheck(this, TransferView);
    _this = _callSuper(this, TransferView);
    _this._locale = _locale;
    _this._regionSettings = _regionSettings;
    _this._router = _router;
    _this._accountInfo = _accountInfo;
    _this._toast = _toast;
    _this._callingSettings = _callingSettings;
    _this._portManager = _portManager;
    _this._audioSettings = _audioSettings;
    _this._contactSearch = _contactSearch;
    _this._webphone = _webphone;
    _this._activeCallControl = _activeCallControl;
    _this._companyContacts = _companyContacts;
    _this._transferViewOptions = _transferViewOptions;
    _this._params = {};
    return _this;
  }
  _inherits(TransferView, _RcViewModule);
  return _createClass(TransferView, [{
    key: "sessionId",
    get: function get() {
      return this._params.sessionId;
    }
  }, {
    key: "type",
    get: function get() {
      return this._params.type || 'active';
    }
  }, {
    key: "triggerEventTracking",
    value: function () {
      var _triggerEventTracking = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(eventName, contactType) {
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              return _context.a(2);
          }
        }, _callee);
      }));
      function triggerEventTracking(_x, _x2) {
        return _triggerEventTracking.apply(this, arguments);
      }
      return triggerEventTracking;
    }()
  }, {
    key: "trackTransfer",
    value: function () {
      var _trackTransfer = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              return _context2.a(2);
          }
        }, _callee2);
      }));
      function trackTransfer() {
        return _trackTransfer.apply(this, arguments);
      }
      return trackTransfer;
    }()
  }, {
    key: "session",
    get: function get() {
      var _this2 = this;
      if (this.type === 'active' && this._activeCallControl) {
        return this._activeCallControl.getActiveSession(this.sessionId);
      }
      if (this.type === 'webphone' && this._webphone) {
        return this._webphone.sessions.find(function (session) {
          return session.id === _this2.sessionId;
        });
      }
      return null;
    }
  }, {
    key: "useSessionGuard",
    value: function useSessionGuard() {
      var _this3 = this;
      var session = (0, _nextCore.useConnector)(function () {
        return _this3.session;
      });
      var sessionRemoved = (!this._portManager.shared || this._portManager.isMainTab) &&
      // when not have session should go to valid route
      !session;
      (0, _react.useLayoutEffect)(function () {
        if (sessionRemoved) {
          _this3._router.replace(_this3.type === 'active' ? '/calls' : '/dialer');
        }
      }, [sessionRemoved]);

      // when session is null, use previous session to avoid component flash
      // that will be redirect new route at next tick because route async
      var prevSession = (0, _usePrevious.usePrevious)(function () {
        return session;
      });
      if (!session) {
        return prevSession;
      }
      return this.session;
    }
  }, {
    key: "trackWarmTransfer",
    value: function () {
      var _trackWarmTransfer = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              return _context3.a(2);
          }
        }, _callee3);
      }));
      function trackWarmTransfer() {
        return _trackWarmTransfer.apply(this, arguments);
      }
      return trackWarmTransfer;
    }()
  }, {
    key: "trackToVoicemail",
    value: function () {
      var _trackToVoicemail = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              return _context4.a(2);
          }
        }, _callee4);
      }));
      function trackToVoicemail() {
        return _trackToVoicemail.apply(this, arguments);
      }
      return trackToVoicemail;
    }()
  }, {
    key: "getUIProps",
    value: function getUIProps(_ref) {
      var _this$_audioSettings$, _this$_audioSettings, _this$_audioSettings$2, _this$_audioSettings2, _this$_companyContact, _this$_contactSearch$, _this$_contactSearch, _this$_activeCallCont;
      var _ref$enableWarmTransf = _ref.enableWarmTransfer,
        enableWarmTransfer = _ref$enableWarmTransf === void 0 ? false : _ref$enableWarmTransf;
      return {
        callVolume: (_this$_audioSettings$ = (_this$_audioSettings = this._audioSettings) === null || _this$_audioSettings === void 0 ? void 0 : _this$_audioSettings.callVolume) !== null && _this$_audioSettings$ !== void 0 ? _this$_audioSettings$ : 1,
        outputDeviceId: (_this$_audioSettings$2 = (_this$_audioSettings2 = this._audioSettings) === null || _this$_audioSettings2 === void 0 ? void 0 : _this$_audioSettings2.outputDeviceId) !== null && _this$_audioSettings$2 !== void 0 ? _this$_audioSettings$2 : '',
        companyContacts: ((_this$_companyContact = this._companyContacts) === null || _this$_companyContact === void 0 ? void 0 : _this$_companyContact.data) || [],
        sessionId: this.sessionId,
        currentLocale: this._locale.currentLocale,
        searchContactList: (_this$_contactSearch$ = (_this$_contactSearch = this._contactSearch) === null || _this$_contactSearch === void 0 ? void 0 : _this$_contactSearch.sortedResult) !== null && _this$_contactSearch$ !== void 0 ? _this$_contactSearch$ : [],
        session: this.session,
        controlBusy: ((_this$_activeCallCont = this._activeCallControl) === null || _this$_activeCallCont === void 0 ? void 0 : _this$_activeCallCont.busy) || false,
        enableWarmTransfer: enableWarmTransfer && this._callingSettings.callWith === _services4.callingOptions.browser
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(props) {
      var _this4 = this;
      return {
        triggerEventTracking: function triggerEventTracking(eventName, contactType) {
          return _this4.triggerEventTracking(eventName, contactType);
        },
        setActiveSessionId: function setActiveSessionId(sessionId) {
          if (_this4.type === 'active') {
            var _this4$_activeCallCon;
            (_this4$_activeCallCon = _this4._activeCallControl) === null || _this4$_activeCallCon === void 0 ? void 0 : _this4$_activeCallCon.setActiveSessionId(sessionId);
          }
        },
        onTransfer: function onTransfer(transferNumber, sessionId) {
          _this4.trackTransfer();
          if (_this4.type === 'active') {
            var _this4$_activeCallCon2;
            (_this4$_activeCallCon2 = _this4._activeCallControl) === null || _this4$_activeCallCon2 === void 0 ? void 0 : _this4$_activeCallCon2.transfer(transferNumber, sessionId);
            return;
          }
          if (_this4.type === 'webphone') {
            var _this4$_webphone;
            (_this4$_webphone = _this4._webphone) === null || _this4$_webphone === void 0 ? void 0 : _this4$_webphone.transfer(transferNumber, sessionId);
          }
        },
        onToVoicemail: function onToVoicemail(voicemailId) {
          var sessionId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this4.sessionId;
          _this4.trackToVoicemail();
          if (voicemailId) {
            if (_this4.type === 'active') {
              var _this4$_activeCallCon3;
              (_this4$_activeCallCon3 = _this4._activeCallControl) === null || _this4$_activeCallCon3 === void 0 ? void 0 : _this4$_activeCallCon3.toVoicemail(voicemailId, sessionId);
              return;
            }
            if (_this4.type === 'webphone') {
              var _this4$_webphone2;
              (_this4$_webphone2 = _this4._webphone) === null || _this4$_webphone2 === void 0 ? void 0 : _this4$_webphone2.toVoiceMail(sessionId);
            }
          } else {
            _this4._toast.warning({
              message: (0, _i18n.t)('toVoiceMailError')
            });
          }
        },
        onWarmTransfer: function onWarmTransfer(transferNumber, sessionId) {
          _this4.trackWarmTransfer();
          if (_this4.type === 'active') {
            var _this4$_activeCallCon4;
            (_this4$_activeCallCon4 = _this4._activeCallControl) === null || _this4$_activeCallCon4 === void 0 ? void 0 : _this4$_activeCallCon4.startWarmTransfer(transferNumber, sessionId);
            return;
          }
          if (_this4.type === 'webphone') {
            var _this4$_webphone3;
            (_this4$_webphone3 = _this4._webphone) === null || _this4$_webphone3 === void 0 ? void 0 : _this4$_webphone3.startWarmTransfer(transferNumber, sessionId);
          }
        },
        onBack: function onBack() {
          _this4._router.goBack();
        },
        formatPhone: function formatPhone(phoneNumber) {
          return (0, _formatNumber.formatNumber)({
            phoneNumber: phoneNumber,
            areaCode: _this4._regionSettings.areaCode,
            countryCode: _this4._regionSettings.countryCode,
            maxExtensionLength: _this4._accountInfo.maxExtensionNumberLength
          });
        },
        searchContact: function searchContact(searchString) {
          var _this4$_contactSearch;
          (_this4$_contactSearch = _this4._contactSearch) === null || _this4$_contactSearch === void 0 ? void 0 : _this4$_contactSearch.debouncedSearch({
            searchString: searchString
          });
        }
      };
    }
  }, {
    key: "component",
    value: function component(props) {
      var _this5 = this,
        _this$_transferViewOp;
      this._params = (0, _nextCore.useParams)();
      var _useRef = (0, _react.useRef)(this.getUIFunctions(props)),
        uiFunctions = _useRef.current;
      var session = this.useSessionGuard();
      var _props = (0, _nextCore.useConnector)(function () {
        var uiProps = _this5.getUIProps(props);
        return _objectSpread(_objectSpread({}, props), uiProps);
      });
      var Component = ((_this$_transferViewOp = this._transferViewOptions) === null || _this$_transferViewOp === void 0 ? void 0 : _this$_transferViewOp.component) || _TransferPanel.TransferPanel;
      return /*#__PURE__*/_react["default"].createElement(Component, _extends({}, _props, {
        session: session
      }, uiFunctions));
    }
  }]);
}(_nextCore.RcViewModule), _applyDecoratedDescriptor(_class2.prototype, "triggerEventTracking", [_dec0, _dec1, _dec10], Object.getOwnPropertyDescriptor(_class2.prototype, "triggerEventTracking"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "trackTransfer", [_dec11, _dec12, _dec13], Object.getOwnPropertyDescriptor(_class2.prototype, "trackTransfer"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "session", [_dec14, _dec15, _dec16], Object.getOwnPropertyDescriptor(_class2.prototype, "session"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "trackWarmTransfer", [_dec17, _dec18, _dec19], Object.getOwnPropertyDescriptor(_class2.prototype, "trackWarmTransfer"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "trackToVoicemail", [_dec20, _dec21, _dec22], Object.getOwnPropertyDescriptor(_class2.prototype, "trackToVoicemail"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class) || _class) || _class) || _class) || _class) || _class);
//# sourceMappingURL=Transfer.view.js.map
