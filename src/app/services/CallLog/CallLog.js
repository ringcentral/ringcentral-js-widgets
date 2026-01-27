"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.reverse.js");
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
require("core-js/modules/es.reflect.get.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallLog = void 0;
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.array.sort.js");
require("core-js/modules/es.array.splice.js");
require("core-js/modules/es.date.now.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.timers.js");
var _callResults = require("@ringcentral-integration/commons/enums/callResults");
var _subscriptionFilters = require("@ringcentral-integration/commons/enums/subscriptionFilters");
var _syncTypes = require("@ringcentral-integration/commons/enums/syncTypes");
var _callLogHelpers = require("@ringcentral-integration/commons/lib/callLogHelpers");
var _fetchList = _interopRequireDefault(require("@ringcentral-integration/commons/lib/fetchList"));
var _getDateFrom = _interopRequireDefault(require("@ringcentral-integration/commons/lib/getDateFrom"));
var _services = require("@ringcentral-integration/micro-auth/src/app/services");
var _nextCore = require("@ringcentral-integration/next-core");
var _utils = require("@ringcentral-integration/utils");
var _rxjs = require("rxjs");
var _helper = require("./helper");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _class, _class2, _descriptor;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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
function _superPropGet(t, o, e, r) { var p = _get(_getPrototypeOf(1 & r ? t.prototype : t), o, e); return 2 & r && "function" == typeof p ? function (t) { return p.apply(e, t); } : p; }
function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t));); return t; }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
var DEFAULT_TTL = 5 * 60 * 1000;
// Lock fetching on app refresh if lst fetch happened less than this time span
var DEFAULT_REFRESH_LOCK = 3 * 60 * 1000;
var DEFAULT_TOKEN_EXPIRES_IN = 60 * 60 * 1000;
var DEFAULT_DAY_SPAN = 7;
var RECORD_COUNT = 250;
var LIST_RECORD_COUNT = 250;
var DEFAULT_TIME_TO_RETRY = 62 * 1000;
var SYNC_DELAY = 30 * 1000;
// to not use $ at the end, presence with sipData has extra query parameters
var presenceRegExp = /\/presence\?detailedTelephonyState=true/;
var CallLog = exports.CallLog = (_dec = (0, _nextCore.injectable)({
  name: 'CallLog'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.inject)('Subscription')(target, undefined, 4);
}, _dec3 = function _dec3(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 6);
}, _dec4 = function _dec4(target, key) {
  return (0, _nextCore.optional)('CallLogOptions')(target, undefined, 7);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _services.Auth === "undefined" ? Object : _services.Auth, typeof _services.Client === "undefined" ? Object : _services.Client, typeof _services.ExtensionPhoneNumber === "undefined" ? Object : _services.ExtensionPhoneNumber, typeof _services.ExtensionInfo === "undefined" ? Object : _services.ExtensionInfo, typeof Subscription === "undefined" ? Object : Subscription, typeof _services.AppFeatures === "undefined" ? Object : _services.AppFeatures, typeof _nextCore.StoragePlugin === "undefined" ? Object : _nextCore.StoragePlugin, typeof CallLogOptions === "undefined" ? Object : CallLogOptions]), _dec7 = Reflect.metadata("design:type", typeof CallLogData === "undefined" ? Object : CallLogData), _dec8 = Reflect.metadata("design:type", Function), _dec9 = Reflect.metadata("design:paramtypes", []), _dec0 = Reflect.metadata("design:type", Function), _dec1 = Reflect.metadata("design:paramtypes", []), _dec10 = Reflect.metadata("design:type", Function), _dec11 = Reflect.metadata("design:paramtypes", [Number]), _dec12 = Reflect.metadata("design:type", Function), _dec13 = Reflect.metadata("design:paramtypes", [typeof SyncSuccessOptions === "undefined" ? Object : SyncSuccessOptions]), _dec14 = Reflect.metadata("design:type", Function), _dec15 = Reflect.metadata("design:paramtypes", []), _dec16 = (0, _nextCore.delegate)('server'), _dec17 = Reflect.metadata("design:type", Function), _dec18 = Reflect.metadata("design:paramtypes", [typeof Pick === "undefined" ? Object : Pick]), _dec19 = (0, _nextCore.delegate)('server'), _dec20 = Reflect.metadata("design:type", Function), _dec21 = Reflect.metadata("design:paramtypes", []), _dec22 = (0, _nextCore.delegate)('server'), _dec23 = Reflect.metadata("design:type", Function), _dec24 = Reflect.metadata("design:paramtypes", []), _dec25 = (0, _nextCore.delegate)('server'), _dec26 = Reflect.metadata("design:type", Function), _dec27 = Reflect.metadata("design:paramtypes", [typeof SyncType === "undefined" ? Object : SyncType]), _dec28 = (0, _nextCore.delegate)('server'), _dec29 = Reflect.metadata("design:type", Function), _dec30 = Reflect.metadata("design:paramtypes", [void 0]), _dec31 = (0, _nextCore.delegate)('server'), _dec32 = Reflect.metadata("design:type", Function), _dec33 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = (_class2 = /*#__PURE__*/function (_RcModule) {
  function CallLog(_auth, _client, _extensionPhoneNumber, _extensionInfo, _subscription, _appFeatures, _storage, _callLogOptions) {
    var _this$_callLogOptions, _this$_callLogOptions2;
    var _this;
    _classCallCheck(this, CallLog);
    _this = _callSuper(this, CallLog);
    _this._auth = _auth;
    _this._client = _client;
    _this._extensionPhoneNumber = _extensionPhoneNumber;
    _this._extensionInfo = _extensionInfo;
    _this._subscription = _subscription;
    _this._appFeatures = _appFeatures;
    _this._storage = _storage;
    _this._callLogOptions = _callLogOptions;
    _this._promise = null;
    _this._queueSync = null;
    _this._timeoutId = null;
    _this._handleSyncApiError = null;
    _initializerDefineProperty(_this, "data", _descriptor, _this);
    var disableCache = (_this$_callLogOptions = (_this$_callLogOptions2 = _this._callLogOptions) === null || _this$_callLogOptions2 === void 0 ? void 0 : _this$_callLogOptions2.disableCache) !== null && _this$_callLogOptions !== void 0 ? _this$_callLogOptions : false;
    if (!disableCache) {
      var _this$_storage;
      (_this$_storage = _this._storage) === null || _this$_storage === void 0 ? void 0 : _this$_storage.enable(_this);
    }
    _this._subscription.register(_this, {
      filters: [_subscriptionFilters.subscriptionFilters.detailedPresence]
    });
    return _this;
  }
  _inherits(CallLog, _RcModule);
  return _createClass(CallLog, [{
    key: "resetData",
    value: function resetData() {
      this.data = {
        list: [],
        map: {},
        token: null,
        timestamp: null
      };
    }
  }, {
    key: "clearToken",
    value: function clearToken() {
      this.data.token = null;
      this.data.timestamp = null;
    }
  }, {
    key: "filterExpiredCalls",
    value: function filterExpiredCalls(daySpan) {
      var _this2 = this;
      if (daySpan) {
        var cutOffTime = (0, _getDateFrom["default"])(daySpan).getTime();
        var newList = [];
        this.data.list.forEach(function (id) {
          var call = _this2.data.map[id];
          if (call.startTime > cutOffTime) {
            newList.push(id);
          } else {
            delete _this2.data.map[id];
          }
        });
        this.data.list = newList;
      }
    }
  }, {
    key: "syncSuccess",
    value: function syncSuccess(_ref) {
      var _this3 = this;
      var timestamp = _ref.timestamp,
        syncToken = _ref.syncToken,
        _ref$records = _ref.records,
        records = _ref$records === void 0 ? [] : _ref$records,
        _ref$supplementRecord = _ref.supplementRecords,
        supplementRecords = _ref$supplementRecord === void 0 ? [] : _ref$supplementRecord,
        daySpan = _ref.daySpan;
      this.data.timestamp = timestamp;
      this.data.token = syncToken || '';
      var newState = [];
      var cutOffTime = daySpan && (0, _getDateFrom["default"])(daySpan).getTime();
      // filter old calls
      this.data.list.forEach(function (id) {
        var call = _this3.data.map[id];
        if (call.startTime > cutOffTime) {
          newState.push(id);
        } else {
          delete _this3.data.map[id];
        }
      });
      (0, _helper.processRecords)(records, supplementRecords).forEach(function (call) {
        var checkState = _this3._limitDaySpan && call.startTime > cutOffTime || !_this3._limitDaySpan;
        if (checkState) {
          if (!_this3.data.map[call.id]) {
            newState.push(call.id);
          }
          _this3.data.map[call.id] = call;
          if (_this3._enableDeleted && call.deleted) {
            var index = newState.indexOf(call.id);
            if (index > -1) {
              newState.splice(index, 1);
            }
            delete _this3.data.map[call.id];
          }
        }
      });
      this.data.list = newState;
    }
  }, {
    key: "_ttl",
    get: function get() {
      var _this$_callLogOptions3, _this$_callLogOptions4;
      return (_this$_callLogOptions3 = (_this$_callLogOptions4 = this._callLogOptions) === null || _this$_callLogOptions4 === void 0 ? void 0 : _this$_callLogOptions4.ttl) !== null && _this$_callLogOptions3 !== void 0 ? _this$_callLogOptions3 : DEFAULT_TTL;
    }
  }, {
    key: "_refreshLock",
    get: function get() {
      var _this$_callLogOptions5, _this$_callLogOptions6;
      return (_this$_callLogOptions5 = (_this$_callLogOptions6 = this._callLogOptions) === null || _this$_callLogOptions6 === void 0 ? void 0 : _this$_callLogOptions6.refreshLock) !== null && _this$_callLogOptions5 !== void 0 ? _this$_callLogOptions5 : DEFAULT_REFRESH_LOCK;
    }
  }, {
    key: "_tokenExpiresIn",
    get: function get() {
      var _this$_callLogOptions7, _this$_callLogOptions8;
      return (_this$_callLogOptions7 = (_this$_callLogOptions8 = this._callLogOptions) === null || _this$_callLogOptions8 === void 0 ? void 0 : _this$_callLogOptions8.tokenExpiresIn) !== null && _this$_callLogOptions7 !== void 0 ? _this$_callLogOptions7 : DEFAULT_TOKEN_EXPIRES_IN;
    }
  }, {
    key: "_timeToRetry",
    get: function get() {
      var _this$_callLogOptions9, _this$_callLogOptions0;
      return (_this$_callLogOptions9 = (_this$_callLogOptions0 = this._callLogOptions) === null || _this$_callLogOptions0 === void 0 ? void 0 : _this$_callLogOptions0.timeToRetry) !== null && _this$_callLogOptions9 !== void 0 ? _this$_callLogOptions9 : DEFAULT_TIME_TO_RETRY;
    }
  }, {
    key: "_limitDaySpan",
    get: function get() {
      var _this$_callLogOptions1, _this$_callLogOptions10;
      return (_this$_callLogOptions1 = (_this$_callLogOptions10 = this._callLogOptions) === null || _this$_callLogOptions10 === void 0 ? void 0 : _this$_callLogOptions10.limitDaySpan) !== null && _this$_callLogOptions1 !== void 0 ? _this$_callLogOptions1 : true;
    }
  }, {
    key: "_limitSupplement",
    get: function get() {
      var _this$_callLogOptions11, _this$_callLogOptions12;
      return (_this$_callLogOptions11 = (_this$_callLogOptions12 = this._callLogOptions) === null || _this$_callLogOptions12 === void 0 ? void 0 : _this$_callLogOptions12.limitSupplementList) !== null && _this$_callLogOptions11 !== void 0 ? _this$_callLogOptions11 : false;
    }
  }, {
    key: "_daySpan",
    get: function get() {
      if (this._limitDaySpan) {
        var _this$_callLogOptions13, _this$_callLogOptions14;
        return (_this$_callLogOptions13 = (_this$_callLogOptions14 = this._callLogOptions) === null || _this$_callLogOptions14 === void 0 ? void 0 : _this$_callLogOptions14.daySpan) !== null && _this$_callLogOptions13 !== void 0 ? _this$_callLogOptions13 : DEFAULT_DAY_SPAN;
      }
      return 0;
    }
  }, {
    key: "_polling",
    get: function get() {
      var _this$_callLogOptions15, _this$_callLogOptions16;
      return (_this$_callLogOptions15 = (_this$_callLogOptions16 = this._callLogOptions) === null || _this$_callLogOptions16 === void 0 ? void 0 : _this$_callLogOptions16.polling) !== null && _this$_callLogOptions15 !== void 0 ? _this$_callLogOptions15 : true;
    }
  }, {
    key: "_isLimitList",
    get: function get() {
      var _this$_callLogOptions17, _this$_callLogOptions18;
      return (_this$_callLogOptions17 = (_this$_callLogOptions18 = this._callLogOptions) === null || _this$_callLogOptions18 === void 0 ? void 0 : _this$_callLogOptions18.isLimitList) !== null && _this$_callLogOptions17 !== void 0 ? _this$_callLogOptions17 : true;
    }
  }, {
    key: "_listRecordCount",
    get: function get() {
      var _this$_callLogOptions19, _this$_callLogOptions20;
      return (_this$_callLogOptions19 = (_this$_callLogOptions20 = this._callLogOptions) === null || _this$_callLogOptions20 === void 0 ? void 0 : _this$_callLogOptions20.listRecordCount) !== null && _this$_callLogOptions19 !== void 0 ? _this$_callLogOptions19 : LIST_RECORD_COUNT;
    }
  }, {
    key: "_recordCount",
    get: function get() {
      var _this$_callLogOptions21, _this$_callLogOptions22;
      return (_this$_callLogOptions21 = (_this$_callLogOptions22 = this._callLogOptions) === null || _this$_callLogOptions22 === void 0 ? void 0 : _this$_callLogOptions22.recordCount) !== null && _this$_callLogOptions21 !== void 0 ? _this$_callLogOptions21 : RECORD_COUNT;
    }
  }, {
    key: "_enableDeleted",
    get: function get() {
      var _this$_callLogOptions23, _this$_callLogOptions24;
      return (_this$_callLogOptions23 = (_this$_callLogOptions24 = this._callLogOptions) === null || _this$_callLogOptions24 === void 0 ? void 0 : _this$_callLogOptions24.enableDeleted) !== null && _this$_callLogOptions23 !== void 0 ? _this$_callLogOptions23 : false;
    }
  }, {
    key: "_shouldInit",
    value: function _shouldInit() {
      return !!(_superPropGet(CallLog, "_shouldInit", this, 3)([]) && this._auth.loggedIn);
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return !!(_superPropGet(CallLog, "_shouldReset", this, 3)([]) || this.ready && !this._auth.loggedIn);
    }
  }, {
    key: "onInit",
    value: function () {
      var _onInit = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              /**
               * old call log data structure migration
               */
              if (_typeof(this.data.list[0]) === 'object') {
                this.resetData();
              }
              this._limitDaySpan && this.filterExpiredCalls(this._daySpan);
              if (this.token && (!this.timestamp || Date.now() - this.timestamp > this._tokenExpiresIn)) {
                this.clearToken();
              }
              _context.n = 1;
              return this.initInternal();
            case 1:
              return _context.a(2);
          }
        }, _callee, this);
      }));
      function onInit() {
        return _onInit.apply(this, arguments);
      }
      return onInit;
    }()
  }, {
    key: "initInternal",
    value: function () {
      var _initInternal = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              if (!this._appFeatures.hasReadExtensionCallLog) {
                _context2.n = 1;
                break;
              }
              _context2.n = 1;
              return this._init();
            case 1:
              return _context2.a(2);
          }
        }, _callee2, this);
      }));
      function initInternal() {
        return _initInternal.apply(this, arguments);
      }
      return initInternal;
    }()
  }, {
    key: "onReset",
    value: function onReset() {
      this._clearTimeout();
      this._promise = null;
      this.resetData();
    }
  }, {
    key: "onInitOnce",
    value: function onInitOnce() {
      var _this4 = this;
      var hasReadExtensionCallLog$ = (0, _nextCore.fromWatchValue)(this, function () {
        return _this4._appFeatures.hasReadExtensionCallLog;
      });
      var haveNewCallEnded$ = this._subscription.fromMessage$(presenceRegExp).pipe((0, _rxjs.filter)(function (data) {
        return Boolean(data.activeCalls && (0, _callLogHelpers.hasEndedCalls)(data.activeCalls));
      }));
      this.readyState$.pipe((0, _rxjs.switchMap)(function () {
        return _this4.ready ? hasReadExtensionCallLog$ : _rxjs.EMPTY;
      }), (0, _rxjs.switchMap)(function (hasReadExtensionCallLog) {
        return hasReadExtensionCallLog ? haveNewCallEnded$ : _rxjs.EMPTY;
      }), (0, _rxjs.delay)(SYNC_DELAY), (0, _rxjs.tap)(function () {
        _this4.logger.log('have new active call ended, wait 30s for sync again');
      }), (0, _rxjs.switchMap)(function () {
        return _this4.sync();
      }), (0, _rxjs.tap)(function () {
        _this4.logger.log('active call ended sync done');
      }), _nextCore.takeUntilAppDestroy).subscribe();
    }
  }, {
    key: "_init",
    value: function () {
      var _init2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
        var _t;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              if (!(!this.timestamp || Date.now() - this.timestamp > this.refreshLock)) {
                _context3.n = 5;
                break;
              }
              _context3.p = 1;
              _context3.n = 2;
              return this.sync();
            case 2:
              _context3.n = 4;
              break;
            case 3:
              _context3.p = 3;
              _t = _context3.v;
              this.logger.log('full sync error', _t);
            case 4:
              _context3.n = 6;
              break;
            case 5:
              if (this._polling) {
                this._startPolling();
              }
            case 6:
              return _context3.a(2);
          }
        }, _callee3, this, [[1, 3]]);
      }));
      function _init() {
        return _init2.apply(this, arguments);
      }
      return _init;
    }()
  }, {
    key: "calls",
    get: function get() {
      var _this5 = this;
      /**
       * old call log data structure migration
       */
      if (_typeof(this.data.list[0]) === 'object') {
        return [];
      }

      // TODO: make sure removeDuplicateIntermediateCalls is necessary here
      var calls = (0, _callLogHelpers.removeInboundRingOutLegs)((0, _callLogHelpers.removeDuplicateIntermediateCalls)(
      // https://developers.ringcentral.com/api-reference/Call-Log/readUserCallLog
      //@ts-ignore
      this.data.list.reduce(function (acc, id) {
        var call = _this5.data.map[id];
        var valid =
        // * in new version of app, only when the call have telephonySessionId will be show in our app
        (process.env.THEME_SYSTEM === 'spring-ui' ? call.telephonySessionId : true) &&
        // [RCINT-3472] calls with result === 'stopped' seems to be useless
        (call === null || call === void 0 ? void 0 : call.result) !== _callResults.callResults.stopped &&
        // [RCINT-51111] calls with result === 'busy'
        (call === null || call === void 0 ? void 0 : call.result) !== _callResults.callResults.busy &&
        // [RCINT-6839]
        // Call processing result is undefined
        (call === null || call === void 0 ? void 0 : call.result) !== _callResults.callResults.unknown &&
        // Outgoing fax sending has failed
        // TODO: Types of Legacy, remove for checking type?
        // @ts-ignore
        (call === null || call === void 0 ? void 0 : call.result) !== _callResults.callResults.faxSendError &&
        // Incoming fax has failed to be received
        (call === null || call === void 0 ? void 0 : call.result) !== _callResults.callResults.faxReceiptError &&
        // Outgoing fax has failed because of no answer
        (call === null || call === void 0 ? void 0 : call.result) !== _callResults.callResults.callFailed &&
        // Error Internal error occurred when receiving fax
        // TODO: Types of Legacy, remove for checking type?
        // @ts-ignore
        (call === null || call === void 0 ? void 0 : call.result) !== _callResults.callResults.faxReceipt;
        if (valid) {
          acc.push(call);
        }
        return acc;
      }, []))).sort(_callLogHelpers.sortByStartTime);
      if (this._isLimitList) {
        return calls.slice(0, this._listRecordCount);
      }
      return calls;
    }
  }, {
    key: "token",
    get: function get() {
      return this.data.token;
    }
  }, {
    key: "timestamp",
    get: function get() {
      return this.data.timestamp;
    }
  }, {
    key: "ttl",
    get: function get() {
      return this._ttl;
    }
  }, {
    key: "refreshLock",
    get: function get() {
      return this._refreshLock;
    }
  }, {
    key: "timeToRetry",
    get: function get() {
      return this._timeToRetry;
    }
  }, {
    key: "_fetch",
    value: function () {
      var _fetch2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(fromToParams) {
        var _this6 = this;
        var perPageParam, fetchFn, data, _t2;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.p = _context4.n) {
            case 0:
              perPageParam = this._isLimitList ? {
                perPage: this._listRecordCount
              } : {};
              fetchFn = function fetchFn(params) {
                return _this6._client.account().extension().callLog().list(_objectSpread(_objectSpread(_objectSpread({}, params), fromToParams), perPageParam));
              };
              if (!this._limitSupplement) {
                _context4.n = 4;
                break;
              }
              _context4.p = 1;
              _context4.n = 2;
              return fetchFn();
            case 2:
              data = _context4.v;
              return _context4.a(2, (data === null || data === void 0 ? void 0 : data.records) || []);
            case 3:
              _context4.p = 3;
              _t2 = _context4.v;
              this.logger.log('callLog._fetch|error', _t2);
            case 4:
              return _context4.a(2, (0, _fetchList["default"])(function (params) {
                return fetchFn(params);
              }));
          }
        }, _callee4, this, [[1, 3]]);
      }));
      function _fetch(_x) {
        return _fetch2.apply(this, arguments);
      }
      return _fetch;
    }()
  }, {
    key: "_iSync",
    value: function () {
      var _iSync2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
        var ownerId, data, _this$_handleSyncApiE, _t3;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.p = _context5.n) {
            case 0:
              ownerId = this._auth.ownerId;
              _context5.p = 1;
              _context5.n = 2;
              return this._client.account().extension().callLogSync().list({
                // TODO: fix type
                // @ts-ignore
                syncType: _syncTypes.syncTypes.iSync,
                syncToken: this.token,
                showDeleted: this._enableDeleted
              });
            case 2:
              data = _context5.v;
              if (!(ownerId !== this._auth.ownerId)) {
                _context5.n = 3;
                break;
              }
              throw Error('request aborted');
            case 3:
              this.syncSuccess(_objectSpread(_objectSpread({}, (0, _helper.processData)(data)), {}, {
                daySpan: this._daySpan
              }));
              _context5.n = 6;
              break;
            case 4:
              _context5.p = 4;
              _t3 = _context5.v;
              if (!(ownerId === this._auth.ownerId)) {
                _context5.n = 6;
                break;
              }
              _context5.n = 5;
              return (_this$_handleSyncApiE = this._handleSyncApiError) === null || _this$_handleSyncApiE === void 0 ? void 0 : _this$_handleSyncApiE.call(this, _t3);
            case 5:
              throw _t3;
            case 6:
              return _context5.a(2);
          }
        }, _callee5, this, [[1, 4]]);
      }));
      function _iSync() {
        return _iSync2.apply(this, arguments);
      }
      return _iSync;
    }()
  }, {
    key: "_fSync",
    value: function () {
      var _fSync2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
        var ownerId, syncParams, data, supplementRecords, _processData, records, timestamp, syncToken, fetchSupplementParams, _this$_handleSyncApiE2, _t4;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.p = _context6.n) {
            case 0:
              ownerId = this._auth.ownerId;
              _context6.p = 1;
              syncParams = this._getSyncParams();
              _context6.n = 2;
              return this._client.account().extension().callLogSync().list(syncParams);
            case 2:
              data = _context6.v;
              if (!(ownerId !== this._auth.ownerId)) {
                _context6.n = 3;
                break;
              }
              throw Error('request aborted');
            case 3:
              _processData = (0, _helper.processData)(data), records = _processData.records, timestamp = _processData.timestamp, syncToken = _processData.syncToken;
              if (!(records.length >= this._recordCount)) {
                _context6.n = 5;
                break;
              }
              fetchSupplementParams = {
                dateTo: (0, _helper.getISODateTo)(records)
              };
              if (syncParams.dateFrom) {
                fetchSupplementParams.dateFrom = syncParams.dateFrom;
              }
              // reach the max record count
              _context6.n = 4;
              return this._fetch(fetchSupplementParams);
            case 4:
              supplementRecords = _context6.v;
            case 5:
              if (!(ownerId !== this._auth.ownerId)) {
                _context6.n = 6;
                break;
              }
              throw Error('request aborted');
            case 6:
              if (this._enableDeleted) {
                this.resetData();
              }
              this.syncSuccess({
                records: records,
                supplementRecords: supplementRecords,
                timestamp: timestamp,
                syncToken: syncToken,
                daySpan: this._daySpan
              });
              _context6.n = 9;
              break;
            case 7:
              _context6.p = 7;
              _t4 = _context6.v;
              if (!(ownerId === this._auth.ownerId)) {
                _context6.n = 9;
                break;
              }
              _context6.n = 8;
              return (_this$_handleSyncApiE2 = this._handleSyncApiError) === null || _this$_handleSyncApiE2 === void 0 ? void 0 : _this$_handleSyncApiE2.call(this, _t4);
            case 8:
              throw _t4;
            case 9:
              return _context6.a(2);
          }
        }, _callee6, this, [[1, 7]]);
      }));
      function _fSync() {
        return _fSync2.apply(this, arguments);
      }
      return _fSync;
    }()
  }, {
    key: "_getSyncParams",
    value: function _getSyncParams() {
      var daySpan = this._daySpan;
      var params = {
        recordCount: this._recordCount,
        syncType: _syncTypes.syncTypes.fSync
      };
      if (daySpan) {
        params.dateFrom = (0, _helper.getISODateFrom)(daySpan);
      }
      return params;
    }
  }, {
    key: "_sync",
    value: function () {
      var _sync2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(syncType) {
        var ownerId, shouldFSync, _t5, _t6;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.p = _context7.n) {
            case 0:
              ownerId = this._auth.ownerId;
              _context7.p = 1;
              shouldFSync = syncType === _syncTypes.syncTypes.fSync;
              if (shouldFSync) {
                _context7.n = 5;
                break;
              }
              _context7.p = 2;
              _context7.n = 3;
              return this._iSync();
            case 3:
              _context7.n = 5;
              break;
            case 4:
              _context7.p = 4;
              _t5 = _context7.v;
              shouldFSync = true;
            case 5:
              if (!(shouldFSync && ownerId === this._auth.ownerId)) {
                _context7.n = 6;
                break;
              }
              _context7.n = 6;
              return this._fSync();
            case 6:
              if (this._polling) {
                this._startPolling();
              }
              _context7.n = 8;
              break;
            case 7:
              _context7.p = 7;
              _t6 = _context7.v;
              if (ownerId === this._auth.ownerId) {
                if (this._polling) {
                  this._startPolling(this.timeToRetry);
                } else {
                  this._retry();
                }
              }
            case 8:
              this._promise = null;
            case 9:
              return _context7.a(2);
          }
        }, _callee7, this, [[2, 4], [1, 7]]);
      }));
      function _sync(_x2) {
        return _sync2.apply(this, arguments);
      }
      return _sync;
    }()
  }, {
    key: "sync",
    value: function () {
      var _sync3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0() {
        var _this7 = this;
        var syncType,
          _args0 = arguments;
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.n) {
            case 0:
              syncType = _args0.length > 0 && _args0[0] !== undefined ? _args0[0] : this.token ? _syncTypes.syncTypes.iSync : _syncTypes.syncTypes.fSync;
              if (this._promise) {
                _context0.n = 1;
                break;
              }
              this._promise = this._sync(syncType);
              return _context0.a(2, this._promise);
            case 1:
              if (this._queueSync) {
                _context0.n = 2;
                break;
              }
              this._queueSync = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9() {
                return _regenerator().w(function (_context9) {
                  while (1) switch (_context9.n) {
                    case 0:
                      _context9.n = 1;
                      return _this7._promise;
                    case 1:
                      _this7._promise = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8() {
                        return _regenerator().w(function (_context8) {
                          while (1) switch (_context8.n) {
                            case 0:
                              _context8.n = 1;
                              return (0, _utils.sleep)(300);
                            case 1:
                              return _context8.a(2, _this7._sync(syncType));
                          }
                        }, _callee8);
                      }))();
                      _this7._queueSync = null;
                      return _context9.a(2, _this7._promise);
                  }
                }, _callee9);
              }))();
              return _context0.a(2, this._queueSync);
            case 2:
              return _context0.a(2, this._queueSync);
          }
        }, _callee0, this);
      }));
      function sync() {
        return _sync3.apply(this, arguments);
      }
      return sync;
    }()
  }, {
    key: "fetchData",
    value: function fetchData() {
      return this.sync();
    }
  }, {
    key: "mainCompanyNumbers",
    get: function get() {
      return this._extensionPhoneNumber.numbers.filter(function (_ref4) {
        var usageType = _ref4.usageType;
        return usageType === 'MainCompanyNumber';
      }).map(function (_ref5) {
        var phoneNumber = _ref5.phoneNumber;
        return phoneNumber;
      });
    }
  }, {
    key: "pollingInterval",
    get: function get() {
      return this.ttl;
    }
  }, {
    key: "_clearTimeout",
    value: function _clearTimeout() {
      if (this._timeoutId) clearTimeout(this._timeoutId);
    }
  }, {
    key: "_startPolling",
    value: function _startPolling() {
      var _this8 = this;
      var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.timestamp + this.pollingInterval + 10 - Date.now();
      this._clearTimeout();
      this._timeoutId = setTimeout(function () {
        _this8._timeoutId = null;
        if (!_this8.timestamp || Date.now() - _this8.timestamp > _this8.ttl) {
          _this8.fetchData();
        } else {
          _this8._startPolling();
        }
      }, t);
    }
  }, {
    key: "_retry",
    value: function _retry() {
      var _this9 = this;
      var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.timeToRetry;
      this._clearTimeout();
      this._timeoutId = setTimeout(function () {
        _this9._timeoutId = null;
        if (!_this9.timestamp || Date.now() - _this9.timestamp > _this9.ttl) {
          _this9.fetchData();
        }
      }, t);
    }
  }]);
}(_nextCore.RcModule), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "data", [_nextCore.userStorage, _nextCore.state, _dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {
      list: [],
      map: {},
      token: null,
      timestamp: null
    };
  }
}), _applyDecoratedDescriptor(_class2.prototype, "resetData", [_nextCore.action, _dec8, _dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "resetData"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "clearToken", [_nextCore.action, _dec0, _dec1], Object.getOwnPropertyDescriptor(_class2.prototype, "clearToken"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "filterExpiredCalls", [_nextCore.action, _dec10, _dec11], Object.getOwnPropertyDescriptor(_class2.prototype, "filterExpiredCalls"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "syncSuccess", [_nextCore.action, _dec12, _dec13], Object.getOwnPropertyDescriptor(_class2.prototype, "syncSuccess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "calls", [_nextCore.computed, _dec14, _dec15], Object.getOwnPropertyDescriptor(_class2.prototype, "calls"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_fetch", [_dec16, _dec17, _dec18], Object.getOwnPropertyDescriptor(_class2.prototype, "_fetch"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_iSync", [_dec19, _dec20, _dec21], Object.getOwnPropertyDescriptor(_class2.prototype, "_iSync"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_fSync", [_dec22, _dec23, _dec24], Object.getOwnPropertyDescriptor(_class2.prototype, "_fSync"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_sync", [_dec25, _dec26, _dec27], Object.getOwnPropertyDescriptor(_class2.prototype, "_sync"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "sync", [_dec28, _dec29, _dec30], Object.getOwnPropertyDescriptor(_class2.prototype, "sync"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "fetchData", [_dec31, _dec32, _dec33], Object.getOwnPropertyDescriptor(_class2.prototype, "fetchData"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class) || _class) || _class);
//# sourceMappingURL=CallLog.js.map
