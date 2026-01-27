"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RegionSettings = void 0;
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.trim.js");
var _validateAreaCode = _interopRequireDefault(require("@ringcentral-integration/commons/lib/validateAreaCode"));
var _hooks = require("@ringcentral-integration/micro-core/src/app/hooks");
var _services = require("@ringcentral-integration/micro-core/src/app/services");
var _views = require("@ringcentral-integration/micro-core/src/app/views");
var _nextCore = require("@ringcentral-integration/next-core");
var _FormattedMessage = _interopRequireDefault(require("@ringcentral-integration/widgets/components/FormattedMessage"));
var _Link = require("@ringcentral/juno/es6/components/Link/Link.js");
var _libphonenumberJs = require("libphonenumber-js");
var _ramda = require("ramda");
var _react = _interopRequireDefault(require("react"));
var _AppFeatures = require("../AppFeatures");
var _DialingPlan = require("../DialingPlan");
var _ExtensionInfo = require("../ExtensionInfo");
var _ExtensionNumberAreaCode = require("../ExtensionNumberAreaCode");
var _ExtensionPhoneNumber = require("../ExtensionPhoneNumber");
var _i18n = _interopRequireWildcard(require("./i18n"));
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _class, _class2, _descriptor, _descriptor2;
/* eslint-disable react-hooks/rules-of-hooks */
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
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
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
var RegionSettings = exports.RegionSettings = (_dec = (0, _nextCore.injectable)({
  name: 'RegionSettings'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)('RegionSettingsOptions')(target, undefined, 10);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _nextCore.RouterPlugin === "undefined" ? Object : _nextCore.RouterPlugin, typeof _services.Brand === "undefined" ? Object : _services.Brand, typeof _services.ToastManager === "undefined" ? Object : _services.ToastManager, typeof _services.Toast === "undefined" ? Object : _services.Toast, typeof _DialingPlan.DialingPlan === "undefined" ? Object : _DialingPlan.DialingPlan, typeof _ExtensionInfo.ExtensionInfo === "undefined" ? Object : _ExtensionInfo.ExtensionInfo, typeof _nextCore.StoragePlugin === "undefined" ? Object : _nextCore.StoragePlugin, typeof _ExtensionPhoneNumber.ExtensionPhoneNumber === "undefined" ? Object : _ExtensionPhoneNumber.ExtensionPhoneNumber, typeof _AppFeatures.AppFeatures === "undefined" ? Object : _AppFeatures.AppFeatures, typeof _ExtensionNumberAreaCode.ExtensionNumberAreaCode === "undefined" ? Object : _ExtensionNumberAreaCode.ExtensionNumberAreaCode, typeof RegionSettingsOptions === "undefined" ? Object : RegionSettingsOptions]), _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof RegionSettingsData === "undefined" ? Object : RegionSettingsData]), _dec7 = Reflect.metadata("design:type", Function), _dec8 = Reflect.metadata("design:paramtypes", []), _dec9 = (0, _nextCore.delegate)('server'), _dec0 = Reflect.metadata("design:type", Function), _dec1 = Reflect.metadata("design:paramtypes", []), _dec10 = (0, _nextCore.delegate)('server'), _dec11 = Reflect.metadata("design:type", Function), _dec12 = Reflect.metadata("design:paramtypes", [typeof RegionSettingsData === "undefined" ? Object : RegionSettingsData]), _dec13 = Reflect.metadata("design:type", Function), _dec14 = Reflect.metadata("design:paramtypes", []), _dec15 = Reflect.metadata("design:type", Function), _dec16 = Reflect.metadata("design:paramtypes", []), _dec17 = Reflect.metadata("design:type", Function), _dec18 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (_class2 = /*#__PURE__*/function (_RcModule) {
  function RegionSettings(_router, _brand, _toastManager, _toast, _dialingPlan, _extensionInfo, _storage, _extensionPhoneNumber, _appFeatures, _extensionNumberAreaCode, _regionSettingsOptions) {
    var _this;
    _classCallCheck(this, RegionSettings);
    _this = _callSuper(this, RegionSettings);
    _this._router = _router;
    _this._brand = _brand;
    _this._toastManager = _toastManager;
    _this._toast = _toast;
    _this._dialingPlan = _dialingPlan;
    _this._extensionInfo = _extensionInfo;
    _this._storage = _storage;
    _this._extensionPhoneNumber = _extensionPhoneNumber;
    _this._appFeatures = _appFeatures;
    _this._extensionNumberAreaCode = _extensionNumberAreaCode;
    _this._regionSettingsOptions = _regionSettingsOptions;
    _this.uniqueManager = _this._toastManager.createUniqueManager();
    _initializerDefineProperty(_this, "dialingPlansChangedToast", _descriptor, _this);
    _initializerDefineProperty(_this, "data", _descriptor2, _this);
    _this._storage.enable(_this, {
      migrations: [['data', 'RegionSettings-data']]
    });
    return _this;
  }
  _inherits(RegionSettings, _RcModule);
  return _createClass(RegionSettings, [{
    key: "countryCode",
    get: function get() {
      return this.data.countryCode || this._extensionInfo.isoCode || 'US';
    }
  }, {
    key: "areaCode",
    get: function get() {
      return this.data.areaCode || '';
    }
  }, {
    key: "_setData",
    value: function _setData(_ref) {
      var _ref$countryCode = _ref.countryCode,
        countryCode = _ref$countryCode === void 0 ? this.data.countryCode : _ref$countryCode,
        _ref$areaCode = _ref.areaCode,
        areaCode = _ref$areaCode === void 0 ? this.data.areaCode : _ref$areaCode;
      this.data.countryCode = countryCode;
      this.data.areaCode = areaCode;
    }
  }, {
    key: "onInitOnce",
    value: function onInitOnce() {
      var _this2 = this;
      (0, _nextCore.watch)(this, function () {
        return _this2.availableCountries;
      }, function () {
        if (_this2.ready) {
          _this2.checkRegionSettings();
        }
      });
    }
  }, {
    key: "onInit",
    value: function onInit() {
      this.checkRegionSettings();
    }
  }, {
    key: "availableCountries",
    get: function get() {
      var plans = this._dialingPlan.plans;
      var country = this._extensionInfo.country;
      if (plans && plans.length > 0) {
        return plans;
      }
      return country ? [country] : [];
    }
  }, {
    key: "_alertSettingsChanged",
    value: function _alertSettingsChanged() {
      var _this3 = this;
      return this.uniqueManager.unique(function () {
        return _this3._toast.open(_this3.dialingPlansChangedToast);
      });
    }
  }, {
    key: "checkRegionSettings",
    value: function () {
      var _checkRegionSettings = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var _this4 = this;
        var countryCode, _this$_brand$brandCon, _this$_regionSettings, country, isEDPEnabled;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              countryCode = this.countryCode;
              if (countryCode && !(0, _ramda.find)(function (plan) {
                return plan.isoCode === countryCode;
              }, this.availableCountries)) {
                countryCode = null;
                if (((_this$_brand$brandCon = this._brand.brandConfig) === null || _this$_brand$brandCon === void 0 ? void 0 : _this$_brand$brandCon.allowRegionSettings) && !((_this$_regionSettings = this._regionSettingsOptions) === null || _this$_regionSettings === void 0 ? void 0 : _this$_regionSettings.suppressSettingsChangedWarning)) {
                  this._alertSettingsChanged();
                }
              }
              if (!countryCode) {
                country = (0, _ramda.find)(function (plan) {
                  return plan.isoCode === _this4._extensionInfo.country.isoCode;
                }, this.availableCountries) || this.availableCountries[0];
                this._setData({
                  countryCode: country === null || country === void 0 ? void 0 : country.isoCode,
                  areaCode: ''
                });
              }
              isEDPEnabled = this._appFeatures.isEDPEnabled;
              if (isEDPEnabled && (0, _ramda.includes)(this.countryCode, ['US', 'PR', 'CA'])) {
                this._setData({
                  areaCode: ''
                });
              }
            case 1:
              return _context.a(2);
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
      var _setData2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(_ref2) {
        var _ref2$areaCode, areaCode, _ref2$countryCode, countryCode, isEDPEnabled;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              _ref2$areaCode = _ref2.areaCode, areaCode = _ref2$areaCode === void 0 ? this.areaCode : _ref2$areaCode, _ref2$countryCode = _ref2.countryCode, countryCode = _ref2$countryCode === void 0 ? this.countryCode : _ref2$countryCode;
              isEDPEnabled = this._appFeatures.isEDPEnabled;
              if (!(!isEDPEnabled && !(0, _validateAreaCode["default"])(areaCode))) {
                _context2.n = 1;
                break;
              }
              this._toast.danger({
                message: (0, _i18n.t)('areaCodeInvalid'),
                allowDuplicates: false
              });
              return _context2.a(2);
            case 1:
              this._setData({
                countryCode: countryCode,
                areaCode: areaCode && areaCode.trim()
              });
              if (!(process.env.THEME_SYSTEM === 'spring-ui')) {
                _context2.n = 2;
                break;
              }
              return _context2.a(2);
            case 2:
              this._toast.success({
                message: (0, _i18n.t)('saveSuccess')
              });
            case 3:
              return _context2.a(2);
          }
        }, _callee2, this);
      }));
      function setData(_x) {
        return _setData2.apply(this, arguments);
      }
      return setData;
    }()
  }, {
    key: "showRegionSettings",
    get: function get() {
      var allowRegionSettings = !!this._brand.brandConfig.allowRegionSettings;
      var hasMultiplePlans = this.availableCountries.length > 1;
      var isUSOrCA = this.availableCountries.length === 1 && (this.availableCountries[0].isoCode === 'US' || this.availableCountries[0].isoCode === 'CA');
      var isEDPEnabled = this._appFeatures.isEDPEnabled;
      return allowRegionSettings && (hasMultiplePlans || isEDPEnabled || isUSOrCA);
    }
  }, {
    key: "homeCountryId",
    get: function get() {
      var _this5 = this;
      var homeCountry = this.availableCountries.find(function (country) {
        return country.isoCode === _this5.countryCode;
      });
      var homeCountryId = homeCountry && homeCountry.id || '1';
      return homeCountryId;
    }
  }, {
    key: "defaultAreaCode",
    get: function get() {
      var isEDPEnabled = this._appFeatures.isEDPEnabled;
      if (isEDPEnabled && (0, _ramda.includes)(this.countryCode, ['US', 'PR', 'CA'])) {
        return;
      }
      if (this.areaCode) {
        return this.areaCode;
      }
      var callingCode = (0, _libphonenumberJs.getCountryCallingCode)(this.countryCode);
      var _this$_extensionPhone = this._extensionPhoneNumber,
        primaryNumber = _this$_extensionPhone.primaryNumber,
        mainCompanyNumber = _this$_extensionPhone.mainCompanyNumber;
      var mainNumberCallingCode = (mainCompanyNumber === null || mainCompanyNumber === void 0 ? void 0 : mainCompanyNumber.phoneNumber) && (0, _libphonenumberJs.parsePhoneNumber)(mainCompanyNumber.phoneNumber).countryCallingCode;
      var primaryNumberCallingCode = (primaryNumber === null || primaryNumber === void 0 ? void 0 : primaryNumber.phoneNumber) && (0, _libphonenumberJs.parsePhoneNumber)(primaryNumber.phoneNumber).countryCallingCode;
      var canUseExtensionAreaCode = primaryNumberCallingCode === callingCode || mainNumberCallingCode === callingCode;
      if (canUseExtensionAreaCode) {
        return this._extensionNumberAreaCode.defaultAreaCode;
      }
    }
  }]);
}(_nextCore.RcModule), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "dialingPlansChangedToast", [_nextCore.portal], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this6 = this;
    return this._toast.create({
      view: function view() {
        var _useToastItemView = (0, _views.useToastItemView)(),
          action = _useToastItemView.action;
        var _useLocale = (0, _hooks.useLocale)(_i18n["default"]),
          t = _useLocale.t;
        var regionSettings = t('regionSettings');
        var regionSettingsLink = /*#__PURE__*/_react["default"].createElement(_Link.RcLink, {
          onClick: /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
            return _regenerator().w(function (_context3) {
              while (1) switch (_context3.n) {
                case 0:
                  _context3.n = 1;
                  return _this6._router.push('/settings/region');
                case 1:
                  action.close();
                case 2:
                  return _context3.a(2);
              }
            }, _callee3);
          }))
        }, regionSettings);
        return /*#__PURE__*/_react["default"].createElement(_FormattedMessage["default"], {
          message: t('dialingPlansChanged'),
          values: {
            regionSettingsLink: regionSettingsLink
          }
        });
      },
      props: function props() {
        return {
          level: 'warning',
          ttl: 0
        };
      }
    });
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "data", [_nextCore.userStorage, _nextCore.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this$_extensionInfo;
    return {
      countryCode: ((_this$_extensionInfo = this._extensionInfo) === null || _this$_extensionInfo === void 0 ? void 0 : _this$_extensionInfo.isoCode) || '',
      areaCode: ''
    };
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_setData", [_nextCore.action, _dec5, _dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "_setData"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "availableCountries", [_nextCore.computed, _dec7, _dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "availableCountries"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "checkRegionSettings", [_dec9, _dec0, _dec1], Object.getOwnPropertyDescriptor(_class2.prototype, "checkRegionSettings"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setData", [_dec10, _dec11, _dec12], Object.getOwnPropertyDescriptor(_class2.prototype, "setData"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "showRegionSettings", [_nextCore.computed, _dec13, _dec14], Object.getOwnPropertyDescriptor(_class2.prototype, "showRegionSettings"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "homeCountryId", [_nextCore.computed, _dec15, _dec16], Object.getOwnPropertyDescriptor(_class2.prototype, "homeCountryId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "defaultAreaCode", [_nextCore.computed, _dec17, _dec18], Object.getOwnPropertyDescriptor(_class2.prototype, "defaultAreaCode"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class);
//# sourceMappingURL=RegionSettings.js.map
