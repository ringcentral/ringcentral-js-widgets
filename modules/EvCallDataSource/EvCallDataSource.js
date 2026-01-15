"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EvCallDataSource = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.array.some.js");
require("core-js/modules/es.date.to-json.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.ends-with.js");
require("core-js/modules/es.string.includes.js");
var _di = require("@ringcentral-integration/commons/lib/di");
var _core = require("@ringcentral-integration/core");
var _dayjs = _interopRequireDefault(require("dayjs"));
var _events = require("events");
var _enums = require("../../enums");
var _helper = require("./helper");
var _dec, _class, _class2, _descriptor;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
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
var EvCallDataSource = exports.EvCallDataSource = (_dec = (0, _di.Module)({
  name: 'EvCallDataSource',
  deps: ['EvAuth', 'EvClient', 'Storage', 'TabManager', {
    dep: 'EvCallDataSourceOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  function EvCallDataSource(deps) {
    var _this;
    _classCallCheck(this, EvCallDataSource);
    _this = _callSuper(this, EvCallDataSource, [{
      deps: deps,
      enableCache: true,
      storageKey: 'EvCallDataSource'
    }]);
    _this.eventEmitter = new _events.EventEmitter();
    _initializerDefineProperty(_this, "data", _descriptor, _this);
    return _this;
  }
  _inherits(EvCallDataSource, _RcModuleV);
  return _createClass(EvCallDataSource, [{
    key: "callIds",
    get: function get() {
      return this.data.callIds;
    }
  }, {
    key: "otherCallIds",
    get: function get() {
      return this.data.otherCallIds;
    }
  }, {
    key: "callLogsIds",
    get: function get() {
      return this.data.callLogsIds;
    }
  }, {
    key: "callsMapping",
    get: function get() {
      return this.data.callsMapping;
    }
  }, {
    key: "rawCallsMapping",
    get: function get() {
      return this.data.rawCallsMapping;
    }
  }, {
    key: "callsLimited",
    get: function get() {
      var _window$localStorage;
      return ((_window$localStorage = window.localStorage) === null || _window$localStorage === void 0 ? void 0 : _window$localStorage.getItem('callsLimited')) === 'true';
    }
  }, {
    key: "changeCallsLimited",
    value: function changeCallsLimited(value) {
      var _window$localStorage2;
      (_window$localStorage2 = window.localStorage) === null || _window$localStorage2 === void 0 ? void 0 : _window$localStorage2.setItem('callsLimited', value === null || value === void 0 ? void 0 : value.toString());
    }
  }, {
    key: "addNewCall",
    value: function addNewCall(call) {
      var rawAgentRecording = call === null || call === void 0 ? void 0 : call.agentRecording;
      rawAgentRecording && (rawAgentRecording = _objectSpread(_objectSpread({}, rawAgentRecording), {}, {
        pause: rawAgentRecording.pause ? Number(rawAgentRecording.pause) : null
      }));
      // note: rawCallsMapping index is raw call uii.
      this.data.rawCallsMapping[call.uii] = _objectSpread(_objectSpread({}, call), {}, {
        // input timezone in second arg if EV reponse has timezone propoty
        // default timezone is 'America/New_York'
        timestamp: (0, _helper.getTimeStamp)(call.queueDts),
        gate: this._getCurrentGateData(call),
        agentRecording: rawAgentRecording
      });
    }
  }, {
    key: "setNewSession",
    value: function setNewSession(session) {
      var id = this._deps.evClient.encodeUii(session);
      if (session.agentId === this._deps.evAuth.agentId) {
        // related to current agent session
        var index = this.callIds.indexOf(id);
        if (index === -1) {
          this.data.callIds.unshift(id);
        }
      } else {
        // other session without current agent
        var _index = this.otherCallIds.indexOf(id);
        if (_index === -1) {
          this.data.otherCallIds.unshift(id);
        }
      }
      this.data.callsMapping[id] = _objectSpread(_objectSpread({}, this.rawCallsMapping[session.uii]), {}, {
        session: session
      });
    }
  }, {
    key: "addNewSession",
    value: function addNewSession(session) {
      this.setNewSession(session);
      // check with other phone
      if (session.agentId === '') {
        // ringing
        this.eventEmitter.emit(_enums.callStatus.RINGING, session);
      }
    }
  }, {
    key: "dropSession",
    value: function dropSession(_dropSession) {
      var id = this._getCallEncodeId(_dropSession);
      this.data.otherCallIds = this.otherCallIds.filter(function (callId) {
        return callId !== id;
      });
    }
  }, {
    key: "removeEndedCall",
    value: function removeEndedCall(endedCall) {
      var id = this._getCallEncodeId(endedCall);
      // remove current agent session call with uii.
      this.data.callIds = this.callIds.filter(function (callId) {
        return callId !== id;
      });
      // remove other call session with uii.
      this.data.otherCallIds = this.otherCallIds.filter(function (callId) {
        return !callId.includes(endedCall.uii);
      });

      // add call with id (encodeUii({ uii, sessionId }))
      var callLogsIndex = this.callLogsIds.indexOf(id);
      if (callLogsIndex === -1) {
        this.data.callLogsIds.unshift(id);
      }
      if (this.callsMapping[id]) {
        this.data.callsMapping[id].endedCall = JSON.parse(JSON.stringify(endedCall));
      }
    }
  }, {
    key: "clearCalls",
    value: function clearCalls() {
      this.data.callIds = [];
      this.data.otherCallIds = [];
    }
  }, {
    key: "setCallHoldStatus",
    value: function setCallHoldStatus(res) {
      var id = this._deps.evClient.encodeUii(res);
      this.data.callsMapping[id].isHold = res.holdState;
    }
  }, {
    key: "limitCalls",
    value: function limitCalls() {
      var _this2 = this;
      // max 250 and 7 days
      var lastWeekDayTimestamp = this._getLastWeekDayTimestamp();
      var storageCallData = {
        callIds: [],
        otherCallIds: [],
        callLogsIds: [],
        callsMapping: {},
        rawCallsMapping: {}
      };
      var fullCallLogsIds = this.callLogsIds.slice(0, 250).reduce(function (acc, curr) {
        return [].concat(_toConsumableArray(acc), [curr.substr(0, curr.length - 2)]);
      }, []);

      // valid rawCallsMapping
      storageCallData.rawCallsMapping = Object.keys(this.rawCallsMapping).reduce(function (acc, id) {
        if (fullCallLogsIds.includes(id) && (0, _helper.getTimeStamp)(_this2.rawCallsMapping[id].queueDts) >= lastWeekDayTimestamp) {
          acc[id] = _this2.rawCallsMapping[id];
        }
        return acc;
      }, {});

      // valid callsMapping
      storageCallData.callsMapping = Object.keys(this.callsMapping).reduce(function (acc, id) {
        if (fullCallLogsIds.includes(id.substr(0, id.length - 2)) && (0, _helper.getTimeStamp)(_this2.callsMapping[id].queueDts) >= lastWeekDayTimestamp) {
          acc[id] = _this2.callsMapping[id];
          if (!id.endsWith('$1')) {
            storageCallData.callLogsIds.unshift(id);
          }
        }
        return acc;
      }, {});
      this.data = storageCallData;
      this.changeCallsLimited(true);
    }
  }, {
    key: "_getCallEncodeId",
    value: function _getCallEncodeId(session) {
      return this._deps.evClient.encodeUii(session);
    }
  }, {
    key: "_getCurrentGateData",
    value: function _getCurrentGateData(call) {
      var currentGateId = call.queue.number;
      var currentQueueGroup = this._deps.evAuth.availableRequeueQueues.find(function (_ref) {
        var gates = _ref.gates;
        return gates.some(function (_ref2) {
          var gateId = _ref2.gateId;
          return gateId === currentGateId;
        });
      });
      return {
        gateId: currentGateId,
        gateGroupId: currentQueueGroup === null || currentQueueGroup === void 0 ? void 0 : currentQueueGroup.gateGroupId
      };
    }
  }, {
    key: "_getLastWeekDayTimestamp",
    value: function _getLastWeekDayTimestamp() {
      var now = (0, _dayjs["default"])();
      var lastWeekDay = now.clone().subtract(7, 'days').startOf('day');
      return lastWeekDay.valueOf();
    }
  }]);
}(_core.RcModuleV2), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "data", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {
      callIds: [],
      otherCallIds: [],
      callLogsIds: [],
      callsMapping: {},
      rawCallsMapping: {}
    };
  }
}), _applyDecoratedDescriptor(_class2.prototype, "addNewCall", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "addNewCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setNewSession", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setNewSession"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "dropSession", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "dropSession"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "removeEndedCall", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "removeEndedCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "clearCalls", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "clearCalls"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setCallHoldStatus", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setCallHoldStatus"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "limitCalls", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "limitCalls"), _class2.prototype), _class2)) || _class);
//# sourceMappingURL=EvCallDataSource.js.map
