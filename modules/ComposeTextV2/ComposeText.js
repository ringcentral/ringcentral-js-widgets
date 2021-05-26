"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.reflect.get");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComposeText = void 0;

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.array.map");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.array.find-index");

var _core = require("@ringcentral-integration/core");

var _di = require("../../lib/di");

var _isBlank = _interopRequireDefault(require("../../lib/isBlank"));

var _proxify = require("../../lib/proxy/proxify");

var _MessageSenderV = require("../MessageSenderV2");

var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

/**
 * @class
 * @description Compose text managing module
 */
var ComposeText = (_dec = (0, _di.Module)({
  name: 'ComposeText',
  deps: ['Alert', 'Auth', 'Storage', 'MessageSender', 'NumberValidate', 'ExtensionFeatures', {
    dep: 'ContactSearch',
    optional: true
  }, {
    dep: 'ComposeTextOptions',
    optional: true
  }, {
    dep: 'RouterInteraction',
    optional: true
  }]
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  _inherits(ComposeText, _RcModuleV);

  var _super = _createSuper(ComposeText);

  function ComposeText(deps) {
    var _this;

    _classCallCheck(this, ComposeText);

    _this = _super.call(this, {
      deps: deps,
      enableCache: true,
      storageKey: 'composeText'
    });
    _this._lastContactSearchResult = null;
    _this.smsVerify = void 0;

    _initializerDefineProperty(_this, "senderNumber", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "typingToNumber", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "toNumbers", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "messageText", _descriptor4, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "toNumberEntity", _descriptor5, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "attachments", _descriptor6, _assertThisInitialized(_this));

    return _this;
  }

  _createClass(ComposeText, [{
    key: "_setSenderNumber",
    value: function _setSenderNumber() {
      var number = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      this.senderNumber = number;
    }
  }, {
    key: "_setTypingToNumber",
    value: function _setTypingToNumber(number) {
      this.typingToNumber = number;
    }
  }, {
    key: "_setToNumberEntity",
    value: function _setToNumberEntity(entityId) {
      this.toNumberEntity = entityId;
    }
  }, {
    key: "_addToNumber",
    value: function _addToNumber(number) {
      if (number.id) {
        var idx = this.toNumbers.findIndex(function (item) {
          return number.id === item.id || number.phoneNumber === item.phoneNumber;
        });

        if (idx > -1) {
          // replace old one if found
          this.toNumbers[idx] = number;
          return;
        }
      } else {
        var oldNumber = this.toNumbers.find(function (item) {
          return number.phoneNumber === item.phoneNumber;
        });

        if (oldNumber) {
          return;
        }
      }

      this.toNumbers.push(number);
    }
  }, {
    key: "_removeToNumber",
    value: function _removeToNumber(number) {
      this.toNumbers = this.toNumbers.filter(function (item) {
        return item.phoneNumber !== number.phoneNumber;
      });
    }
  }, {
    key: "_setMessageText",
    value: function _setMessageText(text) {
      this.messageText = text;
    }
  }, {
    key: "_addAttachment",
    value: function _addAttachment(attachment) {
      var newAttachments = this.attachments.filter(function (f) {
        return f.name !== attachment.name;
      });
      newAttachments.push(attachment);
      this.attachments = newAttachments;
    }
  }, {
    key: "_removeAttachment",
    value: function _removeAttachment(attachment) {
      this.attachments = this.attachments.filter(function (f) {
        return f.name !== attachment.name;
      });
    }
  }, {
    key: "_clean",
    value: function _clean() {
      this.typingToNumber = '';
      this.toNumbers = [];
      this.messageText = '';
      this.attachments = [];
      this.toNumberEntity = '';
    }
  }, {
    key: "onStateChange",
    value: function onStateChange() {
      if (this._shouldHandleRecipient()) {
        this._handleRecipient();
      }
    }
  }, {
    key: "_shouldInit",
    value: function _shouldInit() {
      return !!(_get(_getPrototypeOf(ComposeText.prototype), "_shouldInit", this).call(this) && this._deps.auth.loggedIn);
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return !!(_get(_getPrototypeOf(ComposeText.prototype), "_shouldReset", this).call(this) || this.ready && !this._deps.auth.loggedIn);
    }
  }, {
    key: "onInit",
    value: function () {
      var _onInit = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this._deps.auth.isFreshLogin) {
                  _context.next = 3;
                  break;
                }

                _context.next = 3;
                return this.clean();

              case 3:
                this._initSenderNumber();

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function onInit() {
        return _onInit.apply(this, arguments);
      }

      return onInit;
    }()
  }, {
    key: "onReset",
    value: function () {
      var _onReset = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.clean();

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function onReset() {
        return _onReset.apply(this, arguments);
      }

      return onReset;
    }()
  }, {
    key: "onInitOnce",
    value: function onInitOnce() {
      var _this2 = this;

      (0, _core.watch)(this, function () {
        return _this2._deps.messageSender.senderNumbersList;
      }, function () {
        if (_this2.ready) {
          _this2._initSenderNumber();
        }
      });
    }
  }, {
    key: "_shouldHandleRecipient",
    value: function _shouldHandleRecipient() {
      return this.ready && !!this._deps.contactSearch && this._deps.contactSearch.ready && this._deps.contactSearch.searchResult.length > 0 && this._deps.contactSearch.searchResult !== this._lastContactSearchResult;
    }
  }, {
    key: "_initSenderNumber",
    value: function _initSenderNumber() {
      var cachedPhoneNumber = this.senderNumber;

      if (cachedPhoneNumber && this._deps.messageSender.senderNumbersList.find(function (number) {
        return number.phoneNumber === cachedPhoneNumber;
      })) {
        return;
      }

      this.updateSenderNumber(this._deps.messageSender.senderNumbersList[0] && this._deps.messageSender.senderNumbersList[0].phoneNumber);
    }
  }, {
    key: "_handleRecipient",
    value: function _handleRecipient() {
      var dummy = this.toNumbers.find(function (toNumber) {
        return !toNumber.entityType;
      });

      if (dummy) {
        var recipient = this._deps.contactSearch.searchResult.find(function (item) {
          return item.id === dummy.id;
        });

        if (recipient) {
          this.addToNumber(recipient);
          this._lastContactSearchResult = this._deps.contactSearch.searchResult.slice();
        }
      }
    }
  }, {
    key: "_alertWarning",
    value: function _alertWarning(message) {
      if (message) {
        var ttlConfig = message !== _MessageSenderV.messageSenderMessages.noAreaCode ? {
          ttl: 0
        } : null;

        this._deps.alert.warning(_objectSpread({
          message: message,
          allowDuplicates: false
        }, ttlConfig));

        return true;
      }

      return false;
    }
  }, {
    key: "_validatePhoneNumber",
    value: function _validatePhoneNumber(phoneNumber) {
      if (this._validateIsOnlyPager(phoneNumber)) {
        return null;
      }

      var validateResult = this._deps.numberValidate.validateFormat([phoneNumber]);

      if (!validateResult.result) {
        var error = validateResult.errors[0];

        if (error && this._alertWarning(_MessageSenderV.messageSenderMessages[error.type])) {
          return false;
        }

        this._alertWarning(_MessageSenderV.messageSenderMessages.recipientNumberInvalids);

        return false;
      }

      return true;
    }
  }, {
    key: "_validateIsOnlyPager",
    value: function _validateIsOnlyPager(phoneNumber) {
      var _this$_deps$extension, _this$_deps$extension2;

      if (phoneNumber.length >= 7 && !((_this$_deps$extension = this._deps.extensionFeatures.features) === null || _this$_deps$extension === void 0 ? void 0 : (_this$_deps$extension2 = _this$_deps$extension.SMSSending) === null || _this$_deps$extension2 === void 0 ? void 0 : _this$_deps$extension2.available)) {
        this._alertWarning(_MessageSenderV.messageSenderMessages.noSMSPermission);

        return true;
      }

      return false;
    }
  }, {
    key: "validatePhoneNumber",
    value: function () {
      var _validatePhoneNumber2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(phoneNumber) {
        var validateResult;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!this._validateIsOnlyPager(phoneNumber)) {
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt("return", false);

              case 2:
                validateResult = this._deps.numberValidate.validateFormat([phoneNumber]);
                return _context3.abrupt("return", !!validateResult.result);

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function validatePhoneNumber(_x) {
        return _validatePhoneNumber2.apply(this, arguments);
      }

      return validatePhoneNumber;
    }()
  }, {
    key: "send",
    value: function () {
      var _send = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(text) {
        var _this3 = this;

        var attachments,
            toNumbers,
            typingToNumber,
            continueSend,
            timeoutID,
            responses,
            _args4 = arguments;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                attachments = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : [];
                toNumbers = this.toNumbers.map(function (number) {
                  return number.phoneNumber;
                });
                typingToNumber = this.typingToNumber;

                if ((0, _isBlank["default"])(typingToNumber)) {
                  _context4.next = 9;
                  break;
                }

                if (!this._validatePhoneNumber(typingToNumber)) {
                  _context4.next = 8;
                  break;
                }

                toNumbers.push(typingToNumber);
                _context4.next = 9;
                break;

              case 8:
                return _context4.abrupt("return", null);

              case 9:
                if (!this.smsVerify) {
                  _context4.next = 15;
                  break;
                }

                _context4.next = 12;
                return this.smsVerify({
                  toNumbers: this.toNumbers,
                  typingToNumber: typingToNumber
                });

              case 12:
                _context4.t0 = _context4.sent;
                _context4.next = 16;
                break;

              case 15:
                _context4.t0 = true;

              case 16:
                continueSend = _context4.t0;

                if (continueSend) {
                  _context4.next = 19;
                  break;
                }

                return _context4.abrupt("return", null);

              case 19:
                timeoutID = setTimeout(function () {
                  var _this3$_deps$routerIn;

                  if (((_this3$_deps$routerIn = _this3._deps.routerInteraction) === null || _this3$_deps$routerIn === void 0 ? void 0 : _this3$_deps$routerIn.currentPath) === '/composeText') {
                    _this3.alertMessageSending();
                  }

                  timeoutID = null;
                }, 10000);
                _context4.prev = 20;
                _context4.next = 23;
                return this._deps.messageSender.send({
                  fromNumber: this.senderNumber,
                  toNumbers: toNumbers,
                  text: text,
                  attachments: attachments
                });

              case 23:
                responses = _context4.sent;

                if (timeoutID) {
                  clearTimeout(timeoutID);
                  timeoutID = null;
                }

                this.dismissMessageSending();
                return _context4.abrupt("return", responses);

              case 29:
                _context4.prev = 29;
                _context4.t1 = _context4["catch"](20);

                if (timeoutID) {
                  clearTimeout(timeoutID);
                  timeoutID = null;
                }

                throw _context4.t1;

              case 33:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[20, 29]]);
      }));

      function send(_x2) {
        return _send.apply(this, arguments);
      }

      return send;
    }()
  }, {
    key: "updateSenderNumber",
    value: function () {
      var _updateSenderNumber = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(number) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                this._setSenderNumber(number);

              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function updateSenderNumber(_x3) {
        return _updateSenderNumber.apply(this, arguments);
      }

      return updateSenderNumber;
    }()
  }, {
    key: "updateTypingToNumber",
    value: function () {
      var _updateTypingToNumber = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(number) {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!(number.length > 30)) {
                  _context6.next = 3;
                  break;
                }

                this._alertWarning(_MessageSenderV.messageSenderMessages.recipientNumberInvalids);

                return _context6.abrupt("return");

              case 3:
                this._setTypingToNumber(number);

              case 4:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function updateTypingToNumber(_x4) {
        return _updateTypingToNumber.apply(this, arguments);
      }

      return updateTypingToNumber;
    }()
  }, {
    key: "onToNumberMatch",
    value: function () {
      var _onToNumberMatch = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(_ref) {
        var entityId;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                entityId = _ref.entityId;

                this._setToNumberEntity(entityId);

              case 2:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function onToNumberMatch(_x5) {
        return _onToNumberMatch.apply(this, arguments);
      }

      return onToNumberMatch;
    }()
  }, {
    key: "addToRecipients",
    value: function () {
      var _addToRecipients = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(recipient) {
        var shouldClean,
            isAdded,
            _args8 = arguments;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                shouldClean = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : true;
                _context8.next = 3;
                return this.addToNumber(recipient);

              case 3:
                isAdded = _context8.sent;

                if (isAdded && shouldClean) {
                  this._setTypingToNumber('');
                }

              case 5:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function addToRecipients(_x6) {
        return _addToRecipients.apply(this, arguments);
      }

      return addToRecipients;
    }()
  }, {
    key: "cleanTypingToNumber",
    value: function () {
      var _cleanTypingToNumber = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                this._setTypingToNumber('');

              case 1:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function cleanTypingToNumber() {
        return _cleanTypingToNumber.apply(this, arguments);
      }

      return cleanTypingToNumber;
    }()
  }, {
    key: "addToNumber",
    value: function () {
      var _addToNumber2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(number) {
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                if (!(0, _isBlank["default"])(number.phoneNumber)) {
                  _context10.next = 2;
                  break;
                }

                return _context10.abrupt("return", false);

              case 2:
                if (this._validatePhoneNumber(number.phoneNumber)) {
                  _context10.next = 4;
                  break;
                }

                return _context10.abrupt("return", false);

              case 4:
                this._addToNumber(number);

                return _context10.abrupt("return", true);

              case 6:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function addToNumber(_x7) {
        return _addToNumber2.apply(this, arguments);
      }

      return addToNumber;
    }()
  }, {
    key: "removeToNumber",
    value: function () {
      var _removeToNumber2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(number) {
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                this._removeToNumber(number);

              case 1:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function removeToNumber(_x8) {
        return _removeToNumber2.apply(this, arguments);
      }

      return removeToNumber;
    }()
  }, {
    key: "updateMessageText",
    value: function () {
      var _updateMessageText = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(text) {
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                if (!(text.length > 1000)) {
                  _context12.next = 3;
                  break;
                }

                this._alertWarning(_MessageSenderV.messageSenderMessages.textTooLong);

                return _context12.abrupt("return");

              case 3:
                this._setMessageText(text);

              case 4:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function updateMessageText(_x9) {
        return _updateMessageText.apply(this, arguments);
      }

      return updateMessageText;
    }()
  }, {
    key: "addAttachment",
    value: function () {
      var _addAttachment2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(attachment) {
        var size;
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                if (!(this.attachments.length >= 10)) {
                  _context13.next = 3;
                  break;
                }

                this._alertWarning(_MessageSenderV.messageSenderMessages.attachmentCountLimitation);

                return _context13.abrupt("return");

              case 3:
                size = this.attachments.reduce(function (prev, curr) {
                  return prev + curr.size;
                }, 0);

                if (!(size + attachment.size > _MessageSenderV.ATTACHMENT_SIZE_LIMITATION)) {
                  _context13.next = 7;
                  break;
                }

                this._alertWarning(_MessageSenderV.messageSenderMessages.attachmentSizeLimitation);

                return _context13.abrupt("return");

              case 7:
                this._addAttachment(attachment);

              case 8:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      function addAttachment(_x10) {
        return _addAttachment2.apply(this, arguments);
      }

      return addAttachment;
    }()
  }, {
    key: "removeAttachment",
    value: function () {
      var _removeAttachment2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(attachment) {
        return regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                this._removeAttachment(attachment);

              case 1:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));

      function removeAttachment(_x11) {
        return _removeAttachment2.apply(this, arguments);
      }

      return removeAttachment;
    }()
  }, {
    key: "clean",
    value: function () {
      var _clean2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15() {
        return regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                this._clean();

              case 1:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this);
      }));

      function clean() {
        return _clean2.apply(this, arguments);
      }

      return clean;
    }()
  }, {
    key: "alertMessageSending",
    value: function () {
      var _alertMessageSending = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16() {
        return regeneratorRuntime.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                this._deps.alert.warning({
                  message: _MessageSenderV.messageSenderMessages.sending,
                  ttl: 0
                });

              case 1:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, this);
      }));

      function alertMessageSending() {
        return _alertMessageSending.apply(this, arguments);
      }

      return alertMessageSending;
    }()
  }, {
    key: "dismissMessageSending",
    value: function () {
      var _dismissMessageSending = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17() {
        var alertMessage;
        return regeneratorRuntime.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                alertMessage = this._deps.alert.messages.find(function (m) {
                  return m.message === _MessageSenderV.messageSenderMessages.sending;
                });

                if (alertMessage && alertMessage.id) {
                  this._deps.alert.dismiss(alertMessage.id);
                }

              case 2:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17, this);
      }));

      function dismissMessageSending() {
        return _dismissMessageSending.apply(this, arguments);
      }

      return dismissMessageSending;
    }()
  }, {
    key: "senderNumbersList",
    get: function get() {
      return this._deps.messageSender.senderNumbersList;
    }
  }]);

  return ComposeText;
}(_core.RcModuleV2), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "senderNumber", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "typingToNumber", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "toNumbers", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "messageText", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "toNumberEntity", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "attachments", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_setSenderNumber", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setSenderNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setTypingToNumber", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setTypingToNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setToNumberEntity", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setToNumberEntity"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_addToNumber", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_addToNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_removeToNumber", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_removeToNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setMessageText", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setMessageText"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_addAttachment", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_addAttachment"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_removeAttachment", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_removeAttachment"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_clean", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_clean"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "validatePhoneNumber", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "validatePhoneNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "send", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "send"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateSenderNumber", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "updateSenderNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateTypingToNumber", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "updateTypingToNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "onToNumberMatch", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "onToNumberMatch"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "addToRecipients", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "addToRecipients"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "cleanTypingToNumber", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "cleanTypingToNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "addToNumber", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "addToNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "removeToNumber", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "removeToNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateMessageText", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "updateMessageText"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "addAttachment", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "addAttachment"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "removeAttachment", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "removeAttachment"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "clean", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "clean"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "alertMessageSending", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "alertMessageSending"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "dismissMessageSending", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "dismissMessageSending"), _class2.prototype)), _class2)) || _class);
exports.ComposeText = ComposeText;
//# sourceMappingURL=ComposeText.js.map
