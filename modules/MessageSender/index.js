"use strict";

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.array.find");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.MultipartMessageMaxLength = exports.MessageMaxLength = void 0;

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.string.starts-with");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.array.filter");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.array.for-each");

var _ramda = require("ramda");

var _events = _interopRequireDefault(require("events"));

var uuid = _interopRequireWildcard(require("uuid"));

var _RcModule2 = _interopRequireDefault(require("../../lib/RcModule"));

var _di = require("../../lib/di");

var _isBlank = _interopRequireDefault(require("../../lib/isBlank"));

var _moduleStatuses = _interopRequireDefault(require("../../enums/moduleStatuses"));

var _messageSenderActionTypes = require("./messageSenderActionTypes");

var _getMessageSenderReducer = _interopRequireDefault(require("./getMessageSenderReducer"));

var _messageSenderStatus = require("./messageSenderStatus");

var _messageSenderMessages = require("./messageSenderMessages");

var _proxify = _interopRequireDefault(require("../../lib/proxy/proxify"));

var _chunkMessage = _interopRequireDefault(require("../../lib/chunkMessage"));

var _sleep = _interopRequireDefault(require("../../lib/sleep"));

var _dec, _class, _class2;

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

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
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModule) {
  _inherits(MessageSender, _RcModule);

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

    _this = _super.call(this, _objectSpread(_objectSpread({}, options), {}, {
      actionTypes: _messageSenderActionTypes.messageSenderActionTypes
    }));
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
        this._alertWarning(_messageSenderMessages.messageSenderMessages.textEmpty);

        return false;
      }

      if (!multipart && text.length > MessageMaxLength) {
        this._alertWarning(_messageSenderMessages.messageSenderMessages.textTooLong);

        return false;
      }

      if (multipart && text.length > MultipartMessageMaxLength) {
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

        this._alertWarning(_messageSenderMessages.messageSenderMessages.senderNumberInvalid);
      }

      return validateResult;
    }
  }, {
    key: "_alertInvalidRecipientErrors",
    value: function _alertInvalidRecipientErrors(errors) {
      var _this3 = this;

      errors.forEach(function (error) {
        var message = _messageSenderMessages.messageSenderMessages[error.type];

        if (!_this3._alertWarning(message)) {
          _this3._alertWarning(_messageSenderMessages.messageSenderMessages.recipientNumberInvalids);
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
                this.store.dispatch({
                  type: this.actionTypes.validate
                });
                _context.next = 7;
                return this._numberValidate.validateNumbers(recipientNumbers);

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

                if (this._numberValidate.isCompanyExtension(number.e164, number.subAddress)) {
                  _context.next = 23;
                  break;
                }

                this._alertWarning(_messageSenderMessages.messageSenderMessages.notAnExtension);

                this.store.dispatch({
                  type: this.actionTypes.validateError
                });
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
      var _send = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref2) {
        var fromNumber, toNumbers, text, replyOnMessageId, _ref2$multipart, multipart, eventId, validateToNumberResult, recipientNumbers, extensionNumbers, phoneNumbers, responses, chunks, total, shouldSleep, _iterator2, _step2, chunk, pagerResponse, _iterator3, _step3, phoneNumber, _iterator4, _step4, _chunk, smsResponse;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                fromNumber = _ref2.fromNumber, toNumbers = _ref2.toNumbers, text = _ref2.text, replyOnMessageId = _ref2.replyOnMessageId, _ref2$multipart = _ref2.multipart, multipart = _ref2$multipart === void 0 ? false : _ref2$multipart;
                eventId = uuid.v4();

                if (this._validateText(text, multipart)) {
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
                  _context2.next = 45;
                  break;
                }

                _iterator2 = _createForOfIteratorHelper(chunks);
                _context2.prev = 24;

                _iterator2.s();

              case 26:
                if ((_step2 = _iterator2.n()).done) {
                  _context2.next = 37;
                  break;
                }

                chunk = _step2.value;

                if (!shouldSleep) {
                  _context2.next = 31;
                  break;
                }

                _context2.next = 31;
                return (0, _sleep["default"])(2000);

              case 31:
                _context2.next = 33;
                return this._sendPager({
                  toNumbers: extensionNumbers,
                  text: chunk,
                  replyOnMessageId: replyOnMessageId
                });

              case 33:
                pagerResponse = _context2.sent;
                responses.push(pagerResponse);

              case 35:
                _context2.next = 26;
                break;

              case 37:
                _context2.next = 42;
                break;

              case 39:
                _context2.prev = 39;
                _context2.t0 = _context2["catch"](24);

                _iterator2.e(_context2.t0);

              case 42:
                _context2.prev = 42;

                _iterator2.f();

                return _context2.finish(42);

              case 45:
                if (!(phoneNumbers.length > 0)) {
                  _context2.next = 83;
                  break;
                }

                _iterator3 = _createForOfIteratorHelper(phoneNumbers);
                _context2.prev = 47;

                _iterator3.s();

              case 49:
                if ((_step3 = _iterator3.n()).done) {
                  _context2.next = 75;
                  break;
                }

                phoneNumber = _step3.value;
                _iterator4 = _createForOfIteratorHelper(chunks);
                _context2.prev = 52;

                _iterator4.s();

              case 54:
                if ((_step4 = _iterator4.n()).done) {
                  _context2.next = 65;
                  break;
                }

                _chunk = _step4.value;

                if (!shouldSleep) {
                  _context2.next = 59;
                  break;
                }

                _context2.next = 59;
                return (0, _sleep["default"])(2000);

              case 59:
                _context2.next = 61;
                return this._sendSms({
                  fromNumber: fromNumber,
                  toNumber: phoneNumber,
                  text: _chunk
                });

              case 61:
                smsResponse = _context2.sent;
                responses.push(smsResponse);

              case 63:
                _context2.next = 54;
                break;

              case 65:
                _context2.next = 70;
                break;

              case 67:
                _context2.prev = 67;
                _context2.t1 = _context2["catch"](52);

                _iterator4.e(_context2.t1);

              case 70:
                _context2.prev = 70;

                _iterator4.f();

                return _context2.finish(70);

              case 73:
                _context2.next = 49;
                break;

              case 75:
                _context2.next = 80;
                break;

              case 77:
                _context2.prev = 77;
                _context2.t2 = _context2["catch"](47);

                _iterator3.e(_context2.t2);

              case 80:
                _context2.prev = 80;

                _iterator3.f();

                return _context2.finish(80);

              case 83:
                this.store.dispatch({
                  type: this.actionTypes.sendOver,
                  toNumbers: toNumbers
                });
                return _context2.abrupt("return", responses);

              case 87:
                _context2.prev = 87;
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
                _context2.next = 93;
                return this._onSendError(_context2.t3);

              case 93:
                console.debug('sendComposeText e ', _context2.t3);
                throw _context2.t3;

              case 95:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[4, 87], [24, 39, 42, 45], [47, 77, 80, 83], [52, 67, 70, 73]]);
      }));

      function send(_x2) {
        return _send.apply(this, arguments);
      }

      return send;
    }()
  }, {
    key: "_sendSms",
    value: function () {
      var _sendSms2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_ref3) {
        var fromNumber, toNumber, text, toUsers, response;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                fromNumber = _ref3.fromNumber, toNumber = _ref3.toNumber, text = _ref3.text;
                toUsers = [{
                  phoneNumber: toNumber
                }];
                _context3.next = 4;
                return this._client.account().extension().sms().post({
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

      function _sendSms(_x3) {
        return _sendSms2.apply(this, arguments);
      }

      return _sendSms;
    }()
  }, {
    key: "_sendPager",
    value: function () {
      var _sendPager2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_ref4) {
        var toNumbers, text, replyOnMessageId, from, toUsers, params, response;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
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
                return this._client.account().extension().companyPager().post(params);

              case 7:
                response = _context4.sent;
                return _context4.abrupt("return", response);

              case 9:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function _sendPager(_x4) {
        return _sendPager2.apply(this, arguments);
      }

      return _sendPager;
    }()
  }, {
    key: "_onSendError",
    value: function () {
      var _onSendError2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(error) {
        var _this4 = this;

        var errResp;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                errResp = error.response;

                if (!errResp) {
                  _context5.next = 5;
                  break;
                }

                _context5.next = 4;
                return errResp.clone().json();

              case 4:
                errResp._json = _context5.sent;

              case 5:
                if (!(errResp && !errResp.ok && errResp._json && (errResp._json.errorCode === 'InvalidParameter' || errResp._json.errorCode === 'InternationalProhibited' || errResp._json.errorCode === 'CMN-408'))) {
                  _context5.next = 8;
                  break;
                }

                errResp._json.errors.map(function (err) {
                  if ((err.errorCode === 'CMN-101' || err.errorCode === 'CMN-102' || err.errorCode === 'CMN-414') && err.parameterName.startsWith('to')) {
                    // 101 : "Parameter [to.extensionNumber] value is invalid"
                    // 101 : "Parameter [to.phoneNumber] value is invalid"
                    // 102 : "Resource for parameter [to] is not found"
                    _this4._alertWarning(_messageSenderMessages.messageSenderMessages.recipientNumberInvalids);

                    return null;
                  }

                  if (err.errorCode === 'MSG-246') {
                    // MSG-246 : "Sending SMS from/to extension numbers is not available"
                    _this4._alertWarning(_messageSenderMessages.messageSenderMessages.notSmsToExtension);
                  }

                  if (err.errorCode === 'MSG-240') {
                    // MSG-240 : "International SMS is not supported"
                    _this4._alertWarning(_messageSenderMessages.messageSenderMessages.internationalSMSNotSupported);
                  }

                  if (err.errorCode === 'CMN-408') {
                    // MSG-240 : "In order to call this API endpoint, user needs to have [InternalSMS] permission for requested resource."
                    _this4._alertWarning(_messageSenderMessages.messageSenderMessages.noInternalSMSPermission);
                  }

                  return null;
                });

                return _context5.abrupt("return");

              case 8:
                _context5.t0 = this._availabilityMonitor;

                if (!_context5.t0) {
                  _context5.next = 13;
                  break;
                }

                _context5.next = 12;
                return this._availabilityMonitor.checkIfHAError(error);

              case 12:
                _context5.t0 = _context5.sent;

              case 13:
                if (!_context5.t0) {
                  _context5.next = 15;
                  break;
                }

                return _context5.abrupt("return", null);

              case 15:
                this._alertWarning(_messageSenderMessages.messageSenderMessages.sendError);

              case 16:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function _onSendError(_x5) {
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
      return this.sendStatus === _messageSenderStatus.messageSenderStatus.idle;
    }
  }, {
    key: "senderNumbersList",
    get: function get() {
      return this._extensionPhoneNumber.smsSenderNumbers;
    }
  }, {
    key: "events",
    get: function get() {
      return this.actionTypes;
    }
  }]);

  return MessageSender;
}(_RcModule2["default"]), (_applyDecoratedDescriptor(_class2.prototype, "_validateToNumbers", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_validateToNumbers"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "send", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "send"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_sendSms", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_sendSms"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_sendPager", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_sendPager"), _class2.prototype)), _class2)) || _class);
exports["default"] = MessageSender;
//# sourceMappingURL=index.js.map
