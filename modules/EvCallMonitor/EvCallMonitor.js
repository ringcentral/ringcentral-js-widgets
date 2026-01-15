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
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EvCallMonitor = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.object.entries.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/es.string.match.js");
var _di = require("@ringcentral-integration/commons/lib/di");
var _core = require("@ringcentral-integration/core");
var _enums = require("../../enums");
var _callUniqueIdentifies = require("../../lib/callUniqueIdentifies");
var _contactMatchIdentify = require("../../lib/contactMatchIdentify");
var _dec, _dec2, _dec3, _class, _class2;
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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
var EvCallMonitor = exports.EvCallMonitor = (_dec = (0, _di.Module)({
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
  function EvCallMonitor(deps) {
    var _this$_deps$contactMa, _this$_deps$activityM;
    var _this;
    _classCallCheck(this, EvCallMonitor);
    _this = _callSuper(this, EvCallMonitor, [{
      deps: deps
    }]);
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
  _inherits(EvCallMonitor, _RcModuleV);
  return _createClass(EvCallMonitor, [{
    key: "getMatcher",
    value: function () {
      var _getMatcher = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(_ref) {
        var ani, callType, contactMatchIdentify;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              ani = _ref.ani, callType = _ref.callType;
              if (!this._deps.contactMatcher) {
                _context.n = 1;
                break;
              }
              contactMatchIdentify = (0, _contactMatchIdentify.contactMatchIdentifyEncode)({
                phoneNumber: ani,
                callType: callType
              });
              _context.n = 1;
              return this._deps.contactMatcher.forceMatchNumber({
                phoneNumber: contactMatchIdentify
              });
            case 1:
              return _context.a(2);
          }
        }, _callee, this);
      }));
      function getMatcher(_x) {
        return _getMatcher.apply(this, arguments);
      }
      return getMatcher;
    }()
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
      return Object.entries(callsDataMapping).reduce(function (mapping, _ref2) {
        var _call$session;
        var _ref3 = _slicedToArray(_ref2, 2),
          key = _ref3[0],
          call = _ref3[1];
        var contactMatchIdentify = (0, _contactMatchIdentify.contactMatchIdentifyEncode)({
          phoneNumber: call.ani,
          callType: call.callType
        });
        var id = call.session ? _this2.getCallId(call.session) : null;
        var recordingUrl = (_call$session = call.session) === null || _call$session === void 0 ? void 0 : _call$session.recordingUrl;
        var _ref4 = call.baggage || {},
          agentFirstName = _ref4.agentFirstName,
          agentLastName = _ref4.agentLastName;
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
    key: "getMainCall",
    value: function getMainCall(uii) {
      var id = this._deps.evClient.getMainId(uii);
      return this._deps.presence.callsMapping[id];
    }
  }, {
    key: "callsLimited",
    get: function get() {
      return this._deps.evCallDataSource.callsLimited;
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
    value: function getCallId(_ref5) {
      var uii = _ref5.uii,
        sessionId = _ref5.sessionId;
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
      var _ref6 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref6$forceMatch = _ref6.forceMatch,
        forceMatch = _ref6$forceMatch === void 0 ? false : _ref6$forceMatch;
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
  }]);
}(_core.RcModuleV2), _applyDecoratedDescriptor(_class2.prototype, "callsMapping", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "callsMapping"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "uniqueIdentifies", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "uniqueIdentifies"), _class2.prototype), _class2)) || _class);
//# sourceMappingURL=EvCallMonitor.js.map
