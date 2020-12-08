"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EvWorkingState = void 0;

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.function.name");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.date.now");

var _core = require("@ringcentral-integration/core");

var _di = require("ringcentral-integration/lib/di");

var _enums = require("../../enums");

var _callbackTypes = require("../../lib/EvClient/enums/callbackTypes");

var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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
  return [that.agentState, that.isPendingDisposition];
}), _dec3 = (0, _core.computed)(function (that) {
  return [that.agentConfig, that.isPendingDisposition, that.agentConfig.agentSettings.availableAgentStates];
}), _dec4 = (0, _core.computed)(function (that) {
  return [that.agentStates];
}), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_RcModuleV) {
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
}(_core.RcModuleV2), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "time", [_core.storage, _core.state], {
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
}), _applyDecoratedDescriptor(_class2.prototype, "workingState", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "workingState"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "agentStates", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "agentStates"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "workingAgentState", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "workingAgentState"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setAgentState", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setAgentState"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setIsPendingDisposition", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setIsPendingDisposition"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "resetWorkingState", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "resetWorkingState"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setTime", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setTime"), _class2.prototype)), _class2)) || _class);
exports.EvWorkingState = EvWorkingState;
//# sourceMappingURL=EvWorkingState.js.map
