"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.slice");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NumberValidate = void 0;

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.array.for-each");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.array.find");

var _core = require("@ringcentral-integration/core");

var _phoneNumber = require("@ringcentral-integration/phone-number");

var _contactHelper = require("../../lib/contactHelper");

var _di = require("../../lib/di");

var _hasNoAreaCode2 = require("../../lib/hasNoAreaCode");

var _isBlank = _interopRequireDefault(require("../../lib/isBlank"));

var _normalizeNumber = _interopRequireDefault(require("../../lib/normalizeNumber"));

var _proxify = require("../../lib/proxy/proxify");

var _dec, _class, _class2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

var NumberValidate = (_dec = (0, _di.Module)({
  name: 'NumberValidate',
  deps: ['Brand', 'Client', 'RegionSettings', 'AccountInfo', 'CompanyContacts', {
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
      if ((0, _isBlank["default"])(input)) {
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

      if (!(0, _contactHelper.isAnExtension)(extensionNumber)) {
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
        return (0, _contactHelper.isExtensionExist)({
          extensionNumber: extensionNumber,
          extensionFromContacts: item.extensionNumber,
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
      return extensionNumber && extensionNumber.length <= 6 && !this._deps.companyContacts.isAvailableExtension(extensionNumber);
    }
  }, {
    key: "isCompanyExtension",
    value: function isCompanyExtension(companyNumber, extensionNumber) {
      var _this$_deps$regionSet2 = this._deps.regionSettings,
          countryCode = _this$_deps$regionSet2.countryCode,
          areaCode = _this$_deps$regionSet2.areaCode;
      var normalizedCompanyNumber = (0, _normalizeNumber["default"])({
        phoneNumber: companyNumber,
        countryCode: countryCode,
        areaCode: areaCode
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

        var parsedNumbers, errors, validatedPhoneNumbers;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this._numberParser(phoneNumbers);

              case 2:
                parsedNumbers = _context2.sent;
                errors = [];
                validatedPhoneNumbers = [];
                parsedNumbers.map(function (phoneNumber) {
                  if (_this2._isSpecial(phoneNumber)) {
                    errors.push({
                      phoneNumber: phoneNumber.originalString,
                      type: 'specialNumber'
                    });
                    return null;
                  }

                  var number = phoneNumber.originalString;

                  var availableExtension = _this2.getAvailableExtension(number);

                  if ((0, _contactHelper.isAnExtension)(number) && !availableExtension) {
                    errors.push({
                      phoneNumber: phoneNumber.originalString,
                      type: 'notAnExtension'
                    });
                    return null;
                  }

                  var extensionObj = availableExtension ? {
                    availableExtension: availableExtension
                  } : {};
                  validatedPhoneNumbers.push(_objectSpread(_objectSpread({}, phoneNumber), extensionObj));
                  return null;
                });
                return _context2.abrupt("return", {
                  result: errors.length === 0,
                  numbers: validatedPhoneNumbers,
                  errors: errors
                });

              case 7:
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
                  return (0, _normalizeNumber["default"])({
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
                    international: !!phoneNumber.country && phoneNumber.country.callingCode !== response.homeCountry.callingCode
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
    }()
  }]);

  return NumberValidate;
}(_core.RcModuleV2), (_applyDecoratedDescriptor(_class2.prototype, "validateNumbers", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "validateNumbers"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "validateWithNumberParser", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "validateWithNumberParser"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_numberParser", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_numberParser"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_numberParserApi", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_numberParserApi"), _class2.prototype)), _class2)) || _class);
exports.NumberValidate = NumberValidate;
//# sourceMappingURL=NumberValidate.js.map
