"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EvCall = void 0;

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

require("regenerator-runtime/runtime");

require("core-js/modules/es6.number.constructor");

require("core-js/modules/es6.number.is-nan");

var _core = require("@ringcentral-integration/core");

var _di = require("ringcentral-integration/lib/di");

var _callErrors = _interopRequireDefault(require("ringcentral-integration/modules/Call/callErrors"));

var _enums = require("../../enums");

var _dialoutStatus = require("../../enums/dialoutStatus");

var _checkCountryCode = require("../../lib/checkCountryCode");

var _callbackTypes = require("../../lib/EvClient/enums/callbackTypes");

var _parseNumber = require("../../lib/parseNumber");

var _trackEvents = require("../../lib/trackEvents");

var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _temp;

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
  }]
}), _dec2 = (0, _core.computed)(function (that) {
  return [that.activityCallId, that._deps.evCallMonitor.callsMapping];
}), _dec3 = (0, _core.computed)(function (that) {
  return [that._deps.evAuth.isEvLogged, that.ready];
}), _dec4 = (0, _core.track)(_trackEvents.trackEvents.outbound), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_RcModuleV) {
  _inherits(EvCall, _RcModuleV);

  var _super = _createSuper(EvCall);

  /** this id is get from route, set from EvActivityCallUI */
  function EvCall(deps) {
    var _this;

    _classCallCheck(this, EvCall);

    _this = _super.call(this, {
      deps: deps,
      enableCache: true,
      storageKey: 'EvCall'
    });
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
      var defaultRingtime = parseInt(this._deps.evAuth.outboundManualDefaultRingtime, 10);

      if (!Number.isNaN(defaultRingtime)) {
        this.formGroup.dialoutRingTime = defaultRingtime;
        this.dialoutRingTime = defaultRingtime;
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
        if (data.leadState === 'BUSY') {
          // TCPA_SAFE_LEAD_STATE -> BUSY
          // TODO alert message info about busy call.
          if (!_this2._deps.evSettings.isManualOffhook && _this2._isTabActive) {
            _this2._deps.evClient.offhookTerm();
          }

          _this2.setPhonedIdle();
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
                if (!this._deps.evAgentSession.isIntegratedSoftphone) {
                  _context.next = 17;
                  break;
                }

                integratedSoftphone = this._deps.evIntegratedSoftphone;
                _context.prev = 2;

                if (!integratedSoftphone.sipRegisterSuccess) {
                  _context.next = 8;
                  break;
                }

                _context.next = 6;
                return integratedSoftphone.askAudioPermission(false);

              case 6:
                _context.next = 12;
                break;

              case 8:
                _context.next = 10;
                return this._deps.evAgentSession.configureAgent();

              case 10:
                _context.next = 12;
                return integratedSoftphone.onceRegistered();

              case 12:
                _context.next = 17;
                break;

              case 14:
                _context.prev = 14;
                _context.t0 = _context["catch"](2);
                return _context.abrupt("return");

              case 17:
                _context.prev = 17;
                destination = this._checkAndParseNumber(phoneNumber);
                _context.next = 21;
                return this._manualOutdial({
                  destination: destination,
                  callerId: this.callerId,
                  countryId: this.countryId,
                  queueId: this.queueId,
                  ringTime: this.ringTime
                });

              case 21:
                _context.next = 26;
                break;

              case 23:
                _context.prev = 23;
                _context.t1 = _context["catch"](17);
                this.setPhonedIdle();

              case 26:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[2, 14], [17, 23]]);
      }));

      function dialout(_x) {
        return _dialout.apply(this, arguments);
      }

      return dialout;
    }()
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

          default:
            this._deps.alert.danger({
              message: _callErrors["default"].noToNumber
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
}(_core.RcModuleV2), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "dialoutCallerId", [_core.storage, _core.state], {
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
