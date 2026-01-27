"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.number.constructor.js");
var _services = require("@ringcentral-integration/micro-auth/src/app/services");
var _plugins = require("@ringcentral-integration/micro-core/src/app/plugins");
var _services2 = require("@ringcentral-integration/micro-core/src/app/services");
var _nextCore = require("@ringcentral-integration/next-core");
var _nextMicro = require("@ringcentral-integration/next-micro");
var _App = require("./app/App.view");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _ref = process.env.APP_CONFIG,
  brandConfig = _ref.brandConfig;
var _default = exports["default"] = (0, _nextMicro.exposeMicroApp)({
  modules: [_services.Auth, _services2.SleepDetector, _nextCore.RouterPlugin, _plugins.ThemePlugin, _services2.Brand, _services2.Locale, {
    provide: _nextCore.RouterOptions,
    useValue: _objectSpread({}, _nextCore.isSharedWorker ? {} : {
      createHistory: function createHistory() {
        return (0, _nextCore.createMemoryHistory)();
      }
    })
  }, {
    provide: 'Subscription',
    useClass: _services.WebSocketSubscription
  }, _nextCore.StoragePlugin, {
    provide: 'Prefix',
    useValue: brandConfig.code
  }, {
    provide: 'SdkConfig',
    useValue: {
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      server: process.env.SERVER,
      cachePrefix: "sdk-".concat(brandConfig.code)
    }
  }, {
    provide: 'BrandConfig',
    useValue: brandConfig
  }, {
    provide: 'LoginViewOptions',
    useValue: {
      routeAfterLogin: '/settings'
    }
  }, _services.AccountInfo],
  main: _App.SettingAppView,
  share: {
    name: 'micro-setting',
    type: 'Base'
  },
  renderRoot: function renderRoot() {
    return document.getElementById('app');
  }
});
//# sourceMappingURL=bootstrap.js.map
