"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.function.name");

var _di = require("../../lib/di");

var _ensureExist = _interopRequireDefault(require("../../lib/ensureExist"));

var _getIntlDateTimeFormatter = _interopRequireDefault(require("../../lib/getIntlDateTimeFormatter"));

var _RcModule2 = _interopRequireDefault(require("../../lib/RcModule"));

var _actionTypes = _interopRequireDefault(require("./actionTypes"));

var _getDateTimeFormatReducer = _interopRequireDefault(require("./getDateTimeFormatReducer"));

var _getProxyReducer = _interopRequireDefault(require("./getProxyReducer"));

var _dec, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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

var DateTimeFormat = (
/**
 * @class DateTimeFormat
 * @description Simple date and time formatting manager.
 */
_dec = (0, _di.Module)({
  deps: ['Locale', {
    dep: 'DateTimeFormatOptions',
    optional: true
  }]
}), _dec(_class = /*#__PURE__*/function (_RcModule) {
  _inherits(DateTimeFormat, _RcModule);

  var _super = _createSuper(DateTimeFormat);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Locale} params.locale - locale module instance
   */
  function DateTimeFormat(_ref) {
    var _this;

    var locale = _ref.locale,
        options = _objectWithoutProperties(_ref, ["locale"]);

    _classCallCheck(this, DateTimeFormat);

    _this = _super.call(this, _objectSpread(_objectSpread({}, options), {}, {
      actionTypes: _actionTypes["default"]
    }));
    _this._locale = (0, _ensureExist["default"])(locale, 'locale');
    _this._reducer = (0, _getDateTimeFormatReducer["default"])(_this.actionTypes);
    _this._proxyReducer = (0, _getProxyReducer["default"])(_this.actionTypes);
    _this._formatters = {};
    return _this;
  }

  _createClass(DateTimeFormat, [{
    key: "_shouldInit",
    value: function _shouldInit() {
      return this.pending && this._locale.ready;
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return this.ready && !this._locale.ready;
    }
  }, {
    key: "_onStateChange",
    value: function _onStateChange() {
      if (this._shouldInit()) {
        this.store.dispatch({
          type: this.actionTypes.init
        });

        if (!this._defaultFormatter) {
          this._defaultFormatter = (0, _getIntlDateTimeFormatter["default"])();
        }

        this.store.dispatch({
          type: this.actionTypes.initSuccess
        });
      } else if (this._shouldReset()) {
        this.store.dispatch({
          type: this.actionTypes.reset
        });
        this._formatters = {};
        this.store.dispatch({
          type: this.actionTypes.resetSuccess
        });
      }
    }
  }, {
    key: "initialize",
    value: function initialize() {
      var _this2 = this;

      this.store.subscribe(function () {
        return _this2._onStateChange();
      });
    }
  }, {
    key: "initializeProxy",
    value: function initializeProxy() {
      var _this3 = this;

      this.store.subscribe(function () {
        if (_this3.proxyPending && _this3._locale.proxyReady) {
          _this3.store.dispatch({
            type: _this3.actionTypes.proxyInit
          });

          if (!_this3._defaultFormatter) {
            _this3._defaultFormatter = (0, _getIntlDateTimeFormatter["default"])();
          }

          _this3.store.dispatch({
            type: _this3.actionTypes.proxyInitSuccess
          });
        }
      });
    }
  }, {
    key: "addFormatter",
    value: function addFormatter(_ref2) {
      var name = _ref2.name,
          formatter = _ref2.formatter;

      if (!name) {
        throw new Error('`name` property cannot be empty.');
      }

      if (this._formatters[name]) {
        throw new Error("A formatter with the same name: ".concat(name, " already exists."));
      }

      if (typeof formatter !== 'function') {
        throw new Error('formatter must be a function.');
      }

      this._formatters[name] = formatter;
    }
  }, {
    key: "formatDateTime",
    value: function formatDateTime(_ref3) {
      var name = _ref3.name,
          utcTimestamp = _ref3.utcTimestamp,
          _ref3$locale = _ref3.locale,
          locale = _ref3$locale === void 0 ? this._locale.currentLocale : _ref3$locale,
          type = _ref3.type;

      if (name && typeof this._formatters[name] === 'function') {
        return this._formatters[name]({
          utcTimestamp: utcTimestamp,
          locale: locale,
          type: type
        });
      }

      return this._defaultFormatter({
        utcTimestamp: utcTimestamp,
        locale: locale,
        type: type
      });
    }
  }, {
    key: "formatDate",
    value: function formatDate(_ref4) {
      var name = _ref4.name,
          utcTimestamp = _ref4.utcTimestamp,
          locale = _ref4.locale;
      return this.formatDateTime({
        name: name,
        utcTimestamp: utcTimestamp,
        locale: locale,
        type: 'date'
      });
    }
  }, {
    key: "formatTime",
    value: function formatTime(_ref5) {
      var name = _ref5.name,
          utcTimestamp = _ref5.utcTimestamp,
          locale = _ref5.locale;
      return this.formatDateTime({
        name: name,
        utcTimestamp: utcTimestamp,
        locale: locale,
        type: 'time'
      });
    }
  }, {
    key: "status",
    get: function get() {
      return this.proxyState && this.proxyState.status || this.state.status;
    }
  }, {
    key: "proxyStatus",
    get: function get() {
      return this.proxyState.status;
    }
  }]);

  return DateTimeFormat;
}(_RcModule2["default"])) || _class);
exports["default"] = DateTimeFormat;
//# sourceMappingURL=index.js.map
