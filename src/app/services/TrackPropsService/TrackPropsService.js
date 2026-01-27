"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.map.js");
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
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrackPropsService = exports.DEFAULT_UNKNOWN_VALUE = void 0;
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.object.entries.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
var _services = require("@ringcentral-integration/micro-core/src/app/services");
var _nextCore = require("@ringcentral-integration/next-core");
var _nextMicro = require("@ringcentral-integration/next-micro");
var _rxjs = require("rxjs");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
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
var DEFAULT_UNKNOWN_VALUE = exports.DEFAULT_UNKNOWN_VALUE = 'Unknown';

/**
 * The interface for the additional track props
 *
 * you can implement this interface in your project and inject in the createApp
 *
 * !! always use `function` or `getter` to return the trackProps, because the trackProps may be changed in the future
 *
 * @example
 * ```ts
 * {
      provide: 'AdditionalTrackProps',
      deps: [ThirdPartyService],
      useFactory: (thirdPartyService: ThirdPartyService) => {
        return () => {
          trackProps: {
            'Server Version': thirdPartyService?.crmInfo.crmVersion || '',
          },
        } satisfies IAdditionalTrackProps;
      },
    },
 * ```

    of implement the class with same name

```ts
@injectable({
  name: 'AdditionalTrackProps',
})
export class AdditionalTrackProps
  extends RcModule
  implements IAdditionalTrackProps {
  get trackProps() {
    const initProps = this.getInitTrackProps();
    return {
      ...initProps,
      ...this.trackPropsValue,
    };
  }
}

```
 */
var TrackPropsService = exports.TrackPropsService = (_dec = (0, _nextCore.injectable)({
  name: 'TrackPropsService'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.inject)('AnalyticsOptions')(target, undefined, 3);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _services.Brand === "undefined" ? Object : _services.Brand, typeof _services.UAParsedInfo === "undefined" ? Object : _services.UAParsedInfo, typeof _services.Locale === "undefined" ? Object : _services.Locale, typeof AnalyticsOptions === "undefined" ? Object : AnalyticsOptions]), _dec5 = (0, _nextCore.dynamic)('AdditionalTrackProps'), _dec6 = Reflect.metadata("design:type", typeof IAdditionalTrackProps === "undefined" ? Object : IAdditionalTrackProps), _dec7 = (0, _nextCore.dynamic)('Auth'), _dec8 = Reflect.metadata("design:type", typeof Auth === "undefined" ? Object : Auth), _dec9 = (0, _nextCore.dynamic)('ExtensionInfo'), _dec0 = Reflect.metadata("design:type", typeof ExtensionInfo === "undefined" ? Object : ExtensionInfo), _dec1 = (0, _nextCore.dynamic)('ExtensionFeatures'), _dec10 = Reflect.metadata("design:type", typeof ExtensionFeatures === "undefined" ? Object : ExtensionFeatures), _dec11 = Reflect.metadata("design:type", Function), _dec12 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (_class2 = /*#__PURE__*/function (_RcModule) {
  function TrackPropsService(_brand, _uAParsedInfo, _locale, _analyticsOptions) {
    var _this;
    _classCallCheck(this, TrackPropsService);
    _this = _callSuper(this, TrackPropsService);
    _this._brand = _brand;
    _this._uAParsedInfo = _uAParsedInfo;
    _this._locale = _locale;
    _this._analyticsOptions = _analyticsOptions;
    _this.mfeInfo = (0, _nextMicro.getMfeMeta)({
      onlyVersion: true
    });
    /**
     * this is dynamic inject from other projects, use dynamic to avoid any possible circular dependency
     */
    _initializerDefineProperty(_this, "additionalTrackProps", _descriptor, _this);
    _initializerDefineProperty(_this, "_auth", _descriptor2, _this);
    _initializerDefineProperty(_this, "_extensionInfo", _descriptor3, _this);
    _initializerDefineProperty(_this, "_extensionFeatures", _descriptor4, _this);
    _this.extensionInfoReady$ = (0, _rxjs.defer)(
    // use defer to use easy to mock in the test
    function () {
      var _this$_extensionInfo$, _this$_extensionInfo;
      return (_this$_extensionInfo$ = (_this$_extensionInfo = _this._extensionInfo) === null || _this$_extensionInfo === void 0 ? void 0 : _this$_extensionInfo.dataReady$.pipe(
      // max wait 10s for the extension info ready before the tracking event send
      (0, _rxjs.timeout)({
        each: 10000,
        "with": function _with() {
          return (0, _rxjs.of)('timeout');
        }
      }))) !== null && _this$_extensionInfo$ !== void 0 ? _this$_extensionInfo$ : (0, _rxjs.of)(null);
    });
    _this.autoHeartBeatProps$ = (0, _nextCore.fromWatchValue)(_this, function () {
      return _this._auth;
    }).pipe((0, _rxjs.switchMap)(function (auth) {
      if (!auth) return _rxjs.EMPTY;
      return auth.ownerId$.pipe((0, _rxjs.switchMap)(function (ownerId) {
        if (ownerId) {
          return (0, _nextCore.fromWatchValue)(_this, function () {
            return _this._extensionFeatures;
          }).pipe((0, _rxjs.switchMap)(function (extensionFeatures) {
            if (!extensionFeatures) return (0, _rxjs.of)(null);
            return extensionFeatures.ready$.pipe((0, _rxjs.map)(function () {
              return _this.autoHeartBeatProps;
            }));
          }));
        }
        return (0, _rxjs.of)(null);
      }));
    }), (0, _rxjs.map)(function () {
      return _this.autoHeartBeatProps;
    }));
    return _this;
  }

  /**
   * Gets event super properties for analytics tracking
   */
  _inherits(TrackPropsService, _RcModule);
  return _createClass(TrackPropsService, [{
    key: "extensionPermission",
    get: function get() {
      var _this$_extensionFeatu;
      var features = (_this$_extensionFeatu = this._extensionFeatures) === null || _this$_extensionFeatu === void 0 ? void 0 : _this$_extensionFeatu.features;
      if (features) {
        var display = Object.entries(features).reduce(function (permissions, _ref) {
          var _ref2 = _slicedToArray(_ref, 2),
            key = _ref2[0],
            value = _ref2[1];
          permissions[key] = !!value.available;
          return permissions;
        }, {});
        if (Object.keys(display).length > 0) {
          return display;
        }
      }
      return DEFAULT_UNKNOWN_VALUE;
    }
  }, {
    key: "autoHeartBeatProps",
    get:
    /**
     * this data must wait the account info ready, so we can get the extension permission, keep that be private, outside must use the autoHeartBeatProps$ to get the data
     */
    function get() {
      var _this$additionalTrack, _this$additionalTrack2;
      if (!((_this$additionalTrack = this.additionalTrackProps) === null || _this$additionalTrack === void 0 ? void 0 : _this$additionalTrack.autoHeartBeatProps)) {
        return {
          extensionPermission: this.extensionPermission
        };
      }
      var autoHeartBeatProps = (_this$additionalTrack2 = this.additionalTrackProps) === null || _this$additionalTrack2 === void 0 ? void 0 : _this$additionalTrack2.autoHeartBeatProps;
      return _objectSpread({
        extensionPermission: this.extensionPermission
      }, typeof autoHeartBeatProps === 'function' ? autoHeartBeatProps() : autoHeartBeatProps);
    }
  }, {
    key: "eventSuperProperties",
    get: function get() {
      var _ref3, _userAgentResult$os$v, _ref4, _version, _this$_locale$browser, _this$_locale$current, _navigator$hardwareCo, _ref5;
      var userAgentResult = this._uAParsedInfo.userAgentResult;
      var device = userAgentResult === null || userAgentResult === void 0 ? void 0 : userAgentResult.device;
      return {
        Device: (_ref3 = Object.keys(device || {}).length > 0 ? device :
        // when be virtual device, that will be {}, we also show that as unknown
        DEFAULT_UNKNOWN_VALUE) !== null && _ref3 !== void 0 ? _ref3 : DEFAULT_UNKNOWN_VALUE,
        osVersion: (_userAgentResult$os$v = userAgentResult === null || userAgentResult === void 0 ? void 0 : userAgentResult.os.version) !== null && _userAgentResult$os$v !== void 0 ? _userAgentResult$os$v : DEFAULT_UNKNOWN_VALUE,
        appName: (_ref4 = this._brand.defaultConfig.appName) !== null && _ref4 !== void 0 ? _ref4 : DEFAULT_UNKNOWN_VALUE,
        appVersion: this._analyticsOptions.appVersion,
        appVersionMFE: (_version = this.mfeInfo.version) !== null && _version !== void 0 ? _version : DEFAULT_UNKNOWN_VALUE,
        'Browser Language': (_this$_locale$browser = this._locale.browserLocale) !== null && _this$_locale$browser !== void 0 ? _this$_locale$browser : DEFAULT_UNKNOWN_VALUE,
        'App Language': (_this$_locale$current = this._locale.currentLocale) !== null && _this$_locale$current !== void 0 ? _this$_locale$current : DEFAULT_UNKNOWN_VALUE,
        'CPU core': (_navigator$hardwareCo = navigator.hardwareConcurrency) !== null && _navigator$hardwareCo !== void 0 ? _navigator$hardwareCo : DEFAULT_UNKNOWN_VALUE,
        'RAM size': (_ref5 = 'deviceMemory' in navigator ? navigator.deviceMemory : 0) !== null && _ref5 !== void 0 ? _ref5 : DEFAULT_UNKNOWN_VALUE
      };
    }

    /**
     * Gets profile properties for analytics tracking
     */
  }, {
    key: "profileProperties",
    get: function get() {
      var _this$_extensionInfo$2, _this$_extensionInfo2, _this$_extensionInfo$3, _this$_extensionInfo3, _this$_extensionInfo$4, _this$_extensionInfo4, _this$_extensionInfo5, _this$_extensionInfo6;
      return {
        accountId: (_this$_extensionInfo$2 = (_this$_extensionInfo2 = this._extensionInfo) === null || _this$_extensionInfo2 === void 0 ? void 0 : _this$_extensionInfo2.accountId) !== null && _this$_extensionInfo$2 !== void 0 ? _this$_extensionInfo$2 : DEFAULT_UNKNOWN_VALUE,
        extensionType: (_this$_extensionInfo$3 = (_this$_extensionInfo3 = this._extensionInfo) === null || _this$_extensionInfo3 === void 0 ? void 0 : _this$_extensionInfo3.info.type) !== null && _this$_extensionInfo$3 !== void 0 ? _this$_extensionInfo$3 : DEFAULT_UNKNOWN_VALUE,
        adminPermission: (_this$_extensionInfo$4 = (_this$_extensionInfo4 = this._extensionInfo) === null || _this$_extensionInfo4 === void 0 ? void 0 : (_this$_extensionInfo5 = _this$_extensionInfo4.info.permissions) === null || _this$_extensionInfo5 === void 0 ? void 0 : (_this$_extensionInfo6 = _this$_extensionInfo5.admin) === null || _this$_extensionInfo6 === void 0 ? void 0 : _this$_extensionInfo6.enabled) !== null && _this$_extensionInfo$4 !== void 0 ? _this$_extensionInfo$4 : DEFAULT_UNKNOWN_VALUE
      };
    }
  }, {
    key: "trackProps",
    get: function get() {
      var _this$additionalTrack3;
      var trackProps = (_this$additionalTrack3 = this.additionalTrackProps) === null || _this$additionalTrack3 === void 0 ? void 0 : _this$additionalTrack3.trackProps;
      return _objectSpread(_objectSpread(_objectSpread({}, this.eventSuperProperties), this.profileProperties), typeof trackProps === 'function' ? trackProps() : trackProps);
    }
  }, {
    key: "getTrackProps",
    value: function () {
      var _getTrackProps = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var _this$_auth;
        var infoProps, result;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              infoProps = {}; // when the user is logged in, we need to wait the extension info ready before the tracking event send
              if (!((_this$_auth = this._auth) === null || _this$_auth === void 0 ? void 0 : _this$_auth.ownerId)) {
                _context.n = 2;
                break;
              }
              _context.n = 1;
              return (0, _rxjs.firstValueFrom)(this.extensionInfoReady$);
            case 1:
              result = _context.v;
              if (result === 'timeout') {
                this.logger.error('Timeout 10s for the extension info ready');
                infoProps.comment = 'Timeout 10s for the extension info ready';
              }
            case 2:
              return _context.a(2, _objectSpread(_objectSpread({}, this.trackProps), infoProps));
          }
        }, _callee, this);
      }));
      function getTrackProps() {
        return _getTrackProps.apply(this, arguments);
      }
      return getTrackProps;
    }()
  }]);
}(_nextCore.RcModule), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "additionalTrackProps", [_dec5, _dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_auth", [_dec7, _dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_extensionInfo", [_dec9, _dec0], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_extensionFeatures", [_dec1, _dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, "extensionPermission", [_nextCore.computed, _dec11, _dec12], Object.getOwnPropertyDescriptor(_class2.prototype, "extensionPermission"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class);
//# sourceMappingURL=TrackPropsService.js.map
