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
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PortManager = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.map.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.set.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/esnext.global-this.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _reactantShare = require("reactant-share");
var _rxjs = require("rxjs");
var _constant = require("../constant");
var _applyMethod = require("../lib/applyMethod");
var _delegate = require("../lib/decorators/delegate");
var _parallel = require("../lib/decorators/parallel");
var _parallelClients = require("../lib/decorators/parallelClients");
var _handleMainClient = require("../lib/handleMainClient");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _class, _class2, _descriptor, _descriptor2;
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
var PortManager = exports.PortManager = (_dec = (0, _reactantShare.injectable)({
  name: 'PortManager'
}), _dec2 = function _dec2(target, key) {
  return (0, _reactantShare.optional)('Prefix')(target, undefined, 1);
}, _dec3 = function _dec3(target, key) {
  return (0, _reactantShare.optional)('PortManagerOptions')(target, undefined, 2);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _reactantShare.PortDetector === "undefined" ? Object : _reactantShare.PortDetector, String, typeof PortManagerOptions === "undefined" ? Object : PortManagerOptions]), _dec6 = Reflect.metadata("design:type", String), _dec7 = Reflect.metadata("design:type", Function), _dec8 = Reflect.metadata("design:paramtypes", [String]), _dec9 = (0, _delegate.delegate)('server'), _dec0 = Reflect.metadata("design:type", Function), _dec1 = Reflect.metadata("design:paramtypes", [String]), _dec10 = Reflect.metadata("design:type", String), _dec11 = Reflect.metadata("design:type", Function), _dec12 = Reflect.metadata("design:paramtypes", [String]), _dec13 = (0, _delegate.delegate)('server'), _dec14 = Reflect.metadata("design:type", Function), _dec15 = Reflect.metadata("design:paramtypes", [String]), _dec16 = (0, _delegate.delegate)('clients'), _dec17 = Reflect.metadata("design:type", Function), _dec18 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = (_class2 = /*#__PURE__*/function () {
  function PortManager(portDetector, prefix, portManagerOptions) {
    var _this = this;
    _classCallCheck(this, PortManager);
    this.portDetector = portDetector;
    this.prefix = prefix;
    this.portManagerOptions = portManagerOptions;
    /**
     * sync state with main client
     */
    this.portType$ = new _rxjs.BehaviorSubject(null);
    /**
     * emit when main tab change, only work in shared mode of server port
     */
    this.onMainTabChange$ = this.shared ? new _rxjs.Observable(function (subscriber) {
      _this.onMainTabChange(function () {
        subscriber.next(true);
      });
    }) : _rxjs.EMPTY;
    this.onServer = this.portDetector.onServer;
    this.onClient = this.portDetector.onClient;
    this.mainTabSyncStore = !this.shared;
    this.resolveMainTabClient = void 0;
    /**
     * Parallel load main client and server, it ensures that waiting for main client in server
     */
    this.promiseMainTabClient = void 0;
    this.checkMainTabMapping = new Map();
    this.customClientDelegateNameMapping = new Map();
    this.initMainClient$ = new _rxjs.ReplaySubject();
    this.mainClientId = null;
    this.changeClientCallbacks = new Set();
    /**
     * It will be triggered on the server port if the main client is changed to another one.
     */
    this.onMainTabChange = function (callback) {
      if (!_this.portDetector.isServer) {
        throw new Error('Only server can listen on main client change');
      }
      _this.changeClientCallbacks.add(callback);
      return function () {
        _this.changeClientCallbacks["delete"](callback);
      };
    };
    this.mainTabCallbacks = new Set();
    /**
     * It will be triggered if the current client is the main client.
     */
    this.onMainTab = function (callback) {
      _this.mainTabCallbacks.add(callback);
      return function () {
        _this.mainTabCallbacks["delete"](callback);
      };
    };
    /**
     * the active tab id means the user latest interacted tab
     *
     * ! this value possible be null, because the user may not interact with any tab
     * ! if the active tab be close and user not open another tab again, the active tab id will be null
     */
    _initializerDefineProperty(this, "activeTabId", _descriptor, this);
    /**
     * The active non-main tab id means the user latest interacted non-main tab
     */
    _initializerDefineProperty(this, "activeNonMainTabId", _descriptor2, this);
    this._setAsVisibleTab = function () {
      // avoid setting activeTabId repeatedly which may result in forced rendering
      if (!document.hidden && !_this.isActiveTab) {
        _this.setActiveTabId(_this.clientId);
      }
      if (!document.hidden && !_this.isActiveNonMainTab && !_this.isMainTab) {
        _this.setActiveNonMainTabId(_this.clientId);
      }
    };
    var _handleMainClientOnServer = (0, _handleMainClient.handleMainClientOnServer)(this);
    this.portDetector.serverHooks.mainClient = function (options) {
      return _handleMainClientOnServer(options);
    };
    var _handleParallelClientsOnServer = (0, _parallelClients.handleParallelClientsOnServer)(this);
    this.portDetector.serverHooks.clients = function (options) {
      return _handleParallelClientsOnServer(options);
    };
    var _handleAllPortsOnServer = (0, _parallel.handleAllPortsOnServer)(this.portDetector);
    this.portDetector.serverHooks.all = function (options) {
      return _handleAllPortsOnServer(options);
    };
    this.promiseMainTabClient = new Promise(function (resolve) {
      _this.resolveMainTabClient = resolve;
    });
    this.onClient(function (transport) {
      var _this$portManagerOpti;
      transport.listen(_constant.mainTabClientReload, /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              globalThis.location.reload();
            case 1:
              return _context.a(2);
          }
        }, _callee);
      })));
      _this.portType$.next(_constant.PortType.Client);
      // non-main tab will sync full state
      _this.mainTabSyncStore = true;
      if (!_this.isWorkerMode) return;
      var initMainClient = function initMainClient() {
        var _globalThis$__rc_shar, _globalThis$__rc_shar2, _this$prefix;
        var sharedWorkerUrl = (_globalThis$__rc_shar = (_globalThis$__rc_shar2 = globalThis.__rc_shared_worker__) === null || _globalThis$__rc_shar2 === void 0 ? void 0 : _globalThis$__rc_shar2.url) !== null && _globalThis$__rc_shar !== void 0 ? _globalThis$__rc_shar : '';
        var lockName = "".concat(_constant.mainClient, "-").concat((_this$prefix = _this.prefix) !== null && _this$prefix !== void 0 ? _this$prefix : '', "-").concat(_this.portDetector.name, "-").concat(sharedWorkerUrl);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        return (0, _reactantShare.useLock)(lockName, /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
          var _iterator, _step, callback;
          return _regenerator().w(function (_context3) {
            while (1) switch (_context3.n) {
              case 0:
                _this.mainTabSyncStore = false;
                _this.portType$.next(_constant.PortType.MainClient);
                transport.listen(_constant.mainTabClientDelegate, /*#__PURE__*/function () {
                  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(options) {
                    var module, result;
                    return _regenerator().w(function (_context2) {
                      while (1) switch (_context2.n) {
                        case 0:
                          module = (0, _reactantShare.getRef)(_this).modules[options.module];
                          _context2.n = 1;
                          return (0, _applyMethod.applyMethod)(module, options);
                        case 1:
                          result = _context2.v;
                          return _context2.a(2, result);
                      }
                    }, _callee2);
                  }));
                  return function (_x) {
                    return _ref3.apply(this, arguments);
                  };
                }());
                _iterator = _createForOfIteratorHelper(_this.mainTabCallbacks);
                try {
                  for (_iterator.s(); !(_step = _iterator.n()).done;) {
                    callback = _step.value;
                    try {
                      callback(transport);
                    } catch (e) {
                      // eslint-disable-next-line no-console
                      console.error(e);
                    }
                  }
                } catch (err) {
                  _iterator.e(err);
                } finally {
                  _iterator.f();
                }
                transport.emit({
                  name: _constant.mainTabClientChange,
                  respond: false
                }, {
                  clientId: _this.clientId
                });
                return _context3.a(2, new Promise(function () {
                  // never end promise for all this client hold this lock and never release it
                  // until that client be closed or refreshed
                }));
            }
          }, _callee3);
        })));
      };
      if (!((_this$portManagerOpti = _this.portManagerOptions) === null || _this$portManagerOpti === void 0 ? void 0 : _this$portManagerOpti.disableAutoPickMainTab)) {
        return initMainClient();
      } else {
        _this.initMainClient$.pipe((0, _rxjs.filter)(Boolean), (0, _rxjs.take)(1), (0, _rxjs.tap)(function () {
          return initMainClient();
        })).subscribe();
      }
    });
    this.onServer(function (transport) {
      _this.portType$.next(_constant.PortType.Server);
      if (!_this.isWorkerMode) {
        // workaround: in safari, main tab will close and other tabs will reload
        globalThis.window.addEventListener('pagehide', function () {
          transport.emit(_constant.mainTabClientReload);
        });
        var _iterator2 = _createForOfIteratorHelper(_this.mainTabCallbacks),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var callback = _step2.value;
            try {
              callback(transport);
            } catch (e) {
              // eslint-disable-next-line no-console
              console.error(e);
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
        return;
      }
      return transport.listen(_constant.mainTabClientChange, /*#__PURE__*/function () {
        var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(_ref4) {
          var _this$resolveMainTabC;
          var clientId, oldClient, _iterator3, _step3, _callback;
          return _regenerator().w(function (_context4) {
            while (1) switch (_context4.n) {
              case 0:
                clientId = _ref4.clientId;
                oldClient = _this.mainClientId;
                _this.mainClientId = clientId;
                (_this$resolveMainTabC = _this.resolveMainTabClient) === null || _this$resolveMainTabC === void 0 ? void 0 : _this$resolveMainTabC.call(_this);
                if (oldClient) {
                  _iterator3 = _createForOfIteratorHelper(_this.changeClientCallbacks);
                  try {
                    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                      _callback = _step3.value;
                      try {
                        _callback(transport);
                      } catch (e) {
                        // eslint-disable-next-line no-console
                        console.error(e);
                      }
                    }
                  } catch (err) {
                    _iterator3.e(err);
                  } finally {
                    _iterator3.f();
                  }
                }
              case 1:
                return _context4.a(2);
            }
          }, _callee4);
        }));
        return function (_x2) {
          return _ref5.apply(this, arguments);
        };
      }());
    });
    this.onMainTab(function () {
      if (_this.isWorkerMode) {
        _this.setAsMainClient();
      }
    });
    if (globalThis.document && this.shared) {
      this._bindVisibilityListener();
      this._bindUnloadListener();
    }
    this.onClient(function () {
      // only set active tab id when the client is visible
      _this._setAsVisibleTab();
    });
    this.onServer(function () {
      // trigger visibility check event when the server port is created
      _this.checkVisibleTabInAllClient();
    });
  }
  return _createClass(PortManager, [{
    key: "portType",
    get: function get() {
      return this.portType$.value;
    }
  }, {
    key: "isWorkerMode",
    get: function get() {
      return this.portDetector.isWorkerMode;
    }
  }, {
    key: "shared",
    get: function get() {
      return this.portDetector.shared;
    }
  }, {
    key: "setAsMainClient",
    value: function setAsMainClient() {
      this.portDetector.allowDisableSync = function () {
        return false;
      };
      this.portDetector.syncFullState({
        forceSync: false
      });
    }
  }, {
    key: "isServer",
    get: function get() {
      return this.portDetector.isServer;
    }
  }, {
    key: "isClient",
    get: function get() {
      return this.portDetector.isClient;
    }
  }, {
    key: "isMainTab",
    get: function get() {
      return this.isWorkerMode ? this.portType === _constant.PortType.MainClient : this.portType === _constant.PortType.Server;
    }
  }, {
    key: "_setActiveTabId",
    value: function _setActiveTabId(tabId) {
      this.activeTabId = tabId;
    }
  }, {
    key: "setActiveTabId",
    value: function () {
      var _setActiveTabId2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(tabId) {
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              this._setActiveTabId(tabId);
            case 1:
              return _context5.a(2);
          }
        }, _callee5, this);
      }));
      function setActiveTabId(_x3) {
        return _setActiveTabId2.apply(this, arguments);
      }
      return setActiveTabId;
    }()
  }, {
    key: "_setActiveNonMainTabId",
    value: function _setActiveNonMainTabId(tabId) {
      this.activeNonMainTabId = tabId;
    }
  }, {
    key: "setActiveNonMainTabId",
    value: function () {
      var _setActiveNonMainTabId2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(tabId) {
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              this._setActiveNonMainTabId(tabId);
            case 1:
              return _context6.a(2);
          }
        }, _callee6, this);
      }));
      function setActiveNonMainTabId(_x4) {
        return _setActiveNonMainTabId2.apply(this, arguments);
      }
      return setActiveNonMainTabId;
    }()
  }, {
    key: "_bindVisibilityListener",
    value: function _bindVisibilityListener() {
      globalThis.document.addEventListener('visibilitychange', this._setAsVisibleTab);
      globalThis.window.addEventListener('focus', this._setAsVisibleTab);
    }
  }, {
    key: "_bindUnloadListener",
    value: function _bindUnloadListener() {
      var _this2 = this;
      globalThis.window.addEventListener('pagehide', function () {
        if (_this2.isActiveTab) {
          _this2.setActiveTabId(null);
        }
      });
    }
  }, {
    key: "checkVisibleTabInAllClient",
    value: function () {
      var _checkVisibleTabInAllClient = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              this._setAsVisibleTab();
            case 1:
              return _context7.a(2);
          }
        }, _callee7, this);
      }));
      function checkVisibleTabInAllClient() {
        return _checkVisibleTabInAllClient.apply(this, arguments);
      }
      return checkVisibleTabInAllClient;
    }()
  }, {
    key: "isActiveTab",
    get: function get() {
      return this.activeTabId === this.clientId;
    }
  }, {
    key: "isActiveNonMainTab",
    get: function get() {
      return this.activeNonMainTabId === this.clientId;
    }
  }, {
    key: "clientId",
    get: function get() {
      return this.portDetector.clientId;
    }
  }, {
    key: "transports",
    get: function get() {
      return this.portDetector.transports;
    }
  }, {
    key: "transport",
    get: function get() {
      return this.portDetector.transport;
    }
  }]);
}(), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "activeTabId", [_reactantShare.state, _dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_setActiveTabId", [_reactantShare.action, _dec7, _dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "_setActiveTabId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setActiveTabId", [_dec9, _dec0, _dec1], Object.getOwnPropertyDescriptor(_class2.prototype, "setActiveTabId"), _class2.prototype), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "activeNonMainTabId", [_reactantShare.state, _dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_setActiveNonMainTabId", [_reactantShare.action, _dec11, _dec12], Object.getOwnPropertyDescriptor(_class2.prototype, "_setActiveNonMainTabId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setActiveNonMainTabId", [_dec13, _dec14, _dec15], Object.getOwnPropertyDescriptor(_class2.prototype, "setActiveNonMainTabId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "checkVisibleTabInAllClient", [_dec16, _dec17, _dec18], Object.getOwnPropertyDescriptor(_class2.prototype, "checkVisibleTabInAllClient"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class) || _class);
//# sourceMappingURL=PortManager.js.map
