"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.for-each");

var _uuid = _interopRequireDefault(require("uuid"));

var _events = _interopRequireDefault(require("events"));

var _MemoryStorage = _interopRequireDefault(require("./MemoryStorage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

// TODO: experiment with a managed list of keys to watch rather than matching every event with
// storageKey might provide better performance
var SynchronizedStorage =
/*#__PURE__*/
function (_EventEmitter) {
  _inherits(SynchronizedStorage, _EventEmitter);

  function SynchronizedStorage(_ref) {
    var _this;

    var storageKey = _ref.storageKey;

    _classCallCheck(this, SynchronizedStorage);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SynchronizedStorage).call(this));

    if (!storageKey) {
      throw Error('SynchronizedStorage must be created with a storage key');
    }

    _this._storageKey = storageKey;
    _this._id = _uuid.default.v4();

    if (typeof localStorage !== 'undefined' && typeof window !== 'undefined') {
      _this._storageHandler = function (event) {
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

      _this._localStorage = localStorage;
      window.addEventListener('storage', _this._storageHandler);
    } else {
      _this._localStorage = new _MemoryStorage.default();
    }

    return _this;
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
}(_events.default);

exports.default = SynchronizedStorage;
//# sourceMappingURL=SynchronizedStorage.js.map
