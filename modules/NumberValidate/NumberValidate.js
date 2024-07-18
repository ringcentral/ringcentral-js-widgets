"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.find");
require("core-js/modules/es.array.for-each");
require("core-js/modules/es.array.map");
require("core-js/modules/es.object.get-own-property-descriptor");
require("core-js/modules/web.dom-collections.for-each");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NumberValidate = void 0;
require("regenerator-runtime/runtime");
var _core = require("@ringcentral-integration/core");
var _phoneNumber = require("@ringcentral-integration/phone-number");
var _NumberParserResponse = require("../../interfaces/NumberParserResponse.interface");
var _cleanNumber = _interopRequireDefault(require("../../lib/cleanNumber"));
var _contactHelper = require("../../lib/contactHelper");
var _di = require("../../lib/di");
var _hasNoAreaCode2 = require("../../lib/hasNoAreaCode");
var _isBlank = require("../../lib/isBlank");
var _normalizeNumber = require("../../lib/normalizeNumber");
var _proxify = require("../../lib/proxy/proxify");
var _callErrors = require("../Call/callErrors");
var _NumberValidate = require("./NumberValidate.interface");
var _dec, _class, _class2;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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
var NumberValidate = (_dec = (0, _di.Module)({
  name: 'NumberValidate',
  deps: ['Brand', 'Client', 'RegionSettings', 'AccountInfo', 'CompanyContacts', 'AppFeatures', 'Alert', {
    dep: 'ExtensionInfo',
    optional: true
  }, {
    dep: 'NumberValidateOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  _inherits(NumberValidate, _RcModuleV);
  var _super = _createSuper(NumberValidate);
  function NumberValidate(deps) {
    _classCallCheck(this, NumberValidate);
    return _super.call(this, {
      deps: deps
    });
  }
  _createClass(NumberValidate, [{
    key: "isNoToNumber",
    value: function isNoToNumber(input) {
      if ((0, _isBlank.isBlank)(input)) {
        return true;
      }
      var _parse = (0, _phoneNumber.parse)({
          input: input,
          countryCode: this._deps.regionSettings.countryCode
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
      var _this$_deps$regionSet = this._deps.regionSettings,
        countryCode = _this$_deps$regionSet.countryCode,
        areaCode = _this$_deps$regionSet.areaCode;
      return this._deps.brand.brandConfig.allowRegionSettings && (0, _hasNoAreaCode2.hasNoAreaCode)({
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
    /**
     * TODO: Currently we don't have clearly defined business rule on
     * what extension numbers are considered available for dialing.
     * @param {*} extensionNumber
     * @returns {String} extensionNumber | null
     */
  }, {
    key: "getAvailableExtension",
    value: function getAvailableExtension(extensionNumber) {
      var _contacts$find$extens, _contacts$find;
      var maxExtensionNumberLength = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 6;
      if (!(0, _contactHelper.isAnExtension)(extensionNumber, maxExtensionNumberLength)) {
        return null;
      }
      if (!this._deps.extensionInfo) {
        return null;
      }
      var _this$_deps$extension = this._deps.extensionInfo,
        isMultipleSiteEnabled = _this$_deps$extension.isMultipleSiteEnabled,
        site = _this$_deps$extension.site;
      var _this$_deps$companyCo = this._deps.companyContacts,
        filteredContacts = _this$_deps$companyCo.filteredContacts,
        ivrContacts = _this$_deps$companyCo.ivrContacts;
      var contacts = filteredContacts.concat(ivrContacts);
      return (_contacts$find$extens = (_contacts$find = contacts.find(function (item) {
        var _item$extensionNumber;
        return (0, _contactHelper.isExtensionExist)({
          extensionNumber: extensionNumber,
          extensionFromContacts: (_item$extensionNumber = item.extensionNumber) !== null && _item$extensionNumber !== void 0 ? _item$extensionNumber : '',
          options: {
            isMultipleSiteEnabled: isMultipleSiteEnabled,
            siteCode: site === null || site === void 0 ? void 0 : site.code
          }
        });
      })) === null || _contacts$find === void 0 ? void 0 : _contacts$find.extensionNumber) !== null && _contacts$find$extens !== void 0 ? _contacts$find$extens : null;
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
      return extensionNumber && extensionNumber.length <= maxExtensionLength && !this._deps.companyContacts.isAvailableExtension(extensionNumber);
    }
  }, {
    key: "isCompanyExtension",
    value: function isCompanyExtension(companyNumber, extensionNumber) {
      var _this$_deps$regionSet2 = this._deps.regionSettings,
        countryCode = _this$_deps$regionSet2.countryCode,
        areaCode = _this$_deps$regionSet2.areaCode;
      var normalizedCompanyNumber = (0, _normalizeNumber.normalizeNumber)({
        phoneNumber: companyNumber,
        countryCode: countryCode,
        areaCode: areaCode,
        maxExtensionLength: this._deps.accountInfo.maxExtensionNumberLength
      });
      if (normalizedCompanyNumber !== this._deps.accountInfo.mainCompanyNumber) {
        return false;
      }
      return this._deps.companyContacts.isAvailableExtension(extensionNumber);
    }
  }, {
    key: "validateNumbers",
    value: function () {
      var _validateNumbers = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(phoneNumbers) {
        var validateResult, validatedNumbers;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                validateResult = this.validateFormat(phoneNumbers);
                if (validateResult.result) {
                  _context.next = 3;
                  break;
                }
                return _context.abrupt("return", validateResult);
              case 3:
                _context.next = 5;
                return this.validateWithNumberParser(phoneNumbers);
              case 5:
                validatedNumbers = _context.sent;
                return _context.abrupt("return", validatedNumbers);
              case 7:
              case "end":
                return _context.stop();
            }
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
      var _this = this;
      var errors = [];
      phoneNumbers.forEach(function (phoneNumber) {
        if (_this.isNoToNumber(phoneNumber)) {
          errors.push({
            phoneNumber: phoneNumber,
            type: 'noToNumber'
          });
        } else if (_this.hasNoAreaCode(phoneNumber)) {
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
      var _validateWithNumberParser = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(phoneNumbers) {
        var _this2 = this;
        var maxExtensionNumberLength, parsedNumbers, errors, validatedPhoneNumbers;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                maxExtensionNumberLength = this._deps.accountInfo.maxExtensionNumberLength;
                _context2.next = 3;
                return this._numberParser(phoneNumbers);
              case 3:
                parsedNumbers = _context2.sent;
                errors = [];
                validatedPhoneNumbers = [];
                parsedNumbers.forEach(function (phoneNumber) {
                  var _this2$_deps$companyC;
                  var isSpecial = _this2._isSpecial(phoneNumber);
                  var number = phoneNumber.originalString;
                  var isAnExtensionNumber = !isSpecial && (0, _contactHelper.isAnExtension)(number, maxExtensionNumberLength);
                  var extensionObj = {
                    isAnExtension: isAnExtensionNumber
                  };
                  if (!((_this2$_deps$companyC = _this2._deps.companyContacts) === null || _this2$_deps$companyC === void 0 ? void 0 : _this2$_deps$companyC.enableCompanyPublicApi) && isAnExtensionNumber) {
                    var availableExtension = _this2.getAvailableExtension(number, maxExtensionNumberLength);
                    if (!availableExtension) {
                      errors.push({
                        // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
                        phoneNumber: phoneNumber.originalString,
                        type: 'notAnExtension'
                      });
                      return;
                    }
                    extensionObj.availableExtension = availableExtension;
                  }
                  validatedPhoneNumbers.push(_objectSpread(_objectSpread({}, phoneNumber), extensionObj));
                });
                return _context2.abrupt("return", {
                  result: errors.length === 0,
                  numbers: validatedPhoneNumbers,
                  errors: errors
                });
              case 8:
              case "end":
                return _context2.stop();
            }
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
      var _numberParser2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(phoneNumbers) {
        var _this$_deps$regionSet3, countryCode, areaCode, homeCountry, normalizedNumbers, response;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _this$_deps$regionSet3 = this._deps.regionSettings, countryCode = _this$_deps$regionSet3.countryCode, areaCode = _this$_deps$regionSet3.areaCode;
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
                _context3.next = 5;
                return this._numberParserApi(normalizedNumbers, homeCountry);
              case 5:
                response = _context3.sent;
                return _context3.abrupt("return", response.phoneNumbers.map(function (phoneNumber) {
                  return _objectSpread(_objectSpread({}, phoneNumber), {}, {
                    international: !!phoneNumber.country &&
                    // @ts-expect-error TS(2532): Object is possibly 'undefined'.
                    phoneNumber.country.callingCode !== response.homeCountry.callingCode
                  });
                }));
              case 7:
              case "end":
                return _context3.stop();
            }
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
      var _numberParserApi2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(originalStrings, homeCountry) {
        var response;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this._deps.client.numberParser().parse().post({
                  originalStrings: originalStrings
                }, homeCountry);
              case 2:
                response = _context4.sent;
                return _context4.abrupt("return", response);
              case 4:
              case "end":
                return _context4.stop();
            }
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
      var _parsingPhoneNumber2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(data) {
        var response;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                _context5.next = 3;
                return this._deps.client.service.platform().post("/restapi/v2/number-parser/parse", data);
              case 3:
                response = _context5.sent;
                return _context5.abrupt("return", response.json());
              case 7:
                _context5.prev = 7;
                _context5.t0 = _context5["catch"](0);
                this._deps.alert.danger({
                  message: _callErrors.callErrors.numberParseError,
                  payload: _context5.t0
                });
                return _context5.abrupt("return", null);
              case 11:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[0, 7]]);
      }));
      function _parsingPhoneNumber(_x6) {
        return _parsingPhoneNumber2.apply(this, arguments);
      }
      return _parsingPhoneNumber;
    }()
  }, {
    key: "parseNumbers",
    value: function () {
      var _parseNumbers = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(inputs) {
        var _this$_deps$accountIn,
          _this$_deps$accountIn2,
          _this3 = this;
        var _this$_deps$regionSet4, countryCode, defaultAreaCode, brandId, phoneNumbers, data, response;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _this$_deps$regionSet4 = this._deps.regionSettings, countryCode = _this$_deps$regionSet4.countryCode, defaultAreaCode = _this$_deps$regionSet4.defaultAreaCode; // TODO: API has not supported sub-brand. As a workaround, we use brandId instead of uBrandId here
                brandId = ((_this$_deps$accountIn = this._deps.accountInfo.serviceInfo) === null || _this$_deps$accountIn === void 0 ? void 0 : (_this$_deps$accountIn2 = _this$_deps$accountIn.brand) === null || _this$_deps$accountIn2 === void 0 ? void 0 : _this$_deps$accountIn2.id) || this._deps.brand.brandConfig.id;
                phoneNumbers = inputs.map(function (input) {
                  return (0, _cleanNumber["default"])(input);
                });
                data = {
                  originalStrings: phoneNumbers,
                  contextSource: _NumberValidate.contextSourceOption.account,
                  context: {
                    brandId: brandId,
                    country: {
                      isoCode: countryCode
                    },
                    defaultAreaCode: defaultAreaCode,
                    outboundCallPrefix: this._deps.appFeatures.OCPValue,
                    conflictHandling: this._deps.appFeatures.enableSmartDialPlan ? 'Client' : 'Default',
                    maxExtensionNumberLength: this._deps.accountInfo.maxExtensionNumberLength
                  }
                };
                _context6.next = 6;
                return this._parsingPhoneNumber(data);
              case 6:
                response = _context6.sent;
                return _context6.abrupt("return", response === null || response === void 0 ? void 0 : response.results.map(function (result) {
                  return _this3.handleResult(result);
                }));
              case 8:
              case "end":
                return _context6.stop();
            }
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
          parseResult.parsedNumber = formatObj.e164Extended || formatObj.e164 || formatObj.dialableExtended;
          break;
        case _NumberParserResponse.Category.Unknown:
          parseResult.parsedNumber = formatObj.dialableExtended || formatObj.dialable;
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
      var maxExtensionNumberLength = this._deps.accountInfo.maxExtensionNumberLength;
      var parsedNumber = ((_resultItem$numberDet = resultItem.numberDetails) === null || _resultItem$numberDet === void 0 ? void 0 : _resultItem$numberDet.extensionNumber) || originalString;
      var availableExtension = this.getAvailableExtension(parsedNumber, maxExtensionNumberLength);
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
      var maxExtensionNumberLength = this._deps.accountInfo.maxExtensionNumberLength;
      var availableExtension = this.getAvailableExtension(originalString, maxExtensionNumberLength);
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
      var _resultItem$numberDet2, _resultItem$numberDet3, _resultItem$numberDet4;
      var phoneNumberISOCode = (_resultItem$numberDet2 = (_resultItem$numberDet3 = resultItem.numberDetails) === null || _resultItem$numberDet3 === void 0 ? void 0 : (_resultItem$numberDet4 = _resultItem$numberDet3.country) === null || _resultItem$numberDet4 === void 0 ? void 0 : _resultItem$numberDet4.isoCode) !== null && _resultItem$numberDet2 !== void 0 ? _resultItem$numberDet2 : '';
      var regionSettingsCountryCode = this._deps.regionSettings.countryCode;

      // The call between us/ca/pr should not be considered to be the international call, check RCINT-25922/RCINT-26726 for more details
      if ((0, _phoneNumber.isUSOrCAOrPR)(regionSettingsCountryCode) && (0, _phoneNumber.isUSOrCAOrPR)(phoneNumberISOCode)) {
        return false;
      }

      // For rest of the cases, check if the number is international
      return phoneNumberISOCode !== regionSettingsCountryCode;
    }
  }]);
  return NumberValidate;
}(_core.RcModuleV2), (_applyDecoratedDescriptor(_class2.prototype, "validateNumbers", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "validateNumbers"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "validateWithNumberParser", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "validateWithNumberParser"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_numberParser", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_numberParser"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_numberParserApi", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_numberParserApi"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_parsingPhoneNumber", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_parsingPhoneNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "parseNumbers", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "parseNumbers"), _class2.prototype)), _class2)) || _class);
exports.NumberValidate = NumberValidate;
//# sourceMappingURL=NumberValidate.js.map
