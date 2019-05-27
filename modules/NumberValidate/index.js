"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.map");

require("regenerator-runtime/runtime");

var _phoneNumber = require("@ringcentral-integration/phone-number");

var _RcModule2 = _interopRequireDefault(require("../../lib/RcModule"));

var _di = require("../../lib/di");

var _isBlank = _interopRequireDefault(require("../../lib/isBlank"));

var _moduleStatuses = _interopRequireDefault(require("../../enums/moduleStatuses"));

var _normalizeNumber = _interopRequireDefault(require("../../lib/normalizeNumber"));

var _proxify = _interopRequireDefault(require("../../lib/proxy/proxify"));

var _ensureExist = _interopRequireDefault(require("../../lib/ensureExist"));

var _numberValidateActionTypes = _interopRequireDefault(require("./numberValidateActionTypes"));

var _getNumberValidateReducer = _interopRequireDefault(require("./getNumberValidateReducer"));

var _dec, _class, _class2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

var NumberValidate = (
/**
 * @class
 * @description Validate number with number parser api
 */
_dec = (0, _di.Module)({
  deps: ['Brand', 'Client', 'RegionSettings', 'AccountInfo', {
    dep: 'CompanyContacts'
  }]
}), _dec(_class = (_class2 =
/*#__PURE__*/
function (_RcModule) {
  _inherits(NumberValidate, _RcModule);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Client} params.client - client module instance
   * @param {CompanyContacts} params.companyContacts - companyContacts module instance
   * @param {RegionSettings} params.regionSettings - regionSettings module instance
   * @param {AccountInfo} params.accountInfo - accountInfo module instance
   */
  function NumberValidate(_ref) {
    var _context;

    var _this;

    var brand = _ref.brand,
        client = _ref.client,
        companyContacts = _ref.companyContacts,
        regionSettings = _ref.regionSettings,
        accountInfo = _ref.accountInfo,
        options = _objectWithoutProperties(_ref, ["brand", "client", "companyContacts", "regionSettings", "accountInfo"]);

    _classCallCheck(this, NumberValidate);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(NumberValidate).call(this, _objectSpread({}, options, {
      actionTypes: _numberValidateActionTypes["default"]
    })));
    _this._brand = brand;
    _this._client = client;
    _this._companyContacts = (_context = _assertThisInitialized(_this), _ensureExist["default"]).call(_context, companyContacts, 'companyContacts');
    _this._regionSettings = regionSettings;
    _this._accountInfo = accountInfo;
    _this._reducer = (0, _getNumberValidateReducer["default"])(_this.actionTypes);
    return _this;
  }

  _createClass(NumberValidate, [{
    key: "initialize",
    value: function initialize() {
      var _this2 = this;

      this.store.subscribe(function () {
        return _this2._onStateChange();
      });
    }
  }, {
    key: "_onStateChange",
    value: function _onStateChange() {
      if (this._shouldInit()) {
        this._initModuleStatus();
      } else if (this._shouldReset()) {
        this._resetModuleStatus();
      }
    }
  }, {
    key: "_shouldInit",
    value: function _shouldInit() {
      return this._brand.ready && this._regionSettings.ready && this._companyContacts.ready && this._accountInfo.ready && !this.ready;
    }
  }, {
    key: "_initModuleStatus",
    value: function _initModuleStatus() {
      this.store.dispatch({
        type: this.actionTypes.initSuccess
      });
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return (!this._brand.ready || !this._accountInfo.ready || !this._regionSettings.ready || !this._companyContacts.ready) && this.ready;
    }
  }, {
    key: "_resetModuleStatus",
    value: function _resetModuleStatus() {
      this.store.dispatch({
        type: this.actionTypes.resetSuccess
      });
    }
  }, {
    key: "isNoToNumber",
    value: function isNoToNumber(input) {
      if ((0, _isBlank["default"])(input)) {
        return true;
      }

      var _parse = (0, _phoneNumber.parse)({
        input: input,
        countryCode: this._regionSettings.countryCode,
        areaCode: this._regionSettings.areaCode
      }),
          hasInvalidChars = _parse.hasInvalidChars,
          isValid = _parse.isValid;

      if (hasInvalidChars || !isValid) {
        return true;
      }

      return false;
    }
  }, {
    key: "isNoAreaCode",
    value: function isNoAreaCode(input) {
      var _parse2 = (0, _phoneNumber.parse)({
        input: input,
        countryCode: this._regionSettings.countryCode,
        areaCode: this._regionSettings.areaCode
      }),
          hasPlus = _parse2.hasPlus,
          phoneNumber = _parse2.phoneNumber,
          isServiceNumber = _parse2.isServiceNumber;

      var _this$_regionSettings = this._regionSettings,
          countryCode = _this$_regionSettings.countryCode,
          areaCode = _this$_regionSettings.areaCode;

      if (this._brand.id === '1210' && !isServiceNumber && !hasPlus && phoneNumber.length === 7 && (countryCode === 'CA' || countryCode === 'US') && areaCode === '') {
        return true;
      }

      return false;
    }
  }, {
    key: "_isSpecial",
    value: function _isSpecial(phoneNumber) {
      if (phoneNumber && phoneNumber.special) {
        return true;
      }

      return false;
    }
  }, {
    key: "isNotAnExtension",
    value: function isNotAnExtension(extensionNumber) {
      if (extensionNumber && extensionNumber.length <= 6 && !this._companyContacts.isAvailableExtension(extensionNumber)) {
        return true;
      }

      return false;
    }
  }, {
    key: "isCompanyExtension",
    value: function isCompanyExtension(companyNumber, extensionNumber) {
      var _this$_regionSettings2 = this._regionSettings,
          countryCode = _this$_regionSettings2.countryCode,
          areaCode = _this$_regionSettings2.areaCode;
      var normalizedCompanyNumber = (0, _normalizeNumber["default"])({
        phoneNumber: companyNumber,
        countryCode: countryCode,
        areaCode: areaCode
      });

      if (normalizedCompanyNumber !== this._accountInfo.mainCompanyNumber) {
        return false;
      }

      return this._companyContacts.isAvailableExtension(extensionNumber);
    }
  }, {
    key: "validateNumbers",
    value: function () {
      var _validateNumbers = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(phoneNumbers) {
        var validateResult, validatedNumbers;
        return regeneratorRuntime.wrap(function _callee$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                validateResult = this.validateFormat(phoneNumbers);

                if (validateResult.result) {
                  _context2.next = 3;
                  break;
                }

                return _context2.abrupt("return", validateResult);

              case 3:
                _context2.next = 5;
                return this.validateWithNumberParser(phoneNumbers);

              case 5:
                validatedNumbers = _context2.sent;
                return _context2.abrupt("return", validatedNumbers);

              case 7:
              case "end":
                return _context2.stop();
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
      var _this3 = this;

      var errors = [];
      phoneNumbers.map(function (phoneNumber) {
        if (_this3.isNoToNumber(phoneNumber)) {
          errors.push({
            phoneNumber: phoneNumber,
            type: 'noToNumber'
          });
          return null;
        }

        if (_this3.isNoAreaCode(phoneNumber)) {
          errors.push({
            phoneNumber: phoneNumber,
            type: 'noAreaCode'
          });
        }

        return null;
      });
      return {
        result: errors.length === 0,
        errors: errors
      };
    }
  }, {
    key: "validateWithNumberParser",
    value: function () {
      var _validateWithNumberParser = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(phoneNumbers) {
        var _this4 = this;

        var pasedNumers, errors, validatedPhoneNumbers;
        return regeneratorRuntime.wrap(function _callee2$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this._numberParser(phoneNumbers);

              case 2:
                pasedNumers = _context3.sent;
                errors = [];
                validatedPhoneNumbers = [];
                pasedNumers.map(function (phoneNumber) {
                  if (_this4._isSpecial(phoneNumber)) {
                    errors.push({
                      phoneNumber: phoneNumber.originalString,
                      type: 'specialNumber'
                    });
                    return null;
                  }

                  if (_this4.isNotAnExtension(phoneNumber.originalString)) {
                    errors.push({
                      phoneNumber: phoneNumber.originalString,
                      type: 'notAnExtension'
                    });
                    return null;
                  }

                  validatedPhoneNumbers.push(phoneNumber);
                  return null;
                });
                return _context3.abrupt("return", {
                  result: errors.length === 0,
                  numbers: validatedPhoneNumbers,
                  errors: errors
                });

              case 7:
              case "end":
                return _context3.stop();
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
      var _numberParser2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(phoneNumbers) {
        var _this$_regionSettings3, countryCode, areaCode, homeCountry, normalizedNumbers, response;

        return regeneratorRuntime.wrap(function _callee3$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _this$_regionSettings3 = this._regionSettings, countryCode = _this$_regionSettings3.countryCode, areaCode = _this$_regionSettings3.areaCode;
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
                _context4.next = 5;
                return this._numberParserApi(normalizedNumbers, homeCountry);

              case 5:
                response = _context4.sent;
                return _context4.abrupt("return", response.phoneNumbers.map(function (phoneNumber) {
                  return _objectSpread({}, phoneNumber, {
                    international: !!phoneNumber.country && phoneNumber.country.callingCode !== response.homeCountry.callingCode
                  });
                }));

              case 7:
              case "end":
                return _context4.stop();
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
      var _numberParserApi2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(originalStrings, homeCountry) {
        var response;
        return regeneratorRuntime.wrap(function _callee4$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this._client.numberParser().parse().post({
                  originalStrings: originalStrings
                }, homeCountry);

              case 2:
                response = _context5.sent;
                return _context5.abrupt("return", response);

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee4, this);
      }));

      function _numberParserApi(_x4, _x5) {
        return _numberParserApi2.apply(this, arguments);
      }

      return _numberParserApi;
    }()
  }, {
    key: "status",
    get: function get() {
      return this.state.status;
    }
  }, {
    key: "ready",
    get: function get() {
      return this.status === _moduleStatuses["default"].ready;
    }
  }]);

  return NumberValidate;
}(_RcModule2["default"]), (_applyDecoratedDescriptor(_class2.prototype, "validateNumbers", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "validateNumbers"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "validateWithNumberParser", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "validateWithNumberParser"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_numberParser", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_numberParser"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_numberParserApi", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_numberParserApi"), _class2.prototype)), _class2)) || _class);
exports["default"] = NumberValidate;
//# sourceMappingURL=index.js.map
