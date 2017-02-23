'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

exports.processData = processData;
exports.getISODateFrom = getISODateFrom;
exports.getISODateTo = getISODateTo;

var _Pollable2 = require('../../lib/Pollable');

var _Pollable3 = _interopRequireDefault(_Pollable2);

var _fetchList = require('../../lib/fetchList');

var _fetchList2 = _interopRequireDefault(_fetchList);

var _moduleStatus = require('../../enums/moduleStatus');

var _moduleStatus2 = _interopRequireDefault(_moduleStatus);

var _getDateFrom = require('../../lib/getDateFrom');

var _getDateFrom2 = _interopRequireDefault(_getDateFrom);

var _actionTypes = require('./actionTypes');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

var _getCallLogReducer = require('./getCallLogReducer');

var _getCallLogReducer2 = _interopRequireDefault(_getCallLogReducer);

var _sleep = require('../../lib/sleep');

var _sleep2 = _interopRequireDefault(_sleep);

var _subscriptionFilters = require('../../enums/subscriptionFilters');

var _subscriptionFilters2 = _interopRequireDefault(_subscriptionFilters);

var _syncTypes = require('../../enums/syncTypes');

var _syncTypes2 = _interopRequireDefault(_syncTypes);

var _callLogHelpers = require('../../lib/callLogHelpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_TTL = 5 * 60 * 1000;
var DEFAULT_TOKEN_EXPIRES_IN = 60 * 60 * 1000;
var DEFAULT_DAY_SPAN = 7;
var RECORD_COUNT = 250;
var DEFAULT_TIME_TO_RETRY = 62 * 1000;
var SYNC_DELAY = 20 * 1000;

function processData(data) {
  return {
    records: data.records,
    timestamp: new Date(data.syncInfo.syncTime).getTime(),
    syncToken: data.syncInfo.syncToken
  };
}

function getISODateFrom(daySpan) {
  var d = (0, _getDateFrom2.default)(daySpan);
  return d.toISOString();
}

function getISODateTo(records) {
  var dateTo = void 0;
  records.forEach(function (call) {
    if (!dateTo || call.startTime < dateTo) dateTo = call.startTime;
  });
  return dateTo && new Date(dateTo).toISOString();
}

var presenceRegExp = /\/presence\?detailedTelephonyState=true$/;

var CallLog = function (_Pollable) {
  (0, _inherits3.default)(CallLog, _Pollable);

  function CallLog(_ref) {
    var _this2 = this;

    var auth = _ref.auth,
        client = _ref.client,
        storage = _ref.storage,
        subscription = _ref.subscription,
        rolesAndPermissions = _ref.rolesAndPermissions,
        _ref$ttl = _ref.ttl,
        ttl = _ref$ttl === undefined ? DEFAULT_TTL : _ref$ttl,
        _ref$tokenExpiresIn = _ref.tokenExpiresIn,
        tokenExpiresIn = _ref$tokenExpiresIn === undefined ? DEFAULT_TOKEN_EXPIRES_IN : _ref$tokenExpiresIn,
        _ref$timeToRetry = _ref.timeToRetry,
        timeToRetry = _ref$timeToRetry === undefined ? DEFAULT_TIME_TO_RETRY : _ref$timeToRetry,
        _ref$daySpan = _ref.daySpan,
        daySpan = _ref$daySpan === undefined ? DEFAULT_DAY_SPAN : _ref$daySpan,
        _ref$polling = _ref.polling,
        polling = _ref$polling === undefined ? true : _ref$polling,
        options = (0, _objectWithoutProperties3.default)(_ref, ['auth', 'client', 'storage', 'subscription', 'rolesAndPermissions', 'ttl', 'tokenExpiresIn', 'timeToRetry', 'daySpan', 'polling']);
    (0, _classCallCheck3.default)(this, CallLog);

    var _this = (0, _possibleConstructorReturn3.default)(this, (CallLog.__proto__ || (0, _getPrototypeOf2.default)(CallLog)).call(this, (0, _extends3.default)({}, options, {
      actionTypes: _actionTypes2.default
    })));

    _this._subscriptionHandler = function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(message) {
        var ownerId;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(presenceRegExp.test(message.event) && message.body && message.body.activeCalls && (0, _callLogHelpers.hasEndedCalls)(message.body.activeCalls))) {
                  _context.next = 5;
                  break;
                }

                ownerId = _this._auth.ownerId;
                _context.next = 4;
                return (0, _sleep2.default)(SYNC_DELAY);

              case 4:
                if (ownerId === _this._auth.ownerId) {
                  _this.sync();
                }

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this2);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }();

    _this._onStateChange = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(_this._auth.loggedIn && _this._storage.ready && (!_this._subscription || _this._subscription.ready) && _this._rolesAndPermissions.ready && _this.status === _moduleStatus2.default.pending)) {
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
              _context2.next = 5;
              return _this.sync();

            case 5:
              if (_this._subscription) {
                _this._subscription.subscribe(_subscriptionFilters2.default.detailedPresence);
              }
              _this.store.dispatch({
                type: _this.actionTypes.initSuccess
              });
              _context2.next = 10;
              break;

            case 9:
              if ((!_this._auth.loggedIn || !_this._storage.ready || _this._subscription && !_this._subscription.ready || !_this._rolesAndPermissions.ready) && _this.ready) {
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
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this2);
    }));

    _this._auth = auth;
    _this._client = client;
    _this._storage = storage;
    _this._subscription = subscription;
    _this._rolesAndPermissions = rolesAndPermissions;
    _this._dataStorageKey = 'callLogData';
    _this._tokenStorageKey = 'callLogToken';
    _this._timestampStorageKey = 'callLogTimestamp';
    _this._ttl = ttl;
    _this._tokenExpiresIn = tokenExpiresIn;
    _this._timeToRetry = timeToRetry;
    _this._daySpan = daySpan;
    _this._polling = polling;

    _this._storage.registerReducer({
      key: _this._dataStorageKey,
      reducer: (0, _getCallLogReducer.getDataReducer)(_this.actionTypes)
    });
    _this._storage.registerReducer({
      key: _this._tokenStorageKey,
      reducer: (0, _getCallLogReducer.getTokenReducer)(_this.actionTypes)
    });
    _this._storage.registerReducer({
      key: _this._timestampStorageKey,
      reducer: (0, _getCallLogReducer.getTimestampReducer)(_this.actionTypes)
    });

    _this._reducer = (0, _getCallLogReducer2.default)(_this.actionTypes);
    _this._promise = null;
    _this._lastMessage = null;
    return _this;
  }

  (0, _createClass3.default)(CallLog, [{
    key: 'initialize',
    value: function initialize() {
      this.store.subscribe(this._onStateChange);
    }
  }, {
    key: '_fetch',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(_ref5) {
        var _this3 = this;

        var dateFrom = _ref5.dateFrom,
            dateTo = _ref5.dateTo;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt('return', (0, _fetchList2.default)(function (params) {
                  return _this3._client.account().extension().callLog().list((0, _extends3.default)({}, params, {
                    dateFrom: dateFrom,
                    dateTo: dateTo
                  }));
                }));

              case 1:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function _fetch(_x2) {
        return _ref4.apply(this, arguments);
      }

      return _fetch;
    }()
  }, {
    key: '_iSync',
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
        var ownerId, data;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                ownerId = this._auth.ownerId;
                _context4.prev = 1;

                this.store.dispatch({
                  type: this.actionTypes.iSync
                });
                _context4.next = 5;
                return this._client.account().extension().callLogSync().list({
                  syncType: _syncTypes2.default.iSync,
                  syncToken: this.token
                });

              case 5:
                data = _context4.sent;

                if (!(ownerId !== this._auth.ownerId)) {
                  _context4.next = 8;
                  break;
                }

                throw Error('request aborted');

              case 8:
                this.store.dispatch((0, _extends3.default)({
                  type: this.actionTypes.iSyncSuccess
                }, processData(data), {
                  daySpan: this._daySpan
                }));
                _context4.next = 16;
                break;

              case 11:
                _context4.prev = 11;
                _context4.t0 = _context4['catch'](1);

                if (!(ownerId === this._auth.ownerId)) {
                  _context4.next = 16;
                  break;
                }

                this.store.dispatch({
                  type: this.actionTypes.iSyncError,
                  error: _context4.t0
                });
                throw _context4.t0;

              case 16:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[1, 11]]);
      }));

      function _iSync() {
        return _ref6.apply(this, arguments);
      }

      return _iSync;
    }()
  }, {
    key: '_fSync',
    value: function () {
      var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {
        var ownerId, dateFrom, data, supplementRecords, _processData, records, timestamp, syncToken;

        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                ownerId = this._auth.ownerId;
                _context5.prev = 1;

                this.store.dispatch({
                  type: this.actionTypes.fSync
                });

                dateFrom = getISODateFrom(this._daySpan);
                _context5.next = 6;
                return this._client.account().extension().callLogSync().list({
                  recordCount: RECORD_COUNT,
                  syncType: _syncTypes2.default.fSync,
                  dateFrom: dateFrom
                });

              case 6:
                data = _context5.sent;

                if (!(ownerId !== this._auth.ownerId)) {
                  _context5.next = 9;
                  break;
                }

                throw Error('request aborted');

              case 9:
                supplementRecords = void 0;
                _processData = processData(data), records = _processData.records, timestamp = _processData.timestamp, syncToken = _processData.syncToken;

                if (!(records.length >= RECORD_COUNT)) {
                  _context5.next = 15;
                  break;
                }

                _context5.next = 14;
                return this._fetch({
                  dateFrom: dateFrom,
                  dateTo: getISODateTo(records)
                });

              case 14:
                supplementRecords = _context5.sent;

              case 15:
                if (!(ownerId !== this._auth.ownerId)) {
                  _context5.next = 17;
                  break;
                }

                throw Error('request aborted');

              case 17:
                this.store.dispatch({
                  type: this.actionTypes.fSyncSuccess,
                  records: records,
                  supplementRecords: supplementRecords,
                  timestamp: timestamp,
                  syncToken: syncToken,
                  daySpan: this._daySpan
                });
                _context5.next = 25;
                break;

              case 20:
                _context5.prev = 20;
                _context5.t0 = _context5['catch'](1);

                if (!(ownerId === this._auth.ownerId)) {
                  _context5.next = 25;
                  break;
                }

                this.store.dispatch({
                  type: this.actionTypes.fSyncError,
                  error: _context5.t0
                });
                throw _context5.t0;

              case 25:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this, [[1, 20]]);
      }));

      function _fSync() {
        return _ref7.apply(this, arguments);
      }

      return _fSync;
    }()
  }, {
    key: '_sync',
    value: function () {
      var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(syncType) {
        var ownerId, shouldFSync;
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                ownerId = this._auth.ownerId;
                _context6.prev = 1;
                shouldFSync = syncType === _syncTypes2.default.fSync;

                if (shouldFSync) {
                  _context6.next = 12;
                  break;
                }

                _context6.prev = 4;
                _context6.next = 7;
                return this._iSync();

              case 7:
                _context6.next = 12;
                break;

              case 9:
                _context6.prev = 9;
                _context6.t0 = _context6['catch'](4);

                shouldFSync = true;

              case 12:
                if (!(shouldFSync && ownerId === this._auth.ownerId)) {
                  _context6.next = 15;
                  break;
                }

                _context6.next = 15;
                return this._fSync();

              case 15:
                if (this._polling) {
                  this._startPolling();
                }
                _context6.next = 21;
                break;

              case 18:
                _context6.prev = 18;
                _context6.t1 = _context6['catch'](1);

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
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this, [[1, 18], [4, 9]]);
      }));

      function _sync(_x3) {
        return _ref8.apply(this, arguments);
      }

      return _sync;
    }()
  }, {
    key: 'sync',
    value: function sync() {
      var syncType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.token ? _syncTypes2.default.iSync : _syncTypes2.default.fSync;

      if (!this._promise) {
        this._promise = this._sync(syncType);
      }
      return this._promise;
    }
  }, {
    key: 'fetchData',
    value: function fetchData() {
      this.sync();
    }
  }, {
    key: 'status',
    get: function get() {
      return this.state.status;
    }
  }, {
    key: 'ready',
    get: function get() {
      return this.state.status === _moduleStatus2.default.ready;
    }
  }, {
    key: 'calls',
    get: function get() {
      return this._storage.getItem(this._dataStorageKey);
    }
  }, {
    key: 'token',
    get: function get() {
      return this._storage.getItem(this._tokenStorageKey);
    }
  }, {
    key: 'timestamp',
    get: function get() {
      return this._storage.getItem(this._timestampStorageKey);
    }
  }, {
    key: 'ttl',
    get: function get() {
      return this._ttl;
    }
  }, {
    key: 'timeToRetry',
    get: function get() {
      return this._timeToRetry;
    }
  }, {
    key: 'canReadCallLog',
    get: function get() {
      return !!this._rolesAndPermissions.permissions.ReadCallLog;
    }
  }, {
    key: 'canReadPresence',
    get: function get() {
      return !!this._rolesAndPermissions.permissions.ReadPresenceStatus;
    }
  }]);
  return CallLog;
}(_Pollable3.default);

exports.default = CallLog;
//# sourceMappingURL=index.js.map
