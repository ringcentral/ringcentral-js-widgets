"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
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
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
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
function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
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
                parsedNumbers.map(function (phoneNumber) {
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
                        // @ts-expect-error
                        phoneNumber: phoneNumber.originalString,
                        type: 'notAnExtension'
                      });
                      return null;
                    }
                    extensionObj.availableExtension = availableExtension;
                  }
                  validatedPhoneNumbers.push(_objectSpread(_objectSpread({}, phoneNumber), extensionObj));
                  return null;
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
                    // @ts-expect-error
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
        var _this3 = this;
        var _this$_deps$regionSet4, countryCode, defaultAreaCode, brandId, phoneNumbers, data, response;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _this$_deps$regionSet4 = this._deps.regionSettings, countryCode = _this$_deps$regionSet4.countryCode, defaultAreaCode = _this$_deps$regionSet4.defaultAreaCode;
                brandId = this._deps.brand.brandConfig.id;
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
    }() // whether the number is an empty string or contains invalid characters
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
