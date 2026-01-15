"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggleLogger = exports.loggerV2 = exports.loggerEnabled = exports.consoleIgnoreRule = exports.checkLoggerEnabled = exports.SharedWorkerTransport = exports.MemoryStorage = exports.DEFAULT_LOGGER_ENABLED = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/esnext.global-this.js");
var _mfeLogger = require("@ringcentral/mfe-logger");
var _reactantShare = require("reactant-share");
var _globalThis$localStor, _globalThis$localStor2;
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var isSharedWorker = !!globalThis.SharedWorkerGlobalScope;
var SharedWorkerTransport = exports.SharedWorkerTransport = /*#__PURE__*/function () {
  function SharedWorkerTransport() {
    var _options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, SharedWorkerTransport);
    this._options = _options;
    this.type = 'storage';
    this.transport = void 0;
    if (isSharedWorker && this._options.enabled) {
      this.transport = (0, _reactantShare.createTransport)('SharedWorkerInternal', {
        prefix: 'logger'
      });
    }
  }
  return _createClass(SharedWorkerTransport, [{
    key: "init",
    value: function () {
      var _init = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              return _context.a(2);
          }
        }, _callee);
      }));
      function init() {
        return _init.apply(this, arguments);
      }
      return init;
    }()
  }, {
    key: "write",
    value: function () {
      var _write = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(_ref) {
        var _this$transport;
        var payload;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              payload = _ref.payload;
              (_this$transport = this.transport) === null || _this$transport === void 0 ? void 0 : _this$transport.emit({
                name: 'syncLog',
                respond: false
              }, {
                payload: payload
              });
            case 1:
              return _context2.a(2);
          }
        }, _callee2, this);
      }));
      function write(_x) {
        return _write.apply(this, arguments);
      }
      return write;
    }()
  }]);
}();
var MemoryStorage = exports.MemoryStorage = /*#__PURE__*/function () {
  function MemoryStorage() {
    var _data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, MemoryStorage);
    this._data = _data;
  }
  return _createClass(MemoryStorage, [{
    key: "getItem",
    value: function getItem(key) {
      return this._data[key];
    }
  }, {
    key: "setItem",
    value: function setItem(key, value) {
      this._data[key] = value;
    }
  }, {
    key: "removeItem",
    value: function removeItem(key) {
      delete this._data[key];
    }
  }]);
}();
var toggleKey = 'RC_MFE_LOGGER';
var DEFAULT_LOGGER_ENABLED = exports.DEFAULT_LOGGER_ENABLED = true;

// if the toggleKey is not set, the logger is enabled by default
var loggerEnabled = exports.loggerEnabled = ((_globalThis$localStor = globalThis.localStorage) === null || _globalThis$localStor === void 0 ? void 0 : _globalThis$localStor.getItem(toggleKey)) === 'true' || DEFAULT_LOGGER_ENABLED && globalThis.SharedWorkerGlobalScope === undefined && ((_globalThis$localStor2 = globalThis.localStorage) === null || _globalThis$localStor2 === void 0 ? void 0 : _globalThis$localStor2.getItem(toggleKey)) === null;
var toggleLogger = exports.toggleLogger = function toggleLogger(enabled) {
  var _globalThis$localStor3;
  (_globalThis$localStor3 = globalThis.localStorage) === null || _globalThis$localStor3 === void 0 ? void 0 : _globalThis$localStor3.setItem(toggleKey, String(enabled));
};
var checkLoggerEnabled = exports.checkLoggerEnabled = function checkLoggerEnabled(defaultEnabled) {
  var _globalThis$localStor4;
  if (((_globalThis$localStor4 = globalThis.localStorage) === null || _globalThis$localStor4 === void 0 ? void 0 : _globalThis$localStor4.getItem(toggleKey)) === null) {
    globalThis.localStorage.setItem(toggleKey, String(defaultEnabled));
  }
};

// add ignore rule here
var consoleIgnoreRule = exports.consoleIgnoreRule = ['ResizeObserver loop completed with undelivered notifications'
// !!! Don't add rules lightly unless you explicitly want to ignore the log
];
var consoleTransport = new _mfeLogger.ConsoleTransport({
  enabled: true,
  storage: new MemoryStorage({
    ROARR_LOG: true
  }),
  //@ts-ignore
  ignoreRule: consoleIgnoreRule
});
var sessionId = Math.random().toString(36).substring(2, 10);
var name = "root-".concat(sessionId);
if (isSharedWorker) {
  var _globalThis$indexedDB, _globalThis$indexedDB2, _globalThis$indexedDB3, _globalThis$indexedDB4;
  // @ts-ignore
  var globalName = globalThis.name;
  var prefix = typeof globalName === 'string' ? globalName.split('#')[0] : 'worker';
  name = "".concat(prefix || 'worker', "-").concat(sessionId);

  // remove indexedDB old database
  // This is a short-term temporary deletion only to keep the deletion logic clean, and this code is expected to be deleted in Q3 2025.
  // There is no impact on the deleted db.
  (_globalThis$indexedDB = globalThis.indexedDB) === null || _globalThis$indexedDB === void 0 ? void 0 : (_globalThis$indexedDB2 = _globalThis$indexedDB.deleteDatabase) === null || _globalThis$indexedDB2 === void 0 ? void 0 : _globalThis$indexedDB2.call(_globalThis$indexedDB, 'rc-mfe-logs');
  (_globalThis$indexedDB3 = globalThis.indexedDB) === null || _globalThis$indexedDB3 === void 0 ? void 0 : (_globalThis$indexedDB4 = _globalThis$indexedDB3.deleteDatabase) === null || _globalThis$indexedDB4 === void 0 ? void 0 : _globalThis$indexedDB4.call(_globalThis$indexedDB3, 'rc-mfe-log');
}

/**
 * for test only storage to store logs in memory
 */
var TestStorageTransport = /*#__PURE__*/function () {
  function TestStorageTransport() {
    _classCallCheck(this, TestStorageTransport);
    this.type = 'storage';
    this._data = {
      messages: []
    };
    this.logLevelMap = {
      20: 'debug',
      30: 'info',
      40: 'warn',
      50: 'error'
    };
    this.init = function (options) {};
    this.saveDB = function () {};
    this.getLogs = function () {
      return {
        content: 'mock-content',
        name: 'applicationLogs'
      };
    };
    this.downloadLogs = function () {};
  }
  return _createClass(TestStorageTransport, [{
    key: "write",
    value: function write(message) {
      var _console;
      var namespace = message.payload.context.namespace;
      var level = message.payload.context.logLevel;
      var serviceName = namespace[namespace.length - 1];
      var data = JSON.parse(message.payload.message);
      this._data.messages.push({
        time: message.payload.time,
        data: data
      });

      // @ts-ignore
      // eslint-disable-next-line no-console
      (_console = console)[this.logLevelMap[level]].apply(_console, ["[".concat(serviceName, "]")].concat(_toConsumableArray(data)));
    }
  }]);
}();
/**
 * new logger
 */
// eslint-disable-next-line react-hooks/rules-of-hooks
var loggerV2 = exports.loggerV2 = (0, _mfeLogger.useLogger)({
  name: name,
  transports: isSharedWorker ? [consoleTransport, new SharedWorkerTransport({
    enabled: true
  })] : _toConsumableArray(process.env.NODE_ENV === 'test' ? [new TestStorageTransport()] : [consoleTransport, new _mfeLogger.StorageTransport({
    enabled: true
  })]),
  integrations: process.env.NODE_ENV === 'test' ? [] : [new _mfeLogger.ScriptErrorIntegration({
    enabled: true
  })].concat(_toConsumableArray(process.env.NODE_ENV === 'production' ? [new _mfeLogger.ConsoleIntegration({
    enabled: true
  })] : [])),
  enabled: isSharedWorker ? isSharedWorker : loggerEnabled
});
loggerV2.create = function (module) {
  var name = Object.getPrototypeOf(module)[_reactantShare.nameKey];
  if (!name) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('Module name not found');
    }
    return loggerV2;
  }
  if (loggerV2['_logger'].getContext().namespace) {
    return loggerV2.tag(name);
  }
  return loggerV2;
};
//# sourceMappingURL=loggerV2.js.map
