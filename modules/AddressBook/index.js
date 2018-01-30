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

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

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

var _di = require('../../lib/di');

var _Pollable2 = require('../../lib/Pollable');

var _Pollable3 = _interopRequireDefault(_Pollable2);

var _sleep = require('../../lib/sleep');

var _sleep2 = _interopRequireDefault(_sleep);

var _moduleStatuses = require('../../enums/moduleStatuses');

var _moduleStatuses2 = _interopRequireDefault(_moduleStatuses);

var _syncTypes = require('../../enums/syncTypes');

var _syncTypes2 = _interopRequireDefault(_syncTypes);

var _actionTypes = require('./actionTypes');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

var _proxify = require('../../lib/proxy/proxify');

var _proxify2 = _interopRequireDefault(_proxify);

var _contactHelper = require('../../lib/contactHelper');

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
var REGX_DECODE = /&\w+;/g;
var DECODE = {
  '&amp;': '&',
  '&bsol;': '\\',
  '&sol;': '/',
  '&apos;': '\''
};

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

/**
 * @class
 * @description Accound book module to get user person contacts in RC
 */
var AddressBook = (_dec = (0, _di.Module)({
  deps: ['Client', 'Auth', 'RolesAndPermissions', { dep: 'Storage', optional: true }, { dep: 'TabManager', optional: true }, { dep: 'AddressBookOptions', optional: true }]
}), _dec(_class = (_class2 = function (_Pollable) {
  (0, _inherits3.default)(AddressBook, _Pollable);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Client} params.client - client module instance
   * @param {Auth} params.auth - Auth module instance
   * @param {TabManager} params.tabManage - TabManager module instance
   * @param {Storage} params.storage - storage module instance, optional
   * @param {Number} params.ttl - local cache timestamp, default 30 mins
   * @param {Number} params.timeToRetry - timestamp to retry, default 62 seconds
   * @param {Bool} params.polling - polling flag, default true
   * @param {Bool} params.disableCache - polling flag, default false
   */
  function AddressBook(_ref) {
    var client = _ref.client,
        auth = _ref.auth,
        storage = _ref.storage,
        tabManager = _ref.tabManager,
        rolesAndPermissions = _ref.rolesAndPermissions,
        _ref$ttl = _ref.ttl,
        ttl = _ref$ttl === undefined ? DEFAULT_TTL : _ref$ttl,
        _ref$timeToRetry = _ref.timeToRetry,
        timeToRetry = _ref$timeToRetry === undefined ? DEFAULT_TIME_TO_RETRY : _ref$timeToRetry,
        _ref$polling = _ref.polling,
        polling = _ref$polling === undefined ? true : _ref$polling,
        _ref$disableCache = _ref.disableCache,
        disableCache = _ref$disableCache === undefined ? false : _ref$disableCache,
        options = (0, _objectWithoutProperties3.default)(_ref, ['client', 'auth', 'storage', 'tabManager', 'rolesAndPermissions', 'ttl', 'timeToRetry', 'polling', 'disableCache']);
    (0, _classCallCheck3.default)(this, AddressBook);

    var _this = (0, _possibleConstructorReturn3.default)(this, (AddressBook.__proto__ || (0, _getPrototypeOf2.default)(AddressBook)).call(this, (0, _extends3.default)({}, options, {
      actionTypes: _actionTypes2.default
    })));

    _this._client = client;
    if (!disableCache) {
      _this._storage = storage;
    }
    _this._auth = auth;
    _this._tabManager = tabManager;
    _this._ttl = ttl;
    _this._rolesAndPermissions = rolesAndPermissions;
    _this._timeToRetry = timeToRetry;
    _this._polling = polling;
    _this._promise = null;
    _this._syncTokenStorageKey = 'contactsSyncToken';
    _this._syncTimestampStorageKey = 'contactsSyncTimestamp';
    _this._addressBookStorageKey = 'addressBookContactsList';
    if (_this._storage) {
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
    } else {
      _this._reducer = (0, _getAddressBookReducer2.default)(_this.actionTypes, {
        contactList: (0, _getAddressBookReducer.getContactListReducer)(_this.actionTypes),
        syncToken: (0, _getAddressBookReducer.getSyncTokenReducer)(_this.actionTypes),
        syncTimestamp: (0, _getAddressBookReducer.getSyncTimestampReducer)(_this.actionTypes)
      });
    }

    _this.addSelector('contacts', function () {
      return _this.rawContacts;
    }, function (rawContacts) {
      var contactsList = [];
      rawContacts.forEach(function (rawContact) {
        var contact = (0, _extends3.default)({
          type: _this.sourceName,
          phoneNumbers: [],
          emails: []
        }, rawContact);
        contact.id = '' + contact.id;
        contact.name = (contact.firstName || '') + ' ' + (contact.lastName || '');
        if (contact.email) contact.emails.push(contact.email);
        if (contact.email2) contact.emails.push(contact.email2);
        (0, _keys2.default)(contact).forEach(function (key) {
          if (key.toLowerCase().indexOf('phone') === -1) {
            return;
          }
          if (typeof contact[key] !== 'string') {
            return;
          }
          (0, _contactHelper.addPhoneToContact)(contact, contact[key], key);
        });
        contactsList.push(contact);
      });
      return contactsList;
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
                  _context.next = 11;
                  break;
                }

                this.store.dispatch({
                  type: this.actionTypes.init
                });
                if (this._shouleCleanCache()) {
                  this._cleanUp();
                }

                if (!this._hasPermission) {
                  _context.next = 8;
                  break;
                }

                _context.next = 6;
                return this._initAddressBook();

              case 6:
                _context.next = 9;
                break;

              case 8:
                this.store.dispatch({
                  type: this.actionTypes.initSuccess
                });

              case 9:
                _context.next = 12;
                break;

              case 11:
                if (this._isDataReady()) {
                  this.store.dispatch({
                    type: this.actionTypes.initSuccess
                  });
                } else if (this._shouldReset()) {
                  this._resetModuleStatus();
                }

              case 12:
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
      return (!this._storage || this._storage.ready) && (!this._tabManager || this._tabManager.ready) && this._rolesAndPermissions.ready && this._auth.loggedIn && this.pending;
    }
  }, {
    key: '_shouldReset',
    value: function _shouldReset() {
      return (!!this._storage && !this._storage.ready || !!this._tabManager && !this._tabManager.ready || !this._rolesAndPermissions.ready || !this._auth.loggedIn) && this.ready;
    }
  }, {
    key: '_shouleCleanCache',
    value: function _shouleCleanCache() {
      return this._auth.isFreshLogin || !this.timestamp || Date.now() - this.timestamp > this._ttl;
    }
  }, {
    key: '_shouldFetch',
    value: function _shouldFetch() {
      return (!this._storage || !this._tabManager || this._tabManager.active) && this._shouleCleanCache();
    }
  }, {
    key: '_isDataReady',
    value: function _isDataReady() {
      // only turns ready when data has been fetched
      // (could be from other tabs)
      return this.status === _moduleStatuses2.default.initializing && this.syncToken !== null;
    }
  }, {
    key: '_initAddressBook',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
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
                  _context2.next = 13;
                  break;
                }

                _context2.prev = 3;
                _context2.next = 6;
                return this.sync();

              case 6:
                _context2.next = 11;
                break;

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2['catch'](3);

                console.error('syncData error:', _context2.t0);

              case 11:
                _context2.next = 14;
                break;

              case 13:
                if (this._polling) {
                  this._startPolling();
                } else {
                  this._retry();
                }

              case 14:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[3, 8]]);
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
                _context4.next = 3;
                return this._promise;

              case 3:
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

                this._decodeAddressBook(updateRequest);
                return _context6.abrupt('return', updateRequest);

              case 5:
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
    key: '_decode',
    value: function _decode(text) {
      return text.replace(REGX_DECODE, function ($0) {
        var handleText = $0;
        if (DECODE[$0]) {
          handleText = DECODE[$0];
        }
        return handleText;
      });
    }
  }, {
    key: '_decodeAddressBook',
    value: function _decodeAddressBook(origin) {
      var _this4 = this;

      if (origin && origin.records && Array.isArray(origin.records)) {
        origin.records.forEach(function (record) {
          if (record.firstName) {
            record.firstName = _this4._decode(record.firstName);
          }
          if (record.lastName) {
            record.lastName = _this4._decode(record.lastName);
          }
        });
      }
    }
  }, {
    key: '_cleanUp',
    value: function _cleanUp() {
      this.store.dispatch({
        type: this.actionTypes.cleanUp
      });
    }

    // interface of contact source

  }, {
    key: 'matchPhoneNumber',
    value: function matchPhoneNumber(phoneNumber) {
      return (0, _contactHelper.getMatchContacts)({
        contacts: this.contacts,
        phoneNumber: phoneNumber,
        entityType: 'rcContact'
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
    key: '_hasPermission',
    get: function get() {
      return !!this._rolesAndPermissions.permissions.ReadPersonalContacts;
    }
  }, {
    key: 'status',
    get: function get() {
      return this.state.status;
    }
  }, {
    key: 'syncToken',
    get: function get() {
      if (this._storage) {
        return this._storage.getItem(this._syncTokenStorageKey);
      }
      return this.state.syncToken;
    }
  }, {
    key: 'rawContacts',
    get: function get() {
      if (this._storage) {
        return this._storage.getItem(this._addressBookStorageKey);
      }
      return this.state.contactList;
    }
  }, {
    key: 'timestamp',
    get: function get() {
      if (this._storage) {
        return this._storage.getItem(this._syncTimestampStorageKey);
      }
      return this.state.syncTimestamp;
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

    // interface of contact source

  }, {
    key: 'sourceName',
    get: function get() {
      return 'personal';
    }

    // interface of contact source

  }, {
    key: 'contacts',
    get: function get() {
      return this._selectors.contacts();
    }
  }, {
    key: 'sourceReady',
    get: function get() {
      return this.ready;
    }
  }]);
  return AddressBook;
}(_Pollable3.default), (_applyDecoratedDescriptor(_class2.prototype, 'sync', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'sync'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, '_sync', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, '_sync'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, '_syncAddressBookApi', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, '_syncAddressBookApi'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'fetchData', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'fetchData'), _class2.prototype)), _class2)) || _class);
exports.default = AddressBook;
//# sourceMappingURL=index.js.map
