"use strict";

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/es6.date.now");

require("regenerator-runtime/runtime");

var _redux = require("redux");

var _di = require("../../lib/di");

var _Pollable2 = _interopRequireDefault(require("../../lib/Pollable"));

var _sleep = _interopRequireDefault(require("../../lib/sleep"));

var _moduleStatuses = _interopRequireDefault(require("../../enums/moduleStatuses"));

var _syncTypes = _interopRequireDefault(require("../../enums/syncTypes"));

var _actionTypes = _interopRequireDefault(require("./actionTypes"));

var _proxify = _interopRequireDefault(require("../../lib/proxy/proxify"));

var _selector = require("../../lib/selector");

var _contactHelper = require("../../lib/contactHelper");

var _getAddressBookReducer = _interopRequireWildcard(require("./getAddressBookReducer"));

var _dec, _class, _class2, _descriptor, _temp;

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

var CONTACTS_PER_PAGE = 250;
var DEFAULT_TTL = 30 * 60 * 1000;
var DEFAULT_TIME_TO_RETRY = 62 * 1000;
var REGX_DECODE = /&\w+;/g;
var DECODE = {
  '&amp;': '&',
  '&bsol;': '\\',
  '&sol;': '/',
  '&apos;': "'"
};

function getSyncParams(syncToken, pageId) {
  var query = {
    perPage: CONTACTS_PER_PAGE
  };

  if (syncToken) {
    query.syncToken = syncToken;
    query.syncType = _syncTypes["default"].iSync;
  } else {
    query.syncType = _syncTypes["default"].fSync;
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
  deps: ['Client', 'Auth', 'RolesAndPermissions', {
    dep: 'Storage',
    optional: true
  }, {
    dep: 'TabManager',
    optional: true
  }, {
    dep: 'AddressBookOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Pollable) {
  _inherits(AddressBook, _Pollable);

  var _super = _createSuper(AddressBook);

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
    var _this;

    var client = _ref.client,
        auth = _ref.auth,
        storage = _ref.storage,
        tabManager = _ref.tabManager,
        rolesAndPermissions = _ref.rolesAndPermissions,
        _ref$ttl = _ref.ttl,
        ttl = _ref$ttl === void 0 ? DEFAULT_TTL : _ref$ttl,
        _ref$timeToRetry = _ref.timeToRetry,
        timeToRetry = _ref$timeToRetry === void 0 ? DEFAULT_TIME_TO_RETRY : _ref$timeToRetry,
        _ref$polling = _ref.polling,
        polling = _ref$polling === void 0 ? true : _ref$polling,
        _ref$disableCache = _ref.disableCache,
        disableCache = _ref$disableCache === void 0 ? false : _ref$disableCache,
        options = _objectWithoutProperties(_ref, ["client", "auth", "storage", "tabManager", "rolesAndPermissions", "ttl", "timeToRetry", "polling", "disableCache"]);

    _classCallCheck(this, AddressBook);

    _this = _super.call(this, _objectSpread(_objectSpread({}, options), {}, {
      actionTypes: _actionTypes["default"]
    }));

    _initializerDefineProperty(_this, "contacts", _descriptor, _assertThisInitialized(_this));

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
    _this._addressBookStorageKey = 'addressBookContactsList';

    if (_this._storage) {
      _this._reducer = (0, _getAddressBookReducer["default"])(_this.actionTypes);

      _this._storage.registerReducer({
        key: _this._addressBookStorageKey,
        reducer: (0, _redux.combineReducers)({
          syncToken: (0, _getAddressBookReducer.getSyncTokenReducer)(_this.actionTypes),
          timestamp: (0, _getAddressBookReducer.getTimestampReducer)(_this.actionTypes),
          contactList: (0, _getAddressBookReducer.getContactListReducer)(_this.actionTypes)
        })
      });
    } else {
      _this._reducer = (0, _getAddressBookReducer["default"])(_this.actionTypes, {
        contactList: (0, _getAddressBookReducer.getContactListReducer)(_this.actionTypes),
        syncToken: (0, _getAddressBookReducer.getSyncTokenReducer)(_this.actionTypes),
        timestamp: (0, _getAddressBookReducer.getTimestampReducer)(_this.actionTypes)
      });
    }

    return _this;
  }

  _createClass(AddressBook, [{
    key: "initialize",
    value: function initialize() {
      var _this2 = this;

      this.store.subscribe(function () {
        return _this2._onStateChange();
      });
    }
  }, {
    key: "_onStateChange",
    value: function () {
      var _onStateChange2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
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
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function _onStateChange() {
        return _onStateChange2.apply(this, arguments);
      }

      return _onStateChange;
    }()
  }, {
    key: "_shouldInit",
    value: function _shouldInit() {
      return (!this._storage || this._storage.ready) && (!this._tabManager || this._tabManager.ready) && this._rolesAndPermissions.ready && this._auth.loggedIn && this.pending;
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return (!!this._storage && !this._storage.ready || !!this._tabManager && !this._tabManager.ready || !this._rolesAndPermissions.ready || !this._auth.loggedIn) && this.ready;
    }
  }, {
    key: "_shouleCleanCache",
    value: function _shouleCleanCache() {
      return this._auth.isFreshLogin || !this.timestamp || Date.now() - this.timestamp > this._ttl;
    }
  }, {
    key: "_shouldFetch",
    value: function _shouldFetch() {
      return (!this._storage || !this._tabManager || this._tabManager.active) && this._shouleCleanCache();
    }
  }, {
    key: "_isDataReady",
    value: function _isDataReady() {
      // only turns ready when data has been fetched
      // (could be from other tabs)
      return this.status === _moduleStatuses["default"].initializing && this.timestamp !== null;
    }
  }, {
    key: "_initAddressBook",
    value: function () {
      var _initAddressBook2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (this._hasPermission) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt("return");

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
                _context2.t0 = _context2["catch"](3);
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
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[3, 8]]);
      }));

      function _initAddressBook() {
        return _initAddressBook2.apply(this, arguments);
      }

      return _initAddressBook;
    }()
  }, {
    key: "_resetModuleStatus",
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
    key: "_syncWithForbiddenCheck",
    value: function () {
      var _syncWithForbiddenCheck2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(syncToken) {
        var response, result;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return this._sync(syncToken);

              case 3:
                response = _context3.sent;
                return _context3.abrupt("return", response);

              case 7:
                _context3.prev = 7;
                _context3.t0 = _context3["catch"](0);

                if (!(_context3.t0 && _context3.t0.response && _context3.t0.response._response && _context3.t0.response.status === 403)) {
                  _context3.next = 12;
                  break;
                }

                result = {
                  records: [],
                  syncInfo: {
                    syncToken: undefined
                  }
                };
                return _context3.abrupt("return", result);

              case 12:
                throw _context3.t0;

              case 13:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 7]]);
      }));

      function _syncWithForbiddenCheck(_x) {
        return _syncWithForbiddenCheck2.apply(this, arguments);
      }

      return _syncWithForbiddenCheck;
    }()
  }, {
    key: "sync",
    value: function () {
      var _sync2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var _this3 = this;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!this._promise) {
                  this._promise = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
                    var response;
                    return regeneratorRuntime.wrap(function _callee4$(_context4) {
                      while (1) {
                        switch (_context4.prev = _context4.next) {
                          case 0:
                            _context4.prev = 0;

                            _this3.store.dispatch({
                              type: _this3.actionTypes.sync
                            });

                            _context4.next = 4;
                            return _this3._syncWithForbiddenCheck(_this3.syncToken);

                          case 4:
                            response = _context4.sent;

                            _this3.store.dispatch({
                              type: _this3.actionTypes.syncSuccess,
                              records: response.records,
                              syncToken: response.syncInfo.syncToken,
                              timestamp: Date.now()
                            });

                            if (_this3._polling) {
                              _this3._startPolling();
                            }

                            _context4.next = 15;
                            break;

                          case 9:
                            _context4.prev = 9;
                            _context4.t0 = _context4["catch"](0);

                            _this3._onSyncError();

                            if (_this3._polling) {
                              _this3._startPolling(_this3.timeToRetry);
                            } else {
                              _this3._retry();
                            }

                            _this3._promise = null;
                            throw _context4.t0;

                          case 15:
                            _this3._promise = null;

                          case 16:
                          case "end":
                            return _context4.stop();
                        }
                      }
                    }, _callee4, null, [[0, 9]]);
                  }))();
                }

                _context5.next = 3;
                return this._promise;

              case 3:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function sync() {
        return _sync2.apply(this, arguments);
      }

      return sync;
    }()
  }, {
    key: "_onSyncError",
    value: function _onSyncError() {
      this.store.dispatch({
        type: this.actionTypes.syncError
      });
    }
  }, {
    key: "_sync",
    value: function () {
      var _sync3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(syncToken, pageId) {
        var params, response, lastResponse;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                params = getSyncParams(syncToken, pageId);
                _context6.next = 3;
                return this._syncAddressBookApi(params);

              case 3:
                response = _context6.sent;

                if (response.nextPageId) {
                  _context6.next = 6;
                  break;
                }

                return _context6.abrupt("return", response);

              case 6:
                _context6.next = 8;
                return (0, _sleep["default"])(1000);

              case 8:
                _context6.next = 10;
                return this._sync(syncToken, response.nextPageId);

              case 10:
                lastResponse = _context6.sent;
                return _context6.abrupt("return", _objectSpread(_objectSpread({}, lastResponse), {}, {
                  records: response.records.concat(lastResponse.records)
                }));

              case 12:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function _sync(_x2, _x3) {
        return _sync3.apply(this, arguments);
      }

      return _sync;
    }()
  }, {
    key: "_syncAddressBookApi",
    value: function () {
      var _syncAddressBookApi2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(params) {
        var updateRequest;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return this._client.account().extension().addressBookSync().list(params);

              case 2:
                updateRequest = _context7.sent;

                this._decodeAddressBook(updateRequest);

                return _context7.abrupt("return", updateRequest);

              case 5:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function _syncAddressBookApi(_x4) {
        return _syncAddressBookApi2.apply(this, arguments);
      }

      return _syncAddressBookApi;
    }()
  }, {
    key: "_decode",
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
    key: "_decodeAddressBook",
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
    key: "_cleanUp",
    value: function _cleanUp() {
      this.store.dispatch({
        type: this.actionTypes.cleanUp
      });
    } // interface of contact source

  }, {
    key: "matchPhoneNumber",
    value: function matchPhoneNumber(phoneNumber) {
      return (0, _contactHelper.getMatchContacts)({
        contacts: this.contacts,
        phoneNumber: phoneNumber,
        entityType: 'rcContact'
      });
    }
  }, {
    key: "fetchData",
    value: function () {
      var _fetchData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return this.sync();

              case 2:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function fetchData() {
        return _fetchData.apply(this, arguments);
      }

      return fetchData;
    }()
  }, {
    key: "_hasPermission",
    get: function get() {
      return !!this._rolesAndPermissions.permissions.ReadPersonalContacts;
    }
  }, {
    key: "status",
    get: function get() {
      return this.state.status;
    }
  }, {
    key: "syncToken",
    get: function get() {
      if (this._storage) {
        return this._storage.getItem(this._addressBookStorageKey).syncToken;
      }

      return this.state.syncToken;
    }
  }, {
    key: "rawContacts",
    get: function get() {
      if (this._storage) {
        return this._storage.getItem(this._addressBookStorageKey).contactList;
      }

      return this.state.contactList;
    }
  }, {
    key: "timestamp",
    get: function get() {
      if (this._storage) {
        return this._storage.getItem(this._addressBookStorageKey).timestamp;
      }

      return this.state.timestamp;
    }
  }, {
    key: "ttl",
    get: function get() {
      return this._ttl;
    }
  }, {
    key: "timeToRetry",
    get: function get() {
      return this._timeToRetry;
    } // interface of contact source

  }, {
    key: "sourceName",
    get: function get() {
      return 'personal';
    } // interface of contact source

  }, {
    key: "sourceReady",
    get: function get() {
      return this.ready;
    }
  }]);

  return AddressBook;
}(_Pollable2["default"]), _temp), (_applyDecoratedDescriptor(_class2.prototype, "sync", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "sync"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_sync", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_sync"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_syncAddressBookApi", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_syncAddressBookApi"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "fetchData", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "fetchData"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "contacts", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this5 = this;

    return [function () {
      return _this5.rawContacts;
    }, function (rawContacts) {
      var contactsList = [];
      rawContacts.forEach(function (rawContact) {
        var contact = _objectSpread({
          type: _this5.sourceName,
          phoneNumbers: [],
          emails: []
        }, rawContact);

        contact.id = "".concat(contact.id);
        contact.name = "".concat(contact.firstName || '', " ").concat(contact.lastName || '');
        if (contact.email) contact.emails.push(contact.email);
        if (contact.email2) contact.emails.push(contact.email2);
        Object.keys(contact).forEach(function (key) {
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
    }];
  }
})), _class2)) || _class);
exports["default"] = AddressBook;
//# sourceMappingURL=index.js.map
