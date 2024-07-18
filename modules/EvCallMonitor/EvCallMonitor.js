"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.filter");
require("core-js/modules/es.array.includes");
require("core-js/modules/es.array.map");
require("core-js/modules/es.array.reduce");
require("core-js/modules/es.object.entries");
require("core-js/modules/es.object.get-own-property-descriptor");
require("core-js/modules/es.regexp.exec");
require("core-js/modules/es.string.includes");
require("core-js/modules/es.string.match");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EvCallMonitor = void 0;
require("regenerator-runtime/runtime");
var _di = require("@ringcentral-integration/commons/lib/di");
var _core = require("@ringcentral-integration/core");
var _enums = require("../../enums");
var _callUniqueIdentifies = require("../../lib/callUniqueIdentifies");
var _contactMatchIdentify = require("../../lib/contactMatchIdentify");
var _dec, _dec2, _dec3, _class, _class2;
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) { ; } } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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
var EvCallMonitor = (_dec = (0, _di.Module)({
  name: 'EvCallMonitor',
  deps: ['Presence', 'EvClient', 'Beforeunload', 'EvAgentSession', 'EvIntegratedSoftphone', 'EvCallDataSource', {
    dep: 'ContactMatcher',
    optional: true
  }, {
    dep: 'ActivityMatcher',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (that) {
  return [that.callsDataMapping, that.contactMatches, that.activityMatches];
}), _dec3 = (0, _core.computed)(function (that) {
  return [that.calls];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  _inherits(EvCallMonitor, _RcModuleV);
  var _super = _createSuper(EvCallMonitor);
  function EvCallMonitor(deps) {
    var _this$_deps$contactMa, _this$_deps$activityM;
    var _this;
    _classCallCheck(this, EvCallMonitor);
    _this = _super.call(this, {
      deps: deps
    });
    _this._oldCalls = [];
    _this._beforeunloadHandler = function () {
      return _this._deps.evAgentSession.shouldBlockBrowser;
    };
    (_this$_deps$contactMa = _this._deps.contactMatcher) === null || _this$_deps$contactMa === void 0 ? void 0 : _this$_deps$contactMa.addQuerySource({
      getQueriesFn: function getQueriesFn() {
        return _this.uniqueIdentifies;
      },
      readyCheckFn: function readyCheckFn() {
        return _this._deps.presence.ready;
      }
    });
    (_this$_deps$activityM = _this._deps.activityMatcher) === null || _this$_deps$activityM === void 0 ? void 0 : _this$_deps$activityM.addQuerySource({
      getQueriesFn: function getQueriesFn() {
        return _this.callIds;
      },
      readyCheckFn: function readyCheckFn() {
        return _this._deps.presence.ready;
      }
    });
    return _this;
  }
  _createClass(EvCallMonitor, [{
    key: "getMatcher",
    value: function () {
      var _getMatcher = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
        var ani, callType, contactMatchIdentify;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                ani = _ref.ani, callType = _ref.callType;
                if (!this._deps.contactMatcher) {
                  _context.next = 5;
                  break;
                }
                contactMatchIdentify = (0, _contactMatchIdentify.contactMatchIdentifyEncode)({
                  phoneNumber: ani,
                  callType: callType
                });
                _context.next = 5;
                return this._deps.contactMatcher.forceMatchNumber({
                  phoneNumber: contactMatchIdentify
                });
              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function getMatcher(_x) {
        return _getMatcher.apply(this, arguments);
      }
      return getMatcher;
    }()
  }, {
    key: "getMainCall",
    value: function getMainCall(uii) {
      var id = this._deps.evClient.getMainId(uii);
      return this._deps.presence.callsMapping[id];
    }
  }, {
    key: "limitCalls",
    value: function limitCalls() {
      return this._deps.evCallDataSource.limitCalls();
    }
  }, {
    key: "onStateChange",
    value: function onStateChange() {
      if (this._deps.evAgentSession.configSuccess) {
        if (this.calls.length > this._oldCalls.length) {
          var currentCall = this.calls[0];
          var mainCall = this.getMainCall(currentCall.uii);
          if (currentCall && mainCall) {
            this._oldCalls = this.calls;
            this._deps.presence.eventEmitter.emit(_enums.callStatus.ANSWERED, currentCall);
          } else {
            this._deps.presence.clearCalls();
          }
        } else if (this.calls.length < this._oldCalls.length) {
          var call = this._oldCalls[0];
          this._oldCalls = this.calls;
          this._deps.presence.eventEmitter.emit(_enums.callStatus.ENDED, call);
        }
      }
    }
  }, {
    key: "getCallId",
    value: function getCallId(_ref2) {
      var uii = _ref2.uii,
        sessionId = _ref2.sessionId;
      return this._deps.evClient.encodeUii({
        uii: uii,
        sessionId: sessionId
      });
    }
  }, {
    key: "getActiveCallList",
    value: function getActiveCallList(callIds, otherCallIds, callsMapping, id) {
      var uii = this._deps.evClient.decodeUii(id);
      var mainUii = this._deps.evClient.getMainId(uii);
      if (!otherCallIds.includes(mainUii) || !callIds.includes(id)) return [];
      var currentOtherCallIds = otherCallIds.filter(function (id) {
        return id.includes(uii) && id !== mainUii;
      });
      var currentCallIds = [mainUii, id].concat(_toConsumableArray(currentOtherCallIds));
      return currentCallIds.map(function (id) {
        return callsMapping[id];
      });
    }
  }, {
    key: "updateActivityMatches",
    value: function updateActivityMatches() {
      var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref3$forceMatch = _ref3.forceMatch,
        forceMatch = _ref3$forceMatch === void 0 ? false : _ref3$forceMatch;
      // it's async function
      // TODO: fix type in DataMatcher
      return this._deps.activityMatcher.match({
        queries: this._deps.activityMatcher._getQueries(),
        ignoreCache: forceMatch
      });
    }
  }, {
    key: "onCallRinging",
    value: function onCallRinging(callback) {
      this._deps.presence.eventEmitter.on(_enums.callStatus.RINGING, callback);
      return this;
    }
  }, {
    key: "onCallAnswered",
    value: function onCallAnswered(callback) {
      this._deps.presence.eventEmitter.on(_enums.callStatus.ANSWERED, callback);
      return this;
    }
  }, {
    key: "onCallEnded",
    value: function onCallEnded(callback) {
      this._deps.presence.eventEmitter.on(_enums.callStatus.ENDED, callback);
      return this;
    }
  }, {
    key: "bindBeforeunload",
    value: function bindBeforeunload() {
      this._deps.beforeunload.add(this._beforeunloadHandler);
    }
  }, {
    key: "removeBeforeunload",
    value: function removeBeforeunload() {
      this._deps.beforeunload.remove(this._beforeunloadHandler);
    }
  }, {
    key: "isOnCall",
    get: function get() {
      return this.calls.length > 0;
    }
  }, {
    key: "calls",
    get: function get() {
      return this._deps.presence.calls || [];
    }
  }, {
    key: "otherCalls",
    get: function get() {
      return this._deps.presence.otherCalls || [];
    }
  }, {
    key: "callLogs",
    get: function get() {
      return this._deps.presence.callLogs || [];
    }
  }, {
    key: "callIds",
    get: function get() {
      return this._deps.presence.callIds || [];
    }
  }, {
    key: "otherCallIds",
    get: function get() {
      return this._deps.presence.otherCallIds || [];
    }
  }, {
    key: "callLogsIds",
    get: function get() {
      return this._deps.presence.callLogsIds || [];
    }
  }, {
    key: "callsDataMapping",
    get: function get() {
      return this._deps.presence.callsMapping || {};
    }
  }, {
    key: "contactMatches",
    get: function get() {
      return this._deps.contactMatcher.dataMapping || {};
    }
  }, {
    key: "activityMatches",
    get: function get() {
      return this._deps.activityMatcher.dataMapping || {};
    }
  }, {
    key: "callsMapping",
    get: function get() {
      var _this2 = this;
      var callsDataMapping = this.callsDataMapping,
        contactMatches = this.contactMatches,
        activityMatches = this.activityMatches;
      return Object.entries(callsDataMapping).reduce(function (mapping, _ref4) {
        var _call$session;
        var _ref5 = _slicedToArray(_ref4, 2),
          key = _ref5[0],
          call = _ref5[1];
        var contactMatchIdentify = (0, _contactMatchIdentify.contactMatchIdentifyEncode)({
          phoneNumber: call.ani,
          callType: call.callType
        });
        var id = call.session ? _this2.getCallId(call.session) : null;
        var recordingUrl = (_call$session = call.session) === null || _call$session === void 0 ? void 0 : _call$session.recordingUrl;
        var _ref6 = call.baggage || {},
          agentFirstName = _ref6.agentFirstName,
          agentLastName = _ref6.agentLastName;
        var agentName = agentFirstName && agentLastName ? "".concat(agentFirstName, " ").concat(agentLastName) : null;
        return _objectSpread(_objectSpread({}, mapping), {}, _defineProperty({}, key, _objectSpread(_objectSpread({}, call), {}, {
          recordingUrl: recordingUrl,
          agentName: agentName,
          // TODO: confirm about using `toMatches` & `fromMatches`?
          contactMatches: contactMatches[contactMatchIdentify] || [],
          activityMatches: id && activityMatches[id] ? activityMatches[id] : []
        })));
      }, {});
    }
  }, {
    key: "uniqueIdentifies",
    get: function get() {
      return (0, _callUniqueIdentifies.makeCallsUniqueIdentifies)(this.calls);
    }
  }, {
    key: "callsLimited",
    get: function get() {
      return this._deps.evCallDataSource.callsLimited;
    }
  }]);
  return EvCallMonitor;
}(_core.RcModuleV2), (_applyDecoratedDescriptor(_class2.prototype, "callsMapping", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "callsMapping"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "uniqueIdentifies", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "uniqueIdentifies"), _class2.prototype)), _class2)) || _class);
exports.EvCallMonitor = EvCallMonitor;
//# sourceMappingURL=EvCallMonitor.js.map
