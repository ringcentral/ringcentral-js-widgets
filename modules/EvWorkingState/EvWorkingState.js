"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.find");
require("core-js/modules/es.array.index-of");
require("core-js/modules/es.date.now");
require("core-js/modules/es.date.to-string");
require("core-js/modules/es.function.name");
require("core-js/modules/es.object.get-own-property-descriptor");
require("core-js/modules/es.parse-int");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EvWorkingState = void 0;
require("regenerator-runtime/runtime");
var _di = require("@ringcentral-integration/commons/lib/di");
var _core = require("@ringcentral-integration/core");
var _enums = require("../../enums");
var _callbackTypes = require("../../lib/EvClient/enums/callbackTypes");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _descriptor3;
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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
var PendingDisposition = {
  // TODO: here seems need i18n
  rank: '0',
  agentState: 'PENDING-DISPOSITION',
  agentAuxState: 'Pending Disposition'
};
var EvWorkingState = (_dec = (0, _di.Module)({
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
  _inherits(EvWorkingState, _RcModuleV);
  var _super = _createSuper(EvWorkingState);
  function EvWorkingState(deps) {
    var _this;
    _classCallCheck(this, EvWorkingState);
    _this = _super.call(this, {
      deps: deps,
      enableCache: true,
      storageKey: 'EvWorkingState'
    });
    _initializerDefineProperty(_this, "time", _descriptor, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "agentState", _descriptor2, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "isPendingDisposition", _descriptor3, _assertThisInitialized(_this));
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
  _createClass(EvWorkingState, [{
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
      var _onStateChange = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var event;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(this.ready && this.tabManagerEnabled && this._deps.tabManager.ready)) {
                  _context.next = 9;
                  break;
                }
                event = this._deps.tabManager.event;
                if (!event) {
                  _context.next = 9;
                  break;
                }
                _context.t0 = event.name;
                _context.next = _context.t0 === _enums.tabManagerEvents.RESET_WORKING_STATE ? 6 : 8;
                break;
              case 6:
                this.resetWorkingState();
                return _context.abrupt("break", 9);
              case 8:
                return _context.abrupt("break", 9);
              case 9:
              case "end":
                return _context.stop();
            }
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
  }, {
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
  }]);
  return EvWorkingState;
}(_core.RcModuleV2), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "time", [_core.storage, _core.state], {
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
}), _applyDecoratedDescriptor(_class2.prototype, "maxBreakTime", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "maxBreakTime"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "isOnBreakOrAway", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "isOnBreakOrAway"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "isOnLunch", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "isOnLunch"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "workingState", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "workingState"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "agentStates", [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "agentStates"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "workingAgentState", [_dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "workingAgentState"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setAgentState", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setAgentState"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setIsPendingDisposition", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setIsPendingDisposition"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "resetWorkingState", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "resetWorkingState"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setTime", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setTime"), _class2.prototype)), _class2)) || _class);
exports.EvWorkingState = EvWorkingState;
//# sourceMappingURL=EvWorkingState.js.map
