"use strict";

require("core-js/modules/es.array.filter");
require("core-js/modules/es.array.for-each");
require("core-js/modules/es.array.index-of");
require("core-js/modules/es.array.map");
require("core-js/modules/es.array.slice");
require("core-js/modules/es.array.sort");
require("core-js/modules/es.array.splice");
require("core-js/modules/es.date.now");
require("core-js/modules/es.date.to-string");
require("core-js/modules/es.object.get-own-property-descriptor");
require("core-js/modules/web.dom-collections.for-each");
require("core-js/modules/web.timers");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallLog = void 0;
require("regenerator-runtime/runtime");
var _core = require("@ringcentral-integration/core");
var _utils = require("@ringcentral-integration/utils");
var _callActions = require("../../enums/callActions");
var _callResults = require("../../enums/callResults");
var _subscriptionFilters = require("../../enums/subscriptionFilters");
var _syncTypes = require("../../enums/syncTypes");
var _callLogHelpers = require("../../lib/callLogHelpers");
var _di = require("../../lib/di");
var _fetchList = _interopRequireDefault(require("../../lib/fetchList"));
var _getDateFrom = _interopRequireDefault(require("../../lib/getDateFrom"));
var _proxify = require("../../lib/proxy/proxify");
var _helper = require("./helper");
var _dec, _dec2, _dec3, _class, _class2, _descriptor;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t));) { ; } return t; }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _createSuper(t) { var r = _isNativeReflectConstruct(); return function () { var e, o = _getPrototypeOf(t); if (r) { var s = _getPrototypeOf(this).constructor; e = Reflect.construct(o, arguments, s); } else e = o.apply(this, arguments); return _possibleConstructorReturn(this, e); }; }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
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
var CallLog = (_dec = (0, _di.Module)({
  name: 'CallLog',
  deps: ['Auth', 'Client', 'ExtensionPhoneNumber', 'ExtensionInfo', 'Subscription', 'AppFeatures', {
    dep: 'TabManager',
    optional: true
  }, {
    dep: 'Storage',
    optional: true
  }, {
    dep: 'CallLogOptions',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (_ref) {
  var list = _ref.list;
  return [list];
}), _dec3 = (0, _core.computed)(function (_ref2) {
  var data = _ref2.data;
  return [data.list, data.map];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  _inherits(CallLog, _RcModuleV);
  var _super = _createSuper(CallLog);
  function CallLog(deps) {
    var _deps$callLogOptions$, _deps$callLogOptions;
    var _this;
    _classCallCheck(this, CallLog);
    _this = _super.call(this, {
      deps: deps,
      storageKey: 'CallLog',
      enableCache: !((_deps$callLogOptions$ = (_deps$callLogOptions = deps.callLogOptions) === null || _deps$callLogOptions === void 0 ? void 0 : _deps$callLogOptions.disableCache) !== null && _deps$callLogOptions$ !== void 0 ? _deps$callLogOptions$ : false)
    });
    _this._promise = null;
    _this._queueSync = null;
    _this._timeoutId = null;
    _this._handleSyncApiError = null;
    _initializerDefineProperty(_this, "data", _descriptor, _assertThisInitialized(_this));
    _this._deps.subscription.register(_assertThisInitialized(_this), {
      filters: [_subscriptionFilters.subscriptionFilters.detailedPresence]
    });
    return _this;
  }
  _createClass(CallLog, [{
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
  }, {
    key: "syncSuccess",
    value: function syncSuccess(_ref3) {
      var _this3 = this;
      var timestamp = _ref3.timestamp,
        syncToken = _ref3.syncToken,
        _ref3$records = _ref3.records,
        records = _ref3$records === void 0 ? [] : _ref3$records,
        _ref3$supplementRecor = _ref3.supplementRecords,
        supplementRecords = _ref3$supplementRecor === void 0 ? [] : _ref3$supplementRecor,
        daySpan = _ref3.daySpan;
      this.data.timestamp = timestamp;
      this.data.token = syncToken;
      var newState = [];
      var cutOffTime = (0, _getDateFrom["default"])(daySpan).getTime();
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
        if (call.startTime > cutOffTime) {
          // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
          if (!_this3.data.map[call.id]) {
            // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
            newState.push(call.id);
          }
          // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
          _this3.data.map[call.id] = call;
          if (_this3._enableDeleted && call.deleted) {
            // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
            var index = newState.indexOf(call.id);
            if (index > -1) {
              newState.splice(index, 1);
            }
            // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
            delete _this3.data.map[call.id];
          }
        }
      });
      this.data.list = newState;
    }
  }, {
    key: "_shouldInit",
    value: function _shouldInit() {
      return !!(_get(_getPrototypeOf(CallLog.prototype), "_shouldInit", this).call(this) && this._deps.auth.loggedIn);
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return !!(_get(_getPrototypeOf(CallLog.prototype), "_shouldReset", this).call(this) || this.ready && !this._deps.auth.loggedIn);
    }
  }, {
    key: "onInit",
    value: function () {
      var _onInit = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                /**
                 * old call log data structure migration
                 */
                if (_typeof(this.data.list[0]) === 'object') {
                  this.resetData();
                }
                this.filterExpiredCalls(this._daySpan);
                if (this.token && (!this.timestamp || Date.now() - this.timestamp > this._tokenExpiresIn)) {
                  this.clearToken();
                }
                _context.next = 5;
                return this.initInternal();
              case 5:
              case "end":
                return _context.stop();
            }
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
      var _initInternal = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!this._deps.appFeatures.hasReadExtensionCallLog) {
                  _context2.next = 3;
                  break;
                }
                _context2.next = 3;
                return this._init();
              case 3:
              case "end":
                return _context2.stop();
            }
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
      (0, _core.watch)(this, function () {
        return _this4._deps.subscription.message;
      }, /*#__PURE__*/function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(message) {
          var _message$body;
          var ownerId;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  if (!(_this4.ready && _this4._deps.appFeatures.hasReadExtensionCallLog && (message === null || message === void 0 ? void 0 : message.event) && presenceRegExp.test(message.event) && ((_message$body = message.body) === null || _message$body === void 0 ? void 0 : _message$body.activeCalls) && (0, _callLogHelpers.hasEndedCalls)(message.body.activeCalls))) {
                    _context3.next = 5;
                    break;
                  }
                  ownerId = _this4._deps.auth.ownerId;
                  _context3.next = 4;
                  return (0, _utils.sleep)(SYNC_DELAY);
                case 4:
                  if (ownerId === _this4._deps.auth.ownerId && (!_this4._deps.storage || !_this4._deps.tabManager || _this4._deps.tabManager.active)) {
                    _this4.sync();
                  }
                case 5:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3);
        }));
        return function (_x) {
          return _ref4.apply(this, arguments);
        };
      }());
    }
  }, {
    key: "_init",
    value: function () {
      var _init2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!((!this._deps.tabManager || this._deps.tabManager.active) && (!this.timestamp || Date.now() - this.timestamp > this.refreshLock))) {
                  _context4.next = 11;
                  break;
                }
                _context4.prev = 1;
                _context4.next = 4;
                return this.sync();
              case 4:
                _context4.next = 9;
                break;
              case 6:
                _context4.prev = 6;
                _context4.t0 = _context4["catch"](1);
                console.log(_context4.t0);
              case 9:
                _context4.next = 12;
                break;
              case 11:
                if (this._polling) {
                  this._startPolling();
                }
              case 12:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[1, 6]]);
      }));
      function _init() {
        return _init2.apply(this, arguments);
      }
      return _init;
    }()
  }, {
    key: "_fetch",
    value: function () {
      var _fetch2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(_ref5) {
        var _this5 = this;
        var dateFrom, dateTo, perPageParam;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                dateFrom = _ref5.dateFrom, dateTo = _ref5.dateTo;
                perPageParam = this._isLimitList ? {
                  perPage: this._listRecordCount
                } : {};
                return _context5.abrupt("return", (0, _fetchList["default"])(function (params) {
                  return _this5._deps.client.account().extension().callLog().list(_objectSpread(_objectSpread({}, params), {}, {
                    dateFrom: dateFrom,
                    dateTo: dateTo
                  }, perPageParam));
                }));
              case 3:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));
      function _fetch(_x2) {
        return _fetch2.apply(this, arguments);
      }
      return _fetch;
    }()
  }, {
    key: "_iSync",
    value: function () {
      var _iSync2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var ownerId, data, _this$_handleSyncApiE;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                ownerId = this._deps.auth.ownerId;
                _context6.prev = 1;
                _context6.next = 4;
                return this._deps.client.account().extension().callLogSync().list({
                  syncType: _syncTypes.syncTypes.iSync,
                  syncToken: this.token,
                  showDeleted: this._enableDeleted
                });
              case 4:
                data = _context6.sent;
                if (!(ownerId !== this._deps.auth.ownerId)) {
                  _context6.next = 7;
                  break;
                }
                throw Error('request aborted');
              case 7:
                // @ts-expect-error TS(2345): Argument of type '{ daySpan: number; records: Call... Remove this comment to see the full error message
                this.syncSuccess(_objectSpread(_objectSpread({}, (0, _helper.processData)(data)), {}, {
                  daySpan: this._daySpan
                }));
                _context6.next = 16;
                break;
              case 10:
                _context6.prev = 10;
                _context6.t0 = _context6["catch"](1);
                if (!(ownerId === this._deps.auth.ownerId)) {
                  _context6.next = 16;
                  break;
                }
                _context6.next = 15;
                return (_this$_handleSyncApiE = this._handleSyncApiError) === null || _this$_handleSyncApiE === void 0 ? void 0 : _this$_handleSyncApiE.call(this, _context6.t0);
              case 15:
                throw _context6.t0;
              case 16:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[1, 10]]);
      }));
      function _iSync() {
        return _iSync2.apply(this, arguments);
      }
      return _iSync;
    }()
  }, {
    key: "_fSync",
    value: function () {
      var _fSync2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        var ownerId, dateFrom, data, supplementRecords, _processData, records, timestamp, syncToken, _this$_handleSyncApiE2;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                ownerId = this._deps.auth.ownerId;
                _context7.prev = 1;
                dateFrom = (0, _helper.getISODateFrom)(this._daySpan);
                _context7.next = 5;
                return this._deps.client.account().extension().callLogSync().list({
                  recordCount: this._recordCount,
                  syncType: _syncTypes.syncTypes.fSync,
                  dateFrom: dateFrom
                });
              case 5:
                data = _context7.sent;
                if (!(ownerId !== this._deps.auth.ownerId)) {
                  _context7.next = 8;
                  break;
                }
                throw Error('request aborted');
              case 8:
                _processData = (0, _helper.processData)(data), records = _processData.records, timestamp = _processData.timestamp, syncToken = _processData.syncToken;
                if (!(records.length >= this._recordCount)) {
                  _context7.next = 13;
                  break;
                }
                _context7.next = 12;
                return this._fetch({
                  dateFrom: dateFrom,
                  // @ts-expect-error TS(2322): Type 'string | 0 | undefined' is not assignable to... Remove this comment to see the full error message
                  dateTo: (0, _helper.getISODateTo)(records)
                });
              case 12:
                supplementRecords = _context7.sent;
              case 13:
                if (!(ownerId !== this._deps.auth.ownerId)) {
                  _context7.next = 15;
                  break;
                }
                throw Error('request aborted');
              case 15:
                if (this._enableDeleted) {
                  this.resetData();
                }
                this.syncSuccess({
                  records: records,
                  // @ts-expect-error TS(2454): Variable 'supplementRecords' is used before being ... Remove this comment to see the full error message
                  supplementRecords: supplementRecords,
                  timestamp: timestamp,
                  // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
                  syncToken: syncToken,
                  daySpan: this._daySpan
                });
                _context7.next = 25;
                break;
              case 19:
                _context7.prev = 19;
                _context7.t0 = _context7["catch"](1);
                if (!(ownerId === this._deps.auth.ownerId)) {
                  _context7.next = 25;
                  break;
                }
                _context7.next = 24;
                return (_this$_handleSyncApiE2 = this._handleSyncApiError) === null || _this$_handleSyncApiE2 === void 0 ? void 0 : _this$_handleSyncApiE2.call(this, _context7.t0);
              case 24:
                throw _context7.t0;
              case 25:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this, [[1, 19]]);
      }));
      function _fSync() {
        return _fSync2.apply(this, arguments);
      }
      return _fSync;
    }()
  }, {
    key: "_sync",
    value: function () {
      var _sync2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(syncType) {
        var ownerId, shouldFSync;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                ownerId = this._deps.auth.ownerId;
                _context8.prev = 1;
                shouldFSync = syncType === _syncTypes.syncTypes.fSync;
                if (shouldFSync) {
                  _context8.next = 12;
                  break;
                }
                _context8.prev = 4;
                _context8.next = 7;
                return this._iSync();
              case 7:
                _context8.next = 12;
                break;
              case 9:
                _context8.prev = 9;
                _context8.t0 = _context8["catch"](4);
                shouldFSync = true;
              case 12:
                if (!(shouldFSync && ownerId === this._deps.auth.ownerId)) {
                  _context8.next = 15;
                  break;
                }
                _context8.next = 15;
                return this._fSync();
              case 15:
                if (this._polling) {
                  this._startPolling();
                }
                _context8.next = 21;
                break;
              case 18:
                _context8.prev = 18;
                _context8.t1 = _context8["catch"](1);
                if (ownerId === this._deps.auth.ownerId) {
                  if (this._polling) {
                    this._startPolling(this.timeToRetry);
                  } else {
                    this._retry();
                  }
                }
              case 21:
                this._promise = null;
              case 22:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this, [[1, 18], [4, 9]]);
      }));
      function _sync(_x3) {
        return _sync2.apply(this, arguments);
      }
      return _sync;
    }()
  }, {
    key: "sync",
    value: function () {
      var _sync3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
        var _this6 = this;
        var syncType,
          _args11 = arguments;
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                syncType = _args11.length > 0 && _args11[0] !== undefined ? _args11[0] : this.token ? _syncTypes.syncTypes.iSync : _syncTypes.syncTypes.fSync;
                if (this._promise) {
                  _context11.next = 4;
                  break;
                }
                this._promise = this._sync(syncType);
                return _context11.abrupt("return", this._promise);
              case 4:
                if (this._queueSync) {
                  _context11.next = 7;
                  break;
                }
                this._queueSync = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
                  return regeneratorRuntime.wrap(function _callee10$(_context10) {
                    while (1) {
                      switch (_context10.prev = _context10.next) {
                        case 0:
                          _context10.next = 2;
                          return _this6._promise;
                        case 2:
                          _this6._promise = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
                            return regeneratorRuntime.wrap(function _callee9$(_context9) {
                              while (1) {
                                switch (_context9.prev = _context9.next) {
                                  case 0:
                                    _context9.next = 2;
                                    return (0, _utils.sleep)(300);
                                  case 2:
                                    return _context9.abrupt("return", _this6._sync(syncType));
                                  case 3:
                                  case "end":
                                    return _context9.stop();
                                }
                              }
                            }, _callee9);
                          }))();
                          _this6._queueSync = null;
                          return _context10.abrupt("return", _this6._promise);
                        case 5:
                        case "end":
                          return _context10.stop();
                      }
                    }
                  }, _callee10);
                }))();
                return _context11.abrupt("return", this._queueSync);
              case 7:
                return _context11.abrupt("return", this._queueSync);
              case 8:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
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
    key: "_clearTimeout",
    value: function _clearTimeout() {
      if (this._timeoutId) clearTimeout(this._timeoutId);
    }
  }, {
    key: "_startPolling",
    value: function _startPolling() {
      var _this$timestamp,
        _this7 = this;
      var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ((_this$timestamp = this.timestamp) !== null && _this$timestamp !== void 0 ? _this$timestamp : 0) + this.pollingInterval + 10 - Date.now();
      this._clearTimeout();
      this._timeoutId = setTimeout(function () {
        _this7._timeoutId = null;
        if (!_this7._deps.tabManager || _this7._deps.tabManager.active) {
          if (!_this7.timestamp || Date.now() - _this7.timestamp > _this7.ttl) {
            _this7.fetchData();
          } else {
            _this7._startPolling();
          }
        } else if (_this7.timestamp && Date.now() - _this7.timestamp < _this7.ttl) {
          _this7._startPolling();
        } else {
          _this7._startPolling(_this7.timeToRetry);
        }
      }, t);
    }
  }, {
    key: "_retry",
    value: function _retry() {
      var _this8 = this;
      var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.timeToRetry;
      this._clearTimeout();
      this._timeoutId = setTimeout(function () {
        _this8._timeoutId = null;
        if (!_this8.timestamp || Date.now() - _this8.timestamp > _this8.ttl) {
          if (!_this8._deps.tabManager || _this8._deps.tabManager.active) {
            _this8.fetchData();
          } else {
            // continue retry checks in case tab becomes main tab
            _this8._retry();
          }
        }
      }, t);
    }
  }, {
    key: "_ttl",
    get: function get() {
      var _this$_deps$callLogOp, _this$_deps$callLogOp2;
      return (_this$_deps$callLogOp = (_this$_deps$callLogOp2 = this._deps.callLogOptions) === null || _this$_deps$callLogOp2 === void 0 ? void 0 : _this$_deps$callLogOp2.ttl) !== null && _this$_deps$callLogOp !== void 0 ? _this$_deps$callLogOp : DEFAULT_TTL;
    }
  }, {
    key: "_refreshLock",
    get: function get() {
      var _this$_deps$callLogOp3, _this$_deps$callLogOp4;
      return (_this$_deps$callLogOp3 = (_this$_deps$callLogOp4 = this._deps.callLogOptions) === null || _this$_deps$callLogOp4 === void 0 ? void 0 : _this$_deps$callLogOp4.refreshLock) !== null && _this$_deps$callLogOp3 !== void 0 ? _this$_deps$callLogOp3 : DEFAULT_REFRESH_LOCK;
    }
  }, {
    key: "_tokenExpiresIn",
    get: function get() {
      var _this$_deps$callLogOp5, _this$_deps$callLogOp6;
      return (_this$_deps$callLogOp5 = (_this$_deps$callLogOp6 = this._deps.callLogOptions) === null || _this$_deps$callLogOp6 === void 0 ? void 0 : _this$_deps$callLogOp6.tokenExpiresIn) !== null && _this$_deps$callLogOp5 !== void 0 ? _this$_deps$callLogOp5 : DEFAULT_TOKEN_EXPIRES_IN;
    }
  }, {
    key: "_timeToRetry",
    get: function get() {
      var _this$_deps$callLogOp7, _this$_deps$callLogOp8;
      return (_this$_deps$callLogOp7 = (_this$_deps$callLogOp8 = this._deps.callLogOptions) === null || _this$_deps$callLogOp8 === void 0 ? void 0 : _this$_deps$callLogOp8.timeToRetry) !== null && _this$_deps$callLogOp7 !== void 0 ? _this$_deps$callLogOp7 : DEFAULT_TIME_TO_RETRY;
    }
  }, {
    key: "_daySpan",
    get: function get() {
      var _this$_deps$callLogOp9, _this$_deps$callLogOp10;
      return (_this$_deps$callLogOp9 = (_this$_deps$callLogOp10 = this._deps.callLogOptions) === null || _this$_deps$callLogOp10 === void 0 ? void 0 : _this$_deps$callLogOp10.daySpan) !== null && _this$_deps$callLogOp9 !== void 0 ? _this$_deps$callLogOp9 : DEFAULT_DAY_SPAN;
    }
  }, {
    key: "_polling",
    get: function get() {
      var _this$_deps$callLogOp11, _this$_deps$callLogOp12;
      return (_this$_deps$callLogOp11 = (_this$_deps$callLogOp12 = this._deps.callLogOptions) === null || _this$_deps$callLogOp12 === void 0 ? void 0 : _this$_deps$callLogOp12.polling) !== null && _this$_deps$callLogOp11 !== void 0 ? _this$_deps$callLogOp11 : true;
    }
  }, {
    key: "_isLimitList",
    get: function get() {
      var _this$_deps$callLogOp13, _this$_deps$callLogOp14;
      return (_this$_deps$callLogOp13 = (_this$_deps$callLogOp14 = this._deps.callLogOptions) === null || _this$_deps$callLogOp14 === void 0 ? void 0 : _this$_deps$callLogOp14.isLimitList) !== null && _this$_deps$callLogOp13 !== void 0 ? _this$_deps$callLogOp13 : false;
    }
  }, {
    key: "_listRecordCount",
    get: function get() {
      var _this$_deps$callLogOp15, _this$_deps$callLogOp16;
      return (_this$_deps$callLogOp15 = (_this$_deps$callLogOp16 = this._deps.callLogOptions) === null || _this$_deps$callLogOp16 === void 0 ? void 0 : _this$_deps$callLogOp16.listRecordCount) !== null && _this$_deps$callLogOp15 !== void 0 ? _this$_deps$callLogOp15 : LIST_RECORD_COUNT;
    }
  }, {
    key: "_recordCount",
    get: function get() {
      var _this$_deps$callLogOp17, _this$_deps$callLogOp18;
      return (_this$_deps$callLogOp17 = (_this$_deps$callLogOp18 = this._deps.callLogOptions) === null || _this$_deps$callLogOp18 === void 0 ? void 0 : _this$_deps$callLogOp18.recordCount) !== null && _this$_deps$callLogOp17 !== void 0 ? _this$_deps$callLogOp17 : RECORD_COUNT;
    }
  }, {
    key: "_enableDeleted",
    get: function get() {
      var _this$_deps$callLogOp19, _this$_deps$callLogOp20;
      return (_this$_deps$callLogOp19 = (_this$_deps$callLogOp20 = this._deps.callLogOptions) === null || _this$_deps$callLogOp20 === void 0 ? void 0 : _this$_deps$callLogOp20.enableDeleted) !== null && _this$_deps$callLogOp19 !== void 0 ? _this$_deps$callLogOp19 : false;
    }
  }, {
    key: "calls",
    get: function get() {
      var _this9 = this;
      // TODO: make sure removeDuplicateIntermediateCalls is necessary here
      var calls = (0, _callLogHelpers.removeInboundRingOutLegs)((0, _callLogHelpers.removeDuplicateIntermediateCalls)(
      // https://developers.ringcentral.com/api-reference/Call-Log/readUserCallLog
      // @ts-expect-error TS(2345): Argument of type 'CallLogRecord[]' is not assignab... Remove this comment to see the full error message
      this.list.filter(function (call) {
        return (
          // [RCINT-3472] calls with result === 'stopped' seems to be useless
          call.result !== _callResults.callResults.stopped &&
          // [RCINT-51111] calls with result === 'busy'
          call.result !== _callResults.callResults.busy &&
          // [RCINT-6839]
          // Call processing result is undefined
          call.result !== _callResults.callResults.unknown &&
          // Outgoing fax sending has failed
          // TODO: Types of Legacy, remove for checking type?
          // @ts-expect-error TS(2367): This condition will always return 'true' since the... Remove this comment to see the full error message
          call.result !== _callResults.callResults.faxSendError &&
          // Incoming fax has failed to be received
          call.result !== _callResults.callResults.faxReceiptError &&
          // Outgoing fax has failed because of no answer
          call.result !== _callResults.callResults.callFailed &&
          // Error Internal error occurred when receiving fax
          // TODO: Types of Legacy, remove for checking type?
          // @ts-expect-error TS(2367): This condition will always return 'true' since the... Remove this comment to see the full error message
          call.result !== _callResults.callResults.faxReceipt
        );
      }))).map(function (call) {
        // [RCINT-7364] Call presence is incorrect when make ringout call from a DL number.
        // When user use DL number set ringout and the outBound from number must not a oneself company/extension number
        // Call log sync will response tow legs.
        // But user use company plus extension number, call log sync will response only one leg.
        // And the results about `to` and `from` in platform APIs call log sync response is opposite.
        // This is a temporary solution.
        var isOutBoundCompanyNumber = call.from && call.from.phoneNumber && _this9.mainCompanyNumbers.indexOf(call.from.phoneNumber) > -1;
        var isOutBoundFromSelfExtNumber = call.from && call.from.extensionNumber && call.from.extensionNumber === _this9._deps.extensionInfo.info.extensionNumber;
        if ((0, _callLogHelpers.isOutbound)(call) && (call.action === _callActions.callActions.ringOutWeb || call.action === _callActions.callActions.ringOutPC || call.action === _callActions.callActions.ringOutMobile) && !isOutBoundCompanyNumber && !isOutBoundFromSelfExtNumber) {
          return _objectSpread(_objectSpread({}, call), {}, {
            from: call.to,
            to: call.from
          });
        }
        return call;
      }).sort(_callLogHelpers.sortByStartTime);
      if (this._isLimitList) {
        return calls.slice(0, this._listRecordCount);
      }
      return calls;
    }
  }, {
    key: "list",
    get: function get() {
      var _this10 = this;
      /**
       * old call log data structure migration
       */
      if (_typeof(this.data.list[0]) === 'object') {
        return [];
      }
      return this.data.list.map(function (id) {
        return _this10.data.map[id];
      }).sort(_callLogHelpers.sortByStartTime);
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
    key: "mainCompanyNumbers",
    get: function get() {
      return this._deps.extensionPhoneNumber.numbers.filter(function (_ref8) {
        var usageType = _ref8.usageType;
        return usageType === 'MainCompanyNumber';
      }).map(function (_ref9) {
        var phoneNumber = _ref9.phoneNumber;
        return phoneNumber;
      });
    }
  }, {
    key: "pollingInterval",
    get: function get() {
      return this.ttl;
    }
  }]);
  return CallLog;
}(_core.RcModuleV2), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "data", [_core.storage, _core.state], {
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
}), _applyDecoratedDescriptor(_class2.prototype, "resetData", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "resetData"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "clearToken", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "clearToken"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "filterExpiredCalls", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "filterExpiredCalls"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "syncSuccess", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "syncSuccess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "calls", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "calls"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "list", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "list"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_fetch", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_fetch"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_iSync", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_iSync"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_fSync", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_fSync"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_sync", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_sync"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "sync", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "sync"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "fetchData", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "fetchData"), _class2.prototype)), _class2)) || _class);
exports.CallLog = CallLog;
//# sourceMappingURL=CallLog.js.map
