"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
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
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PendoAnalytics = void 0;
require("core-js/modules/es.array.concat.js");
var _Analytics = require("@ringcentral-integration/commons/lib/Analytics");
var _nextCore = require("@ringcentral-integration/next-core");
var _rxjs = require("rxjs");
var _TrackPropsService = require("../TrackPropsService");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _class, _class2, _descriptor, _descriptor2, _descriptor3;
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
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
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
var PendoAnalytics = exports.PendoAnalytics = (_dec = (0, _nextCore.injectable)({
  name: 'PendoAnalytics'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.inject)('PendoAnalyticsOptions')(target, undefined, 1);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _TrackPropsService.TrackPropsService === "undefined" ? Object : _TrackPropsService.TrackPropsService, typeof PendoAnalyticsOptions === "undefined" ? Object : PendoAnalyticsOptions]), _dec5 = (0, _nextCore.dynamic)('Analytics'), _dec6 = Reflect.metadata("design:type", typeof Analytics === "undefined" ? Object : Analytics), _dec7 = (0, _nextCore.dynamic)('Auth'), _dec8 = Reflect.metadata("design:type", typeof Auth === "undefined" ? Object : Auth), _dec9 = (0, _nextCore.dynamic)('Brand'), _dec0 = Reflect.metadata("design:type", typeof Brand === "undefined" ? Object : Brand), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (_class2 = /*#__PURE__*/function (_RcModule) {
  function PendoAnalytics(_trackPropsService, _pendoAnalyticsOptions) {
    var _this$_pendoAnalytics;
    var _this;
    _classCallCheck(this, PendoAnalytics);
    _this = _callSuper(this, PendoAnalytics);
    _this._trackPropsService = _trackPropsService;
    _this._pendoAnalyticsOptions = _pendoAnalyticsOptions;
    _this._pendo$ = new _rxjs.BehaviorSubject(null);
    _this._useLocalPendoJS = (_this$_pendoAnalytics = _this._pendoAnalyticsOptions.useLocalPendoJS) !== null && _this$_pendoAnalytics !== void 0 ? _this$_pendoAnalytics : false;
    _this._pendoApiKey = _this._pendoAnalyticsOptions.pendoApiKey;
    _this.pendoReady$ = _this._pendo$.pipe((0, _rxjs.filter)(Boolean), (0, _rxjs.take)(1), (0, _rxjs.switchMap)(function (pendo) {
      return (0, _nextCore.fromWatchValue)(_this, function () {
        return _this._auth;
      }).pipe((0, _rxjs.switchMap)(function (auth) {
        return (auth === null || auth === void 0 ? void 0 : auth.ownerId$) || _rxjs.EMPTY;
      }), (0, _rxjs.switchMap)(function (ownerId) {
        // when owner become null and pendo already ready, means logout, clear the pendo session
        if (!ownerId) {
          if (pendo.isReady()) {
            _this.logger.log('pendo clear session');
            // https://support.pendo.io/hc/en-us/community/posts/4430350875291-How-to-make-user-Anonymous-by-setting-default-visitor-id-when-user-logout
            pendo.clearSession();
          }
          return _rxjs.EMPTY;
        }
        return (0, _rxjs.of)(ownerId);
      }), (0, _rxjs.map)(function (ownerId) {
        return {
          ownerId: ownerId,
          pendo: pendo
        };
      })) || _rxjs.EMPTY;
    }), (0, _rxjs.switchMap)(/*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(_ref) {
        var _pendo$isReady;
        var pendo, init, fn, pendoAgent;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              pendo = _ref.pendo;
              init = !((_pendo$isReady = pendo.isReady) === null || _pendo$isReady === void 0 ? void 0 : _pendo$isReady.call(pendo));
              fn = init ? pendo.initialize : pendo.updateOptions;
              if (!(typeof fn === 'function')) {
                _context.n = 2;
                break;
              }
              _context.n = 1;
              return (0, _rxjs.firstValueFrom)((0, _nextCore.fromWatchValue)(_this, function () {
                var _this$_auth;
                return (_this$_auth = _this._auth) === null || _this$_auth === void 0 ? void 0 : _this$_auth.ownerId;
              }).pipe((0, _rxjs.switchMap)(function (ownerId) {
                return _this.getPendoAgent(ownerId);
              }), (0, _rxjs.filter)(function (x) {
                return x.account.id !== _TrackPropsService.DEFAULT_UNKNOWN_VALUE;
              })));
            case 1:
              pendoAgent = _context.v;
              _this.logger.log("pendo ".concat(init ? 'initialize' : 'update', " options"), pendoAgent);
              fn(pendoAgent);
            case 2:
              return _context.a(2, pendo);
          }
        }, _callee);
      }));
      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }()), (0, _rxjs.shareReplay)(1));
    _initializerDefineProperty(_this, "_analytics", _descriptor, _this);
    _initializerDefineProperty(_this, "_auth", _descriptor2, _this);
    _initializerDefineProperty(_this, "_brand", _descriptor3, _this);
    _this.guidesLoaded$ = function () {
      var subject = new _rxjs.Subject();
      var everListen = false;
      var obs = _this.pendoReady$.pipe((0, _rxjs.take)(1), (0, _rxjs.switchMap)(function (pendo) {
        if (!everListen) {
          everListen = true;
          pendo.events.guidesLoaded(function () {
            subject.next();
          });
        }
        return subject.asObservable();
      }));
      return obs;
    }();
    _this.count = 0;
    if (_this.enable) {
      _Analytics.Pendo.init(_this._pendoApiKey, _this._useLocalPendoJS, function (pendoInstance) {
        _this._pendo$.next(pendoInstance);
      });
      var analyticsModule$ = (0, _nextCore.fromWatchValue)(_this, function () {
        return _this._analytics;
      });
      _this.pendoReady$.pipe((0, _rxjs.switchMap)(function () {
        return analyticsModule$.pipe((0, _rxjs.switchMap)(function (analytics) {
          return (analytics === null || analytics === void 0 ? void 0 : analytics.track$) || _rxjs.EMPTY;
        }));
      }), (0, _rxjs.filter)(function (_ref3) {
        var _this$_pendoAnalytics2;
        var event = _ref3.event;
        var trackEvents = (_this$_pendoAnalytics2 = _this._pendoAnalyticsOptions) === null || _this$_pendoAnalytics2 === void 0 ? void 0 : _this$_pendoAnalytics2.trackEvents;
        return (trackEvents === null || trackEvents === void 0 ? void 0 : trackEvents.has(event)) || false;
      }), (0, _rxjs.tap)(function (_ref4) {
        var event = _ref4.event,
          trackProps = _ref4.trackProps;
        _this.track(event, trackProps);
      }), _nextCore.takeUntilAppDestroy).subscribe();
    }
    return _this;
  }
  _inherits(PendoAnalytics, _RcModule);
  return _createClass(PendoAnalytics, [{
    key: "enable",
    get: function get() {
      return global.document && this._pendoApiKey;
    }
  }, {
    key: "pendo",
    get: function get() {
      return this._pendo$.value;
    }
  }, {
    key: "isReady",
    get: function get() {
      var _this$pendo, _this$pendo$isReady;
      return ((_this$pendo = this.pendo) === null || _this$pendo === void 0 ? void 0 : (_this$pendo$isReady = _this$pendo.isReady) === null || _this$pendo$isReady === void 0 ? void 0 : _this$pendo$isReady.call(_this$pendo)) || false;
    }
  }, {
    key: "track",
    value: function track(event) {
      var _this$_brand, _pendo$isReady2, _this$_auth2;
      var trackProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var pendo = this.pendo;
      var appName = trackProps.appName || ((_this$_brand = this._brand) === null || _this$_brand === void 0 ? void 0 : _this$_brand.defaultConfig.appName);
      var eventName = "".concat(appName, "-").concat(event);
      this.logger.log('pendo track', eventName, trackProps);
      // in current version pendo only use after login, if we need to use it before login, we need to change the logic
      if ((pendo === null || pendo === void 0 ? void 0 : (_pendo$isReady2 = pendo.isReady) === null || _pendo$isReady2 === void 0 ? void 0 : _pendo$isReady2.call(pendo)) && ((_this$_auth2 = this._auth) === null || _this$_auth2 === void 0 ? void 0 : _this$_auth2.ownerId)) {
        pendo.track(eventName, trackProps);
      }
    }
  }, {
    key: "refreshGuides",
    value: function () {
      var _refreshGuides = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        var _this$_auth3, _pendo$isReady3;
        var ownerId, pendo, promise, _t, _t2;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              ownerId = (_this$_auth3 = this._auth) === null || _this$_auth3 === void 0 ? void 0 : _this$_auth3.ownerId;
              pendo = this.pendo;
              if (!(ownerId && (pendo === null || pendo === void 0 ? void 0 : (_pendo$isReady3 = pendo.isReady) === null || _pendo$isReady3 === void 0 ? void 0 : _pendo$isReady3.call(pendo)))) {
                _context2.n = 5;
                break;
              }
              promise = (0, _rxjs.firstValueFrom)(this.guidesLoaded$); // submitted the saved data to pendo server before refresh guides
              _context2.n = 1;
              return pendo.flushNow();
            case 1:
              _t = pendo;
              if (!(this.count % 2 === 0)) {
                _context2.n = 2;
                break;
              }
              _t2 = {};
              _context2.n = 4;
              break;
            case 2:
              _context2.n = 3;
              return this.getPendoAgent(ownerId);
            case 3:
              _t2 = _context2.v;
            case 4:
              _t.updateOptions.call(_t, _t2);
              this.count++;
              return _context2.a(2, promise);
            case 5:
              return _context2.a(2);
          }
        }, _callee2, this);
      }));
      function refreshGuides() {
        return _refreshGuides.apply(this, arguments);
      }
      return refreshGuides;
    }()
  }, {
    key: "flushNow",
    value: function () {
      var _flushNow = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
        var _pendo$isReady4;
        var pendo;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              pendo = this.pendo;
              if (!(pendo === null || pendo === void 0 ? void 0 : (_pendo$isReady4 = pendo.isReady) === null || _pendo$isReady4 === void 0 ? void 0 : _pendo$isReady4.call(pendo))) {
                _context3.n = 1;
                break;
              }
              _context3.n = 1;
              return pendo.flushNow();
            case 1:
              return _context3.a(2);
          }
        }, _callee3, this);
      }));
      function flushNow() {
        return _flushNow.apply(this, arguments);
      }
      return flushNow;
    }()
  }, {
    key: "getPendoAgent",
    value: function () {
      var _getPendoAgent = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(ownerId) {
        var _this$_auth4, _this$_brand2;
        var profileProperties, additionalProps, pendoAgent;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              _context4.n = 1;
              return this._trackPropsService.getTrackProps();
            case 1:
              profileProperties = _context4.v;
              additionalProps = this._pendoAnalyticsOptions.additionalVisitorProps;
              pendoAgent = {
                visitor: _objectSpread({
                  id: ownerId || ((_this$_auth4 = this._auth) === null || _this$_auth4 === void 0 ? void 0 : _this$_auth4.ownerId) || '',
                  env: process.env.BUILD_ENVIRONMENT,
                  appName: profileProperties.appName,
                  appVersion: profileProperties.appVersion,
                  appBrand: (_this$_brand2 = this._brand) === null || _this$_brand2 === void 0 ? void 0 : _this$_brand2.defaultConfig.code
                }, additionalProps),
                account: {
                  id: "".concat(profileProperties.accountId)
                }
              };
              return _context4.a(2, pendoAgent);
          }
        }, _callee4, this);
      }));
      function getPendoAgent(_x2) {
        return _getPendoAgent.apply(this, arguments);
      }
      return getPendoAgent;
    }()
  }]);
}(_nextCore.RcModule), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_analytics", [_dec5, _dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_auth", [_dec7, _dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_brand", [_dec9, _dec0], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _class2)) || _class) || _class) || _class) || _class);
//# sourceMappingURL=PendoAnalytics.js.map
