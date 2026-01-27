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
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStorage = exports.Client = void 0;
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
var _multipartHttpRequest = require("@ringcentral-integration/commons/lib/multipartHttpRequest");
var _nextCore = require("@ringcentral-integration/next-core");
var _localforage = _interopRequireDefault(require("localforage"));
var _ringcentralClient = require("ringcentral-client");
var _PathSegment2 = _interopRequireDefault(require("ringcentral-client/build/PathSegment"));
var _Account = _interopRequireDefault(require("ringcentral-client/build/paths/Account"));
var _ClientInfo = _interopRequireDefault(require("ringcentral-client/build/paths/ClientInfo"));
var _Dictionary = _interopRequireDefault(require("ringcentral-client/build/paths/Dictionary"));
var _Glip = _interopRequireDefault(require("ringcentral-client/build/paths/Glip"));
var _NumberParser = _interopRequireDefault(require("ringcentral-client/build/paths/NumberParser"));
var _Subscription = _interopRequireDefault(require("ringcentral-client/build/paths/Subscription"));
var _createSDK = require("./createSDK");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _dec14, _class, _class2;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regeneratorKeys(e) { var n = Object(e), r = []; for (var t in n) r.unshift(t); return function e() { for (; r.length;) if ((t = r.pop()) in n) return e.value = t, e.done = !1, e; return e.done = !0, e; }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
// TODO: make 'ringcentral-client' support JS SDK v4 or replace it
var RestPrefix = /*#__PURE__*/function (_PathSegment) {
  function RestPrefix(service) {
    _classCallCheck(this, RestPrefix);
    return _callSuper(this, RestPrefix, ['restapi/v1.0', undefined, undefined, service]);
  }
  _inherits(RestPrefix, _PathSegment);
  return _createClass(RestPrefix);
}(_PathSegment2["default"]);
var createStorage = exports.createStorage = function createStorage(prefix) {
  // TODO: fix type
  // Support Async Storage interface in ExternalsOptions
  // Issue: https://github.com/ringcentral/ringcentral-js/issues/275
  return prefix ? _localforage["default"].createInstance({
    name: prefix
  }) : _localforage["default"];
};

/**
 * RingCentral Client wrapper class for SDK interactions.
 * Manages SDK service and platform operations.
 *
 * @class
 */
var Client = exports.Client = (_dec = (0, _nextCore.injectable)({
  name: 'Client'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.inject)('SdkConfig')(target, undefined, 2);
}, _dec3 = function _dec3(target, key) {
  return (0, _nextCore.optional)('ClientOptions')(target, undefined, 3);
}, _dec4 = function _dec4(target, key) {
  return (0, _nextCore.optional)('BrandConfig')(target, undefined, 4);
}, _dec5 = function _dec5(target, key) {
  return (0, _nextCore.optional)('Prefix')(target, undefined, 5);
}, _dec6 = Reflect.metadata("design:type", Function), _dec7 = Reflect.metadata("design:paramtypes", [typeof _nextCore.PortManager === "undefined" ? Object : _nextCore.PortManager, typeof _nextCore.Initiator === "undefined" ? Object : _nextCore.Initiator, typeof SdkConfig === "undefined" ? Object : SdkConfig, typeof ClientOptions === "undefined" ? Object : ClientOptions, typeof BrandConfig === "undefined" ? Object : BrandConfig, String]), _dec8 = (0, _nextCore.delegate)('server'), _dec9 = Reflect.metadata("design:type", Function), _dec0 = Reflect.metadata("design:paramtypes", [typeof SDKOptions === "undefined" ? Object : SDKOptions]), _dec1 = (0, _nextCore.delegate)('server'), _dec10 = Reflect.metadata("design:type", Function), _dec11 = Reflect.metadata("design:paramtypes", [String]), _dec12 = (0, _nextCore.delegate)('server'), _dec13 = Reflect.metadata("design:type", Function), _dec14 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = _dec7(_class = (_class2 = /*#__PURE__*/function (_RingCentralClient) {
  function Client(_portManager, _initiator, _sdkConfig, _clientOptions, _brandConfig, prefix) {
    var _clientOptions$sdk, _sdkConfig$localStora, _this$_clientOptions, _this$_clientOptions$;
    var _this;
    _classCallCheck(this, Client);
    _this = _callSuper(this, Client, [(_clientOptions$sdk = _clientOptions === null || _clientOptions === void 0 ? void 0 : _clientOptions.sdk) !== null && _clientOptions$sdk !== void 0 ? _clientOptions$sdk : (0, _createSDK.createSDK)(_objectSpread(_objectSpread({}, _sdkConfig), {}, {
      localStorage: (_sdkConfig$localStora = _sdkConfig.localStorage) !== null && _sdkConfig$localStora !== void 0 ? _sdkConfig$localStora : createStorage(prefix)
    }), _brandConfig)]);
    _this._portManager = _portManager;
    _this._initiator = _initiator;
    _this._sdkConfig = _sdkConfig;
    _this._clientOptions = _clientOptions;
    _this._brandConfig = _brandConfig;
    _this.prefix = prefix;
    _this._throwError = void 0;
    /**
     * Handles multipart HTTP requests to the RingCentral platform.
     * Simplifies file uploads and multipart data submissions.
     */
    _this.multipart = (0, _multipartHttpRequest.multipartHttpRequest)(_this.service.platform());
    _this._discoveryPromise = null;
    if (process.env.NODE_ENV !== 'production' && _this._portManager.shared && _this._portManager.isWorkerMode && _this._portManager.isClient) {
      var throwError = function throwError() {
        throw new Error("RingCentralClient is not available on the tab in 'SharedWorker' mode");
      };
      _this._throwError = throwError;
      _this.service = new Proxy({}, {
        get: function get() {
          throwError();
        }
      });
    }

    //#region migration storage
    var migrationStorageKey = 'app:MemoryStorage';
    _this._initiator.onInitialize(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var platformKey, storage, data, key, _t, _t2;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            platformKey = _this.service.cache()._prefixKey('platform');
            storage = _this.service.externals().localStorage;
            _context.n = 1;
            return storage.getItem(migrationStorageKey);
          case 1:
            data = _context.v;
            if (!(data && Object.keys(data).length > 0)) {
              _context.n = 5;
              break;
            }
            _t = _regeneratorKeys(data);
          case 2:
            if ((_t2 = _t()).done) {
              _context.n = 4;
              break;
            }
            key = _t2.value;
            if (!(key === platformKey)) {
              _context.n = 3;
              break;
            }
            _context.n = 3;
            return storage.setItem(key, data[key]);
          case 3:
            _context.n = 2;
            break;
          case 4:
            _context.n = 5;
            return storage.removeItem(migrationStorageKey);
          case 5:
            return _context.a(2);
        }
      }, _callee);
    })));
    //#endregion

    (_this$_clientOptions = _this._clientOptions) === null || _this$_clientOptions === void 0 ? void 0 : (_this$_clientOptions$ = _this$_clientOptions.init) === null || _this$_clientOptions$ === void 0 ? void 0 : _this$_clientOptions$.call(_this$_clientOptions, _this.service);
    return _this;
  }
  _inherits(Client, _RingCentralClient);
  return _createClass(Client, [{
    key: "restPrefix",
    value: function restPrefix() {
      if (process.env.NODE_ENV !== 'production') {
        var _this$_throwError;
        (_this$_throwError = this._throwError) === null || _this$_throwError === void 0 ? void 0 : _this$_throwError.call(this);
      }
      return new RestPrefix(this.service.platform());
    }

    /**
     * Gets an account API path segment for making account-related API requests.
     *
     * @param {string} [id] - Optional account ID
     * @returns {Account} Account API path segment
     */
  }, {
    key: "account",
    value: function account(id) {
      if (process.env.NODE_ENV !== 'production') {
        var _this$_throwError2;
        (_this$_throwError2 = this._throwError) === null || _this$_throwError2 === void 0 ? void 0 : _this$_throwError2.call(this);
      }
      return new _Account["default"](this.restPrefix(), id, this.service.platform());
    }

    /**
     * Gets a client info API path segment for accessing client information.
     *
     * @param {string} [id] - Optional client ID
     * @returns {ClientInfo} Client info API path segment
     */
  }, {
    key: "clientInfo",
    value: function clientInfo(id) {
      if (process.env.NODE_ENV !== 'production') {
        var _this$_throwError3;
        (_this$_throwError3 = this._throwError) === null || _this$_throwError3 === void 0 ? void 0 : _this$_throwError3.call(this);
      }
      return new _ClientInfo["default"](this.restPrefix(), id, this.service.platform());
    }

    /**
     * Gets a dictionary API path segment for accessing localization dictionaries.
     *
     * @param {string} [id] - Optional dictionary ID
     * @returns {Dictionary} Dictionary API path segment
     */
  }, {
    key: "dictionary",
    value: function dictionary(id) {
      if (process.env.NODE_ENV !== 'production') {
        var _this$_throwError4;
        (_this$_throwError4 = this._throwError) === null || _this$_throwError4 === void 0 ? void 0 : _this$_throwError4.call(this);
      }
      return new _Dictionary["default"](this.restPrefix(), id, this.service.platform());
    }

    /**
     * Gets a number parser API path segment for parsing and formatting phone numbers.
     *
     * @param {string} [id] - Optional number parser ID
     * @returns {NumberParser} Number parser API path segment
     */
  }, {
    key: "numberParser",
    value: function numberParser(id) {
      if (process.env.NODE_ENV !== 'production') {
        var _this$_throwError5;
        (_this$_throwError5 = this._throwError) === null || _this$_throwError5 === void 0 ? void 0 : _this$_throwError5.call(this);
      }
      return new _NumberParser["default"](this.restPrefix(), id, this.service.platform());
    }
  }, {
    key: "subscription",
    value: function subscription(id) {
      if (process.env.NODE_ENV !== 'production') {
        var _this$_throwError6;
        (_this$_throwError6 = this._throwError) === null || _this$_throwError6 === void 0 ? void 0 : _this$_throwError6.call(this);
      }
      return new _Subscription["default"](this.restPrefix(), id, this.service.platform());
    }
  }, {
    key: "glip",
    value: function glip(id) {
      if (process.env.NODE_ENV !== 'production') {
        var _this$_throwError7;
        (_this$_throwError7 = this._throwError) === null || _this$_throwError7 === void 0 ? void 0 : _this$_throwError7.call(this);
      }
      return new _Glip["default"](this.restPrefix(), id, this.service.platform());
    }

    /**
     * Changes the SDK configuration with new settings.
     *
     * @param {SDKOptions} sdkConfig - New SDK configuration options
     */
  }, {
    key: "setService",
    value: (function () {
      var _setService = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(sdkConfig) {
        var _sdkConfig$localStora2;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              this.service = (0, _createSDK.createSDK)(_objectSpread(_objectSpread({}, sdkConfig), {}, {
                localStorage: (_sdkConfig$localStora2 = sdkConfig.localStorage) !== null && _sdkConfig$localStora2 !== void 0 ? _sdkConfig$localStora2 : createStorage(this.prefix)
              }), this._brandConfig);
            case 1:
              return _context2.a(2);
          }
        }, _callee2, this);
      }));
      function setService(_x) {
        return _setService.apply(this, arguments);
      }
      return setService;
    }()
    /**
     * Sets the platform redirect URI if not already set.
     * Used for OAuth authentication flows.
     *
     * @param {string} redirectUri - URI to redirect after authentication
     */
    )
  }, {
    key: "confirmRedirectUri",
    value: (function () {
      var _confirmRedirectUri = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(redirectUri) {
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              if (!this.service.platform()._redirectUri) {
                this.service.platform()._redirectUri = redirectUri;
              }
            case 1:
              return _context3.a(2);
          }
        }, _callee3, this);
      }));
      function confirmRedirectUri(_x2) {
        return _confirmRedirectUri.apply(this, arguments);
      }
      return confirmRedirectUri;
    }()
    /**
     * Ensures login URL uses discovery API when applicable.
     * Initializes discovery API for environment detection.
     */
    )
  }, {
    key: "checkLoginUrlWithDiscovery",
    value: (function () {
      var _checkLoginUrlWithDiscovery = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              if (!this.service.platform().discovery()) {
                _context4.n = 1;
                break;
              }
              _context4.n = 1;
              return this.service.platform().loginUrlWithDiscovery();
            case 1:
              return _context4.a(2);
          }
        }, _callee4, this);
      }));
      function checkLoginUrlWithDiscovery() {
        return _checkLoginUrlWithDiscovery.apply(this, arguments);
      }
      return checkLoginUrlWithDiscovery;
    }())
  }]);
}(_ringcentralClient.Client), _applyDecoratedDescriptor(_class2.prototype, "setService", [_dec8, _dec9, _dec0], Object.getOwnPropertyDescriptor(_class2.prototype, "setService"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "confirmRedirectUri", [_dec1, _dec10, _dec11], Object.getOwnPropertyDescriptor(_class2.prototype, "confirmRedirectUri"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "checkLoginUrlWithDiscovery", [_dec12, _dec13, _dec14], Object.getOwnPropertyDescriptor(_class2.prototype, "checkLoginUrlWithDiscovery"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class) || _class) || _class) || _class);
//# sourceMappingURL=Client.js.map
