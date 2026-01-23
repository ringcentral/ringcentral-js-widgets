"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.installedUpdate$ = exports.Initiator = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.set.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/esnext.global-this.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _utils = require("@ringcentral-integration/utils");
var _reactantShare = require("reactant-share");
var _rxjs = require("rxjs");
var _constant = require("../constant");
var _delegate = require("../lib/decorators/delegate");
var _getMfeMetaLocal = require("../lib/getMfeMetaLocal");
var _logger = require("../lib/logger");
var _PortManager = require("./PortManager");
var _destroy = require("./destroy");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _dec14, _class, _class2, _descriptor;
/* eslint-disable no-console */
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
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
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
var installedUpdate$ = exports.installedUpdate$ = new _rxjs.Subject();
var Initiator = exports.Initiator = (_dec = (0, _reactantShare.injectable)({
  name: 'Initiator'
}), _dec2 = function _dec2(target, key) {
  return (0, _reactantShare.optional)(_reactantShare.SharedAppOptions)(target, undefined, 1);
}, _dec3 = function _dec3(target, key) {
  return (0, _reactantShare.optional)('Prefix')(target, undefined, 2);
}, _dec4 = function _dec4(target, key) {
  return (0, _reactantShare.optional)('Version')(target, undefined, 3);
}, _dec5 = function _dec5(target, key) {
  return (0, _reactantShare.optional)('BuildEnv')(target, undefined, 4);
}, _dec6 = function _dec6(target, key) {
  return (0, _reactantShare.optional)('InitiatorOptions')(target, undefined, 5);
}, _dec7 = Reflect.metadata("design:type", Function), _dec8 = Reflect.metadata("design:paramtypes", [typeof _PortManager.PortManager === "undefined" ? Object : _PortManager.PortManager, typeof ISharedAppOptions === "undefined" ? Object : ISharedAppOptions, String, String, String, typeof InitiatorOptions === "undefined" ? Object : InitiatorOptions]), _dec9 = Reflect.metadata("design:type", Function), _dec0 = Reflect.metadata("design:paramtypes", []), _dec1 = (0, _delegate.delegate)('server'), _dec10 = Reflect.metadata("design:type", Function), _dec11 = Reflect.metadata("design:paramtypes", []), _dec12 = (0, _delegate.delegate)('clients'), _dec13 = Reflect.metadata("design:type", Function), _dec14 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = _dec7(_class = _dec8(_class = (_class2 = /*#__PURE__*/function () {
  function Initiator(_portManager, _sharedAppOptions, _prefix, _version, _buildEnv, _initiatorOptions) {
    var _this = this;
    _classCallCheck(this, Initiator);
    this._portManager = _portManager;
    this._sharedAppOptions = _sharedAppOptions;
    this._prefix = _prefix;
    this._version = _version;
    this._buildEnv = _buildEnv;
    this._initiatorOptions = _initiatorOptions;
    /**
     * reload promise for reload all tabs
     */
    this.reloadPromise = null;
    /**
     * making this a class variable purely for testing purposes, so that we can emit the reload event
     * in the browser
     * https://test_it_domain/test-cases/RCI-6755
     *
     * app.modules.Initiator.transport.emit('reload', receiveWorkerUrl, version);
     */
    this.transport = void 0;
    this.lastActions = [];
    this.beforeInitCallbacks = new Set();
    this.onInitializeCallbacks = new Set();
    _initializerDefineProperty(this, "initialized", _descriptor, this);
    this.localMfeInfo = (0, _getMfeMetaLocal.getLocalMfeMeta)({
      onlyVersion: true
    });
    if (this._portManager.shared) {
      var _globalThis$localStor;
      this._portManager.onServer(function () {
        _this.initialize();
      });
      this._portManager.onClient(function () {
        if (_this._portManager.isWorkerMode) {
          var _this$_initiatorOptio, _globalThis$location, _globalThis$__rc_shar;
          // Priority: basePath > default getHostPath()
          var hostUrl = ((_this$_initiatorOptio = _this._initiatorOptions) === null || _this$_initiatorOptio === void 0 ? void 0 : _this$_initiatorOptio.basePath) ? "".concat(((_globalThis$location = globalThis.location) === null || _globalThis$location === void 0 ? void 0 : _globalThis$location.origin) || '').concat(_this.basePath) : (0, _utils.getHostPath)();
          var currWorkerUrl = hostUrl + ((_globalThis$__rc_shar = globalThis.__rc_shared_worker__) === null || _globalThis$__rc_shar === void 0 ? void 0 : _globalThis$__rc_shar.url);
          _logger.logger.log('[Initiator] worker mode, check should reload to get latest shared worker', {
            fullPrefix: _this.prefix,
            prefix: _this._prefix,
            portName: _this._sharedAppOptions.portName,
            name: _this._sharedAppOptions.name,
            currWorkerUrl: currWorkerUrl
          });
          var transport = (0, _reactantShare.createBroadcastTransport)(_this.prefix);
          _this.transport = transport;
          // When an old tab has an old shared worker running,
          // the new shared worker will broadcast and cause all tabs of the old shared worker to auto-refresh,
          // in order to share the new shared worker.
          transport.listen('reload', /*#__PURE__*/function () {
            var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(receiveWorkerUrl, version) {
              var _this$_initiatorOptio2;
              var _this$_initiatorOptio3, _this$_initiatorOptio4, data, locale, _globalThis$location2;
              return _regenerator().w(function (_context) {
                while (1) switch (_context.n) {
                  case 0:
                    if (!(((_this$_initiatorOptio2 = _this._initiatorOptions) === null || _this$_initiatorOptio2 === void 0 ? void 0 : _this$_initiatorOptio2.enableNewHostDetection) && !receiveWorkerUrl.includes(hostUrl))) {
                      _context.n = 1;
                      break;
                    }
                    data = {
                      hostUrl: hostUrl,
                      receiveWorkerUrl: receiveWorkerUrl,
                      currWorkerUrl: currWorkerUrl
                    };
                    _logger.logger.log('[Initiator] app not run in same host, ignore reload event', data);
                    locale = (_this$_initiatorOptio3 = _this._initiatorOptions) === null || _this$_initiatorOptio3 === void 0 ? void 0 : (_this$_initiatorOptio4 = _this$_initiatorOptio3.getCurrentLocale) === null || _this$_initiatorOptio4 === void 0 ? void 0 : _this$_initiatorOptio4.call(_this$_initiatorOptio3); // redirect to upgrade page, to prevent use old version app of worker
                    location.href = "".concat(hostUrl, "upgrade.html?locale=").concat(locale);
                    return _context.a(2);
                  case 1:
                    if (!(receiveWorkerUrl !== currWorkerUrl || version && version !== _this._version)) {
                      _context.n = 3;
                      break;
                    }
                    _context.n = 2;
                    return _this.reloadPromise;
                  case 2:
                    _logger.logger.log('[Initiator] app need reload to apply latest shared worker', {
                      receiveUrl: receiveWorkerUrl,
                      currentWorkerUrl: currWorkerUrl,
                      currentVersion: _this._version,
                      receiveVersion: version
                    });
                    (_globalThis$location2 = globalThis.location) === null || _globalThis$location2 === void 0 ? void 0 : _globalThis$location2.reload();
                  case 3:
                    return _context.a(2);
                }
              }, _callee);
            }));
            return function (_x, _x2) {
              return _ref.apply(this, arguments);
            };
          }());
          transport.emit({
            name: 'reload',
            respond: false
          }, currWorkerUrl, _this._version);
          _this.checkMfeInfo();
        }
      });
      if ((_globalThis$localStor = globalThis.localStorage) === null || _globalThis$localStor === void 0 ? void 0 : _globalThis$localStor.getItem(_constant.disableRcSharedWorkerLoggerKey)) {
        (0, _reactantShare.watch)(this, function () {
          return _this._portManager.portDetector.lastAction.action;
        }, function (action) {
          _this.lastActions.unshift(action);
          _this.lastActions.length = 100;
        });
      }
    } else {
      // wait for module is created
      Promise.resolve().then(function () {
        _this.initialize();
      });
    }
  }
  return _createClass(Initiator, [{
    key: "checkMfeInfo",
    value: function () {
      var _checkMfeInfo = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
        var _this$localMfeInfo,
          _this2 = this;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              if (!(Object.keys((_this$localMfeInfo = this.localMfeInfo) !== null && _this$localMfeInfo !== void 0 ? _this$localMfeInfo : {}).length === 0)) {
                _context3.n = 1;
                break;
              }
              return _context3.a(2);
            case 1:
              installedUpdate$.pipe((0, _rxjs.take)(1), (0, _rxjs.tap)(/*#__PURE__*/function () {
                var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(isInstalled) {
                  return _regenerator().w(function (_context2) {
                    while (1) switch (_context2.n) {
                      case 0:
                        if (!isInstalled) {
                          _context2.n = 2;
                          break;
                        }
                        _context2.n = 1;
                        return _this2._portManager.portDetector.syncFullStatePromise;
                      case 1:
                        _this2.getServerLocalMfeInfo().then(function () {
                          var localMfeInfo = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                          Object.keys(localMfeInfo).forEach(function (name) {
                            if (_this2.localMfeInfo[name] !== localMfeInfo[name]) {
                              // ensure all clients reload to get latest version
                              _this2.reloadAllClients();
                            }
                          });
                        });
                      case 2:
                        return _context2.a(2);
                    }
                  }, _callee2);
                }));
                return function (_x3) {
                  return _ref2.apply(this, arguments);
                };
              }()), _destroy.takeUntilAppDestroy).subscribe();
            case 2:
              return _context3.a(2);
          }
        }, _callee3, this);
      }));
      function checkMfeInfo() {
        return _checkMfeInfo.apply(this, arguments);
      }
      return checkMfeInfo;
    }()
  }, {
    key: "prefix",
    get: function get() {
      return "".concat(this._sharedAppOptions.name).concat(this._buildEnv ? "-".concat(this._buildEnv) : '').concat(this._prefix ? "-".concat(this._prefix) : '');
    }
  }, {
    key: "basePath",
    get: function get() {
      var _this$_initiatorOptio5;
      return ((_this$_initiatorOptio5 = this._initiatorOptions) === null || _this$_initiatorOptio5 === void 0 ? void 0 : _this$_initiatorOptio5.basePath) || '/';
    }
  }, {
    key: "beforeInit",
    value:
    /**
     * beforeInit for all RC modules
     */
    function beforeInit(callback) {
      var _this3 = this;
      this.beforeInitCallbacks.add(callback);
      return function () {
        _this3.beforeInitCallbacks["delete"](callback);
      };
    }
  }, {
    key: "beforeInitialize",
    value: function beforeInitialize(targe) {
      var _iterator = _createForOfIteratorHelper(this.beforeInitCallbacks),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var callback = _step.value;
          try {
            callback(targe);
          } catch (e) {
            console.error(e);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "onInitialize",
    value:
    /**
     * callback for initialize
     */
    function onInitialize(callback) {
      var _this4 = this;
      if (this.initialized) {
        if (process.env.NODE_ENV === 'development') {
          console.warn('Initiator is already initialized, ignore onInitialize callback');
        }
        return function () {};
      }
      this.onInitializeCallbacks.add(callback);
      return function () {
        _this4.onInitializeCallbacks["delete"](callback);
      };
    }
  }, {
    key: "initialize",
    value: function () {
      var _initialize = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
        var _iterator2, _step2, callback, _getRef, store, _t, _t2;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.p = _context4.n) {
            case 0:
              _iterator2 = _createForOfIteratorHelper(this.onInitializeCallbacks);
              _context4.p = 1;
              _iterator2.s();
            case 2:
              if ((_step2 = _iterator2.n()).done) {
                _context4.n = 7;
                break;
              }
              callback = _step2.value;
              _context4.p = 3;
              _context4.n = 4;
              return callback();
            case 4:
              _context4.n = 6;
              break;
            case 5:
              _context4.p = 5;
              _t = _context4.v;
              console.error(_t);
            case 6:
              _context4.n = 2;
              break;
            case 7:
              _context4.n = 9;
              break;
            case 8:
              _context4.p = 8;
              _t2 = _context4.v;
              _iterator2.e(_t2);
            case 9:
              _context4.p = 9;
              _iterator2.f();
              return _context4.f(9);
            case 10:
              _context4.n = 11;
              return Promise.resolve();
            case 11:
              _getRef = (0, _reactantShare.getRef)(this), store = _getRef.store; // Make sure the store is initialized before the module is initialized
              if (!this.initialized && store) {
                // Workaround about support asynchronous externals.localStorage API on RC SDK
                // Follow this ticket: https://github.com/ringcentral/ringcentral-js/issues/187
                // Init dispatch for trigger all stores subscriptions
                this.initModules();
              }
            case 12:
              return _context4.a(2);
          }
        }, _callee4, this, [[3, 5], [1, 8, 9, 10]]);
      }));
      function initialize() {
        return _initialize.apply(this, arguments);
      }
      return initialize;
    }()
  }, {
    key: "initModules",
    value: function initModules() {
      this.initialized = true;
    }
  }, {
    key: "shouldActivate",
    get: function get() {
      return (this._portManager.isServer || !this._portManager.shared) && this.initialized;
    }
  }, {
    key: "getServerLocalMfeInfo",
    value: function () {
      var _getServerLocalMfeInfo = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              return _context5.a(2, this.localMfeInfo);
          }
        }, _callee5, this);
      }));
      function getServerLocalMfeInfo() {
        return _getServerLocalMfeInfo.apply(this, arguments);
      }
      return getServerLocalMfeInfo;
    }()
  }, {
    key: "reloadAllClients",
    value: function () {
      var _reloadAllClients = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
        var _globalThis$location3;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              (_globalThis$location3 = globalThis.location) === null || _globalThis$location3 === void 0 ? void 0 : _globalThis$location3.reload();
            case 1:
              return _context6.a(2);
          }
        }, _callee6);
      }));
      function reloadAllClients() {
        return _reloadAllClients.apply(this, arguments);
      }
      return reloadAllClients;
    }()
    /**
     * disable shared worker
     * !!! this method should be called in webpage dev console for debugging
     */
  }, {
    key: "disableSharedWorker",
    value: function disableSharedWorker() {
      var _globalThis$localStor2;
      (_globalThis$localStor2 = globalThis.localStorage) === null || _globalThis$localStor2 === void 0 ? void 0 : _globalThis$localStor2.setItem(_constant.disableRcSharedWorkerKey, 'true');
    }

    /**
     * enable shared worker
     * !!! this method should be called in webpage dev console for debugging
     */
  }, {
    key: "enableSharedWorker",
    value: function enableSharedWorker() {
      var _globalThis$localStor3;
      (_globalThis$localStor3 = globalThis.localStorage) === null || _globalThis$localStor3 === void 0 ? void 0 : _globalThis$localStor3.removeItem(_constant.disableRcSharedWorkerKey);
    }

    /**
     * enable shared worker logger
     * !!! this method should be called in webpage dev console for debugging
     */
  }, {
    key: "enableSharedWorkerLogger",
    value: function enableSharedWorkerLogger() {
      var _globalThis$localStor4;
      (_globalThis$localStor4 = globalThis.localStorage) === null || _globalThis$localStor4 === void 0 ? void 0 : _globalThis$localStor4.setItem(_constant.disableRcSharedWorkerLoggerKey, 'true');
    }

    /**
     * disable shared worker logger
     * !!! this method should be called in webpage dev console for debugging
     */
  }, {
    key: "disableSharedWorkerLogger",
    value: function disableSharedWorkerLogger() {
      var _globalThis$localStor5;
      (_globalThis$localStor5 = globalThis.localStorage) === null || _globalThis$localStor5 === void 0 ? void 0 : _globalThis$localStor5.removeItem(_constant.disableRcSharedWorkerLoggerKey);
    }
  }]);
}(), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "initialized", [_reactantShare.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "initModules", [_reactantShare.action, _dec9, _dec0], Object.getOwnPropertyDescriptor(_class2.prototype, "initModules"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getServerLocalMfeInfo", [_dec1, _dec10, _dec11], Object.getOwnPropertyDescriptor(_class2.prototype, "getServerLocalMfeInfo"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "reloadAllClients", [_dec12, _dec13, _dec14], Object.getOwnPropertyDescriptor(_class2.prototype, "reloadAllClients"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class) || _class) || _class) || _class) || _class);
//# sourceMappingURL=Initiator.js.map
