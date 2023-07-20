"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.function.name");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DateTimeFormat = void 0;
var _core = require("@ringcentral-integration/core");
var _di = require("../../lib/di");
var _getIntlDateTimeFormatter = _interopRequireDefault(require("../../lib/getIntlDateTimeFormatter"));
var _dec, _class;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var DateTimeFormat = (_dec = (0, _di.Module)({
  name: 'DateTimeFormat',
  deps: ['Locale', {
    dep: 'DateTimeFormatOptions',
    optional: true
  }]
}), _dec(_class = /*#__PURE__*/function (_RcModuleV) {
  _inherits(DateTimeFormat, _RcModuleV);
  var _super = _createSuper(DateTimeFormat);
  function DateTimeFormat(deps) {
    var _this;
    _classCallCheck(this, DateTimeFormat);
    _this = _super.call(this, {
      deps: deps
    });
    _this._formatters = {};
    _this._defaultFormatter = void 0;
    return _this;
  }
  _createClass(DateTimeFormat, [{
    key: "setDefaultFormatter",
    value: function setDefaultFormatter() {
      if (!this._defaultFormatter) {
        this._defaultFormatter = (0, _getIntlDateTimeFormatter["default"])();
      }
    }
  }, {
    key: "onInit",
    value: function onInit() {
      this.setDefaultFormatter();
    }
  }, {
    key: "initializeProxy",
    value: function initializeProxy() {
      var _this2 = this;
      this.store.subscribe(function () {
        _this2.setDefaultFormatter();
      });
    }
  }, {
    key: "onReset",
    value: function onReset() {
      this._formatters = {};
    }
  }, {
    key: "addFormatter",
    value: function addFormatter(_ref) {
      var name = _ref.name,
        formatter = _ref.formatter;
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
    value: function formatDateTime(_ref2) {
      var name = _ref2.name,
        utcTimestamp = _ref2.utcTimestamp,
        _ref2$locale = _ref2.locale,
        locale = _ref2$locale === void 0 ? this._deps.locale.currentLocale : _ref2$locale,
        type = _ref2.type;
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
    value: function formatDate(_ref3) {
      var name = _ref3.name,
        utcTimestamp = _ref3.utcTimestamp,
        locale = _ref3.locale;
      return this.formatDateTime({
        name: name,
        utcTimestamp: utcTimestamp,
        locale: locale,
        type: 'date'
      });
    }
  }, {
    key: "formatTime",
    value: function formatTime(_ref4) {
      var name = _ref4.name,
        utcTimestamp = _ref4.utcTimestamp,
        locale = _ref4.locale;
      return this.formatDateTime({
        name: name,
        utcTimestamp: utcTimestamp,
        locale: locale,
        type: 'time'
      });
    }
  }]);
  return DateTimeFormat;
}(_core.RcModuleV2)) || _class);
exports.DateTimeFormat = DateTimeFormat;
//# sourceMappingURL=DateTimeFormat.js.map
