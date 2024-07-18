"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.find-index");
require("core-js/modules/es.array.map");
require("core-js/modules/es.object.get-own-property-descriptor");
require("core-js/modules/es.parse-int");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MainViewUI = void 0;
var _di = require("@ringcentral-integration/commons/lib/di");
var _core = require("@ringcentral-integration/core");
var _enums = require("../../enums");
var _getClockByTimestamp = require("../../lib/getClockByTimestamp");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2;
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
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
var MainViewUI = (_dec = (0, _di.Module)({
  name: 'MainViewUI',
  deps: ['Locale', 'RouterInteraction', 'EvWorkingState', 'EvSettings', 'EvCallMonitor', 'EvAuth', 'Environment', 'EvCall']
}), _dec2 = (0, _core.computed)(function (that) {
  return [that._deps.evWorkingState.agentStates];
}), _dec3 = (0, _core.computed)(function (that) {
  return [that.agentStates, that._deps.evWorkingState.workingState];
}), _dec4 = (0, _core.computed)(function (that) {
  return [that._deps.evWorkingState.workingState];
}), _dec5 = (0, _core.computed)(function (that) {
  return [that._deps.evWorkingState.workingState];
}), _dec6 = (0, _core.computed)(function (that) {
  return [that._deps.evSettings.isOffhooking, that._deps.evCallMonitor.isOnCall, that._deps.evCall.isDialing, that._deps.evAuth.agentPermissions.allowOffHook];
}), _dec7 = (0, _core.computed)(function (that) {
  return [that._deps.evAuth.agentPermissions.allowOffHook];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcUIModuleV) {
  _inherits(MainViewUI, _RcUIModuleV);
  var _super = _createSuper(MainViewUI);
  function MainViewUI(deps) {
    var _this;
    _classCallCheck(this, MainViewUI);
    _this = _super.call(this, {
      deps: deps
    });
    _this.oldIntervalTime = void 0;
    return _this;
  }
  _createClass(MainViewUI, [{
    key: "getStateColor",
    value: function getStateColor(intervalTime) {
      if (this.isBreak) {
        var isOverOneMinute = this._checkOverTime(intervalTime);
        if (isOverOneMinute) {
          return 'red';
        }
      }
      return _enums.agentStatesColors[this._deps.evWorkingState.workingState.agentState] || 'grey';
    }
  }, {
    key: "getTimerText",
    value: function getTimerText(intervalTime) {
      if (this._checkOverTime(intervalTime)) {
        return "-".concat((0, _getClockByTimestamp.getClockByTimestamp)(intervalTime - this.maxBreakTime));
      }
      if (this.isBreak && this.maxBreakTime > 0) {
        intervalTime = parseInt("".concat(this.maxBreakTime - intervalTime), 10);
        return (0, _getClockByTimestamp.getClockByTimestamp)(intervalTime, {
          useCeil: true
        });
      }
      return (0, _getClockByTimestamp.getClockByTimestamp)(intervalTime);
    }
  }, {
    key: "handleWithIntervalTime",
    value: function handleWithIntervalTime(intervalTime) {
      var isOverOneMinute = this._checkOverTime(intervalTime);
      // TODO: think about when browser is block.
      if (this.oldIntervalTime < this.maxBreakTime && isOverOneMinute && this.isBreak) {
        this._deps.evWorkingState.alertOverBreakTime();
      }
      this.oldIntervalTime = intervalTime;
    }
  }, {
    key: "_checkOverTime",
    value: function _checkOverTime(intervalTime) {
      return this.isBreak && this.maxBreakTime > 0 && intervalTime > this.maxBreakTime;
    }
  }, {
    key: "getUIProps",
    value: function getUIProps() {
      return {
        agentStates: this.agentStates,
        agentState: this._deps.evWorkingState.agentState,
        currentStateIndex: this.currentStateIndex,
        currentPath: this._deps.routerInteraction.currentPath,
        stateText: this.stateText,
        time: this._deps.evWorkingState.time,
        disabled: this._deps.evWorkingState.isPendingDisposition,
        isOffHookDisable: this.isOffHookDisable,
        offhookState: this._deps.evSettings.offhookState,
        isOffhook: this._deps.evSettings.isOffhook,
        isOffhooking: this._deps.evSettings.isOffhooking,
        isWide: this._deps.environment.isWide,
        hideOffHookBtn: this.hideOffHookBtn,
        currentLocale: this._deps.locale.currentLocale
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions() {
      var _this2 = this;
      return {
        goTo: function goTo(path) {
          if (path) {
            _this2._deps.routerInteraction.push(path);
          }
        },
        changeWorkingState: function changeWorkingState(state) {
          return _this2._deps.evWorkingState.changeWorkingState(state);
        },
        getTimerText: function getTimerText(intervalTime) {
          return _this2.getTimerText(intervalTime);
        },
        getStateColor: function getStateColor(intervalTime) {
          return _this2.getStateColor(intervalTime);
        },
        handleWithIntervalTime: function handleWithIntervalTime(intervalTime) {
          return _this2.handleWithIntervalTime(intervalTime);
        },
        offhook: function offhook() {
          if (!_this2.isOffHookDisable) {
            _this2._deps.evSettings.offHook();
          }
        }
      };
    }
  }, {
    key: "maxBreakTime",
    get: function get() {
      return this._deps.evWorkingState.maxBreakTime;
    }
  }, {
    key: "agentStates",
    get: function get() {
      return this._deps.evWorkingState.agentStates.map(function (state) {
        return _objectSpread(_objectSpread({}, state), {}, {
          color: _enums.agentStatesColors[state.agentState],
          title: state.agentAuxState
        });
      });
    }
  }, {
    key: "currentStateIndex",
    get: function get() {
      var workingState = this._deps.evWorkingState.workingState;
      return this.agentStates.findIndex(function (state) {
        return state.agentAuxState === workingState.agentAuxState && state.agentState === workingState.agentState;
      });
    }
  }, {
    key: "stateText",
    get: function get() {
      var workingState = this._deps.evWorkingState.workingState;
      return workingState.agentAuxState || workingState.agentState;
    }
  }, {
    key: "isBreak",
    get: function get() {
      var _this$_deps$evWorking = this._deps.evWorkingState,
        isOnBreakOrAway = _this$_deps$evWorking.isOnBreakOrAway,
        isOnLunch = _this$_deps$evWorking.isOnLunch;
      return isOnBreakOrAway || isOnLunch;
    }
  }, {
    key: "isOffHookDisable",
    get: function get() {
      return this._deps.evSettings.isOffhooking || this._deps.evCallMonitor.isOnCall || this._deps.evCall.isDialing || !this._deps.evAuth.agentPermissions.allowOffHook;
    }
  }, {
    key: "hideOffHookBtn",
    get: function get() {
      return !this._deps.evAuth.agentPermissions.allowOffHook;
    }
  }]);
  return MainViewUI;
}(_core.RcUIModuleV2), (_applyDecoratedDescriptor(_class2.prototype, "agentStates", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "agentStates"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "currentStateIndex", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "currentStateIndex"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "stateText", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "stateText"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "isBreak", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "isBreak"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "isOffHookDisable", [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "isOffHookDisable"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "hideOffHookBtn", [_dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "hideOffHookBtn"), _class2.prototype)), _class2)) || _class);
exports.MainViewUI = MainViewUI;
//# sourceMappingURL=MainViewUI.js.map
