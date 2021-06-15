"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

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

require("core-js/modules/es6.array.find");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MessageSender = exports.ATTACHMENT_SIZE_LIMITATION = exports.MULTIPART_MESSAGE_MAX_LENGTH = exports.MESSAGE_MAX_LENGTH = void 0;

require("core-js/modules/es6.string.starts-with");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.array.filter");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.array.for-each");

var _ramda = require("ramda");

var _events = require("events");

var uuid = _interopRequireWildcard(require("uuid"));

var _core = require("@ringcentral-integration/core");

var _di = require("../../lib/di");

var _isBlank = _interopRequireDefault(require("../../lib/isBlank"));

var _messageSenderStatus = require("./messageSenderStatus");

var _messageSenderMessages = require("./messageSenderMessages");

var _messageSenderEvents = require("./messageSenderEvents");

var _proxify = _interopRequireDefault(require("../../lib/proxy/proxify"));

var _chunkMessage = _interopRequireDefault(require("../../lib/chunkMessage"));

var _sleep = _interopRequireDefault(require("../../lib/sleep"));

var _Analytics = require("../Analytics");

var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var MESSAGE_MAX_LENGTH = 1000;
exports.MESSAGE_MAX_LENGTH = MESSAGE_MAX_LENGTH;
var MULTIPART_MESSAGE_MAX_LENGTH = MESSAGE_MAX_LENGTH * 5;
exports.MULTIPART_MESSAGE_MAX_LENGTH = MULTIPART_MESSAGE_MAX_LENGTH;
var SENDING_THRESHOLD = 30;
var ATTACHMENT_SIZE_LIMITATION = 1500000;
/**
 * @class
 * @description Message sender and validator module
 */

exports.ATTACHMENT_SIZE_LIMITATION = ATTACHMENT_SIZE_LIMITATION;
var MessageSender = (_dec = (0, _di.Module)({
  name: 'MessageSender',
  deps: ['Alert', 'Client', 'ExtensionInfo', 'ExtensionPhoneNumber', 'NumberValidate', {
    dep: 'AvailabilityMonitor',
    optional: true
  }, {
    dep: 'MessageSenderOptions',
    optional: true
  }]
}), _dec2 = (0, _core.track)(_Analytics.trackEvents.smsAttempt), _dec3 = (0, _core.track)(_Analytics.trackEvents.smsSentSuccessfully), _dec4 = (0, _core.track)(_Analytics.trackEvents.smsSentFailed), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  _inherits(MessageSender, _RcModuleV);

  var _super = _createSuper(MessageSender);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Alert} params.alert - alert module instance
   * @param {Client} params.client - client module instance
   * @param {ExtensionInfo} params.extensionInfo - extensionInfo module instance
   * @param {ExtensionPhoneNumber} params.extensionPhoneNumber - extensionPhoneNumber module instance
   * @param {NumberValidate} params.numberValidate - numberValidate module instance
   */
  function MessageSender(deps) {
    var _this;

    _classCallCheck(this, MessageSender);

    _this = _super.call(this, {
      deps: deps
    });
    _this._eventEmitter = new _events.EventEmitter();

    _initializerDefineProperty(_this, "sendStatus", _descriptor, _assertThisInitialized(_this));

    return _this;
  }

  _createClass(MessageSender, [{
    key: "setSendStatus",
    value: function setSendStatus(status) {
      this.sendStatus = status;
    }
  }, {
    key: "_smsAttempt",
    value: function _smsAttempt() {
      this.setSendStatus(_messageSenderStatus.messageSenderStatus.sending);
    }
  }, {
    key: "_smsSentOver",
    value: function _smsSentOver() {
      this.setSendStatus(_messageSenderStatus.messageSenderStatus.idle);
    }
  }, {
    key: "_smsSentError",
    value: function _smsSentError() {
      this.setSendStatus(_messageSenderStatus.messageSenderStatus.idle);
    }
  }, {
    key: "_alertWarning",
    value: function _alertWarning(message) {
      if (message) {
        this._deps.alert.warning({
          message: message,
          ttl: 0
        });

        return true;
      }

      return false;
    }
  }, {
    key: "_validateContent",
    value: function _validateContent(text, attachments, multipart) {
      if ((0, _isBlank["default"])(text) && attachments.length === 0) {
        this._alertWarning(_messageSenderMessages.messageSenderMessages.textEmpty);

        return false;
      }

      if (!multipart && text && text.length > MESSAGE_MAX_LENGTH) {
        this._alertWarning(_messageSenderMessages.messageSenderMessages.textTooLong);

        return false;
      }

      if (multipart && text && text.length > MULTIPART_MESSAGE_MAX_LENGTH) {
        this._alertWarning(_messageSenderMessages.messageSenderMessages.multipartTextTooLong);

        return false;
      }

      return true;
    }
  }, {
    key: "_validateToNumbersIsEmpty",
    value: function _validateToNumbersIsEmpty(toNumbers) {
      if (toNumbers.length === 0) {
        this._alertWarning(_messageSenderMessages.messageSenderMessages.recipientsEmpty);

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

      this.setSendStatus(_messageSenderStatus.messageSenderStatus.validating);

      if (validateResult) {
        var isMySenderNumber = (0, _ramda.find)(function (number) {
          return number.phoneNumber === senderNumber;
        }, this.senderNumbersList);

        if (!isMySenderNumber) {
          validateResult = false;
        }
      }

      if (!validateResult) {
        this.setSendStatus(_messageSenderStatus.messageSenderStatus.idle);

        this._alertWarning(_messageSenderMessages.messageSenderMessages.senderNumberInvalid);
      }

      return validateResult;
    }
  }, {
    key: "_alertInvalidRecipientErrors",
    value: function _alertInvalidRecipientErrors(errors) {
      var _this2 = this;

      errors.forEach(function (error) {
        var message = _messageSenderMessages.messageSenderMessages[error.type];

        if (!_this2._alertWarning(message)) {
          _this2._alertWarning(_messageSenderMessages.messageSenderMessages.recipientNumberInvalids);
        }
      });
    }
  }, {
    key: "_validateToNumbers",
    value: function () {
      var _validateToNumbers2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(toNumbers) {
        var result, recipientNumbers, numberValidateResult, numbers, _iterator, _step, number;

        return regeneratorRuntime.wrap(function _callee$(_context) {
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
                this.setSendStatus(_messageSenderStatus.messageSenderStatus.validating);
                _context.next = 7;
                return this._deps.numberValidate.validateNumbers(recipientNumbers);

              case 7:
                numberValidateResult = _context.sent;

                if (numberValidateResult.result) {
                  _context.next = 12;
                  break;
                }

                this._alertInvalidRecipientErrors(numberValidateResult.errors);

                this.setSendStatus(_messageSenderStatus.messageSenderStatus.idle);
                return _context.abrupt("return", result);

              case 12:
                numbers = [];
                _iterator = _createForOfIteratorHelper(numberValidateResult.numbers);
                _context.prev = 14;

                _iterator.s();

              case 16:
                if ((_step = _iterator.n()).done) {
                  _context.next = 29;
                  break;
                }

                number = _step.value;

                if (!(number.subAddress && number.subAddress.length > 0)) {
                  _context.next = 26;
                  break;
                }

                if (this._deps.numberValidate.isCompanyExtension(number.e164, number.subAddress)) {
                  _context.next = 23;
                  break;
                }

                this._alertWarning(_messageSenderMessages.messageSenderMessages.notAnExtension);

                this.setSendStatus(_messageSenderStatus.messageSenderStatus.idle);
                return _context.abrupt("return", result);

              case 23:
                numbers.push(number.subAddress);
                _context.next = 27;
                break;

              case 26:
                numbers.push(number.availableExtension || number.e164);

              case 27:
                _context.next = 16;
                break;

              case 29:
                _context.next = 34;
                break;

              case 31:
                _context.prev = 31;
                _context.t0 = _context["catch"](14);

                _iterator.e(_context.t0);

              case 34:
                _context.prev = 34;

                _iterator.f();

                return _context.finish(34);

              case 37:
                result.result = true;
                result.numbers = numbers;
                return _context.abrupt("return", result);

              case 40:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[14, 31, 34, 37]]);
      }));

      function _validateToNumbers(_x) {
        return _validateToNumbers2.apply(this, arguments);
      }

      return _validateToNumbers;
    }()
  }, {
    key: "send",
    value: function () {
      var _send = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref) {
        var fromNumber, toNumbers, text, replyOnMessageId, _ref$multipart, multipart, _ref$attachments, attachments, eventId, validateToNumberResult, recipientNumbers, extensionNumbers, phoneNumbers, responses, chunks, total, shouldSleep, _iterator2, _step2, chunk, pagerResponse, _iterator3, _step3, phoneNumber, _iterator4, _step4, _chunk, smsResponse, smsBody;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                fromNumber = _ref.fromNumber, toNumbers = _ref.toNumbers, text = _ref.text, replyOnMessageId = _ref.replyOnMessageId, _ref$multipart = _ref.multipart, multipart = _ref$multipart === void 0 ? false : _ref$multipart, _ref$attachments = _ref.attachments, attachments = _ref$attachments === void 0 ? [] : _ref$attachments;
                eventId = uuid.v4();

                if (this._validateContent(text, attachments, multipart)) {
                  _context2.next = 4;
                  break;
                }

                return _context2.abrupt("return", null);

              case 4:
                _context2.prev = 4;
                _context2.next = 7;
                return this._validateToNumbers(toNumbers);

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
                });

                if (!(extensionNumbers.length > 0 && attachments.length > 0)) {
                  _context2.next = 16;
                  break;
                }

                this._alertWarning(_messageSenderMessages.messageSenderMessages.noAttachmentToExtension);

                return _context2.abrupt("return", null);

              case 16:
                if (!(phoneNumbers.length > 0)) {
                  _context2.next = 19;
                  break;
                }

                if (this._validateSenderNumber(fromNumber)) {
                  _context2.next = 19;
                  break;
                }

                return _context2.abrupt("return", null);

              case 19:
                this._eventEmitter.emit(_messageSenderEvents.messageSenderEvents.send, {
                  eventId: eventId,
                  fromNumber: fromNumber,
                  toNumbers: toNumbers,
                  text: text,
                  replyOnMessageId: replyOnMessageId,
                  multipart: multipart
                });

                this._smsAttempt();

                responses = [];
                chunks = multipart ? (0, _chunkMessage["default"])(text, MESSAGE_MAX_LENGTH) : [text];
                total = (phoneNumbers.length + 1) * chunks.length;
                shouldSleep = total > SENDING_THRESHOLD;

                if (!(extensionNumbers.length > 0)) {
                  _context2.next = 48;
                  break;
                }

                _iterator2 = _createForOfIteratorHelper(chunks);
                _context2.prev = 27;

                _iterator2.s();

              case 29:
                if ((_step2 = _iterator2.n()).done) {
                  _context2.next = 40;
                  break;
                }

                chunk = _step2.value;

                if (!shouldSleep) {
                  _context2.next = 34;
                  break;
                }

                _context2.next = 34;
                return (0, _sleep["default"])(2000);

              case 34:
                _context2.next = 36;
                return this._sendPager({
                  toNumbers: extensionNumbers,
                  text: chunk,
                  replyOnMessageId: replyOnMessageId
                });

              case 36:
                pagerResponse = _context2.sent;
                responses.push(pagerResponse);

              case 38:
                _context2.next = 29;
                break;

              case 40:
                _context2.next = 45;
                break;

              case 42:
                _context2.prev = 42;
                _context2.t0 = _context2["catch"](27);

                _iterator2.e(_context2.t0);

              case 45:
                _context2.prev = 45;

                _iterator2.f();

                return _context2.finish(45);

              case 48:
                if (!(phoneNumbers.length > 0)) {
                  _context2.next = 94;
                  break;
                }

                _iterator3 = _createForOfIteratorHelper(phoneNumbers);
                _context2.prev = 50;

                _iterator3.s();

              case 52:
                if ((_step3 = _iterator3.n()).done) {
                  _context2.next = 86;
                  break;
                }

                phoneNumber = _step3.value;
                _iterator4 = _createForOfIteratorHelper(chunks);
                _context2.prev = 55;

                _iterator4.s();

              case 57:
                if ((_step4 = _iterator4.n()).done) {
                  _context2.next = 76;
                  break;
                }

                _chunk = _step4.value;

                if (!shouldSleep) {
                  _context2.next = 62;
                  break;
                }

                _context2.next = 62;
                return (0, _sleep["default"])(2000);

              case 62:
                smsResponse = void 0;
                smsBody = {
                  fromNumber: fromNumber,
                  toNumber: phoneNumber,
                  text: _chunk,
                  attachments: attachments
                };

                if (!(attachments.length > 0)) {
                  _context2.next = 70;
                  break;
                }

                _context2.next = 67;
                return this._sendMMS(smsBody);

              case 67:
                smsResponse = _context2.sent;
                _context2.next = 73;
                break;

              case 70:
                _context2.next = 72;
                return this._sendSMS(smsBody);

              case 72:
                smsResponse = _context2.sent;

              case 73:
                responses.push(smsResponse);

              case 74:
                _context2.next = 57;
                break;

              case 76:
                _context2.next = 81;
                break;

              case 78:
                _context2.prev = 78;
                _context2.t1 = _context2["catch"](55);

                _iterator4.e(_context2.t1);

              case 81:
                _context2.prev = 81;

                _iterator4.f();

                return _context2.finish(81);

              case 84:
                _context2.next = 52;
                break;

              case 86:
                _context2.next = 91;
                break;

              case 88:
                _context2.prev = 88;
                _context2.t2 = _context2["catch"](50);

                _iterator3.e(_context2.t2);

              case 91:
                _context2.prev = 91;

                _iterator3.f();

                return _context2.finish(91);

              case 94:
                this._smsSentOver();

                return _context2.abrupt("return", responses);

              case 98:
                _context2.prev = 98;
                _context2.t3 = _context2["catch"](4);
                console.debug('sendComposeText e ', _context2.t3);

                this._eventEmitter.emit(_messageSenderEvents.messageSenderEvents.sendError, {
                  eventId: eventId,
                  fromNumber: fromNumber,
                  toNumbers: toNumbers,
                  text: text,
                  replyOnMessageId: replyOnMessageId,
                  multipart: multipart
                });

                this._smsSentError();

                _context2.next = 105;
                return this._onSendError(_context2.t3);

              case 105:
                throw _context2.t3;

              case 106:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[4, 98], [27, 42, 45, 48], [50, 88, 91, 94], [55, 78, 81, 84]]);
      }));

      function send(_x2) {
        return _send.apply(this, arguments);
      }

      return send;
    }()
  }, {
    key: "_sendSMS",
    value: function () {
      var _sendSMS2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_ref2) {
        var fromNumber, toNumber, text, toUsers, response;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                fromNumber = _ref2.fromNumber, toNumber = _ref2.toNumber, text = _ref2.text;
                toUsers = [{
                  phoneNumber: toNumber
                }];
                _context3.next = 4;
                return this._deps.client.account().extension().sms().post({
                  from: {
                    phoneNumber: fromNumber
                  },
                  to: toUsers,
                  text: text
                });

              case 4:
                response = _context3.sent;
                return _context3.abrupt("return", response);

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function _sendSMS(_x3) {
        return _sendSMS2.apply(this, arguments);
      }

      return _sendSMS;
    }()
  }, {
    key: "_sendMMS",
    value: function () {
      var _sendMMS2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_ref3) {
        var fromNumber, toNumber, text, _ref3$attachments, attachments, formData, body, response;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                fromNumber = _ref3.fromNumber, toNumber = _ref3.toNumber, text = _ref3.text, _ref3$attachments = _ref3.attachments, attachments = _ref3$attachments === void 0 ? [] : _ref3$attachments;
                formData = new FormData();
                body = {
                  from: {
                    phoneNumber: fromNumber
                  },
                  to: [{
                    phoneNumber: toNumber
                  }],
                  text: text
                };
                formData.append('json', new Blob([JSON.stringify(body, null, 2)], {
                  type: 'application/json'
                }));
                attachments.forEach(function (attachment) {
                  formData.append('attachment', attachment.file);
                });
                _context4.next = 7;
                return this._deps.client.service.platform().post('/restapi/v1.0/account/~/extension/~/sms', formData);

              case 7:
                response = _context4.sent;
                return _context4.abrupt("return", response.json());

              case 9:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function _sendMMS(_x4) {
        return _sendMMS2.apply(this, arguments);
      }

      return _sendMMS;
    }()
  }, {
    key: "_sendPager",
    value: function () {
      var _sendPager2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(_ref4) {
        var toNumbers, text, replyOnMessageId, from, toUsers, params, response;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                toNumbers = _ref4.toNumbers, text = _ref4.text, replyOnMessageId = _ref4.replyOnMessageId;
                from = {
                  extensionNumber: this._deps.extensionInfo.extensionNumber
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

                _context5.next = 7;
                return this._deps.client.account().extension().companyPager().post(params);

              case 7:
                response = _context5.sent;
                return _context5.abrupt("return", response);

              case 9:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function _sendPager(_x5) {
        return _sendPager2.apply(this, arguments);
      }

      return _sendPager;
    }()
  }, {
    key: "_onSendError",
    value: function () {
      var _onSendError2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(error) {
        var _this3 = this;

        var errResp, errorJson;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                errResp = error.response;

                if (!errResp) {
                  _context6.next = 5;
                  break;
                }

                _context6.next = 4;
                return errResp.clone().json();

              case 4:
                errorJson = _context6.sent;

              case 5:
                if (!(errResp && !errResp.ok && errorJson && (errorJson.errorCode === 'InvalidParameter' || errorJson.errorCode === 'InternationalProhibited' || errorJson.errorCode === 'CMN-408'))) {
                  _context6.next = 8;
                  break;
                }

                errorJson.errors.map(function (err) {
                  if ((err.errorCode === 'CMN-101' || err.errorCode === 'CMN-102' || err.errorCode === 'CMN-414') && err.parameterName.startsWith('to')) {
                    // 101 : "Parameter [to.extensionNumber] value is invalid"
                    // 101 : "Parameter [to.phoneNumber] value is invalid"
                    // 102 : "Resource for parameter [to] is not found"
                    _this3._alertWarning(_messageSenderMessages.messageSenderMessages.recipientNumberInvalids);

                    return null;
                  }

                  if (err.errorCode === 'MSG-246') {
                    // MSG-246 : "Sending SMS from/to extension numbers is not available"
                    _this3._alertWarning(_messageSenderMessages.messageSenderMessages.notSmsToExtension);
                  }

                  if (err.errorCode === 'MSG-240') {
                    // MSG-240 : "International SMS is not supported"
                    _this3._alertWarning(_messageSenderMessages.messageSenderMessages.internationalSMSNotSupported);
                  }

                  if (err.errorCode === 'CMN-408') {
                    // MSG-240 : "In order to call this API endpoint, user needs to have [InternalSMS] permission for requested resource."
                    _this3._alertWarning(_messageSenderMessages.messageSenderMessages.noInternalSMSPermission);
                  }

                  return null;
                });
                return _context6.abrupt("return");

              case 8:
                _context6.t0 = this._deps.availabilityMonitor;

                if (!_context6.t0) {
                  _context6.next = 13;
                  break;
                }

                _context6.next = 12;
                return this._deps.availabilityMonitor.checkIfHAError(error);

              case 12:
                _context6.t0 = _context6.sent;

              case 13:
                if (!_context6.t0) {
                  _context6.next = 15;
                  break;
                }

                return _context6.abrupt("return");

              case 15:
                this._alertWarning(_messageSenderMessages.messageSenderMessages.sendError);

              case 16:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function _onSendError(_x6) {
        return _onSendError2.apply(this, arguments);
      }

      return _onSendError;
    }()
  }, {
    key: "on",
    value: function on(event, handler) {
      this._eventEmitter.on(event, handler);
    }
  }, {
    key: "idle",
    get: function get() {
      return this.sendStatus === _messageSenderStatus.messageSenderStatus.idle;
    }
  }, {
    key: "senderNumbersList",
    get: function get() {
      return this._deps.extensionPhoneNumber.smsSenderNumbers;
    }
  }, {
    key: "events",
    get: function get() {
      return _messageSenderEvents.messageSenderEvents;
    }
  }]);

  return MessageSender;
}(_core.RcModuleV2), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "sendStatus", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return _messageSenderStatus.messageSenderStatus.idle;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setSendStatus", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setSendStatus"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_smsAttempt", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "_smsAttempt"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_smsSentOver", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "_smsSentOver"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_smsSentError", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "_smsSentError"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_validateToNumbers", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_validateToNumbers"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "send", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "send"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_sendSMS", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_sendSMS"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_sendPager", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_sendPager"), _class2.prototype)), _class2)) || _class);
exports.MessageSender = MessageSender;
//# sourceMappingURL=MessageSender.js.map
