"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.promise.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RcModule = void 0;
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.date.now.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.set.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _loggerV = require("@ringcentral-integration/core/lib/logger/loggerV2");
var _reactantShare = require("reactant-share");
var _rxjs = require("rxjs");
var _constant = require("../constant");
var _Initiator = require("../modules/Initiator");
var _decorators = require("./decorators");
var _rxjs2 = require("./rxjs");
var _dec, _dec2, _dec3, _class, _descriptor;
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
var RcModule = exports.RcModule = (_dec = Reflect.metadata("design:type", typeof _constant.ModuleStatus === "undefined" ? Object : _constant.ModuleStatus), _dec2 = Reflect.metadata("design:type", Function), _dec3 = Reflect.metadata("design:paramtypes", [typeof _constant.ModuleStatus === "undefined" ? Object : _constant.ModuleStatus]), _class = /*#__PURE__*/function () {
  function RcModule() {
    var _this = this;
    _classCallCheck(this, RcModule);
    this.logger = _loggerV.loggerV2.create(this);
    this.status$ = (0, _rxjs2.fromWatchValue)(this, function () {
      return _this.status;
    });
    /**
     * emit when module is ready
     *
     * 1. Only emit once when module is ready, if you want handle different status, you can use `status$`
     *      normally should work with retry(this.resetting$) to re-start the flow when user logout
     *
     * 2. if you want to handle base on ready state, you can use `readyState$`
     */
    this.ready$ = this.status$.pipe((0, _rxjs.filter)(function () {
      return _this.ready;
    }));
    this.readyState$ = this.status$.pipe((0, _rxjs.map)(function () {
      return _this.ready;
    }));
    this.resetting$ = this.status$.pipe((0, _rxjs.filter)(function () {
      return _this.resetting;
    }));
    this[_constant.initializedKey] = false;
    this[_constant.ignoreReadyModulesKey] = new Set();
    /**
     * after onInitSuccess, initSuccess$ will emit true
     *
     * ### Only can use in test environment
     */
    this.initSuccess$ = void 0;
    this[_constant.depsModulesKey] = null;
    this.rehydrated$ = (0, _rxjs2.fromWatchValue)(this, function () {
      return !!_this[_constant.rehydratedKey];
    }).pipe((0, _rxjs.filter)(Boolean),
    // once rehydrated, shareReplay(1) to avoid re execute check again, that only rehydrated once in whole life cycle
    (0, _rxjs.shareReplay)(1));
    _initializerDefineProperty(this, "status", _descriptor, this);
    this[_constant.initModuleKey]();
    if (process.env.NODE_ENV === 'test') {
      this.initSuccess$ = new _rxjs.BehaviorSubject(false);
    }
  }
  return _createClass(RcModule, [{
    key: _constant.initModuleKey,
    value: function value() {
      var _this2 = this;
      var initiator;
      (0, _reactantShare.subscribe)(this, function () {
        if (!initiator) {
          var container = (0, _reactantShare.getRef)(_this2).container;
          if (container.isBound(_Initiator.Initiator)) {
            initiator = container.got(_Initiator.Initiator);
            if (!initiator) {
              throw new Error('Initiator is not created');
            }
            initiator.beforeInitialize(_this2);
          } else {
            throw new Error('Initiator is not bound');
          }
        }
        if (initiator.shouldActivate) {
          _this2[_constant.subscribeModuleKey]();
          if (typeof _this2.onStateChange === 'function') {
            _this2.onStateChange();
          }
        }
      });
    }
  }, {
    key: _constant.subscribeModuleKey,
    value: function () {
      var _value = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var _this$onInit, _this$onInitSuccess, time, _this$initSuccess$, _this$onReset, _this$initSuccess$2;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              if (!this._shouldInit()) {
                _context.n = 4;
                break;
              }
              if (process.env.NODE_ENV !== 'production') {
                time = Date.now();
              }
              this._setStatus(_constant.ModuleStatus.Initializing);
              if (!(typeof this.onInitOnce === 'function' && !this[_constant.initializedKey])) {
                _context.n = 1;
                break;
              }
              this[_constant.initializedKey] = true;
              _context.n = 1;
              return this.onInitOnce();
            case 1:
              _context.n = 2;
              return (_this$onInit = this.onInit) === null || _this$onInit === void 0 ? void 0 : _this$onInit.call(this);
            case 2:
              this._setStatus(_constant.ModuleStatus.Ready);
              if (process.env.NODE_ENV !== 'production') {
                this[_constant.moduleInitTimeKey] = Date.now() - time;
              }
              _context.n = 3;
              return (_this$onInitSuccess = this.onInitSuccess) === null || _this$onInitSuccess === void 0 ? void 0 : _this$onInitSuccess.call(this);
            case 3:
              if (process.env.NODE_ENV === 'test') {
                (_this$initSuccess$ = this.initSuccess$) === null || _this$initSuccess$ === void 0 ? void 0 : _this$initSuccess$.next(true);
              }
              _context.n = 6;
              break;
            case 4:
              if (!this._shouldReset()) {
                _context.n = 6;
                break;
              }
              this._setStatus(_constant.ModuleStatus.Resetting);
              _context.n = 5;
              return (_this$onReset = this.onReset) === null || _this$onReset === void 0 ? void 0 : _this$onReset.call(this);
            case 5:
              this._setStatus(_constant.ModuleStatus.Pending);
              if (process.env.NODE_ENV === 'test') {
                (_this$initSuccess$2 = this.initSuccess$) === null || _this$initSuccess$2 === void 0 ? void 0 : _this$initSuccess$2.next(false);
              }
            case 6:
              return _context.a(2);
          }
        }, _callee, this);
      }));
      function value() {
        return _value.apply(this, arguments);
      }
      return value;
    }()
  }, {
    key: _constant.notReadyModulesKey,
    get:
    // TODO: remove this method, _shouldInit and _shouldReset
    // just workaround for migration phase
    function get() {
      var _this3 = this;
      if (!this[_constant.depsModulesKey]) {
        var depsTokens = Reflect.getMetadata('inversify:paramtypes', this.constructor);
        var taggedTokens = Reflect.getMetadata('inversify:tagged', this.constructor);
        this[_constant.depsModulesKey] = [];
        var container = (0, _reactantShare.getRef)(this).container;
        depsTokens.forEach(function (item, index) {
          var token = (taggedTokens === null || taggedTokens === void 0 ? void 0 : taggedTokens[index]) ?
          /**
           * from `inversify` lib Meta interface
           * get the actual token
           */
          taggedTokens[index][0].value._cb() : item;
          var isBound = container.isBound(token);
          // TODO: should check here when do lazyLoad, find way to get all again.
          var depsModules = isBound ? container.getAll(token) : [];
          Array.prototype.push.apply(_this3[_constant.depsModulesKey], depsModules);
        });
      }
      return this[_constant.depsModulesKey].filter(function (module) {
        return (module === null || module === void 0 ? void 0 : module.status) && !module.ready && !_this3[_constant.ignoreReadyModulesKey].has(module);
      });
    }
  }, {
    key: _constant.rehydratedKey,
    get: function get() {
      var _target$userStorageKe;
      var target = this;
      var rehydrated = (0, _reactantShare.getRehydrated)(target);
      if ((_target$userStorageKe = target[_decorators.userStorageKey]) === null || _target$userStorageKe === void 0 ? void 0 : _target$userStorageKe.size) {
        var _target$userIdReadyKe;
        return rehydrated && ((_target$userIdReadyKe = target[_constant.userIdReadyKey]) === null || _target$userIdReadyKe === void 0 ? void 0 : _target$userIdReadyKe.call(target));
      }
      return rehydrated !== false;
    }
  }, {
    key: "_ignoreModuleReadiness",
    value: function _ignoreModuleReadiness(dep) {
      this[_constant.ignoreReadyModulesKey].add(dep);
    }

    /**
     * @deprecated
     */
  }, {
    key: "_shouldInit",
    value: function _shouldInit() {
      var areAllReady = this[_constant.notReadyModulesKey].length === 0;
      return areAllReady && this.pending;
    }

    /**
     * @deprecated
     */
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      var areNotReady = this[_constant.notReadyModulesKey].length > 0;
      return areNotReady && this.ready;
    }
  }, {
    key: "_setStatus",
    value: function _setStatus(status) {
      this.status = status;
    }
  }, {
    key: "pending",
    get: function get() {
      return this.status === _constant.ModuleStatus.Pending && !!this[_constant.rehydratedKey];
    }
  }, {
    key: "ready",
    get: function get() {
      return this.status === _constant.ModuleStatus.Ready;
    }
  }, {
    key: "resetting",
    get: function get() {
      return this.status === _constant.ModuleStatus.Resetting;
    }
  }, {
    key: "initializing",
    get: function get() {
      return this.status === _constant.ModuleStatus.Initializing;
    }
  }, {
    key: "identifier",
    get: function get() {
      var identifier = (0, _reactantShare.getRef)(this).identifier;
      return identifier;
    }
  }]);
}(), _descriptor = _applyDecoratedDescriptor(_class.prototype, "status", [_reactantShare.state, _dec], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return _constant.ModuleStatus.Pending;
  }
}), _applyDecoratedDescriptor(_class.prototype, "_setStatus", [_reactantShare.action, _dec2, _dec3], Object.getOwnPropertyDescriptor(_class.prototype, "_setStatus"), _class.prototype), _class);
//# sourceMappingURL=RcModule.js.map
