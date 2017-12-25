'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

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

require('core-js/fn/array/find');

var _RcModule2 = require('../../lib/RcModule');

var _RcModule3 = _interopRequireDefault(_RcModule2);

var _di = require('../../lib/di');

var _isBlank = require('../../lib/isBlank');

var _isBlank2 = _interopRequireDefault(_isBlank);

var _moduleStatuses = require('../../enums/moduleStatuses');

var _moduleStatuses2 = _interopRequireDefault(_moduleStatuses);

var _messageSenderActionTypes = require('./messageSenderActionTypes');

var _messageSenderActionTypes2 = _interopRequireDefault(_messageSenderActionTypes);

var _getMessageSenderReducer = require('./getMessageSenderReducer');

var _getMessageSenderReducer2 = _interopRequireDefault(_getMessageSenderReducer);

var _messageSenderStatus = require('./messageSenderStatus');

var _messageSenderStatus2 = _interopRequireDefault(_messageSenderStatus);

var _messageSenderMessages = require('./messageSenderMessages');

var _messageSenderMessages2 = _interopRequireDefault(_messageSenderMessages);

var _proxify = require('../../lib/proxy/proxify');

var _proxify2 = _interopRequireDefault(_proxify);

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
 * @description Message sender and validator module
 */
var MessageSender = (_dec = (0, _di.Module)({
  deps: ['Alert', 'Client', 'ExtensionInfo', 'ExtensionPhoneNumber', 'NumberValidate']
}), _dec(_class = (_class2 = function (_RcModule) {
  (0, _inherits3.default)(MessageSender, _RcModule);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Alert} params.alert - alert module instance
   * @param {Client} params.client - client module instance
   * @param {ExtensionInfo} params.extensionInfo - extensionInfo module instance
   * @param {ExtensionPhoneNumber} params.extensionPhoneNumber - extensionPhoneNumber module instance
   * @param {NumberValidate} params.numberValidate - numberValidate module instance
   */
  function MessageSender(_ref) {
    var alert = _ref.alert,
        client = _ref.client,
        extensionInfo = _ref.extensionInfo,
        extensionPhoneNumber = _ref.extensionPhoneNumber,
        numberValidate = _ref.numberValidate,
        options = (0, _objectWithoutProperties3.default)(_ref, ['alert', 'client', 'extensionInfo', 'extensionPhoneNumber', 'numberValidate']);
    (0, _classCallCheck3.default)(this, MessageSender);

    var _this = (0, _possibleConstructorReturn3.default)(this, (MessageSender.__proto__ || (0, _getPrototypeOf2.default)(MessageSender)).call(this, (0, _extends3.default)({}, options, {
      actionTypes: _messageSenderActionTypes2.default
    })));

    _this._alert = alert;
    _this._client = client;
    _this._extensionPhoneNumber = extensionPhoneNumber;
    _this._extensionInfo = extensionInfo;
    _this._reducer = (0, _getMessageSenderReducer2.default)(_this.actionTypes);
    _this._numberValidate = numberValidate;
    return _this;
  }

  (0, _createClass3.default)(MessageSender, [{
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
      return this._extensionPhoneNumber.ready && this._extensionInfo.ready && !this.ready;
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
      return (!this._extensionPhoneNumber.ready || !this._extensionInfo.ready) && this.ready;
    }
  }, {
    key: '_resetModuleStatus',
    value: function _resetModuleStatus() {
      this.store.dispatch({
        type: this.actionTypes.resetSuccess
      });
    }
  }, {
    key: '_alertWarning',
    value: function _alertWarning(message) {
      if (message) {
        this._alert.warning({
          message: message,
          ttl: 0
        });
        return true;
      }
      return false;
    }
  }, {
    key: '_validateText',
    value: function _validateText(text) {
      if ((0, _isBlank2.default)(text)) {
        this._alertWarning(_messageSenderMessages2.default.textEmpty);
        return false;
      }

      if (text.length > 1000) {
        this._alertWarning(_messageSenderMessages2.default.textTooLong);
        return false;
      }

      return true;
    }
  }, {
    key: '_validateToNumbersIsEmpty',
    value: function _validateToNumbersIsEmpty(toNumbers) {
      if (toNumbers.length === 0) {
        this._alertWarning(_messageSenderMessages2.default.recipientsEmpty);
        return true;
      }
      return false;
    }
  }, {
    key: '_validateSenderNumber',
    value: function _validateSenderNumber(senderNumber) {
      var validateResult = true;
      if ((0, _isBlank2.default)(senderNumber)) {
        validateResult = false;
      }
      this.store.dispatch({ type: this.actionTypes.validate });
      if (validateResult) {
        var isMySenderNumber = this.senderNumbersList.find(function (number) {
          return number.phoneNumber === senderNumber;
        });
        if (!isMySenderNumber) {
          validateResult = false;
        }
      }
      if (!validateResult) {
        this.store.dispatch({ type: this.actionTypes.validateError });
        this._alertWarning(_messageSenderMessages2.default.senderNumberInvalid);
      }
      return validateResult;
    }
  }, {
    key: '_alertInvalidRecipientErrors',
    value: function _alertInvalidRecipientErrors(errors) {
      var _this3 = this;

      errors.forEach(function (error) {
        var message = _messageSenderMessages2.default[error.type];
        if (!_this3._alertWarning(message)) {
          _this3._alertWarning(_messageSenderMessages2.default.recipientNumberInvalids);
        }
      });
    }
  }, {
    key: '_validateToNumbers',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(toNumbers) {
        var result, recipientNumbers, numberValidateResult, numbers, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, number;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                result = {
                  result: false
                };

                if (!this._validateToNumbersIsEmpty(toNumbers)) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt('return', result);

              case 3:
                recipientNumbers = toNumbers.filter(function (item, index, arr) {
                  return arr.indexOf(item) === index;
                });

                this.store.dispatch({ type: this.actionTypes.validate });
                _context.next = 7;
                return this._numberValidate.validateNumbers(recipientNumbers);

              case 7:
                numberValidateResult = _context.sent;

                if (numberValidateResult.result) {
                  _context.next = 12;
                  break;
                }

                this._alertInvalidRecipientErrors(numberValidateResult.errors);
                this.store.dispatch({ type: this.actionTypes.validateError });
                return _context.abrupt('return', result);

              case 12:
                numbers = [];
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context.prev = 16;
                _iterator = (0, _getIterator3.default)(numberValidateResult.numbers);

              case 18:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context.next = 32;
                  break;
                }

                number = _step.value;

                if (!(number.subAddress && number.subAddress.length > 0)) {
                  _context.next = 28;
                  break;
                }

                if (this._numberValidate.isCompanyExtension(number.e164, number.subAddress)) {
                  _context.next = 25;
                  break;
                }

                this._alertWarning(_messageSenderMessages2.default.notAnExtension);
                this.store.dispatch({ type: this.actionTypes.validateError });
                return _context.abrupt('return', result);

              case 25:
                numbers.push(number.subAddress);
                _context.next = 29;
                break;

              case 28:
                numbers.push(number.e164);

              case 29:
                _iteratorNormalCompletion = true;
                _context.next = 18;
                break;

              case 32:
                _context.next = 38;
                break;

              case 34:
                _context.prev = 34;
                _context.t0 = _context['catch'](16);
                _didIteratorError = true;
                _iteratorError = _context.t0;

              case 38:
                _context.prev = 38;
                _context.prev = 39;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 41:
                _context.prev = 41;

                if (!_didIteratorError) {
                  _context.next = 44;
                  break;
                }

                throw _iteratorError;

              case 44:
                return _context.finish(41);

              case 45:
                return _context.finish(38);

              case 46:
                result.result = true;
                result.numbers = numbers;
                return _context.abrupt('return', result);

              case 49:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[16, 34, 38, 46], [39,, 41, 45]]);
      }));

      function _validateToNumbers(_x) {
        return _ref2.apply(this, arguments);
      }

      return _validateToNumbers;
    }()
  }, {
    key: 'send',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(_ref4) {
        var fromNumber = _ref4.fromNumber,
            toNumbers = _ref4.toNumbers,
            text = _ref4.text,
            replyOnMessageId = _ref4.replyOnMessageId;

        var validateToNumberResult, recipientNumbers, extensionNumbers, phoneNumbers, responses, pagerResponse, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, phoneNumber, smsResponse;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (this._validateText(text)) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt('return', null);

              case 2:
                _context2.prev = 2;
                _context2.next = 5;
                return this._validateToNumbers(toNumbers);

              case 5:
                validateToNumberResult = _context2.sent;

                if (validateToNumberResult.result) {
                  _context2.next = 8;
                  break;
                }

                return _context2.abrupt('return', null);

              case 8:
                recipientNumbers = validateToNumberResult.numbers;
                extensionNumbers = recipientNumbers.filter(function (number) {
                  return number.length <= 6;
                });
                phoneNumbers = recipientNumbers.filter(function (number) {
                  return number.length > 6;
                });

                // not validate sender number if recipient is only extension number

                if (!(phoneNumbers.length > 0)) {
                  _context2.next = 14;
                  break;
                }

                if (this._validateSenderNumber(fromNumber)) {
                  _context2.next = 14;
                  break;
                }

                return _context2.abrupt('return', null);

              case 14:

                this.store.dispatch({
                  type: this.actionTypes.send
                });
                responses = [];

                if (!(extensionNumbers.length > 0)) {
                  _context2.next = 21;
                  break;
                }

                _context2.next = 19;
                return this._sendPager({
                  toNumbers: extensionNumbers,
                  text: text,
                  replyOnMessageId: replyOnMessageId
                });

              case 19:
                pagerResponse = _context2.sent;

                responses.push(pagerResponse);

              case 21:
                if (!(phoneNumbers.length > 0)) {
                  _context2.next = 50;
                  break;
                }

                _iteratorNormalCompletion2 = true;
                _didIteratorError2 = false;
                _iteratorError2 = undefined;
                _context2.prev = 25;
                _iterator2 = (0, _getIterator3.default)(phoneNumbers);

              case 27:
                if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                  _context2.next = 36;
                  break;
                }

                phoneNumber = _step2.value;
                _context2.next = 31;
                return this._sendSms({ fromNumber: fromNumber, toNumber: phoneNumber, text: text });

              case 31:
                smsResponse = _context2.sent;

                responses.push(smsResponse);

              case 33:
                _iteratorNormalCompletion2 = true;
                _context2.next = 27;
                break;

              case 36:
                _context2.next = 42;
                break;

              case 38:
                _context2.prev = 38;
                _context2.t0 = _context2['catch'](25);
                _didIteratorError2 = true;
                _iteratorError2 = _context2.t0;

              case 42:
                _context2.prev = 42;
                _context2.prev = 43;

                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                  _iterator2.return();
                }

              case 45:
                _context2.prev = 45;

                if (!_didIteratorError2) {
                  _context2.next = 48;
                  break;
                }

                throw _iteratorError2;

              case 48:
                return _context2.finish(45);

              case 49:
                return _context2.finish(42);

              case 50:
                this.store.dispatch({
                  type: this.actionTypes.sendOver
                });
                return _context2.abrupt('return', responses);

              case 54:
                _context2.prev = 54;
                _context2.t1 = _context2['catch'](2);

                this.store.dispatch({
                  type: this.actionTypes.sendError,
                  error: 'error'
                });
                this._onSendError(_context2.t1);
                console.debug('sendComposeText e ', _context2.t1);
                throw _context2.t1;

              case 60:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[2, 54], [25, 38, 42, 50], [43,, 45, 49]]);
      }));

      function send(_x2) {
        return _ref3.apply(this, arguments);
      }

      return send;
    }()
  }, {
    key: '_sendSms',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(_ref6) {
        var fromNumber = _ref6.fromNumber,
            toNumber = _ref6.toNumber,
            text = _ref6.text;
        var toUsers, response;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                toUsers = [{ phoneNumber: toNumber }];
                _context3.next = 3;
                return this._client.account().extension().sms().post({
                  from: { phoneNumber: fromNumber },
                  to: toUsers,
                  text: text
                });

              case 3:
                response = _context3.sent;
                return _context3.abrupt('return', response);

              case 5:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function _sendSms(_x3) {
        return _ref5.apply(this, arguments);
      }

      return _sendSms;
    }()
  }, {
    key: '_sendPager',
    value: function () {
      var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(_ref8) {
        var toNumbers = _ref8.toNumbers,
            text = _ref8.text,
            replyOnMessageId = _ref8.replyOnMessageId;
        var from, toUsers, params, response;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                from = { extensionNumber: this._extensionInfo.extensionNumber };
                toUsers = toNumbers.map(function (number) {
                  return { extensionNumber: number };
                });
                params = { from: from, to: toUsers, text: text };

                if (replyOnMessageId) {
                  params.replyOn = replyOnMessageId;
                }
                _context4.next = 6;
                return this._client.account().extension().companyPager().post(params);

              case 6:
                response = _context4.sent;
                return _context4.abrupt('return', response);

              case 8:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function _sendPager(_x4) {
        return _ref7.apply(this, arguments);
      }

      return _sendPager;
    }()
  }, {
    key: '_onSendError',
    value: function _onSendError(error) {
      var _this4 = this;

      var errResp = error.apiResponse;
      if (errResp && errResp.response && !errResp.response.ok && (errResp._json.errorCode === 'InvalidParameter' || errResp._json.errorCode === 'InternationalProhibited' || errResp._json.errorCode === 'CMN-408')) {
        errResp._json.errors.map(function (err) {
          if ((err.errorCode === 'CMN-101' || err.errorCode === 'CMN-102' || err.errorCode === 'CMN-414') && err.parameterName.startsWith('to')) {
            // 101 : "Parameter [to.extensionNumber] value is invalid"
            // 101 : "Parameter [to.phoneNumber] value is invalid"
            // 102 : "Resource for parameter [to] is not found"
            _this4._alertWarning(_messageSenderMessages2.default.recipientNumberInvalids);
            return null;
          }
          if (err.errorCode === 'MSG-246') {
            // MSG-246 : "Sending SMS from/to extension numbers is not available"
            _this4._alertWarning(_messageSenderMessages2.default.notSmsToExtension);
          }
          if (err.errorCode === 'MSG-240') {
            // MSG-240 : "International SMS is not supported"
            _this4._alertWarning(_messageSenderMessages2.default.internationalSMSNotSupported);
          }
          if (err.errorCode === 'CMN-408') {
            // MSG-240 : "In order to call this API endpoint, user needs to have [InternalSMS] permission for requested resource."
            _this4._alertWarning(_messageSenderMessages2.default.noInternalSMSPermission);
          }
          return null;
        });
        return;
      }
      this._alertWarning(_messageSenderMessages2.default.sendError);
    }
  }, {
    key: 'status',
    get: function get() {
      return this.state.status;
    }
  }, {
    key: 'sendStatus',
    get: function get() {
      return this.state.sendStatus;
    }
  }, {
    key: 'ready',
    get: function get() {
      return this.status === _moduleStatuses2.default.ready;
    }
  }, {
    key: 'idle',
    get: function get() {
      return this.sendStatus === _messageSenderStatus2.default.idle;
    }
  }, {
    key: 'senderNumbersList',
    get: function get() {
      return this._extensionPhoneNumber.smsSenderNumbers;
    }
  }]);
  return MessageSender;
}(_RcModule3.default), (_applyDecoratedDescriptor(_class2.prototype, '_validateToNumbers', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, '_validateToNumbers'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'send', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'send'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, '_sendSms', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, '_sendSms'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, '_sendPager', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, '_sendPager'), _class2.prototype)), _class2)) || _class);
exports.default = MessageSender;
//# sourceMappingURL=index.js.map
