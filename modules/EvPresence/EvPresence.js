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
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EvPresence = void 0;
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
var _di = require("@ringcentral-integration/commons/lib/di");
var _core = require("@ringcentral-integration/core");
var _events = require("events");
var _enums = require("../../enums");
var _callbackTypes = require("../../lib/EvClient/enums/callbackTypes");
var _trackEvents = require("../../lib/trackEvents");
var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;
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
var EvPresence = exports.EvPresence = (_dec = (0, _di.Module)({
  name: 'EvPresence',
  deps: ['EvSubscription', 'EvCallDataSource', 'EvClient', 'Storage', 'Beforeunload', 'Alert', {
    dep: 'PresenceOptions',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (that) {
  return [that.callIds, that.callsMapping];
}), _dec3 = (0, _core.computed)(function (that) {
  return [that.otherCallIds, that.callsMapping];
}), _dec4 = (0, _core.computed)(function (that) {
  return [that.callLogsIds, that.callsMapping];
}), _dec5 = (0, _core.track)(function (that, call) {
  return function (analytics) {
    var recordingSetting = that.getRecordingSettings(call.agentRecording);
    return [call.callType === 'INBOUND' ? _trackEvents.trackEvents.callInboundCallConnected : _trackEvents.trackEvents.outboundCallConnected, {
      recordingSetting: recordingSetting,
      voiceConnection: analytics.loginType,
      isOffhook: that.isOffhook,
      isOffhooking: that.isOffhooking
    }];
  };
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  function EvPresence(deps) {
    var _this;
    _classCallCheck(this, EvPresence);
    _this = _callSuper(this, EvPresence, [{
      deps: deps,
      enableCache: true,
      storageKey: 'EvPresence'
    }]);
    _this.beforeunloadHandler = function () {
      return false;
    };
    _this.eventEmitter = _this._deps.evCallDataSource.eventEmitter;
    _this.evPresenceEvents = new _events.EventEmitter();
    _this.showOffHookInitError = true;
    _initializerDefineProperty(_this, "currentCallUii", _descriptor, _this);
    _initializerDefineProperty(_this, "isOffhook", _descriptor2, _this);
    _initializerDefineProperty(_this, "isManualOffhook", _descriptor3, _this);
    _initializerDefineProperty(_this, "isOffhooking", _descriptor4, _this);
    _initializerDefineProperty(_this, "dialoutStatus", _descriptor5, _this);
    return _this;
  }
  _inherits(EvPresence, _RcModuleV);
  return _createClass(EvPresence, [{
    key: "callIds",
    get: function get() {
      return this._deps.evCallDataSource.callIds;
    }
  }, {
    key: "otherCallIds",
    get: function get() {
      return this._deps.evCallDataSource.otherCallIds;
    }
  }, {
    key: "callLogsIds",
    get: function get() {
      return this._deps.evCallDataSource.callLogsIds;
    }
  }, {
    key: "callsMapping",
    get: function get() {
      return this._deps.evCallDataSource.callsMapping;
    }
  }, {
    key: "rawCallsMapping",
    get: function get() {
      return this._deps.evCallDataSource.rawCallsMapping;
    }
  }, {
    key: "setCurrentCallUii",
    value: function setCurrentCallUii(uii) {
      this.currentCallUii = uii;
    }
  }, {
    key: "calls",
    get: function get() {
      var _this2 = this;
      return this.callIds.map(function (id) {
        return _this2.callsMapping[id];
      }).filter(function (call) {
        return !!call;
      });
    }
  }, {
    key: "otherCalls",
    get: function get() {
      var _this3 = this;
      return this.otherCallIds.map(function (id) {
        return _this3.callsMapping[id];
      });
    }
  }, {
    key: "callLogs",
    get: function get() {
      var _this4 = this;
      return this.callLogsIds.map(function (id) {
        return _this4.callsMapping[id];
      });
    }
  }, {
    key: "setDialoutStatus",
    value: function setDialoutStatus(status) {
      if (this.dialoutStatus !== status) {
        this.dialoutStatus = status;
      }
    }
  }, {
    key: "setOffhookInit",
    value: function setOffhookInit() {
      this.isOffhooking = false;
      this.isOffhook = true;
      this._checkBeforeunload();
    }
  }, {
    key: "setOffhookTerm",
    value: function setOffhookTerm() {
      this.isOffhooking = false;
      this.isOffhook = false;
      this.isManualOffhook = false;
      this._checkBeforeunload();
    }
  }, {
    key: "setIsManualOffhook",
    value: function setIsManualOffhook(isManualOffhook) {
      this.isManualOffhook = isManualOffhook;
    }
  }, {
    key: "setOffhook",
    value: function setOffhook(status) {
      this.isOffhook = status;
      this._checkBeforeunload();
    }
  }, {
    key: "setOffhooking",
    value: function setOffhooking(offhooking) {
      this.isOffhooking = offhooking;
    }
  }, {
    key: "addNewCall",
    value: function addNewCall(call) {
      this._deps.evCallDataSource.addNewCall(call);
    }
  }, {
    key: "addNewSession",
    value: function addNewSession(session) {
      this._deps.evCallDataSource.addNewSession(session);
    }
  }, {
    key: "dropSession",
    value: function dropSession(_dropSession) {
      this._deps.evCallDataSource.dropSession(_dropSession);
    }
  }, {
    key: "removeEndedCall",
    value: function removeEndedCall(endedCall) {
      this._deps.evCallDataSource.removeEndedCall(endedCall);
    }
  }, {
    key: "setCallHoldStatus",
    value: function setCallHoldStatus(res) {
      this._deps.evCallDataSource.setCallHoldStatus(res);
    }
  }, {
    key: "clearCalls",
    value: function clearCalls() {
      this._deps.evCallDataSource.clearCalls();
    }
  }, {
    key: "onInitOnce",
    value: function onInitOnce() {
      this._bindSubscription();
    }
  }, {
    key: "getRecordingSettings",
    value: function getRecordingSettings(record) {
      var recordingSetting = '';
      if (record.agentRecording) {
        if (record["default"] === 'ON') {
          if (record.pause) {
            recordingSetting = 'Yes - Record Call (Agent Pause)';
          } else {
            recordingSetting = 'Agent Triggered (Default: Record)';
          }
        } else {
          recordingSetting = "Agent Triggered (Default: Don't Record)";
        }
      } else if (!record.agentRecording) {
        if (record["default"] === 'ON') {
          recordingSetting = 'Yes - Record Full Call';
        } else {
          recordingSetting = "No - Don't Record Call";
        }
      }
      return recordingSetting;
    }
  }, {
    key: "_bindSubscription",
    value: function _bindSubscription() {
      var _this5 = this;
      this._deps.evSubscription.subscribe(_callbackTypes.EvCallbackTypes.OFFHOOK_INIT, function (data) {
        _this5.evPresenceEvents.emit(_callbackTypes.EvCallbackTypes.OFFHOOK_INIT, data);
        if (data.status === 'OK') {
          _this5.setOffhookInit();
        } else {
          // when that is reject integrated softphone, we not alert error
          if (_this5.showOffHookInitError) {
            _this5._deps.alert.danger({
              message: _enums.messageTypes.OFFHOOK_INIT_ERROR
            });
          }
          _this5.setOffhookTerm();
          _this5.showOffHookInitError = true;
        }
      }).subscribe(_callbackTypes.EvCallbackTypes.EARLY_UII, function (data) {
        if (data.status === 'OK') {
          _this5.setCurrentCallUii(data.uii);
        }
      }).subscribe(_callbackTypes.EvCallbackTypes.OFFHOOK_TERM, function (data) {
        if (data.status === 'OK') {
          _this5.setOffhookTerm();
        } else {
          _this5._deps.alert.danger({
            message: _enums.messageTypes.OFFHOOK_TERM_ERROR
          });
          console.error(data);
        }
      }).subscribe(_callbackTypes.EvCallbackTypes.ADD_SESSION, function (data) {
        if (data.status === 'OK') {
          _this5.addNewSession(data);
        } else {
          _this5._deps.alert.danger({
            message: _enums.messageTypes.ADD_SESSION_ERROR
          });
        }
      }).subscribe(_callbackTypes.EvCallbackTypes.DROP_SESSION, function (data) {
        if (data.status === 'OK') {
          _this5.dropSession(data);
        } else {
          _this5._deps.alert.danger({
            message: _enums.messageTypes.DROP_SESSION_ERROR
          });
        }
      }).subscribe(_callbackTypes.EvCallbackTypes.HOLD, function (data) {
        if (data.status === 'OK') {
          _this5.setCallHoldStatus(data);
        } else {
          _this5._deps.alert.danger({
            message: _enums.messageTypes.HOLD_ERROR
          });
        }
      }).subscribe(_callbackTypes.EvCallbackTypes.NEW_CALL, function (data) {
        _this5.addNewCall(data);
      }).subscribe(_callbackTypes.EvCallbackTypes.END_CALL, function (data) {
        var id = _this5._deps.evClient.encodeUii(data);
        if (!_this5.callsMapping[id]) return;
        if (!_this5.isManualOffhook) {
          _this5._deps.evClient.offhookTerm();
        }
        _this5.removeEndedCall(data);
      });
    }
  }, {
    key: "_checkBeforeunload",
    value: function _checkBeforeunload() {
      if (this.isOffhook) {
        this._deps.beforeunload.add(this.beforeunloadHandler);
      } else {
        this._deps.beforeunload.remove(this.beforeunloadHandler);
      }
    }
  }, {
    key: "isCallConnected",
    get: function get() {
      return this.dialoutStatus === _enums.dialoutStatuses.callConnected;
    }
  }]);
}(_core.RcModuleV2), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "currentCallUii", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "isOffhook", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "isManualOffhook", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "isOffhooking", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "dialoutStatus", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return _enums.dialoutStatuses.idle;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setCurrentCallUii", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setCurrentCallUii"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "calls", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "calls"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "otherCalls", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "otherCalls"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "callLogs", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "callLogs"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setDialoutStatus", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setDialoutStatus"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setOffhookInit", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setOffhookInit"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setOffhookTerm", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setOffhookTerm"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setIsManualOffhook", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setIsManualOffhook"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setOffhook", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setOffhook"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setOffhooking", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setOffhooking"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "addNewCall", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "addNewCall"), _class2.prototype), _class2)) || _class);
//# sourceMappingURL=EvPresence.js.map
