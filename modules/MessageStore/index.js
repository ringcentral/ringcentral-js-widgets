'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _defineProperty = require('babel-runtime/core-js/object/define-property');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

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

var _dec, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8;

var _reselect = require('reselect');

var _di = require('../../lib/di');

var _Pollable2 = require('../../lib/Pollable');

var _Pollable3 = _interopRequireDefault(_Pollable2);

var _ensureExist = require('../../lib/ensureExist');

var _ensureExist2 = _interopRequireDefault(_ensureExist);

var _getter = require('../../lib/getter');

var _getter2 = _interopRequireDefault(_getter);

var _sleep = require('../../lib/sleep');

var _sleep2 = _interopRequireDefault(_sleep);

var _proxify = require('../../lib/proxy/proxify');

var _proxify2 = _interopRequireDefault(_proxify);

var _moduleStatuses = require('../../enums/moduleStatuses');

var _moduleStatuses2 = _interopRequireDefault(_moduleStatuses);

var _syncTypes = require('../../enums/syncTypes');

var _syncTypes2 = _interopRequireDefault(_syncTypes);

var _messageHelper = require('../../lib/messageHelper');

var messageHelper = _interopRequireWildcard(_messageHelper);

var _batchApiHelper = require('../../lib/batchApiHelper');

var _actionTypes = require('./actionTypes');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

var _getReducer = require('./getReducer');

var _getReducer2 = _interopRequireDefault(_getReducer);

var _getDataReducer = require('./getDataReducer');

var _getDataReducer2 = _interopRequireDefault(_getDataReducer);

var _errors = require('./errors');

var _errors2 = _interopRequireDefault(_errors);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  (0, _defineProperty2.default)(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

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

var DEFAULT_CONVERSATIONS_LOAD_LENGTH = 10;
var DEFAULT_CONVERSATION_LOAD_LENGTH = 100;
var DEFAULT_TTL = 30 * 60 * 1000;
var DEFAULT_RETRY = 62 * 1000;
var DEFAULT_DAYSPAN = 7; // default to load 7 days's messages

function getSyncParams(_ref) {
  var recordCount = _ref.recordCount,
      conversationLoadLength = _ref.conversationLoadLength,
      dateFrom = _ref.dateFrom,
      dateTo = _ref.dateTo,
      syncToken = _ref.syncToken;

  if (syncToken) {
    return {
      syncToken: syncToken,
      syncType: _syncTypes2.default.iSync
    };
  }
  var params = {
    recordCountPerConversation: conversationLoadLength,
    syncType: _syncTypes2.default.fSync
  };
  if (recordCount) {
    params.recordCount = recordCount;
  }
  if (dateFrom) {
    params.dateFrom = dateFrom.toISOString();
  }
  if (dateTo) {
    params.dateTo = dateTo.toISOString();
  }
  return params;
}

/**
 * @class

 * @description Messages data managing module
 * fetch conversations
 * handle new message subscription
 */
var MessageStore = (_dec = (0, _di.Module)({
  deps: ['Alert', 'Client', 'Auth', 'Subscription', 'ConnectivityMonitor', 'RolesAndPermissions', { dep: 'TabManager', optional: true }, { dep: 'Storage', optional: true }, { dep: 'MessageStoreOptions', optional: true }]
}), _dec(_class = (_class2 = function (_Pollable) {
  (0, _inherits3.default)(MessageStore, _Pollable);

  function MessageStore(_ref2) {
    var auth = _ref2.auth,
        alert = _ref2.alert,
        client = _ref2.client,
        subscription = _ref2.subscription,
        storage = _ref2.storage,
        tabManager = _ref2.tabManager,
        rolesAndPermissions = _ref2.rolesAndPermissions,
        connectivityMonitor = _ref2.connectivityMonitor,
        _ref2$ttl = _ref2.ttl,
        ttl = _ref2$ttl === undefined ? DEFAULT_TTL : _ref2$ttl,
        _ref2$polling = _ref2.polling,
        polling = _ref2$polling === undefined ? false : _ref2$polling,
        _ref2$disableCache = _ref2.disableCache,
        disableCache = _ref2$disableCache === undefined ? false : _ref2$disableCache,
        _ref2$timeToRetry = _ref2.timeToRetry,
        timeToRetry = _ref2$timeToRetry === undefined ? DEFAULT_RETRY : _ref2$timeToRetry,
        _ref2$daySpan = _ref2.daySpan,
        daySpan = _ref2$daySpan === undefined ? DEFAULT_DAYSPAN : _ref2$daySpan,
        _ref2$conversationsLo = _ref2.conversationsLoadLength,
        conversationsLoadLength = _ref2$conversationsLo === undefined ? DEFAULT_CONVERSATIONS_LOAD_LENGTH : _ref2$conversationsLo,
        _ref2$conversationLoa = _ref2.conversationLoadLength,
        conversationLoadLength = _ref2$conversationLoa === undefined ? DEFAULT_CONVERSATION_LOAD_LENGTH : _ref2$conversationLoa,
        options = (0, _objectWithoutProperties3.default)(_ref2, ['auth', 'alert', 'client', 'subscription', 'storage', 'tabManager', 'rolesAndPermissions', 'connectivityMonitor', 'ttl', 'polling', 'disableCache', 'timeToRetry', 'daySpan', 'conversationsLoadLength', 'conversationLoadLength']);
    (0, _classCallCheck3.default)(this, MessageStore);

    var _this = (0, _possibleConstructorReturn3.default)(this, (MessageStore.__proto__ || (0, _getPrototypeOf2.default)(MessageStore)).call(this, (0, _extends3.default)({}, options, {
      actionTypes: _actionTypes2.default
    })));

    _initDefineProp(_this, 'allConversations', _descriptor, _this);

    _initDefineProp(_this, 'textConversations', _descriptor2, _this);

    _initDefineProp(_this, 'textUnreadCounts', _descriptor3, _this);

    _initDefineProp(_this, 'faxMessages', _descriptor4, _this);

    _initDefineProp(_this, 'faxUnreadCounts', _descriptor5, _this);

    _initDefineProp(_this, 'voicemailMessages', _descriptor6, _this);

    _initDefineProp(_this, 'voiceUnreadCounts', _descriptor7, _this);

    _initDefineProp(_this, 'unreadCounts', _descriptor8, _this);

    _this._auth = _ensureExist2.default.call(_this, auth, 'auth');
    _this._alert = _ensureExist2.default.call(_this, alert, 'alert');
    _this._client = _ensureExist2.default.call(_this, client, 'client');
    _this._subscription = _ensureExist2.default.call(_this, subscription, 'subscription');
    _this._rolesAndPermissions = _ensureExist2.default.call(_this, rolesAndPermissions, 'rolesAndPermissions');

    if (!disableCache) {
      _this._storage = storage;
    }

    _this._dataStorageKey = 'messageStoreData';

    _this._tabManager = tabManager;
    _this._connectivityMonitor = connectivityMonitor;
    _this._ttl = ttl;
    _this._timeToRetry = timeToRetry;
    _this._polling = polling;
    _this._conversationsLoadLength = conversationsLoadLength;
    _this._conversationLoadLength = conversationLoadLength;

    _this._daySpan = daySpan;

    if (_this._storage) {
      _this._reducer = (0, _getReducer2.default)(_this.actionTypes);
      _this._storage.registerReducer({
        key: _this._dataStorageKey,
        reducer: (0, _getDataReducer2.default)(_this.actionTypes)
      });
    } else {
      _this._reducer = (0, _getReducer2.default)(_this.actionTypes, {
        data: (0, _getDataReducer2.default)(_this.actionTypes, false)
      });
    }

    _this._promise = null;
    _this._lastSubscriptionMessage = null;
    // setting up event handlers for message
    _this._newInboundMessageNotificationHandlers = [];
    _this._messageUpdatedHandlers = [];
    _this._dispatchedMessageIds = [];
    return _this;
  }

  (0, _createClass3.default)(MessageStore, [{
    key: 'initialize',
    value: function initialize() {
      var _this2 = this;

      this.store.subscribe(function () {
        return _this2._onStateChange();
      });
    }
  }, {
    key: '_onStateChange',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this._shouldInit()) {
                  _context.next = 7;
                  break;
                }

                this.store.dispatch({
                  type: this.actionTypes.init
                });
                if (this._connectivityMonitor) {
                  this._connectivity = this._connectivityMonitor.connectivity;
                }
                _context.next = 5;
                return this._init();

              case 5:
                _context.next = 8;
                break;

              case 7:
                if (this._isDataReady()) {
                  this.store.dispatch({
                    type: this.actionTypes.initSuccess
                  });
                  //
                } else if (this._shouldReset()) {
                  this._clearTimeout();
                  this._promise = null;
                  this.store.dispatch({
                    type: this.actionTypes.resetSuccess
                  });
                } else if (this.ready) {
                  this._subscriptionHandler();
                  this._checkConnectivity();
                }

              case 8:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function _onStateChange() {
        return _ref3.apply(this, arguments);
      }

      return _onStateChange;
    }()
  }, {
    key: '_shouldInit',
    value: function _shouldInit() {
      return !!(this._auth.loggedIn && (!this._storage || this._storage.ready) && (!this._tabManager || this._tabManager.ready) && (!this._connectivityMonitor || this._connectivityMonitor.ready) && this._subscription.ready && this._rolesAndPermissions.ready && this.pending);
    }
  }, {
    key: '_shouldReset',
    value: function _shouldReset() {
      return !!((!this._auth.loggedIn || this._storage && !this._storage.ready || !this._subscription.ready || !!this._connectivityMonitor && !this._connectivityMonitor.ready || !this._rolesAndPermissions.ready || this._tabManager && !this._tabManager.ready) && this.ready);
    }
  }, {
    key: '_isDataReady',
    value: function _isDataReady() {
      return this.status === _moduleStatuses2.default.initializing && this.syncInfo !== null;
    }
  }, {
    key: '_init',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (this._hasPermission) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt('return');

              case 2:
                if (!this._shouldFetch()) {
                  _context2.next = 14;
                  break;
                }

                _context2.prev = 3;
                _context2.next = 6;
                return this.fetchData();

              case 6:
                _context2.next = 12;
                break;

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2['catch'](3);

                console.error('fetchData error:', _context2.t0);
                this._retry();

              case 12:
                _context2.next = 15;
                break;

              case 14:
                if (this._polling) {
                  this._startPolling();
                } else {
                  this._retry();
                }

              case 15:
                this._subscription.subscribe('/account/~/extension/~/message-store');

              case 16:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[3, 8]]);
      }));

      function _init() {
        return _ref4.apply(this, arguments);
      }

      return _init;
    }()
  }, {
    key: '_shouldFetch',
    value: function _shouldFetch() {
      return !this._tabManager || this._tabManager.active;
    }
  }, {
    key: '_subscriptionHandler',
    value: function _subscriptionHandler() {
      if (this._storage && this._tabManager && !this._tabManager.active) {
        return;
      }
      var accountExtesionEndPoint = /\/message-store$/;
      var message = this._subscription.message;

      if (message && message !== this._lastSubscriptionMessage && accountExtesionEndPoint.test(message.event) && message.body && message.body.changes) {
        this._lastSubscriptionMessage = this._subscription.message;
        this.fetchData({ passive: true });
      }
    }
  }, {
    key: '_checkConnectivity',
    value: function _checkConnectivity() {
      if (this._connectivityMonitor && this._connectivityMonitor.ready && this._connectivity !== this._connectivityMonitor.connectivity) {
        this._connectivity = this._connectivityMonitor.connectivity;
        if (this._connectivity) {
          this.fetchData();
        }
      }
    }
  }, {
    key: '_syncFunction',
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(_ref5) {
        var recordCount = _ref5.recordCount,
            conversationLoadLength = _ref5.conversationLoadLength,
            dateFrom = _ref5.dateFrom,
            dateTo = _ref5.dateTo,
            syncToken = _ref5.syncToken,
            _ref5$receivedRecords = _ref5.receivedRecordsLength,
            receivedRecordsLength = _ref5$receivedRecords === undefined ? 0 : _ref5$receivedRecords;

        var params, _ref7, records, syncInfo, olderDateTo, olderRecordResult;

        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                params = getSyncParams({
                  recordCount: recordCount,
                  conversationLoadLength: conversationLoadLength,
                  dateFrom: dateFrom,
                  dateTo: dateTo,
                  syncToken: syncToken
                });
                _context3.next = 3;
                return this._client.account().extension().messageSync().list(params);

              case 3:
                _ref7 = _context3.sent;
                records = _ref7.records;
                syncInfo = _ref7.syncInfo;

                receivedRecordsLength += records.length;

                if (!(!syncInfo.olderRecordsExist || receivedRecordsLength >= recordCount)) {
                  _context3.next = 9;
                  break;
                }

                return _context3.abrupt('return', { records: records, syncInfo: syncInfo });

              case 9:
                _context3.next = 11;
                return (0, _sleep2.default)(500);

              case 11:
                olderDateTo = new Date(records[records.length - 1].creationTime);
                _context3.next = 14;
                return this._syncFunction({
                  conversationLoadLength: conversationLoadLength,
                  dateFrom: dateFrom,
                  dateTo: olderDateTo
                });

              case 14:
                olderRecordResult = _context3.sent;
                return _context3.abrupt('return', {
                  records: records.concat(olderRecordResult.records),
                  syncInfo: syncInfo
                });

              case 16:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function _syncFunction(_x) {
        return _ref6.apply(this, arguments);
      }

      return _syncFunction;
    }()
  }, {
    key: 'getSyncActionType',
    value: function getSyncActionType(_ref8) {
      var dateTo = _ref8.dateTo,
          syncToken = _ref8.syncToken;

      if (syncToken) {
        return this.actionTypes.conversationsISyncSuccess;
      }
      return this.actionTypes.conversationsFSyncSuccess;
    }
  }, {
    key: '_syncData',
    value: function () {
      var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
        var _ref10 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            dateTo = _ref10.dateTo,
            _ref10$conversationsL = _ref10.conversationsLoadLength,
            conversationsLoadLength = _ref10$conversationsL === undefined ? this._conversationsLoadLength : _ref10$conversationsL,
            _ref10$conversationLo = _ref10.conversationLoadLength,
            conversationLoadLength = _ref10$conversationLo === undefined ? this._conversationLoadLength : _ref10$conversationLo,
            _ref10$passive = _ref10.passive,
            passive = _ref10$passive === undefined ? false : _ref10$passive;

        var ownerId, dateFrom, syncToken, recordCount, data, actionType;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.conversationsSync
                });
                ownerId = this._auth.ownerId;
                _context4.prev = 2;
                dateFrom = new Date();

                dateFrom.setDate(dateFrom.getDate() - this._daySpan);
                syncToken = dateTo ? null : this.syncInfo && this.syncInfo.syncToken;
                recordCount = conversationsLoadLength * conversationLoadLength;
                data = void 0;
                _context4.prev = 8;
                _context4.next = 11;
                return this._syncFunction({
                  recordCount: recordCount,
                  conversationLoadLength: conversationLoadLength,
                  dateFrom: dateFrom,
                  syncToken: syncToken,
                  dateTo: dateTo
                });

              case 11:
                data = _context4.sent;
                _context4.next = 24;
                break;

              case 14:
                _context4.prev = 14;
                _context4.t0 = _context4['catch'](8);

                if (!(_context4.t0 && _context4.t0.message === 'Parameter [syncToken] value is invalid')) {
                  _context4.next = 23;
                  break;
                }

                _context4.next = 19;
                return this._syncFunction({
                  recordCount: recordCount,
                  conversationLoadLength: conversationLoadLength,
                  dateFrom: dateFrom,
                  syncToken: null,
                  dateTo: dateTo
                });

              case 19:
                data = _context4.sent;

                syncToken = null;
                _context4.next = 24;
                break;

              case 23:
                throw _context4.t0;

              case 24:
                if (this._auth.ownerId === ownerId) {
                  actionType = this.getSyncActionType({ dateTo: dateTo, syncToken: syncToken });

                  this.store.dispatch({
                    type: actionType,
                    recordCount: recordCount,
                    records: data.records,
                    syncInfo: data.syncInfo,
                    timestamp: Date.now(),
                    conversationStore: this.conversationStore
                  });
                  // this is only executed in passive sync mode (aka. invoked by subscription)
                  if (passive) {
                    this._dispatchMessageHandlers(data.records);
                  }
                }
                _context4.next = 33;
                break;

              case 27:
                _context4.prev = 27;
                _context4.t1 = _context4['catch'](2);

                if (!(this._auth.ownerId === ownerId)) {
                  _context4.next = 33;
                  break;
                }

                console.error(_context4.t1);
                this.store.dispatch({
                  type: this.actionTypes.conversationsSyncError,
                  error: _context4.t1
                });
                throw _context4.t1;

              case 33:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[2, 27], [8, 14]]);
      }));

      function _syncData() {
        return _ref9.apply(this, arguments);
      }

      return _syncData;
    }()
  }, {
    key: '_fetchData',
    value: function () {
      var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
        var _ref12 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            dateTo = _ref12.dateTo,
            conversationsLoadLength = _ref12.conversationsLoadLength,
            conversationLoadLength = _ref12.conversationLoadLength,
            _ref12$passive = _ref12.passive,
            passive = _ref12$passive === undefined ? false : _ref12$passive;

        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                _context5.next = 3;
                return this._syncData({
                  dateTo: dateTo,
                  conversationsLoadLength: conversationsLoadLength,
                  conversationLoadLength: conversationLoadLength,
                  passive: passive
                });

              case 3:
                if (this._polling) {
                  this._startPolling();
                }
                this._promise = null;
                _context5.next = 12;
                break;

              case 7:
                _context5.prev = 7;
                _context5.t0 = _context5['catch'](0);

                this._promise = null;
                if (this._polling) {
                  this._startPolling(this.timeToRetry);
                } else {
                  this._retry();
                }
                throw _context5.t0;

              case 12:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this, [[0, 7]]);
      }));

      function _fetchData() {
        return _ref11.apply(this, arguments);
      }

      return _fetchData;
    }()
  }, {
    key: '_startPolling',
    value: function _startPolling() {
      var _this3 = this;

      var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.timestamp + this.ttl + 10 - Date.now();

      this._clearTimeout();
      this._timeoutId = setTimeout(function () {
        _this3._timeoutId = null;
        if ((!_this3._tabManager || _this3._tabManager.active) && _this3.pageNumber === 1) {
          if (!_this3.timestamp || Date.now() - _this3.timestamp > _this3.ttl) {
            _this3.fetchData();
          } else {
            _this3._startPolling();
          }
        } else if (_this3.timestamp && Date.now() - _this3.timestamp < _this3.ttl) {
          _this3._startPolling();
        } else {
          _this3._startPolling(_this3.timeToRetry);
        }
      }, t);
    }
  }, {
    key: 'fetchData',
    value: function () {
      var _ref13 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
        var _ref14 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref14$passive = _ref14.passive,
            passive = _ref14$passive === undefined ? false : _ref14$passive;

        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!this._promise) {
                  this._promise = this._fetchData({ passive: passive });
                }
                _context6.next = 3;
                return this._promise;

              case 3:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function fetchData() {
        return _ref13.apply(this, arguments);
      }

      return fetchData;
    }()
  }, {
    key: 'onNewInboundMessage',
    value: function onNewInboundMessage(handler) {
      if (typeof handler === 'function') {
        this._newInboundMessageNotificationHandlers.push(handler);
      }
    }
  }, {
    key: 'onMessageUpdated',
    value: function onMessageUpdated(handler) {
      if (typeof handler === 'function') {
        this._messageUpdatedHandlers.push(handler);
      }
    }

    /**
     * Dispatch events to different handlers
     */

  }, {
    key: '_dispatchMessageHandlers',
    value: function _dispatchMessageHandlers(records) {
      var _this4 = this;

      // Sort all records by creation time
      records = records.slice().sort(function (a, b) {
        return new Date(a.creationTime).getTime() - new Date(b.creationTime).getTime();
      });

      var _loop = function _loop(record) {
        var _ref15 = record || {},
            id = _ref15.id,
            direction = _ref15.direction,
            availability = _ref15.availability,
            messageStatus = _ref15.messageStatus,
            readStatus = _ref15.readStatus,
            lastModifiedTime = _ref15.lastModifiedTime,
            creationTime = _ref15.creationTime;
        // Notify when new message incoming


        if (_this4._messageDispatched(record)) {
          return {
            v: void 0
          };
        }
        // Mark last 10 messages that dispatched
        // To present dispatching same record twice
        _this4._dispatchedMessageIds = [{ id: id, lastModifiedTime: lastModifiedTime }].concat(_this4._dispatchedMessageIds).slice(0, 20);
        _this4._messageUpdatedHandlers.forEach(function (handler) {
          return handler(record);
        });
        // For new inbound message notification
        if (direction === 'Inbound' && readStatus === 'Unread' && messageStatus === 'Received' && availability === 'Alive' && new Date(creationTime).getTime() > new Date(lastModifiedTime).getTime() - 600 * 1000) {
          _this4._newInboundMessageNotificationHandlers.forEach(function (handler) {
            return handler(record);
          });
        }
      };

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator3.default)(records), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var record = _step.value;

          var _ret = _loop(record);

          if ((typeof _ret === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret)) === "object") return _ret.v;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: '_messageDispatched',
    value: function _messageDispatched(message) {
      return this._dispatchedMessageIds.some(function (m) {
        return m.id === message.id && m.lastModifiedTime === message.lastModifiedTime;
      });
    }
  }, {
    key: 'pushMessages',
    value: function () {
      var _ref16 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(records) {
        return _regenerator2.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.updateMessages,
                  records: records
                });

              case 1:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function pushMessages(_x6) {
        return _ref16.apply(this, arguments);
      }

      return pushMessages;
    }()
  }, {
    key: 'pushMessage',
    value: function pushMessage(record) {
      this.pushMessages([record]);
    }
  }, {
    key: '_updateMessageApi',
    value: function () {
      var _ref17 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(messageId, status) {
        var body, updateRequest;
        return _regenerator2.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                body = {
                  readStatus: status
                };
                _context8.next = 3;
                return this._client.account().extension().messageStore(messageId).put(body);

              case 3:
                updateRequest = _context8.sent;
                return _context8.abrupt('return', updateRequest);

              case 5:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function _updateMessageApi(_x7, _x8) {
        return _ref17.apply(this, arguments);
      }

      return _updateMessageApi;
    }()
  }, {
    key: 'deleteMessageApi',
    value: function () {
      var _ref18 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(messageId) {
        var response;
        return _regenerator2.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return this._client.account().extension().messageStore(messageId).delete();

              case 2:
                response = _context9.sent;
                return _context9.abrupt('return', response);

              case 4:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function deleteMessageApi(_x9) {
        return _ref18.apply(this, arguments);
      }

      return deleteMessageApi;
    }()
  }, {
    key: '_batchUpdateMessagesApi',
    value: function () {
      var _ref19 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10(messageIds, body) {
        var ids, platform, responses;
        return _regenerator2.default.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                ids = decodeURIComponent(messageIds.join(','));
                platform = this._client.service.platform();
                _context10.next = 4;
                return (0, _batchApiHelper.batchPutApi)({
                  platform: platform,
                  url: '/account/~/extension/~/message-store/' + ids,
                  body: body
                });

              case 4:
                responses = _context10.sent;
                return _context10.abrupt('return', responses);

              case 6:
              case 'end':
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function _batchUpdateMessagesApi(_x10, _x11) {
        return _ref19.apply(this, arguments);
      }

      return _batchUpdateMessagesApi;
    }()
  }, {
    key: '_updateMessagesApi',
    value: function () {
      var _ref20 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11(messageIds, status) {
        var result, UPDATE_MESSAGE_ONCE_COUNT, leftIds, rightIds, body, responses, results, rightResults;
        return _regenerator2.default.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                if (!(messageIds.length === 1)) {
                  _context11.next = 5;
                  break;
                }

                _context11.next = 3;
                return this._updateMessageApi(messageIds[0], status);

              case 3:
                result = _context11.sent;
                return _context11.abrupt('return', [result]);

              case 5:
                UPDATE_MESSAGE_ONCE_COUNT = 20;
                leftIds = messageIds.slice(0, UPDATE_MESSAGE_ONCE_COUNT);
                rightIds = messageIds.slice(UPDATE_MESSAGE_ONCE_COUNT);
                body = leftIds.map(function () {
                  return { body: { readStatus: status } };
                });
                _context11.next = 11;
                return this._batchUpdateMessagesApi(leftIds, body);

              case 11:
                responses = _context11.sent;
                results = [];

                responses.forEach(function (res) {
                  if (res.response().status === 200) {
                    results.push(res.json());
                  }
                });

                if (!(rightIds.length > 0)) {
                  _context11.next = 19;
                  break;
                }

                _context11.next = 17;
                return this._updateMessagesApi(rightIds, status);

              case 17:
                rightResults = _context11.sent;

                if (rightResults.length > 0) {
                  results.concat(rightResults);
                }

              case 19:
                return _context11.abrupt('return', results);

              case 20:
              case 'end':
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function _updateMessagesApi(_x12, _x13) {
        return _ref20.apply(this, arguments);
      }

      return _updateMessagesApi;
    }()
  }, {
    key: 'readMessages',
    value: function () {
      var _ref21 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee12(conversationId) {
        var messageList, unreadMessageIds, updatedMessages;
        return _regenerator2.default.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                messageList = this.conversationStore[conversationId];

                if (!(!messageList || messageList.length === 0)) {
                  _context12.next = 3;
                  break;
                }

                return _context12.abrupt('return', null);

              case 3:
                unreadMessageIds = messageList.filter(messageHelper.messageIsUnread).map(function (m) {
                  return m.id;
                });

                if (!(unreadMessageIds.length === 0)) {
                  _context12.next = 6;
                  break;
                }

                return _context12.abrupt('return', null);

              case 6:
                _context12.prev = 6;
                _context12.next = 9;
                return this._updateMessagesApi(unreadMessageIds, 'Read');

              case 9:
                updatedMessages = _context12.sent;

                this.store.dispatch({
                  type: this.actionTypes.updateMessages,
                  records: updatedMessages
                });
                _context12.next = 17;
                break;

              case 13:
                _context12.prev = 13;
                _context12.t0 = _context12['catch'](6);

                console.error(_context12.t0);
                this._alert.warning({
                  message: _errors2.default.readFailed
                });

              case 17:
                return _context12.abrupt('return', null);

              case 18:
              case 'end':
                return _context12.stop();
            }
          }
        }, _callee12, this, [[6, 13]]);
      }));

      function readMessages(_x14) {
        return _ref21.apply(this, arguments);
      }

      return readMessages;
    }()
  }, {
    key: 'unreadMessage',
    value: function () {
      var _ref22 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee13(messageId) {
        var message;
        return _regenerator2.default.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                //  for track mark message
                this.store.dispatch({
                  type: this.actionTypes.markMessages
                });
                _context13.prev = 1;
                _context13.next = 4;
                return this._updateMessageApi(messageId, 'Unread');

              case 4:
                message = _context13.sent;

                this.store.dispatch({
                  type: this.actionTypes.updateMessages,
                  records: [message]
                });
                _context13.next = 12;
                break;

              case 8:
                _context13.prev = 8;
                _context13.t0 = _context13['catch'](1);

                console.error(_context13.t0);
                this._alert.warning({
                  message: _errors2.default.unreadFailed
                });

              case 12:
              case 'end':
                return _context13.stop();
            }
          }
        }, _callee13, this, [[1, 8]]);
      }));

      function unreadMessage(_x15) {
        return _ref22.apply(this, arguments);
      }

      return unreadMessage;
    }()
  }, {
    key: 'onUnmarkMessages',
    value: function () {
      var _ref23 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee14() {
        return _regenerator2.default.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.markMessages
                });

              case 1:
              case 'end':
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));

      function onUnmarkMessages() {
        return _ref23.apply(this, arguments);
      }

      return onUnmarkMessages;
    }()
  }, {
    key: 'deleteConversationMessages',
    value: function () {
      var _ref24 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee15(conversationId) {
        var messageList, messageId;
        return _regenerator2.default.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                if (conversationId) {
                  _context15.next = 2;
                  break;
                }

                return _context15.abrupt('return');

              case 2:
                messageList = this.conversationStore[conversationId];

                if (!(!messageList || messageList.length === 0)) {
                  _context15.next = 5;
                  break;
                }

                return _context15.abrupt('return');

              case 5:
                messageId = messageList.map(function (m) {
                  return m.id;
                }).join(',');
                _context15.prev = 6;
                _context15.next = 9;
                return this.deleteMessageApi(messageId);

              case 9:
                this.store.dispatch({
                  type: this.actionTypes.deleteConversation,
                  conversationId: conversationId
                });
                _context15.next = 16;
                break;

              case 12:
                _context15.prev = 12;
                _context15.t0 = _context15['catch'](6);

                console.error(_context15.t0);
                this._alert.warning({
                  message: _errors2.default.deleteFailed
                });

              case 16:
              case 'end':
                return _context15.stop();
            }
          }
        }, _callee15, this, [[6, 12]]);
      }));

      function deleteConversationMessages(_x16) {
        return _ref24.apply(this, arguments);
      }

      return deleteConversationMessages;
    }()
  }, {
    key: 'deleteConversation',
    value: function () {
      var _ref25 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee16(conversationId) {
        return _regenerator2.default.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                if (conversationId) {
                  _context16.next = 2;
                  break;
                }

                return _context16.abrupt('return');

              case 2:
                _context16.prev = 2;
                _context16.next = 5;
                return this._client.account().extension().messageStore().delete({
                  conversationId: conversationId
                });

              case 5:
                this.store.dispatch({
                  type: this.actionTypes.deleteConversation,
                  conversationId: conversationId
                });
                _context16.next = 12;
                break;

              case 8:
                _context16.prev = 8;
                _context16.t0 = _context16['catch'](2);

                console.error(_context16.t0);
                this._alert.warning({
                  message: _errors2.default.deleteFailed
                });

              case 12:
              case 'end':
                return _context16.stop();
            }
          }
        }, _callee16, this, [[2, 8]]);
      }));

      function deleteConversation(_x17) {
        return _ref25.apply(this, arguments);
      }

      return deleteConversation;
    }()

    // for track click to sms in message list

  }, {
    key: 'onClickToSMS',
    value: function onClickToSMS() {
      this.store.dispatch({
        type: this.actionTypes.clickToSMS
      });
    }

    // for track click to call in message list

  }, {
    key: 'onClickToCall',
    value: function onClickToCall(_ref26) {
      var _ref26$fromType = _ref26.fromType,
          fromType = _ref26$fromType === undefined ? '' : _ref26$fromType;

      this.store.dispatch({
        type: this.actionTypes.clickToCall,
        fromType: fromType
      });
    }
  }, {
    key: 'status',
    get: function get() {
      return this.state.status;
    }
  }, {
    key: 'data',
    get: function get() {
      return this._storage ? this._storage.getItem(this._dataStorageKey) : this.state.data;
    }
  }, {
    key: 'timestamp',
    get: function get() {
      return this.data && this.data.timestamp;
    }
  }, {
    key: 'timeToRetry',
    get: function get() {
      return this._timeToRetry;
    }
  }, {
    key: 'ttl',
    get: function get() {
      return this._ttl;
    }
  }, {
    key: 'syncInfo',
    get: function get() {
      return this.data && this.data.syncInfo;
    }
  }, {
    key: 'conversationStore',
    get: function get() {
      return this.data && this.data.conversationStore;
    }
  }, {
    key: '_hasPermission',
    get: function get() {
      return this._rolesAndPermissions.hasReadMessagesPermission;
    }
  }]);
  return MessageStore;
}(_Pollable3.default), (_applyDecoratedDescriptor(_class2.prototype, 'fetchData', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'fetchData'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'pushMessages', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'pushMessages'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'readMessages', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'readMessages'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'unreadMessage', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'unreadMessage'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'onUnmarkMessages', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'onUnmarkMessages'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'deleteConversationMessages', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'deleteConversationMessages'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'deleteConversation', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'deleteConversation'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'onClickToSMS', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'onClickToSMS'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'onClickToCall', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'onClickToCall'), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, 'allConversations', [_getter2.default], {
  enumerable: true,
  initializer: function initializer() {
    var _this5 = this;

    return (0, _reselect.createSelector)(function () {
      return _this5.data && _this5.data.conversationList;
    }, function () {
      return _this5.conversationStore;
    }, function () {
      var conversationList = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var conversationStore = arguments[1];
      return conversationList.map(function (conversationItem) {
        var messageList = conversationStore[conversationItem.id] || [];
        return (0, _extends3.default)({}, messageList[0], {
          unreadCounts: messageList.filter(messageHelper.messageIsUnread).length
        });
      });
    });
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'textConversations', [_getter2.default], {
  enumerable: true,
  initializer: function initializer() {
    var _this6 = this;

    return (0, _reselect.createSelector)(function () {
      return _this6.allConversations;
    }, function (conversations) {
      return conversations.filter(function (conversation) {
        return messageHelper.messageIsTextMessage(conversation);
      });
    });
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'textUnreadCounts', [_getter2.default], {
  enumerable: true,
  initializer: function initializer() {
    var _this7 = this;

    return (0, _reselect.createSelector)(function () {
      return _this7.textConversations;
    }, function (conversations) {
      return conversations.reduce(function (a, b) {
        return a + b.unreadCounts;
      }, 0);
    });
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'faxMessages', [_getter2.default], {
  enumerable: true,
  initializer: function initializer() {
    var _this8 = this;

    return (0, _reselect.createSelector)(function () {
      return _this8.allConversations;
    }, function (conversations) {
      return conversations.filter(function (conversation) {
        return messageHelper.messageIsFax(conversation);
      });
    });
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, 'faxUnreadCounts', [_getter2.default], {
  enumerable: true,
  initializer: function initializer() {
    var _this9 = this;

    return (0, _reselect.createSelector)(function () {
      return _this9.faxMessages;
    }, function (conversations) {
      return conversations.reduce(function (a, b) {
        return a + b.unreadCounts;
      }, 0);
    });
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, 'voicemailMessages', [_getter2.default], {
  enumerable: true,
  initializer: function initializer() {
    var _this10 = this;

    return (0, _reselect.createSelector)(function () {
      return _this10.allConversations;
    }, function (conversations) {
      return conversations.filter(function (conversation) {
        return messageHelper.messageIsVoicemail(conversation);
      });
    });
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, 'voiceUnreadCounts', [_getter2.default], {
  enumerable: true,
  initializer: function initializer() {
    var _this11 = this;

    return (0, _reselect.createSelector)(function () {
      return _this11.voicemailMessages;
    }, function (conversations) {
      return conversations.reduce(function (a, b) {
        return a + b.unreadCounts;
      }, 0);
    });
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, 'unreadCounts', [_getter2.default], {
  enumerable: true,
  initializer: function initializer() {
    var _this12 = this;

    return (0, _reselect.createSelector)(function () {
      return _this12.voiceUnreadCounts;
    }, function () {
      return _this12.textUnreadCounts;
    }, function () {
      return _this12.faxUnreadCounts;
    }, function (voiceUnreadCounts, textUnreadCounts, faxUnreadCounts) {
      var unreadCounts = 0;
      if (_this12._rolesAndPermissions.readTextPermissions) {
        unreadCounts += textUnreadCounts;
      }
      if (_this12._rolesAndPermissions.voicemailPermissions) {
        unreadCounts += voiceUnreadCounts;
      }
      if (_this12._rolesAndPermissions.readFaxPermissions) {
        unreadCounts += faxUnreadCounts;
      }
      return unreadCounts;
    });
  }
})), _class2)) || _class);
exports.default = MessageStore;
//# sourceMappingURL=index.js.map
