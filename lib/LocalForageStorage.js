"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.iterator");
require("core-js/modules/es.array.map");
require("core-js/modules/es.date.now");
require("core-js/modules/es.date.to-string");
require("core-js/modules/es.function.bind");
require("core-js/modules/es.object.get-prototype-of");
require("core-js/modules/es.object.set-prototype-of");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.promise");
require("core-js/modules/es.string.iterator");
require("core-js/modules/web.dom-collections.iterator");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LocalForageStorage = void 0;
require("regenerator-runtime/runtime");
var _events = require("events");
var _localforage = _interopRequireDefault(require("localforage"));
var _uuid = require("uuid");
var _MemoryStorage = require("./MemoryStorage");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _createSuper(t) { var r = _isNativeReflectConstruct(); return function () { var e, o = _getPrototypeOf(t); if (r) { var s = _getPrototypeOf(this).constructor; e = Reflect.construct(o, arguments, s); } else e = o.apply(this, arguments); return _possibleConstructorReturn(this, e); }; }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); } // @ts-nocheck
var LocalForageStorage = /*#__PURE__*/function (_EventEmitter) {
  _inherits(LocalForageStorage, _EventEmitter);
  var _super = _createSuper(LocalForageStorage);
  function LocalForageStorage(_ref) {
    var _this;
    var storageKey = _ref.storageKey;
    _classCallCheck(this, LocalForageStorage);
    _this = _super.call(this);
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
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(event) {
          var _JSON$parse, setter, key, value;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (!(event.key !== null && typeof event.key !== 'undefined' && event.key.substring(0, _this._storageSyncKey.length) === _this._storageSyncKey)) {
                    _context.next = 14;
                    break;
                  }
                  _context.prev = 1;
                  _JSON$parse = JSON.parse(event.newValue), setter = _JSON$parse.setter;
                  if (!(!setter || setter === _this.id)) {
                    _context.next = 5;
                    break;
                  }
                  return _context.abrupt("return");
                case 5:
                  key = event.key.substring(_this._storageSyncKey.length + 1);
                  _context.next = 8;
                  return _this.getItem(key);
                case 8:
                  value = _context.sent;
                  _this.emit('storage', {
                    key: key,
                    value: value
                  });
                  _context.next = 14;
                  break;
                case 12:
                  _context.prev = 12;
                  _context.t0 = _context["catch"](1);
                case 14:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, null, [[1, 12]]);
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
  _createClass(LocalForageStorage, [{
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
      var _getLocalStorageKeys = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var keys;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this._localforage.keys();
              case 2:
                keys = _context2.sent;
                return _context2.abrupt("return", keys);
              case 4:
              case "end":
                return _context2.stop();
            }
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
      var _getData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var _this2 = this;
        var output, keys, promises;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.ready();
              case 2:
                output = {};
                _context3.next = 5;
                return this.getLocalStorageKeys();
              case 5:
                keys = _context3.sent;
                promises = keys.map(function (key) {
                  return _this2.getItem(key).then(function (data) {
                    output[key] = data;
                  });
                });
                _context3.next = 9;
                return Promise.all(promises);
              case 9:
                return _context3.abrupt("return", output);
              case 10:
              case "end":
                return _context3.stop();
            }
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
      var _getItem = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(key) {
        var originalData, value;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this._localforage.getItem(key);
              case 2:
                originalData = _context4.sent;
                _context4.prev = 3;
                value = originalData.value;
                return _context4.abrupt("return", value);
              case 8:
                _context4.prev = 8;
                _context4.t0 = _context4["catch"](3);
                return _context4.abrupt("return", undefined);
              case 11:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[3, 8]]);
      }));
      function getItem(_x2) {
        return _getItem.apply(this, arguments);
      }
      return getItem;
    }()
  }, {
    key: "setItem",
    value: function () {
      var _setItem = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(key, value) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this._localforage.setItem(key, {
                  value: value,
                  setter: this.id
                });
              case 2:
                try {
                  this._updateStorageSyncData(key);
                } catch (error) {
                  console.error(error);
                }
              case 3:
              case "end":
                return _context5.stop();
            }
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
      var _removeItem = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(key) {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this._localforage.removeItem(key);
              case 2:
              case "end":
                return _context6.stop();
            }
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
    key: "ready",
    value: function () {
      var _ready = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (!this._ready) {
                  _context7.next = 2;
                  break;
                }
                return _context7.abrupt("return");
              case 2:
                if (!(typeof this._localforage.ready === 'function')) {
                  _context7.next = 5;
                  break;
                }
                _context7.next = 5;
                return this._localforage.ready();
              case 5:
                this._ready = true;
              case 6:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));
      function ready() {
        return _ready.apply(this, arguments);
      }
      return ready;
    }()
  }, {
    key: "id",
    get: function get() {
      return this._id;
    }
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
  return LocalForageStorage;
}(_events.EventEmitter);
exports.LocalForageStorage = LocalForageStorage;
//# sourceMappingURL=LocalForageStorage.js.map
