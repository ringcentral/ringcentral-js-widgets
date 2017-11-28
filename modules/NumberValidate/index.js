'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _class, _desc, _value, _class2;

var _RcModule2 = require('../../lib/RcModule');

var _RcModule3 = _interopRequireDefault(_RcModule2);

var _di = require('../../lib/di');

var _isBlank = require('../../lib/isBlank');

var _isBlank2 = _interopRequireDefault(_isBlank);

var _moduleStatuses = require('../../enums/moduleStatuses');

var _moduleStatuses2 = _interopRequireDefault(_moduleStatuses);

var _normalizeNumber = require('../../lib/normalizeNumber');

var _normalizeNumber2 = _interopRequireDefault(_normalizeNumber);

var _parseNumber3 = require('../../lib/parseNumber');

var _parseNumber4 = _interopRequireDefault(_parseNumber3);

var _proxify = require('../../lib/proxy/proxify');

var _proxify2 = _interopRequireDefault(_proxify);

var _numberValidateActionTypes = require('./numberValidateActionTypes');

var _numberValidateActionTypes2 = _interopRequireDefault(_numberValidateActionTypes);

var _getNumberValidateReducer = require('./getNumberValidateReducer');

var _getNumberValidateReducer2 = _interopRequireDefault(_getNumberValidateReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

/**
 * @class
 * @description Validate number with number parser api
 */
var NumberValidate = (_dec = (0, _di.Module)({
  deps: ['Client', 'AccountExtension', 'RegionSettings', 'AccountInfo']
}), _dec(_class = (_class2 = function (_RcModule) {
  (0, _inherits3.default)(NumberValidate, _RcModule);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Client} params.client - client module instance
   * @param {AccountExtension} params.accountExtension - accountExtension module instance
   * @param {RegionSettings} params.regionSettings - regionSettings module instance
   * @param {AccountInfo} params.accountInfo - accountInfo module instance
   */
  function NumberValidate(_ref) {
    var client = _ref.client,
        accountExtension = _ref.accountExtension,
        regionSettings = _ref.regionSettings,
        accountInfo = _ref.accountInfo,
        options = (0, _objectWithoutProperties3.default)(_ref, ['client', 'accountExtension', 'regionSettings', 'accountInfo']);
    (0, _classCallCheck3.default)(this, NumberValidate);

    var _this = (0, _possibleConstructorReturn3.default)(this, (NumberValidate.__proto__ || (0, _getPrototypeOf2.default)(NumberValidate)).call(this, (0, _extends3.default)({}, options, {
      actionTypes: _numberValidateActionTypes2.default
    })));

    _this._client = client;
    _this._accountExtension = accountExtension;
    _this._regionSettings = regionSettings;
    _this._accountInfo = accountInfo;
    _this._reducer = (0, _getNumberValidateReducer2.default)(_this.actionTypes);
    return _this;
  }

  (0, _createClass3.default)(NumberValidate, [{
    key: 'initialize',
    value: function initialize() {
      var _this2 = this;

      this.store.subscribe(function () {
        return _this2._onStateChange();
      });
    }
  }, {
    key: '_onStateChange',
    value: function _onStateChange() {
      if (this._shouldInit()) {
        this._initModuleStatus();
      } else if (this._shouldReset()) {
        this._resetModuleStatus();
      }
    }
  }, {
    key: '_shouldInit',
    value: function _shouldInit() {
      return this._regionSettings.ready && this._accountExtension.ready && this._accountInfo.ready && !this.ready;
    }
  }, {
    key: '_initModuleStatus',
    value: function _initModuleStatus() {
      this.store.dispatch({
        type: this.actionTypes.initSuccess
      });
    }
  }, {
    key: '_shouldReset',
    value: function _shouldReset() {
      return (!this._accountInfo.ready || !this._regionSettings.ready || !this._accountExtension.ready) && this.ready;
    }
  }, {
    key: '_resetModuleStatus',
    value: function _resetModuleStatus() {
      this.store.dispatch({
        type: this.actionTypes.resetSuccess
      });
    }
  }, {
    key: 'isNoToNumber',
    value: function isNoToNumber(phoneNumber) {
      if ((0, _isBlank2.default)(phoneNumber)) {
        return true;
      }

      var _parseNumber = (0, _parseNumber4.default)(phoneNumber),
          number = _parseNumber.number,
          hasInvalidChars = _parseNumber.hasInvalidChars;

      if (hasInvalidChars || number === '') {
        return true;
      }
      return false;
    }
  }, {
    key: 'isNoAreaCode',
    value: function isNoAreaCode(phoneNumber) {
      var _parseNumber2 = (0, _parseNumber4.default)(phoneNumber),
          hasPlus = _parseNumber2.hasPlus,
          number = _parseNumber2.number,
          isServiceNumber = _parseNumber2.isServiceNumber;

      var _regionSettings = this._regionSettings,
          countryCode = _regionSettings.countryCode,
          areaCode = _regionSettings.areaCode;

      if (!isServiceNumber && !hasPlus && number.length === 7 && (countryCode === 'CA' || countryCode === 'US') && areaCode === '') {
        return true;
      }
      return false;
    }
  }, {
    key: '_isSpecial',
    value: function _isSpecial(phoneNumber) {
      if (phoneNumber && phoneNumber.special) {
        return true;
      }
      return false;
    }
  }, {
    key: 'isNotAnExtension',
    value: function isNotAnExtension(extensionNumber) {
      if (extensionNumber && extensionNumber.length <= 6 && !this._accountExtension.isAvailableExtension(extensionNumber)) {
        return true;
      }
      return false;
    }
  }, {
    key: 'isCompanyExtension',
    value: function isCompanyExtension(companyNumber, extensionNumber) {
      var _regionSettings2 = this._regionSettings,
          countryCode = _regionSettings2.countryCode,
          areaCode = _regionSettings2.areaCode;

      var normalizedCompanyNumber = (0, _normalizeNumber2.default)({ phoneNumber: companyNumber, countryCode: countryCode, areaCode: areaCode });
      if (normalizedCompanyNumber !== this._accountInfo.mainCompanyNumber) {
        return false;
      }
      return this._accountExtension.isAvailableExtension(extensionNumber);
    }
  }, {
    key: 'validateNumbers',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(phoneNumbers) {
        var validateResult, validatedNumbers;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                validateResult = this.validateFormat(phoneNumbers);

                if (validateResult.result) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt('return', validateResult);

              case 3:
                _context.next = 5;
                return this.validateWithNumberParser(phoneNumbers);

              case 5:
                validatedNumbers = _context.sent;
                return _context.abrupt('return', validatedNumbers);

              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function validateNumbers(_x) {
        return _ref2.apply(this, arguments);
      }

      return validateNumbers;
    }()
  }, {
    key: 'validateFormat',
    value: function validateFormat(phoneNumbers) {
      var _this3 = this;

      var errors = [];
      phoneNumbers.map(function (phoneNumber) {
        if (_this3.isNoToNumber(phoneNumber)) {
          errors.push({ phoneNumber: phoneNumber, type: 'noToNumber' });
          return null;
        }
        if (_this3.isNoAreaCode(phoneNumber)) {
          errors.push({ phoneNumber: phoneNumber, type: 'noAreaCode' });
        }
        return null;
      });
      return {
        result: errors.length === 0,
        errors: errors
      };
    }
  }, {
    key: 'validateWithNumberParser',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(phoneNumbers) {
        var _this4 = this;

        var pasedNumers, errors, validatedPhoneNumbers;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this._numberParser(phoneNumbers);

              case 2:
                pasedNumers = _context2.sent;
                errors = [];
                validatedPhoneNumbers = [];

                pasedNumers.map(function (phoneNumber) {
                  if (_this4._isSpecial(phoneNumber)) {
                    errors.push({ phoneNumber: phoneNumber.originalString, type: 'specialNumber' });
                    return null;
                  }
                  if (_this4.isNotAnExtension(phoneNumber.originalString)) {
                    errors.push({ phoneNumber: phoneNumber.originalString, type: 'notAnExtension' });
                    return null;
                  }
                  validatedPhoneNumbers.push(phoneNumber);
                  return null;
                });
                return _context2.abrupt('return', {
                  result: errors.length === 0,
                  numbers: validatedPhoneNumbers,
                  errors: errors
                });

              case 7:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function validateWithNumberParser(_x2) {
        return _ref3.apply(this, arguments);
      }

      return validateWithNumberParser;
    }()
  }, {
    key: '_numberParser',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(phoneNumbers) {
        var _regionSettings3, countryCode, areaCode, homeCountry, normalizedNumbers, response;

        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _regionSettings3 = this._regionSettings, countryCode = _regionSettings3.countryCode, areaCode = _regionSettings3.areaCode;
                homeCountry = countryCode ? { homeCountry: countryCode } : {};
                normalizedNumbers = phoneNumbers.map(function (phoneNumber) {
                  return (0, _normalizeNumber2.default)({ phoneNumber: phoneNumber, countryCode: countryCode, areaCode: areaCode });
                });
                _context3.next = 5;
                return this._numberParserApi(normalizedNumbers, homeCountry);

              case 5:
                response = _context3.sent;
                return _context3.abrupt('return', response.phoneNumbers);

              case 7:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function _numberParser(_x3) {
        return _ref4.apply(this, arguments);
      }

      return _numberParser;
    }()
  }, {
    key: '_numberParserApi',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(originalStrings, homeCountry) {
        var response;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this._client.numberParser().parse().post({
                  originalStrings: originalStrings
                }, homeCountry);

              case 2:
                response = _context4.sent;
                return _context4.abrupt('return', response);

              case 4:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function _numberParserApi(_x4, _x5) {
        return _ref5.apply(this, arguments);
      }

      return _numberParserApi;
    }()
  }, {
    key: 'status',
    get: function get() {
      return this.state.status;
    }
  }, {
    key: 'ready',
    get: function get() {
      return this.status === _moduleStatuses2.default.ready;
    }
  }]);
  return NumberValidate;
}(_RcModule3.default), (_applyDecoratedDescriptor(_class2.prototype, 'validateNumbers', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'validateNumbers'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'validateWithNumberParser', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'validateWithNumberParser'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, '_numberParser', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, '_numberParser'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, '_numberParserApi', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, '_numberParserApi'), _class2.prototype)), _class2)) || _class);
exports.default = NumberValidate;
//# sourceMappingURL=index.js.map
