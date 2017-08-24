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

var _desc, _value, _class;

var _Pollable2 = require('../../lib/Pollable');

var _Pollable3 = _interopRequireDefault(_Pollable2);

var _sleep = require('../../lib/sleep');

var _sleep2 = _interopRequireDefault(_sleep);

var _syncTypes = require('../../enums/syncTypes');

var _syncTypes2 = _interopRequireDefault(_syncTypes);

var _actionTypes = require('./actionTypes');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

var _proxify = require('../../lib/proxy/proxify');

var _proxify2 = _interopRequireDefault(_proxify);

var _getAddressBookReducer = require('./getAddressBookReducer');

var _getAddressBookReducer2 = _interopRequireDefault(_getAddressBookReducer);

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

var CONTACTS_PER_PAGE = 250;
var DEFAULT_TTL = 30 * 60 * 1000;
var DEFAULT_TIME_TO_RETRY = 62 * 1000;

function getSyncParams(syncToken, pageId) {
  var query = {
    perPage: CONTACTS_PER_PAGE
  };
  if (syncToken) {
    query.syncToken = syncToken;
    query.syncType = _syncTypes2.default.iSync;
  } else {
    query.syncType = _syncTypes2.default.fSync;
  }
  if (pageId) {
    query.pageId = pageId;
  }
  return query;
}

var AddressBook = (_class = function (_Pollable) {
  (0, _inherits3.default)(AddressBook, _Pollable);

  function AddressBook(_ref) {
    var client = _ref.client,
        auth = _ref.auth,
        storage = _ref.storage,
        _ref$ttl = _ref.ttl,
        ttl = _ref$ttl === undefined ? DEFAULT_TTL : _ref$ttl,
        _ref$timeToRetry = _ref.timeToRetry,
        timeToRetry = _ref$timeToRetry === undefined ? DEFAULT_TIME_TO_RETRY : _ref$timeToRetry,
        _ref$polling = _ref.polling,
        polling = _ref$polling === undefined ? true : _ref$polling,
        options = (0, _objectWithoutProperties3.default)(_ref, ['client', 'auth', 'storage', 'ttl', 'timeToRetry', 'polling']);
    (0, _classCallCheck3.default)(this, AddressBook);

    var _this = (0, _possibleConstructorReturn3.default)(this, (AddressBook.__proto__ || (0, _getPrototypeOf2.default)(AddressBook)).call(this, (0, _extends3.default)({}, options, {
      actionTypes: _actionTypes2.default
    })));

    _this._client = client;
    _this._storage = storage;
    _this._auth = auth;
    _this._ttl = ttl;
    _this._timeToRetry = timeToRetry;
    _this._polling = polling;
    _this._promise = null;
    _this._syncTokenStorageKey = 'contactsSyncToken';
    _this._syncTimestampStorageKey = 'contactsSyncTimestamp';
    _this._addressBookStorageKey = 'addressBookContactsList';
    _this._reducer = (0, _getAddressBookReducer2.default)(_this.actionTypes);
    _this._storage.registerReducer({
      key: _this._syncTokenStorageKey,
      reducer: (0, _getAddressBookReducer.getSyncTokenReducer)(_this.actionTypes)
    });
    _this._storage.registerReducer({
      key: _this._syncTimestampStorageKey,
      reducer: (0, _getAddressBookReducer.getSyncTimestampReducer)(_this.actionTypes)
    });
    _this._storage.registerReducer({
      key: _this._addressBookStorageKey,
      reducer: (0, _getAddressBookReducer.getContactListReducer)(_this.actionTypes)
    });
    return _this;
  }

  (0, _createClass3.default)(AddressBook, [{
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
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this._shouldInit()) {
                  _context.next = 8;
                  break;
                }

                this.store.dispatch({
                  type: this.actionTypes.init
                });
                if (this._shouleCleanCache()) {
                  this._cleanUp();
                }
                _context.next = 5;
                return this._initAddressBook();

              case 5:
                this.store.dispatch({
                  type: this.actionTypes.initSuccess
                });
                _context.next = 9;
                break;

              case 8:
                if (this._shouldReset()) {
                  this._resetModuleStatus();
                }

              case 9:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function _onStateChange() {
        return _ref2.apply(this, arguments);
      }

      return _onStateChange;
    }()
  }, {
    key: '_shouldInit',
    value: function _shouldInit() {
      return this._storage.ready && this._auth.loggedIn && this.pending;
    }
  }, {
    key: '_shouldReset',
    value: function _shouldReset() {
      return (!this._storage.ready || !this._auth.loggedIn) && this.ready;
    }
  }, {
    key: '_shouleCleanCache',
    value: function _shouleCleanCache() {
      return this._auth.isFreshLogin || !this.timestamp || Date.now() - this.timestamp > this._ttl;
    }
  }, {
    key: '_initAddressBook',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return this.sync();

              case 3:
                _context2.next = 8;
                break;

              case 5:
                _context2.prev = 5;
                _context2.t0 = _context2['catch'](0);

                console.error(_context2.t0);

              case 8:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 5]]);
      }));

      function _initAddressBook() {
        return _ref3.apply(this, arguments);
      }

      return _initAddressBook;
    }()
  }, {
    key: '_resetModuleStatus',
    value: function _resetModuleStatus() {
      this.store.dispatch({
        type: this.actionTypes.reset
      });
      this._clearTimeout();
      this._promise = null;
      this.store.dispatch({
        type: this.actionTypes.resetSuccess
      });
    }
  }, {
    key: 'sync',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
        var _this3 = this;

        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!this._promise) {
                  this._promise = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
                    var response;
                    return _regenerator2.default.wrap(function _callee3$(_context3) {
                      while (1) {
                        switch (_context3.prev = _context3.next) {
                          case 0:
                            _context3.prev = 0;

                            _this3.store.dispatch({
                              type: _this3.actionTypes.sync
                            });
                            _context3.next = 4;
                            return _this3._sync(_this3.syncToken);

                          case 4:
                            response = _context3.sent;

                            _this3.store.dispatch({
                              type: _this3.actionTypes.syncSuccess,
                              records: response.records,
                              syncToken: response.syncInfo.syncToken,
                              syncTime: response.syncInfo.syncTime
                            });
                            if (_this3._polling) {
                              _this3._startPolling();
                            }
                            _context3.next = 14;
                            break;

                          case 9:
                            _context3.prev = 9;
                            _context3.t0 = _context3['catch'](0);

                            _this3._onSyncError();
                            if (_this3._polling) {
                              _this3._startPolling(_this3.timeToRetry);
                            } else {
                              _this3._retry();
                            }
                            throw _context3.t0;

                          case 14:
                            _this3._promise = null;

                          case 15:
                          case 'end':
                            return _context3.stop();
                        }
                      }
                    }, _callee3, _this3, [[0, 9]]);
                  }))();
                }

              case 1:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function sync() {
        return _ref4.apply(this, arguments);
      }

      return sync;
    }()
  }, {
    key: '_onSyncError',
    value: function _onSyncError() {
      this.store.dispatch({
        type: this.actionTypes.syncError
      });
    }
  }, {
    key: '_sync',
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(syncToken, pageId) {
        var params, response, lastResponse;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                params = getSyncParams(syncToken, pageId);
                _context5.next = 3;
                return this._syncAddressBookApi(params);

              case 3:
                response = _context5.sent;

                if (response.nextPageId) {
                  _context5.next = 6;
                  break;
                }

                return _context5.abrupt('return', response);

              case 6:
                _context5.next = 8;
                return (0, _sleep2.default)(1000);

              case 8:
                _context5.next = 10;
                return this._sync(syncToken, response.nextPageId);

              case 10:
                lastResponse = _context5.sent;
                return _context5.abrupt('return', (0, _extends3.default)({}, lastResponse, {
                  records: response.records.concat(lastResponse.records)
                }));

              case 12:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function _sync(_x, _x2) {
        return _ref6.apply(this, arguments);
      }

      return _sync;
    }()
  }, {
    key: '_syncAddressBookApi',
    value: function () {
      var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(params) {
        var updateRequest;
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this._client.account().extension().addressBookSync().list(params);

              case 2:
                updateRequest = _context6.sent;
                return _context6.abrupt('return', updateRequest);

              case 4:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function _syncAddressBookApi(_x3) {
        return _ref7.apply(this, arguments);
      }

      return _syncAddressBookApi;
    }()
  }, {
    key: '_cleanUp',
    value: function _cleanUp() {
      this.store.dispatch({
        type: this.actionTypes.cleanUp
      });
    }
  }, {
    key: 'fetchData',
    value: function () {
      var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7() {
        return _regenerator2.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return this.sync();

              case 2:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function fetchData() {
        return _ref8.apply(this, arguments);
      }

      return fetchData;
    }()
  }, {
    key: 'status',
    get: function get() {
      return this.state.status;
    }
  }, {
    key: 'syncToken',
    get: function get() {
      return this._storage.getItem(this._syncTokenStorageKey);
    }
  }, {
    key: 'contacts',
    get: function get() {
      return this._storage.getItem(this._addressBookStorageKey);
    }
  }, {
    key: 'timestamp',
    get: function get() {
      return this._storage.getItem(this._syncTimestampStorageKey);
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
  }]);
  return AddressBook;
}(_Pollable3.default), (_applyDecoratedDescriptor(_class.prototype, 'sync', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'sync'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_sync', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, '_sync'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_syncAddressBookApi', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, '_syncAddressBookApi'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'fetchData', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'fetchData'), _class.prototype)), _class);
exports.default = AddressBook;
//# sourceMappingURL=index.js.map
