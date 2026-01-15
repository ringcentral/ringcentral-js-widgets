"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.reflect.construct.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LocalForageStorage = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.date.now.js");
require("core-js/modules/es.date.to-json.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _events = require("events");
var _localforage = _interopRequireDefault(require("localforage"));
var _uuid = require("uuid");
var _MemoryStorage = require("./MemoryStorage");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); } // @ts-nocheck
var LocalForageStorage = exports.LocalForageStorage = /*#__PURE__*/function (_EventEmitter) {
  function LocalForageStorage(_ref) {
    var _this;
    var storageKey = _ref.storageKey;
    _classCallCheck(this, LocalForageStorage);
    _this = _callSuper(this, LocalForageStorage);
    _this._storageKey = void 0;
    _this._storageSyncKey = void 0;
    _this._ready = void 0;
    _this._id = void 0;
    _this._localforage = void 0;
    _this._tabSyncHandler = void 0;
    if (!storageKey) {
      throw Error('LocalforageStorage must be created with a storage key');
    }
    _this._storageKey = storageKey;
    _this._storageSyncKey = "".concat(storageKey, "-sync");
    _this._ready = false;
    _this._id = (0, _uuid.v4)();
    if (typeof localStorage !== 'undefined' && typeof window !== 'undefined') {
      _localforage["default"].config({
        name: _this._storageKey
      });
      _this._localforage = _localforage["default"].createInstance({
        name: _this._storageKey
      });
      _this._tabSyncHandler = /*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(event) {
          var _JSON$parse, setter, key, value, _t;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.p = _context.n) {
              case 0:
                if (!(event.key !== null && typeof event.key !== 'undefined' && event.key.substring(0, _this._storageSyncKey.length) === _this._storageSyncKey)) {
                  _context.n = 5;
                  break;
                }
                _context.p = 1;
                _JSON$parse = JSON.parse(event.newValue), setter = _JSON$parse.setter;
                if (!(!setter || setter === _this.id)) {
                  _context.n = 2;
                  break;
                }
                return _context.a(2);
              case 2:
                key = event.key.substring(_this._storageSyncKey.length + 1);
                _context.n = 3;
                return _this.getItem(key);
              case 3:
                value = _context.v;
                _this.emit('storage', {
                  key: key,
                  value: value
                });
                _context.n = 5;
                break;
              case 4:
                _context.p = 4;
                _t = _context.v;
              case 5:
                return _context.a(2);
            }
          }, _callee, null, [[1, 4]]);
        }));
        return function (_x) {
          return _ref2.apply(this, arguments);
        };
      }();
      window.addEventListener('storage', _this._tabSyncHandler);
    } else {
      _this._localforage = new _MemoryStorage.MemoryStorage();
    }
    return _this;
  }
  _inherits(LocalForageStorage, _EventEmitter);
  return _createClass(LocalForageStorage, [{
    key: "_updateStorageSyncData",
    value: function _updateStorageSyncData(key) {
      if (typeof localStorage !== 'undefined') {
        var syncKey = "".concat(this._storageSyncKey, "-").concat(key);
        localStorage.setItem(syncKey, JSON.stringify({
          timestamp: Date.now(),
          setter: this.id
        }));
      }
    }
  }, {
    key: "getLocalStorageKeys",
    value: function () {
      var _getLocalStorageKeys = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        var keys;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              _context2.n = 1;
              return this._localforage.keys();
            case 1:
              keys = _context2.v;
              return _context2.a(2, keys);
          }
        }, _callee2, this);
      }));
      function getLocalStorageKeys() {
        return _getLocalStorageKeys.apply(this, arguments);
      }
      return getLocalStorageKeys;
    }()
  }, {
    key: "getData",
    value: function () {
      var _getData = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
        var _this2 = this;
        var output, keys, promises;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              _context3.n = 1;
              return this.ready();
            case 1:
              output = {};
              _context3.n = 2;
              return this.getLocalStorageKeys();
            case 2:
              keys = _context3.v;
              promises = keys.map(function (key) {
                return _this2.getItem(key).then(function (data) {
                  output[key] = data;
                });
              });
              _context3.n = 3;
              return Promise.all(promises);
            case 3:
              return _context3.a(2, output);
          }
        }, _callee3, this);
      }));
      function getData() {
        return _getData.apply(this, arguments);
      }
      return getData;
    }()
  }, {
    key: "getItem",
    value: function () {
      var _getItem = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(key) {
        var originalData, value, _t2;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.p = _context4.n) {
            case 0:
              _context4.n = 1;
              return this._localforage.getItem(key);
            case 1:
              originalData = _context4.v;
              _context4.p = 2;
              value = originalData.value;
              return _context4.a(2, value);
            case 3:
              _context4.p = 3;
              _t2 = _context4.v;
              return _context4.a(2, undefined);
          }
        }, _callee4, this, [[2, 3]]);
      }));
      function getItem(_x2) {
        return _getItem.apply(this, arguments);
      }
      return getItem;
    }()
  }, {
    key: "setItem",
    value: function () {
      var _setItem = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(key, value) {
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              _context5.n = 1;
              return this._localforage.setItem(key, {
                value: value,
                setter: this.id
              });
            case 1:
              try {
                this._updateStorageSyncData(key);
              } catch (error) {
                console.error(error);
              }
            case 2:
              return _context5.a(2);
          }
        }, _callee5, this);
      }));
      function setItem(_x3, _x4) {
        return _setItem.apply(this, arguments);
      }
      return setItem;
    }()
  }, {
    key: "removeItem",
    value: function () {
      var _removeItem = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(key) {
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              _context6.n = 1;
              return this._localforage.removeItem(key);
            case 1:
              return _context6.a(2);
          }
        }, _callee6, this);
      }));
      function removeItem(_x5) {
        return _removeItem.apply(this, arguments);
      }
      return removeItem;
    }()
  }, {
    key: "destroy",
    value: function destroy() {
      if (this._tabSyncHandler) {
        window.removeEventListener('storage', this._tabSyncHandler);
      }
    }
  }, {
    key: "id",
    get: function get() {
      return this._id;
    }
  }, {
    key: "ready",
    value: function () {
      var _ready = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              if (!this._ready) {
                _context7.n = 1;
                break;
              }
              return _context7.a(2);
            case 1:
              if (!(typeof this._localforage.ready === 'function')) {
                _context7.n = 2;
                break;
              }
              _context7.n = 2;
              return this._localforage.ready();
            case 2:
              this._ready = true;
            case 3:
              return _context7.a(2);
          }
        }, _callee7, this);
      }));
      function ready() {
        return _ready.apply(this, arguments);
      }
      return ready;
    }()
  }, {
    key: "driver",
    get: function get() {
      if (this._localforage instanceof _MemoryStorage.MemoryStorage) {
        return 'MEMORYSTORAGE';
      }
      switch (this._localforage.driver()) {
        case _localforage["default"].WEBSQL:
          return 'WEBSQL';
        case _localforage["default"].INDEXEDDB:
          return 'INDEXEDDB';
        case _localforage["default"].LOCALSTORAGE:
          return 'LOCALSTORAGE';
        default:
          return null;
      }
    }
  }]);
}(_events.EventEmitter);
//# sourceMappingURL=LocalForageStorage.js.map
