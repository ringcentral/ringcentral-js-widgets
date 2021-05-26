"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.reflect.get");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallLog = void 0;

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.date.now");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.array.sort");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

var _core = require("@ringcentral-integration/core");

var _callActions = require("../../enums/callActions");

var _callResults = require("../../enums/callResults");

var _subscriptionFilters = require("../../enums/subscriptionFilters");

var _syncTypes = require("../../enums/syncTypes");

var _callLogHelpers = require("../../lib/callLogHelpers");

var _di = require("../../lib/di");

var _fetchList = _interopRequireDefault(require("../../lib/fetchList"));

var _getDateFrom = _interopRequireDefault(require("../../lib/getDateFrom"));

var _proxify = require("../../lib/proxy/proxify");

var _sleep = _interopRequireDefault(require("../../lib/sleep"));

var _helper = require("./helper");

var _dec, _dec2, _class, _class2, _descriptor;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var DEFAULT_TTL = 5 * 60 * 1000; // Lock fetching on app refresh if lst fetch happened less than this timespan

var DEFAULT_REFRESH_LOCK = 3 * 60 * 1000;
var DEFAULT_TOKEN_EXPIRES_IN = 60 * 60 * 1000;
var DEFAULT_DAY_SPAN = 7;
var RECORD_COUNT = 250;
var LIST_RECORD_COUNT = 250;
var DEFAULT_TIME_TO_RETRY = 62 * 1000;
var SYNC_DELAY = 30 * 1000; // to not use $ at the end, presence with sipData has extra query parameters

var presenceRegExp = /\/presence\?detailedTelephonyState=true/;
var CallLog = (_dec = (0, _di.Module)({
  name: 'CallLog',
  deps: ['Auth', 'Client', 'ExtensionPhoneNumber', 'ExtensionInfo', 'Subscription', 'ExtensionFeatures', {
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

    _initializerDefineProperty(_this, "data", _descriptor, _assertThisInitialized(_this));

    return _this;
  }

  _createClass(CallLog, [{
    key: "resetData",
    value: function resetData() {
      this.data = {
        list: [],
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
      var cutOffTime = (0, _getDateFrom["default"])(daySpan).getTime();
      this.data.list = this.data.list.filter(function (call) {
        return call.startTime > cutOffTime;
      });
    }
  }, {
    key: "syncSuccess",
    value: function syncSuccess(_ref2) {
      var timestamp = _ref2.timestamp,
          syncToken = _ref2.syncToken,
          _ref2$records = _ref2.records,
          records = _ref2$records === void 0 ? [] : _ref2$records,
          _ref2$supplementRecor = _ref2.supplementRecords,
          supplementRecords = _ref2$supplementRecor === void 0 ? [] : _ref2$supplementRecor,
          daySpan = _ref2.daySpan;
      this.data.timestamp = timestamp;
      this.data.token = syncToken;
      var indexMap = {};
      var newState = [];
      var cutOffTime = (0, _getDateFrom["default"])(daySpan).getTime(); // filter old calls

      this.data.list.forEach(function (call) {
        if (call.startTime > cutOffTime) {
          indexMap[call.id] = newState.length;
          newState.push(call);
        }
      });
      (0, _helper.processRecords)(records, supplementRecords).forEach(function (call) {
        if (call.startTime > cutOffTime) {
          if (indexMap[call.id] > -1) {
            // replace the current data with new data
            newState[indexMap[call.id]] = call;
          } else {
            indexMap[call.id] = newState.length;
            newState.push(call);
          }
        }
      });
      newState.sort(_callLogHelpers.sortByStartTime);
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
        var _this$_deps$extension, _this$_deps$extension2;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.filterExpiredCalls(this._daySpan);

                if (this.token && (!this.timestamp || Date.now() - this.timestamp > this._tokenExpiresIn)) {
                  this.clearToken();
                }

                if (!((_this$_deps$extension = this._deps.extensionFeatures.features) === null || _this$_deps$extension === void 0 ? void 0 : (_this$_deps$extension2 = _this$_deps$extension.ReadExtensionCallLog) === null || _this$_deps$extension2 === void 0 ? void 0 : _this$_deps$extension2.available)) {
                  _context.next = 5;
                  break;
                }

                _context.next = 5;
                return this._init();

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
    key: "onReset",
    value: function onReset() {
      this._clearTimeout();

      this._promise = null;
      this.resetData();
    }
  }, {
    key: "onInitOnce",
    value: function onInitOnce() {
      var _this2 = this;

      (0, _core.watch)(this, function () {
        return _this2._deps.subscription.message;
      }, /*#__PURE__*/function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(message) {
          var ownerId;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  if (!(_this2.ready && _this2._deps.subscription.ready && presenceRegExp.test(message.event) && message.body && message.body.activeCalls && (0, _callLogHelpers.hasEndedCalls)(message.body.activeCalls))) {
                    _context2.next = 5;
                    break;
                  }

                  ownerId = _this2._deps.auth.ownerId;
                  _context2.next = 4;
                  return (0, _sleep["default"])(SYNC_DELAY);

                case 4:
                  if (ownerId === _this2._deps.auth.ownerId && (!_this2._deps.storage || !_this2._deps.tabManager || _this2._deps.tabManager.active)) {
                    _this2.sync();
                  }

                case 5:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        return function (_x) {
          return _ref3.apply(this, arguments);
        };
      }());
    }
  }, {
    key: "_init",
    value: function () {
      var _init2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (this._deps.subscription) {
                  this._deps.subscription.subscribe([_subscriptionFilters.subscriptionFilters.detailedPresence]);
                }

                if (!((!this._deps.tabManager || this._deps.tabManager.active) && (!this.timestamp || Date.now() - this.timestamp > this.refreshLock))) {
                  _context3.next = 12;
                  break;
                }

                _context3.prev = 2;
                _context3.next = 5;
                return this.sync();

              case 5:
                _context3.next = 10;
                break;

              case 7:
                _context3.prev = 7;
                _context3.t0 = _context3["catch"](2);
                console.log(_context3.t0);

              case 10:
                _context3.next = 13;
                break;

              case 12:
                if (this._polling) {
                  this._startPolling();
                }

              case 13:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[2, 7]]);
      }));

      function _init() {
        return _init2.apply(this, arguments);
      }

      return _init;
    }()
  }, {
    key: "_fetch",
    value: function () {
      var _fetch2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_ref4) {
        var _this3 = this;

        var dateFrom, dateTo, perPageParam;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                dateFrom = _ref4.dateFrom, dateTo = _ref4.dateTo;
                perPageParam = this._isLimitList ? {
                  perPage: this._listRecordCount
                } : {};
                return _context4.abrupt("return", (0, _fetchList["default"])(function (params) {
                  return _this3._deps.client.account().extension().callLog().list(_objectSpread(_objectSpread({}, params), {}, {
                    dateFrom: dateFrom,
                    dateTo: dateTo
                  }, perPageParam));
                }));

              case 3:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function _fetch(_x2) {
        return _fetch2.apply(this, arguments);
      }

      return _fetch;
    }()
  }, {
    key: "_iSync",
    value: function () {
      var _iSync2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var ownerId, data;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                ownerId = this._deps.auth.ownerId;
                _context5.prev = 1;
                _context5.next = 4;
                return this._deps.client.account().extension().callLogSync().list({
                  syncType: _syncTypes.syncTypes.iSync,
                  syncToken: this.token
                });

              case 4:
                data = _context5.sent;

                if (!(ownerId !== this._deps.auth.ownerId)) {
                  _context5.next = 7;
                  break;
                }

                throw Error('request aborted');

              case 7:
                this.syncSuccess(_objectSpread(_objectSpread({}, (0, _helper.processData)(data)), {}, {
                  daySpan: this._daySpan
                }));
                _context5.next = 14;
                break;

              case 10:
                _context5.prev = 10;
                _context5.t0 = _context5["catch"](1);

                if (!(ownerId === this._deps.auth.ownerId)) {
                  _context5.next = 14;
                  break;
                }

                throw _context5.t0;

              case 14:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[1, 10]]);
      }));

      function _iSync() {
        return _iSync2.apply(this, arguments);
      }

      return _iSync;
    }()
  }, {
    key: "_fSync",
    value: function () {
      var _fSync2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var ownerId, dateFrom, data, supplementRecords, _processData, records, timestamp, syncToken;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                ownerId = this._deps.auth.ownerId;
                _context6.prev = 1;
                dateFrom = (0, _helper.getISODateFrom)(this._daySpan);
                _context6.next = 5;
                return this._deps.client.account().extension().callLogSync().list({
                  recordCount: RECORD_COUNT,
                  syncType: _syncTypes.syncTypes.fSync,
                  dateFrom: dateFrom
                });

              case 5:
                data = _context6.sent;

                if (!(ownerId !== this._deps.auth.ownerId)) {
                  _context6.next = 8;
                  break;
                }

                throw Error('request aborted');

              case 8:
                _processData = (0, _helper.processData)(data), records = _processData.records, timestamp = _processData.timestamp, syncToken = _processData.syncToken;

                if (!(records.length >= RECORD_COUNT)) {
                  _context6.next = 13;
                  break;
                }

                _context6.next = 12;
                return this._fetch({
                  dateFrom: dateFrom,
                  dateTo: (0, _helper.getISODateTo)(records)
                });

              case 12:
                supplementRecords = _context6.sent;

              case 13:
                if (!(ownerId !== this._deps.auth.ownerId)) {
                  _context6.next = 15;
                  break;
                }

                throw Error('request aborted');

              case 15:
                this.syncSuccess({
                  records: records,
                  supplementRecords: supplementRecords,
                  timestamp: timestamp,
                  syncToken: syncToken,
                  daySpan: this._daySpan
                });
                _context6.next = 22;
                break;

              case 18:
                _context6.prev = 18;
                _context6.t0 = _context6["catch"](1);

                if (!(ownerId === this._deps.auth.ownerId)) {
                  _context6.next = 22;
                  break;
                }

                throw _context6.t0;

              case 22:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[1, 18]]);
      }));

      function _fSync() {
        return _fSync2.apply(this, arguments);
      }

      return _fSync;
    }()
  }, {
    key: "_sync",
    value: function () {
      var _sync2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(syncType) {
        var ownerId, shouldFSync;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                ownerId = this._deps.auth.ownerId;
                _context7.prev = 1;
                shouldFSync = syncType === _syncTypes.syncTypes.fSync;

                if (shouldFSync) {
                  _context7.next = 12;
                  break;
                }

                _context7.prev = 4;
                _context7.next = 7;
                return this._iSync();

              case 7:
                _context7.next = 12;
                break;

              case 9:
                _context7.prev = 9;
                _context7.t0 = _context7["catch"](4);
                shouldFSync = true;

              case 12:
                if (!(shouldFSync && ownerId === this._deps.auth.ownerId)) {
                  _context7.next = 15;
                  break;
                }

                _context7.next = 15;
                return this._fSync();

              case 15:
                if (this._polling) {
                  this._startPolling();
                }

                _context7.next = 21;
                break;

              case 18:
                _context7.prev = 18;
                _context7.t1 = _context7["catch"](1);

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
                return _context7.stop();
            }
          }
        }, _callee7, this, [[1, 18], [4, 9]]);
      }));

      function _sync(_x3) {
        return _sync2.apply(this, arguments);
      }

      return _sync;
    }()
  }, {
    key: "sync",
    value: function () {
      var _sync3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
        var _this4 = this;

        var syncType,
            _args10 = arguments;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                syncType = _args10.length > 0 && _args10[0] !== undefined ? _args10[0] : this.token ? _syncTypes.syncTypes.iSync : _syncTypes.syncTypes.fSync;

                if (this._promise) {
                  _context10.next = 4;
                  break;
                }

                this._promise = this._sync(syncType);
                return _context10.abrupt("return", this._promise);

              case 4:
                if (this._queueSync) {
                  _context10.next = 7;
                  break;
                }

                this._queueSync = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
                  return regeneratorRuntime.wrap(function _callee9$(_context9) {
                    while (1) {
                      switch (_context9.prev = _context9.next) {
                        case 0:
                          _context9.next = 2;
                          return _this4._promise;

                        case 2:
                          _this4._promise = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
                            return regeneratorRuntime.wrap(function _callee8$(_context8) {
                              while (1) {
                                switch (_context8.prev = _context8.next) {
                                  case 0:
                                    _context8.next = 2;
                                    return (0, _sleep["default"])(300);

                                  case 2:
                                    return _context8.abrupt("return", _this4._sync(syncType));

                                  case 3:
                                  case "end":
                                    return _context8.stop();
                                }
                              }
                            }, _callee8);
                          }))();
                          _this4._queueSync = null;
                          return _context9.abrupt("return", _this4._promise);

                        case 5:
                        case "end":
                          return _context9.stop();
                      }
                    }
                  }, _callee9);
                }))();
                return _context10.abrupt("return", this._queueSync);

              case 7:
                return _context10.abrupt("return", this._queueSync);

              case 8:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
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
      var _this5 = this;

      var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.timestamp + this.pollingInterval + 10 - Date.now();

      this._clearTimeout();

      this._timeoutId = setTimeout(function () {
        _this5._timeoutId = null;

        if (!_this5._deps.tabManager || _this5._deps.tabManager.active) {
          if (!_this5.timestamp || Date.now() - _this5.timestamp > _this5.ttl) {
            _this5.fetchData();
          } else {
            _this5._startPolling();
          }
        } else if (_this5.timestamp && Date.now() - _this5.timestamp < _this5.ttl) {
          _this5._startPolling();
        } else {
          _this5._startPolling(_this5.timeToRetry);
        }
      }, t);
    }
  }, {
    key: "_retry",
    value: function _retry() {
      var _this6 = this;

      var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.timeToRetry;

      this._clearTimeout();

      this._timeoutId = setTimeout(function () {
        _this6._timeoutId = null;

        if (!_this6.timestamp || Date.now() - _this6.timestamp > _this6.ttl) {
          if (!_this6._deps.tabManager || _this6._deps.tabManager.active) {
            _this6.fetchData();
          } else {
            // continue retry checks in case tab becomes main tab
            _this6._retry();
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
    key: "calls",
    get: function get() {
      var _this7 = this;

      // TODO: make sure removeDuplicateIntermediateCalls is necessary here
      var calls = (0, _callLogHelpers.removeInboundRingOutLegs)((0, _callLogHelpers.removeDuplicateIntermediateCalls)( // https://developers.ringcentral.com/api-reference/Call-Log/readUserCallLog
      this.list.filter(function (call) {
        return (// [RCINT-3472] calls with result === 'stopped' seems to be useless
          call.result !== _callResults.callResults.stopped && // [RCINT-51111] calls with result === 'busy'
          call.result !== _callResults.callResults.busy && // [RCINT-6839]
          // Call processing result is undefined
          call.result !== _callResults.callResults.unknown && // Outgoing fax sending has failed
          // TODO: Types of Legacy, remove for checking type?
          // @ts-ignore
          call.result !== _callResults.callResults.faxSendError && // Incoming fax has failed to be received
          call.result !== _callResults.callResults.faxReceiptError && // Outgoing fax has failed because of no answer
          call.result !== _callResults.callResults.callFailed && // Error Internal error occurred when receiving fax
          // TODO: Types of Legacy, remove for checking type?
          // @ts-ignore
          call.result !== _callResults.callResults.faxReceipt
        );
      }))).map(function (call) {
        // [RCINT-7364] Call presence is incorrect when make ringout call from a DL number.
        // When user use DL number set ringout and the outBound from number must not a oneself company/extension number
        // Call log sync will response tow legs.
        // But user use company plus extension number, call log sync will response only one leg.
        // And the results about `to` and `from` in platform APIs call log sync response is opposite.
        // This is a temporary solution.
        var isOutBoundCompanyNumber = call.from && call.from.phoneNumber && _this7.mainCompanyNumbers.indexOf(call.from.phoneNumber) > -1;
        var isOutBoundFromSelfExtNumber = call.from && call.from.extensionNumber && call.from.extensionNumber === _this7._deps.extensionInfo.info.extensionNumber;

        if ((0, _callLogHelpers.isOutbound)(call) && (call.action === _callActions.callActions.ringOutWeb || call.action === _callActions.callActions.ringOutPC || call.action === _callActions.callActions.ringOutMobile) && !isOutBoundCompanyNumber && !isOutBoundFromSelfExtNumber) {
          return _objectSpread(_objectSpread({}, call), {}, {
            from: call.to,
            to: call.from
          });
        }

        return call;
      });

      if (this._isLimitList) {
        return calls.slice(0, this._listRecordCount);
      }

      return calls;
    }
  }, {
    key: "list",
    get: function get() {
      return this.data.list;
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
      return this._deps.extensionPhoneNumber.numbers.filter(function (_ref7) {
        var usageType = _ref7.usageType;
        return usageType === 'MainCompanyNumber';
      }).map(function (_ref8) {
        var phoneNumber = _ref8.phoneNumber;
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
      token: null,
      timestamp: null
    };
  }
}), _applyDecoratedDescriptor(_class2.prototype, "resetData", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "resetData"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "clearToken", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "clearToken"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "filterExpiredCalls", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "filterExpiredCalls"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "syncSuccess", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "syncSuccess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "calls", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "calls"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_fetch", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_fetch"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_iSync", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_iSync"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_fSync", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_fSync"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_sync", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_sync"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "sync", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "sync"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "fetchData", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "fetchData"), _class2.prototype)), _class2)) || _class);
exports.CallLog = CallLog;
//# sourceMappingURL=CallLog.js.map
