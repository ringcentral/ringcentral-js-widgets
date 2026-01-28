"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCommonAppConfig = void 0;
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.number.constructor.js");
var _services = require("@ringcentral-integration/micro-auth/src/app/services");
var _services2 = require("@ringcentral-integration/micro-contacts/src/app/services");
var _views = require("@ringcentral-integration/micro-contacts/src/app/views");
var _plugins = require("@ringcentral-integration/micro-core/src/app/plugins");
var _services3 = require("@ringcentral-integration/micro-core/src/app/services");
var _views2 = require("@ringcentral-integration/micro-core/src/app/views");
var _services4 = require("@ringcentral-integration/micro-message/src/app/services");
var _services5 = require("@ringcentral-integration/micro-phone/src/app/services");
var _views3 = require("@ringcentral-integration/micro-phone/src/app/views");
var _services6 = require("@ringcentral-integration/micro-setting/src/app/services");
var _nextCore = require("@ringcentral-integration/next-core");
var _App = require("./App.view");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * create app entry config
 */
var getCommonAppConfig = exports.getCommonAppConfig = function getCommonAppConfig(_ref) {
  var _sdkConfig$enableDisc;
  var appVersion = _ref.appVersion,
    prefix = _ref.prefix,
    brandConfig = _ref.brandConfig,
    sdkConfig = _ref.sdkConfig,
    _ref$modules = _ref.modules,
    modules = _ref$modules === void 0 ? [] : _ref$modules,
    share = _ref.share;
  var defaultLocale = brandConfig.defaultLocale;
  if (process.env.NODE_ENV !== 'production') {
    if (!prefix) {
      throw new Error('prefix is required');
    }
  }
  var sdkParameter = _objectSpread(_objectSpread({}, sdkConfig), {}, {
    clientId: sdkConfig.clientId,
    clientSecret: sdkConfig.clientSecret,
    appVersion: appVersion,
    appName: brandConfig.appName,
    cachePrefix: "sdk-".concat(prefix),
    clearCacheOnRefreshError: false,
    discoveryServer: sdkConfig.discoveryServer,
    enableDiscovery: (_sdkConfig$enableDisc = sdkConfig.enableDiscovery) !== null && _sdkConfig$enableDisc !== void 0 ? _sdkConfig$enableDisc : true
  });
  return {
    modules: [
    // plugin
    _plugins.SpringThemePlugin, _nextCore.StoragePlugin, _nextCore.RouterPlugin, _plugins.ThemePlugin, _plugins.BlockPlugin,
    // services
    _services.Analytics, _services5.CallerId, _services.AvailabilityMonitor, _services5.Webphone, _services5.CallingSettings, _services.Presence, _services6.QuickAccess, _services6.UserGuide, _services2.Contacts, _services2.CompanyContacts, _services2.AccountContacts, _services2.AddressBook, _services.AccountInfo, _services.ExtensionInfo, _services.ExtensionNumberAreaCode, _services.ConnectivityMonitor, _services3.Brand, _services3.Locale, _services5.Softphone, _services5.CallMonitor, _services5.Call, _services3.SleepDetector, _services5.AudioSettings, _services5.RingtoneConfiguration, _services5.VolumeInspector, _services2.ContactSearch, _services.RateLimiter, _services5.ActiveCallControl, _services4.ComposeText, _services4.FaxSender, _services.Environment, _services2.ContactInitiator,
    // views
    _views.ContactDetailsView, _views3.DialerView, _views2.ModalView,
    // options
    {
      provide: 'Version',
      useValue: appVersion
    }, {
      provide: 'WebphoneOptions',
      useFactory: function useFactory(brandConfig_2, sdkConfig_1) {
        return {
          // enableContactMatchWhenNewCall: true,
          appKey: sdkConfig_1.clientId,
          appName: brandConfig_2.appName,
          appVersion: appVersion
        };
      },
      deps: ['BrandConfig', 'SdkConfig']
    }, {
      provide: 'Subscription',
      useClass: _services.WebSocketSubscription
    }, {
      provide: _nextCore.RouterOptions,
      useValue: {
        createHistory: function createHistory() {
          return (0, _nextCore.createMemoryHistory)();
        }
      }
    }, {
      provide: 'LocaleOptions',
      useValue: {
        defaultLocale: defaultLocale
      }
    }, {
      provide: 'Prefix',
      useValue: prefix
    }, {
      provide: 'SdkConfig',
      useValue: _objectSpread({}, sdkParameter)
    }, {
      provide: 'AvailabilityMonitorOptions',
      useValue: {
        enabled: true
      }
    }, {
      provide: 'BrandConfig',
      useValue: _objectSpread({}, brandConfig)
    }, {
      provide: 'BrowserLoggerOptions',
      useValue: {
        worker: share.worker
      }
    }, {
      provide: 'InitiatorOptions',
      useFactory: function useFactory(locale) {
        return {
          enableNewHostDetection: true,
          getCurrentLocale: function getCurrentLocale() {
            return locale.currentLocale;
          }
        };
      },
      deps: [_services3.Locale]
    }, {
      provide: 'ModalViewOptions',
      useValue: {
        isCompact: true
      }
    }].concat(_toConsumableArray(modules)),
    main: _App.AppView,
    render: _nextCore.render,
    share: share
  };
};
//# sourceMappingURL=getCommonAppConfig.js.map
