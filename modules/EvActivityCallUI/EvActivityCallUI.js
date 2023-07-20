"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.find");
require("core-js/modules/es.array.index-of");
require("core-js/modules/es.array.map");
require("core-js/modules/es.array.some");
require("core-js/modules/es.date.to-string");
require("core-js/modules/es.function.name");
require("core-js/modules/es.object.get-own-property-descriptor");
require("core-js/modules/es.regexp.exec");
require("core-js/modules/es.string.match");
require("core-js/modules/web.timers");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EvActivityCallUI = void 0;
require("regenerator-runtime/runtime");
var _ramda = require("ramda");
var _di = require("@ringcentral-integration/commons/lib/di");
var _core = require("@ringcentral-integration/core");
var _enums = require("../../enums");
var _EvActivityCallUI = require("../../interfaces/EvActivityCallUI.interface");
var _i18n = _interopRequireDefault(require("./i18n"));
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }
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
  var _that$agentRecording, _that$agentRecording2;
  return [that._deps.evTransferCall.allowTransferCall, that._deps.evRequeueCall.allowRequeueCall, that.currentEvMainCall, (_that$agentRecording = that.agentRecording) === null || _that$agentRecording === void 0 ? void 0 : _that$agentRecording.agentRecording, (_that$agentRecording2 = that.agentRecording) === null || _that$agentRecording2 === void 0 ? void 0 : _that$agentRecording2.pause];
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
  return [that.currentEvCall];
}), _dec11 = (0, _core.computed)(function (that) {
  return [that.currentEvCall];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_ref) {
  _inherits(EvActivityCallUI, _ref);
  var _super = _createSuper(EvActivityCallUI);
  _createClass(EvActivityCallUI, [{
    key: "openAgentScriptTab",
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
    /** Is the call pick up directly */
    _this.pickUpDirectly = true;
    _this._stopWatching = null;
    _initializerDefineProperty(_this, "validated", _descriptor, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "required", _descriptor2, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "disabled", _descriptor3, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "saveStatus", _descriptor4, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "scrollTo", _descriptor5, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "isKeypadOpen", _descriptor6, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "keypadValue", _descriptor7, _assertThisInitialized(_this));
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
    key: "setKeypadValue",
    value: function setKeypadValue(value) {
      this.keypadValue = value;
      try {
        this._deps.activeCallControl.onKeypadClick(value.match(/.$/).pop());
      } catch (error) {
        console.error(error === null || error === void 0 ? void 0 : error.message);
      }
    }
  }, {
    key: "setKeypadIsOpen",
    value: function setKeypadIsOpen(status) {
      this.isKeypadOpen = status;
    }
  }, {
    key: "resetKeypadStatus",
    value: function resetKeypadStatus() {
      this.keypadValue = '';
      this.isKeypadOpen = false;
    }
  }, {
    key: "onInitOnce",
    value: function onInitOnce() {
      var _this2 = this;
      this.resetKeypadStatus();
      this._deps.evCallMonitor.onCallRinging(function () {
        _this2._stopWatching = (0, _core.watch)(_this2, function () {
          return _this2.currentEvMainCall;
        }, function (currentEvMainCall) {
          if (currentEvMainCall) {
            _this2._deps.activeCallControl.setIsRecording(_this2.isDefaultRecord);
          }
          _this2._stopWatching();
          _this2._stopWatching = null;
        });
      });
    }
  }, {
    key: "onRecord",
    value: function () {
      var _onRecord = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return this._deps.activeCallControl.record();
              case 3:
                _context.next = 8;
                break;
              case 5:
                _context.prev = 5;
                _context.t0 = _context["catch"](0);
                console.error(_context.t0 === null || _context.t0 === void 0 ? void 0 : _context.t0.message);
              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 5]]);
      }));
      function onRecord() {
        return _onRecord.apply(this, arguments);
      }
      return onRecord;
    }()
  }, {
    key: "onStopRecord",
    value: function () {
      var _onStopRecord = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return this._deps.activeCallControl.stopRecord();
              case 3:
                _context2.next = 8;
                break;
              case 5:
                _context2.prev = 5;
                _context2.t0 = _context2["catch"](0);
                console.error(_context2.t0 === null || _context2.t0 === void 0 ? void 0 : _context2.t0.message);
              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 5]]);
      }));
      function onStopRecord() {
        return _onStopRecord.apply(this, arguments);
      }
      return onStopRecord;
    }()
  }, {
    key: "onPauseRecord",
    value: function () {
      var _onPauseRecord = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return this._deps.activeCallControl.pauseRecord();
              case 3:
                this._sendTabManager(_enums.tabManagerEvents.RECORD_PAUSED);
                this._deps.alert.success({
                  message: _enums.messageTypes.RECORD_PAUSED
                });
                _context3.next = 10;
                break;
              case 7:
                _context3.prev = 7;
                _context3.t0 = _context3["catch"](0);
                console.error(_context3.t0 === null || _context3.t0 === void 0 ? void 0 : _context3.t0.message);
              case 10:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 7]]);
      }));
      function onPauseRecord() {
        return _onPauseRecord.apply(this, arguments);
      }
      return onPauseRecord;
    }()
  }, {
    key: "onRestartTimer",
    value: function () {
      var _onRestartTimer = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return this._deps.activeCallControl.pauseRecord();
              case 3:
                _context4.next = 8;
                break;
              case 5:
                _context4.prev = 5;
                _context4.t0 = _context4["catch"](0);
                console.error(_context4.t0 === null || _context4.t0 === void 0 ? void 0 : _context4.t0.message);
              case 8:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 5]]);
      }));
      function onRestartTimer() {
        return _onRestartTimer.apply(this, arguments);
      }
      return onRestartTimer;
    }()
  }, {
    key: "onResumeRecord",
    value: function onResumeRecord() {
      this._deps.activeCallControl.resumeRecord();
      this._deps.alert.success({
        message: _enums.messageTypes.RECORD_RESUME
      });
    }
  }, {
    key: "changeSavingStatus",
    value: function changeSavingStatus(status) {
      this.saveStatus = status;
    }
  }, {
    key: "changeFormStatus",
    value: function changeFormStatus(_ref2) {
      var validated = _ref2.validated,
        required = _ref2.required,
        disabled = _ref2.disabled;
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
      this.resetKeypadStatus();
    }
  }, {
    key: "onStateChange",
    value: function onStateChange() {
      if (this.ready && this.tabManagerEnabled && this._deps.tabManager.ready) {
        this._checkTabManagerEvent();

        // * when call end reset keypad status
        if (this.callStatus === 'callEnd') {
          this.resetKeypadStatus();
        }
      }
    }
  }, {
    key: "onUpdateCallLog",
    value: function onUpdateCallLog(_ref3, id) {
      var task = _ref3.task;
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
      var _this$getPageRole = this.getPageRole(),
        backUrl = _this$getPageRole.backUrl;
      this._deps.routerInteraction.push(backUrl);
      this.reset();
      this._deps.evCall.activityCallId = null;
    }
  }, {
    key: "getPageRole",
    value: function getPageRole() {
      var pageRoles = {
        activityCallLog: {
          initSaveStatus: _EvActivityCallUI.saveStatus.submit,
          backUrl: '/dialer',
          tabManagerEventSuccess: _enums.tabManagerEvents.CALL_DISPOSITION_SUCCESS,
          logTypesEventSuccess: _enums.logTypes.CALL_DISPOSITION_SUCCESS,
          logTypesEventFailure: _enums.logTypes.CALL_DISPOSITION_FAILURE
        },
        callLogCreate: {
          initSaveStatus: _EvActivityCallUI.callLogMethods.create,
          backUrl: '/history',
          tabManagerEventSuccess: _enums.tabManagerEvents.CALL_DISPOSITION_SUCCESS,
          logTypesEventSuccess: _enums.logTypes.CALL_LOG_CREATE_SUCCESS,
          logTypesEventFailure: _enums.logTypes.CALL_LOG_CREATE_FAILURE
        }
      };
      var currentPath = this._deps.routerInteraction.currentPath;
      if (currentPath.indexOf('/activityCallLog') > -1) {
        return pageRoles.activityCallLog;
      }
      if (/^\/history\/callLog\/.*\/create$/.test(currentPath)) {
        return pageRoles.callLogCreate;
      }

      // return activityCallLog by default
      return pageRoles.activityCallLog;
    }
  }, {
    key: "disposeCall",
    value: function () {
      var _disposeCall = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var evAgentScript, call;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
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
                return _context5.stop();
            }
          }
        }, _callee5, this);
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
          case _enums.tabManagerEvents.CALL_LOG_CREATE_SUCCESS:
            this._dispositionSuccess();
            break;
          case _enums.tabManagerEvents.RECORD_PAUSED:
            this._deps.alert.success({
              message: _enums.messageTypes.RECORD_PAUSED
            });
            break;
          default:
            break;
        }
      }
    }
  }, {
    key: "_hasError",
    value: function _hasError() {
      var _this3 = this;
      return (0, _ramda.keys)(this.validated).some(function (key) {
        return !_this3.validated[key];
      });
    }
  }, {
    key: "_submitData",
    value: function () {
      var _submitData2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(id) {
        var saveFields, _this$getPageRole2, tabManagerEventSuccess, _e$error, _e$error2, _this$getPageRole3, logTypesEventFailure, initSaveStatus;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
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
                  _context6.next = 5;
                  break;
                }
                return _context6.abrupt("return");
              case 5:
                this.changeSavingStatus(_EvActivityCallUI.saveStatus.saving);
                _context6.next = 8;
                return this.disposeCall();
              case 8:
                _this$getPageRole2 = this.getPageRole(), tabManagerEventSuccess = _this$getPageRole2.tabManagerEventSuccess;
                this._sendTabManager(tabManagerEventSuccess);
                this._dispositionSuccess();
                _context6.next = 20;
                break;
              case 13:
                _context6.prev = 13;
                _context6.t0 = _context6["catch"](0);
                _this$getPageRole3 = this.getPageRole(), logTypesEventFailure = _this$getPageRole3.logTypesEventFailure, initSaveStatus = _this$getPageRole3.initSaveStatus;
                this._deps.alert.danger({
                  message: logTypesEventFailure,
                  ttl: 0,
                  payload: (_context6.t0 === null || _context6.t0 === void 0 ? void 0 : (_e$error = _context6.t0.error) === null || _e$error === void 0 ? void 0 : _e$error.status) === false ? _context6.t0 === null || _context6.t0 === void 0 ? void 0 : (_e$error2 = _context6.t0.error) === null || _e$error2 === void 0 ? void 0 : _e$error2.message : undefined
                });
                this.changeSavingStatus(initSaveStatus);
                console.error(_context6.t0);
                throw new Error("Failed to save log.");
              case 20:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[0, 13]]);
      }));
      function _submitData(_x) {
        return _submitData2.apply(this, arguments);
      }
      return _submitData;
    }()
  }, {
    key: "_dispositionSuccess",
    value: function _dispositionSuccess() {
      var _this4 = this;
      this.changeSavingStatus(_EvActivityCallUI.saveStatus.saved);
      var _this$getPageRole4 = this.getPageRole(),
        logTypesEventSuccess = _this$getPageRole4.logTypesEventSuccess;
      this._deps.alert.success({
        message: logTypesEventSuccess
      });
      // delay for animation with loading ui.
      setTimeout(function () {
        return _this4.goBack();
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
    key: "onHangup",
    value: function () {
      var _onHangup = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return this._deps.activeCallControl.hangUp(this.currentEvCall.session.sessionId);
              case 2:
                this.changeSavingStatus(_EvActivityCallUI.saveStatus.submit);
              case 3:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));
      function onHangup() {
        return _onHangup.apply(this, arguments);
      }
      return onHangup;
    }()
  }, {
    key: "getUIProps",
    value: function getUIProps(_ref4) {
      var _this$activityCallLog, _this$activityCallLog2, _this$agentRecording;
      var id = _ref4.id;
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
        showRecordCall: this.currentCallControlPermission.allowRecordControl || this.isDefaultRecord,
        disableActive: this.disableLinks,
        isRecording: this._deps.activeCallControl.isRecording,
        disableRecordControl: this.disableLinks || !this.currentCallControlPermission.allowRecordControl,
        ivrAlertData: this.ivrAlertData,
        disablePauseRecord: this.disableLinks || !this.currentCallControlPermission.allowPauseRecord,
        agentScriptData: this.agentScriptData,
        recordPauseCount: (_this$agentRecording = this.agentRecording) === null || _this$agentRecording === void 0 ? void 0 : _this$agentRecording.pause,
        timeStamp: this._deps.activeCallControl.timeStamp,
        isKeypadOpen: this.isKeypadOpen,
        keypadValue: this.keypadValue
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions() {
      var _this5 = this;
      return {
        goBack: function goBack() {
          return _this5.goBack();
        },
        onMute: function onMute() {
          return _this5._deps.activeCallControl.mute();
        },
        onUnmute: function onUnmute() {
          return _this5._deps.activeCallControl.unmute();
        },
        onHangup: function onHangup() {
          return _this5.onHangup();
        },
        onReject: function onReject() {
          return _this5._deps.activeCallControl.reject();
        },
        onHold: function onHold() {
          return _this5._onHoldOrUnHold('hold');
        },
        onUnHold: function onUnHold() {
          return _this5._onHoldOrUnHold('unhold');
        },
        onActive: function onActive() {
          return _this5.goToActivityCallListPage();
        },
        onRecord: function onRecord() {
          return _this5.onRecord();
        },
        onStopRecord: function onStopRecord() {
          return _this5.onStopRecord();
        },
        onPauseRecord: function onPauseRecord() {
          return _this5.onPauseRecord();
        },
        onRestartTimer: function onRestartTimer() {
          return _this5.onRestartTimer();
        },
        onResumeRecord: function onResumeRecord() {
          return _this5.onResumeRecord();
        },
        setKeypadIsOpen: function setKeypadIsOpen(status) {
          return _this5.setKeypadIsOpen(status);
        },
        setKeypadValue: function setKeypadValue(value) {
          return _this5.setKeypadValue(value);
        },
        onUpdateCallLog: function onUpdateCallLog(data, id) {
          return _this5.onUpdateCallLog(data, id);
        },
        disposeCall: function () {
          var _disposeCall2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
            return regeneratorRuntime.wrap(function _callee8$(_context8) {
              while (1) {
                switch (_context8.prev = _context8.next) {
                  case 0:
                    if (!(_this5.saveStatus === _EvActivityCallUI.saveStatus.saved)) {
                      _context8.next = 2;
                      break;
                    }
                    return _context8.abrupt("return", _this5.goBack());
                  case 2:
                    _context8.next = 4;
                    return _this5._submitData(_this5.callId);
                  case 4:
                  case "end":
                    return _context8.stop();
                }
              }
            }, _callee8);
          }));
          function disposeCall() {
            return _disposeCall2.apply(this, arguments);
          }
          return disposeCall;
        }(),
        onCopySuccess: function onCopySuccess(name) {
          name = name.toUpperCase();
          _this5._deps.alert.info({
            message: _enums.messageTypes["COPY_".concat(name, "_SUCCESS")],
            action: ''
          });
        },
        goToRequeueCallPage: function goToRequeueCallPage() {
          return _this5.goToRequeueCallPage();
        },
        goToTransferCallPage: function goToTransferCallPage(transferType) {
          return _this5.goToTransferCallPage(transferType);
        }
      };
    }
  }, {
    key: "isDefaultRecord",
    get: function get() {
      var _this$agentRecording2;
      return ((_this$agentRecording2 = this.agentRecording) === null || _this$agentRecording2 === void 0 ? void 0 : _this$agentRecording2["default"]) === 'ON';
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
      return this._deps.evCall.isInbound && !this.pickUpDirectly;
      // currentSession.callStatus === telephonyStatuses.ringing
    } // transferCall and requeueCall are two parts of transfer menu
  }, {
    key: "allowTransfer",
    get: function get() {
      return this._deps.evTransferCall.allowTransferCall || this._deps.evRequeueCall.allowRequeueCall;
    }
  }, {
    key: "currentCallControlPermission",
    get: function get() {
      var _this$currentEvMainCa, _this$currentEvMainCa2, _this$agentRecording3, _this$agentRecording4;
      return {
        allowTransferCall: this._deps.evTransferCall.allowTransferCall,
        allowRequeueCall: this._deps.evRequeueCall.allowRequeueCall,
        allowHoldCall: (_this$currentEvMainCa = this.currentEvMainCall) === null || _this$currentEvMainCa === void 0 ? void 0 : _this$currentEvMainCa.allowHold,
        allowHangupCall: (_this$currentEvMainCa2 = this.currentEvMainCall) === null || _this$currentEvMainCa2 === void 0 ? void 0 : _this$currentEvMainCa2.allowHangup,
        allowRecordControl: (_this$agentRecording3 = this.agentRecording) === null || _this$agentRecording3 === void 0 ? void 0 : _this$agentRecording3.agentRecording,
        allowPauseRecord: typeof ((_this$agentRecording4 = this.agentRecording) === null || _this$agentRecording4 === void 0 ? void 0 : _this$agentRecording4.pause) === 'number'
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
    } // TODO: add `callDisposition` in CallLog
  }, {
    key: "activityCallLog",
    get: function get() {
      var _this6 = this;
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
        agentId = currentCall.agentId; // TODO: confirm about  dialDest or dnis?
      var fromNumber = callType === 'OUTBOUND' ? dnis : ani;
      // TODO: confirm about  dialDest or dnis?
      var toNumber = callType === 'OUTBOUND' ? ani : dnis;
      var _ref5 = callDisposition || {},
        dispositionId = _ref5.dispositionId,
        notes = _ref5.notes;
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
          // TODO: handle with call state and agent state
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
              _this6.changeFormStatus({
                validated: {
                  notes: !!value
                }
              });
            } else {
              _this6.changeFormStatus({
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
            _this6.changeFormStatus({
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
      var _this7 = this;
      var isMultipleCalls = this.isMultipleCalls,
        callList = this.callList,
        currentEvMainCall = this.currentEvMainCall;
      if (isMultipleCalls) {
        return !!callList.find(function (call) {
          return !(call.session.agentId === _this7._deps.evAuth.agentId) && !!call.isHold;
        });
      }
      return currentEvMainCall === null || currentEvMainCall === void 0 ? void 0 : currentEvMainCall.isHold;
    }
  }, {
    key: "agentScriptData",
    get: function get() {
      var _this8 = this;
      var call = this.currentEvCall;
      var agentScriptData = null;
      if (this._deps.environment.isWide && this._deps.evAgentScript.getIsAgentScript(call)) {
        agentScriptData = {
          onClick: function onClick() {
            return _this8.openAgentScriptTab();
          }
        };
      }
      return agentScriptData;
    }
  }, {
    key: "ivrAlertData",
    get: function get() {
      var call = this.currentEvCall;
      var ivrAlertData = [];
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
  }, {
    key: "agentRecording",
    get: function get() {
      var _this$currentEvMainCa4;
      return (_this$currentEvMainCa4 = this.currentEvMainCall) === null || _this$currentEvMainCa4 === void 0 ? void 0 : _this$currentEvMainCa4.agentRecording;
    }
  }]);
  return EvActivityCallUI;
}(_core.RcUIModuleV2), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "validated", [_core.storage, _core.state], {
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
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "isKeypadOpen", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "keypadValue", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setKeypadValue", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setKeypadValue"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setKeypadIsOpen", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setKeypadIsOpen"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "resetKeypadStatus", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "resetKeypadStatus"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "currentCallControlPermission", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "currentCallControlPermission"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "dispositionPickList", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "dispositionPickList"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "activityCallLog", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "activityCallLog"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "callStatus", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "callStatus"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "currentEvMainCall", [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "currentEvMainCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "callList", [_dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "callList"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "isMultipleCalls", [_dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "isMultipleCalls"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "isOnHold", [_dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "isOnHold"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "agentScriptData", [_dec10], Object.getOwnPropertyDescriptor(_class2.prototype, "agentScriptData"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "ivrAlertData", [_dec11], Object.getOwnPropertyDescriptor(_class2.prototype, "ivrAlertData"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "changeSavingStatus", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "changeSavingStatus"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "changeFormStatus", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "changeFormStatus"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setScrollTo", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setScrollTo"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "reset", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "reset"), _class2.prototype)), _class2)) || _class);
exports.EvActivityCallUI = EvActivityCallUI;
//# sourceMappingURL=EvActivityCallUI.js.map
