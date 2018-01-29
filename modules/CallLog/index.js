'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

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

var _dec, _class, _desc, _value, _class2;

exports.processData = processData;
exports.getISODateFrom = getISODateFrom;
exports.getISODateTo = getISODateTo;

var _di = require('../../lib/di');

var _Pollable2 = require('../../lib/Pollable');

var _Pollable3 = _interopRequireDefault(_Pollable2);

var _fetchList = require('../../lib/fetchList');

var _fetchList2 = _interopRequireDefault(_fetchList);

var _moduleStatuses = require('../../enums/moduleStatuses');

var _moduleStatuses2 = _interopRequireDefault(_moduleStatuses);

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

var _callResults = require('../../enums/callResults');

var _callResults2 = _interopRequireDefault(_callResults);

var _proxify = require('../../lib/proxy/proxify');

var _proxify2 = _interopRequireDefault(_proxify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var DEFAULT_TTL = 5 * 60 * 1000;
var DEFAULT_TOKEN_EXPIRES_IN = 60 * 60 * 1000;
var DEFAULT_DAY_SPAN = 7;
var RECORD_COUNT = 250;
var DEFAULT_TIME_TO_RETRY = 62 * 1000;
var SYNC_DELAY = 30 * 1000;

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
// to not use $ at the end, presence with sipData has extra query parameters
var presenceRegExp = /\/presence\?detailedTelephonyState=true/;

/**
 * @class
 * @description Call log managing module
 */
var CallLog = (_dec = (0, _di.Module)({
  deps: ['Auth', 'Client', 'Subscription', 'RolesAndPermissions', { dep: 'TabManager', optional: true }, { dep: 'Storage', optional: true }, { dep: 'CallLogOptions', optional: true }]
}), _dec(_class = (_class2 = function (_Pollable) {
  (0, _inherits3.default)(CallLog, _Pollable);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Auth} params.auth - auth module instance
   * @param {Client} params.client - client module instance
   * @param {Storage} params.storage - storage module instance
   * @param {Subscription} params.subscription - subscription module instance
   * @param {RolesAndPermissions} params.rolesAndPermissions - rolesAndPermissions module instance
   * @param {Number} params.ttl - local cache timestamp
   * @param {Number} params.tokenExpiresIn - time for token expire
   * @param {Number} params.timeToRetry - waiting time to retry
   * @param {Number} params.daySpan - day span of call log
   * @param {Bool} params.polling - polling flag
   * @param {Bool} params.disableCache - disable cache flag, default false
   */
  function CallLog(_ref) {
    var _this2 = this;

    var auth = _ref.auth,
        client = _ref.client,
        storage = _ref.storage,
        subscription = _ref.subscription,
        rolesAndPermissions = _ref.rolesAndPermissions,
        tabManager = _ref.tabManager,
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
        _ref$disableCache = _ref.disableCache,
        disableCache = _ref$disableCache === undefined ? false : _ref$disableCache,
        options = (0, _objectWithoutProperties3.default)(_ref, ['auth', 'client', 'storage', 'subscription', 'rolesAndPermissions', 'tabManager', 'ttl', 'tokenExpiresIn', 'timeToRetry', 'daySpan', 'polling', 'disableCache']);
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
                if (ownerId === _this._auth.ownerId && (!_this._storage || !_this._tabManager || _this._tabManager.active)) {
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
              if (!(_this._auth.loggedIn && (!_this._storage || _this._storage.ready) && (!_this._subscription || _this._subscription.ready) && (!_this._tabManager || _this._tabManager.ready) && _this._rolesAndPermissions.ready && _this.status === _moduleStatuses2.default.pending)) {
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
              if ((!_this._auth.loggedIn || !!_this._storage && !_this._storage.ready || _this._subscription && !_this._subscription.ready || _this._tabManager && !_this._tabManager.ready || !_this._rolesAndPermissions.ready) && _this.ready) {
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
    if (!disableCache) {
      _this._storage = storage;
    }
    _this._subscription = subscription;
    _this._rolesAndPermissions = rolesAndPermissions;
    _this._tabManager = tabManager;
    _this._dataStorageKey = 'callLogData';
    _this._tokenStorageKey = 'callLogToken';
    _this._timestampStorageKey = 'callLogTimestamp';
    _this._ttl = ttl;
    _this._tokenExpiresIn = tokenExpiresIn;
    _this._timeToRetry = timeToRetry;
    _this._daySpan = daySpan;
    _this._polling = polling;

    if (_this._storage) {
      _this._reducer = (0, _getCallLogReducer2.default)(_this.actionTypes);
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
    } else {
      _this._reducer = (0, _getCallLogReducer2.default)(_this.actionTypes, {
        data: (0, _getCallLogReducer.getDataReducer)(_this.actionTypes),
        token: (0, _getCallLogReducer.getTokenReducer)(_this.actionTypes),
        timestamp: (0, _getCallLogReducer.getTimestampReducer)(_this.actionTypes)
      });
    }

    _this.addSelector('calls', function () {
      return _this.data;
    }, function (data) {
      return (
        // TODO make sure removeDuplicateIntermediateCalls is necessary here
        (0, _callLogHelpers.removeInboundRingOutLegs)((0, _callLogHelpers.removeDuplicateIntermediateCalls)(data.filter(function (call) {
          return (
            // [RCINT-3472] calls with result === 'stopped' seems to be useless
            call.result !== _callResults2.default.stopped &&
            // [RCINT-51111] calls with result === 'busy'
            call.result !== _callResults2.default.busy
          );
        })))
      );
    });

    _this._promise = null;
    _this._lastMessage = null;
    return _this;
  }

  (0, _createClass3.default)(CallLog, [{
    key: '_init',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(!this._storage || !this._tabManager || this._tabManager.active)) {
                  _context3.next = 11;
                  break;
                }

                _context3.prev = 1;
                _context3.next = 4;
                return this.sync();

              case 4:
                _context3.next = 9;
                break;

              case 6:
                _context3.prev = 6;
                _context3.t0 = _context3['catch'](1);

                console.log(_context3.t0);

              case 9:
                _context3.next = 12;
                break;

              case 11:
                if (this._polling) {
                  this._startPolling();
                }

              case 12:
                if (this._subscription) {
                  this._subscription.subscribe(_subscriptionFilters2.default.detailedPresence);
                }

              case 13:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[1, 6]]);
      }));

      function _init() {
        return _ref4.apply(this, arguments);
      }

      return _init;
    }()
  }, {
    key: 'initialize',
    value: function initialize() {
      this.store.subscribe(this._onStateChange);
    }
  }, {
    key: '_fetch',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(_ref6) {
        var _this3 = this;

        var dateFrom = _ref6.dateFrom,
            dateTo = _ref6.dateTo;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                return _context4.abrupt('return', (0, _fetchList2.default)(function (params) {
                  return _this3._client.account().extension().callLog().list((0, _extends3.default)({}, params, {
                    dateFrom: dateFrom,
                    dateTo: dateTo
                  }));
                }));

              case 1:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function _fetch(_x2) {
        return _ref5.apply(this, arguments);
      }

      return _fetch;
    }()
  }, {
    key: '_iSync',
    value: function () {
      var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {
        var ownerId, data;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
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
                  syncType: _syncTypes2.default.iSync,
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
                this.store.dispatch((0, _extends3.default)({
                  type: this.actionTypes.iSyncSuccess
                }, processData(data), {
                  daySpan: this._daySpan
                }));
                _context5.next = 16;
                break;

              case 11:
                _context5.prev = 11;
                _context5.t0 = _context5['catch'](1);

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
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this, [[1, 11]]);
      }));

      function _iSync() {
        return _ref7.apply(this, arguments);
      }

      return _iSync;
    }()
  }, {
    key: '_fSync',
    value: function () {
      var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6() {
        var ownerId, dateFrom, data, supplementRecords, _processData, records, timestamp, syncToken;

        return _regenerator2.default.wrap(function _callee6$(_context6) {
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
                  syncType: _syncTypes2.default.fSync,
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
                supplementRecords = void 0;
                _processData = processData(data), records = _processData.records, timestamp = _processData.timestamp, syncToken = _processData.syncToken;

                if (!(records.length >= RECORD_COUNT)) {
                  _context6.next = 15;
                  break;
                }

                _context6.next = 14;
                return this._fetch({
                  dateFrom: dateFrom,
                  dateTo: getISODateTo(records)
                });

              case 14:
                supplementRecords = _context6.sent;

              case 15:
                if (!(ownerId !== this._auth.ownerId)) {
                  _context6.next = 17;
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
                _context6.next = 25;
                break;

              case 20:
                _context6.prev = 20;
                _context6.t0 = _context6['catch'](1);

                if (!(ownerId === this._auth.ownerId)) {
                  _context6.next = 25;
                  break;
                }

                this.store.dispatch({
                  type: this.actionTypes.fSyncError,
                  error: _context6.t0
                });
                throw _context6.t0;

              case 25:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this, [[1, 20]]);
      }));

      function _fSync() {
        return _ref8.apply(this, arguments);
      }

      return _fSync;
    }()
  }, {
    key: '_sync',
    value: function () {
      var _ref9 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(syncType) {
        var ownerId, shouldFSync;
        return _regenerator2.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                ownerId = this._auth.ownerId;
                _context7.prev = 1;
                shouldFSync = syncType === _syncTypes2.default.fSync;

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
                _context7.t0 = _context7['catch'](4);

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
                _context7.t1 = _context7['catch'](1);

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
                return _context7.stop();
            }
          }
        }, _callee7, this, [[1, 18], [4, 9]]);
      }));

      function _sync(_x3) {
        return _ref9.apply(this, arguments);
      }

      return _sync;
    }()
  }, {
    key: 'sync',
    value: function () {
      var _ref10 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee10() {
        var _this4 = this;

        var syncType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.token ? _syncTypes2.default.iSync : _syncTypes2.default.fSync;
        return _regenerator2.default.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                if (this._promise) {
                  _context10.next = 5;
                  break;
                }

                this._promise = this._sync(syncType);
                return _context10.abrupt('return', this._promise);

              case 5:
                if (this._queueSync) {
                  _context10.next = 8;
                  break;
                }

                this._queueSync = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee9() {
                  return _regenerator2.default.wrap(function _callee9$(_context9) {
                    while (1) {
                      switch (_context9.prev = _context9.next) {
                        case 0:
                          _context9.next = 2;
                          return _this4._promise;

                        case 2:
                          _this4._promise = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8() {
                            return _regenerator2.default.wrap(function _callee8$(_context8) {
                              while (1) {
                                switch (_context8.prev = _context8.next) {
                                  case 0:
                                    _context8.next = 2;
                                    return (0, _sleep2.default)(300);

                                  case 2:
                                    return _context8.abrupt('return', _this4._sync(syncType));

                                  case 3:
                                  case 'end':
                                    return _context8.stop();
                                }
                              }
                            }, _callee8, _this4);
                          }))();
                          _this4._queueSync = null;
                          return _context9.abrupt('return', _this4._promise);

                        case 5:
                        case 'end':
                          return _context9.stop();
                      }
                    }
                  }, _callee9, _this4);
                }))();
                return _context10.abrupt('return', this._queueSync);

              case 8:
                return _context10.abrupt('return', this._queueSync);

              case 9:
              case 'end':
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function sync() {
        return _ref10.apply(this, arguments);
      }

      return sync;
    }()
  }, {
    key: 'fetchData',
    value: function fetchData() {
      return this.sync();
    }
  }, {
    key: 'status',
    get: function get() {
      return this.state.status;
    }
  }, {
    key: 'ready',
    get: function get() {
      return this.state.status === _moduleStatuses2.default.ready;
    }
  }, {
    key: 'data',
    get: function get() {
      if (this._storage) {
        return this._storage.getItem(this._dataStorageKey);
      }
      return this.state.data;
    }
  }, {
    key: 'calls',
    get: function get() {
      return this._selectors.calls();
    }
  }, {
    key: 'token',
    get: function get() {
      if (this._storage) {
        return this._storage.getItem(this._tokenStorageKey);
      }
      return this.state.token;
    }
  }, {
    key: 'timestamp',
    get: function get() {
      if (this._storage) {
        return this._storage.getItem(this._timestampStorageKey);
      }
      return this.state.timestamp;
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
}(_Pollable3.default), (_applyDecoratedDescriptor(_class2.prototype, '_fetch', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, '_fetch'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, '_iSync', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, '_iSync'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, '_fSync', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, '_fSync'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, '_sync', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, '_sync'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'sync', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'sync'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'fetchData', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'fetchData'), _class2.prototype)), _class2)) || _class);
exports.default = CallLog;
//# sourceMappingURL=index.js.map
