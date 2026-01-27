"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NumberFormatter = void 0;
require("core-js/modules/es.object.get-own-property-descriptor.js");
var _formatNumber2 = require("@ringcentral-integration/commons/lib/formatNumber");
var _normalizeNumber2 = require("@ringcentral-integration/commons/lib/normalizeNumber");
var _nextCore = require("@ringcentral-integration/next-core");
var _AccountInfo = require("../AccountInfo");
var _ExtensionInfo = require("../ExtensionInfo");
var _RegionSettings = require("../RegionSettings");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2;
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
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
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
var DEFAULT_MAX_EXT_LENGTH = 7;
var NumberFormatter = exports.NumberFormatter = (_dec = (0, _nextCore.injectable)({
  name: 'NumberFormatter'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)('NumberFormatterOptions')(target, undefined, 3);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _AccountInfo.AccountInfo === "undefined" ? Object : _AccountInfo.AccountInfo, typeof _ExtensionInfo.ExtensionInfo === "undefined" ? Object : _ExtensionInfo.ExtensionInfo, typeof _RegionSettings.RegionSettings === "undefined" ? Object : _RegionSettings.RegionSettings, typeof NumberFormatterOptions === "undefined" ? Object : NumberFormatterOptions]), _dec5 = (0, _nextCore.computed)(function (that) {
  var _that$_extensionInfo$;
  return [that._regionSettings.areaCode, that._regionSettings.countryCode, that.isMultipleSiteEnabled, that.maxExtNumberLength, (_that$_extensionInfo$ = that._extensionInfo.site) === null || _that$_extensionInfo$ === void 0 ? void 0 : _that$_extensionInfo$.code];
}), _dec6 = Reflect.metadata("design:type", Function), _dec7 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (_class2 = /*#__PURE__*/function (_RcModule) {
  function NumberFormatter(_accountInfo, _extensionInfo, _regionSettings, _options) {
    var _this;
    _classCallCheck(this, NumberFormatter);
    _this = _callSuper(this, NumberFormatter);
    _this._accountInfo = _accountInfo;
    _this._extensionInfo = _extensionInfo;
    _this._regionSettings = _regionSettings;
    _this._options = _options;
    return _this;
  }
  _inherits(NumberFormatter, _RcModule);
  return _createClass(NumberFormatter, [{
    key: "maxExtNumberLength",
    get: function get() {
      var _this$_accountInfo$in, _this$_accountInfo$in2, _this$_options;
      return ((_this$_accountInfo$in = this._accountInfo.info) === null || _this$_accountInfo$in === void 0 ? void 0 : (_this$_accountInfo$in2 = _this$_accountInfo$in.limits) === null || _this$_accountInfo$in2 === void 0 ? void 0 : _this$_accountInfo$in2.maxExtensionNumberLength) || ((_this$_options = this._options) === null || _this$_options === void 0 ? void 0 : _this$_options.maxExtensionNumberLength) || DEFAULT_MAX_EXT_LENGTH;
    }
  }, {
    key: "isMultipleSiteEnabled",
    get: function get() {
      var _this$_options$isMult, _this$_options2;
      return (_this$_options$isMult = (_this$_options2 = this._options) === null || _this$_options2 === void 0 ? void 0 : _this$_options2.isMultipleSiteEnabled) !== null && _this$_options$isMult !== void 0 ? _this$_options$isMult : this._extensionInfo.isMultipleSiteEnabled;
    }
  }, {
    key: "formattingParams",
    get: function get() {
      var _this$_extensionInfo$;
      return {
        areaCode: this._regionSettings.areaCode,
        maxExtensionLength: this.maxExtNumberLength,
        countryCode: this._regionSettings.countryCode,
        isMultipleSiteEnabled: this.isMultipleSiteEnabled,
        siteCode: this.isMultipleSiteEnabled ? (_this$_extensionInfo$ = this._extensionInfo.site) === null || _this$_extensionInfo$ === void 0 ? void 0 : _this$_extensionInfo$.code : ''
      };
    }

    /**
     * Format phone numbers into local number format, if you need international format, set international to `true`
     * @param phoneNumber
     * @returns
     */
  }, {
    key: "formatNumber",
    value: function formatNumber() {
      var phoneNumber = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var international = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      return (0, _formatNumber2.formatNumber)(_objectSpread({
        phoneNumber: phoneNumber,
        international: international
      }, this.formattingParams)) || phoneNumber;
    }

    /**
     * Normalize phone numbers into E164 format, if you need to remove extension, set removeExtension to `true`
     */
  }, {
    key: "normalizeNumber",
    value: function normalizeNumber(phoneNumber) {
      var removeExtension = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      return (0, _normalizeNumber2.normalizeNumber)(_objectSpread(_objectSpread({
        phoneNumber: phoneNumber
      }, this.formattingParams), {}, {
        removeExtension: removeExtension
      }));
    }
  }]);
}(_nextCore.RcModule), _applyDecoratedDescriptor(_class2.prototype, "formattingParams", [_dec5, _dec6, _dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "formattingParams"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class);
//# sourceMappingURL=NumberFormatter.js.map
