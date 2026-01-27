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
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Environment = void 0;
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.date.now.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.entries.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/esnext.global-this.js");
require("core-js/modules/web.dom-collections.for-each.js");
var _nextCore = require("@ringcentral-integration/next-core");
var _nextMicro = require("@ringcentral-integration/next-micro");
var _sdk = require("@ringcentral/sdk");
var _Client = require("../Client");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;
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
var DEFAULT_RECORDING_HOST = 'https://apps.ringcentral.com/integrations/recording/v3.0/rc/index.html';
var TWO_HOURS_IN_MILLISECONDS = 2 * 60 * 60 * 1000;
var Environment = exports.Environment = (_dec = (0, _nextCore.injectable)({
  name: 'Environment'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.inject)('SdkConfig')(target, undefined, 2);
}, _dec3 = function _dec3(target, key) {
  return (0, _nextCore.optional)('EnvironmentOptions')(target, undefined, 4);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _Client.Client === "undefined" ? Object : _Client.Client, typeof _nextCore.StoragePlugin === "undefined" ? Object : _nextCore.StoragePlugin, typeof SDKConfig === "undefined" ? Object : SDKConfig, typeof _nextCore.PortManager === "undefined" ? Object : _nextCore.PortManager, typeof EnvironmentOptions === "undefined" ? Object : EnvironmentOptions]), _dec6 = Reflect.metadata("design:type", typeof MfeDeps === "undefined" ? Object : MfeDeps), _dec7 = Reflect.metadata("design:type", Function), _dec8 = Reflect.metadata("design:paramtypes", [typeof MfeDeps === "undefined" ? Object : MfeDeps]), _dec9 = (0, _nextCore.delegate)('server'), _dec0 = Reflect.metadata("design:type", Function), _dec1 = Reflect.metadata("design:paramtypes", [typeof MfeDeps === "undefined" ? Object : MfeDeps]), _dec10 = Reflect.metadata("design:type", Object), _dec11 = Reflect.metadata("design:type", String), _dec12 = Reflect.metadata("design:type", Number), _dec13 = Reflect.metadata("design:type", Function), _dec14 = Reflect.metadata("design:paramtypes", [typeof SetDataOptions === "undefined" ? Object : SetDataOptions]), _dec15 = Reflect.metadata("design:type", Function), _dec16 = Reflect.metadata("design:paramtypes", [Boolean]), _dec17 = Reflect.metadata("design:type", Function), _dec18 = Reflect.metadata("design:paramtypes", []), _dec19 = (0, _nextCore.delegate)('server'), _dec20 = Reflect.metadata("design:type", Function), _dec21 = Reflect.metadata("design:paramtypes", [typeof SetDataOptions === "undefined" ? Object : SetDataOptions]), _dec22 = (0, _nextCore.delegate)('server'), _dec23 = Reflect.metadata("design:type", Function), _dec24 = Reflect.metadata("design:paramtypes", [void 0]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = (_class2 = /*#__PURE__*/function (_RcModule) {
  function Environment(_client, _storage, _sdkConfig, _portManager, _environmentOptions) {
    var _this;
    _classCallCheck(this, Environment);
    _this = _callSuper(this, Environment);
    _this._client = _client;
    _this._storage = _storage;
    _this._sdkConfig = _sdkConfig;
    _this._portManager = _portManager;
    _this._environmentOptions = _environmentOptions;
    _initializerDefineProperty(_this, "mfeDepsInfo", _descriptor, _this);
    _initializerDefineProperty(_this, "server", _descriptor2, _this);
    _initializerDefineProperty(_this, "recordingHostState", _descriptor3, _this);
    _initializerDefineProperty(_this, "enabled", _descriptor4, _this);
    _initializerDefineProperty(_this, "enabledDataTrackingTimestamp", _descriptor5, _this);
    _initializerDefineProperty(_this, "changeCounter", _descriptor6, _this);
    _this._storage.enable(_this, {
      whitelist: ['server', 'recordingHostState', 'enabled', 'mfeDepsInfo']
    });
    _this.recordingHostState = _this._defaultRecordingHost;
    if (globalThis.localStorage && _this.mfeName) {
      (0, _nextMicro.onUpdateEntry)(function (name, newValue) {
        var _newValue$meta;
        if ((_newValue$meta = newValue.meta) === null || _newValue$meta === void 0 ? void 0 : _newValue$meta.local) return;
        _this.updateStorageMfeInfo();
      });
      if (_this._portManager.shared) {
        _this._portManager.onMainTab(function () {
          _this.watchMfeDepsInfo();
        });
      } else {
        _this.watchMfeDepsInfo();
      }
    }
    return _this;
  }
  _inherits(Environment, _RcModule);
  return _createClass(Environment, [{
    key: "mfeDeps",
    get: function get() {
      return (0, _nextMicro.getMfeDeps)();
    }
  }, {
    key: "mfeName",
    get: function get() {
      var meta = (0, _nextMicro.getMeta)();
      return meta === null || meta === void 0 ? void 0 : meta.data.main;
    }
  }, {
    key: "onInit",
    value: function () {
      var _onInit = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              if (!this.enabled) {
                _context.n = 1;
                break;
              }
              _context.n = 1;
              return this.changeEnvironment();
            case 1:
              return _context.a(2);
          }
        }, _callee, this);
      }));
      function onInit() {
        return _onInit.apply(this, arguments);
      }
      return onInit;
    }()
  }, {
    key: "watchMfeDepsInfo",
    value: function watchMfeDepsInfo() {
      var _this2 = this;
      var unsubscribe = (0, _nextCore.subscribe)(this, function () {
        if (_this2.mfeDepsInfo.length < Object.keys(_this2.mfeDeps).length) {
          _this2.setMfeDepsInfo(Object.entries(_this2.mfeDeps).map(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 2),
              name = _ref2[0],
              entry = _ref2[1].entry;
            return {
              name: name,
              entry: entry
            };
          }));
        }
      });
      var stopWatching = (0, _nextCore.watch)(this, function () {
        return _this2.mfeDepsInfo;
      }, function () {
        _this2.updateStorageMfeInfo();
      });
      return function () {
        unsubscribe();
        stopWatching();
      };
    }
  }, {
    key: "updateStorageMfeInfo",
    value: function updateStorageMfeInfo() {
      if (this.enabled) {
        this.mfeDepsInfo.forEach(function (_ref3) {
          var name = _ref3.name,
            entry = _ref3.entry;
          (0, _nextMicro.updateStorageEntry)(name, {
            entry: entry,
            version: '*',
            meta: {
              local: true
            }
          });
        });
      }
    }
  }, {
    key: "_setMfeDepsInfo",
    value: function _setMfeDepsInfo(mfeDeps) {
      this.mfeDepsInfo = mfeDeps;
    }
  }, {
    key: "setMfeDepsInfo",
    value: function () {
      var _setMfeDepsInfo2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(mfeDeps) {
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              this._setMfeDepsInfo(mfeDeps);
            case 1:
              return _context2.a(2);
          }
        }, _callee2, this);
      }));
      function setMfeDepsInfo(_x) {
        return _setMfeDepsInfo2.apply(this, arguments);
      }
      return setMfeDepsInfo;
    }()
  }, {
    key: "_setEnvData",
    value: function _setEnvData(_ref4) {
      var server = _ref4.server,
        recordingHost = _ref4.recordingHost,
        enabled = _ref4.enabled,
        allowDataTracking = _ref4.allowDataTracking,
        mfeDepsInfo = _ref4.mfeDepsInfo;
      this.server = server;
      this.recordingHostState = recordingHost;
      this.enabled = enabled;
      this.mfeDepsInfo = JSON.parse(mfeDepsInfo || '[]');
      this._toggleEnableAnalytics(allowDataTracking);
    }
  }, {
    key: "_toggleEnableAnalytics",
    value: function _toggleEnableAnalytics(allowDataTracking) {
      this.enabledDataTrackingTimestamp = allowDataTracking ? Date.now() : null;
    }
  }, {
    key: "updateChangeCounter",
    value: function updateChangeCounter() {
      this.changeCounter++;
    }
  }, {
    key: "changeEnvironment",
    value: function () {
      var _changeEnvironment = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
        var sdkConfig, discovery, _discovery$removeExte, _discovery$removeInit;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              sdkConfig = this._getSdkConfig();
              if (!sdkConfig.enableDiscovery) {
                _context3.n = 2;
                break;
              }
              // Clear discovery data before switching to new env
              discovery = this._client.service.platform().discovery();
              if (!discovery) {
                _context3.n = 2;
                break;
              }
              _context3.n = 1;
              return (_discovery$removeExte = discovery.removeExternalData) === null || _discovery$removeExte === void 0 ? void 0 : _discovery$removeExte.call(discovery);
            case 1:
              _context3.n = 2;
              return (_discovery$removeInit = discovery.removeInitialData) === null || _discovery$removeInit === void 0 ? void 0 : _discovery$removeInit.call(discovery);
            case 2:
              _context3.n = 3;
              return this._client.setService(sdkConfig);
            case 3:
              return _context3.a(2);
          }
        }, _callee3, this);
      }));
      function changeEnvironment() {
        return _changeEnvironment.apply(this, arguments);
      }
      return changeEnvironment;
    }()
  }, {
    key: "_getSdkConfig",
    value: function _getSdkConfig() {
      var newConfig = _objectSpread({}, this._sdkConfig);
      if (this.enabled) {
        newConfig.server = this.server;
        newConfig.discoveryServer = this.server;
      }
      return newConfig;
    }
  }, {
    key: "setData",
    value: function () {
      var _setData = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(_ref5) {
        var server, recordingHost, enabled, _ref5$allowDataTracki, allowDataTracking, _ref5$environmentChan, environmentChanged, mfeDepsInfo, isEnvChanged;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              server = _ref5.server, recordingHost = _ref5.recordingHost, enabled = _ref5.enabled, _ref5$allowDataTracki = _ref5.allowDataTracking, allowDataTracking = _ref5$allowDataTracki === void 0 ? false : _ref5$allowDataTracki, _ref5$environmentChan = _ref5.environmentChanged, environmentChanged = _ref5$environmentChan === void 0 ? false : _ref5$environmentChan, mfeDepsInfo = _ref5.mfeDepsInfo;
              // `recordingHost` change no need to set to SDK
              isEnvChanged = environmentChanged || this.enabled !== enabled || enabled && this.server !== server;
              this._setEnvData({
                server: server,
                recordingHost: recordingHost,
                enabled: enabled,
                allowDataTracking: allowDataTracking,
                mfeDepsInfo: mfeDepsInfo
              });
              if (!isEnvChanged) {
                _context4.n = 2;
                break;
              }
              _context4.n = 1;
              return this.changeEnvironment();
            case 1:
              // notify change at last
              this.updateChangeCounter();
            case 2:
              return _context4.a(2);
          }
        }, _callee4, this);
      }));
      function setData(_x2) {
        return _setData.apply(this, arguments);
      }
      return setData;
    }()
  }, {
    key: "toggleAnalytics",
    value: function () {
      var _toggleAnalytics = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
        var enable,
          _args5 = arguments;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              enable = _args5.length > 0 && _args5[0] !== undefined ? _args5[0] : false;
              this._toggleEnableAnalytics(enable);
            case 1:
              return _context5.a(2);
          }
        }, _callee5, this);
      }));
      function toggleAnalytics() {
        return _toggleAnalytics.apply(this, arguments);
      }
      return toggleAnalytics;
    }()
  }, {
    key: "allowDataTracking",
    get: function get() {
      if (!this.debugDataTrackingEnable) return true;
      var timestamp = this.enabledDataTrackingTimestamp;
      if (!timestamp) return false;
      var isWithinTwoHours = Date.now() - timestamp < TWO_HOURS_IN_MILLISECONDS;
      return isWithinTwoHours;
    }
  }, {
    key: "recordingHost",
    get: function get() {
      return this.enabled ? this.recordingHostState : this._defaultRecordingHost;
    }

    /**
     * when that be true, the data tracking will not auto be tracked, will base on `allowDataTracking` setting to decide whether to track data
     */
  }, {
    key: "debugDataTrackingEnable",
    get: function get() {
      return Boolean(
      // in production mode, use data tracking setting to avoid data tracking in those test environment
      (process.env.NODE_ENV === 'production' ||
      // also in test mode same as production to able to test that
      process.env.NODE_ENV === 'test') && process.env.BUILD_ENVIRONMENT && ['dev', 'local', 'reg'].includes(process.env.BUILD_ENVIRONMENT) ||
      // in development mode always use data tracking setting, to avoid data tracking in dev mode
      process.env.NODE_ENV === 'development');
    }
  }, {
    key: "_defaultRecordingHost",
    get: function get() {
      var _this$_environmentOpt, _this$_environmentOpt2;
      return (_this$_environmentOpt = (_this$_environmentOpt2 = this._environmentOptions) === null || _this$_environmentOpt2 === void 0 ? void 0 : _this$_environmentOpt2.defaultRecordingHost) !== null && _this$_environmentOpt !== void 0 ? _this$_environmentOpt : DEFAULT_RECORDING_HOST;
    }
  }]);
}(_nextCore.RcModule), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "mfeDepsInfo", [_nextCore.globalStorage, _nextCore.state, _dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_setMfeDepsInfo", [_nextCore.action, _dec7, _dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "_setMfeDepsInfo"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setMfeDepsInfo", [_dec9, _dec0, _dec1], Object.getOwnPropertyDescriptor(_class2.prototype, "setMfeDepsInfo"), _class2.prototype), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "server", [_nextCore.globalStorage, _nextCore.state, _dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return _sdk.SDK.server.sandbox;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "recordingHostState", [_nextCore.globalStorage, _nextCore.state, _dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "enabled", [_nextCore.globalStorage, _nextCore.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "enabledDataTrackingTimestamp", [_nextCore.globalStorage, _nextCore.state, _dec12], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "changeCounter", [_nextCore.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_setEnvData", [_nextCore.action, _dec13, _dec14], Object.getOwnPropertyDescriptor(_class2.prototype, "_setEnvData"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_toggleEnableAnalytics", [_nextCore.action, _dec15, _dec16], Object.getOwnPropertyDescriptor(_class2.prototype, "_toggleEnableAnalytics"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateChangeCounter", [_nextCore.action, _dec17, _dec18], Object.getOwnPropertyDescriptor(_class2.prototype, "updateChangeCounter"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setData", [_dec19, _dec20, _dec21], Object.getOwnPropertyDescriptor(_class2.prototype, "setData"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "toggleAnalytics", [_dec22, _dec23, _dec24], Object.getOwnPropertyDescriptor(_class2.prototype, "toggleAnalytics"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class) || _class);
//# sourceMappingURL=Environment.js.map
