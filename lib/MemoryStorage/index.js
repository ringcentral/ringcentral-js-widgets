"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.map");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @class
 * @description Simple polyfill of localStorage object for using storageModules in node
 */
var MemoryStorage =
/*#__PURE__*/
function () {
  function MemoryStorage() {
    _classCallCheck(this, MemoryStorage);

    this._data = new Map();
  }

  _createClass(MemoryStorage, [{
    key: "getItem",
    value: function getItem(key) {
      return this._data.get(key);
    }
  }, {
    key: "setItem",
    value: function setItem(key, value) {
      this._data.set(key, value);
    }
  }, {
    key: "removeItem",
    value: function removeItem(key) {
      this._data["delete"](key);
    }
  }, {
    key: "key",
    value: function key(idx) {
      return _toConsumableArray(this._data.keys())[idx];
    }
  }, {
    key: "keys",
    value: function keys() {
      return _toConsumableArray(this._data.keys());
    }
  }, {
    key: "ready",
    value: function ready() {
      return true;
    }
  }, {
    key: "length",
    get: function get() {
      return this._data.size;
    }
  }]);

  return MemoryStorage;
}();

exports["default"] = MemoryStorage;
//# sourceMappingURL=index.js.map
