"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.slice");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EvTransferCall = void 0;

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.array.find");

var _i18nIsoCountries = require("i18n-iso-countries");

var _di = require("@ringcentral-integration/commons/lib/di");

var _callErrors = _interopRequireDefault(require("@ringcentral-integration/commons/modules/Call/callErrors"));

var _core = require("@ringcentral-integration/core");

var _phoneNumber = require("@ringcentral-integration/phone-number");

var _enums = require("../../enums");

var _asyncEventEmitter = require("../../lib/asyncEventEmitter");

var _checkCountryCode = require("../../lib/checkCountryCode");

var _callbackTypes = require("../../lib/EvClient/enums/callbackTypes");

var _EvTypeError = require("../../lib/EvTypeError");

var _parseNumber = require("../../lib/parseNumber");

var _i18n = _interopRequireDefault(require("./i18n"));

var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

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

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var EvTransferCall = (_dec = (0, _di.Module)({
  name: 'EvTransferCall',
  deps: ['EvClient', 'EvCallMonitor', 'EvCall', 'EvSubscription', 'EvWorkingState', 'Storage', 'ModalUI', 'EvAuth', 'Locale', 'Alert', 'EvAgentSession', {
    dep: 'EvTransferCallOptions',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (that) {
  return [that._deps.evCall.currentCall, that._deps.evAuth.availableCountries];
}), _dec3 = (0, _core.computed)(function (that) {
  return [that._deps.evCall.currentCall];
}), _dec4 = (0, _core.computed)(function (that) {
  return [that.transferAgentList, that.transferAgentId];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  _inherits(EvTransferCall, _RcModuleV);

  var _super = _createSuper(EvTransferCall);

  // alertTemplate: ModalTemplate;
  function EvTransferCall(deps) {
    var _this;

    _classCallCheck(this, EvTransferCall);

    _this = _super.call(this, {
      deps: deps,
      enableCache: true,
      storageKey: 'EvTransferCall'
    });
    _this._eventEmitter = new _asyncEventEmitter.AsyncEventEmitter();
    _this._internalTransferCallbacks = {};
    _this.cancelTemplate = void 0;
    _this._sendVoiceMailModalId = null;
    _this._incomingTransferCallModalId = null;
    _this._transferNotificationId = null;
    _this._transferDest = null;

    _initializerDefineProperty(_this, "receivedCall", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "isTransferCancelable", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "transferStatus", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "transferType", _descriptor4, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "transferAgentId", _descriptor5, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "transferAgentList", _descriptor6, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "transferPhoneBookSelectedIndex", _descriptor7, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "transferRecipientNumber", _descriptor8, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "transferRecipientCountryId", _descriptor9, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "stayOnCall", _descriptor10, _assertThisInitialized(_this));

    return _this;
  }

  _createClass(EvTransferCall, [{
    key: "setReceivedCall",
    value: function setReceivedCall(data) {
      this.receivedCall = data;
    }
  }, {
    key: "setCancelableTransfer",
    value: function setCancelableTransfer(cancelable) {
      this.isTransferCancelable = cancelable;
    }
  }, {
    key: "resetTransferStatus",
    value: function resetTransferStatus() {
      this.receivedCall = null;
      this.transferType = _enums.transferTypes.phoneBook;
      this.transferAgentId = null;
      this.transferAgentList = [];
      this.transferPhoneBookSelectedIndex = null;
      this.transferRecipientNumber = '';
      this.transferRecipientCountryId = 'USA';
      this.stayOnCall = true;
      this.isTransferCancelable = false;
      this._sendVoiceMailModalId = null;
      this._incomingTransferCallModalId = null;
      this._transferDest = null;
    }
  }, {
    key: "changeStayOnCall",
    value: function changeStayOnCall(value) {
      this.stayOnCall = !value;
    }
  }, {
    key: "changeRecipientCountryId",
    value: function changeRecipientCountryId(countryId) {
      this.transferRecipientCountryId = countryId;
    }
  }, {
    key: "changeTransferType",
    value: function changeTransferType(type) {
      this.transferType = type;
    }
  }, {
    key: "changeAgentList",
    value: function changeAgentList(data) {
      var _this2 = this;

      var currentAgent = data.find(function (_ref) {
        var agentId = _ref.agentId;
        return agentId === _this2.transferAgentId;
      });

      if (!currentAgent) {
        this.transferAgentId = null;
      }

      this.transferAgentList = data;
    }
  }, {
    key: "changeRecipientNumber",
    value: function changeRecipientNumber(phoneNumber) {
      this.transferRecipientNumber = phoneNumber;
    }
  }, {
    key: "changeTransferPhoneBookSelected",
    value: function changeTransferPhoneBookSelected(index) {
      this.transferPhoneBookSelectedIndex = index;
    }
  }, {
    key: "changeTransferAgentId",
    value: function changeTransferAgentId(agentId) {
      this.transferAgentId = agentId;
    }
  }, {
    key: "setTransferStatus",
    value: function setTransferStatus(transferStatus) {
      this.transferStatus = transferStatus;
    }
  }, {
    key: "onInitOnce",
    value: function onInitOnce() {
      var _this3 = this;

      this._deps.evAgentSession.onTriggerConfig( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this3.setTransferStatus(_enums.transferStatuses.idle);

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      })));

      this._deps.evCallMonitor.onCallEnded(function () {
        _this3.setTransferStatus(_enums.transferStatuses.idle);

        _this3.closeModals();

        _this3.closeLoadingNotification();
      });

      this._deps.evSubscription.subscribe(_callbackTypes.EvCallbackTypes.DIRECT_AGENT_TRANSFER, function (data) {
        var internalTransferCallback = _this3._internalTransferCallbacks[data.type];

        if (data.status === _enums.directTransferStatues.ACCEPTED && data.type === _enums.directTransferTypes.WARM) {
          if (!_this3.transferAgentAvailable) {
            _this3.setCancelableTransfer(true);

            _this3.showNotificationLoadingCancel();
          }

          return;
        }

        if ([_enums.directTransferStatues.REJECTED, _enums.directTransferStatues.SUCCEEDED].includes(data.status) && data.type === _enums.directTransferTypes.WARM) {
          _this3.setCancelableTransfer(false);

          _this3.showNotificationLoadingSpinner();
        }

        if (internalTransferCallback) {
          return internalTransferCallback(data);
        }
      });

      var needCloseNotificationTypes = [_enums.directTransferNotificationTypes.CANCELLED, _enums.directTransferNotificationTypes.VOICEMAIL, _enums.directTransferNotificationTypes.MISSED];

      this._deps.evSubscription.subscribe(_callbackTypes.EvCallbackTypes.DIRECT_AGENT_TRANSFER_NOTIF, function (data) {
        if (data.status === _enums.directTransferNotificationTypes.PENDING) {
          var hasReceivedCall = !!_this3.receivedCall;

          _this3.setReceivedCall(data);

          if (!hasReceivedCall) {
            _this3._showIncomingTransferCallModal();
          }
        }

        if (needCloseNotificationTypes.includes(data.status)) {
          _this3.closeModals();

          _this3.setReceivedCall(null);
        }
      });

      this.onTransferStart( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _this3._deps.alert.info({
                  message: _enums.transferEvents.START,
                  loading: true,
                  backdrop: true,
                  ttl: 0
                });

              case 2:
                _this3._transferNotificationId = _context2.sent;

                if (!_this3.isInternalTransfer) {
                  _this3.setCancelableTransfer(true);

                  _this3.showNotificationLoadingCancel();
                }

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      })));
      this.onTransferSuccess(function () {
        _this3.closeLoadingNotification();

        _this3._deps.alert.success({
          message: _enums.transferSuccesses.TRANSFER_CONNECTED
        });
      });
      this.onTransferError(function (data) {
        _this3.closeLoadingNotification(); // if that is cancel transfer from user do nothing.


        if (data.type === _enums.directTransferTypes.CANCEL) {
          return;
        }

        if (_this3.isInternalTransfer) {
          return _this3._showSendVoiceMailModal(data);
        }

        _this3._deps.alert.danger({
          message: _enums.transferErrors.TRANSFER_ERROR
        });
      }); // End transfer message will come after success and error.

      this.onTransferEnd(function () {
        console.log('==onTransferEnd==');
      });
    }
  }, {
    key: "showNotificationLoadingSpinner",
    value: function showNotificationLoadingSpinner() {
      this._deps.alert.update(this._transferNotificationId, {
        message: _enums.transferEvents.START,
        loading: true
      });
    }
  }, {
    key: "showNotificationLoadingCancel",
    value: function showNotificationLoadingCancel() {
      this._deps.alert.update(this._transferNotificationId, {
        message: _enums.transferEvents.START,
        action: this.cancelTemplate
      });
    }
  }, {
    key: "closeLoadingNotification",
    value: function closeLoadingNotification() {
      if (this._transferNotificationId) {
        this._deps.alert.dismiss(this._transferNotificationId);

        this._transferNotificationId = null;
      }
    }
  }, {
    key: "onTransferStart",
    value: function onTransferStart(handler) {
      if (typeof handler === 'function') {
        this._eventEmitter.on(_enums.transferEvents.START, handler);
      }
    }
  }, {
    key: "onTransferEnd",
    value: function onTransferEnd(handler) {
      if (typeof handler === 'function') {
        this._eventEmitter.on(_enums.transferEvents.END, handler);
      }
    }
  }, {
    key: "onTransferError",
    value: function onTransferError(handler) {
      if (typeof handler === 'function') {
        this._eventEmitter.on(_enums.transferEvents.ERROR, handler);
      }
    }
  }, {
    key: "onTransferSuccess",
    value: function onTransferSuccess(handler) {
      if (typeof handler === 'function') {
        this._eventEmitter.on(_enums.transferEvents.SUCCESS, handler);
      }
    }
  }, {
    key: "closeModals",
    value: function closeModals() {
      // close send voice modal.
      if (this._sendVoiceMailModalId) {
        this._deps.modalUI.close(this._sendVoiceMailModalId);
      } // close ignore/accept transfer modal.


      if (this._incomingTransferCallModalId) {
        this._deps.modalUI.close(this._incomingTransferCallModalId);
      }
    }
  }, {
    key: "fetchAgentList",
    value: function () {
      var _fetchAgentList = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var data, result;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return this.evClient.fetchDirectAgentList();

              case 3:
                result = _context3.sent;

                if (result) {
                  data = result.agents;
                }

                _context3.next = 10;
                break;

              case 7:
                _context3.prev = 7;
                _context3.t0 = _context3["catch"](0);
                console.error(_context3.t0);

              case 10:
                _context3.prev = 10;

                if (Array.isArray(data)) {
                  this.changeAgentList(data);
                }

                return _context3.finish(10);

              case 13:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 7, 10, 13]]);
      }));

      function fetchAgentList() {
        return _fetchAgentList.apply(this, arguments);
      }

      return fetchAgentList;
    }()
  }, {
    key: "rejectTransferCall",
    value: function rejectTransferCall() {
      if (!this.receivedCall) return;

      this._deps.evClient.rejectDirectAgentTransferCall(this.receivedCall.uii);

      this.setReceivedCall(null);
    }
  }, {
    key: "acceptTransferCall",
    value: function acceptTransferCall() {
      var _this4 = this;

      if (!this.receivedCall) return;

      this._deps.evWorkingState.setWorkingStateWorking(); // TODO: need check why add timeout here?


      setTimeout(function () {
        return _this4.setReceivedCall(null);
      }, 6000);
    }
  }, {
    key: "sendVoicemailToAgent",
    value: function sendVoicemailToAgent() {
      var _this5 = this;

      this.setTransferStatus(_enums.transferStatuses.loading);

      this._deps.evClient.sendVoicemailDirectAgentTransfer(this.transferAgentId);

      this._internalTransferCallbacks.VOICEMAIL = function (data) {
        if (data.status === _enums.directTransferStatues.ACCEPTED) {
          _this5._deps.alert.success({
            message: _enums.transferSuccesses.SEND_VOICEMAIL_SUCCESS
          });
        } else {
          _this5._deps.alert.danger({
            message: _enums.transferErrors.SEND_VOICEMAIL_ERROR
          });
        }
      };
    }
  }, {
    key: "cancelTransfer",
    value: function () {
      var _cancelTransfer = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return this.cancelInternalTransfer();

              case 3:
                _context4.next = 9;
                break;

              case 5:
                _context4.prev = 5;
                _context4.t0 = _context4["catch"](0);
                console.error(_context4.t0);
                throw new Error("'cancelInternalTransfer' failed.");

              case 9:
                this.closeLoadingNotification();

              case 10:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 5]]);
      }));

      function cancelTransfer() {
        return _cancelTransfer.apply(this, arguments);
      }

      return cancelTransfer;
    }()
  }, {
    key: "cancelInternalTransfer",
    value: function () {
      var _cancelInternalTransfer = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var _this6 = this;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!this.transferring) {
                  _context5.next = 8;
                  break;
                }

                if (!this.isInternalTransfer) {
                  _context5.next = 7;
                  break;
                }

                this._deps.evClient.cancelDirectAgentTransfer(this.transferAgentId);

                _context5.next = 5;
                return new Promise(function (resolve, reject) {
                  _this6._internalTransferCallbacks.CANCEL = function (data) {
                    if (_this6.stayOnCall) {
                      _this6._internalTransferCallbacks.WARM(data);
                    } else {
                      _this6._internalTransferCallbacks.COLD(data);
                    }

                    if (data.status === _enums.directTransferStatues.SUCCEEDED) {
                      resolve(data);
                    } else {
                      reject(data);
                    }
                  };
                });

              case 5:
                _context5.next = 8;
                break;

              case 7:
                if (this._transferDest) {
                  this._deps.evClient.cancelWarmTransferCall(this._transferDest);
                } else {
                  console.warn('Unexpected cancel transfer');
                }

              case 8:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function cancelInternalTransfer() {
        return _cancelInternalTransfer.apply(this, arguments);
      }

      return cancelInternalTransfer;
    }()
  }, {
    key: "parseNumber",
    value: function parseNumber() {
      switch (this.transferType) {
        case _enums.transferTypes.phoneBook:
          return this.parsePhoneBookNumber();

        case _enums.transferTypes.manualEntry:
          return this.parseManualEntryNumber();

        default:
          break;
      }
    }
  }, {
    key: "getNumber",
    value: function getNumber() {
      var _this$transferPhoneBo;

      switch (this.transferType) {
        case _enums.transferTypes.phoneBook:
          return (_this$transferPhoneBo = this.transferPhoneBook[this.transferPhoneBookSelectedIndex]) === null || _this$transferPhoneBo === void 0 ? void 0 : _this$transferPhoneBo.destination;

        case _enums.transferTypes.manualEntry:
          return this.transferRecipientNumber;

        default:
          break;
      }
    }
  }, {
    key: "parseManualEntryNumber",
    value: function parseManualEntryNumber() {
      if (!this.transferRecipientNumber) {
        throw new _EvTypeError.EvTypeError({
          type: _enums.transferErrors.RECIPIENT_NUMBER_ERROR,
          data: "Abnormal Transfer: this.transferRecipientNumber -> ".concat(this.transferRecipientNumber)
        });
      }

      (0, _checkCountryCode.checkCountryCode)(this.transferRecipientNumber);
      var toNumber = (0, _parseNumber.parseNumber)(this.transferRecipientNumber);
      return {
        toNumber: toNumber,
        countryId: this.transferRecipientCountryId
      };
    }
  }, {
    key: "parsePhoneBookNumber",
    value: function parsePhoneBookNumber() {
      if (this.transferPhoneBookSelectedIndex === null) {
        throw new _EvTypeError.EvTypeError({
          type: _enums.transferErrors.CONTACT_ID_ERROR,
          data: "Abnormal Transfer: this.transferPhoneBookSelected -> ".concat(this.transferPhoneBookSelectedIndex)
        });
      }

      var transferPhoneBookSelected = this.transferPhoneBook[this.transferPhoneBookSelectedIndex];
      (0, _checkCountryCode.checkCountryCode)(transferPhoneBookSelected.destination);
      var toNumber = (0, _parseNumber.parseNumber)(transferPhoneBookSelected.destination);
      return {
        toNumber: toNumber,
        countryId: transferPhoneBookSelected.countryId
      };
    }
  }, {
    key: "transfer",
    value: function () {
      var _transfer = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var _ref4, toNumber, countryId;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                _ref4 = this.parseNumber() || {}, toNumber = _ref4.toNumber, countryId = _ref4.countryId;
                _context6.next = 4;
                return this._eventEmitter.asyncEmit(_enums.transferEvents.START);

              case 4:
                this.setTransferStatus(_enums.transferStatuses.loading);
                _context6.t0 = this.transferType;
                _context6.next = _context6.t0 === _enums.transferTypes.internal ? 8 : _context6.t0 === _enums.transferTypes.phoneBook ? 11 : _context6.t0 === _enums.transferTypes.manualEntry ? 11 : 14;
                break;

              case 8:
                _context6.next = 10;
                return this.internalTransferCall();

              case 10:
                return _context6.abrupt("break", 15);

              case 11:
                _context6.next = 13;
                return this.transferCall({
                  dialDest: toNumber,
                  countryId: countryId
                });

              case 13:
                return _context6.abrupt("break", 15);

              case 14:
                throw new _EvTypeError.EvTypeError({
                  type: _enums.transferErrors.TYPE_ERROR,
                  data: "Abnormal Transfer: this.transferType -> ".concat(this.transferType)
                });

              case 15:
                _context6.next = 17;
                return this._eventEmitter.asyncEmit(_enums.transferEvents.SUCCESS);

              case 17:
                _context6.next = 31;
                break;

              case 19:
                _context6.prev = 19;
                _context6.t1 = _context6["catch"](0);

                if (!(_context6.t1 instanceof _EvTypeError.EvTypeError)) {
                  _context6.next = 28;
                  break;
                }

                _context6.t2 = _context6.t1.type;
                _context6.next = _context6.t2 === _enums.messageTypes.NO_SUPPORT_COUNTRY ? 25 : _context6.t2 === _enums.messageTypes.INVALID_NUMBER ? 26 : 27;
                break;

              case 25:
                return _context6.abrupt("return", this._deps.alert.danger({
                  message: _enums.messageTypes.NO_SUPPORT_COUNTRY,
                  ttl: 0
                }));

              case 26:
                return _context6.abrupt("return", this._deps.alert.danger({
                  message: _callErrors["default"].noToNumber
                }));

              case 27:
                return _context6.abrupt("break", 28);

              case 28:
                _context6.next = 30;
                return this._eventEmitter.asyncEmit(_enums.transferEvents.ERROR, _context6.t1);

              case 30:
                throw _context6.t1;

              case 31:
                _context6.prev = 31;
                this.setTransferStatus(_enums.transferStatuses.idle);
                _context6.next = 35;
                return this._eventEmitter.asyncEmit(_enums.transferEvents.END);

              case 35:
                return _context6.finish(31);

              case 36:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[0, 19, 31, 36]]);
      }));

      function transfer() {
        return _transfer.apply(this, arguments);
      }

      return transfer;
    }()
  }, {
    key: "internalTransferCall",
    value: function () {
      var _internalTransferCall = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        var _this7 = this;

        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (this.transferAgentId) {
                  _context7.next = 2;
                  break;
                }

                throw new _EvTypeError.EvTypeError({
                  type: _enums.transferErrors.AGENT_ID_ERROR,
                  data: "Abnormal Transfer: this.transferAgentId -> ".concat(this.transferAgentId)
                });

              case 2:
                _context7.prev = 2;
                _context7.next = 5;
                return this.fetchAgentList();

              case 5:
                _context7.next = 11;
                break;

              case 7:
                _context7.prev = 7;
                _context7.t0 = _context7["catch"](2);
                console.warn("fetch agent list error");
                console.error(_context7.t0);

              case 11:
                if (!this.stayOnCall) {
                  _context7.next = 17;
                  break;
                }

                this.evClient.warmDirectAgentTransfer(this.transferAgentId);
                _context7.next = 15;
                return new Promise(function (resolve, reject) {
                  _this7._internalTransferCallbacks.WARM = function (data) {
                    if (data.status === _enums.directTransferStatues.SUCCEEDED && data.type === _enums.directTransferTypes.WARM) {
                      resolve(data);
                    } else {
                      reject(data);
                    }
                  };
                });

              case 15:
                _context7.next = 20;
                break;

              case 17:
                this.evClient.coldDirectAgentTransfer(this.transferAgentId);
                _context7.next = 20;
                return new Promise(function (resolve, reject) {
                  _this7._internalTransferCallbacks.COLD = function (data) {
                    if (data.status === _enums.directTransferStatues.ACCEPTED) {
                      resolve(data);
                    } else {
                      reject(data);
                    }
                  };
                });

              case 20:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this, [[2, 7]]);
      }));

      function internalTransferCall() {
        return _internalTransferCall.apply(this, arguments);
      }

      return internalTransferCall;
    }()
  }, {
    key: "transferCall",
    value: function () {
      var _transferCall = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(transferArgs) {
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                if (!this.stayOnCall) {
                  _context8.next = 5;
                  break;
                }

                _context8.next = 3;
                return this.warmTransferCall(transferArgs);

              case 3:
                _context8.next = 7;
                break;

              case 5:
                _context8.next = 7;
                return this.coldTransferCall(transferArgs);

              case 7:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function transferCall(_x) {
        return _transferCall.apply(this, arguments);
      }

      return transferCall;
    }()
  }, {
    key: "warmTransferCall",
    value: function () {
      var _warmTransferCall = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(_ref5) {
        var dialDest, countryId;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                dialDest = _ref5.dialDest, countryId = _ref5.countryId;

                if (!(countryId !== 'USA' && countryId !== 'CAN')) {
                  _context9.next = 11;
                  break;
                }

                if (!this.allowManualInternationalTransfer) {
                  _context9.next = 8;
                  break;
                }

                this._transferDest = dialDest;
                _context9.next = 6;
                return this.evClient.warmTransferIntlCall({
                  dialDest: dialDest,
                  countryId: countryId
                });

              case 6:
                _context9.next = 9;
                break;

              case 8:
                throw new Error("Unexpected Error: ban transferring international call");

              case 9:
                _context9.next = 14;
                break;

              case 11:
                this._transferDest = dialDest;
                _context9.next = 14;
                return this.evClient.warmTransferCall({
                  dialDest: dialDest
                });

              case 14:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function warmTransferCall(_x2) {
        return _warmTransferCall.apply(this, arguments);
      }

      return warmTransferCall;
    }()
  }, {
    key: "coldTransferCall",
    value: function () {
      var _coldTransferCall = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(_ref6) {
        var dialDest, countryId;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                dialDest = _ref6.dialDest, countryId = _ref6.countryId;

                if (!(countryId !== 'USA' && countryId !== 'CAN')) {
                  _context10.next = 9;
                  break;
                }

                if (!this.allowManualInternationalTransfer) {
                  _context10.next = 7;
                  break;
                }

                _context10.next = 5;
                return this.evClient.coldTransferIntlCall({
                  dialDest: dialDest,
                  countryId: countryId
                });

              case 5:
                _context10.next = 7;
                break;

              case 7:
                _context10.next = 11;
                break;

              case 9:
                _context10.next = 11;
                return this.evClient.coldTransferCall({
                  dialDest: dialDest
                });

              case 11:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function coldTransferCall(_x3) {
        return _coldTransferCall.apply(this, arguments);
      }

      return coldTransferCall;
    }()
  }, {
    key: "setCancelTemplate",
    value: function setCancelTemplate(templates) {
      this.cancelTemplate = templates;
    }
  }, {
    key: "_showSendVoiceMailModal",
    value: function _showSendVoiceMailModal(data) {
      var _this8 = this;

      var currentLocale = this._deps.locale.currentLocale;
      var content = this.getErrorContent(data);
      this._sendVoiceMailModalId = this._deps.modalUI.confirm({
        title: _i18n["default"].getString('transferModalTitle', currentLocale),
        content: _i18n["default"].getString(content, currentLocale),
        confirmButtonText: _i18n["default"].getString('sendVoicemail', currentLocale),
        cancelButtonText: _i18n["default"].getString('selectOtherAgents', currentLocale),
        onConfirm: function onConfirm() {
          _this8.sendVoicemailToAgent();
        },
        childrenSize: 'small'
      });
    }
  }, {
    key: "getErrorContent",
    value: function getErrorContent(data) {
      if (data.status === 'FAILED') {
        // ? that is from ev backend message.
        if (data.message.includes('Routing')) {
          return 'transferFailedContent';
        }

        return 'transferTimeOutContent';
      }

      if (data.status === 'REJECTED') {
        return 'transferRejectedContent';
      }

      if (data.type === 'CANCEL') {
        return 'transferCancelContent';
      }

      return 'transferFailedContent';
    }
  }, {
    key: "_showIncomingTransferCallModal",
    value: function _showIncomingTransferCallModal() {
      var _this9 = this;

      var currentLocale = this._deps.locale.currentLocale;
      this._incomingTransferCallModalId = this._deps.modalUI.confirm({
        title: _i18n["default"].getString('incomingTransferTitle', currentLocale),
        content: _i18n["default"].getString('incomingTransferContent', currentLocale),
        confirmButtonText: _i18n["default"].getString('acceptIncomingTransfer', currentLocale),
        cancelButtonText: _i18n["default"].getString('ignoreIncomingTransfer', currentLocale),
        onConfirm: function onConfirm() {
          _this9.acceptTransferCall();
        },
        onCancel: function onCancel() {
          _this9.rejectTransferCall();
        },
        childrenSize: 'small'
      });
    }
  }, {
    key: "transferring",
    get: function get() {
      return this.transferStatus === _enums.transferStatuses.loading;
    }
  }, {
    key: "evClient",
    get: function get() {
      return this._deps.evClient;
    }
  }, {
    key: "allowManualInternationalTransfer",
    get: function get() {
      var _this$_deps$evCall$cu;

      return (_this$_deps$evCall$cu = this._deps.evCall.currentCall) === null || _this$_deps$evCall$cu === void 0 ? void 0 : _this$_deps$evCall$cu.allowManualInternationalTransfer;
    }
  }, {
    key: "allowInternalTransfer",
    get: function get() {
      var _this$_deps$evCall$cu2;

      return ((_this$_deps$evCall$cu2 = this._deps.evCall.currentCall) === null || _this$_deps$evCall$cu2 === void 0 ? void 0 : _this$_deps$evCall$cu2.allowDirectAgentTransfer) !== '0';
    }
  }, {
    key: "isInternalTransfer",
    get: function get() {
      return this.transferType === _enums.transferTypes.internal;
    }
  }, {
    key: "transferPhoneBook",
    get: function get() {
      var _this$_deps$evCall$cu3,
          _this$_deps$evCall$cu4,
          _this10 = this;

      return ((_this$_deps$evCall$cu3 = this._deps.evCall.currentCall) === null || _this$_deps$evCall$cu3 === void 0 ? void 0 : (_this$_deps$evCall$cu4 = _this$_deps$evCall$cu3.transferPhoneBook) === null || _this$_deps$evCall$cu4 === void 0 ? void 0 : _this$_deps$evCall$cu4.reduce(function (prev, bookItem, index) {
        var countryId = bookItem.countryId,
            destination = bookItem.destination,
            name = bookItem.name;

        var country = _this10._deps.evAuth.availableCountries.find(function (country) {
          return country.countryId === countryId;
        });

        if (typeof country === 'undefined' || country === null) {
          return prev;
        }

        var parsedDestination = '';

        try {
          parsedDestination = (0, _phoneNumber.format)({
            phoneNumber: destination,
            countryCode: (0, _i18nIsoCountries.alpha3ToAlpha2)(countryId),
            type: _phoneNumber.formatTypes.e164
          });
        } catch (e) {//
        }

        var countryName = country.countryId !== 'USA' ? country.countryName || country.countryId : '';
        var phoneBookName = "".concat(name, " ").concat(countryName);
        prev.push(_objectSpread(_objectSpread({}, bookItem), {}, {
          phoneBookName: phoneBookName,
          parsedDestination: parsedDestination,
          phoneBookItemIndex: index
        }));
        return prev;
      }, [])) || [];
    }
  }, {
    key: "allowTransferCall",
    get: function get() {
      var currentCall = this._deps.evCall.currentCall;
      return (currentCall === null || currentCall === void 0 ? void 0 : currentCall.allowTransfer) && !currentCall.endedCall;
    }
  }, {
    key: "transferAgentAvailable",
    get: function get() {
      var _this11 = this;

      return this.transferAgentList.find(function (item) {
        return item.agentId === _this11.transferAgentId;
      }).available;
    }
  }]);

  return EvTransferCall;
}(_core.RcModuleV2), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "receivedCall", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "isTransferCancelable", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "transferStatus", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return _enums.transferStatuses.idle;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "transferType", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return _enums.transferTypes.phoneBook;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "transferAgentId", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "transferAgentList", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "transferPhoneBookSelectedIndex", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "transferRecipientNumber", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "transferRecipientCountryId", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 'USA';
  }
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "stayOnCall", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return true;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "transferPhoneBook", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "transferPhoneBook"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setReceivedCall", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setReceivedCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setCancelableTransfer", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setCancelableTransfer"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "resetTransferStatus", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "resetTransferStatus"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "changeStayOnCall", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "changeStayOnCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "changeRecipientCountryId", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "changeRecipientCountryId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "changeTransferType", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "changeTransferType"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "changeAgentList", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "changeAgentList"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "changeRecipientNumber", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "changeRecipientNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "changeTransferPhoneBookSelected", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "changeTransferPhoneBookSelected"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "changeTransferAgentId", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "changeTransferAgentId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setTransferStatus", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setTransferStatus"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "allowTransferCall", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "allowTransferCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "transferAgentAvailable", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "transferAgentAvailable"), _class2.prototype)), _class2)) || _class);
exports.EvTransferCall = EvTransferCall;
//# sourceMappingURL=EvTransferCall.js.map
