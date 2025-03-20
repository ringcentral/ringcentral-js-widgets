"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.find");
require("core-js/modules/es.array.for-each");
require("core-js/modules/es.array.index-of");
require("core-js/modules/es.array.iterator");
require("core-js/modules/es.date.now");
require("core-js/modules/es.date.to-iso-string");
require("core-js/modules/es.date.to-string");
require("core-js/modules/es.function.name");
require("core-js/modules/es.map");
require("core-js/modules/es.object.get-own-property-descriptor");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.promise");
require("core-js/modules/es.regexp.exec");
require("core-js/modules/es.string.iterator");
require("core-js/modules/es.string.split");
require("core-js/modules/web.dom-collections.for-each");
require("core-js/modules/web.dom-collections.iterator");
require("core-js/modules/web.timers");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Analytics = void 0;
require("regenerator-runtime/runtime");
var _core = require("@ringcentral-integration/core");
var _utils = require("@ringcentral-integration/utils");
var _mixpanelBrowser = _interopRequireDefault(require("mixpanel-browser"));
var _Analytics = require("../../lib/Analytics");
var _di = require("../../lib/di");
var _proxify = require("../../lib/proxy/proxify");
var _saveBlob = _interopRequireDefault(require("../../lib/saveBlob"));
var _analyticsRouters = require("./analyticsRouters");
var _dec, _dec2, _class, _class2;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) { o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) { if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } } return t; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _createSuper(t) { var r = _isNativeReflectConstruct(); return function () { var e, o = _getPrototypeOf(t); if (r) { var s = _getPrototypeOf(this).constructor; e = Reflect.construct(o, arguments, s); } else e = o.apply(this, arguments); return _possibleConstructorReturn(this, e); }; }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
// TODO: if use `dialerUI`/`callLogSection`/`adapter`, make sure they should all be RcModuleV2
var Analytics = (_dec = (0, _di.Module)({
  name: 'Analytics',
  deps: ['Auth', 'Brand', 'ExtensionFeatures', 'AnalyticsOptions', {
    dep: 'Environment',
    optional: true
  }, {
    dep: 'AccountInfo',
    optional: true
  }, {
    dep: 'ExtensionInfo',
    optional: true
  }, {
    dep: 'RouterInteraction',
    optional: true
  }, {
    dep: 'Locale',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (that) {
  var _that$_deps$accountIn, _that$_deps$extension, _that$_deps$extension2;
  return [that._deps.brand.brandConfig, (_that$_deps$accountIn = that._deps.accountInfo) === null || _that$_deps$accountIn === void 0 ? void 0 : _that$_deps$accountIn.id, (_that$_deps$extension = that._deps.extensionInfo) === null || _that$_deps$extension === void 0 ? void 0 : _that$_deps$extension.country, (_that$_deps$extension2 = that._deps.extensionFeatures) === null || _that$_deps$extension2 === void 0 ? void 0 : _that$_deps$extension2.features];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_ref) {
  _inherits(Analytics, _ref);
  var _super = _createSuper(Analytics);
  function Analytics(deps) {
    var _this$_deps$analytics, _this$_deps$analytics2, _this$_deps$analytics3, _this$_deps$analytics4, _this$_deps$analytics5, _this$_deps$analytics6, _this$_deps$analytics7, _this$_deps$analytics8, _this$_deps$analytics9;
    var _this;
    _classCallCheck(this, Analytics);
    _this = _super.call(this, {
      deps: deps
    });
    _this.appInitTime = Date.now();
    _this._useLog = (_this$_deps$analytics = _this._deps.analyticsOptions.useLog) !== null && _this$_deps$analytics !== void 0 ? _this$_deps$analytics : false;
    _this._lingerThreshold = (_this$_deps$analytics2 = _this._deps.analyticsOptions.lingerThreshold) !== null && _this$_deps$analytics2 !== void 0 ? _this$_deps$analytics2 : 1000;
    _this._enablePendo = (_this$_deps$analytics3 = _this._deps.analyticsOptions.enablePendo) !== null && _this$_deps$analytics3 !== void 0 ? _this$_deps$analytics3 : false;
    _this._analyticsKey = _this._deps.analyticsOptions.analyticsKey;
    _this._enableMixpanel = (_this$_deps$analytics4 = _this._deps.analyticsOptions.enableMixpanel) !== null && _this$_deps$analytics4 !== void 0 ? _this$_deps$analytics4 : false;
    _this._pendoApiKey = (_this$_deps$analytics5 = _this._deps.analyticsOptions.pendoApiKey) !== null && _this$_deps$analytics5 !== void 0 ? _this$_deps$analytics5 : '';
    _this._trackRouters = (_this$_deps$analytics6 = _this._deps.analyticsOptions.trackRouters) !== null && _this$_deps$analytics6 !== void 0 ? _this$_deps$analytics6 : _analyticsRouters.trackRouters;
    _this._segment = void 0;
    _this._logs = [];
    _this._lingerTimeout = null;
    _this._pendo = void 0;
    _this._waitPendoCount = 0;
    _this._pendoTimeout = void 0;
    _this._env = (_this$_deps$analytics7 = _this._deps.analyticsOptions.env) !== null && _this$_deps$analytics7 !== void 0 ? _this$_deps$analytics7 : 'dev';
    _this._eventExtendedPropsMap = new Map();
    _this._useLocalPendoJS = (_this$_deps$analytics8 = _this._deps.analyticsOptions.useLocalPendoJS) !== null && _this$_deps$analytics8 !== void 0 ? _this$_deps$analytics8 : false;
    _this._useLocalAnalyticsJS = (_this$_deps$analytics9 = _this._deps.analyticsOptions.useLocalAnalyticsJS) !== null && _this$_deps$analytics9 !== void 0 ? _this$_deps$analytics9 : false;
    _this._identifyMixpanelPromise = void 0;
    _this._identifyMixpanelResolve = void 0;
    _this._OSInfo = void 0;
    _this._OSInfo = (0, _utils.getOsInfo)();
    _this._segment = _this._enableMixpanel && _this._analyticsKey ? null : (0, _Analytics.Segment)();
    if (_this.enableMixpanel) {
      _mixpanelBrowser["default"].init(_this._analyticsKey);
      // According to EU policy, we had to disable mixpanel to upload IP addresses
      _mixpanelBrowser["default"].set_config({
        ip: false
      });
      console.log('mixpanel init');
    }
    if (_this._enablePendo && _this._pendoApiKey) {
      _Analytics.Pendo.init(_this._pendoApiKey, _this._useLocalPendoJS, function (pendoInstance) {
        _this._pendo = pendoInstance;
      });
    }
    return _this;
  }
  _createClass(Analytics, [{
    key: "onInitOnce",
    value: function onInitOnce() {
      var _this2 = this;
      this._identifyMixpanelPromise = new Promise(function (resolve) {
        _this2._identifyMixpanelResolve = resolve;
      });
      if (this._analyticsKey && this._segment) {
        this._segment.load(this._analyticsKey, {
          integrations: {
            All: true,
            Mixpanel: true
          }
        }, this._useLocalAnalyticsJS);
      }
      if (this._deps.routerInteraction) {
        (0, _core.watch)(this, function () {
          return _this2._deps.routerInteraction.currentPath;
        }, function (currentPath) {
          _this2.trackRouter(currentPath);
        });
      }
    }
  }, {
    key: "trackRouter",
    value: function () {
      var _trackRouter = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _this$_deps$routerInt,
          _this3 = this;
        var currentPath,
          target,
          _args = arguments;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                currentPath = _args.length > 0 && _args[0] !== undefined ? _args[0] : (_this$_deps$routerInt = this._deps.routerInteraction) === null || _this$_deps$routerInt === void 0 ? void 0 : _this$_deps$routerInt.currentPath;
                if (!this.enableMixpanel) {
                  _context.next = 4;
                  break;
                }
                _context.next = 4;
                return this._identifyMixpanelPromise;
              case 4:
                target = this.getTrackTarget(currentPath);
                if (target) {
                  this.trackNavigation(target);
                }
                if (this._lingerTimeout) {
                  clearTimeout(this._lingerTimeout);
                }
                this._lingerTimeout = setTimeout(function () {
                  var _this3$_deps$routerIn;
                  _this3._lingerTimeout = null;
                  if (target && ((_this3$_deps$routerIn = _this3._deps.routerInteraction) === null || _this3$_deps$routerIn === void 0 ? void 0 : _this3$_deps$routerIn.currentPath) === currentPath) {
                    _this3.trackLinger(target);
                  }
                }, this._lingerThreshold);
              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function trackRouter() {
        return _trackRouter.apply(this, arguments);
      }
      return trackRouter;
    }()
  }, {
    key: "setUserId",
    value: function setUserId() {
      this._identify({
        userId: this._deps.auth.ownerId
      });
    }
  }, {
    key: "identify",
    value: function identify(options) {
      this._identify(options);
    }
  }, {
    key: "_identify",
    value: function _identify(_ref2) {
      var userId = _ref2.userId,
        props = _objectWithoutProperties(_ref2, ["userId"]);
      if (this.enableMixpanel) {
        this._mixpanelInitialize({
          userId: userId
        });
      } else if (this.analytics) {
        this.analytics.identify(userId, props, {
          integrations: {
            All: true,
            Mixpanel: true,
            Pendo: this._enablePendo
          }
        });
      }
      if (this._enablePendo && this._pendoApiKey) {
        this._pendoInitialize(_objectSpread(_objectSpread({
          userId: userId
        }, props), {}, {
          env: this._env
        }));
      }
    }
  }, {
    key: "_mixpanelInitialize",
    value: function _mixpanelInitialize(_ref3) {
      var _mixpanel$get_distinc, _this$_identifyMixpan;
      var userId = _ref3.userId;
      if (!userId || ((_mixpanel$get_distinc = _mixpanelBrowser["default"].get_distinct_id) === null || _mixpanel$get_distinc === void 0 ? void 0 : _mixpanel$get_distinc.call(_mixpanelBrowser["default"])) === userId) {
        return;
      }
      console.log('mixpanel identify');
      _mixpanelBrowser["default"].identify(userId);
      (_this$_identifyMixpan = this._identifyMixpanelResolve) === null || _this$_identifyMixpan === void 0 ? void 0 : _this$_identifyMixpan.call(this);
    }
  }, {
    key: "pendoIdentify",
    value: function pendoIdentify(_ref4) {
      var userId = _ref4.userId,
        props = _objectWithoutProperties(_ref4, ["userId"]);
      this._pendoInitialize(_objectSpread(_objectSpread({
        userId: userId
      }, props), {}, {
        env: this._env
      }));
    }
  }, {
    key: "_pendoInitialize",
    value: function _pendoInitialize(_ref5) {
      var _this4 = this,
        _this$_deps$accountIn,
        _this$_deps$accountIn2,
        _this$_deps$accountIn3,
        _this$_deps$accountIn4;
      var userId = _ref5.userId,
        props = _objectWithoutProperties(_ref5, ["userId"]);
      if (!this._deps.accountInfo || !this._deps.accountInfo.id || !userId) {
        return;
      }
      if (this._pendoTimeout) {
        clearTimeout(this._pendoTimeout);
      }
      if (this._waitPendoCount > 3) {
        return;
      }
      if (!this._pendo) {
        this._pendoTimeout = setTimeout(function () {
          _this4._waitPendoCount += 1;
          _this4._pendoInitialize(_objectSpread({
            userId: userId
          }, props));
        }, 5 * 1000);
        return;
      }
      var initializeFunc = !this._pendo.isReady() ? this._pendo.initialize : this._pendo.updateOptions;
      var pendoAgent = {
        visitor: _objectSpread(_objectSpread({
          id: userId
        }, props), {}, {
          appName: this._deps.brand.defaultConfig.appName,
          appVersion: this._deps.analyticsOptions.appVersion,
          appBrand: this._deps.brand.defaultConfig.code,
          plaBrand: (_this$_deps$accountIn = this._deps.accountInfo) === null || _this$_deps$accountIn === void 0 ? void 0 : (_this$_deps$accountIn2 = _this$_deps$accountIn.serviceInfo) === null || _this$_deps$accountIn2 === void 0 ? void 0 : (_this$_deps$accountIn3 = _this$_deps$accountIn2.brand) === null || _this$_deps$accountIn3 === void 0 ? void 0 : _this$_deps$accountIn3.name,
          countryCode: (_this$_deps$accountIn4 = this._deps.accountInfo) === null || _this$_deps$accountIn4 === void 0 ? void 0 : _this$_deps$accountIn4.countryCode
        }),
        account: {
          id: "".concat(this._deps.accountInfo.id)
        }
      };
      typeof initializeFunc === 'function' && initializeFunc(_objectSpread({}, pendoAgent));
    }
  }, {
    key: "track",
    value: function () {
      var _track = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(event) {
        var _this$_pendo, _this$_pendo$isReady;
        var properties,
          trackProps,
          _this$_deps$auth,
          _args2 = arguments;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                properties = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
                if (!(!this.analytics && !this.enableMixpanel)) {
                  _context2.next = 3;
                  break;
                }
                return _context2.abrupt("return");
              case 3:
                trackProps = _objectSpread(_objectSpread(_objectSpread({}, this.trackProps), properties), this.extendedProps.get(event));
                if (this.enableMixpanel) {
                  // NOTE: Data tracking has been migrated from Segment to Mixpanel.
                  // Add id to identify in Mixpanel, so the usage data can be filtered same as before.
                  if ((_this$_deps$auth = this._deps.auth) === null || _this$_deps$auth === void 0 ? void 0 : _this$_deps$auth.ownerId) {
                    trackProps.id = this._deps.auth.ownerId;
                  }
                  _mixpanelBrowser["default"].track(event, trackProps);
                }
                if (this.analytics) {
                  this.analytics.track(event, trackProps, {
                    integrations: {
                      All: true,
                      Mixpanel: true,
                      Pendo: this._enablePendo
                    }
                  });
                }
                if (this._useLog) {
                  this._logs.push({
                    timeStamp: new Date().toISOString(),
                    event: event,
                    trackProps: trackProps
                  });
                }
                if (this._enablePendo && ((_this$_pendo = this._pendo) === null || _this$_pendo === void 0 ? void 0 : (_this$_pendo$isReady = _this$_pendo.isReady) === null || _this$_pendo$isReady === void 0 ? void 0 : _this$_pendo$isReady.call(_this$_pendo))) {
                  this._pendo.track("".concat(trackProps.appName, "-").concat(event), trackProps);
                }
              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
      function track(_x) {
        return _track.apply(this, arguments);
      }
      return track;
    }()
  }, {
    key: "downloadLogs",
    value: function downloadLogs() {
      if (!this._useLog) {
        return;
      }
      var blob = new Blob([JSON.stringify(this._logs, null, 2)], {
        type: 'application/json'
      });
      (0, _saveBlob["default"])('logs.json', blob);
    }
  }, {
    key: "trackNavigation",
    value: function trackNavigation(_ref6) {
      var router = _ref6.router,
        eventPostfix = _ref6.eventPostfix;
      var trackProps = {
        router: router,
        appName: this._deps.brand.defaultConfig.appName,
        appVersion: this._deps.analyticsOptions.appVersion,
        brand: this._deps.brand.defaultConfig.code
      };
      this.track("Navigation: Click/".concat(eventPostfix), trackProps);
    }
  }, {
    key: "trackLinger",
    value: function trackLinger(_ref7) {
      var router = _ref7.router,
        eventPostfix = _ref7.eventPostfix;
      var trackProps = {
        router: router,
        appName: this._deps.brand.defaultConfig.appName,
        appVersion: this._deps.analyticsOptions.appVersion,
        brand: this._deps.brand.defaultConfig.code
      };
      this.track("Navigation: View/".concat(eventPostfix), trackProps);
    }
  }, {
    key: "getTrackTarget",
    value: function getTrackTarget() {
      var _this$_deps$routerInt2;
      var currentPath = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (_this$_deps$routerInt2 = this._deps.routerInteraction) === null || _this$_deps$routerInt2 === void 0 ? void 0 : _this$_deps$routerInt2.currentPath;
      if (!currentPath) {
        return null;
      }
      var routes = currentPath.split('/');
      var formatRoute = null;
      var needMatchSecondRoutes = ['calls'];
      if (routes.length >= 3 && needMatchSecondRoutes.indexOf(routes[1]) !== -1) {
        formatRoute = "/".concat(routes[1], "/").concat(routes[2]);
      } else if (routes.length > 1) {
        formatRoute = "/".concat(routes[1]);
      }
      var target = this._trackRouters.find(function (target) {
        return formatRoute === (target === null || target === void 0 ? void 0 : target.router);
      });
      return target;
    }
  }, {
    key: "addEventsExtendedProps",
    value: function addEventsExtendedProps(_ref8) {
      var _this5 = this;
      var events = _ref8.events,
        extendedProps = _ref8.extendedProps;
      if (!events || !extendedProps) {
        console.error('[events or extendedProps] is required');
        return;
      }
      events.forEach(function (event) {
        var oldValue = _this5._eventExtendedPropsMap.get(event);
        _this5._eventExtendedPropsMap.set(event, _objectSpread(_objectSpread({}, oldValue), extendedProps));
      });
    }
  }, {
    key: "toggleDebug",
    value: function toggleDebug() {
      this.mixpanel.set_config({
        debug: !this.mixpanel.get_config('debug')
      });
    }
  }, {
    key: "extendedProps",
    get: function get() {
      return this._eventExtendedPropsMap;
    }
  }, {
    key: "analytics",
    get: function get() {
      return global.analytics;
    }
  }, {
    key: "mixpanel",
    get: function get() {
      return _mixpanelBrowser["default"];
    }
  }, {
    key: "trackedUserInfo",
    get: function get() {
      var _this$_deps$accountIn5, _this$_deps$accountIn6, _this$_deps$accountIn7, _this$_deps$accountIn8, _this$_deps$extension, _features$RingOut, _features$WebPhone, _features$PagesReceiv, _features$SMSReceivin, _features$FaxReceivin, _features$Glip;
      var userInfo = {
        BrandId: this._deps.brand.brandConfig.id,
        AccountID: (_this$_deps$accountIn5 = this._deps.accountInfo) === null || _this$_deps$accountIn5 === void 0 ? void 0 : _this$_deps$accountIn5.id,
        BrandName: this._deps.brand.brandConfig.name,
        CRMEnabled: (_this$_deps$accountIn6 = this._deps.accountInfo) === null || _this$_deps$accountIn6 === void 0 ? void 0 : _this$_deps$accountIn6.isCRMEnabled,
        servicePlanId: (_this$_deps$accountIn7 = this._deps.accountInfo) === null || _this$_deps$accountIn7 === void 0 ? void 0 : _this$_deps$accountIn7.servicePlan.id,
        edition: (_this$_deps$accountIn8 = this._deps.accountInfo) === null || _this$_deps$accountIn8 === void 0 ? void 0 : _this$_deps$accountIn8.servicePlan.edition
      };
      var features = (_this$_deps$extension = this._deps.extensionFeatures) === null || _this$_deps$extension === void 0 ? void 0 : _this$_deps$extension.features;
      var isCallingEnabled = (features === null || features === void 0 ? void 0 : (_features$RingOut = features.RingOut) === null || _features$RingOut === void 0 ? void 0 : _features$RingOut.available) || (features === null || features === void 0 ? void 0 : (_features$WebPhone = features.WebPhone) === null || _features$WebPhone === void 0 ? void 0 : _features$WebPhone.available);
      var hasSmsPermission = (features === null || features === void 0 ? void 0 : (_features$PagesReceiv = features.PagesReceiving) === null || _features$PagesReceiv === void 0 ? void 0 : _features$PagesReceiv.available) || (features === null || features === void 0 ? void 0 : (_features$SMSReceivin = features.SMSReceiving) === null || _features$SMSReceivin === void 0 ? void 0 : _features$SMSReceivin.available);
      var hasFaxPermission = features === null || features === void 0 ? void 0 : (_features$FaxReceivin = features.FaxReceiving) === null || _features$FaxReceivin === void 0 ? void 0 : _features$FaxReceivin.available;
      var hasGlipPermission = features === null || features === void 0 ? void 0 : (_features$Glip = features.Glip) === null || _features$Glip === void 0 ? void 0 : _features$Glip.available;
      var properties = [{
        name: 'PhoneService',
        value: isCallingEnabled
      }, {
        name: 'SMSService',
        value: hasSmsPermission
      }, {
        name: 'FaxService',
        value: hasFaxPermission
      }, {
        name: 'MessageService',
        value: hasGlipPermission
      }];
      properties.forEach(function (_ref9) {
        var name = _ref9.name,
          value = _ref9.value;
        if (value !== undefined) {
          userInfo[name] = value ? 'ON' : 'OFF';
        }
      });
      return userInfo;
    }
  }, {
    key: "trackProps",
    get: function get() {
      var _this$_deps$locale, _this$_deps$locale2, _this$_deps$extension2;
      return _objectSpread(_objectSpread(_objectSpread({}, this.trackedUserInfo), this._OSInfo), {}, {
        appName: this._deps.brand.defaultConfig.appName,
        appVersion: this._deps.analyticsOptions.appVersion,
        brand: this._deps.brand.defaultConfig.code,
        'App Language': ((_this$_deps$locale = this._deps.locale) === null || _this$_deps$locale === void 0 ? void 0 : _this$_deps$locale.currentLocale) || '',
        'Browser Language': ((_this$_deps$locale2 = this._deps.locale) === null || _this$_deps$locale2 === void 0 ? void 0 : _this$_deps$locale2.browserLocale) || '',
        'Extension Type': ((_this$_deps$extension2 = this._deps.extensionInfo) === null || _this$_deps$extension2 === void 0 ? void 0 : _this$_deps$extension2.info.type) || '',
        'App Init Time': this.appInitTime
      });
    }
  }, {
    key: "pendo",
    get: function get() {
      return this._pendo;
    }
  }, {
    key: "enableMixpanel",
    get: function get() {
      return !!(this._enableMixpanel && this._analyticsKey && (!this._deps.environment || this._deps.environment.allowDataTracking));
    }
  }]);
  return Analytics;
}(_core.RcModuleV2), (_applyDecoratedDescriptor(_class2.prototype, "track", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "track"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "trackedUserInfo", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "trackedUserInfo"), _class2.prototype)), _class2)) || _class);
exports.Analytics = Analytics;
//# sourceMappingURL=Analytics.js.map
