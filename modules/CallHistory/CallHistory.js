"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.find-index.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.bind.js");
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
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallHistory = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.some.js");
require("core-js/modules/es.array.sort.js");
require("core-js/modules/es.date.now.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.trim.js");
require("core-js/modules/web.dom-collections.for-each.js");
var _core = require("@ringcentral-integration/core");
var _ramda = require("ramda");
var _trackEvents = require("../../enums/trackEvents");
var _callLogHelpers = require("../../lib/callLogHelpers");
var _debounce = _interopRequireDefault(require("../../lib/debounce"));
var _di = require("../../lib/di");
var _normalizeNumber = require("../../lib/normalizeNumber");
var _proxify = require("../../lib/proxy/proxify");
var _CallingSettings = require("../CallingSettings");
var _callHistoryHelper = require("./callHistoryHelper");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
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
var DEFAULT_CLEAN_TIME = 24 * 60 * 60 * 1000; // 1 day
var CallHistory = exports.CallHistory = (_dec = (0, _di.Module)({
  name: 'CallHistory',
  deps: ['AccountInfo', 'CallLog', 'Storage', {
    dep: 'CallMonitor',
    optional: true
  }, {
    dep: 'ActivityMatcher',
    optional: true
  }, {
    dep: 'ContactMatcher',
    optional: true
  }, {
    dep: 'TabManager',
    optional: true
  }, {
    dep: 'CallHistoryOptions',
    optional: true
  }]
}), _dec2 = (0, _core.track)(_trackEvents.trackEvents.clickToSMSCallHistory), _dec3 = (0, _core.track)(function (that) {
  var _callingSettings;
  return [((_callingSettings = that.parentModule.callingSettings) === null || _callingSettings === void 0 ? void 0 : _callingSettings.callingMode) === _CallingSettings.callingModes.ringout ? _trackEvents.trackEvents.clickToDialCallHistoryWithRingOut : _trackEvents.trackEvents.clickToDialCallHistory];
}), _dec4 = (0, _core.computed)(function (that) {
  return [that._deps.callLog.calls, that._deps.accountInfo.countryCode];
}), _dec5 = (0, _core.computed)(function (that) {
  var _that$_deps$contactMa, _that$_deps$activityM, _that$_deps$callMonit;
  return [that.normalizedCalls, that.endedCalls, (_that$_deps$contactMa = that._deps.contactMatcher) === null || _that$_deps$contactMa === void 0 ? void 0 : _that$_deps$contactMa.dataMapping, (_that$_deps$activityM = that._deps.activityMatcher) === null || _that$_deps$activityM === void 0 ? void 0 : _that$_deps$activityM.dataMapping, (_that$_deps$callMonit = that._deps.callMonitor) === null || _that$_deps$callMonit === void 0 ? void 0 : _that$_deps$callMonit.callMatched];
}), _dec6 = (0, _core.computed)(function (that) {
  var _that$_deps$activityM2;
  return [that.filterCalls, (_that$_deps$activityM2 = that._deps.activityMatcher) === null || _that$_deps$activityM2 === void 0 ? void 0 : _that$_deps$activityM2.dataMapping];
}), _dec7 = (0, _core.computed)(function (that) {
  return [that.normalizedCalls, that.endedCalls];
}), _dec8 = (0, _core.computed)(function (that) {
  return [that._deps.callLog.calls, that.endedCalls];
}), _dec9 = (0, _core.computed)(function (that) {
  return [that.searchInput, that.calls, that.filteredCalls];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  function CallHistory(deps) {
    var _deps$callHistoryOpti, _deps$callHistoryOpti2, _this$_deps$callHisto, _this$_deps$callHisto2, _this$_deps$activityM;
    var _this;
    _classCallCheck(this, CallHistory);
    _this = _callSuper(this, CallHistory, [{
      deps: deps,
      storageKey: 'CallHistory',
      enableCache: (_deps$callHistoryOpti = (_deps$callHistoryOpti2 = deps.callHistoryOptions) === null || _deps$callHistoryOpti2 === void 0 ? void 0 : _deps$callHistoryOpti2.enableCache) !== null && _deps$callHistoryOpti !== void 0 ? _deps$callHistoryOpti : true
    }]);
    _this._debouncedSearch = (0, _debounce["default"])(_this.callsSearch, 230, false);
    _initializerDefineProperty(_this, "endedCalls", _descriptor, _this);
    _initializerDefineProperty(_this, "searchInput", _descriptor2, _this);
    _initializerDefineProperty(_this, "filteredCalls", _descriptor3, _this);
    // The call logs which has been removed from remote
    // The marked telephonySessionId should not been added to ended calls afterwards.
    _initializerDefineProperty(_this, "markedList", _descriptor4, _this);
    var enableContactMatchInCallHistory = (_this$_deps$callHisto = (_this$_deps$callHisto2 = _this._deps.callHistoryOptions) === null || _this$_deps$callHisto2 === void 0 ? void 0 : _this$_deps$callHisto2.enableContactMatchInCallHistory) !== null && _this$_deps$callHisto !== void 0 ? _this$_deps$callHisto : true;
    if (enableContactMatchInCallHistory && _this._deps.contactMatcher) {
      _this._deps.contactMatcher.addQuerySource({
        getQueriesFn: function getQueriesFn() {
          return _this.uniqueNumbers;
        },
        readyCheckFn: function readyCheckFn() {
          return (!_this._deps.callMonitor || _this._deps.callMonitor.ready) && (!_this._deps.tabManager || _this._deps.tabManager.ready) && _this._deps.callLog.ready && _this._deps.accountInfo.ready;
        }
      });
    }
    (_this$_deps$activityM = _this._deps.activityMatcher) === null || _this$_deps$activityM === void 0 ? void 0 : _this$_deps$activityM.addQuerySource({
      getQueriesFn: function getQueriesFn() {
        return _this.sessionIds;
      },
      readyCheckFn: function readyCheckFn() {
        return (!_this._deps.callMonitor || _this._deps.callMonitor.ready) && (!_this._deps.tabManager || _this._deps.tabManager.ready) && _this._deps.callLog.ready;
      }
    });
    return _this;
  }
  _inherits(CallHistory, _RcModuleV);
  return _createClass(CallHistory, [{
    key: "filterSuccess",
    value: function filterSuccess() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      this.filteredCalls = data;
    }
  }, {
    key: "setSearchInput",
    value: function setSearchInput() {
      var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      this.searchInput = input;
    }
  }, {
    key: "setEndedCalls",
    value: function setEndedCalls(endedCalls, timestamp) {
      var _this2 = this;
      (0, _ramda.forEach)(function (call) {
        var callWithDuration = _objectSpread(_objectSpread({}, call), {}, {
          // @ts-expect-error TS(2532): Object is possibly 'undefined'.
          duration: Math.floor((timestamp - call.startTime) / 1000)
        });
        var idx = (0, _ramda.findIndex)(function (item) {
          return item.telephonySessionId === call.telephonySessionId;
        }, _this2.endedCalls);
        if (idx > -1) {
          // replace old one if found
          _this2.endedCalls[idx] = callWithDuration;
        } else {
          _this2.endedCalls.push(callWithDuration);
        }
      }, endedCalls);
    }
  }, {
    key: "removeEndedCalls",
    value: function removeEndedCalls(endedCalls) {
      this.endedCalls = this.endedCalls.filter(function (call) {
        return !(endedCalls.find(function (_ref) {
          var telephonySessionId = _ref.telephonySessionId;
          return telephonySessionId === call.telephonySessionId;
        }) ||
        // clean current overdue ended call (default clean time: 1day).
        // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        Date.now() - call.startTime > DEFAULT_CLEAN_TIME);
      });
    }
  }, {
    key: "cleanEndedCalls",
    value: function cleanEndedCalls() {
      this.endedCalls = [];
    }
  }, {
    key: "removeAllEndedCalls",
    value: function removeAllEndedCalls() {
      this.endedCalls = [];
      this.markedList = [];
      this.markRemoved();
    }
  }, {
    key: "markRemoved",
    value: function markRemoved() {
      this.markedList = this.markedList.concat(this._deps.callMonitor.calls);
    }
  }, {
    key: "onInitOnce",
    value: function onInitOnce() {
      var _this3 = this;
      if (this._deps.contactMatcher) {
        (0, _core.watch)(this, function () {
          return _this3.uniqueNumbers;
        }, function () {
          if (_this3.ready && (!_this3._deps.tabManager || _this3._deps.tabManager.active) &&
          // @ts-expect-error TS(2532): Object is possibly 'undefined'.
          _this3._deps.contactMatcher.ready) {
            // @ts-expect-error TS(2532): Object is possibly 'undefined'.
            _this3._deps.contactMatcher.triggerMatch();
          }
        });
      }
      if (this._deps.activityMatcher) {
        (0, _core.watch)(this, function () {
          return [_this3.ready, _this3.sessionIds];
        }, function () {
          if (_this3.ready && (!_this3._deps.tabManager || _this3._deps.tabManager.active) &&
          // @ts-expect-error TS(2532): Object is possibly 'undefined'.
          _this3._deps.activityMatcher.ready) {
            // @ts-expect-error TS(2532): Object is possibly 'undefined'.
            _this3._deps.activityMatcher.triggerMatch();
          }
        }, {
          multiple: true
        });
      }
      this._deps.callMonitor && (0, _core.watch)(this, function () {
        return _this3._deps.callMonitor.calls;
      }, function (newMonitorCalls, oldMonitorCalls) {
        if (!_this3.ready) return;
        var endedCalls = (oldMonitorCalls || []).filter(function (call) {
          return !newMonitorCalls.find(function (currentCall) {
            return call.telephonySessionId === currentCall.telephonySessionId;
          }) &&
          // if the call's callLog has been fetch, skip
          !_this3._deps.callLog.calls.find(function (currentCall) {
            return call.telephonySessionId === currentCall.telephonySessionId;
          }) &&
          // if delete all during active call
          !_this3.markedList.find(function (currentCall) {
            var flag = call.telephonySessionId === currentCall.telephonySessionId;
            return flag;
          });
        });
        if (endedCalls.length) {
          _this3._addEndedCalls(endedCalls);
        }
      });
      (0, _core.watch)(this,
      // use watch multiple, because this.ready is async, can't become true in time, so need watch this.ready, too
      function () {
        return [_this3._deps.callLog.calls, _this3.ready];
      }, function (_ref2) {
        var _ref3 = _slicedToArray(_ref2, 2),
          _ref3$ = _ref3[0],
          currentCalls = _ref3$ === void 0 ? [] : _ref3$,
          ready = _ref3[1];
        if (!ready) return;
        var ids = {};
        // @ts-expect-error TS(2339): Property 'forEach' does not exist on type 'boolean... Remove this comment to see the full error message
        currentCalls.forEach(function (call) {
          ids[call.telephonySessionId] = true;
        });
        var shouldRemovedCalls = _this3.endedCalls.filter(
        // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
        function (call) {
          return ids[call.telephonySessionId];
        });
        if (shouldRemovedCalls.length) {
          _this3.removeEndedCalls(shouldRemovedCalls);
        }
      }, {
        multiple: true
      });
    }
  }, {
    key: "onReset",
    value: function onReset() {
      this.setSearchInput('');
      this.cleanEndedCalls();
    }
  }, {
    key: "_addEndedCalls",
    value: function _addEndedCalls(endedCalls) {
      endedCalls.forEach(function (call) {
        // TODO: refactor with immutable data update
        call.result = 'Disconnected';
        call.isRecording = false;
        call.warmTransferInfo = undefined;
      });
      this.setEndedCalls(endedCalls, Date.now());
      this._deps.callLog.sync();
    }

    // TODO: move to UI module
    // for track click to sms in call history
  }, {
    key: "onClickToSMS",
    value: function () {
      var _onClickToSMS = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              return _context.a(2);
          }
        }, _callee);
      }));
      function onClickToSMS() {
        return _onClickToSMS.apply(this, arguments);
      }
      return onClickToSMS;
    }() // TODO: move to UI module
    // for track click to call in call history
  }, {
    key: "onClickToCall",
    value: function () {
      var _onClickToCall = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              return _context2.a(2);
          }
        }, _callee2);
      }));
      function onClickToCall() {
        return _onClickToCall.apply(this, arguments);
      }
      return onClickToCall;
    }()
  }, {
    key: "updateSearchInput",
    value: function () {
      var _updateSearchInput = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(input) {
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              this.setSearchInput(input);
            case 1:
              return _context3.a(2);
          }
        }, _callee3, this);
      }));
      function updateSearchInput(_x) {
        return _updateSearchInput.apply(this, arguments);
      }
      return updateSearchInput;
    }()
  }, {
    key: "normalizedCalls",
    get: function get() {
      var _this4 = this;
      return this._deps.callLog.calls.map(function (call) {
        var callFrom = _objectSpread({}, call.from);
        if (callFrom.phoneNumber) {
          callFrom.phoneNumber = (0, _normalizeNumber.normalizeNumber)({
            phoneNumber: callFrom.phoneNumber,
            countryCode: _this4._deps.accountInfo.countryCode,
            maxExtensionLength: _this4._deps.accountInfo.maxExtensionNumberLength
          });
        }
        var callTo = _objectSpread({}, call.to);
        if (callTo.phoneNumber) {
          callTo.phoneNumber = (0, _normalizeNumber.normalizeNumber)({
            phoneNumber: callTo.phoneNumber,
            countryCode: _this4._deps.accountInfo.countryCode,
            maxExtensionLength: _this4._deps.accountInfo.maxExtensionNumberLength
          });
        }
        return _objectSpread(_objectSpread({}, call), {}, {
          from: callFrom,
          to: callTo
        });
      }).sort(_callLogHelpers.sortByStartTime);
    }
  }, {
    key: "enableFullPhoneNumberMatch",
    get: function get() {
      var _this$_deps$callHisto3, _this$_deps$callHisto4;
      return (_this$_deps$callHisto3 = (_this$_deps$callHisto4 = this._deps.callHistoryOptions) === null || _this$_deps$callHisto4 === void 0 ? void 0 : _this$_deps$callHisto4.enableFullPhoneNumberMatch) !== null && _this$_deps$callHisto3 !== void 0 ? _this$_deps$callHisto3 : false;
    }

    /**
     * Allow sub class to have different find matches logic.
     * @param contactMapping
     * @param call
     * @returns
     */
  }, {
    key: "findMatches",
    value: function findMatches(contactMapping, call) {
      var pickNumber = this.enableFullPhoneNumberMatch ? _callHistoryHelper.pickFullPhoneNumber : _callHistoryHelper.pickPhoneOrExtensionNumber;
      var fromNumber =
      // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
      call.from && pickNumber(call.from.phoneNumber, call.from.extensionNumber);
      var toNumber =
      // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
      call.to && pickNumber(call.to.phoneNumber, call.to.extensionNumber);
      var fromMatches = fromNumber && contactMapping[fromNumber] || [];
      var toMatches = toNumber && contactMapping[toNumber] || [];
      return {
        fromMatches: fromMatches,
        toMatches: toMatches
      };
    }
  }, {
    key: "calls",
    get: function get() {
      var _this$_deps$contactMa,
        _this$_deps$contactMa2,
        _this$_deps$activityM2,
        _this$_deps$activityM3,
        _this$_deps$callMonit,
        _this$_deps$callMonit2,
        _this5 = this;
      var contactMapping = (_this$_deps$contactMa = (_this$_deps$contactMa2 = this._deps.contactMatcher) === null || _this$_deps$contactMa2 === void 0 ? void 0 : _this$_deps$contactMa2.dataMapping) !== null && _this$_deps$contactMa !== void 0 ? _this$_deps$contactMa : {};
      var activityMapping = (_this$_deps$activityM2 = (_this$_deps$activityM3 = this._deps.activityMatcher) === null || _this$_deps$activityM3 === void 0 ? void 0 : _this$_deps$activityM3.dataMapping) !== null && _this$_deps$activityM2 !== void 0 ? _this$_deps$activityM2 : {};
      var callMatched = (_this$_deps$callMonit = (_this$_deps$callMonit2 = this._deps.callMonitor) === null || _this$_deps$callMonit2 === void 0 ? void 0 : _this$_deps$callMonit2.callMatched) !== null && _this$_deps$callMonit !== void 0 ? _this$_deps$callMonit : {};
      var telephonySessionIds = {};
      var calls = this.normalizedCalls.map(function (call) {
        // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
        telephonySessionIds[call.telephonySessionId] = true;
        // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        var fromName = call.from.name || call.from.phoneNumber;
        var toName = call.to.name || call.to.phoneNumber;
        // @ts-expect-error TS(2345): Argument of type 'ActiveCall' is not assignable to... Remove this comment to see the full error message
        var _this5$findMatches = _this5.findMatches(contactMapping, call),
          fromMatches = _this5$findMatches.fromMatches,
          toMatches = _this5$findMatches.toMatches;
        // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
        var activityMatches = activityMapping[call.sessionId] || [];
        // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
        var matched = callMatched[call.sessionId];
        return _objectSpread(_objectSpread({}, call), {}, {
          fromName: fromName,
          toName: toName,
          fromMatches: fromMatches,
          toMatches: toMatches,
          activityMatches: activityMatches,
          toNumberEntity: matched
        });
      });
      var filteredEndedCalls = this.endedCalls
      // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
      .filter(function (call) {
        return !telephonySessionIds[call.telephonySessionId];
      }).map(function (call) {
        var activityMatches = activityMapping[call.sessionId] || [];
        var fromNumber = call.from && (call.from.phoneNumber || call.from.extensionNumber);
        var toNumber = call.to && (call.to.phoneNumber || call.to.extensionNumber);
        var fromMatches = fromNumber && contactMapping[fromNumber] || [];
        var toMatches = toNumber && contactMapping[toNumber] || [];
        return _objectSpread(_objectSpread({}, call), {}, {
          activityMatches: activityMatches,
          fromMatches: fromMatches,
          toMatches: toMatches
        });
      });
      return [].concat(_toConsumableArray(filteredEndedCalls), _toConsumableArray(calls)).sort(_callLogHelpers.sortByStartTime);
    }
  }, {
    key: "debouncedSearch",
    value: function () {
      var _debouncedSearch = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
        var _this$_debouncedSearc;
        var _len,
          args,
          _key,
          _args4 = arguments;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              for (_len = _args4.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = _args4[_key];
              }
              (_this$_debouncedSearc = this._debouncedSearch).call.apply(_this$_debouncedSearc, [this].concat(args));
            case 1:
              return _context4.a(2);
          }
        }, _callee4, this);
      }));
      function debouncedSearch() {
        return _debouncedSearch.apply(this, arguments);
      }
      return debouncedSearch;
    }()
  }, {
    key: "callsSearch",
    value: function () {
      var _callsSearch = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
        var calls, searchInput, effectSearchStr, data;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              if (!(this.searchInput === '')) {
                _context5.n = 1;
                break;
              }
              return _context5.a(2);
            case 1:
              calls = this.calls;
              searchInput = this.searchInput;
              effectSearchStr = searchInput.toLowerCase().trim();
              data = calls.filter(function (call) {
                // @ts-expect-error TS(2345): Argument of type 'HistoryCall' is not assignable t... Remove this comment to see the full error message
                var _getPhoneNumberMatche = (0, _callLogHelpers.getPhoneNumberMatches)(call),
                  phoneNumber = _getPhoneNumberMatche.phoneNumber,
                  matches = _getPhoneNumberMatche.matches;
                // @ts-expect-error TS(2533): Object is possibly 'null' or 'undefined'.
                var matchesMatched = matches.some(function (entities) {
                  if (!entities || !entities.id) return false;
                  if (entities.name && entities.name.toLowerCase().indexOf(effectSearchStr) > -1) return true;
                  if (entities.phone && entities.phone.indexOf(effectSearchStr) > -1) return true;
                  return false;
                });
                if (matchesMatched) {
                  return true;
                }
                if (phoneNumber && phoneNumber.indexOf(effectSearchStr) > -1) {
                  return true;
                }
                return false;
              }).sort(_callLogHelpers.sortByStartTime);
              this.filterSuccess(data);
            case 2:
              return _context5.a(2);
          }
        }, _callee5, this);
      }));
      function callsSearch() {
        return _callsSearch.apply(this, arguments);
      }
      return callsSearch;
    }()
  }, {
    key: "latestCalls",
    get: function get() {
      var _this$_deps$activityM4,
        _this6 = this;
      if ((_this$_deps$activityM4 = this._deps.activityMatcher) === null || _this$_deps$activityM4 === void 0 ? void 0 : _this$_deps$activityM4.dataMapping) {
        var newCalls = this.filterCalls.map(function (call) {
          var _this6$_deps$activity;
          return _objectSpread(_objectSpread({}, call), {}, {
            activityMatches:
            // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
            ((_this6$_deps$activity = _this6._deps.activityMatcher) === null || _this6$_deps$activity === void 0 ? void 0 : _this6$_deps$activity.dataMapping[call.sessionId]) || []
          });
        });
        return newCalls;
      }
      return this.filterCalls;
    }
  }, {
    key: "uniqueNumbers",
    get: function get() {
      var output = [];
      var numberMap = {};
      this.normalizedCalls.forEach(
      // @ts-expect-error TS(2345): Argument of type '(call: Call) => void' is not ass... Remove this comment to see the full error message
      (0, _callHistoryHelper.addNumbersFromCall)(output, numberMap, this.enableFullPhoneNumberMatch));
      this.endedCalls.forEach((0, _callHistoryHelper.addNumbersFromCall)(output, numberMap, this.enableFullPhoneNumberMatch));
      return output;
    }
  }, {
    key: "sessionIds",
    get: function get() {
      var sessionIds = {};
      return this._deps.callLog.calls.map(function (call) {
        sessionIds[call.sessionId] = true;
        return call.sessionId;
      }).concat(this.endedCalls.filter(function (call) {
        return !sessionIds[call.sessionId];
      }).map(function (call) {
        return call.sessionId;
      }));
    }
  }, {
    key: "filterCalls",
    get: function get() {
      if (this.searchInput === '') {
        return this.calls;
      }
      return this.filteredCalls;
    }

    // TODO: remove recentlyEndedCalls getter, instead of `endedCalls`.
    /**
     * !!Please use `endedCalls` instead of it.
     * @deprecated
     */
  }, {
    key: "recentlyEndedCalls",
    get: function get() {
      return this.endedCalls;
    }
  }]);
}(_core.RcModuleV2), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "endedCalls", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "searchInput", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "filteredCalls", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _applyDecoratedDescriptor(_class2.prototype, "filterSuccess", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "filterSuccess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setSearchInput", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setSearchInput"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setEndedCalls", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setEndedCalls"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "removeEndedCalls", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "removeEndedCalls"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "cleanEndedCalls", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "cleanEndedCalls"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "removeAllEndedCalls", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "removeAllEndedCalls"), _class2.prototype), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "markedList", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _applyDecoratedDescriptor(_class2.prototype, "markRemoved", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "markRemoved"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "onClickToSMS", [_proxify.proxify, _dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "onClickToSMS"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "onClickToCall", [_proxify.proxify, _dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "onClickToCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateSearchInput", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "updateSearchInput"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "normalizedCalls", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "normalizedCalls"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "calls", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "calls"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "debouncedSearch", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "debouncedSearch"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "callsSearch", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "callsSearch"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "latestCalls", [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "latestCalls"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "uniqueNumbers", [_dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "uniqueNumbers"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "sessionIds", [_dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "sessionIds"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "filterCalls", [_dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "filterCalls"), _class2.prototype), _class2)) || _class);
//# sourceMappingURL=CallHistory.js.map
