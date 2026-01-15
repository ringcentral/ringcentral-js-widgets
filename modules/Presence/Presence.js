"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.presenceRegExp = exports.detailedPresenceRegExp = exports.Presence = exports.DEFAULT_TTL = exports.DEFAULT_POLLING_INTERVAL = exports.DEFAULT_MAX_FETCH_DELAY = exports.DEFAULT_FETCH_DELAY = void 0;
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.find-index.js");
require("core-js/modules/es.date.now.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.exec.js");
var _core = require("@ringcentral-integration/core");
var _ramda = require("ramda");
var _presenceStatus = require("../../enums/presenceStatus.enum");
var _subscriptionFilters = require("../../enums/subscriptionFilters");
var _callLogHelpers = require("../../lib/callLogHelpers");
var _debounceThrottle = require("../../lib/debounce-throttle");
var _di = require("../../lib/di");
var _proxify = require("../../lib/proxy/proxify");
var _DataFetcherV = require("../DataFetcherV2");
var _dndStatus = require("./dndStatus");
var _removeIntermediateCall = require("./removeIntermediateCall");
var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor;
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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
var DEFAULT_TTL = exports.DEFAULT_TTL = 62 * 1000;
var DEFAULT_POLLING_INTERVAL = exports.DEFAULT_POLLING_INTERVAL = 3 * 60 * 1000;
var DEFAULT_FETCH_DELAY = exports.DEFAULT_FETCH_DELAY = 2 * 1000;
var DEFAULT_MAX_FETCH_DELAY = exports.DEFAULT_MAX_FETCH_DELAY = 4 * 1000;
var presenceRegExp = exports.presenceRegExp = /.*\/presence(\?.*)?/;
var detailedPresenceRegExp = exports.detailedPresenceRegExp = /.*\/presence\?detailedTelephonyState=true&sipData=true/;
var acceptCallQueueToggles = [_dndStatus.dndStatus.takeAllCalls, _dndStatus.dndStatus.doNotAcceptDepartmentCalls];
var Presence = exports.Presence = (_dec = (0, _di.Module)({
  name: 'Presence',
  deps: ['Auth', 'Client', 'ConnectivityMonitor', 'DataFetcherV2', 'ExtensionFeatures', 'Subscription', 'Storage', {
    dep: 'TabManager',
    optional: true
  }, {
    dep: 'PresenceOptions',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (_ref) {
  var data = _ref.data;
  return [data];
}), _dec3 = (0, _core.computed)(function (_ref2) {
  var activeCalls = _ref2.activeCalls;
  return [activeCalls];
}), _dec4 = (0, _core.computed)(function (_ref3) {
  var calls = _ref3.calls;
  return [calls];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_DataFetcherV2Consume) {
  function Presence(deps) {
    var _deps$presenceOptions;
    var _this;
    _classCallCheck(this, Presence);
    _this = _callSuper(this, Presence, [{
      deps: deps,
      enableCache: true,
      storageKey: 'Presence'
    }]);
    _this._debouncedFetchData = void 0;
    // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'Unsubscribe... Remove this comment to see the full error message
    _this._stopWatchingConnectivity = null;
    // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'Unsubscribe... Remove this comment to see the full error message
    _this._stopWatchingSubscription = null;
    _initializerDefineProperty(_this, "lastDndStatus", _descriptor, _this);
    var presenceOptions = (_deps$presenceOptions = deps.presenceOptions) !== null && _deps$presenceOptions !== void 0 ? _deps$presenceOptions : {};
    var _presenceOptions$ttl = presenceOptions.ttl,
      ttl = _presenceOptions$ttl === void 0 ? DEFAULT_TTL : _presenceOptions$ttl,
      _presenceOptions$poll = presenceOptions.pollingInterval,
      pollingInterval = _presenceOptions$poll === void 0 ? DEFAULT_POLLING_INTERVAL : _presenceOptions$poll;
    _this._source = new _DataFetcherV.DataSource(_objectSpread(_objectSpread({}, presenceOptions), {}, {
      key: 'presence',
      cleanOnReset: true,
      ttl: ttl,
      pollingInterval: pollingInterval,
      fetchFunction: function () {
        var _fetchFunction = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          var response, data, _data$dndStatus, dndStatus, _data$meetingStatus, meetingStatus, _data$presenceStatus, presenceStatus, _data$telephonyStatus, telephonyStatus, _data$userStatus, userStatus, activeCalls;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                _context.n = 1;
                return _this._deps.client.service.platform().get(_this._endPoint);
              case 1:
                response = _context.v;
                _context.n = 2;
                return response.json();
              case 2:
                data = _context.v;
                _data$dndStatus = data.dndStatus, dndStatus = _data$dndStatus === void 0 ? _this.dndStatus : _data$dndStatus, _data$meetingStatus = data.meetingStatus, meetingStatus = _data$meetingStatus === void 0 ? _this.meetingStatus : _data$meetingStatus, _data$presenceStatus = data.presenceStatus, presenceStatus = _data$presenceStatus === void 0 ? _this.presenceStatus : _data$presenceStatus, _data$telephonyStatus = data.telephonyStatus, telephonyStatus = _data$telephonyStatus === void 0 ? _this.telephonyStatus : _data$telephonyStatus, _data$userStatus = data.userStatus, userStatus = _data$userStatus === void 0 ? _this.userStatus : _data$userStatus;
                activeCalls = _this._processRawActiveCalls(data.activeCalls, data.totalActiveCalls, Date.now());
                return _context.a(2, {
                  sequence: _this._sequence,
                  // @ts-expect-error TS(2322): Type 'unknown[]' is not assignable to type 'Active... Remove this comment to see the full error message
                  activeCalls: activeCalls,
                  dndStatus: dndStatus,
                  meetingStatus: meetingStatus,
                  presenceStatus: presenceStatus,
                  telephonyStatus: telephonyStatus,
                  userStatus: userStatus
                });
            }
          }, _callee);
        }));
        function fetchFunction() {
          return _fetchFunction.apply(this, arguments);
        }
        return fetchFunction;
      }(),
      readyCheckFunction: function readyCheckFunction() {
        return _this._deps.auth.ready && _this._deps.auth.loggedIn && _this._deps.subscription.ready && _this._deps.extensionFeatures.ready && _this._deps.connectivityMonitor.ready && _this._deps.dataFetcherV2.ready;
      },
      permissionCheckFunction: function permissionCheckFunction() {
        return _this._checkPermission();
      }
    }));
    _this._deps.dataFetcherV2.register(_this._source);
    _this._debouncedFetchData = (0, _debounceThrottle.debounce)({
      fn: _this.fetchData,
      threshold: _this._fetchDelay,
      maxThreshold: _this._maxFetchDelay
    });
    _this._deps.subscription.register(_this, {
      filters: [_this._endPoint]
    });
    return _this;
  }
  _inherits(Presence, _DataFetcherV2Consume);
  return _createClass(Presence, [{
    key: "_setLastDndStatus",
    value: function _setLastDndStatus(dndStatus) {
      this.lastDndStatus = dndStatus;
    }
  }, {
    key: "_endPoint",
    get: function get() {
      return this._detailed ? _subscriptionFilters.subscriptionFilters.detailedPresence : _subscriptionFilters.subscriptionFilters.presence;
    }
  }, {
    key: "_detailed",
    get: function get() {
      var _this$_deps$presenceO, _this$_deps$presenceO2;
      return !!((_this$_deps$presenceO = (_this$_deps$presenceO2 = this._deps.presenceOptions) === null || _this$_deps$presenceO2 === void 0 ? void 0 : _this$_deps$presenceO2.detailed) !== null && _this$_deps$presenceO !== void 0 ? _this$_deps$presenceO : true);
    }
  }, {
    key: "_fetchDelay",
    get: function get() {
      var _this$_deps$presenceO3, _this$_deps$presenceO4;
      return Math.max(0, (_this$_deps$presenceO3 = (_this$_deps$presenceO4 = this._deps.presenceOptions) === null || _this$_deps$presenceO4 === void 0 ? void 0 : _this$_deps$presenceO4.fetchDelay) !== null && _this$_deps$presenceO3 !== void 0 ? _this$_deps$presenceO3 : DEFAULT_FETCH_DELAY);
    }
  }, {
    key: "_maxFetchDelay",
    get: function get() {
      var _this$_deps$presenceO5, _this$_deps$presenceO6;
      return Math.max(this._fetchDelay, (_this$_deps$presenceO5 = (_this$_deps$presenceO6 = this._deps.presenceOptions) === null || _this$_deps$presenceO6 === void 0 ? void 0 : _this$_deps$presenceO6.maxFetchDelay) !== null && _this$_deps$presenceO5 !== void 0 ? _this$_deps$presenceO5 : DEFAULT_MAX_FETCH_DELAY);
    }
  }, {
    key: "_checkPermission",
    value: function _checkPermission() {
      var _this$_deps$extension, _this$_deps$extension2, _this$_deps$extension3;
      return (_this$_deps$extension = (_this$_deps$extension2 = this._deps.extensionFeatures.features) === null || _this$_deps$extension2 === void 0 ? void 0 : (_this$_deps$extension3 = _this$_deps$extension2.ReadPresenceStatus) === null || _this$_deps$extension3 === void 0 ? void 0 : _this$_deps$extension3.available) !== null && _this$_deps$extension !== void 0 ? _this$_deps$extension : false;
    }
  }, {
    key: "_processRawActiveCalls",
    value: function _processRawActiveCalls() {
      var _this2 = this;
      var activeCalls = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var totalActiveCalls = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var timestamp = arguments.length > 2 ? arguments[2] : undefined;
      if (activeCalls.length < totalActiveCalls) {
        return this.activeCalls;
      }
      // @ts-expect-error TS(2769): No overload matches this call.
      return (0, _ramda.map)(function (activeCall) {
        var existingCall = _this2.activeCalls.find(
        // @ts-expect-error TS(2339): Property 'sessionId' does not exist on type 'never... Remove this comment to see the full error message
        function (call) {
          return call.sessionId === activeCall.sessionId;
        });
        if (!existingCall) {
          var normalizedCall = (0, _callLogHelpers.normalizeStartTime)((0, _callLogHelpers.normalizeFromTo)(activeCall));
          var startTime = Number(normalizedCall.startTime || timestamp);
          var offset = Math.min(timestamp - startTime, 0);
          return _objectSpread(_objectSpread({}, normalizedCall), {}, {
            startTime: startTime,
            offset: offset
          });
        }
        return _objectSpread(_objectSpread({}, existingCall), (0, _callLogHelpers.normalizeStartTime)((0, _callLogHelpers.normalizeFromTo)(activeCall)));
        // @ts-expect-error TS(2345): Argument of type 'ActiveCallInfo[]' is not assigna... Remove this comment to see the full error message
      }, (0, _removeIntermediateCall.removeIntermediateCall)([], activeCalls));
    }
  }, {
    key: "_handleSubscription",
    value: function _handleSubscription(message) {
      var _this$_deps$tabManage, _this$_deps$tabManage2;
      var regExp = this._detailed ? detailedPresenceRegExp : presenceRegExp;
      if (this.ready && (this._source.disableCache || ((_this$_deps$tabManage = (_this$_deps$tabManage2 = this._deps.tabManager) === null || _this$_deps$tabManage2 === void 0 ? void 0 : _this$_deps$tabManage2.active) !== null && _this$_deps$tabManage !== void 0 ? _this$_deps$tabManage : true)) && (message === null || message === void 0 ? void 0 : message.event) && regExp.test(message.event) && message.body) {
        var _message$body$activeC, _message$body$activeC2, _message$body$totalAc;
        if (message.body.sequence && message.body.sequence < this._sequence) {
          return;
        }
        var timestamp = Date.now();
        var _message$body = message.body,
          _message$body$sequenc = _message$body.sequence,
          sequence = _message$body$sequenc === void 0 ? this._sequence : _message$body$sequenc,
          _message$body$dndStat = _message$body.dndStatus,
          dndStatus = _message$body$dndStat === void 0 ? this.dndStatus : _message$body$dndStat,
          _message$body$meeting = _message$body.meetingStatus,
          meetingStatus = _message$body$meeting === void 0 ? this.meetingStatus : _message$body$meeting,
          _message$body$presenc = _message$body.presenceStatus,
          presenceStatus = _message$body$presenc === void 0 ? this.presenceStatus : _message$body$presenc,
          _message$body$telepho = _message$body.telephonyStatus,
          telephonyStatus = _message$body$telepho === void 0 ? this.telephonyStatus : _message$body$telepho,
          _message$body$userSta = _message$body.userStatus,
          userStatus = _message$body$userSta === void 0 ? this.userStatus : _message$body$userSta;
        this._setLastDndStatus(this._calculateLastDndStatus(dndStatus));
        var activeCalls = this._processRawActiveCalls(message.body.activeCalls, message.body.totalActiveCalls, timestamp);
        this._updateData({
          sequence: sequence,
          // @ts-expect-error TS(2322): Type 'unknown[]' is not assignable to type 'Active... Remove this comment to see the full error message
          activeCalls: activeCalls,
          dndStatus: dndStatus,
          meetingStatus: meetingStatus,
          presenceStatus: presenceStatus,
          telephonyStatus: telephonyStatus,
          userStatus: userStatus
        }, timestamp);
        /**
         * as pointed out by Igor in https://jira_domain/browse/PLA-33391,
         * when the real calls count larger than the active calls returned by the pubnub,
         * we need to pulling the calls manually.
         */
        var activeCallsLength = (_message$body$activeC = (_message$body$activeC2 = message.body.activeCalls) === null || _message$body$activeC2 === void 0 ? void 0 : _message$body$activeC2.length) !== null && _message$body$activeC !== void 0 ? _message$body$activeC : 0;
        var totalActiveCalls = (_message$body$totalAc = message.body.totalActiveCalls) !== null && _message$body$totalAc !== void 0 ? _message$body$totalAc : 0;
        if (this._detailed && activeCallsLength < totalActiveCalls) {
          this._debouncedFetchData();
        }
      }
    }
  }, {
    key: "onInit",
    value: function onInit() {
      var _this3 = this;
      this._stopWatchingConnectivity = (0, _core.watch)(this, function () {
        return _this3._deps.connectivityMonitor.connectivity;
      }, function (connectivity) {
        return _this3._handleConnectivity(connectivity);
      });
      this._stopWatchingSubscription = (0, _core.watch)(this, function () {
        return _this3._deps.subscription.message;
      }, function (message) {
        return _this3._handleSubscription(message);
      });
    }
  }, {
    key: "_handleConnectivity",
    value: function _handleConnectivity(connectivity) {
      var _this$_deps$tabManage3, _this$_deps$tabManage4;
      if (this.ready && (this._source.disableCache || ((_this$_deps$tabManage3 = (_this$_deps$tabManage4 = this._deps.tabManager) === null || _this$_deps$tabManage4 === void 0 ? void 0 : _this$_deps$tabManage4.active) !== null && _this$_deps$tabManage3 !== void 0 ? _this$_deps$tabManage3 : true)) && connectivity && this._checkPermission()) {
        this.fetchData();
      }
    }
  }, {
    key: "onReset",
    value: function onReset() {
      var _this$_stopWatchingCo, _this$_stopWatchingSu;
      (_this$_stopWatchingCo = this._stopWatchingConnectivity) === null || _this$_stopWatchingCo === void 0 ? void 0 : _this$_stopWatchingCo.call(this);
      // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'Unsubscribe... Remove this comment to see the full error message
      this._stopWatchingConnectivity = null;
      (_this$_stopWatchingSu = this._stopWatchingSubscription) === null || _this$_stopWatchingSu === void 0 ? void 0 : _this$_stopWatchingSu.call(this);
      // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'Unsubscribe... Remove this comment to see the full error message
      this._stopWatchingSubscription = null;
      this._debouncedFetchData.cancel();
    }
  }, {
    key: "_sequence",
    get: function get() {
      var _this$data$sequence, _this$data;
      return (_this$data$sequence = (_this$data = this.data) === null || _this$data === void 0 ? void 0 : _this$data.sequence) !== null && _this$data$sequence !== void 0 ? _this$data$sequence : 0;
    }
  }, {
    key: "activeCalls",
    get: function get() {
      var _this$data$activeCall, _this$data2;
      return (_this$data$activeCall = (_this$data2 = this.data) === null || _this$data2 === void 0 ? void 0 : _this$data2.activeCalls) !== null && _this$data$activeCall !== void 0 ? _this$data$activeCall : [];
    }
  }, {
    key: "calls",
    get: function get() {
      return (0, _ramda.filter)(function (call) {
        return !(0, _callLogHelpers.isEnded)(call);
      }, (0, _callLogHelpers.removeInboundRingOutLegs)(this.activeCalls));
    }
  }, {
    key: "_calculateLastDndStatus",
    value: function _calculateLastDndStatus(newDndStatus) {
      return newDndStatus !== this.dndStatus && newDndStatus !== _dndStatus.dndStatus.doNotAcceptAnyCalls ? newDndStatus : this.lastDndStatus;
    }
  }, {
    key: "_update",
    value: function () {
      var _update2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(params) {
        var _this$_deps$extension4, _this$_deps$extension5, ownerId, response, data, _ref4, newDndStatus, _t;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              _context2.p = 0;
              if ((_this$_deps$extension4 = this._deps.extensionFeatures.features) === null || _this$_deps$extension4 === void 0 ? void 0 : (_this$_deps$extension5 = _this$_deps$extension4.EditPresenceStatus) === null || _this$_deps$extension5 === void 0 ? void 0 : _this$_deps$extension5.available) {
                _context2.n = 1;
                break;
              }
              return _context2.a(2);
            case 1:
              ownerId = this._deps.auth.ownerId;
              _context2.n = 2;
              return this._deps.client.service.platform().put('/restapi/v1.0/account/~/extension/~/presence', params);
            case 2:
              response = _context2.v;
              _context2.n = 3;
              return response === null || response === void 0 ? void 0 : response.json();
            case 3:
              data = _context2.v;
              if (ownerId === this._deps.auth.ownerId) {
                newDndStatus = (_ref4 = data.dndStatus !== 'Unknown' && data.dndStatus) !== null && _ref4 !== void 0 ? _ref4 : this.data.dndStatus;
                this._setLastDndStatus(this._calculateLastDndStatus(newDndStatus));
                this._updateData({
                  presenceStatus: data.presenceStatus,
                  userStatus: data.userStatus,
                  telephonyStatus: data.telephonyStatus,
                  dndStatus: newDndStatus,
                  meetingStatus: data.meetingStatus
                });
              }
              _context2.n = 5;
              break;
            case 4:
              _context2.p = 4;
              _t = _context2.v;
              console.error('put presence failed', _t);
            case 5:
              return _context2.a(2);
          }
        }, _callee2, this, [[0, 4]]);
      }));
      function _update(_x) {
        return _update2.apply(this, arguments);
      }
      return _update;
    }()
  }, {
    key: "_updateData",
    value: function () {
      var _updateData2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(data) {
        var timestamp,
          _args3 = arguments;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              timestamp = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : Date.now();
              this._deps.dataFetcherV2.updateData(this._source, _objectSpread(_objectSpread({}, this.data), data), timestamp);
            case 1:
              return _context3.a(2);
          }
        }, _callee3, this);
      }));
      function _updateData(_x2) {
        return _updateData2.apply(this, arguments);
      }
      return _updateData;
    }()
  }, {
    key: "_getUpdateStatusParams",
    value: function _getUpdateStatusParams(userStatus) {
      var params = {
        dndStatus: this.dndStatus,
        userStatus: userStatus
      };
      if (params.dndStatus !== _dndStatus.dndStatus.takeAllCalls && params.dndStatus !== _dndStatus.dndStatus.doNotAcceptDepartmentCalls) {
        var _this$lastDndStatus;
        params.dndStatus = (_this$lastDndStatus = this.lastDndStatus) !== null && _this$lastDndStatus !== void 0 ? _this$lastDndStatus : _dndStatus.dndStatus.takeAllCalls;
      }
      return params;
    }
  }, {
    key: "setAvailable",
    value: function () {
      var _setAvailable = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
        var params;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              if (!(this.userStatus === _presenceStatus.presenceStatus.available && this.dndStatus !== _dndStatus.dndStatus.doNotAcceptAnyCalls)) {
                _context4.n = 1;
                break;
              }
              return _context4.a(2);
            case 1:
              params = this._getUpdateStatusParams(_presenceStatus.presenceStatus.available);
              _context4.n = 2;
              return this._update(params);
            case 2:
              return _context4.a(2);
          }
        }, _callee4, this);
      }));
      function setAvailable() {
        return _setAvailable.apply(this, arguments);
      }
      return setAvailable;
    }()
  }, {
    key: "setBusy",
    value: function () {
      var _setBusy = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
        var params;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              if (!(this.userStatus === _presenceStatus.presenceStatus.busy && this.dndStatus !== _dndStatus.dndStatus.doNotAcceptAnyCalls)) {
                _context5.n = 1;
                break;
              }
              return _context5.a(2);
            case 1:
              params = this._getUpdateStatusParams(_presenceStatus.presenceStatus.busy);
              _context5.n = 2;
              return this._update(params);
            case 2:
              return _context5.a(2);
          }
        }, _callee5, this);
      }));
      function setBusy() {
        return _setBusy.apply(this, arguments);
      }
      return setBusy;
    }()
  }, {
    key: "setDoNotDisturb",
    value: function () {
      var _setDoNotDisturb = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
        var params;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              if (!(this.dndStatus === _dndStatus.dndStatus.doNotAcceptAnyCalls)) {
                _context6.n = 1;
                break;
              }
              return _context6.a(2);
            case 1:
              params = {
                dndStatus: _dndStatus.dndStatus.doNotAcceptAnyCalls
              };
              _context6.n = 2;
              return this._update(params);
            case 2:
              return _context6.a(2);
          }
        }, _callee6, this);
      }));
      function setDoNotDisturb() {
        return _setDoNotDisturb.apply(this, arguments);
      }
      return setDoNotDisturb;
    }()
  }, {
    key: "setInvisible",
    value: function () {
      var _setInvisible = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
        var params;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              if (!(this.userStatus === _presenceStatus.presenceStatus.offline && this.dndStatus !== _dndStatus.dndStatus.doNotAcceptAnyCalls)) {
                _context7.n = 1;
                break;
              }
              return _context7.a(2);
            case 1:
              params = this._getUpdateStatusParams(_presenceStatus.presenceStatus.offline);
              _context7.n = 2;
              return this._update(params);
            case 2:
              return _context7.a(2);
          }
        }, _callee7, this);
      }));
      function setInvisible() {
        return _setInvisible.apply(this, arguments);
      }
      return setInvisible;
    }()
  }, {
    key: "setPresence",
    value: function () {
      var _setPresence = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(presenceData) {
        var _t2;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.n) {
            case 0:
              _t2 = presenceData;
              _context8.n = _t2 === _presenceStatus.presenceStatus.available ? 1 : _t2 === _presenceStatus.presenceStatus.busy ? 3 : _t2 === _dndStatus.dndStatus.doNotAcceptAnyCalls ? 5 : _t2 === _presenceStatus.presenceStatus.offline ? 7 : 9;
              break;
            case 1:
              _context8.n = 2;
              return this.setAvailable();
            case 2:
              return _context8.a(3, 11);
            case 3:
              _context8.n = 4;
              return this.setBusy();
            case 4:
              return _context8.a(3, 11);
            case 5:
              _context8.n = 6;
              return this.setDoNotDisturb();
            case 6:
              return _context8.a(3, 11);
            case 7:
              _context8.n = 8;
              return this.setInvisible();
            case 8:
              return _context8.a(3, 11);
            case 9:
              _context8.n = 10;
              return this.setAvailable();
            case 10:
              return _context8.a(3, 11);
            case 11:
              return _context8.a(2);
          }
        }, _callee8, this);
      }));
      function setPresence(_x3) {
        return _setPresence.apply(this, arguments);
      }
      return setPresence;
    }()
  }, {
    key: "toggleAcceptCallQueueCalls",
    value: function () {
      var _toggleAcceptCallQueueCalls = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9() {
        var _this4 = this;
        var index;
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.n) {
            case 0:
              index = acceptCallQueueToggles.findIndex(function (queueStatus) {
                return _this4.dndStatus === queueStatus;
              });
              if (!(index > -1)) {
                _context9.n = 1;
                break;
              }
              return _context9.a(2, this._update({
                dndStatus: acceptCallQueueToggles[+!index]
              }));
            case 1:
              return _context9.a(2);
          }
        }, _callee9, this);
      }));
      function toggleAcceptCallQueueCalls() {
        return _toggleAcceptCallQueueCalls.apply(this, arguments);
      }
      return toggleAcceptCallQueueCalls;
    }()
  }, {
    key: "sessionIdList",
    get: function get() {
      return (0, _ramda.map)(function (call) {
        return call.sessionId;
      }, this.calls);
    }
  }, {
    key: "telephonyStatus",
    get: function get() {
      var _this$data3;
      return (_this$data3 = this.data) === null || _this$data3 === void 0 ? void 0 : _this$data3.telephonyStatus;
    }
  }, {
    key: "dndStatus",
    get: function get() {
      var _this$data4;
      return (_this$data4 = this.data) === null || _this$data4 === void 0 ? void 0 : _this$data4.dndStatus;
    }
  }, {
    key: "userStatus",
    get: function get() {
      var _this$data5;
      // for displaying the presence, we should use presenceStatus instead
      return (_this$data5 = this.data) === null || _this$data5 === void 0 ? void 0 : _this$data5.presenceStatus;
    }
  }, {
    key: "presenceStatus",
    get: function get() {
      var _this$data6;
      return (_this$data6 = this.data) === null || _this$data6 === void 0 ? void 0 : _this$data6.presenceStatus;
    }
  }, {
    key: "meetingStatus",
    get: function get() {
      var _this$data7;
      return (_this$data7 = this.data) === null || _this$data7 === void 0 ? void 0 : _this$data7.meetingStatus;
    }
  }, {
    key: "presenceOption",
    get: function get() {
      // doNotDisturb
      if (this.dndStatus === _dndStatus.dndStatus.doNotAcceptAnyCalls) {
        return _dndStatus.dndStatus.doNotAcceptAnyCalls;
      }

      // busy
      if (this.userStatus === _presenceStatus.presenceStatus.busy) {
        return _presenceStatus.presenceStatus.busy;
      }

      // invisible
      if (this.userStatus === _presenceStatus.presenceStatus.offline) {
        return _presenceStatus.presenceStatus.offline;
      }

      // available
      return _presenceStatus.presenceStatus.available;
    }

    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "fetchData",
    value: function () {
      var _fetchData = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0() {
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.n) {
            case 0:
              this._debouncedFetchData.cancel();
              return _context0.a(2, this._deps.dataFetcherV2.fetchData(this._source));
          }
        }, _callee0, this);
      }));
      function fetchData() {
        return _fetchData.apply(this, arguments);
      }
      return fetchData;
    }()
  }]);
}(_DataFetcherV.DataFetcherV2Consumer), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "lastDndStatus", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_setLastDndStatus", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setLastDndStatus"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "activeCalls", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "activeCalls"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "calls", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "calls"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_update", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_update"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_updateData", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateData"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "sessionIdList", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "sessionIdList"), _class2.prototype), _class2)) || _class);
//# sourceMappingURL=Presence.js.map
