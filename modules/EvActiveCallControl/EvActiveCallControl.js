"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.date.now");
require("core-js/modules/es.date.to-string");
require("core-js/modules/es.object.get-own-property-descriptor");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EvActiveCallControl = void 0;
require("regenerator-runtime/runtime");
var _di = require("@ringcentral-integration/commons/lib/di");
var _core = require("@ringcentral-integration/core");
var _enums = require("../../enums");
var _dec, _class, _class2, _descriptor, _descriptor2;
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
var EvActiveCallControl = (_dec = (0, _di.Module)({
  name: 'EvActiveCallControl',
  deps: ['EvClient', 'EvSettings', 'Presence', 'EvIntegratedSoftphone', 'EvAgentSession', 'Storage', 'EvCallMonitor', {
    dep: 'TabManager',
    optional: true
  }, {
    dep: 'EvActiveCallControlOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = /*#__PURE__*/function (_ref) {
  _inherits(EvActiveCallControl, _ref);
  var _super = _createSuper(EvActiveCallControl);
  _createClass(EvActiveCallControl, [{
    key: "tabManagerEnabled",
    get: function get() {
      var _this$_deps$tabManage;
      return (_this$_deps$tabManage = this._deps.tabManager) === null || _this$_deps$tabManage === void 0 ? void 0 : _this$_deps$tabManage.enable;
    }
  }]);
  function EvActiveCallControl(deps) {
    var _this;
    _classCallCheck(this, EvActiveCallControl);
    _this = _super.call(this, {
      deps: deps,
      enableCache: true,
      storageKey: 'EvActiveCallControl'
    });
    _initializerDefineProperty(_this, "isRecording", _descriptor, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "timeStamp", _descriptor2, _assertThisInitialized(_this));
    return _this;
  }
  _createClass(EvActiveCallControl, [{
    key: "setIsRecording",
    value: function setIsRecording(isRecording) {
      this.isRecording = isRecording;
    }
  }, {
    key: "pauseRecordAction",
    value: function pauseRecordAction() {
      this.isRecording = false;
      this.timeStamp = Date.now();
    }
  }, {
    key: "record",
    value: function () {
      var _record = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _yield$this$_deps$evC, state, message;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this._deps.evClient.record(true);
              case 2:
                _yield$this$_deps$evC = _context.sent;
                state = _yield$this$_deps$evC.state;
                message = _yield$this$_deps$evC.message;
                if (!(state === 'RECORDING')) {
                  _context.next = 9;
                  break;
                }
                this.setIsRecording(true);
                _context.next = 10;
                break;
              case 9:
                throw new Error(message);
              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function record() {
        return _record.apply(this, arguments);
      }
      return record;
    }()
  }, {
    key: "stopRecord",
    value: function () {
      var _stopRecord = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var _yield$this$_deps$evC2, state, message;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this._deps.evClient.record(false);
              case 2:
                _yield$this$_deps$evC2 = _context2.sent;
                state = _yield$this$_deps$evC2.state;
                message = _yield$this$_deps$evC2.message;
                if (!(state === 'STOPPED')) {
                  _context2.next = 9;
                  break;
                }
                this.setIsRecording(false);
                _context2.next = 10;
                break;
              case 9:
                throw new Error(message);
              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
      function stopRecord() {
        return _stopRecord.apply(this, arguments);
      }
      return stopRecord;
    }()
  }, {
    key: "onKeypadClick",
    value: function onKeypadClick(value) {
      this._deps.evClient.sipSendDTMF(value);
    }
  }, {
    key: "pauseRecord",
    value: function () {
      var _pauseRecord = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var _yield$this$_deps$evC3, state, message;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this._deps.evClient.pauseRecord(false);
              case 2:
                _yield$this$_deps$evC3 = _context3.sent;
                state = _yield$this$_deps$evC3.state;
                message = _yield$this$_deps$evC3.message;
                if (!(state === 'PAUSED')) {
                  _context3.next = 9;
                  break;
                }
                this.pauseRecordAction();
                _context3.next = 10;
                break;
              case 9:
                throw new Error(message);
              case 10:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));
      function pauseRecord() {
        return _pauseRecord.apply(this, arguments);
      }
      return pauseRecord;
    }()
  }, {
    key: "resumeRecord",
    value: function resumeRecord() {
      this.isRecording = true;
      this.timeStamp = null;
    }
  }, {
    key: "mute",
    value: function mute() {
      this._sipToggleMute(true);
    }
  }, {
    key: "unmute",
    value: function unmute() {
      this._sipToggleMute(false);
    }
  }, {
    key: "hangUp",
    value: function hangUp(sessionId) {
      this._deps.evClient.hangup({
        sessionId: sessionId
      });
    }
  }, {
    key: "reject",
    value: function reject() {
      console.log('reject');
    }
  }, {
    key: "hold",
    value: function hold() {
      this._changeOnHoldState(true);
    }
  }, {
    key: "unhold",
    value: function unhold() {
      this._changeOnHoldState(false);
    }
  }, {
    key: "hangupSession",
    value: function hangupSession(_ref2) {
      var sessionId = _ref2.sessionId;
      this._deps.evClient.hangup({
        sessionId: sessionId
      });
    }
  }, {
    key: "holdSession",
    value: function holdSession(_ref3) {
      var sessionId = _ref3.sessionId,
        state = _ref3.state;
      this._deps.evClient.holdSession({
        state: state,
        sessionId: sessionId
      });
    }
  }, {
    key: "getMainCall",
    value: function getMainCall(uii) {
      var id = this._deps.evClient.getMainId(uii);
      return this._deps.presence.callsMapping[id];
    }
  }, {
    key: "_changeOnHoldState",
    value: function _changeOnHoldState(state) {
      this._deps.evClient.hold(state);
    }
  }, {
    key: "_sipToggleMute",
    value: function _sipToggleMute(state) {
      if (this._deps.evAgentSession.isIntegratedSoftphone) {
        if (this.tabManagerEnabled) {
          this._deps.tabManager.send(_enums.tabManagerEvents.MUTE, state);
        }
        this._deps.evIntegratedSoftphone.sipToggleMute(state);
      }
    }
  }]);
  return EvActiveCallControl;
}(_core.RcModuleV2), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "isRecording", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setIsRecording", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setIsRecording"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "pauseRecordAction", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "pauseRecordAction"), _class2.prototype), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "timeStamp", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "resumeRecord", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "resumeRecord"), _class2.prototype)), _class2)) || _class);
exports.EvActiveCallControl = EvActiveCallControl;
//# sourceMappingURL=EvActiveCallControl.js.map
