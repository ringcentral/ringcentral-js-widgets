'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _subscribable = require('./subscribable');

var _subscribable2 = _interopRequireDefault(_subscribable);

var _symbolMap = require('data-types/symbol-map');

var _symbolMap2 = _interopRequireDefault(_symbolMap);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var symbols = new _symbolMap2.default(['key', 'localStorage', 'handler', 'id']);

var MemoryStorage = function () {
  function MemoryStorage() {
    (0, _classCallCheck3.default)(this, MemoryStorage);
  }

  (0, _createClass3.default)(MemoryStorage, [{
    key: 'getItem',
    value: function getItem() {
      return this.data;
    }
  }, {
    key: 'setItem',
    value: function setItem(key, data) {
      this.data = data;
    }
  }]);
  return MemoryStorage;
}();

var NamedStorage = function (_Subscribable) {
  (0, _inherits3.default)(NamedStorage, _Subscribable);

  function NamedStorage(_ref) {
    var key = _ref.key;
    (0, _classCallCheck3.default)(this, NamedStorage);

    var _this = (0, _possibleConstructorReturn3.default)(this, (NamedStorage.__proto__ || (0, _getPrototypeOf2.default)(NamedStorage)).call(this));

    if (!key) {
      throw Error('NameLocalStorage must be created with a key');
    }
    _this[symbols.key] = key;
    _this[symbols.id] = _uuid2.default.v4();
    if (typeof localStorage !== 'undefined' && typeof window !== 'undefined') {
      _this[symbols.handler] = function (event) {
        if (event.key === _this[symbols.key]) {
          try {
            var _JSON$parse = JSON.parse(event.newValue);

            var setter = _JSON$parse.setter;
            var data = _JSON$parse.data;

            if (setter && setter !== _this.id) {
              _this.trigger(data);
            }
          } catch (e) {
            /* ignore error */
          }
        }
      };
      _this[symbols.localStorage] = localStorage;
      window.addEventListener('storage', _this[symbols.handler]);
    } else {
      _this[symbols.localStorage] = new MemoryStorage();
    }
    return _this;
  }

  (0, _createClass3.default)(NamedStorage, [{
    key: 'getData',
    value: function getData() {
      try {
        var _JSON$parse2 = JSON.parse(this[symbols.localStorage].getItem(this[symbols.key]));

        var data = _JSON$parse2.data;

        return data;
      } catch (e) {
        /* ignore error */
        return undefined;
      }
    }
  }, {
    key: 'setData',
    value: function setData(data) {
      this[symbols.localStorage].setItem(this[symbols.key], (0, _stringify2.default)({
        setter: this.id,
        data: data
      }));
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      if (this[symbols.handler]) {
        window.removeEventListener('storage', this[symbols.handler]);
      }
    }
  }, {
    key: 'id',
    get: function get() {
      return this[symbols.id];
    }
  }]);
  return NamedStorage;
}(_subscribable2.default);

exports.default = NamedStorage;
//# sourceMappingURL=named-storage.js.map
