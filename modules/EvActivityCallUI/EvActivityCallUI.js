"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EvActivityCallUI = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.promise");

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

require("core-js/modules/es6.array.for-each");

require("regenerator-runtime/runtime");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.some");

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.array.map");

var _core = require("@ringcentral-integration/core");

var _di = require("ringcentral-integration/lib/di");

var _enums = require("../../enums");

var _i18n = _interopRequireDefault(require("./i18n"));

var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

var EvActivityCallUI = (_dec = (0, _di.Module)({
  name: 'EvActivityCallUI',
  deps: ['Locale', 'Alert', 'ActiveCallControl', 'EvCallMonitor', 'EvCall', 'EvRequeueCall', 'EvTransferCall', 'EvCallDisposition', 'EvWorkingState', 'EvSessionConfig', 'EvIntegratedSoftphone', 'RouterInteraction', 'ConnectivityMonitor', 'RateLimiter', 'Environment', 'Storage', {
    dep: 'TabManager',
    optional: true
  }, {
    dep: 'EvActivityCallUIOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_RcUIModuleV) {
  _inherits(EvActivityCallUI, _RcUIModuleV);

  var _super = _createSuper(EvActivityCallUI);

  /** Is the call pick up directly */
  function EvActivityCallUI(_ref) {
    var _this;

    var locale = _ref.locale,
        alert = _ref.alert,
        activeCallControl = _ref.activeCallControl,
        evCallMonitor = _ref.evCallMonitor,
        evCall = _ref.evCall,
        evCallDisposition = _ref.evCallDisposition,
        routerInteraction = _ref.routerInteraction,
        evRequeueCall = _ref.evRequeueCall,
        evTransferCall = _ref.evTransferCall,
        evWorkingState = _ref.evWorkingState,
        evSessionConfig = _ref.evSessionConfig,
        evIntegratedSoftphone = _ref.evIntegratedSoftphone,
        connectivityMonitor = _ref.connectivityMonitor,
        rateLimiter = _ref.rateLimiter,
        environment = _ref.environment,
        modules = _ref.modules,
        storage = _ref.storage,
        tabManager = _ref.tabManager,
        _ref$enableCache = _ref.enableCache,
        enableCache = _ref$enableCache === void 0 ? true : _ref$enableCache,
        _ref$storageKey = _ref.storageKey,
        storageKey = _ref$storageKey === void 0 ? 'EvActivityCallUI' : _ref$storageKey;

    _classCallCheck(this, EvActivityCallUI);

    _this = _super.call(this, {
      modules: _objectSpread({
        locale: locale,
        alert: alert,
        activeCallControl: activeCallControl,
        evCallMonitor: evCallMonitor,
        evCall: evCall,
        evCallDisposition: evCallDisposition,
        routerInteraction: routerInteraction,
        evRequeueCall: evRequeueCall,
        evTransferCall: evTransferCall,
        evWorkingState: evWorkingState,
        evSessionConfig: evSessionConfig,
        evIntegratedSoftphone: evIntegratedSoftphone,
        connectivityMonitor: connectivityMonitor,
        rateLimiter: rateLimiter,
        environment: environment,
        storage: storage,
        tabManager: tabManager
      }, modules),
      enableCache: enableCache,
      storageKey: storageKey
    });
    _this._lastSaveStatus = void 0;
    _this.isFirstTimeHandled = false;
    _this.pickUpDirectly = true;

    _initializerDefineProperty(_this, "validated", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "required", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "disabled", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "saveStatus", _descriptor4, _assertThisInitialized(_this));

    _this.getCurrentCallControlPermission = (0, _core.createSelector)(function () {
      return _this.getAllowTransferCall();
    }, function () {
      return _this.getAllowRequeueCall();
    }, function () {
      return _this.getCurrentEvMainCall();
    }, function (allowTransferCall, allowRequeueCall, currentEvMainCall) {
      return {
        allowTransferCall: allowTransferCall,
        allowRequeueCall: allowRequeueCall,
        allowHoldCall: currentEvMainCall === null || currentEvMainCall === void 0 ? void 0 : currentEvMainCall.allowHold,
        allowHangupCall: currentEvMainCall === null || currentEvMainCall === void 0 ? void 0 : currentEvMainCall.allowHangup,
        // TODO: allow mute feature
        allowMuteCall: true
      };
    });
    _this.getAllowRequeueCall = (0, _core.createSelector)(function () {
      return _this.currentEvCall;
    }, function (currentCall) {
      return _this._modules.evRequeueCall.checkAllowRequeue(currentCall);
    });
    _this.getAllowTransferCall = (0, _core.createSelector)(function () {
      return _this.currentEvCall;
    }, function (currentCall) {
      return _this._modules.evTransferCall.checkAllowTransfer(currentCall);
    });
    _this.getDispositionPickList = (0, _core.createSelector)(function () {
      return _this.currentEvCall;
    }, function (currentCall) {
      var _currentCall$outdialD, _currentCall$outdialD2;

      return (currentCall === null || currentCall === void 0 ? void 0 : (_currentCall$outdialD = currentCall.outdialDispositions) === null || _currentCall$outdialD === void 0 ? void 0 : (_currentCall$outdialD2 = _currentCall$outdialD.dispositions) === null || _currentCall$outdialD2 === void 0 ? void 0 : _currentCall$outdialD2.map(function (item) {
        return _objectSpread(_objectSpread({}, item), {}, {
          label: item.disposition,
          value: item.dispositionId
        });
      })) || [];
    });
    _this.getActivityCallLog = (0, _core.createSelector)(function () {
      return _this.callId;
    }, function () {
      return _this.currentEvCall;
    }, function () {
      return _this._modules.evCallDisposition.callsMapping[_this.callId];
    }, function () {
      return _this.validated;
    }, function () {
      return _this.required;
    }, function (callId, currentCall, callDisposition, validated, required) {
      if (!currentCall) {
        return undefined;
      }

      var callType = currentCall.callType,
          dnis = currentCall.dnis,
          uii = currentCall.uii,
          ani = currentCall.ani,
          queueDts = currentCall.queueDts,
          agentId = currentCall.agentId; // TODO confirm about  dialDest or dnis?

      var fromNumber = callType === 'OUTBOUND' ? dnis : ani; // TODO confirm about  dialDest or dnis?

      var toNumber = callType === 'OUTBOUND' ? ani : dnis;

      var _ref2 = callDisposition || {},
          dispositionId = _ref2.dispositionId,
          notes = _ref2.notes;

      var dispositionPickList = _this.getDispositionPickList();

      return {
        currentEvRawCall: currentCall,
        // the call which maps for rc component
        call: {
          id: uii,
          direction: callType,
          from: {
            phoneNumber: fromNumber,
            name: fromNumber
          },
          to: {
            phoneNumber: toNumber,
            name: toNumber
          },
          telephonyStatus: 'CallConnected',
          // TODO handle with call state and agent state
          sessionId: currentCall.session.sessionId,
          telephonySessionId: uii,
          partyId: agentId,
          startTime: new Date(queueDts).getTime(),
          offset: 0,
          fromMatches: [],
          toMatches: [],
          activityMatches: []
        },
        currentSessionId: callId,
        // TODO: this will be remove when api can using.
        currentLogCall: {
          isFailed: false,
          isAutoSave: false,
          isCreated: false
        },
        customLogFields: dispositionPickList.length === 0 ? [] : [{
          label: 'Notes',
          sort: 3,
          type: 'textarea',
          value: 'notes',
          maxLength: 32000,
          required: required.notes,
          error: !validated.notes,
          onChange: function onChange(value) {
            if (required.notes) {
              _this.changeFormStatus({
                validated: {
                  notes: !!value
                }
              });
            } else {
              _this.changeFormStatus({
                validated: {
                  notes: true
                }
              });
            }
          }
        }, {
          label: 'Disposition',
          sort: 5,
          type: 'picklist',
          value: 'dispositionId',
          placeholder: _i18n["default"].getString('pleaseSelect', _this._modules.locale.currentLocale),
          required: true,
          picklistOptions: dispositionPickList,
          enableScrollError: true,
          error: !validated.dispositionId,
          helperText: !validated.dispositionId ? _i18n["default"].getString('dispositionError', _this._modules.locale.currentLocale) : undefined,
          onChange: function onChange(value) {
            var currentDisposition = dispositionPickList.find(function (item) {
              return item.value === value;
            });
            var noteRequired = currentDisposition && currentDisposition.requireNote;

            _this.changeFormStatus({
              validated: {
                dispositionId: !!value,
                notes: !noteRequired || noteRequired && !!notes
              },
              required: {
                notes: noteRequired
              }
            });
          }
        }],
        task: {
          dispositionId: dispositionId,
          notes: notes
        }
      };
    });
    _this.getCallStatus = (0, _core.createSelector)(function () {
      return _this.currentEvCall;
    }, function () {
      return _this.getCurrentEvMainCall();
    }, function (currentEvCall, currentEvMainCall) {
      var status = 'active';

      if (currentEvCall === null || currentEvCall === void 0 ? void 0 : currentEvCall.endedCall) {
        status = 'callEnd';
      } else if (currentEvMainCall.isHold) {
        status = 'onHold';
      }

      return status;
    });
    _this.getCurrentEvMainCall = (0, _core.createSelector)(function () {
      return _this.currentEvCall;
    }, function (currentEvCall) {
      return _this._modules.activeCallControl.getMainCall(currentEvCall.uii);
    });
    _this.getCallList = (0, _core.createSelector)(function () {
      return _this.callId;
    }, function () {
      return _this._modules.evCallMonitor.callIds;
    }, function () {
      return _this._modules.evCallMonitor.otherCallIds;
    }, function () {
      return _this._modules.evCallMonitor.getCallsMapping();
    }, function (callId, callIds, otherCallIds, callsMapping) {
      return _this._modules.evCallMonitor.getActiveCallList(callIds, otherCallIds, callsMapping, callId);
    });
    _this.getIsMultipleCalls = (0, _core.createSelector)(function () {
      return _this.getCallList();
    }, function (callList) {
      return callList.length > 2;
    });

    _this.goToActivityCallPage = function () {
      var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.callId;

      _this._modules.routerInteraction.push("/activityCallLog/".concat(id, "/activeCallList"));
    };

    return _this;
  }

  _createClass(EvActivityCallUI, [{
    key: "changeSavingStatus",
    value: function changeSavingStatus(status) {
      this.state.saveStatus = status;
    }
  }, {
    key: "changeFormStatus",
    value: function changeFormStatus(_ref3) {
      var validated = _ref3.validated,
          required = _ref3.required,
          disabled = _ref3.disabled;

      if (validated) {
        this.state.validated = _objectSpread(_objectSpread({}, this.state.validated), validated);
      }

      if (required) {
        this.state.required = _objectSpread(_objectSpread({}, this.state.required), required);
      }

      if (disabled) {
        this.state.disabled = _objectSpread(_objectSpread({}, this.state.disabled), disabled);
      }
    }
  }, {
    key: "reset",
    value: function reset() {
      this.state.validated = {
        dispositionId: true,
        notes: true
      };
      this.state.required = {
        notes: false
      };
      this.state.disabled = {};
      this.state.saveStatus = 'submit';
    }
  }, {
    key: "onUpdateCallLog",
    value: function onUpdateCallLog(_ref4, id) {
      var task = _ref4.task;
      var isEvCallDisposition = Object.hasOwnProperty.call(task, 'dispositionId') || Object.hasOwnProperty.call(task, 'notes');

      if (isEvCallDisposition) {
        var data = _objectSpread(_objectSpread({}, this._modules.evCallDisposition.callsMapping[id]), task);

        this._modules.evCallDisposition.changeDisposition(id, {
          dispositionId: data.dispositionId,
          notes: data.notes
        });
      }
    }
  }, {
    key: "goToRequeueCallPage",
    value: function goToRequeueCallPage() {
      var _this$_modules$evCall = this._modules.evCallMonitor.getCallsMapping()[this.callId].gate,
          gateGroupId = _this$_modules$evCall.gateGroupId,
          gateId = _this$_modules$evCall.gateId;

      this._modules.evRequeueCall.setStatus({
        selectedQueueGroupId: gateGroupId,
        selectedGateId: gateId,
        stayOnCall: false,
        requeuing: false
      });

      this._modules.evTransferCall.changeTransferType(_enums.transferTypes.queue);

      this._redirectTransferCall('/transferCall');
    }
  }, {
    key: "goToTransferCallPage",
    value: function goToTransferCallPage(type) {
      this._modules.evTransferCall.resetTransferStatus();

      this._modules.evTransferCall.fetchAgentList();

      this._redirectTransferCall("/transferCall/".concat(type));
    }
  }, {
    key: "_redirectTransferCall",
    value: function _redirectTransferCall() {
      var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      this._modules.routerInteraction.push("/activityCallLog/".concat(this.callId).concat(url));
    }
  }, {
    key: "goDialer",
    value: function goDialer() {
      this._modules.routerInteraction.push('/dialer');

      this.reset();
    }
  }, {
    key: "disposeCall",
    value: function disposeCall() {
      this._modules.evCallDisposition.disposeCall(this.callId);
    }
  }, {
    key: "_hasError",
    value: function _hasError() {
      var _this2 = this;

      return Object.keys(this.validated).some(function (key) {
        return !_this2.validated[key];
      });
    }
  }, {
    key: "_submitData",
    value: function () {
      var _submitData2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(id) {
        var _this3 = this;

        var saveFields;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                saveFields = this._modules.evCallDisposition.callsMapping[id];

                if (saveFields) {
                  this.changeFormStatus({
                    validated: {
                      dispositionId: !!saveFields.dispositionId,
                      notes: !this.required.notes || saveFields.notes && this.required.notes
                    }
                  });
                }

                if (!this._hasError()) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt("return");

              case 5:
                this.changeSavingStatus('saving');
                _context.next = 8;
                return this.disposeCall();

              case 8:
                this.changeSavingStatus('saved');

                if (!this.tabManagerEnabled) {
                  this._modules.alert.success({
                    message: _enums.logTypes.CALL_DISPOSITION_SUCCESS
                  }); // delay for animation with loading ui.


                  setTimeout(function () {
                    return _this3.goDialer();
                  }, 1000);
                }

                this._modules.evWorkingState.setIsPendingDisposition(false);

                _context.next = 18;
                break;

              case 13:
                _context.prev = 13;
                _context.t0 = _context["catch"](0);

                this._modules.alert.danger({
                  message: _enums.logTypes.CALL_DISPOSITION_FAILURE,
                  ttl: 0
                });

                this.changeSavingStatus('submit');
                throw _context.t0;

              case 18:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 13]]);
      }));

      function _submitData(_x) {
        return _submitData2.apply(this, arguments);
      }

      return _submitData;
    }()
  }, {
    key: "onStateChange",
    value: function onStateChange() {
      var _this4 = this;

      if (this.tabManagerEnabled && this._lastSaveStatus === 'saving' && this.saveStatus === 'saved') {
        this._lastSaveStatus = this.saveStatus;

        this._modules.alert.success({
          message: _enums.logTypes.CALL_DISPOSITION_SUCCESS
        }); // delay for animation with loading ui.


        setTimeout(function () {
          return _this4.goDialer();
        }, 1000);
      }

      this._lastSaveStatus = this.saveStatus;
    }
  }, {
    key: "_onHold",
    value: function _onHold() {
      if (this.getIsMultipleCalls()) {
        return this.goToActivityCallPage();
      }

      this._modules.activeCallControl.hold();
    }
  }, {
    key: "getUIProps",
    value: function getUIProps(_ref5) {
      var _this$getActivityCall, _this$getActivityCall2;

      var id = _ref5.id;
      this._modules.evCall.activityCallId = id;
      return {
        currentLog: this.getActivityCallLog(),
        showSmallCallControl: !((_this$getActivityCall = this.getActivityCallLog()) === null || _this$getActivityCall === void 0 ? void 0 : (_this$getActivityCall2 = _this$getActivityCall.currentEvRawCall) === null || _this$getActivityCall2 === void 0 ? void 0 : _this$getActivityCall2.endedCall),
        currentLocale: this._modules.locale.currentLocale,
        currentEvCall: this.currentEvCall,
        saveStatus: this.saveStatus,
        status: this.getCallStatus(),
        isInbound: this.isInbound,
        isOnMute: this._modules.evIntegratedSoftphone.muteActive,
        isOnHold: this.getCurrentEvMainCall().isHold,
        isOnActive: this.getIsMultipleCalls(),
        isInComingCall: this.isInComingCall,
        smallCallControlSize: this._modules.environment.isWide ? 'medium' : 'small',
        currentCallControlPermission: this.getCurrentCallControlPermission(),
        disableDispose: this.disableLinks || this.saveStatus === 'saving',
        disableTransfer: this.disableLinks || this.isInComingCall || !this.allowTransfer,
        disableInternalTransfer: this.disableLinks || this.isInComingCall || !this.allowTransfer || !this._modules.evTransferCall.allowInternalTransfer,
        disableHold: this.disableLinks || this.isInComingCall || !this.getCurrentCallControlPermission().allowHoldCall,
        disableHangup: this.disableLinks || !this.getCurrentCallControlPermission().allowHangupCall,
        disableMute: !this._modules.evSessionConfig.isIntegrated || this.disableLinks || !this.getCurrentCallControlPermission().allowMuteCall,
        disableActive: this.disableLinks
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions() {
      var _this5 = this;

      return {
        goBack: function goBack() {},
        onMute: function onMute() {
          return _this5._modules.activeCallControl.mute();
        },
        onUnmute: function onUnmute() {
          return _this5._modules.activeCallControl.unmute();
        },
        onHangup: function onHangup() {
          return _this5._modules.activeCallControl.hangUp(_this5.currentEvCall.session.sessionId);
        },
        onReject: function onReject() {
          return _this5._modules.activeCallControl.reject();
        },
        onHold: function onHold() {
          return _this5._onHold();
        },
        onUnHold: function onUnHold() {
          return _this5._modules.activeCallControl.unhold();
        },
        onActive: function onActive() {
          return _this5.goToActivityCallPage();
        },
        onUpdateCallLog: function onUpdateCallLog(data, id) {
          return _this5.onUpdateCallLog(data, id);
        },
        disposeCall: function () {
          var _disposeCall = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    if (!(_this5.saveStatus === 'saved')) {
                      _context2.next = 2;
                      break;
                    }

                    return _context2.abrupt("return", _this5.goDialer());

                  case 2:
                    _context2.next = 4;
                    return _this5._submitData(_this5.callId);

                  case 4:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2);
          }));

          function disposeCall() {
            return _disposeCall.apply(this, arguments);
          }

          return disposeCall;
        }(),
        goToRequeueCallPage: function goToRequeueCallPage() {
          return _this5.goToRequeueCallPage();
        },
        goToTransferCallPage: function goToTransferCallPage(transferType) {
          return _this5.goToTransferCallPage(transferType);
        }
      };
    }
  }, {
    key: "callId",
    get: function get() {
      return this._modules.evCall.activityCallId;
    }
  }, {
    key: "disableLinks",
    get: function get() {
      return !this._modules.connectivityMonitor.connectivity || this._modules.rateLimiter.throttling;
    }
  }, {
    key: "currentEvCall",
    get: function get() {
      return this._modules.evCall.getCurrentCall();
    }
  }, {
    key: "isInbound",
    get: function get() {
      var _this$currentEvCall;

      return ((_this$currentEvCall = this.currentEvCall) === null || _this$currentEvCall === void 0 ? void 0 : _this$currentEvCall.callType) === 'INBOUND';
    } // TODO: should check with outbound call

  }, {
    key: "isInComingCall",
    get: function get() {
      return this.isInbound && !this.pickUpDirectly; // currentSession.callStatus === telephonyStatuses.ringing
    } // transferCall and requeueCall are two parts of transfer menu

  }, {
    key: "allowTransfer",
    get: function get() {
      return this.getAllowTransferCall() || this.getAllowRequeueCall();
    }
  }, {
    key: "tabManagerEnabled",
    get: function get() {
      var _this$_modules$tabMan;

      return (_this$_modules$tabMan = this._modules.tabManager) === null || _this$_modules$tabMan === void 0 ? void 0 : _this$_modules$tabMan._tabbie.enabled;
    }
  }]);

  return EvActivityCallUI;
}(_core.RcUIModuleV2), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "validated", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {
      dispositionId: true,
      notes: true
    };
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "required", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {
      notes: false
    };
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "disabled", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "saveStatus", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 'submit';
  }
}), _applyDecoratedDescriptor(_class2.prototype, "changeSavingStatus", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "changeSavingStatus"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "changeFormStatus", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "changeFormStatus"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "reset", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "reset"), _class2.prototype)), _class2)) || _class);
exports.EvActivityCallUI = EvActivityCallUI;
//# sourceMappingURL=EvActivityCallUI.js.map
