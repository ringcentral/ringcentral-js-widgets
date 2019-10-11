"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.processData = processData;
exports.getISODateFrom = getISODateFrom;
exports.getISODateTo = getISODateTo;
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.map");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.date.to-iso-string");

require("core-js/modules/es6.date.now");

var _redux = require("redux");

var _di = require("../../lib/di");

var _Pollable2 = _interopRequireDefault(require("../../lib/Pollable"));

var _fetchList = _interopRequireDefault(require("../../lib/fetchList"));

var _moduleStatuses = _interopRequireDefault(require("../../enums/moduleStatuses"));

var _getDateFrom = _interopRequireDefault(require("../../lib/getDateFrom"));

var _actionTypes = _interopRequireDefault(require("./actionTypes"));

var _getCallLogReducer = _interopRequireWildcard(require("./getCallLogReducer"));

var _sleep = _interopRequireDefault(require("../../lib/sleep"));

var _subscriptionFilters = _interopRequireDefault(require("../../enums/subscriptionFilters"));

var _syncTypes = _interopRequireDefault(require("../../enums/syncTypes"));

var _callLogHelpers = require("../../lib/callLogHelpers");

var _callResults = _interopRequireDefault(require("../../enums/callResults"));

var _callActions = _interopRequireDefault(require("../../enums/callActions"));

var _proxify = _interopRequireDefault(require("../../lib/proxy/proxify"));

var _selector = require("../../lib/selector");

var _dec, _class, _class2, _descriptor, _temp;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and set to use loose mode. ' + 'To use proposal-class-properties in spec mode with decorators, wait for ' + 'the next major version of decorators in stage 2.'); }

var DEFAULT_TTL = 5 * 60 * 1000; // Lock fetching on app refresh if lst fetch happened less than this timespan

var DEFAULT_REFRESH_LOCK = 3 * 60 * 1000;
var DEFAULT_TOKEN_EXPIRES_IN = 60 * 60 * 1000;
var DEFAULT_DAY_SPAN = 7;
var RECORD_COUNT = 250;
var LIST_RECORD_COUNT = 250;
var DEFAULT_TIME_TO_RETRY = 62 * 1000;
var SYNC_DELAY = 30 * 1000;

function processData(data) {
  return {
    records: data.records,
    timestamp: Date.now(),
    syncToken: data.syncInfo.syncToken
  };
}

function getISODateFrom(daySpan) {
  var d = (0, _getDateFrom["default"])(daySpan);
  return d.toISOString();
}

function getISODateTo(records) {
  var dateTo;
  records.forEach(function (call) {
    if (!dateTo || call.startTime < dateTo) dateTo = call.startTime;
  });
  return dateTo && new Date(dateTo).toISOString();
} // to not use $ at the end, presence with sipData has extra query parameters


var presenceRegExp = /\/presence\?detailedTelephonyState=true/;
/**
 * @class
 * @description Call log managing module
 */

var CallLog = (_dec = (0, _di.Module)({
  deps: ['Auth', 'Client', 'ExtensionPhoneNumber', 'ExtensionInfo', 'Subscription', 'RolesAndPermissions', {
    dep: 'TabManager',
    optional: true
  }, {
    dep: 'Storage',
    optional: true
  }, {
    dep: 'CallLogOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = (_temp =
/*#__PURE__*/
function (_Pollable) {
  _inherits(CallLog, _Pollable);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Auth} params.auth - auth module instance
   * @param {Client} params.client - client module instance
   * @param {Storage} params.storage - storage module instance
   * @param {ExtensionPhoneNumber} params.extensionPhoneNumber - extensionPhoneNumber module instance
   * @param {ExtensionInfo} params.extensionPhoneNumber - extensionPhoneNumber module instance
   * @param {Subscription} params.subscription - subscription module instance
   * @param {RolesAndPermissions} params.rolesAndPermissions - rolesAndPermissions module instance
   * @param {Number} params.ttl - local cache time
   * @param {Number} params.tokenExpiresIn - time for token expire
   * @param {Number} params.timeToRetry - waiting time to retry
   * @param {Number} params.daySpan - day span of call log
   * @param {Bool} params.polling - polling flag
   * @param {Bool} params.disableCache - disable cache flag, default false
   */
  function CallLog(_ref) {
    var _this;

    var auth = _ref.auth,
        client = _ref.client,
        storage = _ref.storage,
        extensionPhoneNumber = _ref.extensionPhoneNumber,
        extensionInfo = _ref.extensionInfo,
        subscription = _ref.subscription,
        rolesAndPermissions = _ref.rolesAndPermissions,
        tabManager = _ref.tabManager,
        _ref$ttl = _ref.ttl,
        ttl = _ref$ttl === void 0 ? DEFAULT_TTL : _ref$ttl,
        _ref$refreshLock = _ref.refreshLock,
        refreshLock = _ref$refreshLock === void 0 ? DEFAULT_REFRESH_LOCK : _ref$refreshLock,
        _ref$tokenExpiresIn = _ref.tokenExpiresIn,
        tokenExpiresIn = _ref$tokenExpiresIn === void 0 ? DEFAULT_TOKEN_EXPIRES_IN : _ref$tokenExpiresIn,
        _ref$timeToRetry = _ref.timeToRetry,
        timeToRetry = _ref$timeToRetry === void 0 ? DEFAULT_TIME_TO_RETRY : _ref$timeToRetry,
        _ref$daySpan = _ref.daySpan,
        daySpan = _ref$daySpan === void 0 ? DEFAULT_DAY_SPAN : _ref$daySpan,
        _ref$polling = _ref.polling,
        polling = _ref$polling === void 0 ? true : _ref$polling,
        _ref$disableCache = _ref.disableCache,
        disableCache = _ref$disableCache === void 0 ? false : _ref$disableCache,
        _ref$isLimitList = _ref.isLimitList,
        isLimitList = _ref$isLimitList === void 0 ? false : _ref$isLimitList,
        _ref$listRecordCount = _ref.listRecordCount,
        listRecordCount = _ref$listRecordCount === void 0 ? LIST_RECORD_COUNT : _ref$listRecordCount,
        options = _objectWithoutProperties(_ref, ["auth", "client", "storage", "extensionPhoneNumber", "extensionInfo", "subscription", "rolesAndPermissions", "tabManager", "ttl", "refreshLock", "tokenExpiresIn", "timeToRetry", "daySpan", "polling", "disableCache", "isLimitList", "listRecordCount"]);

    _classCallCheck(this, CallLog);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CallLog).call(this, _objectSpread({}, options, {
      actionTypes: _actionTypes["default"]
    })));

    _this._subscriptionHandler =
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(message) {
        var ownerId;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(_this.ready && presenceRegExp.test(message.event) && message.body && message.body.activeCalls && (0, _callLogHelpers.hasEndedCalls)(message.body.activeCalls))) {
                  _context.next = 5;
                  break;
                }

                ownerId = _this._auth.ownerId;
                _context.next = 4;
                return (0, _sleep["default"])(SYNC_DELAY);

              case 4:
                if (ownerId === _this._auth.ownerId && (!_this._storage || !_this._tabManager || _this._tabManager.active)) {
                  _this.sync();
                }

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }();

    _this._onStateChange =
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(_this._auth.loggedIn && (!_this._storage || _this._storage.ready) && (!_this._subscription || _this._subscription.ready) && (!_this._extensionPhoneNumber || _this._extensionPhoneNumber.ready) && (!_this._extensionInfo || _this._extensionInfo.ready) && (!_this._tabManager || _this._tabManager.ready) && _this._rolesAndPermissions.ready && _this.status === _moduleStatuses["default"].pending)) {
                _context2.next = 9;
                break;
              }

              _this.store.dispatch({
                type: _this.actionTypes.init,
                daySpan: _this._daySpan
              });

              if (_this.token && (!_this.timestamp || Date.now() - _this.timestamp > _this._tokenExpiresIn)) {
                _this.store.dispatch({
                  type: _this.actionTypes.clearToken
                });
              }

              if (!_this._rolesAndPermissions.permissions.ReadCallLog) {
                _context2.next = 6;
                break;
              }

              _context2.next = 6;
              return _this._init();

            case 6:
              _this.store.dispatch({
                type: _this.actionTypes.initSuccess
              });

              _context2.next = 10;
              break;

            case 9:
              if ((!_this._auth.loggedIn || !!_this._storage && !_this._storage.ready || _this._extensionPhoneNumber && !_this._extensionPhoneNumber.ready || _this._extensionInfo && !_this._extensionInfo.ready || _this._subscription && !_this._subscription.ready || _this._tabManager && !_this._tabManager.ready || !_this._rolesAndPermissions.ready) && _this.ready) {
                _this.store.dispatch({
                  type: _this.actionTypes.reset
                });

                _this._clearTimeout();

                _this._promise = null;

                _this.store.dispatch({
                  type: _this.actionTypes.resetSuccess
                });
              } else if (_this.ready && _this._subscription && _this._subscription.ready && _this._subscription.message && _this._subscription.message !== _this._lastMessage) {
                _this._lastMessage = _this._subscription.message;

                _this._subscriptionHandler(_this._lastMessage);
              }

            case 10:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    _initializerDefineProperty(_this, "calls", _descriptor, _assertThisInitialized(_this));

    _this._auth = auth;
    _this._client = client;

    if (!disableCache) {
      _this._storage = storage;
    }

    _this._extensionPhoneNumber = extensionPhoneNumber;
    _this._extensionInfo = extensionInfo;
    _this._subscription = subscription;
    _this._rolesAndPermissions = rolesAndPermissions;
    _this._tabManager = tabManager;
    _this._isLimitList = isLimitList;
    _this._listRecordCount = listRecordCount;
    _this._callLogStorageKey = 'callLog';
    _this._ttl = ttl;
    _this._tokenExpiresIn = tokenExpiresIn;
    _this._timeToRetry = timeToRetry;
    _this._refreshLock = refreshLock;
    _this._daySpan = daySpan;
    _this._polling = polling;

    if (_this._storage) {
      _this._reducer = (0, _getCallLogReducer["default"])(_this.actionTypes);

      _this._storage.registerReducer({
        key: _this._callLogStorageKey,
        reducer: (0, _redux.combineReducers)({
          data: (0, _getCallLogReducer.getDataReducer)(_this.actionTypes),
          token: (0, _getCallLogReducer.getTokenReducer)(_this.actionTypes),
          timestamp: (0, _getCallLogReducer.getTimestampReducer)(_this.actionTypes)
        })
      });
    } else {
      _this._reducer = (0, _getCallLogReducer["default"])(_this.actionTypes, {
        data: (0, _getCallLogReducer.getDataReducer)(_this.actionTypes),
        token: (0, _getCallLogReducer.getTokenReducer)(_this.actionTypes),
        timestamp: (0, _getCallLogReducer.getTimestampReducer)(_this.actionTypes)
      });
    }

    _this._promise = null;
    _this._lastMessage = null;
    return _this;
  }

  _createClass(CallLog, [{
    key: "_init",
    value: function () {
      var _init2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (this._subscription) {
                  this._subscription.subscribe(_subscriptionFilters["default"].detailedPresence);
                }

                if (!((!this._tabManager || this._tabManager.active) && (!this.timestamp || Date.now() - this.timestamp > this.refreshLock))) {
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
    key: "initialize",
    value: function initialize() {
      this.store.subscribe(this._onStateChange);
    }
  }, {
    key: "_fetch",
    value: function () {
      var _fetch2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(_ref4) {
        var _this2 = this;

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
                  return _this2._client.account().extension().callLog().list(_objectSpread({}, params, {
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
      var _iSync2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5() {
        var ownerId, data;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                ownerId = this._auth.ownerId;
                _context5.prev = 1;
                this.store.dispatch({
                  type: this.actionTypes.iSync
                });
                _context5.next = 5;
                return this._client.account().extension().callLogSync().list({
                  syncType: _syncTypes["default"].iSync,
                  syncToken: this.token
                });

              case 5:
                data = _context5.sent;

                if (!(ownerId !== this._auth.ownerId)) {
                  _context5.next = 8;
                  break;
                }

                throw Error('request aborted');

              case 8:
                this.store.dispatch(_objectSpread({
                  type: this.actionTypes.iSyncSuccess
                }, processData(data), {
                  daySpan: this._daySpan
                }));
                _context5.next = 16;
                break;

              case 11:
                _context5.prev = 11;
                _context5.t0 = _context5["catch"](1);

                if (!(ownerId === this._auth.ownerId)) {
                  _context5.next = 16;
                  break;
                }

                this.store.dispatch({
                  type: this.actionTypes.iSyncError,
                  error: _context5.t0
                });
                throw _context5.t0;

              case 16:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[1, 11]]);
      }));

      function _iSync() {
        return _iSync2.apply(this, arguments);
      }

      return _iSync;
    }()
  }, {
    key: "_fSync",
    value: function () {
      var _fSync2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6() {
        var ownerId, dateFrom, data, supplementRecords, _processData, records, timestamp, syncToken;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                ownerId = this._auth.ownerId;
                _context6.prev = 1;
                this.store.dispatch({
                  type: this.actionTypes.fSync
                });
                dateFrom = getISODateFrom(this._daySpan);
                _context6.next = 6;
                return this._client.account().extension().callLogSync().list({
                  recordCount: RECORD_COUNT,
                  syncType: _syncTypes["default"].fSync,
                  dateFrom: dateFrom
                });

              case 6:
                data = _context6.sent;

                if (!(ownerId !== this._auth.ownerId)) {
                  _context6.next = 9;
                  break;
                }

                throw Error('request aborted');

              case 9:
                _processData = processData(data), records = _processData.records, timestamp = _processData.timestamp, syncToken = _processData.syncToken;

                if (!(records.length >= RECORD_COUNT)) {
                  _context6.next = 14;
                  break;
                }

                _context6.next = 13;
                return this._fetch({
                  dateFrom: dateFrom,
                  dateTo: getISODateTo(records)
                });

              case 13:
                supplementRecords = _context6.sent;

              case 14:
                if (!(ownerId !== this._auth.ownerId)) {
                  _context6.next = 16;
                  break;
                }

                throw Error('request aborted');

              case 16:
                this.store.dispatch({
                  type: this.actionTypes.fSyncSuccess,
                  records: records,
                  supplementRecords: supplementRecords,
                  timestamp: timestamp,
                  syncToken: syncToken,
                  daySpan: this._daySpan
                });
                _context6.next = 24;
                break;

              case 19:
                _context6.prev = 19;
                _context6.t0 = _context6["catch"](1);

                if (!(ownerId === this._auth.ownerId)) {
                  _context6.next = 24;
                  break;
                }

                this.store.dispatch({
                  type: this.actionTypes.fSyncError,
                  error: _context6.t0
                });
                throw _context6.t0;

              case 24:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[1, 19]]);
      }));

      function _fSync() {
        return _fSync2.apply(this, arguments);
      }

      return _fSync;
    }()
  }, {
    key: "_sync",
    value: function () {
      var _sync2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7(syncType) {
        var ownerId, shouldFSync;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                ownerId = this._auth.ownerId;
                _context7.prev = 1;
                shouldFSync = syncType === _syncTypes["default"].fSync;

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
                if (!(shouldFSync && ownerId === this._auth.ownerId)) {
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

                if (ownerId === this._auth.ownerId) {
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
    }() // TODO: this.token: iSync or fSync depends on token???

  }, {
    key: "sync",
    value: function () {
      var _sync3 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee10() {
        var _this3 = this;

        var syncType,
            _args10 = arguments;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                syncType = _args10.length > 0 && _args10[0] !== undefined ? _args10[0] : this.token ? _syncTypes["default"].iSync : _syncTypes["default"].fSync;

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

                this._queueSync = _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee9() {
                  return regeneratorRuntime.wrap(function _callee9$(_context9) {
                    while (1) {
                      switch (_context9.prev = _context9.next) {
                        case 0:
                          _context9.next = 2;
                          return _this3._promise;

                        case 2:
                          _this3._promise = _asyncToGenerator(
                          /*#__PURE__*/
                          regeneratorRuntime.mark(function _callee8() {
                            return regeneratorRuntime.wrap(function _callee8$(_context8) {
                              while (1) {
                                switch (_context8.prev = _context8.next) {
                                  case 0:
                                    _context8.next = 2;
                                    return (0, _sleep["default"])(300);

                                  case 2:
                                    return _context8.abrupt("return", _this3._sync(syncType));

                                  case 3:
                                  case "end":
                                    return _context8.stop();
                                }
                              }
                            }, _callee8);
                          }))();
                          _this3._queueSync = null;
                          return _context9.abrupt("return", _this3._promise);

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
    key: "status",
    get: function get() {
      return this.state.status;
    }
  }, {
    key: "ready",
    get: function get() {
      return this.state.status === _moduleStatuses["default"].ready;
    }
  }, {
    key: "data",
    get: function get() {
      if (this._storage) {
        return this._storage.getItem(this._callLogStorageKey).data;
      }

      return this.state.data;
    }
  }, {
    key: "token",
    get: function get() {
      if (this._storage) {
        return this._storage.getItem(this._callLogStorageKey).token;
      }

      return this.state.token;
    }
  }, {
    key: "timestamp",
    get: function get() {
      if (this._storage) {
        return this._storage.getItem(this._callLogStorageKey).timestamp;
      }

      return this.state.timestamp;
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
    key: "canReadCallLog",
    get: function get() {
      return !!this._rolesAndPermissions.permissions.ReadCallLog;
    }
  }, {
    key: "canReadPresence",
    get: function get() {
      return !!this._rolesAndPermissions.permissions.ReadPresenceStatus;
    }
  }, {
    key: "mainCompanyNumbers",
    get: function get() {
      return this._extensionPhoneNumber.numbers.filter(function (_ref7) {
        var usageType = _ref7.usageType;
        return usageType === 'MainCompanyNumber';
      }).map(function (_ref8) {
        var phoneNumber = _ref8.phoneNumber;
        return phoneNumber;
      });
    }
  }]);

  return CallLog;
}(_Pollable2["default"]), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "calls", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this4 = this;

    return [function () {
      return _this4.data;
    }, function (data) {
      // TODO make sure removeDuplicateIntermediateCalls is necessary here
      var calls = (0, _callLogHelpers.removeInboundRingOutLegs)((0, _callLogHelpers.removeDuplicateIntermediateCalls)(data.filter(function (call) {
        return (// [RCINT-3472] calls with result === 'stopped' seems to be useless
          call.result !== _callResults["default"].stopped && // [RCINT-51111] calls with result === 'busy'
          call.result !== _callResults["default"].busy && // [RCINT-6839]
          // Call processing result is undefined
          call.result !== _callResults["default"].unknown && // Outgoing fax sending has failed
          call.result !== _callResults["default"].faxSendError && // Incoming fax has failed to be received
          call.result !== _callResults["default"].faxReceiptError && // Outgoing fax has failed because of no answer
          call.result !== _callResults["default"].callFailed && // Outgoing fax sending has been stopped
          call.result !== _callResults["default"].stopped && // Error Internal error occurred when receiving fax
          call.result !== _callResults["default"].faxReceipt
        );
      }))).map(function (call) {
        // [RCINT-7364] Call presence is incorrect when make ringout call from a DL number.
        // When user use DL number set ringout and the outBound from number must not a oneself company/extension number
        // Call log sync will response tow legs.
        // But user use company plus extension number, call log sync will response only one leg.
        // And the results about `to` and `from` in platform APIs call log sync response is opposite.
        // This is a temporary solution.
        var isOutBoundCompanyNumber = call.from && call.from.phoneNumber && _this4.mainCompanyNumbers.indexOf(call.from.phoneNumber) > -1;
        var isOutBoundFromSelfExtNumber = call.from && call.from.extensionNumber && call.from.extensionNumber === _this4._extensionInfo.data.extensionNumber;

        if ((0, _callLogHelpers.isOutbound)(call) && (call.action === _callActions["default"].ringOutWeb || call.action === _callActions["default"].ringOutPC || call.action === _callActions["default"].ringOutMobile) && !isOutBoundCompanyNumber && !isOutBoundFromSelfExtNumber) {
          return _objectSpread({}, call, {
            from: call.to,
            to: call.from
          });
        }

        return call;
      });

      if (_this4._isLimitList) {
        return calls.slice(0, _this4._listRecordCount);
      }

      return calls;
    }];
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_fetch", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_fetch"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_iSync", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_iSync"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_fSync", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_fSync"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_sync", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_sync"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "sync", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "sync"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "fetchData", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "fetchData"), _class2.prototype)), _class2)) || _class);
exports["default"] = CallLog;
//# sourceMappingURL=index.js.map
