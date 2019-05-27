"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.function.name");

var _RcModule2 = _interopRequireDefault(require("../RcModule"));

var _di = require("../di");

var _Enum = require("../Enum");

var _SynchronizedStorage = _interopRequireDefault(require("../../lib/SynchronizedStorage"));

var _actionTypesBase = _interopRequireDefault(require("./actionTypesBase"));

var _moduleStatuses = _interopRequireDefault(require("../../enums/moduleStatuses"));

var _getStorageReducer = _interopRequireDefault(require("./getStorageReducer"));

var _dec, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var StorageBase = (
/**
 * @class
 * @description Alternative implementation of the Storage class.
 *  Allows registeration of reducers so that persisted states can be computed with reducers.
 */
_dec = (0, _di.Library)({
  deps: [{
    dep: 'StorageBaseOptions',
    optional: true
  }]
}), _dec(_class =
/*#__PURE__*/
function (_RcModule) {
  _inherits(StorageBase, _RcModule);

  function StorageBase(_ref) {
    var _this;

    var name = _ref.name,
        _ref$actionTypes = _ref.actionTypes,
        actionTypes = _ref$actionTypes === void 0 ? (0, _Enum.prefixEnum)({
      enumMap: _actionTypesBase["default"],
      prefix: name
    }) : _ref$actionTypes,
        _ref$StorageProvider = _ref.StorageProvider,
        StorageProvider = _ref$StorageProvider === void 0 ? _SynchronizedStorage["default"] : _ref$StorageProvider,
        options = _objectWithoutProperties(_ref, ["name", "actionTypes", "StorageProvider"]);

    _classCallCheck(this, StorageBase);

    if (!name) {
      throw new Error('name must be defined');
    }

    _this = _possibleConstructorReturn(this, _getPrototypeOf(StorageBase).call(this, _objectSpread({}, options, {
      actionTypes: actionTypes
    })));
    _this._StorageProvider = StorageProvider;
    _this._reducers = {};
    _this._reducer = (0, _getStorageReducer["default"])({
      types: _this.actionTypes,
      reducers: _this._reducers
    });
    return _this;
  }

  _createClass(StorageBase, [{
    key: "registerReducer",
    value: function registerReducer(_ref2) {
      var key = _ref2.key,
          reducer = _ref2.reducer;

      if (this._initialized) {
        throw new Error('Reducers must be registered before initialize');
      }

      if (this._reducers[key]) {
        throw new Error("Reducer of key: '".concat(key, "' already exists"));
      }

      this._reducers[key] = reducer;
    }
  }, {
    key: "getItem",
    value: function getItem(key) {
      return this.state.data[key];
    }
  }, {
    key: "data",
    get: function get() {
      return this.state.data;
    }
  }, {
    key: "status",
    get: function get() {
      return this.state.status;
    }
  }, {
    key: "storageKey",
    get: function get() {
      return this.state.storageKey;
    }
  }, {
    key: "ready",
    get: function get() {
      return this.status === _moduleStatuses["default"].ready;
    }
  }]);

  return StorageBase;
}(_RcModule2["default"])) || _class);
exports["default"] = StorageBase;
//# sourceMappingURL=index.js.map
