'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _eventEmitter = require('event-emitter');

var _eventEmitter2 = _interopRequireDefault(_eventEmitter);

var _localforage = require('localforage');

var _localforage2 = _interopRequireDefault(_localforage);

var _MemoryStorage = require('./MemoryStorage');

var _MemoryStorage2 = _interopRequireDefault(_MemoryStorage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LocalforageStorage = function () {
  function LocalforageStorage(_ref) {
    var _this = this;

    var storageKey = _ref.storageKey;
    (0, _classCallCheck3.default)(this, LocalforageStorage);

    if (!storageKey) {
      throw Error('SynchronizedStorage must be created with a storage key');
    }
    this._storageKey = storageKey;
    this._storageSyncKey = storageKey + '-sync';
    this._ready = false;
    this._id = _uuid2.default.v4();
    if (typeof localStorage !== 'undefined' && typeof window !== 'undefined') {
      _localforage2.default.config({ name: this._storageKey });
      this._localforage = _localforage2.default.createInstance({
        name: this._storageKey
      });
      this._tabSyncHandler = function () {
        var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(event) {
          var _JSON$parse, setter, key, value;

          return _regenerator2.default.wrap(function _callee$(_context) {
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

                  return _context.abrupt('return');

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
                  _context.t0 = _context['catch'](1);

                case 14:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, _this, [[1, 12]]);
        }));

        return function (_x) {
          return _ref2.apply(this, arguments);
        };
      }();
      window.addEventListener('storage', this._tabSyncHandler);
    } else {
      this._localforage = new _MemoryStorage2.default();
    }
  }

  (0, _createClass3.default)(LocalforageStorage, [{
    key: '_updateStorageSyncData',
    value: function _updateStorageSyncData(key) {
      if (typeof localStorage !== 'undefined') {
        var syncKey = this._storageSyncKey + '-' + key;
        localStorage.setItem(syncKey, (0, _stringify2.default)({
          timestamp: Date.now(),
          setter: this.id
        }));
      }
    }
  }, {
    key: 'getLocalStorageKeys',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        var keys;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this._localforage.keys();

              case 2:
                keys = _context2.sent;
                return _context2.abrupt('return', keys);

              case 4:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getLocalStorageKeys() {
        return _ref3.apply(this, arguments);
      }

      return getLocalStorageKeys;
    }()
  }, {
    key: 'getData',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
        var _this2 = this;

        var output, keys, promises;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
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
                return _promise2.default.all(promises);

              case 9:
                return _context3.abrupt('return', output);

              case 10:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getData() {
        return _ref4.apply(this, arguments);
      }

      return getData;
    }()
  }, {
    key: 'getItem',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(key) {
        var originalData, value;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this._localforage.getItem(key);

              case 2:
                originalData = _context4.sent;
                _context4.prev = 3;
                value = originalData.value;
                return _context4.abrupt('return', value);

              case 8:
                _context4.prev = 8;
                _context4.t0 = _context4['catch'](3);
                return _context4.abrupt('return', undefined);

              case 11:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[3, 8]]);
      }));

      function getItem(_x2) {
        return _ref5.apply(this, arguments);
      }

      return getItem;
    }()
  }, {
    key: 'setItem',
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(key, value) {
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this._localforage.setItem(key, { value: value, setter: this.id });

              case 2:
                this.emit('storage', {
                  key: key,
                  value: value
                });
                this._updateStorageSyncData(key);

              case 4:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function setItem(_x3, _x4) {
        return _ref6.apply(this, arguments);
      }

      return setItem;
    }()
  }, {
    key: 'removeItem',
    value: function () {
      var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(key) {
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this._localforage.removeItem(key);

              case 2:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function removeItem(_x5) {
        return _ref7.apply(this, arguments);
      }

      return removeItem;
    }()
  }, {
    key: 'destroy',
    value: function destroy() {
      if (this._tabSyncHandler) {
        window.removeEventListener('storage', this._tabSyncHandler);
      }
    }
  }, {
    key: 'ready',
    value: function () {
      var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7() {
        return _regenerator2.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (!this._ready) {
                  _context7.next = 2;
                  break;
                }

                return _context7.abrupt('return');

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
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function ready() {
        return _ref8.apply(this, arguments);
      }

      return ready;
    }()
  }, {
    key: 'id',
    get: function get() {
      return this._id;
    }
  }]);
  return LocalforageStorage;
}();

exports.default = LocalforageStorage;


(0, _eventEmitter2.default)(LocalforageStorage.prototype);
//# sourceMappingURL=LocalForageStorage.js.map
