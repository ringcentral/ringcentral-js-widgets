"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.assign");

var _di = require("../../lib/di");

var _StorageBase2 = _interopRequireDefault(require("../../lib/StorageBase"));

var _moduleStatuses = _interopRequireDefault(require("../../enums/moduleStatuses"));

var _dec, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var GlobalStorage = (
/**
 * @class
 * @description Alternative implementation of the Storage class.
 *  Allows registeration of reducers so that persisted states can be computed with reducers.
 */
_dec = (0, _di.Module)({
  deps: [{
    dep: 'GlobalStorageOptions',
    optional: true
  }]
}), _dec(_class =
/*#__PURE__*/
function (_StorageBase) {
  _inherits(GlobalStorage, _StorageBase);

  /**
   * @constructor
   */
  function GlobalStorage(_ref) {
    var options = Object.assign({}, _ref);

    _classCallCheck(this, GlobalStorage);

    return _possibleConstructorReturn(this, _getPrototypeOf(GlobalStorage).call(this, _objectSpread({
      name: 'globalStorage'
    }, options)));
  }

  _createClass(GlobalStorage, [{
    key: "initialize",
    value: function initialize() {
      var _this = this;

      var storedData = null;
      var storageKey = "".concat(this.prefix ? "".concat(this.prefix, "-") : '', "GlobalStorage");
      this._storage = new this._StorageProvider({
        storageKey: storageKey
      });
      storedData = this._storage.getData();

      for (var key in storedData) {
        if (!this._reducers[key]) {
          delete storedData[key];

          this._storage.removeItem(key);
        }
      }

      this.store.dispatch({
        type: this.actionTypes.initSuccess,
        storageKey: storageKey,
        data: storedData
      });

      this._storageHandler = function (_ref2) {
        var key = _ref2.key,
            value = _ref2.value;

        if (_this.ready) {
          storedData[key] = value;

          _this.store.dispatch({
            type: _this.actionTypes.sync,
            key: key,
            value: value
          });
        }
      };

      this._storage.on('storage', this._storageHandler);

      this.store.subscribe(function () {
        if (_this.status !== _moduleStatuses["default"].pending) {
          // save new data to storage when changed
          var currentData = _this.data;

          for (var _key in currentData) {
            if (storedData[_key] !== currentData[_key]) {
              _this._storage.setItem(_key, currentData[_key]);

              storedData[_key] = currentData[_key];
            }
          }
        }
      });
    }
  }]);

  return GlobalStorage;
}(_StorageBase2["default"])) || _class);
exports["default"] = GlobalStorage;
//# sourceMappingURL=index.js.map
