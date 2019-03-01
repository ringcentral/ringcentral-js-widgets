"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.object.define-property");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.for-each");

var _uuid = _interopRequireDefault(require("uuid"));

var _eventEmitter = _interopRequireDefault(require("event-emitter"));

var _MemoryStorage = _interopRequireDefault(require("./MemoryStorage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// TODO: experiment with a managed list of keys to watch rather than matching every event with
// storageKey might provide better performance
var SynchronizedStorage =
/*#__PURE__*/
function () {
  function SynchronizedStorage(_ref) {
    var _this = this;

    var storageKey = _ref.storageKey;

    _classCallCheck(this, SynchronizedStorage);

    if (!storageKey) {
      throw Error('SynchronizedStorage must be created with a storage key');
    }

    this._storageKey = storageKey;
    this._id = _uuid.default.v4();

    if (typeof localStorage !== 'undefined' && typeof window !== 'undefined') {
      this._storageHandler = function (event) {
        if (event.key !== null && typeof event.key !== 'undefined' && event.key.substring(0, _this._storageKey.length) === _this._storageKey) {
          try {
            var _JSON$parse = JSON.parse(event.newValue),
                setter = _JSON$parse.setter,
                value = _JSON$parse.value;

            if (setter && setter !== _this.id) {
              var key = event.key.substring(_this._storageKey.length + 1); // fire storage event directly from the native event
              // may reduce the chance of failing to get updated data
              // if there is heavy localStorage load

              _this.emit('storage', {
                key: key,
                value: value
              }); // It seems that IE11 does not update the actual localStorage object
              // in the same event cycle...
              // setTimeout(() => {
              //   this.emit('storage', {
              //     key,
              //     value: this.getItem(key),
              //   });
              // }, 0);

            }
          } catch (error) {
            /* ignore error */
          }
        }
      };

      this._localStorage = localStorage;
      window.addEventListener('storage', this._storageHandler);
    } else {
      this._localStorage = new _MemoryStorage.default();
    }
  }

  _createClass(SynchronizedStorage, [{
    key: "getLocalStorageKeys",
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
    key: "getData",
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
    key: "getItem",
    value: function getItem(key) {
      try {
        var _JSON$parse2 = JSON.parse(this._localStorage.getItem("".concat(this._storageKey, "-").concat(key))),
            value = _JSON$parse2.value;

        return value;
      } catch (error) {
        return undefined;
      }
    }
  }, {
    key: "setItem",
    value: function setItem(key, value) {
      this._localStorage.setItem("".concat(this._storageKey, "-").concat(key), JSON.stringify({
        value: value,
        setter: this.id
      }));
    }
  }, {
    key: "removeItem",
    value: function removeItem(key) {
      this._localStorage.removeItem("".concat(this._storageKey, "-").concat(key));
    }
  }, {
    key: "destroy",
    value: function destroy() {
      if (this._storageHandler) {
        window.removeEventListener('storage', this._storageHandler);
      }
    }
  }, {
    key: "id",
    get: function get() {
      return this._id;
    }
  }]);

  return SynchronizedStorage;
}();

exports.default = SynchronizedStorage;
(0, _eventEmitter.default)(SynchronizedStorage.prototype);
//# sourceMappingURL=SynchronizedStorage.js.map
