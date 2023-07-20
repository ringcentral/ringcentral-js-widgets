"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
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
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
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
