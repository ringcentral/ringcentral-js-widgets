"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.find");
require("core-js/modules/es.object.get-own-property-descriptor");
require("core-js/modules/es.string.trim");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RegionSettings = void 0;
require("regenerator-runtime/runtime");
var _core = require("@ringcentral-integration/core");
var _libphonenumberJs = require("libphonenumber-js");
var _ramda = require("ramda");
var _di = require("../../lib/di");
var _proxify = require("../../lib/proxy/proxify");
var _validateAreaCode = _interopRequireDefault(require("../../lib/validateAreaCode"));
var _regionSettingsMessages = require("./regionSettingsMessages");
var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _createSuper(t) { var r = _isNativeReflectConstruct(); return function () { var e, o = _getPrototypeOf(t); if (r) { var s = _getPrototypeOf(this).constructor; e = Reflect.construct(o, arguments, s); } else e = o.apply(this, arguments); return _possibleConstructorReturn(this, e); }; }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
var RegionSettings = (_dec = (0, _di.Module)({
  name: 'RegionSettings',
  deps: ['Brand', 'Alert', 'DialingPlan', 'ExtensionInfo', 'Storage', 'ExtensionPhoneNumber', 'AppFeatures', 'ExtensionNumberAreaCode', {
    dep: 'TabManager',
    optional: true
  }, {
    dep: 'RegionSettingsOptions',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (that) {
  return [that._deps.dialingPlan.plans, that._deps.extensionInfo.country];
}), _dec3 = (0, _core.computed)(function (_ref) {
  var availableCountries = _ref.availableCountries;
  return [availableCountries];
}), _dec4 = (0, _core.computed)(function (_ref2) {
  var availableCountries = _ref2.availableCountries,
    countryCode = _ref2.countryCode;
  return [availableCountries, countryCode];
}), _dec5 = (0, _core.computed)(function (that) {
  return [that.areaCode, that.countryCode, that._deps.appFeatures.isEDPEnabled, that._deps.extensionNumberAreaCode.defaultAreaCode];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  _inherits(RegionSettings, _RcModuleV);
  var _super = _createSuper(RegionSettings);
  function RegionSettings(deps) {
    var _this;
    _classCallCheck(this, RegionSettings);
    _this = _super.call(this, {
      deps: deps,
      enableCache: true,
      storageKey: 'RegionSettings'
    });
    _initializerDefineProperty(_this, "data", _descriptor, _assertThisInitialized(_this));
    return _this;
  }
  _createClass(RegionSettings, [{
    key: "_setData",
    value: function _setData(_ref3) {
      var _ref3$countryCode = _ref3.countryCode,
        countryCode = _ref3$countryCode === void 0 ? this.data.countryCode : _ref3$countryCode,
        _ref3$areaCode = _ref3.areaCode,
        areaCode = _ref3$areaCode === void 0 ? this.data.areaCode : _ref3$areaCode;
      this.data.countryCode = countryCode;
      this.data.areaCode = areaCode;
    }
  }, {
    key: "onInitOnce",
    value: function onInitOnce() {
      var _this2 = this;
      (0, _core.watch)(this, function () {
        return _this2.availableCountries;
      }, function () {
        if (_this2.ready && (!_this2._deps.tabManager || _this2._deps.tabManager.active)) {
          _this2.checkRegionSettings();
        }
      });
    }
  }, {
    key: "onInit",
    value: function onInit() {
      if (!this._deps.tabManager || this._deps.tabManager.active) {
        this.checkRegionSettings();
      }
    }
  }, {
    key: "_alertSettingsChanged",
    value: function _alertSettingsChanged() {
      this._deps.alert.warning({
        allowDuplicates: false,
        message: _regionSettingsMessages.regionSettingsMessages.dialingPlansChanged,
        ttl: 0
      });
    }
  }, {
    key: "checkRegionSettings",
    value: function () {
      var _checkRegionSettings = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _this3 = this;
        var countryCode, _this$_deps$brand$bra, _this$_deps$regionSet, country, isEDPEnabled;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                countryCode = this.countryCode;
                if (countryCode && !(0, _ramda.find)(function (plan) {
                  return plan.isoCode === countryCode;
                }, this.availableCountries)) {
                  countryCode = null;
                  if (((_this$_deps$brand$bra = this._deps.brand.brandConfig) === null || _this$_deps$brand$bra === void 0 ? void 0 : _this$_deps$brand$bra.allowRegionSettings) && !((_this$_deps$regionSet = this._deps.regionSettingsOptions) === null || _this$_deps$regionSet === void 0 ? void 0 : _this$_deps$regionSet.suppressSettingsChangedWarning)) {
                    this._alertSettingsChanged();
                  }
                }
                if (!countryCode) {
                  country = (0, _ramda.find)(function (plan) {
                    return plan.isoCode === _this3._deps.extensionInfo.country.isoCode;
                  }, this.availableCountries) || this.availableCountries[0];
                  this._setData({
                    countryCode: country === null || country === void 0 ? void 0 : country.isoCode,
                    areaCode: ''
                  });
                }
                isEDPEnabled = this._deps.appFeatures.isEDPEnabled;
                if (isEDPEnabled && (0, _ramda.includes)(this.countryCode, ['US', 'PR', 'CA'])) {
                  this._setData({
                    areaCode: ''
                  });
                }
              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function checkRegionSettings() {
        return _checkRegionSettings.apply(this, arguments);
      }
      return checkRegionSettings;
    }()
  }, {
    key: "setData",
    value: function () {
      var _setData2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref4) {
        var areaCode, countryCode, isEDPEnabled;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                areaCode = _ref4.areaCode, countryCode = _ref4.countryCode;
                isEDPEnabled = this._deps.appFeatures.isEDPEnabled;
                if (!(!isEDPEnabled && !(0, _validateAreaCode["default"])(areaCode))) {
                  _context2.next = 5;
                  break;
                }
                this._deps.alert.danger({
                  message: _regionSettingsMessages.regionSettingsMessages.areaCodeInvalid
                });
                return _context2.abrupt("return");
              case 5:
                this._setData({
                  countryCode: countryCode,
                  areaCode: areaCode && areaCode.trim()
                });
                this._deps.alert.success({
                  message: _regionSettingsMessages.regionSettingsMessages.saveSuccess
                });
              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
      function setData(_x) {
        return _setData2.apply(this, arguments);
      }
      return setData;
    }()
  }, {
    key: "setCountryCode",
    value: function setCountryCode(countryCode) {
      this.setData({
        countryCode: countryCode
      });
    }
  }, {
    key: "setAreaCode",
    value: function setAreaCode(areaCode) {
      this.setData({
        areaCode: areaCode
      });
    }
  }, {
    key: "countryCode",
    get: function get() {
      return this.data.countryCode || this._deps.extensionInfo.isoCode || 'US';
    }
  }, {
    key: "areaCode",
    get: function get() {
      return this.data.areaCode || '';
    }
  }, {
    key: "availableCountries",
    get: function get() {
      var plans = this._deps.dialingPlan.plans;
      var country = this._deps.extensionInfo.country;
      if (plans && plans.length > 0) {
        return plans;
      }
      return country ? [country] : [];
    }
  }, {
    key: "showRegionSettings",
    get: function get() {
      var allowRegionSettings = !!this._deps.brand.brandConfig.allowRegionSettings;
      var hasMultiplePlans = this.availableCountries.length > 1;
      var isUSOrCA = this.availableCountries.length === 1 && (this.availableCountries[0].isoCode === 'US' || this.availableCountries[0].isoCode === 'CA');
      var isEDPEnabled = this._deps.appFeatures.isEDPEnabled;
      return allowRegionSettings && (hasMultiplePlans || isEDPEnabled || isUSOrCA);
    }
  }, {
    key: "homeCountryId",
    get: function get() {
      var _this4 = this;
      var homeCountry = this.availableCountries.find(function (country) {
        return country.isoCode === _this4.countryCode;
      });
      var homeCountryId = homeCountry && homeCountry.id || '1';
      return homeCountryId;
    }
  }, {
    key: "defaultAreaCode",
    get: function get() {
      var isEDPEnabled = this._deps.appFeatures.isEDPEnabled;
      if (isEDPEnabled && (0, _ramda.includes)(this.countryCode, ['US', 'PR', 'CA'])) {
        return;
      }
      if (this.areaCode) {
        return this.areaCode;
      }
      var callingCode = (0, _libphonenumberJs.getCountryCallingCode)(this.countryCode);
      var _this$_deps$extension = this._deps.extensionPhoneNumber,
        primaryNumber = _this$_deps$extension.primaryNumber,
        mainCompanyNumber = _this$_deps$extension.mainCompanyNumber;
      var mainNumberCallingCode = (mainCompanyNumber === null || mainCompanyNumber === void 0 ? void 0 : mainCompanyNumber.phoneNumber) && (0, _libphonenumberJs.parsePhoneNumber)(mainCompanyNumber.phoneNumber).countryCallingCode;
      var primaryNumberCallingCode = (primaryNumber === null || primaryNumber === void 0 ? void 0 : primaryNumber.phoneNumber) && (0, _libphonenumberJs.parsePhoneNumber)(primaryNumber.phoneNumber).countryCallingCode;
      var canUseExtensionAreaCode = primaryNumberCallingCode === callingCode || mainNumberCallingCode === callingCode;
      if (canUseExtensionAreaCode) {
        return this._deps.extensionNumberAreaCode.defaultAreaCode;
      }
    }
  }]);
  return RegionSettings;
}(_core.RcModuleV2), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "data", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this$_deps$extension2;
    return {
      countryCode: ((_this$_deps$extension2 = this._deps.extensionInfo) === null || _this$_deps$extension2 === void 0 ? void 0 : _this$_deps$extension2.isoCode) || '',
      areaCode: ''
    };
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_setData", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setData"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "availableCountries", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "availableCountries"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "checkRegionSettings", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "checkRegionSettings"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setData", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "setData"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "showRegionSettings", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "showRegionSettings"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "homeCountryId", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "homeCountryId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "defaultAreaCode", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "defaultAreaCode"), _class2.prototype)), _class2)) || _class);
exports.RegionSettings = RegionSettings;
//# sourceMappingURL=RegionSettings.js.map
