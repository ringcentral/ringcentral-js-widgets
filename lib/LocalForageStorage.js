"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
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
var uuid = _interopRequireWildcard(require("uuid"));
var _MemoryStorage = require("./MemoryStorage");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); } // @ts-nocheck
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
    _this._id = uuid.v4();
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
