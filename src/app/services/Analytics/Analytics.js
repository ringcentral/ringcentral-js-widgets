"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Analytics = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.date.now.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/web.dom-collections.for-each.js");
var _nextCore = require("@ringcentral-integration/next-core");
var _rxjs = require("rxjs");
var _Environment = require("../Environment");
var _KeepBeat = require("../KeepBeat");
var _TrackPropsService = require("../TrackPropsService");
var _analyticsRouters = require("./analyticsRouters");
var _trackEvent = require("./trackEvent");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _class, _class2, _descriptor;
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t1 in e) "default" !== _t1 && {}.hasOwnProperty.call(e, _t1) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t1)) && (i.get || i.set) ? o(f, _t1, i) : f[_t1] = e[_t1]); return f; })(e, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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
/**
 * Analytics service
 *
 * the tracking service for the app
 *
 * in worker mode, it will use the port manager to send the tracking data to the **main tab**
 *
 * in main tab, it will use the **analytics** library to send the tracking data to the server
 */
var Analytics = exports.Analytics = (_dec = (0, _nextCore.injectable)({
  name: 'Analytics'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.inject)('AnalyticsOptions')(target, undefined, 4);
}, _dec3 = function _dec3(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 5);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _KeepBeat.KeepBeat === "undefined" ? Object : _KeepBeat.KeepBeat, typeof _nextCore.RouterPlugin === "undefined" ? Object : _nextCore.RouterPlugin, typeof _TrackPropsService.TrackPropsService === "undefined" ? Object : _TrackPropsService.TrackPropsService, typeof _nextCore.PortManager === "undefined" ? Object : _nextCore.PortManager, typeof AnalyticsOptions === "undefined" ? Object : AnalyticsOptions, typeof _Environment.Environment === "undefined" ? Object : _Environment.Environment]), _dec6 = (0, _nextCore.dynamic)('Auth'), _dec7 = Reflect.metadata("design:type", typeof Auth === "undefined" ? Object : Auth), _dec8 = (0, _nextCore.delegate)('mainClient'), _dec9 = Reflect.metadata("design:type", Function), _dec0 = Reflect.metadata("design:paramtypes", [String, typeof Record === "undefined" ? Object : Record]), _dec1 = (0, _nextCore.delegate)('clients'), _dec10 = Reflect.metadata("design:type", Function), _dec11 = Reflect.metadata("design:paramtypes", [Object]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = (_class2 = /*#__PURE__*/function (_RcModule) {
  function Analytics(_keepBeat, _router, _trackPropsService, _portManager, _analyticsOptions, _environment) {
    var _this$_analyticsOptio, _this$_analyticsOptio2, _this$_analyticsOptio3;
    var _this;
    _classCallCheck(this, Analytics);
    _this = _callSuper(this, Analytics);
    _this._keepBeat = _keepBeat;
    _this._router = _router;
    _this._trackPropsService = _trackPropsService;
    _this._portManager = _portManager;
    _this._analyticsOptions = _analyticsOptions;
    _this._environment = _environment;
    _initializerDefineProperty(_this, "_auth", _descriptor, _this);
    _this._eventExtendedPropsMap = {};
    _this._mixpanel$ = new _rxjs.BehaviorSubject(null);
    _this._useLog = (_this$_analyticsOptio = _this._analyticsOptions.useLog) !== null && _this$_analyticsOptio !== void 0 ? _this$_analyticsOptio : true;
    _this._enableMixpanel = _this._analyticsOptions.enableMixpanel || false;
    _this._lingerThreshold = (_this$_analyticsOptio2 = _this._analyticsOptions.lingerThreshold) !== null && _this$_analyticsOptio2 !== void 0 ? _this$_analyticsOptio2 : 1000;
    _this._trackRoutersMap = (_this$_analyticsOptio3 = _this._analyticsOptions.trackRoutersMap) !== null && _this$_analyticsOptio3 !== void 0 ? _this$_analyticsOptio3 : _analyticsRouters.trackRoutersMap;
    /**
     * emit event when track be triggered
     */
    _this.track$ = new _rxjs.Subject();
    _this.enableMixpanel$ = (0, _nextCore.fromWatchValue)(_this, function () {
      return _this.enableMixpanel;
    });
    _this.loadMixpanel$ = _this.enableMixpanel$.pipe((0, _rxjs.filter)(Boolean),
    // the load only need once, so take 1
    (0, _rxjs.take)(1), (0, _rxjs.switchMap)(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var mixpanel;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            _context.n = 1;
            return Promise.resolve().then(function () {
              return _interopRequireWildcard(require('mixpanel-browser'));
            });
          case 1:
            mixpanel = _context.v["default"];
            mixpanel.init(_this._analyticsOptions.analyticsKey);
            // According to EU policy, we had to disable mixpanel to upload IP addresses
            mixpanel.set_config({
              ip: false
            });
            _this.logger.log('mixpanel init');
            return _context.a(2, mixpanel);
        }
      }, _callee);
    }))), (0, _rxjs.retry)({
      count: 3,
      delay: function delay(error) {
        _this.logger.error('mixpanel load fail', error);
        return (0, _rxjs.timer)(500);
      }
    }), (0, _rxjs.shareReplay)(1));
    _this._appInitTime = Date.now();
    if (global.document) {
      if (_this._portManager.shared) {
        // use client listener with focus event to track the route change event to ensure that is triggered by user
        _this._portManager.onClient(function () {
          _this.bindRouteChangeEventTrack();
        });
      } else {
        _this.bindRouteChangeEventTrack();
      }
      _this.loadMixpanel$.pipe((0, _rxjs.switchMap)(function (mixpanel) {
        return _this.enableMixpanel$.pipe((0, _rxjs.switchMap)(function (enableMixpanel) {
          if (enableMixpanel) {
            var authModule$ = (0, _nextCore.fromWatchValue)(_this, function () {
              return _this._auth;
            });
            return authModule$.pipe((0, _rxjs.switchMap)(function (auth) {
              return (auth === null || auth === void 0 ? void 0 : auth.ownerId$) || (0, _rxjs.of)(null);
            }), (0, _rxjs.tap)(function (ownerId) {
              var _mixpanel$get_distinc2;
              if (!ownerId) {
                var _mixpanel$get_distinc;
                if ((_mixpanel$get_distinc = mixpanel.get_distinct_id) === null || _mixpanel$get_distinc === void 0 ? void 0 : _mixpanel$get_distinc.call(mixpanel)) {
                  _this.logger.log('identify reset');
                  mixpanel.reset();
                }
                return;
              }
              if (((_mixpanel$get_distinc2 = mixpanel.get_distinct_id) === null || _mixpanel$get_distinc2 === void 0 ? void 0 : _mixpanel$get_distinc2.call(mixpanel)) === ownerId) return;
              _this.logger.log('identify set', ownerId);
              mixpanel.identify(ownerId);
            }), (0, _rxjs.tap)(function () {
              if (!_this.mixpanel) {
                // after identify or non identify then we can start send mixpanel events
                _this._mixpanel$.next(mixpanel);
              }
            }));
          }
          mixpanel.reset();
          _this._mixpanel$.next(null);
          return _rxjs.EMPTY;
        }));
      }), _nextCore.takeUntilAppDestroy).subscribe();
    }

    // TODO: the keep beat track event be cancel by PM due to need other way to track the auto heart beat
    // in test environment, we still need to track the auto heart beat event to avoid the Line coverage, we may remove in the next release
    if (process.env.NODE_ENV === 'test') {
      _this._keepBeat.beat$.pipe((0, _rxjs.switchMap)(function () {
        return _this._trackPropsService.autoHeartBeatProps$.pipe(
        // only get data once, wait next time beat$ event to trigger
        (0, _rxjs.take)(1));
      }), (0, _rxjs.tap)(function (autoHeartBeatProps) {
        (0, _trackEvent.trackEvent)('Int_autoHeartBeat', autoHeartBeatProps);
      }), _nextCore.takeUntilAppDestroy).subscribe();
    }
    _trackEvent.globalTrackEvent$.pipe((0, _rxjs.tap)(function (_ref2) {
      var _ref3 = _slicedToArray(_ref2, 2),
        eventName = _ref3[0],
        properties = _ref3[1];
      _this.track(eventName, properties);
    }), _nextCore.takeUntilAppDestroy).subscribe();
    return _this;
  }
  _inherits(Analytics, _RcModule);
  return _createClass(Analytics, [{
    key: "mixpanel",
    get: function get() {
      return this._mixpanel$.value;
    }
  }, {
    key: "enableMixpanel",
    get: function get() {
      return !!(this._enableMixpanel && this._analyticsOptions.analyticsKey && (!this._environment || this._environment.allowDataTracking));
    }
  }, {
    key: "bindRouteChangeEventTrack",
    value: function bindRouteChangeEventTrack() {
      var _this2 = this;
      (0, _nextCore.fromWatchValue)(this, function () {
        return _this2._router.currentPath;
      }).pipe((0, _rxjs.switchMap)(function (currentPath) {
        var target = _this2.getTrackTarget(currentPath);
        if (!target ||
        // only track the event that is triggered by the focus page
        !document.hasFocus()) {
          return _rxjs.EMPTY;
        }
        var router = target.router,
          eventPostfix = target.eventPostfix;
        _this2.track("Navigation: Click/".concat(eventPostfix), {
          router: router
        });

        // when leave on the route for then threshold, assume that the user is linger on that route
        return (0, _rxjs.timer)(_this2._lingerThreshold).pipe((0, _rxjs.tap)(function () {
          var router = target.router,
            eventPostfix = target.eventPostfix;
          _this2.track("Navigation: Linger/".concat(eventPostfix), {
            router: router
          });
        }));
      }), _nextCore.takeUntilAppDestroy).subscribe();
    }
  }, {
    key: "_track",
    value: function () {
      var _track2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(event) {
        var properties,
          trackProps,
          _this$mixpanel,
          _mixpanel,
          _args2 = arguments,
          _t,
          _t2,
          _t3,
          _t4,
          _t5,
          _t6,
          _t7,
          _t8,
          _t9,
          _t0;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              properties = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
              if (!(!this.enableMixpanel && !this._useLog)) {
                _context2.n = 1;
                break;
              }
              return _context2.a(2);
            case 1:
              if (this._useLog ||
              // in test environment, always log into log system
              process.env.NODE_ENV === 'test') {
                this.logger.log('track event', event, properties, this._appInitTime);
              }
              trackProps = {};
              if (!this.enableMixpanel) {
                _context2.n = 10;
                break;
              }
              if (!((_this$mixpanel = this.mixpanel) !== null && _this$mixpanel !== void 0)) {
                _context2.n = 2;
                break;
              }
              _t = _this$mixpanel;
              _context2.n = 4;
              break;
            case 2:
              _context2.n = 3;
              return (0, _rxjs.firstValueFrom)(this._mixpanel$.pipe((0, _rxjs.filter)(Boolean)));
            case 3:
              _t = _context2.v;
            case 4:
              _mixpanel = _t;
              if (!(process.env.NODE_ENV === 'test')) {
                _context2.n = 8;
                break;
              }
              _context2.p = 5;
              if (_mixpanel.track.mock) {
                _context2.n = 6;
                break;
              }
              throw new Error('Mocked Mixpanel track is not mocked, should set a mock function to avoid miss send data to remote');
            case 6:
              _context2.n = 8;
              break;
            case 7:
              _context2.p = 7;
              _t2 = _context2.v;
            case 8:
              _t3 = _objectSpread;
              _t4 = _objectSpread;
              _t5 = _objectSpread;
              _t6 = {};
              _context2.n = 9;
              return this._trackPropsService.getTrackProps();
            case 9:
              trackProps = _t3(_t4(_t5(_t6, _context2.v), this._eventExtendedPropsMap[event]), properties);
              _mixpanel.track(event, trackProps);
              _context2.n = 12;
              break;
            case 10:
              _t7 = _objectSpread;
              _t8 = _objectSpread;
              _t9 = _objectSpread;
              _t0 = {};
              _context2.n = 11;
              return this._trackPropsService.getTrackProps();
            case 11:
              trackProps = _t7(_t8(_t9(_t0, _context2.v), this._eventExtendedPropsMap[event]), properties);
            case 12:
              this.track$.next({
                event: event,
                trackProps: trackProps
              });
            case 13:
              return _context2.a(2);
          }
        }, _callee2, this, [[5, 7]]);
      }));
      function _track(_x) {
        return _track2.apply(this, arguments);
      }
      return _track;
    }()
  }, {
    key: "trackOnMainTab",
    value: function () {
      var _trackOnMainTab = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(event) {
        var properties,
          _args3 = arguments;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              properties = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
              _context3.n = 1;
              return this._track(event, properties);
            case 1:
              return _context3.a(2);
          }
        }, _callee3, this);
      }));
      function trackOnMainTab(_x2) {
        return _trackOnMainTab.apply(this, arguments);
      }
      return trackOnMainTab;
    }()
    /**
     * Tracking with an event
     *
     * #### Never use delegate to call this method, that should occur in current client directly to get correct type
     */
  }, {
    key: "track",
    value: (function () {
      var _track3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(event) {
        var properties,
          _args4 = arguments;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              properties = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
              if (!(this._portManager.shared && this._portManager.isWorkerMode &&
              // when the track is occur in server mode, we need to send the event to main client, because server not have mixpanel instance
              this._portManager.isServer)) {
                _context4.n = 1;
                break;
              }
              return _context4.a(2, this.trackOnMainTab(event, properties));
            case 1:
              return _context4.a(2, this._track(event, properties));
          }
        }, _callee4, this);
      }));
      function track(_x3) {
        return _track3.apply(this, arguments);
      }
      return track;
    }())
  }, {
    key: "addEventsExtendedProps",
    value: function () {
      var _addEventsExtendedProps = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(_ref4) {
        var _this3 = this;
        var events, extendedProps;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              events = _ref4.events, extendedProps = _ref4.extendedProps;
              events.forEach(function (event) {
                if (!_this3._eventExtendedPropsMap[event]) {
                  _this3._eventExtendedPropsMap[event] = {};
                }
                Object.assign(_this3._eventExtendedPropsMap[event], extendedProps);
              });
            case 1:
              return _context5.a(2);
          }
        }, _callee5);
      }));
      function addEventsExtendedProps(_x4) {
        return _addEventsExtendedProps.apply(this, arguments);
      }
      return addEventsExtendedProps;
    }()
  }, {
    key: "toggleDebug",
    value: function toggleDebug() {
      var mixpanel = this.mixpanel;
      mixpanel === null || mixpanel === void 0 ? void 0 : mixpanel.set_config({
        debug: !mixpanel.get_config('debug')
      });
    }

    // TODO: move out of this service
    /**
     * get Tracking Target
     */
  }, {
    key: "getTrackTarget",
    value: function getTrackTarget() {
      var _this$_trackRoutersMa;
      var currentPath = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._router.currentPath;
      if (!currentPath) return null;
      var routes = currentPath.split('/');
      var formatRoute = null;
      var needMatchSecondRoutes = ['calls'];
      if (routes.length >= 3 && needMatchSecondRoutes.indexOf(routes[1]) !== -1) {
        formatRoute = "/".concat(routes[1], "/").concat(routes[2]);
      } else if (routes.length > 1) {
        formatRoute = "/".concat(routes[1]);
      }
      return formatRoute ? (_this$_trackRoutersMa = this._trackRoutersMap.get(formatRoute)) !== null && _this$_trackRoutersMa !== void 0 ? _this$_trackRoutersMa : null : null;
    }
  }]);
}(_nextCore.RcModule), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_auth", [_dec6, _dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, "trackOnMainTab", [_dec8, _dec9, _dec0], Object.getOwnPropertyDescriptor(_class2.prototype, "trackOnMainTab"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "addEventsExtendedProps", [_dec1, _dec10, _dec11], Object.getOwnPropertyDescriptor(_class2.prototype, "addEventsExtendedProps"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class) || _class);
//# sourceMappingURL=Analytics.js.map
