"use strict";

require("core-js/modules/es6.array.find");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.MultipartMessageMaxLength = exports.MessageMaxLength = void 0;

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.string.starts-with");

require("core-js/modules/es6.array.map");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.array.filter");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.array.for-each");

var _ramda = require("ramda");

var _events = _interopRequireDefault(require("events"));

var _uuid = _interopRequireDefault(require("uuid"));

var _RcModule2 = _interopRequireDefault(require("../../lib/RcModule"));

var _di = require("../../lib/di");

var _isBlank = _interopRequireDefault(require("../../lib/isBlank"));

var _moduleStatuses = _interopRequireDefault(require("../../enums/moduleStatuses"));

var _messageSenderActionTypes = _interopRequireDefault(require("./messageSenderActionTypes"));

var _getMessageSenderReducer = _interopRequireDefault(require("./getMessageSenderReducer"));

var _messageSenderStatus = _interopRequireDefault(require("./messageSenderStatus"));

var _messageSenderMessages = _interopRequireDefault(require("./messageSenderMessages"));

var _proxify = _interopRequireDefault(require("../../lib/proxy/proxify"));

var _chunkMessage = _interopRequireDefault(require("../../lib/chunkMessage"));

var _sleep = _interopRequireDefault(require("../../lib/sleep"));

var _dec, _class, _class2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

var MessageMaxLength = 1000;
exports.MessageMaxLength = MessageMaxLength;
var MultipartMessageMaxLength = MessageMaxLength * 5;
exports.MultipartMessageMaxLength = MultipartMessageMaxLength;
var SENDING_THRESHOLD = 30;
/**
 * @class
 * @description Message sender and validator module
 */

var MessageSender = (_dec = (0, _di.Module)({
  deps: ['Alert', 'Client', 'ExtensionInfo', 'ExtensionPhoneNumber', 'NumberValidate', {
    dep: 'AvailabilityMonitor',
    optional: true
  }]
}), _dec(_class = (_class2 =
/*#__PURE__*/
function (_RcModule) {
  _inherits(MessageSender, _RcModule);

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
    var _this;

    var alert = _ref.alert,
        client = _ref.client,
        extensionInfo = _ref.extensionInfo,
        extensionPhoneNumber = _ref.extensionPhoneNumber,
        numberValidate = _ref.numberValidate,
        availabilityMonitor = _ref.availabilityMonitor,
        options = _objectWithoutProperties(_ref, ["alert", "client", "extensionInfo", "extensionPhoneNumber", "numberValidate", "availabilityMonitor"]);

    _classCallCheck(this, MessageSender);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MessageSender).call(this, _objectSpread({}, options, {
      actionTypes: _messageSenderActionTypes["default"]
    })));
    _this._alert = alert;
    _this._client = client;
    _this._extensionPhoneNumber = extensionPhoneNumber;
    _this._extensionInfo = extensionInfo;
    _this._reducer = (0, _getMessageSenderReducer["default"])(_this.actionTypes);
    _this._numberValidate = numberValidate;
    _this._availabilityMonitor = availabilityMonitor;
    _this._eventEmitter = new _events["default"]();
    return _this;
  }

  _createClass(MessageSender, [{
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
      return this._extensionPhoneNumber.ready && this._extensionInfo.ready && (!this._availabilityMonitor || this._availabilityMonitor.ready) && !this.ready;
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
      return (!this._extensionPhoneNumber.ready || !this._extensionInfo.ready || !!this._availabilityMonitor && !this._availabilityMonitor.ready) && this.ready;
    }
  }, {
    key: "_resetModuleStatus",
    value: function _resetModuleStatus() {
      this.store.dispatch({
        type: this.actionTypes.resetSuccess
      });
    }
  }, {
    key: "_alertWarning",
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
    key: "_validateText",
    value: function _validateText(text, multipart) {
      if ((0, _isBlank["default"])(text)) {
        this._alertWarning(_messageSenderMessages["default"].textEmpty);

        return false;
      }

      if (!multipart && text.length > MessageMaxLength) {
        this._alertWarning(_messageSenderMessages["default"].textTooLong);

        return false;
      }

      if (multipart && text.length > MultipartMessageMaxLength) {
        this._alertWarning(_messageSenderMessages["default"].multipartTextTooLong);

        return false;
      }

      return true;
    }
  }, {
    key: "_validateToNumbersIsEmpty",
    value: function _validateToNumbersIsEmpty(toNumbers) {
      if (toNumbers.length === 0) {
        this._alertWarning(_messageSenderMessages["default"].recipientsEmpty);

        return true;
      }

      return false;
    }
  }, {
    key: "_validateSenderNumber",
    value: function _validateSenderNumber(senderNumber) {
      var validateResult = true;

      if ((0, _isBlank["default"])(senderNumber)) {
        validateResult = false;
      }

      this.store.dispatch({
        type: this.actionTypes.validate
      });

      if (validateResult) {
        var isMySenderNumber = (0, _ramda.find)(function (number) {
          return number.phoneNumber === senderNumber;
        }, this.senderNumbersList);

        if (!isMySenderNumber) {
          validateResult = false;
        }
      }

      if (!validateResult) {
        this.store.dispatch({
          type: this.actionTypes.validateError
        });

        this._alertWarning(_messageSenderMessages["default"].senderNumberInvalid);
      }

      return validateResult;
    }
  }, {
    key: "_alertInvalidRecipientErrors",
    value: function _alertInvalidRecipientErrors(errors) {
      var _this3 = this;

      errors.forEach(function (error) {
        var message = _messageSenderMessages["default"][error.type];

        if (!_this3._alertWarning(message)) {
          _this3._alertWarning(_messageSenderMessages["default"].recipientNumberInvalids);
        }
      });
    }
  }, {
    key: "_validateToNumbers",
    value: function _validateToNumbers(toNumbers) {
      var result, recipientNumbers, numberValidateResult, numbers, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, number;

      return regeneratorRuntime.async(function _validateToNumbers$(_context) {
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

              return _context.abrupt("return", result);

            case 3:
              recipientNumbers = toNumbers.filter(function (item, index, arr) {
                return arr.indexOf(item) === index;
              });
              this.store.dispatch({
                type: this.actionTypes.validate
              });
              _context.next = 7;
              return regeneratorRuntime.awrap(this._numberValidate.validateNumbers(recipientNumbers));

            case 7:
              numberValidateResult = _context.sent;

              if (numberValidateResult.result) {
                _context.next = 12;
                break;
              }

              this._alertInvalidRecipientErrors(numberValidateResult.errors);

              this.store.dispatch({
                type: this.actionTypes.validateError
              });
              return _context.abrupt("return", result);

            case 12:
              numbers = [];
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context.prev = 16;
              _iterator = numberValidateResult.numbers[Symbol.iterator]();

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

              this._alertWarning(_messageSenderMessages["default"].notAnExtension);

              this.store.dispatch({
                type: this.actionTypes.validateError
              });
              return _context.abrupt("return", result);

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
              _context.t0 = _context["catch"](16);
              _didIteratorError = true;
              _iteratorError = _context.t0;

            case 38:
              _context.prev = 38;
              _context.prev = 39;

              if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
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
              return _context.abrupt("return", result);

            case 49:
            case "end":
              return _context.stop();
          }
        }
      }, null, this, [[16, 34, 38, 46], [39,, 41, 45]]);
    }
  }, {
    key: "send",
    value: function send(_ref2) {
      var fromNumber, toNumbers, text, replyOnMessageId, _ref2$multipart, multipart, eventId, validateToNumberResult, recipientNumbers, extensionNumbers, phoneNumbers, responses, chunks, total, shouldSleep, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, chunk, pagerResponse, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, phoneNumber, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, _chunk, smsResponse;

      return regeneratorRuntime.async(function send$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              fromNumber = _ref2.fromNumber, toNumbers = _ref2.toNumbers, text = _ref2.text, replyOnMessageId = _ref2.replyOnMessageId, _ref2$multipart = _ref2.multipart, multipart = _ref2$multipart === void 0 ? false : _ref2$multipart;
              eventId = _uuid["default"].v4();

              if (this._validateText(text, multipart)) {
                _context2.next = 4;
                break;
              }

              return _context2.abrupt("return", null);

            case 4:
              _context2.prev = 4;
              _context2.next = 7;
              return regeneratorRuntime.awrap(this._validateToNumbers(toNumbers));

            case 7:
              validateToNumberResult = _context2.sent;

              if (validateToNumberResult.result) {
                _context2.next = 10;
                break;
              }

              return _context2.abrupt("return", null);

            case 10:
              recipientNumbers = validateToNumberResult.numbers;
              extensionNumbers = recipientNumbers.filter(function (number) {
                return number.length <= 6;
              });
              phoneNumbers = recipientNumbers.filter(function (number) {
                return number.length > 6;
              }); // not validate sender number if recipient is only extension number

              if (!(phoneNumbers.length > 0)) {
                _context2.next = 16;
                break;
              }

              if (this._validateSenderNumber(fromNumber)) {
                _context2.next = 16;
                break;
              }

              return _context2.abrupt("return", null);

            case 16:
              this._eventEmitter.emit(this.actionTypes.send, {
                eventId: eventId,
                fromNumber: fromNumber,
                toNumbers: toNumbers,
                text: text,
                replyOnMessageId: replyOnMessageId,
                multipart: multipart
              });

              this.store.dispatch({
                type: this.actionTypes.send
              });
              responses = [];
              chunks = multipart ? (0, _chunkMessage["default"])(text, MessageMaxLength) : [text];
              total = (phoneNumbers.length + 1) * chunks.length;
              shouldSleep = total > SENDING_THRESHOLD;

              if (!(extensionNumbers.length > 0)) {
                _context2.next = 54;
                break;
              }

              _iteratorNormalCompletion2 = true;
              _didIteratorError2 = false;
              _iteratorError2 = undefined;
              _context2.prev = 26;
              _iterator2 = chunks[Symbol.iterator]();

            case 28:
              if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                _context2.next = 40;
                break;
              }

              chunk = _step2.value;

              if (!shouldSleep) {
                _context2.next = 33;
                break;
              }

              _context2.next = 33;
              return regeneratorRuntime.awrap((0, _sleep["default"])(2000));

            case 33:
              _context2.next = 35;
              return regeneratorRuntime.awrap(this._sendPager({
                toNumbers: extensionNumbers,
                text: chunk,
                replyOnMessageId: replyOnMessageId
              }));

            case 35:
              pagerResponse = _context2.sent;
              responses.push(pagerResponse);

            case 37:
              _iteratorNormalCompletion2 = true;
              _context2.next = 28;
              break;

            case 40:
              _context2.next = 46;
              break;

            case 42:
              _context2.prev = 42;
              _context2.t0 = _context2["catch"](26);
              _didIteratorError2 = true;
              _iteratorError2 = _context2.t0;

            case 46:
              _context2.prev = 46;
              _context2.prev = 47;

              if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                _iterator2["return"]();
              }

            case 49:
              _context2.prev = 49;

              if (!_didIteratorError2) {
                _context2.next = 52;
                break;
              }

              throw _iteratorError2;

            case 52:
              return _context2.finish(49);

            case 53:
              return _context2.finish(46);

            case 54:
              if (!(phoneNumbers.length > 0)) {
                _context2.next = 110;
                break;
              }

              _iteratorNormalCompletion3 = true;
              _didIteratorError3 = false;
              _iteratorError3 = undefined;
              _context2.prev = 58;
              _iterator3 = phoneNumbers[Symbol.iterator]();

            case 60:
              if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                _context2.next = 96;
                break;
              }

              phoneNumber = _step3.value;
              _iteratorNormalCompletion4 = true;
              _didIteratorError4 = false;
              _iteratorError4 = undefined;
              _context2.prev = 65;
              _iterator4 = chunks[Symbol.iterator]();

            case 67:
              if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
                _context2.next = 79;
                break;
              }

              _chunk = _step4.value;

              if (!shouldSleep) {
                _context2.next = 72;
                break;
              }

              _context2.next = 72;
              return regeneratorRuntime.awrap((0, _sleep["default"])(2000));

            case 72:
              _context2.next = 74;
              return regeneratorRuntime.awrap(this._sendSms({
                fromNumber: fromNumber,
                toNumber: phoneNumber,
                text: _chunk
              }));

            case 74:
              smsResponse = _context2.sent;
              responses.push(smsResponse);

            case 76:
              _iteratorNormalCompletion4 = true;
              _context2.next = 67;
              break;

            case 79:
              _context2.next = 85;
              break;

            case 81:
              _context2.prev = 81;
              _context2.t1 = _context2["catch"](65);
              _didIteratorError4 = true;
              _iteratorError4 = _context2.t1;

            case 85:
              _context2.prev = 85;
              _context2.prev = 86;

              if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
                _iterator4["return"]();
              }

            case 88:
              _context2.prev = 88;

              if (!_didIteratorError4) {
                _context2.next = 91;
                break;
              }

              throw _iteratorError4;

            case 91:
              return _context2.finish(88);

            case 92:
              return _context2.finish(85);

            case 93:
              _iteratorNormalCompletion3 = true;
              _context2.next = 60;
              break;

            case 96:
              _context2.next = 102;
              break;

            case 98:
              _context2.prev = 98;
              _context2.t2 = _context2["catch"](58);
              _didIteratorError3 = true;
              _iteratorError3 = _context2.t2;

            case 102:
              _context2.prev = 102;
              _context2.prev = 103;

              if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
                _iterator3["return"]();
              }

            case 105:
              _context2.prev = 105;

              if (!_didIteratorError3) {
                _context2.next = 108;
                break;
              }

              throw _iteratorError3;

            case 108:
              return _context2.finish(105);

            case 109:
              return _context2.finish(102);

            case 110:
              this.store.dispatch({
                type: this.actionTypes.sendOver,
                toNumbers: toNumbers
              });
              return _context2.abrupt("return", responses);

            case 114:
              _context2.prev = 114;
              _context2.t3 = _context2["catch"](4);

              this._eventEmitter.emit(this.actionTypes.sendError, {
                eventId: eventId,
                fromNumber: fromNumber,
                toNumbers: toNumbers,
                text: text,
                replyOnMessageId: replyOnMessageId,
                multipart: multipart
              });

              this.store.dispatch({
                type: this.actionTypes.sendError,
                error: 'error'
              });

              this._onSendError(_context2.t3);

              console.debug('sendComposeText e ', _context2.t3);
              throw _context2.t3;

            case 121:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this, [[4, 114], [26, 42, 46, 54], [47,, 49, 53], [58, 98, 102, 110], [65, 81, 85, 93], [86,, 88, 92], [103,, 105, 109]]);
    }
  }, {
    key: "_sendSms",
    value: function _sendSms(_ref3) {
      var fromNumber, toNumber, text, toUsers, response;
      return regeneratorRuntime.async(function _sendSms$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              fromNumber = _ref3.fromNumber, toNumber = _ref3.toNumber, text = _ref3.text;
              toUsers = [{
                phoneNumber: toNumber
              }];
              _context3.next = 4;
              return regeneratorRuntime.awrap(this._client.account().extension().sms().post({
                from: {
                  phoneNumber: fromNumber
                },
                to: toUsers,
                text: text
              }));

            case 4:
              response = _context3.sent;
              return _context3.abrupt("return", response);

            case 6:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "_sendPager",
    value: function _sendPager(_ref4) {
      var toNumbers, text, replyOnMessageId, from, toUsers, params, response;
      return regeneratorRuntime.async(function _sendPager$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              toNumbers = _ref4.toNumbers, text = _ref4.text, replyOnMessageId = _ref4.replyOnMessageId;
              from = {
                extensionNumber: this._extensionInfo.extensionNumber
              };
              toUsers = toNumbers.map(function (number) {
                return {
                  extensionNumber: number
                };
              });
              params = {
                from: from,
                to: toUsers,
                text: text
              };

              if (replyOnMessageId) {
                params.replyOn = replyOnMessageId;
              }

              _context4.next = 7;
              return regeneratorRuntime.awrap(this._client.account().extension().companyPager().post(params));

            case 7:
              response = _context4.sent;
              return _context4.abrupt("return", response);

            case 9:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "_onSendError",
    value: function _onSendError(error) {
      var _this4 = this;

      var errResp = error.apiResponse;

      if (errResp && errResp.response && !errResp.response.ok && errResp._json && (errResp._json.errorCode === 'InvalidParameter' || errResp._json.errorCode === 'InternationalProhibited' || errResp._json.errorCode === 'CMN-408')) {
        errResp._json.errors.map(function (err) {
          if ((err.errorCode === 'CMN-101' || err.errorCode === 'CMN-102' || err.errorCode === 'CMN-414') && err.parameterName.startsWith('to')) {
            // 101 : "Parameter [to.extensionNumber] value is invalid"
            // 101 : "Parameter [to.phoneNumber] value is invalid"
            // 102 : "Resource for parameter [to] is not found"
            _this4._alertWarning(_messageSenderMessages["default"].recipientNumberInvalids);

            return null;
          }

          if (err.errorCode === 'MSG-246') {
            // MSG-246 : "Sending SMS from/to extension numbers is not available"
            _this4._alertWarning(_messageSenderMessages["default"].notSmsToExtension);
          }

          if (err.errorCode === 'MSG-240') {
            // MSG-240 : "International SMS is not supported"
            _this4._alertWarning(_messageSenderMessages["default"].internationalSMSNotSupported);
          }

          if (err.errorCode === 'CMN-408') {
            // MSG-240 : "In order to call this API endpoint, user needs to have [InternalSMS] permission for requested resource."
            _this4._alertWarning(_messageSenderMessages["default"].noInternalSMSPermission);
          }

          return null;
        });

        return;
      }

      if (this._availabilityMonitor && this._availabilityMonitor.checkIfHAError(error)) {
        return null;
      }

      this._alertWarning(_messageSenderMessages["default"].sendError);
    }
  }, {
    key: "on",
    value: function on(event, handler) {
      this._eventEmitter.on(event, handler);
    }
  }, {
    key: "status",
    get: function get() {
      return this.state.status;
    }
  }, {
    key: "sendStatus",
    get: function get() {
      return this.state.sendStatus;
    }
  }, {
    key: "ready",
    get: function get() {
      return this.status === _moduleStatuses["default"].ready;
    }
  }, {
    key: "idle",
    get: function get() {
      return this.sendStatus === _messageSenderStatus["default"].idle;
    }
  }, {
    key: "senderNumbersList",
    get: function get() {
      return this._extensionPhoneNumber.smsSenderNumbers;
    }
  }]);

  return MessageSender;
}(_RcModule2["default"]), (_applyDecoratedDescriptor(_class2.prototype, "_validateToNumbers", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_validateToNumbers"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "send", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "send"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_sendSms", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_sendSms"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_sendPager", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_sendPager"), _class2.prototype)), _class2)) || _class);
exports["default"] = MessageSender;
//# sourceMappingURL=index.js.map
