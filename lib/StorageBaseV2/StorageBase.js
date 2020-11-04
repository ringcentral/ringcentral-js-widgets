"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StorageBase = void 0;

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.reflect.get");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.function.name");

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

var _core = require("@ringcentral-integration/core");

var _SynchronizedStorage = require("../SynchronizedStorage");

var _actionTypesBase = require("./actionTypesBase");

var _getStorageReducer = require("./getStorageReducer");

var _di = require("../di");

var _getModuleStatusReducer = _interopRequireDefault(require("../getModuleStatusReducer"));

var _dec, _class, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var StorageBase = (_dec = (0, _di.Module)({
  name: 'StorageBase',
  deps: [{
    dep: 'Prefix',
    optional: true
  }]
}), _dec(_class = (_temp = /*#__PURE__*/function (_RcModuleV) {
  _inherits(StorageBase, _RcModuleV);

  var _super = _createSuper(StorageBase);

  function StorageBase(deps, storageBaseOptions) {
    var _storageBaseOptions$S;

    var _this;

    _classCallCheck(this, StorageBase);

    _this = _super.call(this, {
      deps: deps
    });
    _this._storage = void 0;
    _this._storageReducers = {};
    _this._storageReducer = void 0;
    _this._StorageProvider = void 0;
    _this._storageActionTypes = void 0;

    if (!storageBaseOptions.name) {
      throw new Error('name must be defined');
    }

    _this._StorageProvider = (_storageBaseOptions$S = storageBaseOptions.StorageProvider) !== null && _storageBaseOptions$S !== void 0 ? _storageBaseOptions$S : _SynchronizedStorage.SynchronizedStorage;
    _this._storageActionTypes = _ObjectMap.ObjectMap.prefixKeys(_toConsumableArray(_ObjectMap.ObjectMap.keys(_actionTypesBase.actionTypesBase)), storageBaseOptions.name);
    _this._storageReducer = (0, _getStorageReducer.getDataReducer)({
      types: _this._storageActionTypes,
      reducers: _this._storageReducers
    });
    return _this;
  }

  _createClass(StorageBase, [{
    key: "getReducers",
    value: function getReducers(actionTypes) {
      return _objectSpread(_objectSpread({}, _get(_getPrototypeOf(StorageBase.prototype), "getReducers", this).call(this, actionTypes)), {}, {
        data: this._storageReducer,
        __status__: (0, _getModuleStatusReducer["default"])(this._storageActionTypes)
      });
    }
  }, {
    key: "registerReducer",

    /**
     * register storage reducer
     */
    value: function registerReducer(_ref) {
      var key = _ref.key,
          reducer = _ref.reducer;

      if (this._storageReducers[key]) {
        throw new Error("Reducer of key: '".concat(key, "' already exists"));
      }

      this._storageReducers[key] = reducer;
    }
  }, {
    key: "getItem",
    value: function getItem(key) {
      return this.data[key];
    }
  }, {
    key: "data",
    get: function get() {
      return this._store.getState()[this.__key__].data;
    }
  }, {
    key: "driver",
    get: function get() {
      if (this.ready) {
        return this._storage.driver;
      }

      return null;
    }
  }, {
    key: "prefix",
    get: function get() {
      return this._deps.prefix;
    }
  }]);

  return StorageBase;
}(_core.RcModuleV2), _temp)) || _class);
exports.StorageBase = StorageBase;
//# sourceMappingURL=StorageBase.js.map
