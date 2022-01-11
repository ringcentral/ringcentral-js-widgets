"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.reflect.construct");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SynchronizedStorage = void 0;

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.array.for-each");

var _events = require("events");

var uuid = _interopRequireWildcard(require("uuid"));

var _MemoryStorage = require("./MemoryStorage");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } Object.defineProperty(subClass, "prototype", { value: Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }), writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

// TODO: experiment with a managed list of keys to watch rather than matching every event with
// storageKey might provide better performance
var SynchronizedStorage = /*#__PURE__*/function (_EventEmitter) {
  _inherits(SynchronizedStorage, _EventEmitter);

  var _super = _createSuper(SynchronizedStorage);

  function SynchronizedStorage(_ref) {
    var _this;

    var storageKey = _ref.storageKey;

    _classCallCheck(this, SynchronizedStorage);

    _this = _super.call(this);
    _this._storageKey = void 0;
    _this._id = void 0;
    _this._localStorage = void 0;
    _this._storageHandler = void 0;

    if (!storageKey) {
      throw Error('SynchronizedStorage must be created with a storage key');
    }

    _this._storageKey = storageKey;
    _this._id = uuid.v4();

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
      _this._localStorage = new _MemoryStorage.MemoryStorage();
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
  }, {
    key: "driver",
    get: function get() {
      if (this._localStorage === localStorage) {
        return 'LOCALSTORAGE';
      }

      return 'MEMORYSTORAGE';
    }
  }]);

  return SynchronizedStorage;
}(_events.EventEmitter);

exports.SynchronizedStorage = SynchronizedStorage;
//# sourceMappingURL=SynchronizedStorage.js.map
