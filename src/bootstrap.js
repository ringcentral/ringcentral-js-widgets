"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.date.to-string.js");
var _messageHelper = require("@ringcentral-integration/commons/lib/messageHelper");
var _services = require("@ringcentral-integration/micro-auth/src/app/services");
var _views = require("@ringcentral-integration/micro-auth/src/app/views");
var _services2 = require("@ringcentral-integration/micro-contacts/src/app/services");
var _plugins = require("@ringcentral-integration/micro-core/src/app/plugins");
var _services3 = require("@ringcentral-integration/micro-core/src/app/services");
var _views2 = require("@ringcentral-integration/micro-core/src/app/views");
var _services4 = require("@ringcentral-integration/micro-message/src/app/services");
var _views3 = require("@ringcentral-integration/micro-message/src/app/views");
var _services5 = require("@ringcentral-integration/micro-phone/src/app/services");
var _views4 = require("@ringcentral-integration/micro-phone/src/app/views");
var _views5 = require("@ringcentral-integration/micro-setting/src/app/views");
var _nextCore = require("@ringcentral-integration/next-core");
var _nextMicro = require("@ringcentral-integration/next-micro");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function getCurrentDateTimeStamp() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if (dd < 10) {
    // @ts-expect-error TS(2322): Type 'string' is not assignable to type 'number'.
    dd = "0".concat(dd);
  }
  if (mm < 10) {
    // @ts-expect-error TS(2322): Type 'string' is not assignable to type 'number'.
    mm = "0".concat(mm);
  }
  // @ts-expect-error TS(2322): Type 'string' is not assignable to type 'Date'.
  today = "".concat(mm, "/").concat(dd, "/").concat(yyyy);
  return new Date(today).getTime();
}
var appConfig = process.env.APP_CONFIG;
var _default = exports["default"] = (0, _nextMicro.exposeMicroApp)({
  modules: [_views4.DialerAndCallsTabView, _views5.RegionSettingsView, _services.Client, _services3.Brand, _services.Environment, _services3.Toast, _services3.Theme, _services5.Softphone, _services3.Locale, _services3.DateTimeFormat, _services.Auth, _services.OAuth, _services5.Ringout, _services.ConnectivityMonitor, _services.ConnectivityManager, _views.ConnectivityBadgeView, _views.LoginView, _services.RateLimiter, _nextCore.StoragePlugin, _services.AvailabilityMonitor, {
    provide: 'AvailabilityMonitorOptions',
    useValue: {
      enabled: true
    }
  }, _services2.ContactMatcher, {
    provide: 'ContactMatcherOptions',
    useValue: {
      ttl: 24 * 60 * 60 * 1000,
      noMatchTtl: 60 * 60 * 1000
    }
  }, _services.ExtensionDevice, _services2.CompanyContacts, _services.AccountInfo, _services.ExtensionInfo, _services.ExtensionFeatures, _services.AppFeatures, _services.DialingPlan, _services.ExtensionPhoneNumber, _services5.ForwardingNumber, _services.RegionSettings, _services2.NumberValidate, _services5.CallingSettings, _views5.CallingSettingsView, _views5.SettingsView, _views3.ConversationView, _views3.ConversationsView, _views4.SimpleCallControlView, _services5.Call, _services.ExtensionNumberAreaCode, {
    provide: 'Subscription',
    useClass: _services.WebSocketSubscription
  }, _services.RingCentralExtensions, _nextCore.RouterPlugin, _plugins.ThemePlugin, _services5.CallLog, _services5.CallHistory, _views4.DialerView, _services.Presence, {
    provide: 'PresenceOptions',
    useValue: {
      disableCache: true
    }
  }, _services5.CallMonitor, _services2.ActivityMatcher, {
    provide: 'ActivityMatcherOptions',
    useValue: {
      ttl: 24 * 60 * 60 * 1000,
      noMatchTtl: 60 * 60 * 1000
    }
  }, _services5.CallLogger, {
    provide: 'CallLoggerOptions',
    useValue: {
      autoLog: false,
      readyCheckFunction: function readyCheckFunction() {
        return true;
      },
      logFunction: function () {
        var _logFunction = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                return _context.a(2);
            }
          }, _callee);
        }));
        function logFunction() {
          return _logFunction.apply(this, arguments);
        }
        return logFunction;
      }()
    }
  }, _views4.CallLogSection, _services.ErrorLogger, _services5.ActiveCallControl, _services2.ContactSearch, _views4.ActiveCallsView, _views4.TransferView, _services4.MessageStore, _services5.Webphone, _services5.AudioSettings, {
    provide: 'MessageStoreOptions',
    useValue: {
      conversationLoadLength: 50,
      messagesFilter: _messageHelper.filterMessages
    }
  }, _services4.Conversations, _services4.MessageSender, _views3.ComposeTextView, _services4.ComposeText, _services4.ConversationLogger, {
    provide: 'ConversationLoggerOptions',
    useValue: {
      logFunction: function logFunction() {
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
          return _regenerator().w(function (_context2) {
            while (1) switch (_context2.n) {
              case 0:
                return _context2.a(2);
            }
          }, _callee2);
        }))();
      },
      readyCheckFunction: function readyCheckFunction() {
        return true;
      },
      isAutoUpdate: false,
      isLoggedContact: function isLoggedContact(conversation, lastActivity, item) {
        return lastActivity && item && lastActivity.id === item.id;
      },
      accordWithLogRequirement: function accordWithLogRequirement(conversation) {
        var date = conversation.date;
        var dateTimeStamp = new Date(date).getTime();
        var currentDateTimeStamp = getCurrentDateTimeStamp();
        return currentDateTimeStamp === dateTimeStamp;
      }
    }
  }, _services4.ConversationMatcher, {
    provide: 'ConversationMatcherOptions',
    useValue: {
      ttl: 24 * 60 * 60 * 1000,
      noMatchTtl: 60 * 60 * 1000
    }
  }, _views4.CallLogCallCtrlView, _views4.CallLogView, _services3.SleepDetector, _services.DataFetcher, _views2.ModalView, {
    provide: _nextCore.RouterOptions,
    useValue: _objectSpread({}, _nextCore.isSharedWorker ? {} : {
      createHistory: function createHistory() {
        return (0, _nextCore.createMemoryHistory)();
      }
    })
  }, {
    provide: 'SdkConfig',
    deps: ['Version'],
    useFactory: function useFactory(_ref) {
      var appVersion = _ref.version;
      return _objectSpread(_objectSpread({}, appConfig.sdkConfig), {}, {
        appVersion: appVersion,
        appName: appConfig.brandConfig.appName,
        cachePrefix: "".concat(appConfig.prefix, "-sdk"),
        clearCacheOnRefreshError: false,
        discoveryServer: appConfig.sdkConfig.discoveryServer
      });
    }
  }, {
    provide: 'BrandConfig',
    useValue: appConfig.brandConfig
  }, {
    provide: 'ErrorLoggerOptions',
    useValue: {
      environment: appConfig.environment,
      appVersion: appConfig.version.appVersion,
      sentryConfig: null
    }
  }, {
    provide: 'EnvironmentOptions',
    useValue: {
      defaultRecordingHost: 'https://apps.ringcentral.com/integrations/recording/v3.0/rc/index.html'
    }
  }, {
    provide: 'Version',
    useValue: appConfig.version.appVersion
  }, {
    provide: 'Prefix',
    useValue: appConfig.prefix
  }, {
    provide: 'LocaleOptions',
    useValue: {
      defaultLocale: appConfig.defaultLocale
    }
  }, {
    provide: 'LoginViewOptions',
    useValue: {
      routeAfterLogin: false
    }
  }],
  share: {
    name: 'micro-next-commons',
    type: 'Base'
  },
  renderRoot: function renderRoot() {
    return document.getElementById('viewport');
  }
});
//# sourceMappingURL=bootstrap.js.map
