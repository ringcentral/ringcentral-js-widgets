"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SynchronizedStorage = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.date.to-json.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
var _events = require("events");
var _uuid = require("uuid");
var _MemoryStorage = require("./MemoryStorage");
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
// TODO: experiment with a managed list of keys to watch rather than matching every event with
// storageKey might provide better performance
var SynchronizedStorage = exports.SynchronizedStorage = /*#__PURE__*/function (_EventEmitter) {
  function SynchronizedStorage(_ref) {
    var _this;
    var storageKey = _ref.storageKey;
    _classCallCheck(this, SynchronizedStorage);
    _this = _callSuper(this, SynchronizedStorage);
    _this._storageKey = void 0;
    _this._id = void 0;
    _this._localStorage = void 0;
    _this._storageHandler = void 0;
    if (!storageKey) {
      throw Error('SynchronizedStorage must be created with a storage key');
    }
    _this._storageKey = storageKey;
    _this._id = (0, _uuid.v4)();
    if (typeof localStorage !== 'undefined' && typeof window !== 'undefined') {
      _this._storageHandler = function (event) {
        if (event.key !== null && typeof event.key !== 'undefined' && event.key.substring(0, _this._storageKey.length) === _this._storageKey) {
          try {
            var _JSON$parse = JSON.parse(event.newValue),
              setter = _JSON$parse.setter,
              value = _JSON$parse.value;
            if (setter && setter !== _this.id) {
              var key = event.key.substring(_this._storageKey.length + 1);
              // fire storage event directly from the native event
              // may reduce the chance of failing to get updated data
              // if there is heavy localStorage load
              _this.emit('storage', {
                key: key,
                value: value
              });
              // It seems that IE11 does not update the actual localStorage object
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
  _inherits(SynchronizedStorage, _EventEmitter);
  return _createClass(SynchronizedStorage, [{
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
}(_events.EventEmitter);
//# sourceMappingURL=SynchronizedStorage.js.map
