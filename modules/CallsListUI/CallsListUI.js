"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallsListUI = void 0;
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.search.js");
var _di = require("@ringcentral-integration/commons/lib/di");
var _formatNumber = require("@ringcentral-integration/commons/lib/formatNumber");
var _core = require("@ringcentral-integration/core");
var _dec, _class;
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
var CallsListUI = exports.CallsListUI = (_dec = (0, _di.Module)({
  name: 'CallsListUI',
  deps: ['Brand', 'CallMonitor', 'Locale', 'RegionSettings', 'CallHistory', 'ConnectivityMonitor', 'RateLimiter', 'DateTimeFormat', 'Call', 'ExtensionInfo', 'ContactMatcher', 'ContactSearch', 'RouterInteraction', 'AppFeatures', 'AccountInfo', {
    dep: 'DialerUI',
    optional: true
  }, {
    dep: 'DialerUI',
    optional: true
  }, {
    dep: 'CallLogger',
    optional: true
  }, {
    dep: 'Webphone',
    optional: true
  }, {
    dep: 'ComposeText',
    optional: true
  }, {
    dep: 'CallsListUIOptions',
    optional: true
  }, {
    dep: 'ContactDetailsUI',
    optional: true
  }]
}), _dec(_class = /*#__PURE__*/function (_RcUIModuleV) {
  function CallsListUI(deps) {
    _classCallCheck(this, CallsListUI);
    return _callSuper(this, CallsListUI, [{
      deps: deps
    }]);
  }
  _inherits(CallsListUI, _RcUIModuleV);
  return _createClass(CallsListUI, [{
    key: "getUIProps",
    value: function getUIProps(_ref) {
      var _this$_deps$extension, _this$_deps$extension2, _this$_deps$extension3, _this$_deps$extension4, _this$_deps$extension5, _this$_deps$accountIn;
      var _ref$showContactDispl = _ref.showContactDisplayPlaceholder,
        showContactDisplayPlaceholder = _ref$showContactDispl === void 0 ? false : _ref$showContactDispl,
        _ref$enableContactFal = _ref.enableContactFallback,
        enableContactFallback = _ref$enableContactFal === void 0 ? false : _ref$enableContactFal;
      return {
        currentSiteCode: (_this$_deps$extension = (_this$_deps$extension2 = this._deps.extensionInfo) === null || _this$_deps$extension2 === void 0 ? void 0 : (_this$_deps$extension3 = _this$_deps$extension2.site) === null || _this$_deps$extension3 === void 0 ? void 0 : _this$_deps$extension3.code) !== null && _this$_deps$extension !== void 0 ? _this$_deps$extension : '',
        isMultipleSiteEnabled: (_this$_deps$extension4 = (_this$_deps$extension5 = this._deps.extensionInfo) === null || _this$_deps$extension5 === void 0 ? void 0 : _this$_deps$extension5.isMultipleSiteEnabled) !== null && _this$_deps$extension4 !== void 0 ? _this$_deps$extension4 : false,
        maxExtensionLength: (_this$_deps$accountIn = this._deps.accountInfo) === null || _this$_deps$accountIn === void 0 ? void 0 : _this$_deps$accountIn.maxExtensionNumberLength,
        currentLocale: this._deps.locale.currentLocale,
        activeRingCalls: this._deps.callMonitor.activeRingCalls,
        activeOnHoldCalls: this._deps.callMonitor.activeOnHoldCalls,
        activeCurrentCalls: this._deps.callMonitor.activeCurrentCalls,
        otherDeviceCalls: this._deps.callMonitor.otherDeviceCalls,
        areaCode: this._deps.regionSettings.areaCode,
        countryCode: this._deps.regionSettings.countryCode,
        outboundSmsPermission: this._deps.appFeatures.hasOutboundSMSPermission,
        internalSmsPermission: this._deps.appFeatures.hasInternalSMSPermission,
        brand: this._deps.brand.name,
        showContactDisplayPlaceholder: showContactDisplayPlaceholder,
        autoLog: !!(this._deps.callLogger && this._deps.callLogger.autoLog),
        enableContactFallback: enableContactFallback,
        calls: this._deps.callHistory.latestCalls,
        disableLinks: !this._deps.connectivityMonitor.connectivity || this._deps.rateLimiter.throttling,
        disableClickToDial: !(this._deps.call && this._deps.call.isIdle),
        // @ts-expect-error TS(2322): Type 'Record<string, boolean> | undefined' is not ... Remove this comment to see the full error message
        loggingMap: this._deps.callLogger && this._deps.callLogger.loggingMap,
        showSpinner: !(this._deps.callHistory.ready && this._deps.locale.ready && this._deps.regionSettings.ready && this._deps.dateTimeFormat.ready && this._deps.connectivityMonitor.ready && this._deps.appFeatures.ready && (!this._deps.call || this._deps.call.ready) && (!this._deps.composeText || this._deps.composeText.ready) && (!this._deps.callLogger || this._deps.callLogger.ready)),
        readTextPermission: this._deps.appFeatures.hasReadTextPermission,
        enableCDC: this._deps.appFeatures.isCDCEnabled
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(_ref2) {
      var _this = this;
      var _ref2$composeTextRout = _ref2.composeTextRoute,
        composeTextRoute = _ref2$composeTextRout === void 0 ? '/composeText' : _ref2$composeTextRout,
        _ref2$callCtrlRoute = _ref2.callCtrlRoute,
        callCtrlRoute = _ref2$callCtrlRoute === void 0 ? '/calls/active' : _ref2$callCtrlRoute,
        onCreateContact = _ref2.onCreateContact,
        onLogCall = _ref2.onLogCall,
        isLoggedContact = _ref2.isLoggedContact,
        onViewContact = _ref2.onViewContact,
        dateTimeFormatter = _ref2.dateTimeFormatter,
        _ref2$dialerRoute = _ref2.dialerRoute,
        dialerRoute = _ref2$dialerRoute === void 0 ? '/dialer' : _ref2$dialerRoute;
      return {
        // @ts-expect-error TS(2322): Type '(phoneNumber: string) => string | null | und... Remove this comment to see the full error message
        formatPhone: function formatPhone(phoneNumber) {
          var _this$_deps$extension6;
          return (0, _formatNumber.formatNumber)({
            phoneNumber: phoneNumber,
            areaCode: _this._deps.regionSettings.areaCode,
            countryCode: _this._deps.regionSettings.countryCode,
            maxExtensionLength: _this._deps.accountInfo.maxExtensionNumberLength,
            isMultipleSiteEnabled: _this._deps.extensionInfo.isMultipleSiteEnabled,
            siteCode: (_this$_deps$extension6 = _this._deps.extensionInfo.site) === null || _this$_deps$extension6 === void 0 ? void 0 : _this$_deps$extension6.code
          });
        },
        // @ts-expect-error TS(2322): Type '(sessionId: string) => Promise<void> | undef... Remove this comment to see the full error message
        webphoneAnswer: function webphoneAnswer(sessionId) {
          var _this$_deps$webphone;
          return (_this$_deps$webphone = _this._deps.webphone) === null || _this$_deps$webphone === void 0 ? void 0 : _this$_deps$webphone.answer(sessionId);
        },
        // @ts-expect-error TS(2322): Type '(sessionId: string) => Promise<void> | undef... Remove this comment to see the full error message
        webphoneToVoicemail: function webphoneToVoicemail(sessionId) {
          var _this$_deps$webphone2;
          return (_this$_deps$webphone2 = _this._deps.webphone) === null || _this$_deps$webphone2 === void 0 ? void 0 : _this$_deps$webphone2.toVoiceMail(sessionId);
        },
        // @ts-expect-error TS(2322): Type '(sessionId: string) => Promise<void> | undef... Remove this comment to see the full error message
        webphoneReject: function webphoneReject(sessionId) {
          var _this$_deps$webphone3;
          return (_this$_deps$webphone3 = _this._deps.webphone) === null || _this$_deps$webphone3 === void 0 ? void 0 : _this$_deps$webphone3.reject(sessionId);
        },
        // @ts-expect-error TS(2322): Type '(sessionId: string) => Promise<void> | undef... Remove this comment to see the full error message
        webphoneHangup: function webphoneHangup(sessionId) {
          var _this$_deps$webphone4;
          return (_this$_deps$webphone4 = _this._deps.webphone) === null || _this$_deps$webphone4 === void 0 ? void 0 : _this$_deps$webphone4.hangup(sessionId);
        },
        webphoneResume: function () {
          var _webphoneResume = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(sessionId) {
            return _regenerator().w(function (_context) {
              while (1) switch (_context.n) {
                case 0:
                  if (_this._deps.webphone) {
                    _context.n = 1;
                    break;
                  }
                  return _context.a(2);
                case 1:
                  _context.n = 2;
                  return _this._deps.webphone.resume(sessionId);
                case 2:
                  if (_this._deps.routerInteraction.currentPath !== callCtrlRoute) {
                    _this._deps.routerInteraction.push(callCtrlRoute);
                  }
                case 3:
                  return _context.a(2);
              }
            }, _callee);
          }));
          function webphoneResume(_x) {
            return _webphoneResume.apply(this, arguments);
          }
          return webphoneResume;
        }(),
        // @ts-expect-error TS(2322): Type '(({ phoneNumber, name, entityType }: OnCreat... Remove this comment to see the full error message
        onCreateContact: onCreateContact ? (/*#__PURE__*/function () {
          var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(_ref3) {
            var phoneNumber, name, entityType, hasMatchNumber;
            return _regenerator().w(function (_context2) {
              while (1) switch (_context2.n) {
                case 0:
                  phoneNumber = _ref3.phoneNumber, name = _ref3.name, entityType = _ref3.entityType;
                  _context2.n = 1;
                  return _this._deps.contactMatcher.hasMatchNumber({
                    phoneNumber: phoneNumber,
                    ignoreCache: true
                  });
                case 1:
                  hasMatchNumber = _context2.v;
                  if (hasMatchNumber) {
                    _context2.n = 3;
                    break;
                  }
                  _context2.n = 2;
                  return onCreateContact({
                    phoneNumber: phoneNumber,
                    name: name,
                    entityType: entityType
                  });
                case 2:
                  _context2.n = 3;
                  return _this._deps.contactMatcher.forceMatchNumber({
                    phoneNumber: phoneNumber
                  });
                case 3:
                  return _context2.a(2);
              }
            }, _callee2);
          }));
          return function (_x2) {
            return _ref4.apply(this, arguments);
          };
        }()) : undefined,
        // @ts-expect-error TS(2322): Type '((...args: any) => boolean) | undefined' is ... Remove this comment to see the full error message
        isLoggedContact: isLoggedContact,
        // @ts-expect-error TS(2322): Type '((options: OnLogCallOptions) => Promise<void... Remove this comment to see the full error message
        onLogCall: onLogCall || this._deps.callLogger && (/*#__PURE__*/function () {
          var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(_ref5) {
            var call, contact, _ref5$redirect, redirect;
            return _regenerator().w(function (_context3) {
              while (1) switch (_context3.n) {
                case 0:
                  call = _ref5.call, contact = _ref5.contact, _ref5$redirect = _ref5.redirect, redirect = _ref5$redirect === void 0 ? true : _ref5$redirect;
                  _context3.n = 1;
                  return _this._deps.callLogger.logCall({
                    call: call,
                    contact: contact,
                    redirect: redirect
                  });
                case 1:
                  return _context3.a(2);
              }
            }, _callee3);
          }));
          return function (_x3) {
            return _ref6.apply(this, arguments);
          };
        }()),
        // @ts-expect-error TS(2322): Type '({ utcTimestamp }: Partial<FormatDateTimeOpt... Remove this comment to see the full error message
        dateTimeFormatter: dateTimeFormatter !== null && dateTimeFormatter !== void 0 ? dateTimeFormatter : function (_ref7) {
          var utcTimestamp = _ref7.utcTimestamp;
          return _this._deps.dateTimeFormat.formatDateTime({
            utcTimestamp: utcTimestamp
          });
        },
        onViewContact: onViewContact || function (_ref8) {
          var _ref8$contact = _ref8.contact,
            type = _ref8$contact.type,
            id = _ref8$contact.id;
          if (_this._deps.contactDetailsUI) {
            _this._deps.contactDetailsUI.showContactDetails({
              type: type,
              id: id,
              direct: true
            });
          }
        },
        // @ts-expect-error TS(2322): Type '((recipient: any) => void) | undefined' is n... Remove this comment to see the full error message
        onClickToDial: this._deps.dialerUI ?
        // TODO: fix type in dialerUI
        function (recipient) {
          if (_this._deps.call.isIdle) {
            _this._deps.routerInteraction.push(dialerRoute);
            _this._deps.dialerUI.call({
              recipient: recipient
            });
            _this._deps.callHistory.onClickToCall();
          }
        } : undefined,
        // @ts-expect-error TS(2322): Type '((contact: ToNumber & { name?: string | unde... Remove this comment to see the full error message
        onClickToSms: this._deps.composeText ? (/*#__PURE__*/function () {
          var _ref9 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(contact) {
            var isDummyContact,
              _args4 = arguments;
            return _regenerator().w(function (_context4) {
              while (1) switch (_context4.n) {
                case 0:
                  isDummyContact = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : false;
                  if (_this._deps.routerInteraction) {
                    _this._deps.routerInteraction.push(composeTextRoute);
                  }
                  // if contact autocomplete, if no match fill the number only
                  if (contact.name && contact.phoneNumber && isDummyContact) {
                    // @ts-expect-error TS(2532): Object is possibly 'undefined'.
                    _this._deps.composeText.updateTypingToNumber(contact.name);
                    _this._deps.contactSearch.search({
                      searchString: contact.name
                    });
                  } else {
                    // @ts-expect-error TS(2532): Object is possibly 'undefined'.
                    _this._deps.composeText.addToNumber(contact);
                    if (
                    // @ts-expect-error TS(2532): Object is possibly 'undefined'.
                    _this._deps.composeText.typingToNumber === contact.phoneNumber) {
                      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
                      _this._deps.composeText.cleanTypingToNumber();
                    }
                  }
                  _this._deps.callHistory.onClickToSMS();
                case 1:
                  return _context4.a(2);
              }
            }, _callee4);
          }));
          return function (_x4) {
            return _ref9.apply(this, arguments);
          };
        }()) : undefined
      };
    }
  }]);
}(_core.RcUIModuleV2)) || _class);
//# sourceMappingURL=CallsListUI.js.map
