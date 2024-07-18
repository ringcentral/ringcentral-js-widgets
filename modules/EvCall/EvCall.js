"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.includes");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.number.is-nan");
require("core-js/modules/es.object.get-own-property-descriptor");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.parse-int");
require("core-js/modules/es.promise");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EvCall = void 0;
require("regenerator-runtime/runtime");
var _di = require("@ringcentral-integration/commons/lib/di");
var _Call = require("@ringcentral-integration/commons/modules/Call");
var _core = require("@ringcentral-integration/core");
var _enums = require("../../enums");
var _dialoutStatus = require("../../enums/dialoutStatus");
var _callbackTypes = require("../../lib/EvClient/enums/callbackTypes");
var _checkCountryCode = require("../../lib/checkCountryCode");
var _parseNumber = require("../../lib/parseNumber");
var _trackEvents = require("../../lib/trackEvents");
var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _createSuper(t) { var r = _isNativeReflectConstruct(); return function () { var e, o = _getPrototypeOf(t); if (r) { var s = _getPrototypeOf(this).constructor; e = Reflect.construct(o, arguments, s); } else e = o.apply(this, arguments); return _possibleConstructorReturn(this, e); }; }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
var DEFAULT_OUTBOUND_SETTING = {
  dialoutCallerId: '-1',
  dialoutQueueId: '-1',
  dialoutCountryId: 'USA',
  dialoutRingTime: 30
};
var EvCall = (_dec = (0, _di.Module)({
  name: 'EvCall',
  deps: ['Alert', 'EvAuth', 'Storage', 'EvClient', 'Presence', 'EvSettings', 'EvCallMonitor', 'EvSubscription', 'EvAgentSession', 'EvIntegratedSoftphone', {
    dep: 'TabManager',
    optional: true
  }, {
    dep: 'EvCallOptions',
    optional: true
  }, {
    dep: 'EvWorkingState',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (that) {
  return [that.activityCallId, that._deps.evCallMonitor.callsMapping];
}), _dec3 = (0, _core.computed)(function (that) {
  return [that._deps.evAuth.isEvLogged, that.ready];
}), _dec4 = (0, _core.track)(function (that) {
  return [_trackEvents.trackEvents.outbound, {
    value: that._deps.evAgentSession.loginType
  }];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  _inherits(EvCall, _RcModuleV);
  var _super = _createSuper(EvCall);
  function EvCall(deps) {
    var _this;
    _classCallCheck(this, EvCall);
    _this = _super.call(this, {
      deps: deps,
      enableCache: true,
      storageKey: 'EvCall'
    });
    /** this id is get from route, set from EvActivityCallUI */
    _this.activityCallId = void 0;
    _this.ringTimeLimit = {
      min: 20,
      max: 120
    };
    _initializerDefineProperty(_this, "dialoutCallerId", _descriptor, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "dialoutQueueId", _descriptor2, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "dialoutCountryId", _descriptor3, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "dialoutRingTime", _descriptor4, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "formGroup", _descriptor5, _assertThisInitialized(_this));
    return _this;
  }
  _createClass(EvCall, [{
    key: "setFormGroup",
    value: function setFormGroup(data) {
      this.formGroup = _objectSpread(_objectSpread({}, this.formGroup), data);
    }
  }, {
    key: "saveForm",
    value: function saveForm() {
      this.dialoutCallerId = this.formGroup.dialoutCallerId;
      this.dialoutQueueId = this.formGroup.dialoutQueueId;
      this.dialoutCountryId = this.formGroup.dialoutCountryId;
      this.dialoutRingTime = this.formGroup.dialoutRingTime;
    }
  }, {
    key: "resetOutBoundDialSetting",
    value: function resetOutBoundDialSetting() {
      this.dialoutCallerId = DEFAULT_OUTBOUND_SETTING.dialoutCallerId;
      this.dialoutQueueId = DEFAULT_OUTBOUND_SETTING.dialoutQueueId;
      this.dialoutCountryId = DEFAULT_OUTBOUND_SETTING.dialoutCountryId;
      this.dialoutRingTime = DEFAULT_OUTBOUND_SETTING.dialoutRingTime;
      var defaultRingTime = parseInt(this._deps.evAuth.outboundManualDefaultRingtime, 10);
      if (!Number.isNaN(defaultRingTime)) {
        this.formGroup.dialoutRingTime = defaultRingTime;
        this.dialoutRingTime = defaultRingTime;
      }
    }
  }, {
    key: "resetForm",
    value: function resetForm() {
      this.setFormGroup({
        dialoutCallerId: this.dialoutCallerId,
        dialoutQueueId: this.dialoutQueueId,
        dialoutCountryId: this.dialoutCountryId,
        dialoutRingTime: this.dialoutRingTime
      });
    }
  }, {
    key: "onInitOnce",
    value: function onInitOnce() {
      var _this2 = this;
      (0, _core.watch)(this, function () {
        return _this2.isOnLoginSuccess;
      }, function (isOnLoginSuccess) {
        if (isOnLoginSuccess) {
          _this2.resetForm();
        }
      });
      this._deps.evCallMonitor.onCallEnded(function () {
        _this2.setDialoutStatus(_dialoutStatus.dialoutStatuses.idle);
      });
      this._deps.evSubscription.subscribe(_callbackTypes.EvCallbackTypes.TCPA_SAFE_LEAD_STATE, function (data) {
        if (['INTERCEPT', 'BUSY', 'NOANSWER'].includes(data.leadState)) {
          // TCPA_SAFE_LEAD_STATE -> BUSY
          // TODO: alert message info about busy call.
          if (!_this2._deps.evSettings.isManualOffhook && _this2._isTabActive) {
            _this2._deps.evClient.offhookTerm();
          }
          _this2.setPhonedIdle();
          if (data.leadState === 'INTERCEPT') {
            _this2._deps.alert.info({
              message: _enums.messageTypes.INTERCEPT
            });
          }
        }
      });
      this._deps.evSubscription.subscribe(_callbackTypes.EvCallbackTypes.OFFHOOK_TERM, function () {
        _this2.setPhonedIdle();
      });
    }
  }, {
    key: "onInit",
    value: function onInit() {
      if (this._deps.evAuth.isFreshLogin) {
        this.resetOutBoundDialSetting();
      }
    }
  }, {
    key: "dialout",
    value: function () {
      var _dialout = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(phoneNumber) {
        var integratedSoftphone, destination;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this._deps.presence.setCurrentCallUii('');
                if (!this._deps.evAgentSession.isIntegratedSoftphone) {
                  _context.next = 18;
                  break;
                }
                integratedSoftphone = this._deps.evIntegratedSoftphone;
                _context.prev = 3;
                if (!integratedSoftphone.sipRegisterSuccess) {
                  _context.next = 9;
                  break;
                }
                _context.next = 7;
                return integratedSoftphone.askAudioPermission(false);
              case 7:
                _context.next = 13;
                break;
              case 9:
                _context.next = 11;
                return this._deps.evAgentSession.configureAgent();
              case 11:
                _context.next = 13;
                return integratedSoftphone.onceRegistered();
              case 13:
                _context.next = 18;
                break;
              case 15:
                _context.prev = 15;
                _context.t0 = _context["catch"](3);
                return _context.abrupt("return");
              case 18:
                _context.prev = 18;
                destination = this._checkAndParseNumber(phoneNumber);
                _context.next = 22;
                return this._manualOutdial({
                  destination: destination,
                  callerId: this.callerId,
                  countryId: this.countryId,
                  queueId: this.queueId,
                  ringTime: this.ringTime
                });
              case 22:
                _context.next = 27;
                break;
              case 24:
                _context.prev = 24;
                _context.t1 = _context["catch"](18);
                this.setPhonedIdle();
              case 27:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[3, 15], [18, 24]]);
      }));
      function dialout(_x) {
        return _dialout.apply(this, arguments);
      }
      return dialout;
    }()
  }, {
    key: "outdialCancel",
    value: function outdialCancel() {
      this._deps.evClient.manualOutdialCancel(this._deps.presence.currentCallUii);
    }
  }, {
    key: "checkDialoutRingTime",
    value: function checkDialoutRingTime() {
      var dialoutRingTime = Math.min(Math.max(this.formGroup.dialoutRingTime, this.ringTimeLimit.min), this.ringTimeLimit.max);
      if (dialoutRingTime !== this.formGroup.dialoutRingTime) {
        this.setFormGroup({
          dialoutRingTime: dialoutRingTime
        });
      }
    }
  }, {
    key: "checkIsAbleToCall",
    value: function checkIsAbleToCall() {
      if (this.dialoutStatus !== _dialoutStatus.dialoutStatuses.idle || this._deps.evCallMonitor.isOnCall || this._deps.evWorkingState.isPendingDisposition) {
        console.log('Unavailable to call, have a call or is PendingDisposition.');
        if (!this._deps.evCallMonitor.isOnCall) {
          this.setPhonedIdle();
        }
        this._deps.alert.danger({
          message: _enums.messageTypes.FAILED_TO_CALL,
          ttl: 0
        });
        return false;
      }
      return true;
    }
  }, {
    key: "setDialoutStatus",
    value: function setDialoutStatus(status) {
      this._deps.presence.setDialoutStatus(status);
    }
  }, {
    key: "setPhonedIdle",
    value: function setPhonedIdle() {
      this.setDialoutStatus(_dialoutStatus.dialoutStatuses.idle);
    }
  }, {
    key: "setPhonedDialing",
    value: function setPhonedDialing() {
      this.setDialoutStatus(_dialoutStatus.dialoutStatuses.dialing);
    }
  }, {
    key: "_checkAndParseNumber",
    value: function _checkAndParseNumber(phoneNumber) {
      try {
        (0, _checkCountryCode.checkCountryCode)(phoneNumber);
        return (0, _parseNumber.parseNumber)(phoneNumber);
      } catch (error) {
        switch (error.type) {
          case _enums.messageTypes.NO_SUPPORT_COUNTRY:
            this._deps.alert.danger({
              message: _enums.messageTypes.NO_SUPPORT_COUNTRY,
              ttl: 0
            });
            break;
          case _Call.callErrors.emergencyNumber:
            this._deps.alert.danger({
              message: _Call.callErrors.emergencyNumber
            });
            break;
          default:
            this._deps.alert.danger({
              message: _Call.callErrors.noToNumber
            });
            break;
        }
        throw error;
      }
    }
  }, {
    key: "_manualOutdial",
    value: function () {
      var _manualOutdial2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref) {
        var _ref$callerId, callerId, destination, _ref$ringTime, ringTime, _ref$queueId, queueId, _ref$countryId, countryId, offhookInitResult, getOffhookInitResult;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _ref$callerId = _ref.callerId, callerId = _ref$callerId === void 0 ? '' : _ref$callerId, destination = _ref.destination, _ref$ringTime = _ref.ringTime, ringTime = _ref$ringTime === void 0 ? DEFAULT_OUTBOUND_SETTING.dialoutRingTime : _ref$ringTime, _ref$queueId = _ref.queueId, queueId = _ref$queueId === void 0 ? '' : _ref$queueId, _ref$countryId = _ref.countryId, countryId = _ref$countryId === void 0 ? 'USA' : _ref$countryId;
                if (this.dialoutStatus !== _dialoutStatus.dialoutStatuses.dialing) {
                  this.setPhonedDialing();
                }
                _context2.prev = 2;
                if (this._deps.evSettings.isOffhook) {
                  _context2.next = 9;
                  break;
                }
                // bind init hook first, and then call offhookInit
                getOffhookInitResult = this._getOffhookInitResult();
                this._deps.evClient.offhookInit();
                _context2.next = 8;
                return getOffhookInitResult;
              case 8:
                offhookInitResult = _context2.sent;
              case 9:
                if (!(this._deps.evSettings.isOffhook || offhookInitResult && offhookInitResult.status === 'OK')) {
                  _context2.next = 15;
                  break;
                }
                console.log('manualOutdial~~');
                _context2.next = 13;
                return this._deps.evClient.manualOutdial({
                  callerId: callerId,
                  countryId: countryId,
                  destination: destination,
                  queueId: queueId,
                  ringTime: ringTime
                });
              case 13:
                _context2.next = 16;
                break;
              case 15:
                throw new Error("'offhookInit' exception error");
              case 16:
                _context2.next = 22;
                break;
              case 18:
                _context2.prev = 18;
                _context2.t0 = _context2["catch"](2);
                if (!this._deps.evSettings.isManualOffhook) {
                  this._deps.evClient.offhookTerm();
                }
                throw _context2.t0;
              case 22:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[2, 18]]);
      }));
      function _manualOutdial(_x2) {
        return _manualOutdial2.apply(this, arguments);
      }
      return _manualOutdial;
    }()
  }, {
    key: "_getOffhookInitResult",
    value: function _getOffhookInitResult() {
      var _this3 = this;
      return new Promise(function (resolve, reject) {
        _this3._deps.presence.evPresenceEvents.once(_callbackTypes.EvCallbackTypes.OFFHOOK_INIT, function (data) {
          if (data.status === 'OK') {
            resolve(data);
          } else {
            reject(data);
          }
        });
      });
    }
  }, {
    key: "ringTime",
    get: function get() {
      return this.dialoutRingTime;
    }
  }, {
    key: "queueId",
    get: function get() {
      return this.dialoutQueueId === '-1' ? null : this.dialoutQueueId;
    }
  }, {
    key: "callerId",
    get: function get() {
      return this.dialoutCallerId === '-1' ? null : this.dialoutCallerId;
    }
  }, {
    key: "countryId",
    get: function get() {
      return this.dialoutCountryId;
    }
  }, {
    key: "dialoutStatus",
    get: function get() {
      return this._deps.presence.dialoutStatus;
    }
  }, {
    key: "isDialing",
    get: function get() {
      return this._deps.presence.dialoutStatus === 'dialing';
    }
  }, {
    key: "_isTabActive",
    get: function get() {
      return !this._deps.tabManager || this._deps.tabManager.active;
    }
  }, {
    key: "currentCall",
    get: function get() {
      var call = this._deps.evCallMonitor.callsMapping[this.activityCallId];
      return this.activityCallId && call ? call : null;
    }
  }, {
    key: "isOnLoginSuccess",
    get: function get() {
      return this.ready && this._deps.evAuth.isEvLogged;
    }
  }, {
    key: "isInbound",
    get: function get() {
      var _this$currentCall;
      return ((_this$currentCall = this.currentCall) === null || _this$currentCall === void 0 ? void 0 : _this$currentCall.callType) === 'INBOUND';
    }
  }]);
  return EvCall;
}(_core.RcModuleV2), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "dialoutCallerId", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return DEFAULT_OUTBOUND_SETTING.dialoutCallerId;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "dialoutQueueId", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return DEFAULT_OUTBOUND_SETTING.dialoutQueueId;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "dialoutCountryId", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return DEFAULT_OUTBOUND_SETTING.dialoutCountryId;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "dialoutRingTime", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return DEFAULT_OUTBOUND_SETTING.dialoutRingTime;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "formGroup", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return DEFAULT_OUTBOUND_SETTING;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "currentCall", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "currentCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setFormGroup", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setFormGroup"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "saveForm", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "saveForm"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "resetOutBoundDialSetting", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "resetOutBoundDialSetting"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "isOnLoginSuccess", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "isOnLoginSuccess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "dialout", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "dialout"), _class2.prototype)), _class2)) || _class);
exports.EvCall = EvCall;
//# sourceMappingURL=EvCall.js.map
