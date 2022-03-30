"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.slice");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EvActiveCallListUI = void 0;

var _di = require("@ringcentral-integration/commons/lib/di");

var _core = require("@ringcentral-integration/core");

var _dec, _dec2, _class, _class2;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

var EvActiveCallListUI = (_dec = (0, _di.Module)({
  name: 'EvActiveCallListUI',
  deps: ['Locale', 'RouterInteraction', 'EvCall', 'ActiveCallControl', 'EvCallMonitor', 'EvIntegratedSoftphone', 'EvAuth', 'EvClient', 'EvAgentSession', {
    dep: 'EvActiveCallListUIOptions',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (that) {
  return [that.callId, that._deps.evCallMonitor.callIds, that._deps.evCallMonitor.otherCallIds, that._deps.evCallMonitor.callsMapping, that._deps.evAuth.agentId];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcUIModuleV) {
  _inherits(EvActiveCallListUI, _RcUIModuleV);

  var _super = _createSuper(EvActiveCallListUI);

  _createClass(EvActiveCallListUI, [{
    key: "callId",
    get: function get() {
      return this._deps.evCall.activityCallId;
    }
  }]);

  function EvActiveCallListUI(deps) {
    _classCallCheck(this, EvActiveCallListUI);

    return _super.call(this, {
      deps: deps
    });
  }

  _createClass(EvActiveCallListUI, [{
    key: "onHangup",
    value: function onHangup(call) {
      this._deps.activeCallControl.hangupSession({
        sessionId: call.session.sessionId
      });
    }
  }, {
    key: "onHold",
    value: function onHold(call) {
      this._deps.activeCallControl.holdSession({
        sessionId: call.session.sessionId,
        state: true
      });
    }
  }, {
    key: "onUnHold",
    value: function onUnHold(call) {
      this._deps.activeCallControl.holdSession({
        sessionId: call.session.sessionId,
        state: false
      });
    }
  }, {
    key: "getUIProps",
    value: function getUIProps(_ref) {
      var _this$_deps$evAuth$ag;

      var id = _ref.id;
      this._deps.evCall.activityCallId = id;
      return {
        currentLocale: this._deps.locale.currentLocale,
        callList: this.callList,
        isOnMute: this._deps.evIntegratedSoftphone.muteActive,
        showMuteButton: this._deps.evAgentSession.isIntegratedSoftphone,
        userName: (_this$_deps$evAuth$ag = this._deps.evAuth.agentSettings) === null || _this$_deps$evAuth$ag === void 0 ? void 0 : _this$_deps$evAuth$ag.username,
        isInbound: this._deps.evCall.isInbound
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions() {
      var _this = this;

      return {
        goBack: function goBack() {
          _this._deps.routerInteraction.goBack();
        },
        onHangup: function onHangup(call) {
          return _this.onHangup(call);
        },
        onHold: function onHold(call) {
          return _this.onHold(call);
        },
        onUnHold: function onUnHold(call) {
          return _this.onUnHold(call);
        },
        onMute: function onMute() {
          return _this._deps.activeCallControl.mute();
        },
        onUnmute: function onUnmute() {
          return _this._deps.activeCallControl.unmute();
        }
      };
    }
  }, {
    key: "callList",
    get: function get() {
      var _callList$, _callList$$session;

      var _this$_deps$evCallMon = this._deps.evCallMonitor,
          callIds = _this$_deps$evCallMon.callIds,
          otherCallIds = _this$_deps$evCallMon.otherCallIds,
          callsMapping = _this$_deps$evCallMon.callsMapping;
      var agentId = this._deps.evAuth.agentId;

      var callList = this._deps.evCallMonitor.getActiveCallList(callIds, otherCallIds, callsMapping, this.callId);

      if (((_callList$ = callList[1]) === null || _callList$ === void 0 ? void 0 : (_callList$$session = _callList$.session) === null || _callList$$session === void 0 ? void 0 : _callList$$session.agentId) !== agentId) {
        console.error('agent id is wrong');
      }

      return callList;
    }
  }]);

  return EvActiveCallListUI;
}(_core.RcUIModuleV2), (_applyDecoratedDescriptor(_class2.prototype, "callList", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "callList"), _class2.prototype)), _class2)) || _class);
exports.EvActiveCallListUI = EvActiveCallListUI;
//# sourceMappingURL=EvActiveCallListUI.js.map
