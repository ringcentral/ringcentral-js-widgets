"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DateTimeFormat = void 0;
require("core-js/modules/es.function.name.js");
var _getIntlDateTimeFormatter = _interopRequireDefault(require("@ringcentral-integration/commons/lib/getIntlDateTimeFormatter"));
var _nextCore = require("@ringcentral-integration/next-core");
var _Locale = require("../Locale");
var _dec, _dec2, _dec3, _dec4, _class;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
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
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
var DateTimeFormat = exports.DateTimeFormat = (_dec = (0, _nextCore.injectable)({
  name: 'DateTimeFormat'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)('DateTimeFormatOptions')(target, undefined, 2);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _Locale.Locale === "undefined" ? Object : _Locale.Locale, typeof _nextCore.PortManager === "undefined" ? Object : _nextCore.PortManager, typeof DateTimeFormatOptions === "undefined" ? Object : DateTimeFormatOptions]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = /*#__PURE__*/function (_RcModule) {
  function DateTimeFormat(_locale, _portManager, _dateTimeFormatOptions) {
    var _this;
    _classCallCheck(this, DateTimeFormat);
    _this = _callSuper(this, DateTimeFormat);
    _this._locale = _locale;
    _this._portManager = _portManager;
    _this._dateTimeFormatOptions = _dateTimeFormatOptions;
    _this._formatters = {};
    _this._defaultFormatter = void 0;
    _this._portManager.onClient(function () {
      return (0, _nextCore.subscribe)(_this, function () {
        _this.setDefaultFormatter();
      });
    });
    return _this;
  }
  _inherits(DateTimeFormat, _RcModule);
  return _createClass(DateTimeFormat, [{
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
      var _this$_defaultFormatt;
      var name = _ref2.name,
        utcTimestamp = _ref2.utcTimestamp,
        _ref2$locale = _ref2.locale,
        locale = _ref2$locale === void 0 ? this._locale.currentLocale : _ref2$locale,
        type = _ref2.type;
      if (name && typeof this._formatters[name] === 'function') {
        return this._formatters[name]({
          utcTimestamp: utcTimestamp,
          locale: locale,
          type: type
        });
      }
      return (_this$_defaultFormatt = this._defaultFormatter) === null || _this$_defaultFormatt === void 0 ? void 0 : _this$_defaultFormatt.call(this, {
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
}(_nextCore.RcModule)) || _class) || _class) || _class) || _class);
//# sourceMappingURL=DateTimeFormat.js.map
