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
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallViewState = void 0;
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.match.js");
var _nextCore = require("@ringcentral-integration/next-core");
var _rxjs = require("rxjs");
var _CallHistory = require("../../../services/CallHistory");
var _CallLogTasks = require("../../../services/CallLogTasks");
var _CallMonitor = require("../../../services/CallMonitor");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;
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
var DEFAULT_STATE = {
  keypadToNumber: '',
  transferToNumber: '',
  transferRecipients: [],
  replayMessage: '',
  forwardToNumber: '',
  forwardRecipients: []
};
function extractIdFromHistoryRoute(route) {
  var match = route.match(/\/history\/(.+)/);
  return match ? match[1] : null;
}
var CallViewState = exports.CallViewState = (_dec = (0, _nextCore.injectable)({
  name: 'CallViewState'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 4);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _nextCore.RouterPlugin === "undefined" ? Object : _nextCore.RouterPlugin, typeof _nextCore.PortManager === "undefined" ? Object : _nextCore.PortManager, typeof _CallMonitor.CallMonitor === "undefined" ? Object : _CallMonitor.CallMonitor, typeof _CallHistory.CallHistory === "undefined" ? Object : _CallHistory.CallHistory, typeof _CallLogTasks.CallLogTasks === "undefined" ? Object : _CallLogTasks.CallLogTasks]), _dec5 = (0, _nextCore.dynamic)('SmartNotes'), _dec6 = Reflect.metadata("design:type", typeof SmartNotes === "undefined" ? Object : SmartNotes), _dec7 = Reflect.metadata("design:type", typeof CallViewType === "undefined" ? Object : CallViewType), _dec8 = Reflect.metadata("design:type", Function), _dec9 = Reflect.metadata("design:paramtypes", [typeof CallViewType === "undefined" ? Object : CallViewType]), _dec0 = (0, _nextCore.delegate)('server'), _dec1 = Reflect.metadata("design:type", Function), _dec10 = Reflect.metadata("design:paramtypes", [typeof CallViewType === "undefined" ? Object : CallViewType]), _dec11 = Reflect.metadata("design:type", typeof Record === "undefined" ? Object : Record), _dec12 = Reflect.metadata("design:type", Function), _dec13 = Reflect.metadata("design:paramtypes", [String, typeof Partial === "undefined" ? Object : Partial]), _dec14 = (0, _nextCore.delegate)('server'), _dec15 = Reflect.metadata("design:type", Function), _dec16 = Reflect.metadata("design:paramtypes", [String, typeof Partial === "undefined" ? Object : Partial]), _dec17 = Reflect.metadata("design:type", Function), _dec18 = Reflect.metadata("design:paramtypes", [String]), _dec19 = Reflect.metadata("design:type", String), _dec20 = Reflect.metadata("design:type", Function), _dec21 = Reflect.metadata("design:paramtypes", [String]), _dec22 = Reflect.metadata("design:type", Function), _dec23 = Reflect.metadata("design:paramtypes", [String]), _dec24 = (0, _nextCore.delegate)('server'), _dec25 = Reflect.metadata("design:type", Function), _dec26 = Reflect.metadata("design:paramtypes", [String]), _dec27 = Reflect.metadata("design:type", Function), _dec28 = Reflect.metadata("design:paramtypes", []), _dec29 = Reflect.metadata("design:type", Function), _dec30 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (_class2 = /*#__PURE__*/function (_RcModule) {
  function CallViewState(_router, _portManager, _callMonitor, _callHistory, _callLogTasks) {
    var _this;
    _classCallCheck(this, CallViewState);
    _this = _callSuper(this, CallViewState);
    _this._router = _router;
    _this._portManager = _portManager;
    _this._callMonitor = _callMonitor;
    _this._callHistory = _callHistory;
    _this._callLogTasks = _callLogTasks;
    _initializerDefineProperty(_this, "_smartNotes", _descriptor, _this);
    _initializerDefineProperty(_this, "view", _descriptor2, _this);
    _initializerDefineProperty(_this, "states", _descriptor3, _this);
    _initializerDefineProperty(_this, "postCallViewTelephonySessionId", _descriptor4, _this);
    _this.callDetailCallLog$ = (0, _nextCore.fromWatchValue)(_this, function () {
      return _this.callDetailCallLog;
    });
    _this.postCallCallLog$ = (0, _nextCore.fromWatchValue)(_this, function () {
      return _this.postCallCallLog;
    });
    if (_this._portManager.shared) {
      _this._portManager.onServer(function () {
        _this.bindClearFormListener();
      });
    } else {
      _this.bindClearFormListener();
    }
    return _this;
  }
  _inherits(CallViewState, _RcModule);
  return _createClass(CallViewState, [{
    key: "_setView",
    value: function _setView(val) {
      this.view = val;
    }
  }, {
    key: "setView",
    value: function () {
      var _setView2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(val) {
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              this._setView(val);
            case 1:
              return _context.a(2);
          }
        }, _callee, this);
      }));
      function setView(_x) {
        return _setView2.apply(this, arguments);
      }
      return setView;
    }()
  }, {
    key: "_setCallViewState",
    value: function _setCallViewState(telephonySessionId, state) {
      this.states[telephonySessionId] = _objectSpread(_objectSpread({}, this.states[telephonySessionId] || DEFAULT_STATE), state);
    }
  }, {
    key: "setCallViewState",
    value: function () {
      var _setCallViewState2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(telephonySessionId, state) {
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              this._setCallViewState(telephonySessionId, state);
            case 1:
              return _context2.a(2);
          }
        }, _callee2, this);
      }));
      function setCallViewState(_x2, _x3) {
        return _setCallViewState2.apply(this, arguments);
      }
      return setCallViewState;
    }()
  }, {
    key: "_clearCallViewState",
    value: function _clearCallViewState(telephonySessionId) {
      delete this.states[telephonySessionId];
    }
  }, {
    key: "getCallViewState",
    value: function getCallViewState(telephonySessionId) {
      return this.states[telephonySessionId] || DEFAULT_STATE;
    }
  }, {
    key: "setPostCallViewTelephonySessionId",
    value: function setPostCallViewTelephonySessionId(val) {
      this.postCallViewTelephonySessionId = val;
    }
  }, {
    key: "_setPostCallView",
    value: function _setPostCallView(telephonySessionId) {
      this.setPostCallViewTelephonySessionId(telephonySessionId);
      if (telephonySessionId) {
        this._setView('postCall');
      }
    }
  }, {
    key: "setPostCallView",
    value: function () {
      var _setPostCallView2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(telephonySessionId) {
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              this._setPostCallView(telephonySessionId);
            case 1:
              return _context3.a(2);
          }
        }, _callee3, this);
      }));
      function setPostCallView(_x4) {
        return _setPostCallView2.apply(this, arguments);
      }
      return setPostCallView;
    }()
  }, {
    key: "inCallDetailRouteTelephonySessionId",
    value: function inCallDetailRouteTelephonySessionId() {
      return extractIdFromHistoryRoute(this._router.currentPath);
    }

    /**
     * the call log history data render at the call detail page
     */
  }, {
    key: "callDetailCallLog",
    get: function get() {
      var telephonySessionId = this.inCallDetailRouteTelephonySessionId();
      return this.getHistoryWithExtraLog(telephonySessionId);
    }
  }, {
    key: "postCallCallLog",
    get:
    /**
     * the post call data render at the post call view
     */
    function get() {
      return this.getHistoryWithExtraLog(this.postCallViewTelephonySessionId);
    }
  }, {
    key: "bindClearFormListener",
    value: function bindClearFormListener() {
      var _this2 = this;
      // when call ended, clear the call view state
      this._callMonitor.addListener('CallEnded').pipe((0, _rxjs.tap)(function (call) {
        _this2._clearCallViewState(call.telephonySessionId);
      }), _nextCore.takeUntilAppDestroy).subscribe();
    }
  }, {
    key: "getExtraLogData",
    value: function getExtraLogData(sessionId, telephonySessionId) {
      var callLogTasks = this._callLogTasks;
      var smartNotes = this._smartNotes;
      var extraLogData = callLogTasks || smartNotes ? {
        isLogged: callLogTasks === null || callLogTasks === void 0 ? void 0 : callLogTasks.loggedMap[sessionId],
        callSelectionInfo: callLogTasks === null || callLogTasks === void 0 ? void 0 : callLogTasks.callSelectionMap[sessionId],
        hasSmartNote: smartNotes === null || smartNotes === void 0 ? void 0 : smartNotes.aiNotedCallMapping[telephonySessionId]
      } : undefined;
      return extraLogData;
    }
  }, {
    key: "getHistoryWithExtraLog",
    value: function getHistoryWithExtraLog(telephonySessionId) {
      if (!telephonySessionId) return undefined;
      var callLog = this._callHistory.getHistoryByTelephonySessionId(telephonySessionId);
      if (!callLog) return undefined;
      var sessionId = callLog.sessionId;
      var extraLogData = this.getExtraLogData(sessionId, telephonySessionId);
      return _objectSpread(_objectSpread({}, callLog), extraLogData);
    }
  }, {
    key: "getCallWithExtraLog",
    value: function getCallWithExtraLog(sessionId) {
      if (!sessionId) return undefined;
      var call = this._callMonitor.getCallBySessionId(sessionId);
      if (!call) return undefined;
      var telephonySessionId = call.telephonySessionId;
      var extraLogData = this.getExtraLogData(sessionId, telephonySessionId);
      return _objectSpread(_objectSpread({}, call), extraLogData);
    }
  }]);
}(_nextCore.RcModule), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_smartNotes", [_dec5, _dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "view", [_nextCore.state, _dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 'hidden';
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_setView", [_nextCore.action, _dec8, _dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "_setView"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setView", [_dec0, _dec1, _dec10], Object.getOwnPropertyDescriptor(_class2.prototype, "setView"), _class2.prototype), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "states", [_nextCore.state, _dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_setCallViewState", [_nextCore.action, _dec12, _dec13], Object.getOwnPropertyDescriptor(_class2.prototype, "_setCallViewState"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setCallViewState", [_dec14, _dec15, _dec16], Object.getOwnPropertyDescriptor(_class2.prototype, "setCallViewState"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_clearCallViewState", [_nextCore.action, _dec17, _dec18], Object.getOwnPropertyDescriptor(_class2.prototype, "_clearCallViewState"), _class2.prototype), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "postCallViewTelephonySessionId", [_nextCore.state, _dec19], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setPostCallViewTelephonySessionId", [_nextCore.action, _dec20, _dec21], Object.getOwnPropertyDescriptor(_class2.prototype, "setPostCallViewTelephonySessionId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setPostCallView", [_nextCore.action, _dec22, _dec23], Object.getOwnPropertyDescriptor(_class2.prototype, "_setPostCallView"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setPostCallView", [_dec24, _dec25, _dec26], Object.getOwnPropertyDescriptor(_class2.prototype, "setPostCallView"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "callDetailCallLog", [_nextCore.computed, _dec27, _dec28], Object.getOwnPropertyDescriptor(_class2.prototype, "callDetailCallLog"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "postCallCallLog", [_nextCore.computed, _dec29, _dec30], Object.getOwnPropertyDescriptor(_class2.prototype, "postCallCallLog"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class);
//# sourceMappingURL=CallViewState.js.map
