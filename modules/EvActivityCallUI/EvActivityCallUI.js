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
require("core-js/modules/es.promise.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EvActivityCallUI = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.some.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.match.js");
require("core-js/modules/web.timers.js");
var _di = require("@ringcentral-integration/commons/lib/di");
var _core = require("@ringcentral-integration/core");
var _ramda = require("ramda");
var _enums = require("../../enums");
var _EvActivityCallUI2 = require("../../interfaces/EvActivityCallUI.interface");
var _i18n = _interopRequireDefault(require("./i18n"));
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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
var EvActivityCallUI = exports.EvActivityCallUI = (_dec = (0, _di.Module)({
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
}), _dec0 = (0, _core.computed)(function (that) {
  return [that.currentEvCall];
}), _dec1 = (0, _core.computed)(function (that) {
  return [that.currentEvCall];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_ref) {
  function EvActivityCallUI(deps) {
    var _this;
    _classCallCheck(this, EvActivityCallUI);
    _this = _callSuper(this, EvActivityCallUI, [{
      deps: deps,
      enableCache: true,
      storageKey: 'EvActivityCallUI'
    }]);
    _this.isFirstTimeHandled = false;
    /** Is the call pick up directly */
    _this.pickUpDirectly = true;
    _this._stopWatching = null;
    _initializerDefineProperty(_this, "validated", _descriptor, _this);
    _initializerDefineProperty(_this, "required", _descriptor2, _this);
    _initializerDefineProperty(_this, "disabled", _descriptor3, _this);
    _initializerDefineProperty(_this, "saveStatus", _descriptor4, _this);
    _initializerDefineProperty(_this, "scrollTo", _descriptor5, _this);
    _initializerDefineProperty(_this, "isKeypadOpen", _descriptor6, _this);
    _initializerDefineProperty(_this, "keypadValue", _descriptor7, _this);
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
  _inherits(EvActivityCallUI, _ref);
  return _createClass(EvActivityCallUI, [{
    key: "openAgentScriptTab",
    value: function openAgentScriptTab() {
      console.warn('this should be implement in extend module');
    }
  }, {
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
    key: "isDefaultRecord",
    get: function get() {
      var _this$agentRecording;
      return ((_this$agentRecording = this.agentRecording) === null || _this$agentRecording === void 0 ? void 0 : _this$agentRecording["default"]) === 'ON';
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
      var _onRecord = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              _context.p = 0;
              _context.n = 1;
              return this._deps.activeCallControl.record();
            case 1:
              _context.n = 3;
              break;
            case 2:
              _context.p = 2;
              _t = _context.v;
              console.error(_t === null || _t === void 0 ? void 0 : _t.message);
            case 3:
              return _context.a(2);
          }
        }, _callee, this, [[0, 2]]);
      }));
      function onRecord() {
        return _onRecord.apply(this, arguments);
      }
      return onRecord;
    }()
  }, {
    key: "onStopRecord",
    value: function () {
      var _onStopRecord = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        var _t2;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              _context2.p = 0;
              _context2.n = 1;
              return this._deps.activeCallControl.stopRecord();
            case 1:
              _context2.n = 3;
              break;
            case 2:
              _context2.p = 2;
              _t2 = _context2.v;
              console.error(_t2 === null || _t2 === void 0 ? void 0 : _t2.message);
            case 3:
              return _context2.a(2);
          }
        }, _callee2, this, [[0, 2]]);
      }));
      function onStopRecord() {
        return _onStopRecord.apply(this, arguments);
      }
      return onStopRecord;
    }()
  }, {
    key: "onPauseRecord",
    value: function () {
      var _onPauseRecord = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
        var _t3;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              _context3.p = 0;
              _context3.n = 1;
              return this._deps.activeCallControl.pauseRecord();
            case 1:
              this._sendTabManager(_enums.tabManagerEvents.RECORD_PAUSED);
              this._deps.alert.success({
                message: _enums.messageTypes.RECORD_PAUSED
              });
              _context3.n = 3;
              break;
            case 2:
              _context3.p = 2;
              _t3 = _context3.v;
              console.error(_t3 === null || _t3 === void 0 ? void 0 : _t3.message);
            case 3:
              return _context3.a(2);
          }
        }, _callee3, this, [[0, 2]]);
      }));
      function onPauseRecord() {
        return _onPauseRecord.apply(this, arguments);
      }
      return onPauseRecord;
    }()
  }, {
    key: "onRestartTimer",
    value: function () {
      var _onRestartTimer = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
        var _t4;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.p = _context4.n) {
            case 0:
              _context4.p = 0;
              _context4.n = 1;
              return this._deps.activeCallControl.pauseRecord();
            case 1:
              _context4.n = 3;
              break;
            case 2:
              _context4.p = 2;
              _t4 = _context4.v;
              console.error(_t4 === null || _t4 === void 0 ? void 0 : _t4.message);
            case 3:
              return _context4.a(2);
          }
        }, _callee4, this, [[0, 2]]);
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
      var _this$_deps$tabManage;
      return (_this$_deps$tabManage = this._deps.tabManager) === null || _this$_deps$tabManage === void 0 ? void 0 : _this$_deps$tabManage.enable;
    }
  }, {
    key: "currentEvCall",
    get: function get() {
      return this._deps.evCall.currentCall;
    }

    // TODO: should check with outbound call
  }, {
    key: "isInComingCall",
    get: function get() {
      return this._deps.evCall.isInbound && !this.pickUpDirectly;
      // currentSession.callStatus === telephonyStatuses.ringing
    }

    // transferCall and requeueCall are two parts of transfer menu
  }, {
    key: "allowTransfer",
    get: function get() {
      return this._deps.evTransferCall.allowTransferCall || this._deps.evRequeueCall.allowRequeueCall;
    }
  }, {
    key: "currentCallControlPermission",
    get: function get() {
      var _this$currentEvMainCa, _this$currentEvMainCa2, _this$agentRecording2, _this$agentRecording3;
      return {
        allowTransferCall: this._deps.evTransferCall.allowTransferCall,
        allowRequeueCall: this._deps.evRequeueCall.allowRequeueCall,
        allowHoldCall: (_this$currentEvMainCa = this.currentEvMainCall) === null || _this$currentEvMainCa === void 0 ? void 0 : _this$currentEvMainCa.allowHold,
        allowHangupCall: (_this$currentEvMainCa2 = this.currentEvMainCall) === null || _this$currentEvMainCa2 === void 0 ? void 0 : _this$currentEvMainCa2.allowHangup,
        allowRecordControl: (_this$agentRecording2 = this.agentRecording) === null || _this$agentRecording2 === void 0 ? void 0 : _this$agentRecording2.agentRecording,
        allowPauseRecord: typeof ((_this$agentRecording3 = this.agentRecording) === null || _this$agentRecording3 === void 0 ? void 0 : _this$agentRecording3.pause) === 'number'
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
    }

    // TODO: add `callDisposition` in CallLog
  }, {
    key: "activityCallLog",
    get: function get() {
      var _this3 = this;
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
        agentId = currentCall.agentId;

      // TODO: confirm about  dialDest or dnis?
      var fromNumber = callType === 'OUTBOUND' ? dnis : ani;
      // TODO: confirm about  dialDest or dnis?
      var toNumber = callType === 'OUTBOUND' ? ani : dnis;
      var _ref2 = callDisposition || {},
        dispositionId = _ref2.dispositionId,
        notes = _ref2.notes;
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
              _this3.changeFormStatus({
                validated: {
                  notes: !!value
                }
              });
            } else {
              _this3.changeFormStatus({
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
            _this3.changeFormStatus({
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
      var _this$_deps$evCallMon = this._deps.evCallMonitor,
        callIds = _this$_deps$evCallMon.callIds,
        otherCallIds = _this$_deps$evCallMon.otherCallIds,
        callsMapping = _this$_deps$evCallMon.callsMapping;
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
      var _this4 = this;
      var isMultipleCalls = this.isMultipleCalls,
        callList = this.callList,
        currentEvMainCall = this.currentEvMainCall;
      if (isMultipleCalls) {
        return !!callList.find(function (call) {
          return !(call.session.agentId === _this4._deps.evAuth.agentId) && !!call.isHold;
        });
      }
      return currentEvMainCall === null || currentEvMainCall === void 0 ? void 0 : currentEvMainCall.isHold;
    }
  }, {
    key: "agentScriptData",
    get: function get() {
      var _this5 = this;
      var call = this.currentEvCall;
      var agentScriptData = null;
      if (this._deps.environment.isWide && this._deps.evAgentScript.getIsAgentScript(call)) {
        agentScriptData = {
          onClick: function onClick() {
            return _this5.openAgentScriptTab();
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
    key: "changeSavingStatus",
    value: function changeSavingStatus(status) {
      this.saveStatus = status;
    }
  }, {
    key: "changeFormStatus",
    value: function changeFormStatus(_ref3) {
      var validated = _ref3.validated,
        required = _ref3.required,
        disabled = _ref3.disabled;
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
      this.saveStatus = _EvActivityCallUI2.saveStatus.submit;
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
    value: function onUpdateCallLog(_ref4, id) {
      var task = _ref4.task;
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
      var _this$_deps$evCallMon2 = this._deps.evCallMonitor.callsMapping[this.callId].gate,
        gateGroupId = _this$_deps$evCallMon2.gateGroupId,
        gateId = _this$_deps$evCallMon2.gateId;
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
          initSaveStatus: _EvActivityCallUI2.saveStatus.submit,
          backUrl: '/dialer',
          tabManagerEventSuccess: _enums.tabManagerEvents.CALL_DISPOSITION_SUCCESS,
          logTypesEventSuccess: _enums.logTypes.CALL_DISPOSITION_SUCCESS,
          logTypesEventFailure: _enums.logTypes.CALL_DISPOSITION_FAILURE
        },
        callLogCreate: {
          initSaveStatus: _EvActivityCallUI2.callLogMethods.create,
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
      var _disposeCall = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
        var evAgentScript, call;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              this._deps.evCallDisposition.disposeCall(this.callId);
              evAgentScript = this._deps.evAgentScript;
              call = this.currentEvCall; // evAgentScript.isDisplayAgentScript &&
              if (call.scriptId) {
                evAgentScript.setCurrentCallScript(null);
                evAgentScript.saveScriptResult(call);
              }
            case 1:
              return _context5.a(2);
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
      var _this6 = this;
      return (0, _ramda.keys)(this.validated).some(function (key) {
        return !_this6.validated[key];
      });
    }
  }, {
    key: "_submitData",
    value: function () {
      var _submitData2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(id) {
        var saveFields, _this$getPageRole2, tabManagerEventSuccess, _e$error, _e$error2, _this$getPageRole3, logTypesEventFailure, initSaveStatus, _t5;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.p = _context6.n) {
            case 0:
              _context6.p = 0;
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
                _context6.n = 1;
                break;
              }
              return _context6.a(2);
            case 1:
              this.changeSavingStatus(_EvActivityCallUI2.saveStatus.saving);
              _context6.n = 2;
              return this.disposeCall();
            case 2:
              _this$getPageRole2 = this.getPageRole(), tabManagerEventSuccess = _this$getPageRole2.tabManagerEventSuccess;
              this._sendTabManager(tabManagerEventSuccess);
              this._dispositionSuccess();
              _context6.n = 4;
              break;
            case 3:
              _context6.p = 3;
              _t5 = _context6.v;
              _this$getPageRole3 = this.getPageRole(), logTypesEventFailure = _this$getPageRole3.logTypesEventFailure, initSaveStatus = _this$getPageRole3.initSaveStatus;
              this._deps.alert.danger({
                message: logTypesEventFailure,
                ttl: 0,
                payload: (_t5 === null || _t5 === void 0 ? void 0 : (_e$error = _t5.error) === null || _e$error === void 0 ? void 0 : _e$error.status) === false ? _t5 === null || _t5 === void 0 ? void 0 : (_e$error2 = _t5.error) === null || _e$error2 === void 0 ? void 0 : _e$error2.message : undefined
              });
              this.changeSavingStatus(initSaveStatus);
              console.error(_t5);
              throw new Error("Failed to save log.");
            case 4:
              return _context6.a(2);
          }
        }, _callee6, this, [[0, 3]]);
      }));
      function _submitData(_x) {
        return _submitData2.apply(this, arguments);
      }
      return _submitData;
    }()
  }, {
    key: "_dispositionSuccess",
    value: function _dispositionSuccess() {
      var _this7 = this;
      this.changeSavingStatus(_EvActivityCallUI2.saveStatus.saved);
      var _this$getPageRole4 = this.getPageRole(),
        logTypesEventSuccess = _this$getPageRole4.logTypesEventSuccess;
      this._deps.alert.success({
        message: logTypesEventSuccess
      });
      // delay for animation with loading ui.
      setTimeout(function () {
        return _this7.goBack();
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
      var _this$_deps$tabManage2;
      (_this$_deps$tabManage2 = this._deps.tabManager) === null || _this$_deps$tabManage2 === void 0 ? void 0 : _this$_deps$tabManage2.send(event, value);
    }
  }, {
    key: "onHangup",
    value: function () {
      var _onHangup = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              _context7.n = 1;
              return this._deps.activeCallControl.hangUp(this.currentEvCall.session.sessionId);
            case 1:
              this.changeSavingStatus(_EvActivityCallUI2.saveStatus.submit);
            case 2:
              return _context7.a(2);
          }
        }, _callee7, this);
      }));
      function onHangup() {
        return _onHangup.apply(this, arguments);
      }
      return onHangup;
    }()
  }, {
    key: "agentRecording",
    get: function get() {
      var _this$currentEvMainCa4;
      return (_this$currentEvMainCa4 = this.currentEvMainCall) === null || _this$currentEvMainCa4 === void 0 ? void 0 : _this$currentEvMainCa4.agentRecording;
    }
  }, {
    key: "getUIProps",
    value: function getUIProps(_ref5) {
      var _this$activityCallLog, _this$activityCallLog2, _this$agentRecording4;
      var id = _ref5.id;
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
        disableDispose: this.disableLinks || this.saveStatus === _EvActivityCallUI2.saveStatus.saving,
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
        recordPauseCount: (_this$agentRecording4 = this.agentRecording) === null || _this$agentRecording4 === void 0 ? void 0 : _this$agentRecording4.pause,
        timeStamp: this._deps.activeCallControl.timeStamp,
        isKeypadOpen: this.isKeypadOpen,
        keypadValue: this.keypadValue
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions() {
      var _this8 = this;
      return {
        goBack: function goBack() {
          return _this8.goBack();
        },
        onMute: function onMute() {
          return _this8._deps.activeCallControl.mute();
        },
        onUnmute: function onUnmute() {
          return _this8._deps.activeCallControl.unmute();
        },
        onHangup: function onHangup() {
          return _this8.onHangup();
        },
        onReject: function onReject() {
          return _this8._deps.activeCallControl.reject();
        },
        onHold: function onHold() {
          return _this8._onHoldOrUnHold('hold');
        },
        onUnHold: function onUnHold() {
          return _this8._onHoldOrUnHold('unhold');
        },
        onActive: function onActive() {
          return _this8.goToActivityCallListPage();
        },
        onRecord: function onRecord() {
          return _this8.onRecord();
        },
        onStopRecord: function onStopRecord() {
          return _this8.onStopRecord();
        },
        onPauseRecord: function onPauseRecord() {
          return _this8.onPauseRecord();
        },
        onRestartTimer: function onRestartTimer() {
          return _this8.onRestartTimer();
        },
        onResumeRecord: function onResumeRecord() {
          return _this8.onResumeRecord();
        },
        setKeypadIsOpen: function setKeypadIsOpen(status) {
          return _this8.setKeypadIsOpen(status);
        },
        setKeypadValue: function setKeypadValue(value) {
          return _this8.setKeypadValue(value);
        },
        onUpdateCallLog: function onUpdateCallLog(data, id) {
          return _this8.onUpdateCallLog(data, id);
        },
        disposeCall: function () {
          var _disposeCall2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8() {
            return _regenerator().w(function (_context8) {
              while (1) switch (_context8.n) {
                case 0:
                  if (!(_this8.saveStatus === _EvActivityCallUI2.saveStatus.saved)) {
                    _context8.n = 1;
                    break;
                  }
                  return _context8.a(2, _this8.goBack());
                case 1:
                  _context8.n = 2;
                  return _this8._submitData(_this8.callId);
                case 2:
                  return _context8.a(2);
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
          _this8._deps.alert.info({
            message: _enums.messageTypes["COPY_".concat(name, "_SUCCESS")],
            action: ''
          });
        },
        goToRequeueCallPage: function goToRequeueCallPage() {
          return _this8.goToRequeueCallPage();
        },
        goToTransferCallPage: function goToTransferCallPage(transferType) {
          return _this8.goToTransferCallPage(transferType);
        }
      };
    }
  }]);
}(_core.RcUIModuleV2), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "validated", [_core.storage, _core.state], {
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
    return _EvActivityCallUI2.saveStatus.submit;
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
}), _applyDecoratedDescriptor(_class2.prototype, "setKeypadValue", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setKeypadValue"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setKeypadIsOpen", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setKeypadIsOpen"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "resetKeypadStatus", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "resetKeypadStatus"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "currentCallControlPermission", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "currentCallControlPermission"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "dispositionPickList", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "dispositionPickList"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "activityCallLog", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "activityCallLog"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "callStatus", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "callStatus"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "currentEvMainCall", [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "currentEvMainCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "callList", [_dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "callList"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "isMultipleCalls", [_dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "isMultipleCalls"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "isOnHold", [_dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "isOnHold"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "agentScriptData", [_dec0], Object.getOwnPropertyDescriptor(_class2.prototype, "agentScriptData"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "ivrAlertData", [_dec1], Object.getOwnPropertyDescriptor(_class2.prototype, "ivrAlertData"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "changeSavingStatus", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "changeSavingStatus"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "changeFormStatus", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "changeFormStatus"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setScrollTo", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setScrollTo"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "reset", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "reset"), _class2.prototype), _class2)) || _class);
//# sourceMappingURL=EvActivityCallUI.js.map
