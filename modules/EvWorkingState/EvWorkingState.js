"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.date.to-string.js");
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
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EvWorkingState = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.date.now.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.parse-int.js");
var _di = require("@ringcentral-integration/commons/lib/di");
var _core = require("@ringcentral-integration/core");
var _enums = require("../../enums");
var _callbackTypes = require("../../lib/EvClient/enums/callbackTypes");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _descriptor3;
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
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
var PendingDisposition = {
  // TODO: here seems need i18n
  rank: '0',
  agentState: 'PENDING-DISPOSITION',
  agentAuxState: 'Pending Disposition'
};
var EvWorkingState = exports.EvWorkingState = (_dec = (0, _di.Module)({
  name: 'EvWorkingState',
  deps: ['Auth', 'EvAuth', 'EvSubscription', 'EvClient', 'Presence', 'EvCallMonitor', 'Alert', 'Storage', 'EvAgentSession', 'TabManager', {
    dep: 'EvWorkingStateOptions',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (that) {
  return [that.agentConfig.agentSettings, that.workingState.agentState];
}), _dec3 = (0, _core.computed)(function (that) {
  return [that.workingState.agentState];
}), _dec4 = (0, _core.computed)(function (that) {
  return [that.workingState.agentState];
}), _dec5 = (0, _core.computed)(function (that) {
  return [that.agentState, that.isPendingDisposition];
}), _dec6 = (0, _core.computed)(function (that) {
  return [that.agentConfig, that.isPendingDisposition, that.agentConfig.agentSettings.availableAgentStates];
}), _dec7 = (0, _core.computed)(function (that) {
  return [that.agentStates];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  function EvWorkingState(deps) {
    var _this;
    _classCallCheck(this, EvWorkingState);
    _this = _callSuper(this, EvWorkingState, [{
      deps: deps,
      enableCache: true,
      storageKey: 'EvWorkingState'
    }]);
    _initializerDefineProperty(_this, "time", _descriptor, _this);
    _initializerDefineProperty(_this, "agentState", _descriptor2, _this);
    _initializerDefineProperty(_this, "isPendingDisposition", _descriptor3, _this);
    _this._deps.evAgentSession.onTriggerConfig(function () {
      var _agentConfig$agentSet;
      var agentConfig = _this._deps.evAuth.agent.agentConfig;
      if (agentConfig === null || agentConfig === void 0 ? void 0 : (_agentConfig$agentSet = agentConfig.agentSettings) === null || _agentConfig$agentSet === void 0 ? void 0 : _agentConfig$agentSet.initLoginState) {
        // if that tab is not activity, that wi
        _this._deps.evClient.setAgentState(agentConfig.agentSettings.initLoginState, agentConfig.agentSettings.initLoginStateLabel);
      }
      if (_this.tabManagerEnabled) {
        _this._deps.tabManager.send(_enums.tabManagerEvents.RESET_WORKING_STATE);
      }
      _this.resetWorkingState();
    });
    return _this;
  }
  _inherits(EvWorkingState, _RcModuleV);
  return _createClass(EvWorkingState, [{
    key: "tabManagerEnabled",
    get: function get() {
      var _this$_deps$tabManage;
      return (_this$_deps$tabManage = this._deps.tabManager) === null || _this$_deps$tabManage === void 0 ? void 0 : _this$_deps$tabManage.enable;
    }
  }, {
    key: "agentConfig",
    get: function get() {
      return this._deps.evAuth.agent.agentConfig;
    }
  }, {
    key: "maxBreakTime",
    get: function get() {
      if (this.isOnBreakOrAway) {
        return parseInt(this.agentConfig.agentSettings.maxBreakTime || '0', 10) * 60 * 1000;
      }
      if (this.isOnLunch) {
        return parseInt(this.agentConfig.agentSettings.maxLunchTime || '0', 10) * 60 * 1000;
      }
      return 1000 * 60;
    }
  }, {
    key: "isOnBreakOrAway",
    get: function get() {
      return [_enums.agentStateTypes.away, _enums.agentStateTypes.onBreak].indexOf(this.workingState.agentState) > -1;
    }
  }, {
    key: "isOnLunch",
    get: function get() {
      return this.workingState.agentState === _enums.agentStateTypes.lunch;
    }
  }, {
    key: "workingState",
    get: function get() {
      return this.isPendingDisposition ? PendingDisposition : _objectSpread(_objectSpread({}, this.agentState), {}, {
        agentAuxState: this.agentState.agentAuxState || _enums.defaultAgentStateTexts[this.agentState.agentState]
      });
    }
  }, {
    key: "agentStates",
    get: function get() {
      var availableAgentStates = this.agentConfig.agentSettings.availableAgentStates;
      var agentStates = this.isPendingDisposition ? [PendingDisposition].concat(_toConsumableArray(availableAgentStates)) : availableAgentStates;
      return this.agentConfig ? agentStates : [];
    }
  }, {
    key: "workingAgentState",
    get: function get() {
      return this.agentStates.find(function (state) {
        return state.agentState === _enums.agentStateTypes.working;
      });
    }
  }, {
    key: "setAgentState",
    value: function setAgentState(agentState) {
      this.agentState = agentState;
      if (agentState.agentState !== _enums.agentStateTypes.breakAfterCall) {
        this.time = Date.now();
      }
    }
  }, {
    key: "setIsPendingDisposition",
    value: function setIsPendingDisposition(isPendingDisposition) {
      this.isPendingDisposition = isPendingDisposition;
    }
  }, {
    key: "resetWorkingState",
    value: function resetWorkingState() {
      this.time = Date.now();
      this.isPendingDisposition = false;
    }
  }, {
    key: "setTime",
    value: function setTime(time) {
      this.time = time;
    }
  }, {
    key: "onInitOnce",
    value: function onInitOnce() {
      var _this2 = this;
      this._deps.evCallMonitor.onCallEnded(function () {
        _this2.setIsPendingDisposition(true);
      });
      this._deps.evSubscription.subscribe(_callbackTypes.EvCallbackTypes.AGENT_STATE, function (_ref) {
        var currentAuxState = _ref.currentAuxState,
          currentState = _ref.currentState;
        if (_this2.agentState.agentState !== currentState || _this2.agentState.agentAuxState !== currentAuxState) {
          _this2.setAgentState({
            agentState: currentState,
            agentAuxState: currentAuxState
          });
        }
      });
    }
  }, {
    key: "onStateChange",
    value: function () {
      var _onStateChange = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var event, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              if (!(this.ready && this.tabManagerEnabled && this._deps.tabManager.ready)) {
                _context.n = 3;
                break;
              }
              event = this._deps.tabManager.event;
              if (!event) {
                _context.n = 3;
                break;
              }
              _t = event.name;
              _context.n = _t === _enums.tabManagerEvents.RESET_WORKING_STATE ? 1 : 2;
              break;
            case 1:
              this.resetWorkingState();
              return _context.a(3, 3);
            case 2:
              return _context.a(3, 3);
            case 3:
              return _context.a(2);
          }
        }, _callee, this);
      }));
      function onStateChange() {
        return _onStateChange.apply(this, arguments);
      }
      return onStateChange;
    }()
  }, {
    key: "changeWorkingState",
    value: function changeWorkingState(_ref2) {
      var agentState = _ref2.agentState,
        agentAuxState = _ref2.agentAuxState;
      var isOnCall = [_enums.agentStateTypes.transition, _enums.agentStateTypes.engaged].indexOf(this.agentState.agentState) > -1 || this._deps.presence.calls.length > 0;
      if (isOnCall && agentState !== _enums.agentStateTypes.onBreak) {
        return this._deps.alert.danger({
          message: _enums.messageTypes.INVALID_STATE_CHANGE,
          allowDuplicates: false,
          ttl: 0
        });
      }
      this._deps.evClient.setAgentState(agentState, agentAuxState);
    }
  }, {
    key: "setWorkingStateWorking",
    value: function setWorkingStateWorking() {
      var state = this.workingAgentState;
      if (state) {
        this.changeWorkingState(state);
      }
    }
  }, {
    key: "alertOverBreakTime",
    value: function alertOverBreakTime() {
      this._deps.alert.danger({
        message: _enums.messageTypes.OVER_BREAK_TIME,
        allowDuplicates: false,
        ttl: 0
      });
    }
  }]);
}(_core.RcModuleV2), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "time", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return Date.now();
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "agentState", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {
      agentState: _enums.agentStateTypes.available,
      agentAuxState: 'Available'
    };
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "isPendingDisposition", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "maxBreakTime", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "maxBreakTime"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "isOnBreakOrAway", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "isOnBreakOrAway"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "isOnLunch", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "isOnLunch"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "workingState", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "workingState"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "agentStates", [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "agentStates"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "workingAgentState", [_dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "workingAgentState"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setAgentState", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setAgentState"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setIsPendingDisposition", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setIsPendingDisposition"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "resetWorkingState", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "resetWorkingState"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setTime", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setTime"), _class2.prototype), _class2)) || _class);
//# sourceMappingURL=EvWorkingState.js.map
