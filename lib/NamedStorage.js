"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.define-property");

var _symbolMap = _interopRequireDefault(require("data-types/symbol-map"));

var _uuid = _interopRequireDefault(require("uuid"));

var _Subscribable2 = _interopRequireDefault(require("./Subscribable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MemoryStorage =
/*#__PURE__*/
function () {
  function MemoryStorage() {
    _classCallCheck(this, MemoryStorage);
  }

  _createClass(MemoryStorage, [{
    key: "getItem",
    value: function getItem() {
      return this.data;
    }
  }, {
    key: "setItem",
    value: function setItem(key, data) {
      this.data = data;
    }
  }]);

  return MemoryStorage;
}();

var NamedStorage =
/*#__PURE__*/
function (_Subscribable) {
  _inherits(NamedStorage, _Subscribable);

  function NamedStorage(_ref) {
    var _this;

    var storageKey = _ref.storageKey;

    _classCallCheck(this, NamedStorage);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(NamedStorage).call(this));

    if (!storageKey) {
      throw Error('NameLocalStorage must be created with a storage key');
    }

    _this._storageKey = storageKey;
    _this._id = _uuid.default.v4();

    if (typeof localStorage !== 'undefined' && typeof window !== 'undefined') {
      _this._storageHandler = function (event) {
        if (event.key === _this._storageKey) {
          try {
            var _JSON$parse = JSON.parse(event.newValue),
                setter = _JSON$parse.setter,
                data = _JSON$parse.data;

            if (setter && setter !== _this.id) {
              _this.trigger(data);
            }
          } catch (e) {
            /* ignore error */
          }
        }
      };

      _this._localStorage = localStorage;
      window.addEventListener('storage', _this._storageHandler);
    } else {
      _this._localStorage = new MemoryStorage();
    }

    return _this;
  }

  _createClass(NamedStorage, [{
    key: "getData",
    value: function getData() {
      try {
        var _JSON$parse2 = JSON.parse(this._localStorage.getItem(this._storageKey)),
            data = _JSON$parse2.data;

        return data || {};
      } catch (e) {
        /* ignore error */
        return {};
      }
    }
  }, {
    key: "setData",
    value: function setData(data) {
      this._localStorage.setItem(this._storageKey, JSON.stringify({
        setter: this.id,
        data: data
      }));
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

  return NamedStorage;
}(_Subscribable2.default);

exports.default = NamedStorage;
//# sourceMappingURL=NamedStorage.js.map
