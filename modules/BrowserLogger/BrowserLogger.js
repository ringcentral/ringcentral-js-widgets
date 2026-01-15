"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.iterator.js");
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
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BrowserLogger = void 0;
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
var _core = require("@ringcentral-integration/core");
var _loggerV = require("@ringcentral-integration/core/lib/logger/loggerV2");
var _mfeLogger = require("@ringcentral/mfe-logger");
var _di = require("../../lib/di");
var _proxify = require("../../lib/proxy/proxify");
var _dec, _class, _class2, _descriptor, _descriptor2;
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
var BrowserLogger = exports.BrowserLogger = (_dec = (0, _di.Module)({
  name: 'BrowserLogger',
  deps: ['GlobalStorage', {
    dep: 'Prefix',
    optional: true
  }, {
    dep: 'BrowserLoggerOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  function BrowserLogger(deps) {
    var _this;
    _classCallCheck(this, BrowserLogger);
    _this = _callSuper(this, BrowserLogger, [{
      deps: deps,
      storageKey: 'BrowserLogger',
      enableGlobalCache: true
    }]);
    _initializerDefineProperty(_this, "enabled", _descriptor, _this);
    _initializerDefineProperty(_this, "downloading", _descriptor2, _this);
    (0, _core.watch)(_this, function () {
      return [_this.enabled, _this.ready];
    }, function () {
      if (!_this.ready) return;
      try {
        if (_this.enabled) {
          _this.logger.enable();
          _this.logger.log('BrowserLogger enabled');
        } else {
          _this.logger.disable();
        }
      } catch (e) {
        console.error(e);
      }
    }, {
      multiple: true
    });
    return _this;
  }
  _inherits(BrowserLogger, _RcModuleV);
  return _createClass(BrowserLogger, [{
    key: "_enable",
    value: function _enable() {
      this.enabled = true;
    }

    /**
     * enable logger
     */
  }, {
    key: "enable",
    value: (function () {
      var _enable2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              _context.n = 1;
              return this.toggleLogger(true);
            case 1:
              this._enable();
            case 2:
              return _context.a(2);
          }
        }, _callee, this);
      }));
      function enable() {
        return _enable2.apply(this, arguments);
      }
      return enable;
    }())
  }, {
    key: "_disable",
    value: function _disable() {
      this.enabled = false;
    }

    /**
     * disable logger
     */
  }, {
    key: "disable",
    value: (function () {
      var _disable2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              _context2.n = 1;
              return this.toggleLogger(false);
            case 1:
              this._disable();
            case 2:
              return _context2.a(2);
          }
        }, _callee2, this);
      }));
      function disable() {
        return _disable2.apply(this, arguments);
      }
      return disable;
    }())
  }, {
    key: "toggleLogger",
    value: function () {
      var _toggleLogger2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(enabled) {
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              (0, _loggerV.toggleLogger)(enabled);
            case 1:
              return _context3.a(2);
          }
        }, _callee3);
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
      var _setDownloading2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(val) {
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              this._setDownloading(val);
            case 1:
              return _context4.a(2);
          }
        }, _callee4, this);
      }));
      function setDownloading(_x2) {
        return _setDownloading2.apply(this, arguments);
      }
      return setDownloading;
    }())
  }, {
    key: "logger",
    get: function get() {
      var _this$_deps$browserLo, _this$_deps$browserLo2;
      return (_this$_deps$browserLo = (_this$_deps$browserLo2 = this._deps.browserLoggerOptions) === null || _this$_deps$browserLo2 === void 0 ? void 0 : _this$_deps$browserLo2.logger) !== null && _this$_deps$browserLo !== void 0 ? _this$_deps$browserLo : _loggerV.loggerV2;
    }
  }, {
    key: "saveLog",
    value: function () {
      var _saveLog = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
        var name;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.p = _context5.n) {
            case 0:
              _context5.n = 1;
              return this.setDownloading(true);
            case 1:
              _context5.p = 1;
              if (!this.storageTransport) {
                _context5.n = 3;
                break;
              }
              name = this._deps.prefix;
              _context5.n = 2;
              return this.storageTransport.downloadLogs({
                name: name
              });
            case 2:
              _context5.n = 4;
              break;
            case 3:
              throw new Error('StorageTransport not found');
            case 4:
              _context5.p = 4;
              _context5.n = 5;
              return this.setDownloading(false);
            case 5:
              return _context5.f(4);
            case 6:
              return _context5.a(2);
          }
        }, _callee5, this, [[1,, 4, 6]]);
      }));
      function saveLog() {
        return _saveLog.apply(this, arguments);
      }
      return saveLog;
    }()
  }, {
    key: "storageTransport",
    get: function get() {
      return this.logger.transports.find(function (transport) {
        return transport instanceof _mfeLogger.StorageTransport;
      });
    }
  }]);
}(_core.RcModuleV2), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "enabled", [_core.globalStorage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this$_deps$browserLo3, _this$_deps$browserLo4;
    return (_this$_deps$browserLo3 = (_this$_deps$browserLo4 = this._deps.browserLoggerOptions) === null || _this$_deps$browserLo4 === void 0 ? void 0 : _this$_deps$browserLo4.enabled) !== null && _this$_deps$browserLo3 !== void 0 ? _this$_deps$browserLo3 : false;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_enable", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_enable"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "enable", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "enable"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_disable", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_disable"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "disable", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "disable"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "toggleLogger", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "toggleLogger"), _class2.prototype), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "downloading", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_setDownloading", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setDownloading"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setDownloading", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "setDownloading"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "saveLog", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "saveLog"), _class2.prototype), _class2)) || _class);
//# sourceMappingURL=BrowserLogger.js.map
