"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EvTransferCall = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.filter");

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

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.array.is-array");

require("regenerator-runtime/runtime");

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.array.map");

var _core = require("@ringcentral-integration/core");

var _phoneNumber = require("@ringcentral-integration/phone-number");

var _i18nIsoCountries = require("i18n-iso-countries");

var _di = require("ringcentral-integration/lib/di");

var _callErrors = _interopRequireDefault(require("ringcentral-integration/modules/Call/callErrors"));

var _enums = require("../../enums");

var _directTransferNotificationTypes = require("../../enums/directTransferNotificationTypes");

var _directTransferStatues = require("../../enums/directTransferStatues");

var _directTransferTypes = require("../../enums/directTransferTypes");

var _transferErrors = require("../../enums/transferErrors");

var _transferEvents = require("../../enums/transferEvents");

var _transferStatuses = require("../../enums/transferStatuses");

var _transferSuccesses = require("../../enums/transferSuccesses");

var _transferTypes = require("../../enums/transferTypes");

var _asyncEventEmitter = require("../../lib/asyncEventEmitter");

var _checkCountryCode = require("../../lib/checkCountryCode");

var _callbackTypes = require("../../lib/EvClient/enums/callbackTypes");

var _EvTypeError = require("../../lib/EvTypeError");

var _parseNumber = require("../../lib/parseNumber");

var _i18n = _interopRequireDefault(require("./i18n"));

var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

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

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var EvTransferCall = (_dec = (0, _di.Module)({
  name: 'EvTransferCall',
  deps: ['EvClient', 'EvCallMonitor', 'EvCall', 'EvSubscription', 'EvWorkingState', 'Storage', 'Modal', 'Locale', 'Alert', 'EvSessionConfig', {
    dep: 'EvTransferCallOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_RcModuleV) {
  _inherits(EvTransferCall, _RcModuleV);

  var _super = _createSuper(EvTransferCall);

  // alertTemplate: ModalTemplate;
  function EvTransferCall(_ref) {
    var _this;

    var evClient = _ref.evClient,
        evCallMonitor = _ref.evCallMonitor,
        evCall = _ref.evCall,
        evSubscription = _ref.evSubscription,
        evWorkingState = _ref.evWorkingState,
        storage = _ref.storage,
        modal = _ref.modal,
        locale = _ref.locale,
        alert = _ref.alert,
        evSessionConfig = _ref.evSessionConfig,
        _ref$enableCache = _ref.enableCache,
        enableCache = _ref$enableCache === void 0 ? true : _ref$enableCache;

    _classCallCheck(this, EvTransferCall);

    _this = _super.call(this, {
      modules: {
        evClient: evClient,
        evCallMonitor: evCallMonitor,
        evCall: evCall,
        evSubscription: evSubscription,
        evWorkingState: evWorkingState,
        storage: storage,
        modal: modal,
        locale: locale,
        alert: alert,
        evSessionConfig: evSessionConfig
      },
      enableCache: enableCache,
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

    _this.getTransferPhoneBook = (0, _core.createSelector)(function () {
      return _this._modules.evCall.getCurrentCall();
    }, function (currentCall) {
      var _currentCall$transfer;

      return ((_currentCall$transfer = currentCall.transferPhoneBook) === null || _currentCall$transfer === void 0 ? void 0 : _currentCall$transfer.map(function (item) {
        var _parsedDestination;

        try {
          _parsedDestination = (0, _phoneNumber.format)({
            phoneNumber: item.destination,
            countryCode: (0, _i18nIsoCountries.alpha3ToAlpha2)(item.countryId),
            type: _phoneNumber.formatTypes.e164
          });
        } catch (e) {//
        }

        return _objectSpread(_objectSpread({}, item), {}, {
          _parsedDestination: _parsedDestination
        });
      })) || [];
    });
    _this.getTransferAgentAvailable = (0, _core.createSelector)(function () {
      return _this.transferAgentList;
    }, function () {
      return _this.transferAgentId;
    }, function (transferAgentList, transferAgentId) {
      return transferAgentList.find(function (item) {
        return item.agentId === transferAgentId;
      }).available;
    });
    return _this;
  }

  _createClass(EvTransferCall, [{
    key: "setReceivedCall",
    value: function setReceivedCall(data) {
      this.state.receivedCall = data;
    }
  }, {
    key: "setCancelableTransfer",
    value: function setCancelableTransfer(cancelable) {
      this.state.isTransferCancelable = cancelable;
    }
  }, {
    key: "resetTransferStatus",
    value: function resetTransferStatus() {
      this.state.receivedCall = null;
      this.state.transferType = _transferTypes.transferTypes.phoneBook;
      this.state.transferAgentId = null;
      this.state.transferAgentList = [];
      this.state.transferPhoneBookSelectedIndex = null;
      this.state.transferRecipientNumber = '';
      this.state.transferRecipientCountryId = 'USA';
      this.state.stayOnCall = true;
      this.state.isTransferCancelable = false;
      this._sendVoiceMailModalId = null;
      this._incomingTransferCallModalId = null;
      this._transferDest = null;
    }
  }, {
    key: "changeStayOnCall",
    value: function changeStayOnCall(value) {
      this.state.stayOnCall = !value;
    }
  }, {
    key: "changeRecipientCountryId",
    value: function changeRecipientCountryId(countryId) {
      this.state.transferRecipientCountryId = countryId;
    }
  }, {
    key: "changeTransferType",
    value: function changeTransferType(type) {
      this.state.transferType = type;
    }
  }, {
    key: "changeAgentList",
    value: function changeAgentList(data) {
      var _this2 = this;

      var currentAgent = data.find(function (_ref2) {
        var agentId = _ref2.agentId;
        return agentId === _this2.transferAgentId;
      });

      if (!currentAgent) {
        this.state.transferAgentId = null;
      }

      this.state.transferAgentList = data;
    }
  }, {
    key: "changeRecipientNumber",
    value: function changeRecipientNumber(phoneNumber) {
      this.state.transferRecipientNumber = phoneNumber;
    }
  }, {
    key: "changeTransferPhoneBookSelected",
    value: function changeTransferPhoneBookSelected(index) {
      this.state.transferPhoneBookSelectedIndex = index;
    }
  }, {
    key: "changeTransferAgentId",
    value: function changeTransferAgentId(agentId) {
      this.state.transferAgentId = agentId;
    }
  }, {
    key: "setTransferStatus",
    value: function setTransferStatus(transferStatus) {
      this.state.transferStatus = transferStatus;
    }
  }, {
    key: "onInit",
    value: function onInit() {
      if (!this._modules.evSessionConfig.isConfigSuccessByLocal) {
        this.setTransferStatus(_transferStatuses.transferStatuses.idle);
      }
    }
  }, {
    key: "onInitOnce",
    value: function onInitOnce() {
      var _this3 = this;

      this._modules.evCallMonitor.addCallEndedHook(function () {
        _this3.closeModals();
      });

      this._modules.evSubscription.subscribe(_callbackTypes.EvCallbackTypes.DIRECT_AGENT_TRANSFER, function (data) {
        var internalTransferCallback = _this3._internalTransferCallbacks[data.type];

        if (data.status === _directTransferStatues.directTransferStatues.ACCEPTED && data.type === _directTransferTypes.directTransferTypes.WARM) {
          if (!_this3.getTransferAgentAvailable()) {
            _this3.setCancelableTransfer(true);

            _this3.showNotificationLoadingCancel();
          }

          return;
        }

        if ([_directTransferStatues.directTransferStatues.REJECTED, _directTransferStatues.directTransferStatues.SUCCEEDED].includes(data.status) && data.type === _directTransferTypes.directTransferTypes.WARM) {
          _this3.setCancelableTransfer(false);

          _this3.showNotificationLoadingSpinner();
        }

        if (internalTransferCallback) {
          return internalTransferCallback(data);
        }
      });

      this._modules.evSubscription.subscribe(_callbackTypes.EvCallbackTypes.DIRECT_AGENT_TRANSFER_NOTIF, function (data) {
        if (data.status === _directTransferNotificationTypes.directTransferNotificationTypes.PENDING) {
          var hasReceivedCall = !!_this3.receivedCall;

          _this3.setReceivedCall(data);

          if (!hasReceivedCall) {
            _this3._showIncomingTransferCallModal();
          }
        }

        if (data.status === _directTransferNotificationTypes.directTransferNotificationTypes.CANCELLED) {
          _this3.closeModals();

          _this3.setReceivedCall(null);
        }
      });

      this.onTransferStart(function () {
        _this3._transferNotificationId = _this3._modules.alert.info({
          message: _transferEvents.transferEvents.START,
          loading: true,
          backdrop: true,
          ttl: 0
        });

        if (!_this3.isInternalTransfer) {
          _this3.setCancelableTransfer(true);

          _this3.showNotificationLoadingCancel();
        }
      });
      this.onTransferSuccess(function () {
        _this3.closeLoadingNotification();

        _this3._modules.alert.success({
          message: _transferSuccesses.transferSuccesses.TRANSFER_CONNECTED
        });
      });
      this.onTransferError(function (_ref3) {
        var message = _ref3.message;

        _this3.closeLoadingNotification();

        if (_this3.isInternalTransfer) {
          _this3._showSendVoiceMailModal();
        } else if (message !== 'Transfer CANCELED') {
          _this3._modules.alert.danger({
            message: _transferErrors.transferErrors.TRANSFER_ERROR
          });
        }
      }); // End transfer message will come after success and error.

      this.onTransferEnd(function () {
        console.log('==onTransferEnd==');
      });
    }
  }, {
    key: "showNotificationLoadingSpinner",
    value: function showNotificationLoadingSpinner() {
      this._modules.alert.update(this._transferNotificationId, {
        message: _transferEvents.transferEvents.START,
        loading: true
      });
    }
  }, {
    key: "showNotificationLoadingCancel",
    value: function showNotificationLoadingCancel() {
      this._modules.alert.update(this._transferNotificationId, {
        message: _transferEvents.transferEvents.START,
        action: this.cancelTemplate
      });
    }
  }, {
    key: "closeLoadingNotification",
    value: function closeLoadingNotification() {
      if (this._transferNotificationId) {
        this._modules.alert.dismiss(this._transferNotificationId);

        this._transferNotificationId = null;
      }
    }
  }, {
    key: "onTransferStart",
    value: function onTransferStart(handler) {
      if (typeof handler === 'function') {
        this._eventEmitter.on(_transferEvents.transferEvents.START, handler);
      }
    }
  }, {
    key: "onTransferEnd",
    value: function onTransferEnd(handler) {
      if (typeof handler === 'function') {
        this._eventEmitter.on(_transferEvents.transferEvents.END, handler);
      }
    }
  }, {
    key: "onTransferError",
    value: function onTransferError(handler) {
      if (typeof handler === 'function') {
        this._eventEmitter.on(_transferEvents.transferEvents.ERROR, handler);
      }
    }
  }, {
    key: "onTransferSuccess",
    value: function onTransferSuccess(handler) {
      if (typeof handler === 'function') {
        this._eventEmitter.on(_transferEvents.transferEvents.SUCCESS, handler);
      }
    }
  }, {
    key: "closeModals",
    value: function closeModals() {
      // close send voice modal.
      if (this._sendVoiceMailModalId) {
        this._modules.modal.close(this._sendVoiceMailModalId);
      } // close ignore/accept transfer modal.


      if (this._incomingTransferCallModalId) {
        this._modules.modal.close(this._incomingTransferCallModalId);
      }
    }
  }, {
    key: "fetchAgentList",
    value: function () {
      var _fetchAgentList = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var data, result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return this.evClient.fetchDirectAgentList();

              case 3:
                result = _context.sent;

                if (result) {
                  data = result.agents;
                }

                _context.next = 10;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](0);
                console.error(_context.t0);

              case 10:
                _context.prev = 10;

                if (Array.isArray(data)) {
                  this.changeAgentList(data);
                }

                return _context.finish(10);

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 7, 10, 13]]);
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

      this._modules.evClient.rejectDirectAgentTransferCall(this.receivedCall.uii);

      this.setReceivedCall(null);
    }
  }, {
    key: "acceptTransferCall",
    value: function acceptTransferCall() {
      var _this4 = this;

      if (!this.receivedCall) return;

      this._modules.evWorkingState.setWorkingStateWorking(); // TODO: need check why add timeout here?


      setTimeout(function () {
        return _this4.setReceivedCall(null);
      }, 6000);
    }
  }, {
    key: "sendVoicemailToAgent",
    value: function sendVoicemailToAgent() {
      var _this5 = this;

      this.setTransferStatus(_transferStatuses.transferStatuses.loading);

      this._modules.evClient.sendVoicemailDirectAgentTransfer(this.transferAgentId);

      this._internalTransferCallbacks.VOICEMAIL = function (data) {
        if (data.status === _directTransferStatues.directTransferStatues.ACCEPTED) {
          _this5._modules.alert.success({
            message: _transferSuccesses.transferSuccesses.SEND_VOICEMAIL_SUCCESS
          });
        } else {
          _this5._modules.alert.danger({
            message: _transferErrors.transferErrors.SEND_VOICEMAIL_ERROR
          });
        }
      };
    }
  }, {
    key: "cancelTransfer",
    value: function () {
      var _cancelTransfer = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return this.cancelInternalTransfer();

              case 3:
                _context2.next = 9;
                break;

              case 5:
                _context2.prev = 5;
                _context2.t0 = _context2["catch"](0);
                console.error(_context2.t0);
                throw new Error("'cancelInternalTransfer' failed.");

              case 9:
                this.closeLoadingNotification();

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 5]]);
      }));

      function cancelTransfer() {
        return _cancelTransfer.apply(this, arguments);
      }

      return cancelTransfer;
    }()
  }, {
    key: "cancelInternalTransfer",
    value: function () {
      var _cancelInternalTransfer = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var _this6 = this;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!this.transferring) {
                  _context3.next = 8;
                  break;
                }

                if (!this.isInternalTransfer) {
                  _context3.next = 7;
                  break;
                }

                this._modules.evClient.cancelDirectAgentTransfer(this.transferAgentId);

                _context3.next = 5;
                return new Promise(function (resolve, reject) {
                  _this6._internalTransferCallbacks.CANCEL = function (data) {
                    if (_this6.stayOnCall) {
                      _this6._internalTransferCallbacks.WARM(data);
                    } else {
                      _this6._internalTransferCallbacks.COLD(data);
                    }

                    if (data.status === _directTransferStatues.directTransferStatues.SUCCEEDED) {
                      resolve(data);
                    } else {
                      reject(data);
                    }
                  };
                });

              case 5:
                _context3.next = 8;
                break;

              case 7:
                if (this._transferDest) {
                  this._modules.evClient.cancelWarmTransferCall(this._transferDest);
                } else {
                  console.warn('Unexpected cancel transfer');
                }

              case 8:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
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
        case _transferTypes.transferTypes.phoneBook:
          return this.parsePhoneBookNumber();

        case _transferTypes.transferTypes.manualEntry:
          return this.parseManualEntryNumber();

        default:
          break;
      }
    }
  }, {
    key: "getNumber",
    value: function getNumber() {
      var _this$getTransferPhon;

      switch (this.transferType) {
        case _transferTypes.transferTypes.phoneBook:
          return (_this$getTransferPhon = this.getTransferPhoneBook()[this.transferPhoneBookSelectedIndex]) === null || _this$getTransferPhon === void 0 ? void 0 : _this$getTransferPhon.destination;

        case _transferTypes.transferTypes.manualEntry:
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
          type: _transferErrors.transferErrors.RECIPIENT_NUMBER_ERROR,
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
          type: _transferErrors.transferErrors.CONTACT_ID_ERROR,
          data: "Abnormal Transfer: this.transferPhoneBookSelected -> ".concat(this.transferPhoneBookSelectedIndex)
        });
      }

      var transferPhoneBookSelected = this.getTransferPhoneBook()[this.transferPhoneBookSelectedIndex];
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
      var _transfer = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var _ref4, toNumber, countryId;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _ref4 = this.parseNumber() || {}, toNumber = _ref4.toNumber, countryId = _ref4.countryId;
                _context4.next = 4;
                return this._eventEmitter.asyncEmit(_transferEvents.transferEvents.START);

              case 4:
                this.setTransferStatus(_transferStatuses.transferStatuses.loading);
                _context4.t0 = this.transferType;
                _context4.next = _context4.t0 === _transferTypes.transferTypes.internal ? 8 : _context4.t0 === _transferTypes.transferTypes.phoneBook ? 11 : _context4.t0 === _transferTypes.transferTypes.manualEntry ? 11 : 14;
                break;

              case 8:
                _context4.next = 10;
                return this.internalTransferCall();

              case 10:
                return _context4.abrupt("break", 15);

              case 11:
                _context4.next = 13;
                return this.transferCall({
                  dialDest: toNumber,
                  countryId: countryId
                });

              case 13:
                return _context4.abrupt("break", 15);

              case 14:
                throw new _EvTypeError.EvTypeError({
                  type: _transferErrors.transferErrors.TYPE_ERROR,
                  data: "Abnormal Transfer: this.transferType -> ".concat(this.transferType)
                });

              case 15:
                _context4.next = 17;
                return this._eventEmitter.asyncEmit(_transferEvents.transferEvents.SUCCESS);

              case 17:
                _context4.next = 29;
                break;

              case 19:
                _context4.prev = 19;
                _context4.t1 = _context4["catch"](0);
                _context4.t2 = _context4.t1.type;
                _context4.next = _context4.t2 === _enums.messageTypes.NO_SUPPORT_COUNTRY ? 24 : _context4.t2 === _enums.messageTypes.INVALID_NUMBER ? 25 : 26;
                break;

              case 24:
                return _context4.abrupt("return", this._modules.alert.danger({
                  message: _enums.messageTypes.NO_SUPPORT_COUNTRY,
                  ttl: 0
                }));

              case 25:
                return _context4.abrupt("return", this._modules.alert.danger({
                  message: _callErrors["default"].noToNumber
                }));

              case 26:
                _context4.next = 28;
                return this._eventEmitter.asyncEmit(_transferEvents.transferEvents.ERROR, _context4.t1);

              case 28:
                throw _context4.t1;

              case 29:
                _context4.prev = 29;
                this.setTransferStatus(_transferStatuses.transferStatuses.idle);
                _context4.next = 33;
                return this._eventEmitter.asyncEmit(_transferEvents.transferEvents.END);

              case 33:
                return _context4.finish(29);

              case 34:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 19, 29, 34]]);
      }));

      function transfer() {
        return _transfer.apply(this, arguments);
      }

      return transfer;
    }()
  }, {
    key: "internalTransferCall",
    value: function () {
      var _internalTransferCall = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var _this7 = this;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (this.transferAgentId) {
                  _context5.next = 2;
                  break;
                }

                throw new _EvTypeError.EvTypeError({
                  type: _transferErrors.transferErrors.AGENT_ID_ERROR,
                  data: "Abnormal Transfer: this.transferAgentId -> ".concat(this.transferAgentId)
                });

              case 2:
                _context5.prev = 2;
                _context5.next = 5;
                return this.fetchAgentList();

              case 5:
                _context5.next = 11;
                break;

              case 7:
                _context5.prev = 7;
                _context5.t0 = _context5["catch"](2);
                console.warn("fetch agent list error");
                console.error(_context5.t0);

              case 11:
                if (!this.stayOnCall) {
                  _context5.next = 17;
                  break;
                }

                this.evClient.warmDirectAgentTransfer(this.transferAgentId);
                _context5.next = 15;
                return new Promise(function (resolve, reject) {
                  _this7._internalTransferCallbacks.WARM = function (data) {
                    if (data.status === _directTransferStatues.directTransferStatues.SUCCEEDED && data.type === _directTransferTypes.directTransferTypes.WARM) {
                      resolve(data);
                    } else {
                      reject(data);
                    }
                  };
                });

              case 15:
                _context5.next = 20;
                break;

              case 17:
                this.evClient.coldDirectAgentTransfer(this.transferAgentId);
                _context5.next = 20;
                return new Promise(function (resolve, reject) {
                  _this7._internalTransferCallbacks.COLD = function (data) {
                    if (data.status === _directTransferStatues.directTransferStatues.ACCEPTED) {
                      resolve(data);
                    } else {
                      reject(data);
                    }
                  };
                });

              case 20:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[2, 7]]);
      }));

      function internalTransferCall() {
        return _internalTransferCall.apply(this, arguments);
      }

      return internalTransferCall;
    }()
  }, {
    key: "transferCall",
    value: function () {
      var _transferCall = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(transferArgs) {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!this.stayOnCall) {
                  _context6.next = 5;
                  break;
                }

                _context6.next = 3;
                return this.warmTransferCall(transferArgs);

              case 3:
                _context6.next = 7;
                break;

              case 5:
                _context6.next = 7;
                return this.coldTransferCall(transferArgs);

              case 7:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function transferCall(_x) {
        return _transferCall.apply(this, arguments);
      }

      return transferCall;
    }()
  }, {
    key: "checkAllowTransfer",
    value: function checkAllowTransfer(currentCall) {
      return currentCall.allowTransfer && !currentCall.endedCall;
    }
  }, {
    key: "warmTransferCall",
    value: function () {
      var _warmTransferCall = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(_ref5) {
        var dialDest, countryId;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                dialDest = _ref5.dialDest, countryId = _ref5.countryId;

                if (!(countryId !== 'USA')) {
                  _context7.next = 11;
                  break;
                }

                if (!this.allowManualInternationalTransfer) {
                  _context7.next = 8;
                  break;
                }

                this._transferDest = dialDest;
                _context7.next = 6;
                return this.evClient.warmTransferIntlCall({
                  dialDest: dialDest,
                  countryId: countryId
                });

              case 6:
                _context7.next = 9;
                break;

              case 8:
                throw new Error("Unexpected Error: ban transferring international call");

              case 9:
                _context7.next = 15;
                break;

              case 11:
                this._transferDest = dialDest; // TODO: remove the temporary regression debugging log

                console.log('[warmTransferCall]');
                _context7.next = 15;
                return this.evClient.warmTransferCall({
                  dialDest: dialDest
                });

              case 15:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function warmTransferCall(_x2) {
        return _warmTransferCall.apply(this, arguments);
      }

      return warmTransferCall;
    }()
  }, {
    key: "coldTransferCall",
    value: function () {
      var _coldTransferCall = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(_ref6) {
        var dialDest, countryId;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                dialDest = _ref6.dialDest, countryId = _ref6.countryId;

                if (!(countryId !== 'USA')) {
                  _context8.next = 9;
                  break;
                }

                if (!this.allowManualInternationalTransfer) {
                  _context8.next = 7;
                  break;
                }

                _context8.next = 5;
                return this.evClient.coldTransferIntlCall({
                  dialDest: dialDest,
                  countryId: countryId
                });

              case 5:
                _context8.next = 7;
                break;

              case 7:
                _context8.next = 11;
                break;

              case 9:
                _context8.next = 11;
                return this.evClient.coldTransferCall({
                  dialDest: dialDest
                });

              case 11:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
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
    value: function _showSendVoiceMailModal() {
      var _this8 = this;

      this._sendVoiceMailModalId = this._modules.modal.confirm({
        title: _i18n["default"].getString('transferModalTitle', this._modules.locale.currentLocale),
        okText: _i18n["default"].getString('sendVoicemail', this._modules.locale.currentLocale),
        content: _i18n["default"].getString('transferFailedContent', this._modules.locale.currentLocale),
        cancelText: _i18n["default"].getString('selectOtherAgents', this._modules.locale.currentLocale),
        onOK: function onOK() {
          _this8.sendVoicemailToAgent();
        }
      });
    }
  }, {
    key: "_showIncomingTransferCallModal",
    value: function _showIncomingTransferCallModal() {
      var _this9 = this;

      this._incomingTransferCallModalId = this._modules.modal.confirm({
        title: _i18n["default"].getString('incomingTransferTitle', this._modules.locale.currentLocale),
        content: _i18n["default"].getString('incomingTransferContent', this._modules.locale.currentLocale),
        okText: _i18n["default"].getString('acceptIncomingTransfer', this._modules.locale.currentLocale),
        cancelText: _i18n["default"].getString('ignoreIncomingTransfer', this._modules.locale.currentLocale),
        onOK: function onOK() {
          _this9.acceptTransferCall();
        },
        onCancel: function onCancel() {
          _this9.rejectTransferCall();
        }
      });
    }
  }, {
    key: "transferring",
    get: function get() {
      return this.transferStatus === _transferStatuses.transferStatuses.loading;
    }
  }, {
    key: "evClient",
    get: function get() {
      return this._modules.evClient;
    }
  }, {
    key: "allowManualInternationalTransfer",
    get: function get() {
      var _this$_modules$evCall;

      return (_this$_modules$evCall = this._modules.evCall.getCurrentCall()) === null || _this$_modules$evCall === void 0 ? void 0 : _this$_modules$evCall.allowManualInternationalTransfer;
    }
  }, {
    key: "allowInternalTransfer",
    get: function get() {
      var _this$_modules$evCall2;

      return ((_this$_modules$evCall2 = this._modules.evCall.getCurrentCall()) === null || _this$_modules$evCall2 === void 0 ? void 0 : _this$_modules$evCall2.allowDirectAgentTransfer) !== '0';
    }
  }, {
    key: "isInternalTransfer",
    get: function get() {
      return this.transferType === _transferTypes.transferTypes.internal;
    }
  }]);

  return EvTransferCall;
}(_core.RcModuleV2), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "receivedCall", [_core.storage, _core.state], {
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
    return _transferStatuses.transferStatuses.idle;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "transferType", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return _transferTypes.transferTypes.phoneBook;
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
}), _applyDecoratedDescriptor(_class2.prototype, "setReceivedCall", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setReceivedCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setCancelableTransfer", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setCancelableTransfer"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "resetTransferStatus", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "resetTransferStatus"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "changeStayOnCall", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "changeStayOnCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "changeRecipientCountryId", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "changeRecipientCountryId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "changeTransferType", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "changeTransferType"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "changeAgentList", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "changeAgentList"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "changeRecipientNumber", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "changeRecipientNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "changeTransferPhoneBookSelected", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "changeTransferPhoneBookSelected"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "changeTransferAgentId", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "changeTransferAgentId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setTransferStatus", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setTransferStatus"), _class2.prototype)), _class2)) || _class);
exports.EvTransferCall = EvTransferCall;
//# sourceMappingURL=EvTransferCall.js.map
