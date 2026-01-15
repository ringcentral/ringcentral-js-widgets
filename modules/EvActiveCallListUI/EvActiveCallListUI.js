"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EvActiveCallListUI = void 0;
require("core-js/modules/es.object.get-own-property-descriptor.js");
var _di = require("@ringcentral-integration/commons/lib/di");
var _core = require("@ringcentral-integration/core");
var _dec, _dec2, _class, _class2;
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
var EvActiveCallListUI = exports.EvActiveCallListUI = (_dec = (0, _di.Module)({
  name: 'EvActiveCallListUI',
  deps: ['Locale', 'RouterInteraction', 'EvCall', 'ActiveCallControl', 'EvCallMonitor', 'EvIntegratedSoftphone', 'EvAuth', 'EvClient', 'EvAgentSession', {
    dep: 'EvActiveCallListUIOptions',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (that) {
  return [that.callId, that._deps.evCallMonitor.callIds, that._deps.evCallMonitor.otherCallIds, that._deps.evCallMonitor.callsMapping, that._deps.evAuth.agentId];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_ref) {
  function EvActiveCallListUI(deps) {
    _classCallCheck(this, EvActiveCallListUI);
    return _callSuper(this, EvActiveCallListUI, [{
      deps: deps
    }]);
  }
  _inherits(EvActiveCallListUI, _ref);
  return _createClass(EvActiveCallListUI, [{
    key: "callId",
    get: function get() {
      return this._deps.evCall.activityCallId;
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
  }, {
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
    value: function getUIProps(_ref2) {
      var _this$_deps$evAuth$ag;
      var id = _ref2.id;
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
  }]);
}(_core.RcUIModuleV2), _applyDecoratedDescriptor(_class2.prototype, "callList", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "callList"), _class2.prototype), _class2)) || _class);
//# sourceMappingURL=EvActiveCallListUI.js.map
