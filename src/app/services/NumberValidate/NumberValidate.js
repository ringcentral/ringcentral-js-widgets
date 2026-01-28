"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
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
require("core-js/modules/es.promise.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NumberValidate = void 0;
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/web.dom-collections.for-each.js");
var _NumberParserResponse = require("@ringcentral-integration/commons/interfaces/NumberParserResponse.interface");
var _cleanNumber = _interopRequireDefault(require("@ringcentral-integration/commons/lib/cleanNumber"));
var _contactHelper = require("@ringcentral-integration/commons/lib/contactHelper");
var _hasNoAreaCode2 = require("@ringcentral-integration/commons/lib/hasNoAreaCode");
var _isBlank = require("@ringcentral-integration/commons/lib/isBlank");
var _normalizeNumber = require("@ringcentral-integration/commons/lib/normalizeNumber");
var _services = require("@ringcentral-integration/micro-auth/src/app/services");
var _hooks = require("@ringcentral-integration/micro-core/src/app/hooks");
var _services2 = require("@ringcentral-integration/micro-core/src/app/services");
var _views = require("@ringcentral-integration/micro-core/src/app/views");
var _nextCore = require("@ringcentral-integration/next-core");
var _phoneNumber = require("@ringcentral-integration/phone-number");
var _FormattedMessage = _interopRequireDefault(require("@ringcentral-integration/widgets/components/FormattedMessage"));
var _Link = require("@ringcentral/juno/es6/components/Link/Link.js");
var _react = _interopRequireDefault(require("react"));
var _CompanyContacts = require("../CompanyContacts");
var _NumberValidate2 = require("./NumberValidate.interface");
var _i18n = _interopRequireWildcard(require("./i18n"));
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _class, _class2, _descriptor;
/* eslint-disable react-hooks/rules-of-hooks */
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t2 in e) "default" !== _t2 && {}.hasOwnProperty.call(e, _t2) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t2)) && (i.get || i.set) ? o(f, _t2, i) : f[_t2] = e[_t2]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
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
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
var NumberValidate = exports.NumberValidate = (_dec = (0, _nextCore.injectable)({
  name: 'NumberValidate'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 8);
}, _dec3 = function _dec3(target, key) {
  return (0, _nextCore.optional)('NumberValidateOptions')(target, undefined, 9);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _nextCore.RouterPlugin === "undefined" ? Object : _nextCore.RouterPlugin, typeof _services2.Brand === "undefined" ? Object : _services2.Brand, typeof _services.Client === "undefined" ? Object : _services.Client, typeof _services.RegionSettings === "undefined" ? Object : _services.RegionSettings, typeof _services.AccountInfo === "undefined" ? Object : _services.AccountInfo, typeof _CompanyContacts.CompanyContacts === "undefined" ? Object : _CompanyContacts.CompanyContacts, typeof _services.AppFeatures === "undefined" ? Object : _services.AppFeatures, typeof _services2.Toast === "undefined" ? Object : _services2.Toast, typeof _services.ExtensionInfo === "undefined" ? Object : _services.ExtensionInfo, typeof NumberValidateOptions === "undefined" ? Object : NumberValidateOptions]), _dec6 = (0, _nextCore.delegate)('server'), _dec7 = Reflect.metadata("design:type", Function), _dec8 = Reflect.metadata("design:paramtypes", [Array]), _dec9 = (0, _nextCore.delegate)('server'), _dec0 = Reflect.metadata("design:type", Function), _dec1 = Reflect.metadata("design:paramtypes", [Array]), _dec10 = (0, _nextCore.delegate)('server'), _dec11 = Reflect.metadata("design:type", Function), _dec12 = Reflect.metadata("design:paramtypes", [Array]), _dec13 = (0, _nextCore.delegate)('server'), _dec14 = Reflect.metadata("design:type", Function), _dec15 = Reflect.metadata("design:paramtypes", [Array, Object]), _dec16 = (0, _nextCore.delegate)('server'), _dec17 = Reflect.metadata("design:type", Function), _dec18 = Reflect.metadata("design:paramtypes", [typeof ParsePhoneNumberAPIParam === "undefined" ? Object : ParsePhoneNumberAPIParam]), _dec19 = (0, _nextCore.delegate)('server'), _dec20 = Reflect.metadata("design:type", Function), _dec21 = Reflect.metadata("design:paramtypes", [Array]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = (_class2 = /*#__PURE__*/function (_RcModule) {
  function NumberValidate(_router, _brand, _client, _regionSettings, _accountInfo, _companyContacts, _appFeatures, _toast, _extensionInfo, _numberValidateOptions) {
    var _this;
    _classCallCheck(this, NumberValidate);
    _this = _callSuper(this, NumberValidate);
    _this._router = _router;
    _this._brand = _brand;
    _this._client = _client;
    _this._regionSettings = _regionSettings;
    _this._accountInfo = _accountInfo;
    _this._companyContacts = _companyContacts;
    _this._appFeatures = _appFeatures;
    _this._toast = _toast;
    _this._extensionInfo = _extensionInfo;
    _this._numberValidateOptions = _numberValidateOptions;
    /**
     * in session call data not include the extensionNumber in data source, that just phoneNumber, need distinguish does that have extensionNumber, if so return the parsed phoneNumber as extensionNumber
     * @param source
     * @returns
     */
    _this.getPartyExtensionNumber = function (source) {
      if (!source) return undefined;
      var extensionNumber = source.extensionNumber;
      if (extensionNumber || !source.phoneNumber) return extensionNumber;
      var isAvailableExtension = _this.isAvailableExtension(source.phoneNumber);
      if (isAvailableExtension) return source.phoneNumber;
      return undefined;
    };
    _initializerDefineProperty(_this, "noAreaCodeToast", _descriptor, _this);
    return _this;
  }
  _inherits(NumberValidate, _RcModule);
  return _createClass(NumberValidate, [{
    key: "isNoToNumber",
    value: function isNoToNumber(input) {
      if ((0, _isBlank.isBlank)(input)) {
        return true;
      }
      var _parse = (0, _phoneNumber.parse)({
          input: input,
          countryCode: this._regionSettings.countryCode
        }),
        hasInvalidChars = _parse.hasInvalidChars,
        isValid = _parse.isValid;
      if (hasInvalidChars || !isValid) {
        return true;
      }
      return false;
    }
  }, {
    key: "hasNoAreaCode",
    value: function hasNoAreaCode(input) {
      var _this$_regionSettings = this._regionSettings,
        countryCode = _this$_regionSettings.countryCode,
        areaCode = _this$_regionSettings.areaCode;
      return this._brand.brandConfig.allowRegionSettings && (0, _hasNoAreaCode2.hasNoAreaCode)({
        input: input,
        countryCode: countryCode,
        areaCode: areaCode
      });
    }
  }, {
    key: "_isSpecial",
    value: function _isSpecial(phoneNumber) {
      return !!(phoneNumber === null || phoneNumber === void 0 ? void 0 : phoneNumber.special);
    }
  }, {
    key: "isAnExtensionNumber",
    value: function isAnExtensionNumber(number) {
      return (0, _contactHelper.isAnExtension)(number, this._accountInfo.maxExtensionNumberLength);
    }

    /**
     * TODO: Currently we don't have clearly defined business rule on
     * what extension numbers are considered available for dialing.
     */
  }, {
    key: "getAvailableExtension",
    value: function getAvailableExtension(extensionNumber) {
      var _allContacts$find$ext, _allContacts$find;
      if (!this.isAnExtensionNumber(extensionNumber) || !this._extensionInfo) {
        return null;
      }
      var _this$_extensionInfo = this._extensionInfo,
        isMultipleSiteEnabled = _this$_extensionInfo.isMultipleSiteEnabled,
        site = _this$_extensionInfo.site;
      var allContacts = this._companyContacts.allContacts;

      // TODO: that performance is not good, need to optimize will map or other way
      return (_allContacts$find$ext = (_allContacts$find = allContacts.find(function (item) {
        var _item$extensionNumber;
        return (0, _contactHelper.isExtensionExist)({
          extensionNumber: extensionNumber,
          extensionFromContacts: (_item$extensionNumber = item.extensionNumber) !== null && _item$extensionNumber !== void 0 ? _item$extensionNumber : '',
          options: {
            isMultipleSiteEnabled: isMultipleSiteEnabled,
            siteCode: site === null || site === void 0 ? void 0 : site.code
          }
        });
      })) === null || _allContacts$find === void 0 ? void 0 : _allContacts$find.extensionNumber) !== null && _allContacts$find$ext !== void 0 ? _allContacts$find$ext : null;
    }
  }, {
    key: "isAvailableExtension",
    value: function isAvailableExtension(extensionNumber) {
      return !!this.getAvailableExtension(extensionNumber);
    }
  }, {
    key: "isNotAnExtension",
    value: function isNotAnExtension(extensionNumber) {
      var maxExtensionLength = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 6;
      return extensionNumber && extensionNumber.length <= maxExtensionLength &&
      // TODO: does need consider about isMultipleSiteEnabled, use above `isAvailableExtension`
      !this._companyContacts.isAvailableExtension(extensionNumber);
    }
  }, {
    key: "isCompanyExtension",
    value: function isCompanyExtension(companyNumber, extensionNumber) {
      var _this$_regionSettings2 = this._regionSettings,
        countryCode = _this$_regionSettings2.countryCode,
        areaCode = _this$_regionSettings2.areaCode;
      var normalizedCompanyNumber = (0, _normalizeNumber.normalizeNumber)({
        phoneNumber: companyNumber,
        countryCode: countryCode,
        areaCode: areaCode,
        maxExtensionLength: this._accountInfo.maxExtensionNumberLength
      });
      if (normalizedCompanyNumber !== this._accountInfo.mainCompanyNumber) {
        return false;
      }
      // TODO: does need consider about isMultipleSiteEnabled, use above `isAvailableExtension`
      return this._companyContacts.isAvailableExtension(extensionNumber);
    }
  }, {
    key: "validateNumbers",
    value: function () {
      var _validateNumbers = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(phoneNumbers) {
        var validateResult, validatedNumbers;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              validateResult = this.validateFormat(phoneNumbers);
              if (validateResult.result) {
                _context.n = 1;
                break;
              }
              return _context.a(2, validateResult);
            case 1:
              _context.n = 2;
              return this.validateWithNumberParser(phoneNumbers);
            case 2:
              validatedNumbers = _context.v;
              return _context.a(2, validatedNumbers);
          }
        }, _callee, this);
      }));
      function validateNumbers(_x) {
        return _validateNumbers.apply(this, arguments);
      }
      return validateNumbers;
    }()
  }, {
    key: "validateFormat",
    value: function validateFormat(phoneNumbers) {
      var _this2 = this;
      var errors = [];
      phoneNumbers.forEach(function (phoneNumber) {
        if (_this2.isNoToNumber(phoneNumber)) {
          errors.push({
            phoneNumber: phoneNumber,
            type: 'noToNumber'
          });
        } else if (_this2.hasNoAreaCode(phoneNumber)) {
          errors.push({
            phoneNumber: phoneNumber,
            type: 'noAreaCode'
          });
        }
      });
      return {
        result: errors.length === 0,
        errors: errors
      };
    }
  }, {
    key: "validateWithNumberParser",
    value: function () {
      var _validateWithNumberParser = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(phoneNumbers) {
        var _this3 = this;
        var maxExtensionNumberLength, parsedNumbers, errors, validatedPhoneNumbers;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              maxExtensionNumberLength = this._accountInfo.maxExtensionNumberLength;
              _context2.n = 1;
              return this._numberParser(phoneNumbers);
            case 1:
              parsedNumbers = _context2.v;
              errors = [];
              validatedPhoneNumbers = [];
              parsedNumbers.forEach(function (phoneNumber) {
                var _this3$_companyContac;
                var isSpecial = _this3._isSpecial(phoneNumber);
                var number = phoneNumber.originalString;
                var isAnExtensionNumber = !isSpecial && (0, _contactHelper.isAnExtension)(number, maxExtensionNumberLength);
                var extensionObj = {
                  isAnExtension: isAnExtensionNumber
                };
                if (!((_this3$_companyContac = _this3._companyContacts) === null || _this3$_companyContac === void 0 ? void 0 : _this3$_companyContac.enableCompanyPublicApi) && isAnExtensionNumber) {
                  var _number = phoneNumber.originalString;
                  var availableExtension = _this3.getAvailableExtension(_number);
                  if (!availableExtension) {
                    errors.push({
                      phoneNumber: phoneNumber.originalString,
                      type: 'notAnExtension'
                    });
                    return;
                  }
                  extensionObj.availableExtension = availableExtension;
                }
                validatedPhoneNumbers.push(_objectSpread(_objectSpread({}, phoneNumber), extensionObj));
              });
              return _context2.a(2, {
                result: errors.length === 0,
                numbers: validatedPhoneNumbers,
                errors: errors
              });
          }
        }, _callee2, this);
      }));
      function validateWithNumberParser(_x2) {
        return _validateWithNumberParser.apply(this, arguments);
      }
      return validateWithNumberParser;
    }()
  }, {
    key: "_numberParser",
    value: function () {
      var _numberParser2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(phoneNumbers) {
        var _this$_regionSettings3, countryCode, areaCode, homeCountry, normalizedNumbers, response;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              _this$_regionSettings3 = this._regionSettings, countryCode = _this$_regionSettings3.countryCode, areaCode = _this$_regionSettings3.areaCode;
              homeCountry = countryCode ? {
                homeCountry: countryCode
              } : {};
              normalizedNumbers = phoneNumbers.map(function (phoneNumber) {
                return (0, _normalizeNumber.normalizeNumber)({
                  phoneNumber: phoneNumber,
                  countryCode: countryCode,
                  areaCode: areaCode
                });
              });
              _context3.n = 1;
              return this._numberParserApi(normalizedNumbers, homeCountry);
            case 1:
              response = _context3.v;
              return _context3.a(2, response.phoneNumbers.map(function (phoneNumber) {
                return _objectSpread(_objectSpread({}, phoneNumber), {}, {
                  international: !!phoneNumber.country && phoneNumber.country.callingCode !== response.homeCountry.callingCode
                });
              }));
          }
        }, _callee3, this);
      }));
      function _numberParser(_x3) {
        return _numberParser2.apply(this, arguments);
      }
      return _numberParser;
    }()
  }, {
    key: "_numberParserApi",
    value: function () {
      var _numberParserApi2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(originalStrings, homeCountry) {
        var response;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              _context4.n = 1;
              return this._client.numberParser().parse().post({
                // @ts-expect-error
                originalStrings: originalStrings
              }, homeCountry);
            case 1:
              response = _context4.v;
              return _context4.a(2, response);
          }
        }, _callee4, this);
      }));
      function _numberParserApi(_x4, _x5) {
        return _numberParserApi2.apply(this, arguments);
      }
      return _numberParserApi;
    }() // introduce number parser v2
    // need to remove private, so that we can test
  }, {
    key: "_parsingPhoneNumber",
    value: function () {
      var _parsingPhoneNumber2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(data) {
        var response, _t;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.p = _context5.n) {
            case 0:
              _context5.p = 0;
              _context5.n = 1;
              return this._client.service.platform().post("/restapi/v2/number-parser/parse", data);
            case 1:
              response = _context5.v;
              return _context5.a(2, response.json());
            case 2:
              _context5.p = 2;
              _t = _context5.v;
              this._toast.danger({
                message: (0, _i18n.t)('numberParseError')
              });
              return _context5.a(2, null);
          }
        }, _callee5, this, [[0, 2]]);
      }));
      function _parsingPhoneNumber(_x6) {
        return _parsingPhoneNumber2.apply(this, arguments);
      }
      return _parsingPhoneNumber;
    }()
  }, {
    key: "parseNumbers",
    value: function () {
      var _parseNumbers = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(inputs) {
        var _this$_accountInfo$se,
          _this$_accountInfo$se2,
          _this4 = this;
        var _this$_regionSettings4, countryCode, defaultAreaCode, brandId, phoneNumbers, data, response;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              _this$_regionSettings4 = this._regionSettings, countryCode = _this$_regionSettings4.countryCode, defaultAreaCode = _this$_regionSettings4.defaultAreaCode; // TODO: API has not supported sub-brand. As a workaround, we use brandId instead of uBrandId here
              brandId = ((_this$_accountInfo$se = this._accountInfo.serviceInfo) === null || _this$_accountInfo$se === void 0 ? void 0 : (_this$_accountInfo$se2 = _this$_accountInfo$se.brand) === null || _this$_accountInfo$se2 === void 0 ? void 0 : _this$_accountInfo$se2.id) || this._brand.brandConfig.id;
              phoneNumbers = inputs.map(function (input) {
                return (0, _cleanNumber["default"])(input);
              });
              data = {
                originalStrings: phoneNumbers,
                contextSource: _NumberValidate2.contextSourceOption.account,
                context: {
                  brandId: brandId,
                  country: {
                    isoCode: countryCode
                  },
                  defaultAreaCode: defaultAreaCode,
                  outboundCallPrefix: this._appFeatures.OCPValue,
                  conflictHandling: this._appFeatures.enableSmartDialPlan ? 'Client' : 'Default',
                  maxExtensionNumberLength: this._accountInfo.maxExtensionNumberLength
                }
              };
              _context6.n = 1;
              return this._parsingPhoneNumber(data);
            case 1:
              response = _context6.v;
              return _context6.a(2, response === null || response === void 0 ? void 0 : response.results.map(function (result) {
                return _this4.handleResult(result);
              }));
          }
        }, _callee6, this);
      }));
      function parseNumbers(_x7) {
        return _parseNumbers.apply(this, arguments);
      }
      return parseNumbers;
    }()
    /**
     * Whether the number is an empty string or contains invalid characters
     */
  }, {
    key: "validate",
    value: function validate(numbers) {
      var errors = [];
      numbers.forEach(function (phoneNumber) {
        if ((0, _isBlank.isBlank)(phoneNumber) || /[^\d*+#\-(). ]/.test(phoneNumber)) {
          errors.push({
            phoneNumber: phoneNumber,
            type: 'noToNumber'
          });
        }
      });
      return {
        result: errors.length === 0,
        errors: errors
      };
    }
  }, {
    key: "handleValidateToasts",
    value:
    /**
     * after validate the number, show the toast if the number is invalid, otherwise return false
     */
    function handleValidateToasts(validateResult) {
      var _validateResult$error;
      if (validateResult.result) return;
      var error = (_validateResult$error = validateResult.errors) === null || _validateResult$error === void 0 ? void 0 : _validateResult$error[0];
      if (error) {
        var type = error.type;
        if (type === 'noAreaCode') {
          return this.openNoAreaCodeToast();
        }
        return this._toast.warning({
          message: (0, _i18n.t)(type),
          allowDuplicates: false
        });
      }
      return this._toast.warning({
        message: (0, _i18n.t)('recipientNumberInvalids'),
        allowDuplicates: false
      });
    }
  }, {
    key: "openNoAreaCodeToast",
    value: function openNoAreaCodeToast() {
      return this._toast.open(this.noAreaCodeToast);
    }
  }, {
    key: "handleResult",
    value: function handleResult(resultItem) {
      var _resultItem$formats;
      var formatObj = (_resultItem$formats = resultItem.formats) === null || _resultItem$formats === void 0 ? void 0 : _resultItem$formats[0];
      var originalString = resultItem.originalString;
      var parseResult = _objectSpread({
        originalString: originalString,
        isAnExtension: false,
        isInternational: false,
        specialService: false,
        parsedNumber: resultItem.originalString,
        availableExtension: null
      }, formatObj);
      switch (resultItem.category) {
        case _NumberParserResponse.Category.SpecialService:
          parseResult.specialService = true;
          parseResult.parsedNumber = formatObj === null || formatObj === void 0 ? void 0 : formatObj.national;
          break;
        case _NumberParserResponse.Category.Extension:
          parseResult = _objectSpread(_objectSpread({}, parseResult), this.handleExtension(resultItem));
          break;
        case _NumberParserResponse.Category.Regular:
        case _NumberParserResponse.Category.ShortCode:
        case _NumberParserResponse.Category.TollFree:
          parseResult.isInternational = this.isInternational(resultItem);
          if (formatObj) {
            parseResult.parsedNumber = formatObj.e164Extended || formatObj.e164 || formatObj.dialableExtended;
          }
          break;
        case _NumberParserResponse.Category.Unknown:
          if (formatObj) {
            parseResult.parsedNumber = formatObj.dialableExtended || formatObj.dialable;
          }
          break;
        case _NumberParserResponse.Category.Ambiguous:
          parseResult = _objectSpread(_objectSpread({}, parseResult), this.handleAmbiguous(resultItem));
          break;
        default:
          break;
      }
      return parseResult;
    }
  }, {
    key: "handleExtension",
    value: function handleExtension(resultItem) {
      var _resultItem$numberDet;
      var originalString = resultItem.originalString;
      var parsedNumber = ((_resultItem$numberDet = resultItem.numberDetails) === null || _resultItem$numberDet === void 0 ? void 0 : _resultItem$numberDet.extensionNumber) || originalString;
      var availableExtension = this.getAvailableExtension(parsedNumber);
      var isAnExtension = true;
      return {
        isAnExtension: isAnExtension,
        parsedNumber: parsedNumber,
        availableExtension: availableExtension
      };
    }
  }, {
    key: "handleAmbiguous",
    value: function handleAmbiguous(resultItem) {
      var originalString = resultItem.originalString;
      var availableExtension = this.getAvailableExtension(originalString);
      var isInternational = false;
      var parsedNumber = originalString;
      var isAnExtension = false;
      if (availableExtension) {
        parsedNumber = availableExtension;
        isAnExtension = true;
      } else {
        var externalNumber = resultItem.formats.find(function (item) {
          return item.category !== _NumberParserResponse.Category.Extension;
        });
        isInternational = !!externalNumber && this.isInternational(resultItem);
        parsedNumber = (externalNumber === null || externalNumber === void 0 ? void 0 : externalNumber.e164Extended) || (externalNumber === null || externalNumber === void 0 ? void 0 : externalNumber.e164) || originalString;
      }
      return {
        isAnExtension: isAnExtension,
        parsedNumber: parsedNumber,
        isInternational: isInternational,
        availableExtension: availableExtension
      };
    }
  }, {
    key: "isInternational",
    value: function isInternational(resultItem) {
      var _resultItem$numberDet2, _resultItem$numberDet3;
      var phoneNumberISOCode = (_resultItem$numberDet2 = resultItem.numberDetails) === null || _resultItem$numberDet2 === void 0 ? void 0 : (_resultItem$numberDet3 = _resultItem$numberDet2.country) === null || _resultItem$numberDet3 === void 0 ? void 0 : _resultItem$numberDet3.isoCode;
      var regionSettingsCountryCode = this._regionSettings.countryCode;

      // The call between us/ca/pr should not be considered to be the international call, check RCINT-25922/RCINT-26726 for more details
      if ((0, _phoneNumber.isUSOrCAOrPR)(regionSettingsCountryCode) && (0, _phoneNumber.isUSOrCAOrPR)(phoneNumberISOCode)) {
        return false;
      }

      // For rest of the cases, check if the number is international
      return phoneNumberISOCode !== regionSettingsCountryCode;
    }
  }]);
}(_nextCore.RcModule), _applyDecoratedDescriptor(_class2.prototype, "validateNumbers", [_dec6, _dec7, _dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "validateNumbers"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "validateWithNumberParser", [_dec9, _dec0, _dec1], Object.getOwnPropertyDescriptor(_class2.prototype, "validateWithNumberParser"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_numberParser", [_dec10, _dec11, _dec12], Object.getOwnPropertyDescriptor(_class2.prototype, "_numberParser"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_numberParserApi", [_dec13, _dec14, _dec15], Object.getOwnPropertyDescriptor(_class2.prototype, "_numberParserApi"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_parsingPhoneNumber", [_dec16, _dec17, _dec18], Object.getOwnPropertyDescriptor(_class2.prototype, "_parsingPhoneNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "parseNumbers", [_dec19, _dec20, _dec21], Object.getOwnPropertyDescriptor(_class2.prototype, "parseNumbers"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "noAreaCodeToast", [_nextCore.portal], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this5 = this;
    return this._toast.create({
      view: function view() {
        var _useToastItemView = (0, _views.useToastItemView)(),
          action = _useToastItemView.action;
        var _useLocale = (0, _hooks.useLocale)(_i18n["default"]),
          t = _useLocale.t;
        var areaCodeLink = /*#__PURE__*/_react["default"].createElement(_Link.RcLink, {
          onClick: /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
            return _regenerator().w(function (_context7) {
              while (1) switch (_context7.n) {
                case 0:
                  _context7.n = 1;
                  return _this5._router.push('/settings/region');
                case 1:
                  action.close();
                case 2:
                  return _context7.a(2);
              }
            }, _callee7);
          })),
          "data-sign": "setAreaCode"
        }, t('areaCode'));
        return /*#__PURE__*/_react["default"].createElement(_FormattedMessage["default"], {
          message: t('noAreaCode'),
          values: {
            areaCodeLink: areaCodeLink
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
}), _class2)) || _class) || _class) || _class) || _class) || _class);
//# sourceMappingURL=NumberValidate.js.map
