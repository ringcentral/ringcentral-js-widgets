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
exports.EvPresence = void 0;

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.array.filter");

var _events = require("events");

var _di = require("@ringcentral-integration/commons/lib/di");

var _core = require("@ringcentral-integration/core");

var _enums = require("../../enums");

var _callbackTypes = require("../../lib/EvClient/enums/callbackTypes");

var _trackEvents = require("../../lib/trackEvents");

var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

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

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var EvPresence = (_dec = (0, _di.Module)({
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
  _inherits(EvPresence, _RcModuleV);

  var _super = _createSuper(EvPresence);

  _createClass(EvPresence, [{
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
  }]);

  function EvPresence(deps) {
    var _this;

    _classCallCheck(this, EvPresence);

    _this = _super.call(this, {
      deps: deps,
      enableCache: true,
      storageKey: 'EvPresence'
    });

    _this.beforeunloadHandler = function () {
      return false;
    };

    _this.eventEmitter = _this._deps.evCallDataSource.eventEmitter;
    _this.evPresenceEvents = new _events.EventEmitter();
    _this.showOffHookInitError = true;

    _initializerDefineProperty(_this, "currentCallUii", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "isOffhook", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "isManualOffhook", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "isOffhooking", _descriptor4, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "dialoutStatus", _descriptor5, _assertThisInitialized(_this));

    return _this;
  }

  _createClass(EvPresence, [{
    key: "setCurrentCallUii",
    value: function setCurrentCallUii(uii) {
      this.currentCallUii = uii;
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
      var _this2 = this;

      this._deps.evSubscription.subscribe(_callbackTypes.EvCallbackTypes.OFFHOOK_INIT, function (data) {
        _this2.evPresenceEvents.emit(_callbackTypes.EvCallbackTypes.OFFHOOK_INIT, data);

        if (data.status === 'OK') {
          _this2.setOffhookInit();
        } else {
          // when that is reject integrated softphone, we not alert error
          if (_this2.showOffHookInitError) {
            _this2._deps.alert.danger({
              message: _enums.messageTypes.OFFHOOK_INIT_ERROR
            });
          }

          _this2.setOffhookTerm();

          _this2.showOffHookInitError = true;
        }
      }).subscribe(_callbackTypes.EvCallbackTypes.EARLY_UII, function (data) {
        if (data.status === 'OK') {
          _this2.setCurrentCallUii(data.uii);
        }
      }).subscribe(_callbackTypes.EvCallbackTypes.OFFHOOK_TERM, function (data) {
        if (data.status === 'OK') {
          _this2.setOffhookTerm();
        } else {
          _this2._deps.alert.danger({
            message: _enums.messageTypes.OFFHOOK_TERM_ERROR
          });

          console.error(data);
        }
      }).subscribe(_callbackTypes.EvCallbackTypes.ADD_SESSION, function (data) {
        if (data.status === 'OK') {
          _this2.addNewSession(data);
        } else {
          _this2._deps.alert.danger({
            message: _enums.messageTypes.ADD_SESSION_ERROR
          });
        }
      }).subscribe(_callbackTypes.EvCallbackTypes.DROP_SESSION, function (data) {
        if (data.status === 'OK') {
          _this2.dropSession(data);
        } else {
          _this2._deps.alert.danger({
            message: _enums.messageTypes.DROP_SESSION_ERROR
          });
        }
      }).subscribe(_callbackTypes.EvCallbackTypes.HOLD, function (data) {
        if (data.status === 'OK') {
          _this2.setCallHoldStatus(data);
        } else {
          _this2._deps.alert.danger({
            message: _enums.messageTypes.HOLD_ERROR
          });
        }
      }).subscribe(_callbackTypes.EvCallbackTypes.NEW_CALL, function (data) {
        _this2.addNewCall(data);
      }).subscribe(_callbackTypes.EvCallbackTypes.END_CALL, function (data) {
        var id = _this2._deps.evClient.encodeUii(data);

        if (!_this2.callsMapping[id]) return;

        if (!_this2.isManualOffhook) {
          _this2._deps.evClient.offhookTerm();
        }

        _this2.removeEndedCall(data);
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
    key: "calls",
    get: function get() {
      var _this3 = this;

      return this.callIds.map(function (id) {
        return _this3.callsMapping[id];
      }).filter(function (call) {
        return !!call;
      });
    }
  }, {
    key: "otherCalls",
    get: function get() {
      var _this4 = this;

      return this.otherCallIds.map(function (id) {
        return _this4.callsMapping[id];
      });
    }
  }, {
    key: "callLogs",
    get: function get() {
      var _this5 = this;

      return this.callLogsIds.map(function (id) {
        return _this5.callsMapping[id];
      });
    }
  }, {
    key: "isCallConnected",
    get: function get() {
      return this.dialoutStatus === _enums.dialoutStatuses.callConnected;
    }
  }]);

  return EvPresence;
}(_core.RcModuleV2), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "currentCallUii", [_core.storage, _core.state], {
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
}), _applyDecoratedDescriptor(_class2.prototype, "setCurrentCallUii", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setCurrentCallUii"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "calls", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "calls"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "otherCalls", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "otherCalls"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "callLogs", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "callLogs"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setDialoutStatus", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setDialoutStatus"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setOffhookInit", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setOffhookInit"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setOffhookTerm", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setOffhookTerm"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setIsManualOffhook", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setIsManualOffhook"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setOffhook", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setOffhook"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setOffhooking", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setOffhooking"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "addNewCall", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "addNewCall"), _class2.prototype)), _class2)) || _class);
exports.EvPresence = EvPresence;
//# sourceMappingURL=EvPresence.js.map
