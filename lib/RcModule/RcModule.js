"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RcModuleV2 = exports.ModuleStatus = void 0;
Object.defineProperty(exports, "action", {
  enumerable: true,
  get: function get() {
    return _usmRedux.action;
  }
});
Object.defineProperty(exports, "applyPatches", {
  enumerable: true,
  get: function get() {
    return _usmRedux.applyPatches;
  }
});
exports.checkStatusChangeKey = void 0;
Object.defineProperty(exports, "computed", {
  enumerable: true,
  get: function get() {
    return _usmRedux.computed;
  }
});
Object.defineProperty(exports, "createStore", {
  enumerable: true,
  get: function get() {
    return _usmRedux.createStore;
  }
});
exports.enableCacheKey = void 0;
Object.defineProperty(exports, "enableES5", {
  enumerable: true,
  get: function get() {
    return _usmRedux.enableES5;
  }
});
exports.globalStorageStateKey = exports.enableGlobalCacheKey = void 0;
Object.defineProperty(exports, "identifierKey", {
  enumerable: true,
  get: function get() {
    return _usmRedux.identifierKey;
  }
});
exports.onceKey = exports.onInitOnceKey = exports.notReadyModulesKey = exports.ignoreReadyModulesKey = void 0;
Object.defineProperty(exports, "setAutoFreeze", {
  enumerable: true,
  get: function get() {
    return _usmRedux.setAutoFreeze;
  }
});
exports.spawnStorageReducersKey = exports.spawnReducersKey = void 0;
Object.defineProperty(exports, "state", {
  enumerable: true,
  get: function get() {
    return _usmRedux.state;
  }
});
Object.defineProperty(exports, "stateKey", {
  enumerable: true,
  get: function get() {
    return _usmRedux.stateKey;
  }
});
exports.storageStateKey = exports.storageKey = void 0;
Object.defineProperty(exports, "storeKey", {
  enumerable: true,
  get: function get() {
    return _usmRedux.storeKey;
  }
});
Object.defineProperty(exports, "subscribe", {
  enumerable: true,
  get: function get() {
    return _usmRedux.subscribe;
  }
});
Object.defineProperty(exports, "usmAction", {
  enumerable: true,
  get: function get() {
    return _usmRedux.usm;
  }
});
Object.defineProperty(exports, "watch", {
  enumerable: true,
  get: function get() {
    return _usmRedux.watch;
  }
});
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.object.values.js");
require("core-js/modules/es.set.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _redux = require("redux");
var _usmRedux = require("../usm-redux");
var _excluded = ["deps", "enableCache", "enableGlobalCache"];
var _class, _descriptor;
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
(0, _usmRedux.setAutoFreeze)(false);
(0, _usmRedux.setPatchesToggle)(!process.env.DISABLE_PATCHES);
if (!process.env.DISABLE_PATCHES) {
  (0, _usmRedux.enablePatches)();
}
var ModuleStatus = exports.ModuleStatus = /*#__PURE__*/function (ModuleStatus) {
  ModuleStatus["Pending"] = "PENDING";
  ModuleStatus["Initializing"] = "INITIALIZING";
  ModuleStatus["Ready"] = "READY";
  ModuleStatus["Resetting"] = "RESETTING";
  return ModuleStatus;
}({});
var onceKey = exports.onceKey = Symbol('once');
var onInitOnceKey = exports.onInitOnceKey = Symbol('onInitOnce');
var notReadyModulesKey = exports.notReadyModulesKey = Symbol('notReadyModules');
var checkStatusChangeKey = exports.checkStatusChangeKey = Symbol('checkStatusChange');
var enableCacheKey = exports.enableCacheKey = Symbol('enableCache');
var enableGlobalCacheKey = exports.enableGlobalCacheKey = Symbol('enableGlobalCache');
var storageKey = exports.storageKey = Symbol('storage');
var storageStateKey = exports.storageStateKey = Symbol('storageState');
var globalStorageStateKey = exports.globalStorageStateKey = Symbol('globalStorageState');
var spawnReducersKey = exports.spawnReducersKey = Symbol('spawnReducers');
var spawnStorageReducersKey = exports.spawnStorageReducersKey = Symbol('spawnStorageReducers');
var ignoreReadyModulesKey = exports.ignoreReadyModulesKey = Symbol('ignoreReadyModules');
/**
 * Module system based on Dependency Injection and Redux
 *
 * life cycle:
 * - `constructor`
 * - `onInitOnce`: when deps are ready, only run once in whole life cycle
 * - `onInit`: when module init, module status will be set to `ready` after that event.
 * - `onInitSuccess`: when onInit be passed successfully, this event will be triggered.
 * - `onReset`: when one of deps be reset, this event will be triggered.
 */
var RcModuleV2 = exports.RcModuleV2 = (_class = /*#__PURE__*/function () {
  function RcModuleV2() {
    var _ref2,
      _this = this;
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var deps = _ref.deps,
      _ref$enableCache = _ref.enableCache,
      enableCache = _ref$enableCache === void 0 ? false : _ref$enableCache,
      _ref$enableGlobalCach = _ref.enableGlobalCache,
      enableGlobalCache = _ref$enableGlobalCach === void 0 ? false : _ref$enableGlobalCach,
      options = _objectWithoutProperties(_ref, _excluded);
    _classCallCheck(this, RcModuleV2);
    this[onceKey] = false;
    this[storageKey] = void 0;
    this[enableCacheKey] = void 0;
    this[enableGlobalCacheKey] = void 0;
    /**
     * background/client transport for browser extension
     */
    this._transport = void 0;
    // TODO: add transport type
    this[ignoreReadyModulesKey] = new Set();
    this._deps = void 0;
    _initializerDefineProperty(this, "status", _descriptor, this);
    // TODO: Refactor without RcModuleV1
    // harmony with RcModule V1 for modules initialization
    this._modulePath = 'root';
    this._initialized = false;
    this._suppressInit = void 0;
    this._reducers = void 0;
    this._getStateV2 = function (state, key) {
      return state[key];
    };
    this._deps = (_ref2 = deps) !== null && _ref2 !== void 0 ? _ref2 : {};
    this[storageKey] = options.storageKey;
    this[enableCacheKey] = enableCache;
    this[enableGlobalCacheKey] = enableGlobalCache;
    (0, _usmRedux.subscribe)(this, function () {
      if (typeof _this.onStateChange === 'function') {
        _this.onStateChange();
      }
      _this[checkStatusChangeKey]();
    });
    if (!this[storageStateKey] || !this[enableCacheKey] || !this._deps.storage) {
      this[storageStateKey] = [];
    }
    this[storageStateKey].forEach(function (key) {
      return delete _this[_usmRedux.stateKey][key];
    });
    if (!this[globalStorageStateKey] || !this[enableGlobalCacheKey] || !this._deps.globalStorage) {
      this[globalStorageStateKey] = [];
    }
    this[globalStorageStateKey].forEach(function (key) {
      return delete _this[_usmRedux.stateKey][key];
    });
  }
  return _createClass(RcModuleV2, [{
    key: "_setStatus",
    value: function _setStatus(status) {
      this.status = status;
    }
  }, {
    key: onInitOnceKey,
    value: function () {
      var _value = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              if (this[onceKey]) {
                _context.n = 1;
                break;
              }
              this[onceKey] = true;
              if (!(typeof this.onInitOnce === 'function')) {
                _context.n = 1;
                break;
              }
              _context.n = 1;
              return this.onInitOnce();
            case 1:
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
    key: checkStatusChangeKey,
    value: function () {
      var _value2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              if (!this._shouldInit()) {
                _context2.n = 4;
                break;
              }
              this._setStatus(ModuleStatus.Initializing);
              _context2.n = 1;
              return this[onInitOnceKey]();
            case 1:
              if (!(typeof this.onInit === 'function')) {
                _context2.n = 2;
                break;
              }
              _context2.n = 2;
              return this.onInit();
            case 2:
              this._setStatus(ModuleStatus.Ready);
              if (!(typeof this.onInitSuccess === 'function')) {
                _context2.n = 3;
                break;
              }
              _context2.n = 3;
              return this.onInitSuccess();
            case 3:
              _context2.n = 6;
              break;
            case 4:
              if (!this._shouldReset()) {
                _context2.n = 6;
                break;
              }
              this._setStatus(ModuleStatus.Resetting);
              if (!(typeof this.onReset === 'function')) {
                _context2.n = 5;
                break;
              }
              _context2.n = 5;
              return this.onReset();
            case 5:
              this._setStatus(ModuleStatus.Pending);
            case 6:
              return _context2.a(2);
          }
        }, _callee2, this);
      }));
      function value() {
        return _value2.apply(this, arguments);
      }
      return value;
    }()
  }, {
    key: "_ignoreModuleReadiness",
    value: function _ignoreModuleReadiness(dep) {
      this[ignoreReadyModulesKey].add(dep);
    }
  }, {
    key: notReadyModulesKey,
    get: function get() {
      var _this2 = this;
      var modules = Object.values(this._deps || {}).filter(
      // In order to be compatible with RcModuleV1
      function (module) {
        return module && typeof module.ready !== 'undefined';
      });
      return modules.filter(function (module) {
        return !module.ready && !_this2[ignoreReadyModulesKey].has(module);
      });
    }
  }, {
    key: "_getLastState",
    value: function _getLastState() {
      var _this$_deps$storage,
        _this3 = this,
        _this$_deps$globalSto;
      var lastState = {
        // for combineReducers check state with reducers
        __state: this._getStateV2(this[_usmRedux.storeKey].getState(), this[_usmRedux.identifierKey]),
        __identifier: this[_usmRedux.identifierKey]
      };
      if ((_this$_deps$storage = this._deps.storage) === null || _this$_deps$storage === void 0 ? void 0 : _this$_deps$storage.data) {
        this[storageStateKey].forEach(function (key) {
          var storageReducerKey = "".concat(_this3[storageKey], "-").concat(key);
          lastState[key] = _this3._deps.storage.data[storageReducerKey];
        });
      }
      if ((_this$_deps$globalSto = this._deps.globalStorage) === null || _this$_deps$globalSto === void 0 ? void 0 : _this$_deps$globalSto.data) {
        this[globalStorageStateKey].forEach(function (key) {
          var storageReducerKey = "".concat(_this3[storageKey], "-").concat(key);
          lastState[key] = _this3._deps.globalStorage.data[storageReducerKey];
        });
      }
      return lastState;
    }
  }, {
    key: "_handleState",
    value: function _handleState(state) {
      Object.assign(state, state.__state);
      delete state.__state;
      delete state.__identifier;
    }
  }, {
    key: "_shouldInit",
    value: function _shouldInit() {
      var areAllReady = this[notReadyModulesKey].length === 0;
      return areAllReady && this.pending;
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      var areNotReady = this[notReadyModulesKey].length > 0;
      return areNotReady && this.ready;
    }
  }, {
    key: "_depsCheck",
    value: function _depsCheck() {
      var _this$_deps;
      var checkedModules = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [this];
      var pickedModules = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      Object.values((_this$_deps = this._deps) !== null && _this$_deps !== void 0 ? _this$_deps : {}).forEach(function (module) {
        if (module instanceof RcModuleV2 && !module.ready) {
          var _module$_deps;
          var notReadyModules = Object.values((_module$_deps = module._deps) !== null && _module$_deps !== void 0 ? _module$_deps : {}).filter(function (item) {
            return item instanceof RcModuleV2 && !item.ready;
          });
          if (notReadyModules.length > 0 && !checkedModules.includes(module)) {
            checkedModules.push(module);
            module._depsCheck(checkedModules, pickedModules);
          } else if (!pickedModules.includes(module) && notReadyModules.length === 0) {
            pickedModules.push(module);
          }
        }
      });
      // please check `_shouldInit()` or `onInit()`.
      return pickedModules;
    }
  }, {
    key: "_changeState",
    value: function _changeState(callback) {
      callback();
    }
  }, {
    key: "pending",
    get: function get() {
      return this.status === ModuleStatus.Pending;
    }
  }, {
    key: "ready",
    get: function get() {
      return this.status === ModuleStatus.Ready;
    }
  }, {
    key: "resetting",
    get: function get() {
      return this.status === ModuleStatus.Resetting;
    }
  }, {
    key: "initializing",
    get: function get() {
      return this.status === ModuleStatus.Initializing;
    }
  }, {
    key: "store",
    get: function get() {
      return this[_usmRedux.storeKey];
    }
  }, {
    key: spawnStorageReducersKey,
    value: function value() {
      var _this4 = this;
      var descriptors = {};
      /**
       * make storage reducer and state
       */
      this[storageStateKey].forEach(function (key) {
        var descriptor = Object.getOwnPropertyDescriptor(_this4, key);
        if (typeof descriptor === 'undefined') return;
        var initialState = descriptor.value;
        var storageReducerKey = "".concat(_this4[storageKey], "-").concat(key);
        _this4._deps.storage.registerReducer({
          key: storageReducerKey,
          reducer: function reducer() {
            var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
            var action = arguments.length > 1 ? arguments[1] : undefined;
            return action._usm === _usmRedux.usm && action.type === _this4[_usmRedux.identifierKey] && Object.hasOwnProperty.call(action._state, key) ? action._state[key] : state;
          }
        });
        Object.assign(descriptors, _defineProperty({}, key, {
          enumerable: true,
          configurable: false,
          get: function get() {
            var stagedState = (0, _usmRedux.getStagedState)();
            return (stagedState === null || stagedState === void 0 ? void 0 : stagedState.__identifier) === this[_usmRedux.identifierKey] ? stagedState[key] : this._deps.storage.data[storageReducerKey];
          },
          set: function set(value) {
            var stagedState = (0, _usmRedux.getStagedState)();
            if (stagedState && stagedState.__identifier !== this[_usmRedux.identifierKey]) {
              throw new Error("RcModule does not support cross-module execution of the methods decorated by action");
            }
            if (stagedState) {
              stagedState[key] = value;
              return;
            }
            this._deps.storage.data[storageReducerKey] = value;
          }
        }));
      });

      /**
       * make global storage reducer and state
       */
      this[globalStorageStateKey].forEach(function (key) {
        var descriptor = Object.getOwnPropertyDescriptor(_this4, key);
        if (typeof descriptor === 'undefined') return;
        var initialState = descriptor.value;
        var storageReducerKey = "".concat(_this4[storageKey], "-").concat(key);
        _this4._deps.globalStorage.registerReducer({
          key: storageReducerKey,
          reducer: function reducer() {
            var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
            var action = arguments.length > 1 ? arguments[1] : undefined;
            return action._usm === _usmRedux.usm && action.type === _this4[_usmRedux.identifierKey] && Object.hasOwnProperty.call(action._state, key) ? action._state[key] : state;
          }
        });
        Object.assign(descriptors, _defineProperty({}, key, {
          enumerable: true,
          configurable: false,
          get: function get() {
            var stagedState = (0, _usmRedux.getStagedState)();
            return (stagedState === null || stagedState === void 0 ? void 0 : stagedState.__identifier) === this[_usmRedux.identifierKey] ? stagedState[key] : this._deps.globalStorage.data[storageReducerKey];
          },
          set: function set(value) {
            var stagedState = (0, _usmRedux.getStagedState)();
            if (stagedState && stagedState.__identifier !== this[_usmRedux.identifierKey]) {
              throw new Error("RcModule does not support cross-module execution of the methods decorated by action");
            }
            if (stagedState) {
              stagedState[key] = value;
              return;
            }
            this._deps.globalStorage.data[storageReducerKey] = value;
          }
        }));
      });
      Object.defineProperties(this, descriptors);
    }
  }, {
    key: "_setStore",
    value: function _setStore() {
      return this._initModule();
    }
  }, {
    key: "_store",
    get: function get() {
      return this.store;
    }
  }, {
    key: spawnReducersKey,
    value: function value() {
      var _this$stateKey,
        _this5 = this;
      var descriptors = _defineProperty({}, _usmRedux.stateKey, {
        enumerable: false,
        configurable: false,
        get: function get() {
          var _this$storeKey;
          var stagedState = (0, _usmRedux.getStagedState)();
          return (stagedState === null || stagedState === void 0 ? void 0 : stagedState.__identifier) === this[_usmRedux.identifierKey] ? stagedState.__state : this._getStateV2((_this$storeKey = this[_usmRedux.storeKey]) === null || _this$storeKey === void 0 ? void 0 : _this$storeKey.getState(), this[_usmRedux.identifierKey]);
        }
      });
      this._reducers = Object.keys((_this$stateKey = this[_usmRedux.stateKey]) !== null && _this$stateKey !== void 0 ? _this$stateKey : {}).reduce(function (serviceReducersMapObject, key) {
        var descriptor = Object.getOwnPropertyDescriptor(_this5, key);
        if (typeof descriptor === 'undefined') return serviceReducersMapObject;
        var initialState = descriptor.value;
        Object.assign(descriptors, _defineProperty({}, key, {
          enumerable: true,
          configurable: false,
          get: function get() {
            return this[_usmRedux.stateKey][key];
          },
          set: function set(value) {
            this[_usmRedux.stateKey][key] = value;
          }
        }));
        return Object.assign(serviceReducersMapObject, _defineProperty({}, key, function () {
          var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
          var action = arguments.length > 1 ? arguments[1] : undefined;
          return action._usm === _usmRedux.usm && _this5[_usmRedux.identifierKey] === action.type && Object.hasOwnProperty.call(action._state, key) ? action._state[key] : state;
        }));
      }, {});
      var stateDescriptor = Object.getOwnPropertyDescriptor(this, _usmRedux.stateKey);
      if (stateDescriptor && typeof stateDescriptor.get === 'function') return;
      Object.defineProperties(this, descriptors);
    }
  }, {
    key: "reducer",
    get: function get() {
      if (this._reducers) return (0, _redux.combineReducers)(this._reducers);
      this[spawnStorageReducersKey]();
      this[spawnReducersKey]();
      if (!this._reducers) {
        throw new Error("Combine reducers error");
      }
      return (0, _redux.combineReducers)(this._reducers);
    }
  }, {
    key: "_initModule",
    value: function () {
      var _initModule2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
        var _this$subscriptionsKe, _iterator, _step, _subscribe, subModule, subRcModule;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              this._initialized = true;
              if (this.parentModule && !(this.parentModule instanceof RcModuleV2) || !this.parentModule && !(this instanceof RcModuleV2)) {
                _iterator = _createForOfIteratorHelper((_this$subscriptionsKe = this[_usmRedux.subscriptionsKey]) !== null && _this$subscriptionsKe !== void 0 ? _this$subscriptionsKe : []);
                try {
                  for (_iterator.s(); !(_step = _iterator.n()).done;) {
                    _subscribe = _step.value;
                    _subscribe();
                  }
                } catch (err) {
                  _iterator.e(err);
                } finally {
                  _iterator.f();
                }
                this[_usmRedux.subscriptionsKey] = [];
              }
              _context3.n = 1;
              return this[checkStatusChangeKey]();
            case 1:
              // eslint-disable-next-line guard-for-in
              for (subModule in this) {
                subRcModule = this[subModule];
                if (subRcModule && typeof subRcModule._initModule === 'function' && !subRcModule._initialized && !subRcModule._suppressInit) {
                  subRcModule._initModule();
                }
              }
            case 2:
              return _context3.a(2);
          }
        }, _callee3, this);
      }));
      function _initModule() {
        return _initModule2.apply(this, arguments);
      }
      return _initModule;
    }()
  }, {
    key: "proxyReady",
    get: function get() {
      return this.ready;
    }
  }, {
    key: "modulePath",
    get: function get() {
      return this._modulePath;
    }
  }, {
    key: "addModule",
    value: function addModule(name, module) {
      if (Object.prototype.hasOwnProperty.call(this, name)) {
        throw new Error("Property '".concat(name, "' already exists..."));
      }
      Object.defineProperty(this, name, {
        get: function get() {
          return module;
        },
        enumerable: true
      });
      if (this[name]._modulePath === 'root') {
        this[name]._modulePath = "".concat(this.modulePath, ".").concat(name);
      }
    }
  }, {
    key: "state",
    get: function get() {
      return this[_usmRedux.stateKey];
    }
  }, {
    key: "actionTypes",
    value: function actionTypes() {
      return {};
    }
  }]);
}(), _descriptor = _applyDecoratedDescriptor(_class.prototype, "status", [_usmRedux.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return ModuleStatus.Pending;
  }
}), _applyDecoratedDescriptor(_class.prototype, "_setStatus", [_usmRedux.action], Object.getOwnPropertyDescriptor(_class.prototype, "_setStatus"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "_changeState", [_usmRedux.action], Object.getOwnPropertyDescriptor(_class.prototype, "_changeState"), _class.prototype), _class);
//# sourceMappingURL=RcModule.js.map
