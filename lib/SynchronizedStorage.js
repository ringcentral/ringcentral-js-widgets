'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _eventEmitter = require('event-emitter');

var _eventEmitter2 = _interopRequireDefault(_eventEmitter);

var _MemoryStorage = require('./MemoryStorage');

var _MemoryStorage2 = _interopRequireDefault(_MemoryStorage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO: experiment with a managed list of keys to watch rather than matching every event with
// storageKey might provide better performance

var SynchronizedStorage = function () {
  function SynchronizedStorage(_ref) {
    var _this = this;

    var storageKey = _ref.storageKey;
    (0, _classCallCheck3.default)(this, SynchronizedStorage);

    if (!storageKey) {
      throw Error('SynchronizedStorage must be created with a storage key');
    }
    this._storageKey = storageKey;
    this._id = _uuid2.default.v4();
    if (typeof localStorage !== 'undefined' && typeof window !== 'undefined') {
      this._storageHandler = function (event) {
        if (event.key.substring(0, _this._storageKey.length) === _this._storageKey) {
          try {
            var _JSON$parse = JSON.parse(event.newValue),
                setter = _JSON$parse.setter;

            if (setter && setter !== _this.id) {
              var key = event.key.substring(_this._storageKey.length + 1);
              // It seems that IE11 does not update the actual localStorage object
              // in the same event cycle...
              setTimeout(function () {
                _this.emit('storage', {
                  key: key,
                  value: _this.getItem(key)
                });
              }, 0);
            }
          } catch (error) {
            /* ignore error */
          }
        }
      };
      this._localStorage = localStorage;
      window.addEventListener('storage', this._storageHandler);
    } else {
      this._localStorage = new _MemoryStorage2.default();
    }
  }

  (0, _createClass3.default)(SynchronizedStorage, [{
    key: 'getLocalStorageKeys',
    value: function getLocalStorageKeys() {
      var len = this._localStorage.length;
      var keys = [];
      for (var i = 0; i < len; i += 1) {
        var key = this._localStorage.key(i);
        if (key && key !== '') {
          keys.push(key);
        }
      }
      return keys;
    }
  }, {
    key: 'getData',
    value: function getData() {
      var _this2 = this;

      var output = {};
      this.getLocalStorageKeys().forEach(function (key) {
        if (key.substring(0, _this2._storageKey.length) === _this2._storageKey) {
          var dataKey = key.substring(_this2._storageKey.length + 1);
          output[dataKey] = _this2.getItem(dataKey);
        }
      });
      return output;
    }
  }, {
    key: 'getItem',
    value: function getItem(key) {
      try {
        var _JSON$parse2 = JSON.parse(this._localStorage.getItem(this._storageKey + '-' + key)),
            value = _JSON$parse2.value;

        return value;
      } catch (error) {
        return undefined;
      }
    }
  }, {
    key: 'setItem',
    value: function setItem(key, value) {
      this._localStorage.setItem(this._storageKey + '-' + key, (0, _stringify2.default)({
        value: value,
        setter: this.id
      }));
    }
  }, {
    key: 'removeItem',
    value: function removeItem(key) {
      this._localStorage.removeItem(this._storageKey + '-' + key);
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      if (this._storageHandler) {
        window.removeEventListener('storage', this._storageHandler);
      }
    }
  }, {
    key: 'id',
    get: function get() {
      return this._id;
    }
  }]);
  return SynchronizedStorage;
}();

exports.default = SynchronizedStorage;


(0, _eventEmitter2.default)(SynchronizedStorage.prototype);
//# sourceMappingURL=SynchronizedStorage.js.map
