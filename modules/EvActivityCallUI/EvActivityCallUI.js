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

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.array.some");

require("core-js/modules/es6.function.name");

require("regenerator-runtime/runtime");

var _core = require("@ringcentral-integration/core");

var _ramda = require("ramda");

var _di = require("ringcentral-integration/lib/di");

var _enums = require("../../enums");

var _EvActivityCallUI = require("../../interfaces/EvActivityCallUI.interface");

var _i18n = _interopRequireDefault(require("./i18n"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _temp;

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

var EvActivityCallUI = (_dec = (0, _di.Module)({
  name: 'EvActivityCallUI',
  deps: ['Locale', 'Alert', 'ActiveCallControl', 'EvCallMonitor', 'EvCall', 'EvAgentScript', 'EvRequeueCall', 'EvTransferCall', 'EvCallDisposition', 'EvWorkingState', 'EvAgentSession', 'EvIntegratedSoftphone', 'RouterInteraction', 'ConnectivityMonitor', 'RateLimiter', 'Environment', 'Storage', 'EvAuth', {
    dep: 'TabManager',
    optional: true
  }, {
    dep: 'EvActivityCallUIOptions',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (that) {
  return [that._deps.evTransferCall.allowTransferCall, that._deps.evRequeueCall.allowRequeueCall, that.currentEvMainCall];
}), _dec3 = (0, _core.computed)(function (that) {
  return [that.currentEvCall];
}), _dec4 = (0, _core.computed)(function (that) {
  return [that.callId, that.currentEvCall, that._deps.evCallDisposition.callsMapping[that.callId], that.validated, that.required, that._deps.locale.currentLocale, that.dispositionPickList];
}), _dec5 = (0, _core.computed)(function (that) {
  return [that.currentEvCall, that.currentEvMainCall];
}), _dec6 = (0, _core.computed)(function (that) {
  return [that.currentEvCall];
}), _dec7 = (0, _core.computed)(function (that) {
  return [that.callId, that._deps.evCallMonitor.callIds, that._deps.evCallMonitor.otherCallIds, that._deps.evCallMonitor.callsMapping];
}), _dec8 = (0, _core.computed)(function (that) {
  return [that.callList];
}), _dec9 = (0, _core.computed)(function (that) {
  return [that.isMultipleCalls, that.callList, that._deps.evAuth.agentId, that.currentEvMainCall];
}), _dec10 = (0, _core.computed)(function (that) {
  return [that.currentEvCall, that._deps.locale];
}), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_RcUIModuleV) {
  _inherits(EvActivityCallUI, _RcUIModuleV);

  var _super = _createSuper(EvActivityCallUI);

  _createClass(EvActivityCallUI, [{
    key: "openAgentScriptTab",

    /** Is the call pick up directly */
    value: function openAgentScriptTab() {
      console.warn('this should be implement in extend module');
    }
  }]);

  function EvActivityCallUI(deps) {
    var _this;

    _classCallCheck(this, EvActivityCallUI);

    _this = _super.call(this, {
      deps: deps,
      enableCache: true,
      storageKey: 'EvActivityCallUI'
    });
    _this.isFirstTimeHandled = false;
    _this.pickUpDirectly = true;

    _initializerDefineProperty(_this, "validated", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "required", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "disabled", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "saveStatus", _descriptor4, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "scrollTo", _descriptor5, _assertThisInitialized(_this));

    _this.goToActivityCallPage = function () {
      var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.callId;

      _this._deps.routerInteraction.push("/activityCallLog/".concat(id));
    };

    _this.goToActivityCallListPage = function () {
      var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.callId;

      _this._deps.routerInteraction.push("/activityCallLog/".concat(id, "/activeCallList"));
    };

    return _this;
  }

  _createClass(EvActivityCallUI, [{
    key: "changeSavingStatus",
    value: function changeSavingStatus(status) {
      this.saveStatus = status;
    }
  }, {
    key: "changeFormStatus",
    value: function changeFormStatus(_ref) {
      var validated = _ref.validated,
          required = _ref.required,
          disabled = _ref.disabled;

      if (validated) {
        this.validated = _objectSpread(_objectSpread({}, this.validated), validated);
      }

      if (required) {
        this.required = _objectSpread(_objectSpread({}, this.required), required);
      }

      if (disabled) {
        this.disabled = _objectSpread(_objectSpread({}, this.disabled), disabled);
      }
    }
  }, {
    key: "setScrollTo",
    value: function setScrollTo(id) {
      this.scrollTo = id;
    }
  }, {
    key: "reset",
    value: function reset() {
      this.validated = {
        dispositionId: true,
        notes: true
      };
      this.required = {
        notes: false
      };
      this.disabled = {};
      this.saveStatus = _EvActivityCallUI.saveStatus.submit;
    }
  }, {
    key: "onStateChange",
    value: function onStateChange() {
      if (this.ready && this.tabManagerEnabled && this._deps.tabManager.ready) {
        this._checkTabManagerEvent();
      }
    }
  }, {
    key: "onUpdateCallLog",
    value: function onUpdateCallLog(_ref2, id) {
      var task = _ref2.task;
      var isEvCallDisposition = Object.hasOwnProperty.call(task, 'dispositionId') || Object.hasOwnProperty.call(task, 'notes');

      if (isEvCallDisposition) {
        var data = _objectSpread(_objectSpread({}, this._deps.evCallDisposition.callsMapping[id]), task);

        this._deps.evCallDisposition.setDisposition(id, {
          dispositionId: data.dispositionId,
          notes: data.notes
        });
      }
    }
  }, {
    key: "goToRequeueCallPage",
    value: function goToRequeueCallPage() {
      var _this$_deps$evCallMon = this._deps.evCallMonitor.callsMapping[this.callId].gate,
          gateGroupId = _this$_deps$evCallMon.gateGroupId,
          gateId = _this$_deps$evCallMon.gateId;

      this._deps.evRequeueCall.setStatus({
        selectedQueueGroupId: gateGroupId,
        selectedGateId: gateId,
        stayOnCall: false,
        requeuing: false
      });

      this._deps.evTransferCall.changeTransferType(_enums.transferTypes.queue);

      this._redirectTransferCall('/transferCall');
    }
  }, {
    key: "goToTransferCallPage",
    value: function goToTransferCallPage(type) {
      this._deps.evTransferCall.resetTransferStatus();

      this._deps.evTransferCall.fetchAgentList();

      this._redirectTransferCall("/transferCall/".concat(type));
    }
  }, {
    key: "_redirectTransferCall",
    value: function _redirectTransferCall() {
      var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      this._deps.routerInteraction.push("/activityCallLog/".concat(this.callId).concat(url));
    }
  }, {
    key: "goBack",
    value: function goBack() {
      // set status to 'idle' in case of EvCallMonitor does not emit ENDED
      this._deps.evCall.setDialoutStatus(_enums.dialoutStatuses.idle);

      this._deps.routerInteraction.goBack();

      this.reset();
      this._deps.evCall.activityCallId = null;
    }
  }, {
    key: "disposeCall",
    value: function () {
      var _disposeCall = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var evAgentScript, call;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this._deps.evCallDisposition.disposeCall(this.callId);

                evAgentScript = this._deps.evAgentScript;
                call = this.currentEvCall; // evAgentScript.isDisplayAgentScript &&

                if (call.scriptId) {
                  evAgentScript.setCurrentCallScript(null);
                  evAgentScript.saveScriptResult(call);
                }

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function disposeCall() {
        return _disposeCall.apply(this, arguments);
      }

      return disposeCall;
    }()
  }, {
    key: "_checkTabManagerEvent",
    value: function _checkTabManagerEvent() {
      var event = this._deps.tabManager.event;

      if (event) {
        // const data = event.args[0];
        switch (event.name) {
          case _enums.tabManagerEvents.CALL_DISPOSITION_SUCCESS:
            this._dispositionSuccess();

            break;

          default:
            break;
        }
      }
    }
  }, {
    key: "_hasError",
    value: function _hasError() {
      var _this2 = this;

      return (0, _ramda.keys)(this.validated).some(function (key) {
        return !_this2.validated[key];
      });
    }
  }, {
    key: "_submitData",
    value: function () {
      var _submitData2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id) {
        var saveFields;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                saveFields = this._deps.evCallDisposition.callsMapping[id];

                if (saveFields) {
                  this.changeFormStatus({
                    validated: {
                      dispositionId: !!saveFields.dispositionId,
                      notes: !this.required.notes || saveFields.notes && this.required.notes
                    }
                  });
                }

                if (!this._hasError()) {
                  _context2.next = 5;
                  break;
                }

                return _context2.abrupt("return");

              case 5:
                this.changeSavingStatus(_EvActivityCallUI.saveStatus.saving);
                _context2.next = 8;
                return this.disposeCall();

              case 8:
                this._sendTabManager(_enums.tabManagerEvents.CALL_DISPOSITION_SUCCESS);

                this._dispositionSuccess();

                _context2.next = 17;
                break;

              case 12:
                _context2.prev = 12;
                _context2.t0 = _context2["catch"](0);

                this._deps.alert.danger({
                  message: _enums.logTypes.CALL_DISPOSITION_FAILURE,
                  ttl: 0
                });

                this.changeSavingStatus(_EvActivityCallUI.saveStatus.submit);
                throw _context2.t0;

              case 17:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 12]]);
      }));

      function _submitData(_x) {
        return _submitData2.apply(this, arguments);
      }

      return _submitData;
    }()
  }, {
    key: "_dispositionSuccess",
    value: function _dispositionSuccess() {
      var _this3 = this;

      this.changeSavingStatus(_EvActivityCallUI.saveStatus.saved);

      this._deps.alert.success({
        message: _enums.logTypes.CALL_DISPOSITION_SUCCESS
      }); // delay for animation with loading ui.


      setTimeout(function () {
        return _this3.goBack();
      }, 1000);

      this._deps.evWorkingState.setIsPendingDisposition(false);
    }
  }, {
    key: "_onHoldOrUnHold",
    value: function _onHoldOrUnHold(type) {
      if (this.isMultipleCalls) {
        return this.goToActivityCallListPage();
      }

      this._deps.activeCallControl[type]();
    }
  }, {
    key: "_sendTabManager",
    value: function _sendTabManager(event, value) {
      var _this$_deps$tabManage;

      (_this$_deps$tabManage = this._deps.tabManager) === null || _this$_deps$tabManage === void 0 ? void 0 : _this$_deps$tabManage.send(event, value);
    }
  }, {
    key: "getUIProps",
    value: function getUIProps(_ref3) {
      var _this$activityCallLog, _this$activityCallLog2;

      var id = _ref3.id;
      this._deps.evCall.activityCallId = id;
      return {
        scrollTo: this.scrollTo,
        currentLog: this.activityCallLog,
        showSmallCallControl: !((_this$activityCallLog = this.activityCallLog) === null || _this$activityCallLog === void 0 ? void 0 : (_this$activityCallLog2 = _this$activityCallLog.currentEvRawCall) === null || _this$activityCallLog2 === void 0 ? void 0 : _this$activityCallLog2.endedCall),
        currentLocale: this._deps.locale.currentLocale,
        currentEvCall: this.currentEvCall,
        saveStatus: this.saveStatus,
        status: this.callStatus,
        isInbound: this._deps.evCall.isInbound,
        isOnMute: this._deps.evIntegratedSoftphone.muteActive,
        isOnHold: this.isOnHold,
        isOnActive: this.isMultipleCalls,
        isInComingCall: this.isInComingCall,
        smallCallControlSize: this._deps.environment.isWide ? 'medium' : 'small',
        currentCallControlPermission: this.currentCallControlPermission,
        disableDispose: this.disableLinks || this.saveStatus === _EvActivityCallUI.saveStatus.saving,
        disableTransfer: this.disableLinks || this.isInComingCall || !this.allowTransfer,
        disableInternalTransfer: this.disableLinks || this.isInComingCall || !this.allowTransfer || !this._deps.evTransferCall.allowInternalTransfer,
        disableHold: this.disableLinks || this.isInComingCall || !this.currentCallControlPermission.allowHoldCall,
        disableHangup: this.disableLinks || !this.currentCallControlPermission.allowHangupCall,
        disableMute: !this._deps.evAgentSession.isIntegratedSoftphone || this.disableLinks,
        showMuteButton: this._deps.evAgentSession.isIntegratedSoftphone,
        disableActive: this.disableLinks,
        ivrAlertData: this.ivrAlertData
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions() {
      var _this4 = this;

      return {
        goBack: function goBack() {
          return _this4.goBack();
        },
        onMute: function onMute() {
          return _this4._deps.activeCallControl.mute();
        },
        onUnmute: function onUnmute() {
          return _this4._deps.activeCallControl.unmute();
        },
        onHangup: function onHangup() {
          return _this4._deps.activeCallControl.hangUp(_this4.currentEvCall.session.sessionId);
        },
        onReject: function onReject() {
          return _this4._deps.activeCallControl.reject();
        },
        onHold: function onHold() {
          return _this4._onHoldOrUnHold('hold');
        },
        onUnHold: function onUnHold() {
          return _this4._onHoldOrUnHold('unhold');
        },
        onActive: function onActive() {
          return _this4.goToActivityCallListPage();
        },
        onUpdateCallLog: function onUpdateCallLog(data, id) {
          return _this4.onUpdateCallLog(data, id);
        },
        disposeCall: function () {
          var _disposeCall2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    if (!(_this4.saveStatus === _EvActivityCallUI.saveStatus.saved)) {
                      _context3.next = 2;
                      break;
                    }

                    return _context3.abrupt("return", _this4.goBack());

                  case 2:
                    _context3.next = 4;
                    return _this4._submitData(_this4.callId);

                  case 4:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3);
          }));

          function disposeCall() {
            return _disposeCall2.apply(this, arguments);
          }

          return disposeCall;
        }(),
        onCopySuccess: function onCopySuccess(name) {
          name = name.toUpperCase();

          _this4._deps.alert.info({
            message: _enums.messageTypes["COPY_".concat(name, "_SUCCESS")],
            action: ''
          });
        },
        goToRequeueCallPage: function goToRequeueCallPage() {
          return _this4.goToRequeueCallPage();
        },
        goToTransferCallPage: function goToTransferCallPage(transferType) {
          return _this4.goToTransferCallPage(transferType);
        }
      };
    }
  }, {
    key: "callId",
    get: function get() {
      return this._deps.evCall.activityCallId;
    }
  }, {
    key: "disableLinks",
    get: function get() {
      return !this._deps.connectivityMonitor.connectivity || this._deps.rateLimiter.throttling;
    }
  }, {
    key: "tabManagerEnabled",
    get: function get() {
      var _this$_deps$tabManage2;

      return (_this$_deps$tabManage2 = this._deps.tabManager) === null || _this$_deps$tabManage2 === void 0 ? void 0 : _this$_deps$tabManage2.enable;
    }
  }, {
    key: "currentEvCall",
    get: function get() {
      return this._deps.evCall.currentCall;
    } // TODO: should check with outbound call

  }, {
    key: "isInComingCall",
    get: function get() {
      return this._deps.evCall.isInbound && !this.pickUpDirectly; // currentSession.callStatus === telephonyStatuses.ringing
    } // transferCall and requeueCall are two parts of transfer menu

  }, {
    key: "allowTransfer",
    get: function get() {
      return this._deps.evTransferCall.allowTransferCall || this._deps.evRequeueCall.allowRequeueCall;
    }
  }, {
    key: "currentCallControlPermission",
    get: function get() {
      var _this$currentEvMainCa, _this$currentEvMainCa2;

      return {
        allowTransferCall: this._deps.evTransferCall.allowTransferCall,
        allowRequeueCall: this._deps.evRequeueCall.allowRequeueCall,
        allowHoldCall: (_this$currentEvMainCa = this.currentEvMainCall) === null || _this$currentEvMainCa === void 0 ? void 0 : _this$currentEvMainCa.allowHold,
        allowHangupCall: (_this$currentEvMainCa2 = this.currentEvMainCall) === null || _this$currentEvMainCa2 === void 0 ? void 0 : _this$currentEvMainCa2.allowHangup
      };
    }
  }, {
    key: "dispositionPickList",
    get: function get() {
      var _this$currentEvCall, _this$currentEvCall$o, _this$currentEvCall$o2;

      return ((_this$currentEvCall = this.currentEvCall) === null || _this$currentEvCall === void 0 ? void 0 : (_this$currentEvCall$o = _this$currentEvCall.outdialDispositions) === null || _this$currentEvCall$o === void 0 ? void 0 : (_this$currentEvCall$o2 = _this$currentEvCall$o.dispositions) === null || _this$currentEvCall$o2 === void 0 ? void 0 : _this$currentEvCall$o2.map(function (item) {
        return _objectSpread(_objectSpread({}, item), {}, {
          label: item.disposition,
          value: item.dispositionId
        });
      })) || [];
    } // TODO add `callDisposition` in CallLog

  }, {
    key: "activityCallLog",
    get: function get() {
      var _this5 = this;

      var callId = this.callId,
          currentCall = this.currentEvCall,
          validated = this.validated,
          required = this.required;
      var callDisposition = this._deps.evCallDisposition.callsMapping[this.callId];

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

      var _ref4 = callDisposition || {},
          dispositionId = _ref4.dispositionId,
          notes = _ref4.notes;

      var dispositionPickList = this.dispositionPickList;
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
          isCreated: false,
          phoneNumber: currentCall.ani
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
              _this5.changeFormStatus({
                validated: {
                  notes: !!value
                }
              });
            } else {
              _this5.changeFormStatus({
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
          placeholder: _i18n["default"].getString('pleaseSelect', this._deps.locale.currentLocale),
          required: true,
          picklistOptions: dispositionPickList,
          enableScrollError: true,
          error: !validated.dispositionId,
          helperText: !validated.dispositionId ? _i18n["default"].getString('dispositionError', this._deps.locale.currentLocale) : undefined,
          onChange: function onChange(value) {
            var currentDisposition = dispositionPickList.find(function (item) {
              return item.value === value;
            });
            var noteRequired = currentDisposition && currentDisposition.requireNote;

            _this5.changeFormStatus({
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
    }
  }, {
    key: "callStatus",
    get: function get() {
      var _this$currentEvCall2, _this$currentEvMainCa3;

      var status = 'active';

      if ((_this$currentEvCall2 = this.currentEvCall) === null || _this$currentEvCall2 === void 0 ? void 0 : _this$currentEvCall2.endedCall) {
        status = 'callEnd';
      } else if ((_this$currentEvMainCa3 = this.currentEvMainCall) === null || _this$currentEvMainCa3 === void 0 ? void 0 : _this$currentEvMainCa3.isHold) {
        status = 'onHold';
      }

      return status;
    }
  }, {
    key: "currentEvMainCall",
    get: function get() {
      return this.currentEvCall ? this._deps.activeCallControl.getMainCall(this.currentEvCall.uii) : null;
    }
  }, {
    key: "callList",
    get: function get() {
      var _this$_deps$evCallMon2 = this._deps.evCallMonitor,
          callIds = _this$_deps$evCallMon2.callIds,
          otherCallIds = _this$_deps$evCallMon2.otherCallIds,
          callsMapping = _this$_deps$evCallMon2.callsMapping;
      return this._deps.evCallMonitor.getActiveCallList(callIds, otherCallIds, callsMapping, this.callId);
    }
  }, {
    key: "isMultipleCalls",
    get: function get() {
      return this.callList.length > 2;
    }
  }, {
    key: "isOnHold",
    get: function get() {
      var _this6 = this;

      var isMultipleCalls = this.isMultipleCalls,
          callList = this.callList,
          currentEvMainCall = this.currentEvMainCall;

      if (isMultipleCalls) {
        return !!callList.find(function (call) {
          return !(call.session.agentId === _this6._deps.evAuth.agentId) && !!call.isHold;
        });
      }

      return currentEvMainCall === null || currentEvMainCall === void 0 ? void 0 : currentEvMainCall.isHold;
    }
  }, {
    key: "ivrAlertData",
    get: function get() {
      var _this7 = this;

      var call = this.currentEvCall;
      var currentLocale = this._deps.locale.currentLocale;
      var ivrAlertData = [];

      if (this._deps.environment.isWide && this._deps.evAgentScript.getIsAgentScript(call)) {
        ivrAlertData.push({
          subject: _i18n["default"].getString('agentScriptTitle', currentLocale),
          body: _i18n["default"].getString('agentScriptContent', currentLocale),
          onClick: function onClick() {
            return _this7.openAgentScriptTab();
          }
        });
      }

      if (call === null || call === void 0 ? void 0 : call.baggage) {
        for (var i = 1; i <= 3; i++) {
          var ivrAlertSubject = call.baggage["ivrAlertSubject_".concat(i)];
          var ivrAlertBody = call.baggage["ivrAlertBody_".concat(i)];
          if (ivrAlertSubject || ivrAlertBody) ivrAlertData.push({
            subject: ivrAlertSubject || '',
            body: ivrAlertBody || ''
          });
        }
      }

      return ivrAlertData;
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
    return _EvActivityCallUI.saveStatus.submit;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "scrollTo", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "currentCallControlPermission", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "currentCallControlPermission"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "dispositionPickList", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "dispositionPickList"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "activityCallLog", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "activityCallLog"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "callStatus", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "callStatus"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "currentEvMainCall", [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "currentEvMainCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "callList", [_dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "callList"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "isMultipleCalls", [_dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "isMultipleCalls"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "isOnHold", [_dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "isOnHold"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "ivrAlertData", [_dec10], Object.getOwnPropertyDescriptor(_class2.prototype, "ivrAlertData"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "changeSavingStatus", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "changeSavingStatus"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "changeFormStatus", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "changeFormStatus"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setScrollTo", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setScrollTo"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "reset", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "reset"), _class2.prototype)), _class2)) || _class);
exports.EvActivityCallUI = EvActivityCallUI;
//# sourceMappingURL=EvActivityCallUI.js.map
