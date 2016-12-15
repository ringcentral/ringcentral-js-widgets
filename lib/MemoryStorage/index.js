"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _map = require("babel-runtime/core-js/map");

var _map2 = _interopRequireDefault(_map);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @class
 * @description Simple polyfill of localStorage object for using storageModules in node
 */

var MemoryStorage = function () {
  function MemoryStorage() {
    (0, _classCallCheck3.default)(this, MemoryStorage);

    this._data = new _map2.default();
  }

  (0, _createClass3.default)(MemoryStorage, [{
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
      this._data.delete(key);
    }
  }, {
    key: "key",
    value: function key(idx) {
      return [].concat((0, _toConsumableArray3.default)(this._data.keys()))[idx];
    }
  }, {
    key: "length",
    get: function get() {
      return this._data.size;
    }
  }]);
  return MemoryStorage;
}();

exports.default = MemoryStorage;
//# sourceMappingURL=index.js.map
