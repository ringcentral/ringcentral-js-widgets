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
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BrowserLogger = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.date.to-iso-string.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/esnext.global-this.js");
var _loggerV = require("@ringcentral-integration/core/lib/logger/loggerV2");
var _nextCore = require("@ringcentral-integration/next-core");
var _rxjs = require("rxjs");
var _UAParsedInfo = require("../UAParsedInfo");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _class, _class2, _descriptor, _descriptor2, _descriptor3;
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
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
(0, _loggerV.checkLoggerEnabled)(_loggerV.DEFAULT_LOGGER_ENABLED);
var BrowserLogger = exports.BrowserLogger = (_dec = (0, _nextCore.injectable)({
  name: 'BrowserLogger'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)('BrowserLoggerOptions')(target, undefined, 3);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _nextCore.StoragePlugin === "undefined" ? Object : _nextCore.StoragePlugin, typeof _UAParsedInfo.UAParsedInfo === "undefined" ? Object : _UAParsedInfo.UAParsedInfo, typeof _nextCore.PortManager === "undefined" ? Object : _nextCore.PortManager, typeof BrowserLoggerOptions === "undefined" ? Object : BrowserLoggerOptions]), _dec5 = (0, _nextCore.dynamic)('TrackPropsService'), _dec6 = Reflect.metadata("design:type", typeof TrackPropsService === "undefined" ? Object : TrackPropsService), _dec7 = Reflect.metadata("design:type", Function), _dec8 = Reflect.metadata("design:paramtypes", []), _dec9 = (0, _nextCore.delegate)('server'), _dec0 = Reflect.metadata("design:type", Function), _dec1 = Reflect.metadata("design:paramtypes", []), _dec10 = Reflect.metadata("design:type", Function), _dec11 = Reflect.metadata("design:paramtypes", []), _dec12 = (0, _nextCore.delegate)('server'), _dec13 = Reflect.metadata("design:type", Function), _dec14 = Reflect.metadata("design:paramtypes", []), _dec15 = (0, _nextCore.delegate)('mainClient'), _dec16 = Reflect.metadata("design:type", Function), _dec17 = Reflect.metadata("design:paramtypes", [Boolean]), _dec18 = Reflect.metadata("design:type", Function), _dec19 = Reflect.metadata("design:paramtypes", [Boolean]), _dec20 = (0, _nextCore.delegate)('server'), _dec21 = Reflect.metadata("design:type", Function), _dec22 = Reflect.metadata("design:paramtypes", [Boolean]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (_class2 = /*#__PURE__*/function (_RcModule) {
  function BrowserLogger(_storage, _uAParsedInfo, _portManager, _browserLoggerOptions) {
    var _this$_browserLoggerO, _this$_browserLoggerO2, _this$_browserLoggerO3;
    var _this;
    _classCallCheck(this, BrowserLogger);
    _this = _callSuper(this, BrowserLogger);
    _this._storage = _storage;
    _this._uAParsedInfo = _uAParsedInfo;
    _this._portManager = _portManager;
    _this._browserLoggerOptions = _browserLoggerOptions;
    _this.transport = void 0;
    _initializerDefineProperty(_this, "_trackPropsService", _descriptor, _this);
    _initializerDefineProperty(_this, "_enabled", _descriptor2, _this);
    _initializerDefineProperty(_this, "downloading", _descriptor3, _this);
    _this.logger = (_this$_browserLoggerO = (_this$_browserLoggerO2 = _this._browserLoggerOptions) === null || _this$_browserLoggerO2 === void 0 ? void 0 : _this$_browserLoggerO2.logger) !== null && _this$_browserLoggerO !== void 0 ? _this$_browserLoggerO : _loggerV.loggerV2;
    _this._storage.enable(_this);
    if (_this._portManager.shared && _this._portManager.isWorkerMode && ((_this$_browserLoggerO3 = _this._browserLoggerOptions) === null || _this$_browserLoggerO3 === void 0 ? void 0 : _this$_browserLoggerO3.worker)) {
      _this._portManager.onMainTab(function () {
        _this.transport = (0, _nextCore.createTransport)('SharedWorkerClient', {
          worker: _this._browserLoggerOptions.worker,
          prefix: 'logger'
        });
        _this.transport.onConnect(function () {
          _this.logger.log('[BrowserLogger] SharedWorkerClient - connected');
        });
        _this.logger.log('storageTransport:', !!_this.storageTransport);
        _this.transport.listen('syncLog', function (data) {
          var _this$storageTranspor;
          (_this$storageTranspor = _this.storageTransport) === null || _this$storageTranspor === void 0 ? void 0 : _this$storageTranspor.write(data);
        });
      });
    }
    (0, _nextCore.watch)(_this, function () {
      return [_this.enabled, _this.ready];
    }, /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            if (_this.ready) {
              _context.n = 1;
              break;
            }
            return _context.a(2);
          case 1:
            if (!_this.enabled) {
              _context.n = 4;
              break;
            }
            _this.logger.enable();
            _this.logger.log('[BrowserLogger] enabled');
            _this.logger.log("[BrowserLogger] isServer:".concat(_this._portManager.isServer));

            // wait info get initialized
            _context.n = 2;
            return _this._uAParsedInfo.getClientOsInfo();
          case 2:
            _t = _this.logger;
            _context.n = 3;
            return _this.initInfo();
          case 3:
            _t.log.call(_t, '[Init Info]', _context.v);
            _context.n = 5;
            break;
          case 4:
            _this.logger.disable();
          case 5:
            return _context.a(2);
        }
      }, _callee);
    })), {
      multiple: true
    });

    // in test env, we need to clear the logs after each test
    if (process.env.NODE_ENV === 'test') {
      _rxjs.NEVER.pipe((0, _rxjs.finalize)(function () {
        _this.storageTransport._data.messages.length = 0;
      }), _nextCore.takeUntilAppDestroy).subscribe();
    }
    return _this;
  }
  _inherits(BrowserLogger, _RcModule);
  return _createClass(BrowserLogger, [{
    key: "initInfo",
    value: function () {
      var _initInfo = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        var _yield$this$_trackPro, _this$_trackPropsServ;
        var window, document, uaResult, initInfo, _t2, _t3, _t4, _t5, _t6, _t7, _t8;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              window = globalThis.window, document = globalThis.document;
              if (document) {
                _context2.n = 1;
                break;
              }
              return _context2.a(2, {});
            case 1:
              uaResult = this._uAParsedInfo.userAgentResult;
              _t2 = _objectSpread;
              _t3 = _objectSpread;
              _t4 = _objectSpread;
              _t5 = {};
              _context2.n = 2;
              return (_this$_trackPropsServ = this._trackPropsService) === null || _this$_trackPropsServ === void 0 ? void 0 : _this$_trackPropsServ.getTrackProps();
            case 2:
              _t7 = _yield$this$_trackPro = _context2.v;
              _t6 = _t7 !== null;
              if (!_t6) {
                _context2.n = 3;
                break;
              }
              _t6 = _yield$this$_trackPro !== void 0;
            case 3:
              if (!_t6) {
                _context2.n = 4;
                break;
              }
              _t8 = _yield$this$_trackPro;
              _context2.n = 5;
              break;
            case 4:
              _t8 = {};
            case 5:
              initInfo = _t2(_t3(_t4(_t5, _t8), {}, {
                timestamp: new Date().toISOString()
              }, uaResult), {}, {
                device: _objectSpread(_objectSpread({}, uaResult === null || uaResult === void 0 ? void 0 : uaResult.device), {}, {
                  screenWidth: window.screen.width,
                  screenHeight: window.screen.height,
                  viewportWidth: document.documentElement.clientWidth,
                  viewportHeight: document.documentElement.clientHeight
                })
              });
              return _context2.a(2, initInfo);
          }
        }, _callee2, this);
      }));
      function initInfo() {
        return _initInfo.apply(this, arguments);
      }
      return initInfo;
    }()
  }, {
    key: "enabled",
    get: function get() {
      return this._enabled;
    }
  }, {
    key: "_enable",
    value: function _enable() {
      this._enabled = true;
    }

    /**
     * enable logger
     */
  }, {
    key: "enable",
    value: (function () {
      var _enable2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              _context3.n = 1;
              return this.toggleLogger(true);
            case 1:
              this._enable();
            case 2:
              return _context3.a(2);
          }
        }, _callee3, this);
      }));
      function enable() {
        return _enable2.apply(this, arguments);
      }
      return enable;
    }())
  }, {
    key: "_disable",
    value: function _disable() {
      this._enabled = false;
    }

    /**
     * disable logger
     */
  }, {
    key: "disable",
    value: (function () {
      var _disable2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              _context4.n = 1;
              return this.toggleLogger(false);
            case 1:
              this._disable();
            case 2:
              return _context4.a(2);
          }
        }, _callee4, this);
      }));
      function disable() {
        return _disable2.apply(this, arguments);
      }
      return disable;
    }())
  }, {
    key: "toggleLogger",
    value: function () {
      var _toggleLogger2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(enabled) {
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              (0, _loggerV.toggleLogger)(enabled);
            case 1:
              return _context5.a(2);
          }
        }, _callee5);
      }));
      function toggleLogger(_x) {
        return _toggleLogger2.apply(this, arguments);
      }
      return toggleLogger;
    }()
  }, {
    key: "_setDownloading",
    value: function _setDownloading(val) {
      this.downloading = val;
    }

    /**
     * set downloading
     */
  }, {
    key: "setDownloading",
    value: (function () {
      var _setDownloading2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(val) {
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              this._setDownloading(val);
            case 1:
              return _context6.a(2);
          }
        }, _callee6, this);
      }));
      function setDownloading(_x2) {
        return _setDownloading2.apply(this, arguments);
      }
      return setDownloading;
    }())
  }, {
    key: "saveLog",
    value: (
    /**
     * save log to local
     */
    function () {
      var _saveLog = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
        var name;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.p = _context7.n) {
            case 0:
              if (!this.downloading) {
                _context7.n = 1;
                break;
              }
              return _context7.a(2);
            case 1:
              _context7.n = 2;
              return this.setDownloading(true);
            case 2:
              _context7.p = 2;
              if (!this.storageTransport) {
                _context7.n = 4;
                break;
              }
              name = this._portManager.portDetector.sharedAppOptions.name;
              _context7.n = 3;
              return this.storageTransport.downloadLogs({
                name: name
              });
            case 3:
              _context7.n = 5;
              break;
            case 4:
              throw new Error('StorageTransport not found');
            case 5:
              _context7.p = 5;
              _context7.n = 6;
              return this.setDownloading(false);
            case 6:
              return _context7.f(5);
            case 7:
              return _context7.a(2);
          }
        }, _callee7, this, [[2,, 5, 7]]);
      }));
      function saveLog() {
        return _saveLog.apply(this, arguments);
      }
      return saveLog;
    }())
  }, {
    key: "storageTransport",
    get: function get() {
      var _this$logger$transpor;
      return (_this$logger$transpor = this.logger.transports) === null || _this$logger$transpor === void 0 ? void 0 : _this$logger$transpor.find(function (transport) {
        return transport.type === 'storage';
      });
    }
  }, {
    key: "_log",
    value: function _log(type) {
      if (this.enabled) {
        try {
          var _this$logger;
          for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }
          (_this$logger = this.logger)[type].apply(_this$logger, args);
        } catch (e) {
          // TODO: error handling when logger is not working
        }
      }
    }
  }, {
    key: "log",
    value: function log() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      this._log.apply(this, ['info'].concat(args));
    }
  }]);
}(_nextCore.RcModule), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_trackPropsService", [_dec5, _dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_enabled", [_nextCore.globalStorage, _nextCore.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this$_browserLoggerO4, _this$_browserLoggerO5;
    return (_this$_browserLoggerO4 = (_this$_browserLoggerO5 = this._browserLoggerOptions) === null || _this$_browserLoggerO5 === void 0 ? void 0 : _this$_browserLoggerO5.enabled) !== null && _this$_browserLoggerO4 !== void 0 ? _this$_browserLoggerO4 : _loggerV.DEFAULT_LOGGER_ENABLED;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_enable", [_nextCore.action, _dec7, _dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "_enable"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "enable", [_dec9, _dec0, _dec1], Object.getOwnPropertyDescriptor(_class2.prototype, "enable"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_disable", [_nextCore.action, _dec10, _dec11], Object.getOwnPropertyDescriptor(_class2.prototype, "_disable"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "disable", [_dec12, _dec13, _dec14], Object.getOwnPropertyDescriptor(_class2.prototype, "disable"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "toggleLogger", [_dec15, _dec16, _dec17], Object.getOwnPropertyDescriptor(_class2.prototype, "toggleLogger"), _class2.prototype), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "downloading", [_nextCore.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_setDownloading", [_nextCore.action, _dec18, _dec19], Object.getOwnPropertyDescriptor(_class2.prototype, "_setDownloading"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setDownloading", [_dec20, _dec21, _dec22], Object.getOwnPropertyDescriptor(_class2.prototype, "setDownloading"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class);
//# sourceMappingURL=BrowserLogger.js.map
