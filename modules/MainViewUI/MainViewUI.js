"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MainViewUI = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.array.find-index");

require("core-js/modules/es6.array.map");

var _core = require("@ringcentral-integration/core");

var _di = require("ringcentral-integration/lib/di");

var _enums = require("../../enums");

var _time = require("../../lib/time");

var _dec, _class, _temp;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

var expiredWorkingTime = 60 * 1000;
var MainViewUI = (_dec = (0, _di.Module)({
  name: 'MainViewUI',
  deps: ['Locale', 'RouterInteraction', 'EvWorkingState', 'EvSettings', 'EvCallMonitor', 'EvAuth', 'Environment', {
    dep: 'MainViewUIOptions',
    optional: true
  }]
}), _dec(_class = (_temp = /*#__PURE__*/function (_RcUIModuleV) {
  _inherits(MainViewUI, _RcUIModuleV);

  var _super = _createSuper(MainViewUI);

  function MainViewUI(_ref) {
    var _this;

    var routerInteraction = _ref.routerInteraction,
        evWorkingState = _ref.evWorkingState,
        locale = _ref.locale,
        evSettings = _ref.evSettings,
        evAuth = _ref.evAuth,
        evCallMonitor = _ref.evCallMonitor,
        environment = _ref.environment;

    _classCallCheck(this, MainViewUI);

    _this = _super.call(this, {
      modules: {
        routerInteraction: routerInteraction,
        evWorkingState: evWorkingState,
        locale: locale,
        evSettings: evSettings,
        evAuth: evAuth,
        evCallMonitor: evCallMonitor,
        environment: environment
      }
    });
    _this.oldIntervalTime = void 0;
    _this.getAgentStates = (0, _core.createSelector)(function () {
      return _this._modules.evWorkingState.getAgentStates();
    }, function (agentStates) {
      return agentStates.map(function (state) {
        return _objectSpread(_objectSpread({}, state), {}, {
          color: _enums.agentStatesColors[state.agentState],
          title: state.agentAuxState
        });
      });
    });
    _this.getCurrentStateIndex = (0, _core.createSelector)(function () {
      return _this.getAgentStates();
    }, function () {
      return _this._modules.evWorkingState.getWorkingState();
    }, function (agentStates, workingState) {
      return agentStates.findIndex(function (state) {
        return state.agentAuxState === workingState.agentAuxState && state.agentState === workingState.agentState;
      });
    });
    _this.getStateText = (0, _core.createSelector)(function () {
      return _this._modules.evWorkingState.getWorkingState();
    }, function (workingState) {
      return workingState.agentAuxState || workingState.agentState;
    });
    _this.getIsTimingOneMinuteType = (0, _core.createSelector)(function () {
      return _this._modules.evWorkingState.getWorkingState();
    }, function (workingState) {
      return [_enums.agentStateTypes.away, _enums.agentStateTypes.onBreak, _enums.agentStateTypes.lunch].indexOf(workingState.agentState) > -1;
    });
    _this.getIsOffHookDisable = (0, _core.createSelector)(function () {
      return _this._modules.evSettings.isOffhooking;
    }, function () {
      return _this._modules.evCallMonitor.isOnCall;
    }, function () {
      return _this._modules.evAuth.agentPermissions.allowOffHook;
    }, function (isOffhooking, isOnCall, allowOffHook) {
      return isOffhooking || isOnCall || !allowOffHook;
    });
    return _this;
  }

  _createClass(MainViewUI, [{
    key: "getStateColor",
    value: function getStateColor(intervalTime) {
      if (this.getIsTimingOneMinuteType()) {
        var isOverOneMinute = this._checkOverTime(intervalTime);

        if (isOverOneMinute) {
          return 'red';
        }
      }

      return _enums.agentStatesColors[this._modules.evWorkingState.getWorkingState().agentState] || 'grey';
    }
  }, {
    key: "getTimerText",
    value: function getTimerText(intervalTime) {
      if (!this.getIsTimingOneMinuteType()) {
        return (0, _time.handleToClockTime)(intervalTime);
      }

      if (this._checkOverTime(intervalTime)) {
        return "-".concat((0, _time.handleToClockTime)(intervalTime - expiredWorkingTime));
      }

      var resetSecond = parseInt("".concat((expiredWorkingTime - intervalTime) / 1000), 10);
      return "00:".concat(String(resetSecond).length < 2 ? '0' : '').concat(resetSecond);
    }
  }, {
    key: "handleWithIntervalTime",
    value: function handleWithIntervalTime(intervalTime) {
      var isOverOneMinute = this._checkOverTime(intervalTime); // TODO think about when browser is block.


      if (this.oldIntervalTime < expiredWorkingTime && isOverOneMinute && this.getIsTimingOneMinuteType()) {
        this._modules.evWorkingState.alertOverBreakTime();
      }

      this.oldIntervalTime = intervalTime;
    }
  }, {
    key: "_checkOverTime",
    value: function _checkOverTime(intervalTime) {
      return intervalTime > expiredWorkingTime;
    }
  }, {
    key: "getUIProps",
    value: function getUIProps() {
      return {
        agentStates: this.getAgentStates(),
        agentState: this._modules.evWorkingState.agentState,
        currentStateIndex: this.getCurrentStateIndex(),
        currentPath: this._modules.routerInteraction.currentPath,
        stateText: this.getStateText(),
        time: this._modules.evWorkingState.time,
        disabled: this._modules.evWorkingState.isPendingDisposition,
        isOffHookDisable: this.getIsOffHookDisable(),
        offhookState: this._modules.evSettings.getOffhookState(),
        isOffhook: this._modules.evSettings.isOffhook,
        isOffhooking: this._modules.evSettings.isOffhooking,
        isWide: this._modules.environment.isWide,
        currentLocale: this._modules.locale.currentLocale
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions() {
      var _this2 = this;

      return {
        goTo: function goTo(path) {
          if (path) {
            _this2._modules.routerInteraction.push(path);
          }
        },
        changeWorkingState: function changeWorkingState(state) {
          return _this2._modules.evWorkingState.changeWorkingState(state);
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
          if (!_this2.getIsOffHookDisable()) {
            _this2._modules.evSettings.offHook();
          }
        }
      };
    }
  }]);

  return MainViewUI;
}(_core.RcUIModuleV2), _temp)) || _class);
exports.MainViewUI = MainViewUI;
//# sourceMappingURL=MainViewUI.js.map
