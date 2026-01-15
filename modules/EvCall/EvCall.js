"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EvCall = void 0;
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.number.is-nan.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.parse-int.js");
require("core-js/modules/es.promise.js");
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
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
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
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
var DEFAULT_OUTBOUND_SETTING = {
  dialoutCallerId: '-1',
  dialoutQueueId: '-1',
  dialoutCountryId: 'USA',
  dialoutRingTime: 30
};
var EvCall = exports.EvCall = (_dec = (0, _di.Module)({
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
  function EvCall(deps) {
    var _this;
    _classCallCheck(this, EvCall);
    _this = _callSuper(this, EvCall, [{
      deps: deps,
      enableCache: true,
      storageKey: 'EvCall'
    }]);
    /** this id is get from route, set from EvActivityCallUI */
    _this.activityCallId = void 0;
    _this.ringTimeLimit = {
      min: 20,
      max: 120
    };
    _initializerDefineProperty(_this, "dialoutCallerId", _descriptor, _this);
    _initializerDefineProperty(_this, "dialoutQueueId", _descriptor2, _this);
    _initializerDefineProperty(_this, "dialoutCountryId", _descriptor3, _this);
    _initializerDefineProperty(_this, "dialoutRingTime", _descriptor4, _this);
    _initializerDefineProperty(_this, "formGroup", _descriptor5, _this);
    return _this;
  }
  _inherits(EvCall, _RcModuleV);
  return _createClass(EvCall, [{
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
    key: "isOnLoginSuccess",
    get: function get() {
      return this.ready && this._deps.evAuth.isEvLogged;
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
      var _dialout = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(phoneNumber) {
        var integratedSoftphone, destination, _t, _t2;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              this._deps.presence.setCurrentCallUii('');
              if (!this._deps.evAgentSession.isIntegratedSoftphone) {
                _context.n = 7;
                break;
              }
              integratedSoftphone = this._deps.evIntegratedSoftphone;
              _context.p = 1;
              if (!integratedSoftphone.sipRegisterSuccess) {
                _context.n = 3;
                break;
              }
              _context.n = 2;
              return integratedSoftphone.askAudioPermission(false);
            case 2:
              _context.n = 5;
              break;
            case 3:
              _context.n = 4;
              return this._deps.evAgentSession.configureAgent();
            case 4:
              _context.n = 5;
              return integratedSoftphone.onceRegistered();
            case 5:
              _context.n = 7;
              break;
            case 6:
              _context.p = 6;
              _t = _context.v;
              return _context.a(2);
            case 7:
              _context.p = 7;
              destination = this._checkAndParseNumber(phoneNumber);
              _context.n = 8;
              return this._manualOutdial({
                destination: destination,
                callerId: this.callerId,
                countryId: this.countryId,
                queueId: this.queueId,
                ringTime: this.ringTime
              });
            case 8:
              _context.n = 10;
              break;
            case 9:
              _context.p = 9;
              _t2 = _context.v;
              this.setPhonedIdle();
            case 10:
              return _context.a(2);
          }
        }, _callee, this, [[7, 9], [1, 6]]);
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
      var _manualOutdial2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(_ref) {
        var _ref$callerId, callerId, destination, _ref$ringTime, ringTime, _ref$queueId, queueId, _ref$countryId, countryId, offhookInitResult, getOffhookInitResult, _t3;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              _ref$callerId = _ref.callerId, callerId = _ref$callerId === void 0 ? '' : _ref$callerId, destination = _ref.destination, _ref$ringTime = _ref.ringTime, ringTime = _ref$ringTime === void 0 ? DEFAULT_OUTBOUND_SETTING.dialoutRingTime : _ref$ringTime, _ref$queueId = _ref.queueId, queueId = _ref$queueId === void 0 ? '' : _ref$queueId, _ref$countryId = _ref.countryId, countryId = _ref$countryId === void 0 ? 'USA' : _ref$countryId;
              if (this.dialoutStatus !== _dialoutStatus.dialoutStatuses.dialing) {
                this.setPhonedDialing();
              }
              _context2.p = 1;
              if (this._deps.evSettings.isOffhook) {
                _context2.n = 3;
                break;
              }
              // bind init hook first, and then call offhookInit
              getOffhookInitResult = this._getOffhookInitResult();
              this._deps.evClient.offhookInit();
              _context2.n = 2;
              return getOffhookInitResult;
            case 2:
              offhookInitResult = _context2.v;
            case 3:
              if (!(this._deps.evSettings.isOffhook || offhookInitResult && offhookInitResult.status === 'OK')) {
                _context2.n = 5;
                break;
              }
              console.log('manualOutdial~~');
              _context2.n = 4;
              return this._deps.evClient.manualOutdial({
                callerId: callerId,
                countryId: countryId,
                destination: destination,
                queueId: queueId,
                ringTime: ringTime
              });
            case 4:
              _context2.n = 6;
              break;
            case 5:
              throw new Error("'offhookInit' exception error");
            case 6:
              _context2.n = 8;
              break;
            case 7:
              _context2.p = 7;
              _t3 = _context2.v;
              if (!this._deps.evSettings.isManualOffhook) {
                this._deps.evClient.offhookTerm();
              }
              throw _t3;
            case 8:
              return _context2.a(2);
          }
        }, _callee2, this, [[1, 7]]);
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
    key: "isInbound",
    get: function get() {
      var _this$currentCall;
      return ((_this$currentCall = this.currentCall) === null || _this$currentCall === void 0 ? void 0 : _this$currentCall.callType) === 'INBOUND';
    }
  }]);
}(_core.RcModuleV2), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "dialoutCallerId", [_core.storage, _core.state], {
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
}), _applyDecoratedDescriptor(_class2.prototype, "currentCall", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "currentCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setFormGroup", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setFormGroup"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "saveForm", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "saveForm"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "resetOutBoundDialSetting", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "resetOutBoundDialSetting"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "isOnLoginSuccess", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "isOnLoginSuccess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "dialout", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "dialout"), _class2.prototype), _class2)) || _class);
//# sourceMappingURL=EvCall.js.map
