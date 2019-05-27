"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.map");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.date.now");

require("regenerator-runtime/runtime");

var _uuid = _interopRequireDefault(require("uuid"));

var _events = _interopRequireDefault(require("events"));

var _localforage = _interopRequireDefault(require("localforage"));

var _MemoryStorage = _interopRequireDefault(require("./MemoryStorage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var LocalforageStorage =
/*#__PURE__*/
function (_EventEmitter) {
  _inherits(LocalforageStorage, _EventEmitter);

  function LocalforageStorage(_ref) {
    var _this;

    var storageKey = _ref.storageKey;

    _classCallCheck(this, LocalforageStorage);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(LocalforageStorage).call(this));

    if (!storageKey) {
      throw Error('SynchronizedStorage must be created with a storage key');
    }

    _this._storageKey = storageKey;
    _this._storageSyncKey = "".concat(storageKey, "-sync");
    _this._ready = false;
    _this._id = _uuid["default"].v4();

    if (typeof localStorage !== 'undefined' && typeof window !== 'undefined') {
      _localforage["default"].config({
        name: _this._storageKey
      });

      _this._localforage = _localforage["default"].createInstance({
        name: _this._storageKey
      });

      _this._tabSyncHandler =
      /*#__PURE__*/
      function () {
        var _ref2 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee(event) {
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
      _this._localforage = new _MemoryStorage["default"]();
    }

    return _this;
  }

  _createClass(LocalforageStorage, [{
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
      var _getLocalStorageKeys = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
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
      var _getData = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
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
      var _getItem = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(key) {
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
      var _setItem = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(key, value) {
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
      var _removeItem = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(key) {
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
      var _ready = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7() {
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
  }]);

  return LocalforageStorage;
}(_events["default"]);

exports["default"] = LocalforageStorage;
//# sourceMappingURL=LocalForageStorage.js.map
