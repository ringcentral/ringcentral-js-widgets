"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
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
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.reflect.get.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DriverType = void 0;
Object.defineProperty(exports, "StorageOptions", {
  enumerable: true,
  get: function get() {
    return _reactantShare.StorageOptions;
  }
});
exports.StoragePlugin = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.date.to-json.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.map.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.set.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/esnext.global-this.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _localforage = _interopRequireDefault(require("localforage"));
var _reactantShare = require("reactant-share");
var _constant = require("../constant");
var _checkIndexDB = require("../lib/checkIndexDB");
var _globalStorage = require("../lib/decorators/globalStorage");
var _localStorage = require("../lib/decorators/localStorage");
var _storage = require("../lib/decorators/storage");
var _userStorage = require("../lib/decorators/userStorage");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _class, _class2, _descriptor;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _defineAccessor(e, r, n, t) { var c = { configurable: !0, enumerable: !0 }; return c[e] = t, Object.defineProperty(r, n, c); }
function _regeneratorValues(e) { if (null != e) { var t = e["function" == typeof Symbol && Symbol.iterator || "@@iterator"], r = 0; if (t) return t.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) return { next: function next() { return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e }; } }; } throw new TypeError(_typeof(e) + " is not iterable"); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _superPropGet(t, o, e, r) { var p = _get(_getPrototypeOf(1 & r ? t.prototype : t), o, e); return 2 & r && "function" == typeof p ? function (t) { return p.apply(e, t); } : p; }
function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t));); return t; }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
var DriverType = exports.DriverType = /*#__PURE__*/function (DriverType) {
  DriverType["IndexedDB"] = "INDEXEDDB";
  DriverType["LocalStorage"] = "LOCALSTORAGE";
  DriverType["Unknown"] = "UNKNOWN";
  return DriverType;
}({});
var defaultUserId = '__default__';
var StoragePlugin = exports.StoragePlugin = (_dec = (0, _reactantShare.injectable)(), _dec2 = function _dec2(target, key) {
  return (0, _reactantShare.optional)(_reactantShare.StorageOptions)(target, undefined, 1);
}, _dec3 = function _dec3(target, key) {
  return (0, _reactantShare.optional)('Prefix')(target, undefined, 2);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _reactantShare.PortDetector === "undefined" ? Object : _reactantShare.PortDetector, typeof IStorageOptions === "undefined" ? Object : IStorageOptions, String]), _dec6 = Reflect.metadata("design:type", Function), _dec7 = Reflect.metadata("design:paramtypes", []), _dec8 = Reflect.metadata("design:type", typeof _constant.ModuleStatus === "undefined" ? Object : _constant.ModuleStatus), _dec9 = Reflect.metadata("design:type", Function), _dec0 = Reflect.metadata("design:paramtypes", []), _dec1 = Reflect.metadata("design:type", Function), _dec10 = Reflect.metadata("design:paramtypes", []), _dec11 = Reflect.metadata("design:type", Function), _dec12 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = (_class2 = /*#__PURE__*/function (_BaseStorage) {
  function StoragePlugin(portDetector, options, prefix) {
    var _options$storage, _options$disableClien;
    var _this;
    _classCallCheck(this, StoragePlugin);
    _this = _callSuper(this, StoragePlugin, [portDetector, _objectSpread(_objectSpread({}, options), {}, {
      whitelist: [],
      storage: (_options$storage = options === null || options === void 0 ? void 0 : options.storage) !== null && _options$storage !== void 0 ? _options$storage : prefix ? _localforage["default"].createInstance({
        name: prefix
      }) : _localforage["default"],
      disableClientRehydrated: (_options$disableClien = options === null || options === void 0 ? void 0 : options.disableClientRehydrated) !== null && _options$disableClien !== void 0 ? _options$disableClien : !!(portDetector.isWorkerMode && globalThis.SharedWorker)
    })]);
    _this.portDetector = portDetector;
    _this.prefix = prefix;
    _this.getUserId = void 0;
    _this[_constant.ignoreReadyModulesKey] = new Set();
    //#region migration storage
    _this._migrationMap = new Map();
    _this._migratedStorage = void 0;
    _this.operationCallbacks = [];
    _this.handleStorage = new Set();
    _this.clearStorage = new Set();
    //#region base RcModule for control all RcModule status
    _initializerDefineProperty(_this, "status", _descriptor, _this);
    if (_this.portDetector.shared) {
      _this.portDetector.onServer(function () {
        return _this.initialize();
      });
    } else {
      _this.initialize();
    }
    _this.onRehydrated(function () {
      _this.portDetector.onClient(function () {
        if (!_this.portDetector.isWorkerMode && _this.paused) {
          _this.persist();
        }
      });
    });
    return _this;
  }
  _inherits(StoragePlugin, _BaseStorage);
  return _createClass(StoragePlugin, [{
    key: "_migrationStorageKey",
    get: function get() {
      return "".concat(this.prefix ? "".concat(this.prefix, "-") : '', "storage-").concat(this._userId);
    }
  }, {
    key: "_migration",
    value: function () {
      var _migration2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var _this2 = this;
        var _iterator, _step, _loop, _t2;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              _iterator = _createForOfIteratorHelper(this._migrationMap);
              _context3.p = 1;
              _loop = /*#__PURE__*/_regenerator().m(function _loop() {
                var _step$value, target, keys, _iterator2, _step2, _loop2, _t;
                return _regenerator().w(function (_context2) {
                  while (1) switch (_context2.p = _context2.n) {
                    case 0:
                      _step$value = _slicedToArray(_step.value, 2), target = _step$value[0], keys = _step$value[1];
                      _iterator2 = _createForOfIteratorHelper(keys);
                      _context2.p = 1;
                      _loop2 = /*#__PURE__*/_regenerator().m(function _loop2() {
                        var _this2$_migratedStora;
                        var _step2$value, key, oldKey, data;
                        return _regenerator().w(function (_context) {
                          while (1) switch (_context.n) {
                            case 0:
                              _step2$value = _slicedToArray(_step2.value, 2), key = _step2$value[0], oldKey = _step2$value[1];
                              _context.n = 1;
                              return (_this2$_migratedStora = _this2._migratedStorage) === null || _this2$_migratedStora === void 0 ? void 0 : _this2$_migratedStora.getItem(oldKey);
                            case 1:
                              data = _context.v;
                              if (data === null || data === void 0 ? void 0 : data.value) {
                                _this2.operationCallbacks.push(function () {
                                  var _this2$_migratedStora2;
                                  target[key] = data.value;
                                  (_this2$_migratedStora2 = _this2._migratedStorage) === null || _this2$_migratedStora2 === void 0 ? void 0 : _this2$_migratedStora2.removeItem(oldKey);
                                });
                              }
                            case 2:
                              return _context.a(2);
                          }
                        }, _loop2);
                      });
                      _iterator2.s();
                    case 2:
                      if ((_step2 = _iterator2.n()).done) {
                        _context2.n = 4;
                        break;
                      }
                      return _context2.d(_regeneratorValues(_loop2()), 3);
                    case 3:
                      _context2.n = 2;
                      break;
                    case 4:
                      _context2.n = 6;
                      break;
                    case 5:
                      _context2.p = 5;
                      _t = _context2.v;
                      _iterator2.e(_t);
                    case 6:
                      _context2.p = 6;
                      _iterator2.f();
                      return _context2.f(6);
                    case 7:
                      return _context2.a(2);
                  }
                }, _loop, null, [[1, 5, 6, 7]]);
              });
              _iterator.s();
            case 2:
              if ((_step = _iterator.n()).done) {
                _context3.n = 4;
                break;
              }
              return _context3.d(_regeneratorValues(_loop()), 3);
            case 3:
              _context3.n = 2;
              break;
            case 4:
              _context3.n = 6;
              break;
            case 5:
              _context3.p = 5;
              _t2 = _context3.v;
              _iterator.e(_t2);
            case 6:
              _context3.p = 6;
              _iterator.f();
              return _context3.f(6);
            case 7:
              if (this.operationCallbacks.length) {
                this._migrate();
              }
            case 8:
              return _context3.a(2);
          }
        }, _callee, this, [[1, 5, 6, 7]]);
      }));
      function _migration() {
        return _migration2.apply(this, arguments);
      }
      return _migration;
    }()
  }, {
    key: "_migrate",
    value: function _migrate() {
      this.operationCallbacks.forEach(function (fn) {
        return fn();
      });
      this.operationCallbacks = [];
    }
    //#endregion
  }, {
    key: "initialize",
    value: function initialize() {
      var _this3 = this;
      (0, _reactantShare.watch)(this, function () {
        return _this3._userId;
      }, /*#__PURE__*/function () {
        var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(newValue, oldValue) {
          var dbExists;
          return _regenerator().w(function (_context4) {
            while (1) switch (_context4.n) {
              case 0:
                if (!newValue && oldValue) {
                  _this3.clear();
                }
                //#region migration storage
                if (!newValue && oldValue) {
                  _this3._migratedStorage = null;
                }
                if (!(newValue && !oldValue && !_this3._migratedStorage)) {
                  _context4.n = 3;
                  break;
                }
                _context4.n = 1;
                return (0, _checkIndexDB.checkIndexDB)(_this3._migrationStorageKey);
              case 1:
                dbExists = _context4.v;
                if (dbExists) {
                  _context4.n = 2;
                  break;
                }
                return _context4.a(2);
              case 2:
                _this3._migratedStorage = _localforage["default"].createInstance({
                  name: _this3._migrationStorageKey
                });
                _this3._migration();
              case 3:
                return _context4.a(2);
            }
          }, _callee2);
        }));
        return function (_x, _x2) {
          return _ref.apply(this, arguments);
        };
      }());
    }
  }, {
    key: "_userId",
    get: function get() {
      var _this$getUserId;
      return (_this$getUserId = this.getUserId) === null || _this$getUserId === void 0 ? void 0 : _this$getUserId.call(this);
    }
  }, {
    key: "userId",
    get: function get() {
      var _this$_userId;
      return (_this$_userId = this._userId) !== null && _this$_userId !== void 0 ? _this$_userId : defaultUserId;
    }
  }, {
    key: "enable",
    value: function enable(_target, options) {
      var _options$timeout,
        _this4 = this;
      // TODO: fix type
      var target = _target;
      var descriptors = {};
      var localStorageKeys = this.bindStorageOnly(target);
      var storageKeys = target[_storage.storageKey];
      if (!storageKeys) {
        if (localStorageKeys) return;
        if (process.env.NODE_ENV !== 'production') {
          // eslint-disable-next-line no-console
          console.error("No storage state defined in ".concat(target.constructor.name, "."));
        }
        return;
      }
      if (process.env.NODE_ENV !== 'production') {
        var _options$migrations, _options$whitelist, _options$blacklist;
        //#region migration storage
        options === null || options === void 0 ? void 0 : (_options$migrations = options.migrations) === null || _options$migrations === void 0 ? void 0 : _options$migrations.forEach(function (_ref2) {
          var _ref3 = _slicedToArray(_ref2, 1),
            key = _ref3[0];
          if (!storageKeys.has(key)) {
            throw new Error("Invalid migrations setting, ".concat(target.constructor.name, " has no storage state for ").concat(key, "."));
          }
        });
        //#endregion
        options === null || options === void 0 ? void 0 : (_options$whitelist = options.whitelist) === null || _options$whitelist === void 0 ? void 0 : _options$whitelist.forEach(function (key) {
          if (!storageKeys.has(key)) {
            throw new Error("Invalid whitelist, ".concat(target.constructor.name, " has no storage state for ").concat(key, "."));
          }
        });
        options === null || options === void 0 ? void 0 : (_options$blacklist = options.blacklist) === null || _options$blacklist === void 0 ? void 0 : _options$blacklist.forEach(function (key) {
          if (!storageKeys.has(key)) {
            throw new Error("Invalid blacklist, ".concat(target.constructor.name, " has no storage state for ").concat(key, "."));
          }
        });
      }
      //#region migration storage
      if (options === null || options === void 0 ? void 0 : options.migrations) {
        this._migrationMap.set(target, options.migrations);
      }
      //#endregion
      var userStorageKeys = target[_userStorage.userStorageKey];
      var globalStorageKeys = target[_globalStorage.globalStorageKey];
      this.setStorage(target, _objectSpread(_objectSpread({}, options), {}, {
        // timeout issue: https://github.com/rt2zz/redux-persist/issues/1308
        timeout: (_options$timeout = options === null || options === void 0 ? void 0 : options.timeout) !== null && _options$timeout !== void 0 ? _options$timeout : null,
        whitelist: Array.from(storageKeys.values())
      }));
      this.clearStorage.add(function () {
        storageKeys.forEach(function (key) {
          if (globalStorageKeys === null || globalStorageKeys === void 0 ? void 0 : globalStorageKeys.has(key)) return;
          if ((userStorageKeys && !userStorageKeys.has(key) || !userStorageKeys) && (!(options === null || options === void 0 ? void 0 : options.whitelist) || !options.whitelist.includes(key))) {
            target[key] = target[_reactantShare.initStateKey][key];
          }
        });
      });
      var that = this;
      userStorageKeys === null || userStorageKeys === void 0 ? void 0 : userStorageKeys.forEach(function (key) {
        var _options$blacklist2, _target$defaultStateK;
        if (options === null || options === void 0 ? void 0 : (_options$blacklist2 = options.blacklist) === null || _options$blacklist2 === void 0 ? void 0 : _options$blacklist2.includes(key)) return;
        // for map user storage by userId
        target[_reactantShare.defaultStateKey] = (_target$defaultStateK = target[_reactantShare.defaultStateKey]) !== null && _target$defaultStateK !== void 0 ? _target$defaultStateK : {};
        target[_constant.userIdReadyKey] = function () {
          return !!_this4._userId;
        };
        target[_reactantShare.defaultStateKey][key] = _defineAccessor("get", {}, defaultUserId, function () {
          return target[_reactantShare.initStateKey][key];
        });
        descriptors[key] = {
          configurable: true,
          enumerable: true,
          get: function get() {
            var id = that.userId;
            var stagedState = (0, _reactantShare.getStagedState)();
            var current = this[_reactantShare.stateKey][key];
            var signalMap = this[_reactantShare.signalMapKey];
            if (!stagedState && signalMap[key] && !(0, _reactantShare.isEqual)(signalMap[key].value, current)) {
              try {
                // Manual update signal value when the state is changed outside the common reducer.
                signalMap[key].value = current;
              } catch (e) {
                if (JSON.stringify(signalMap[key].value) !== JSON.stringify(current)) {
                  var className = target.constructor.name;
                  console.error("The '".concat(key, "' state value of the module '").concat(className, "' has been changed outside the common reducer, which may cause the state to be out of sync. Please check middleware to update the state value without signal updating."));
                }
              }
            }
            if (typeof this[_reactantShare.stateKey][key][id] === 'undefined') {
              if (stagedState) {
                this[_reactantShare.stateKey][key][id] = JSON.parse(JSON.stringify(target[_reactantShare.initStateKey][key]));
                return this[_reactantShare.stateKey][key][id];
              }
              return target[_reactantShare.initStateKey][key];
            }
            return current[id];
          },
          set: function set(value) {
            var id = that.userId;
            this[_reactantShare.stateKey][key][id] = value;
          }
        };
      });
      // post create reducer for target
      this.handleStorage.add(function () {
        Object.defineProperties(target, descriptors);
      });
    }
  }, {
    key: "pending",
    get: function get() {
      return this.status === _constant.ModuleStatus.Pending;
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
    //#region
  }, {
    key: "_setReady",
    value: function _setReady() {
      this.status = _constant.ModuleStatus.Ready;
    }
  }, {
    key: "_setResetting",
    value: function _setResetting() {
      this.status = _constant.ModuleStatus.Resetting;
    }

    /**
     * if change getUserId() value, you can use it for resetting the storage state.
     * for example,in hubspot,the user id is ownerid-hubid, when the user switch hub, the getUserId() value will be changed
     * then need to initialize modules base on the new user id,
     * so, you can use this method to reset the storage state and init all modules
     */
  }, {
    key: "resetStorageState",
    value: (function () {
      var _resetStorageState = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(callback) {
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              this._setResetting();
              _context5.n = 1;
              return callback === null || callback === void 0 ? void 0 : callback();
            case 1:
              this._setReady();
            case 2:
              return _context5.a(2);
          }
        }, _callee3, this);
      }));
      function resetStorageState(_x3) {
        return _resetStorageState.apply(this, arguments);
      }
      return resetStorageState;
    }())
  }, {
    key: "clear",
    value: function clear() {
      this.clearStorage.forEach(function (fn) {
        return fn();
      });
    }
  }, {
    key: "afterCombineRootReducers",
    value: function afterCombineRootReducers(rootReducer) {
      this.handleStorage.forEach(function (handler) {
        return handler();
      });
      return _superPropGet(StoragePlugin, "afterCombineRootReducers", this, 3)([rootReducer]);
    }
  }, {
    key: "driver",
    get: function get() {
      if (this.options.storage === _localforage["default"]) {
        var storage = this.options.storage;
        switch (storage.driver()) {
          case storage.INDEXEDDB:
            return DriverType.IndexedDB;
          case storage.LOCALSTORAGE:
            return DriverType.LocalStorage;
          default:
            return DriverType.Unknown;
        }
      }
      if (this.options.storage === globalThis.localStorage) {
        return DriverType.LocalStorage;
      }
      return DriverType.Unknown;
    }
  }, {
    key: "bindStorageOnly",
    value: function bindStorageOnly(target) {
      var descriptors = {};
      var localStorageOnlyKeys = target[_localStorage.localStorageOnlyKey];
      var prefix = this.prefix;
      localStorageOnlyKeys === null || localStorageOnlyKeys === void 0 ? void 0 : localStorageOnlyKeys.forEach(function (key) {
        var value = target[key];
        var storageKey;
        var getStorageKey = function getStorageKey(identifier) {
          return "".concat(prefix, "-").concat(identifier, ".").concat(key);
        };
        descriptors[key] = {
          configurable: true,
          enumerable: true,
          get: function get() {
            var _getRef = (0, _reactantShare.getRef)(this),
              identifier = _getRef.identifier;
            if (process.env.NODE_ENV !== 'production' && !identifier) {
              throw new Error("[StoragePlugin] not found identifierKey '".concat(identifier, "': get '").concat(key, "' value error in ").concat(this.constructor.name, " module, make sure to use it after the module is constructed"));
            }
            if (!storageKey) {
              storageKey = getStorageKey(identifier);
              var storageValue = globalThis.localStorage.getItem(storageKey);
              try {
                value = storageValue === null ? value : JSON.parse(storageValue);
              } catch (e) {
                // It can support the all types, including `undefined`.
                value = undefined;
              }
            }
            return value;
          },
          set: function set(newVal) {
            var _getRef2 = (0, _reactantShare.getRef)(this),
              identifier = _getRef2.identifier;
            if (process.env.NODE_ENV !== 'production' && !identifier) {
              throw new Error("[StoragePlugin] not found identifierKey '".concat(identifier, "': set '").concat(key, "' value error in ").concat(this.constructor.name, " module, make sure to use it after the module is constructed"));
            }
            if (!storageKey) {
              storageKey = getStorageKey(identifier);
            }
            globalThis.localStorage.setItem(storageKey, JSON.stringify(newVal));
            value = newVal;
          }
        };
      });
      Object.defineProperties(target, descriptors);
      return localStorageOnlyKeys;
    }
  }]);
}(_reactantShare.Storage), _applyDecoratedDescriptor(_class2.prototype, "_migrate", [_reactantShare.action, _dec6, _dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "_migrate"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "status", [_reactantShare.state, _dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return _constant.ModuleStatus.Ready;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_setReady", [_reactantShare.action, _dec9, _dec0], Object.getOwnPropertyDescriptor(_class2.prototype, "_setReady"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setResetting", [_reactantShare.action, _dec1, _dec10], Object.getOwnPropertyDescriptor(_class2.prototype, "_setResetting"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "clear", [_reactantShare.action, _dec11, _dec12], Object.getOwnPropertyDescriptor(_class2.prototype, "clear"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class) || _class);
//# sourceMappingURL=Storage.plugin.js.map
