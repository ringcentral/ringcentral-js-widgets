'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

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

var _RcModule2 = require('../../lib/RcModule');

var _RcModule3 = _interopRequireDefault(_RcModule2);

var _sliceExecute = require('../../lib/sliceExecute');

var _sliceExecute2 = _interopRequireDefault(_sliceExecute);

var _moduleStatuses = require('../../enums/moduleStatuses');

var _moduleStatuses2 = _interopRequireDefault(_moduleStatuses);

var _actionTypes = require('./actionTypes');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

var _getDateTimeIntlReducer = require('./getDateTimeIntlReducer');

var _getDateTimeIntlReducer2 = _interopRequireDefault(_getDateTimeIntlReducer);

var _getStorageReducer = require('./getStorageReducer');

var _getStorageReducer2 = _interopRequireDefault(_getStorageReducer);

var _browserDateTimeIntlProvider = require('./browserDateTimeIntlProvider');

var _browserDateTimeIntlProvider2 = _interopRequireDefault(_browserDateTimeIntlProvider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FallbackProviderName = '$browser$';

var DateTimeIntl = function (_RcModule) {
  (0, _inherits3.default)(DateTimeIntl, _RcModule);

  function DateTimeIntl(_ref) {
    var auth = _ref.auth,
        locale = _ref.locale,
        storage = _ref.storage,
        _ref$ttl = _ref.ttl,
        ttl = _ref$ttl === undefined ? 5 * 60 * 1000 : _ref$ttl,
        options = (0, _objectWithoutProperties3.default)(_ref, ['auth', 'locale', 'storage', 'ttl']);
    (0, _classCallCheck3.default)(this, DateTimeIntl);

    var _this = (0, _possibleConstructorReturn3.default)(this, (DateTimeIntl.__proto__ || (0, _getPrototypeOf2.default)(DateTimeIntl)).call(this, (0, _extends3.default)({}, options, {
      actionTypes: _actionTypes2.default
    })));

    _this._auth = auth;
    _this._locale = locale;
    _this._storage = storage;
    _this._ttl = ttl;
    // define
    _this._providers = {};
    _this._providersPrioritized = [];
    _this._priorProvider = null;
    _this._fallbackProvider = null;
    _this._reducer = (0, _getDateTimeIntlReducer2.default)(_this.actionTypes);
    // storage
    _this._storageKey = 'dateTimeIntl';
    _this._storageReducer = (0, _getStorageReducer2.default)(_this.actionTypes);
    _this._storage.registerReducer({ key: _this._storageKey, reducer: _this._storageReducer });
    return _this;
  }

  (0, _createClass3.default)(DateTimeIntl, [{
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

                if (!this._shouldLoad()) {
                  _context.next = 8;
                  break;
                }

                _context.next = 5;
                return this._loadSettings();

              case 5:
                this._initProvider();
                _context.next = 9;
                break;

              case 8:
                this._initProvider();

              case 9:
                _context.next = 12;
                break;

              case 11:
                if (this._shouldReset()) {
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
    key: 'initialize',
    value: function initialize() {
      var _this2 = this;

      this._addFallbackProvider();
      this.store.subscribe((0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _this2._onStateChange();

              case 2:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this2);
      })));
    }
  }, {
    key: '_shouldInit',
    value: function _shouldInit() {
      return this.pending && this._storage.ready && this._providersReadyCheck();
    }
  }, {
    key: '_shouldLoad',
    value: function _shouldLoad() {
      return this._auth.isFreshLogin || !this.cache || Date.now() - this.cache.timestamp > this._ttl;
    }
  }, {
    key: '_shouldReset',
    value: function _shouldReset() {
      return this.ready && !this._storage.ready || this.ready && this._storage.ready && (!this.cache || Date.now() - this.cache.timestamp > this._ttl);
    }
  }, {
    key: '_initProvider',
    value: function _initProvider() {
      this._detectPriorProvider();
      this.store.dispatch({
        type: this.actionTypes.initSuccess
      });
    }
  }, {
    key: '_resetModuleStatus',
    value: function _resetModuleStatus() {
      this.store.dispatch({
        type: this.actionTypes.resetSuccess
      });
    }
  }, {
    key: '_providersReadyCheck',
    value: function _providersReadyCheck() {
      var ready = true;
      this._providersPrioritized.forEach(function (provider) {
        ready = ready && provider.readyCheckFn();
      });
      return ready;
    }
  }, {
    key: '_loadSettings',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
        var _this3 = this;

        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return (0, _sliceExecute2.default)({
                  array: this._providersPrioritized,
                  threshold: 1,
                  handler: function () {
                    var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(items) {
                      var provider;
                      return _regenerator2.default.wrap(function _callee3$(_context3) {
                        while (1) {
                          switch (_context3.prev = _context3.next) {
                            case 0:
                              provider = items[0];
                              _context3.next = 3;
                              return _this3._loadProvider(provider);

                            case 3:
                            case 'end':
                              return _context3.stop();
                          }
                        }
                      }, _callee3, _this3);
                    }));

                    return function handler(_x) {
                      return _ref5.apply(this, arguments);
                    };
                  }()
                });

              case 2:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function _loadSettings() {
        return _ref4.apply(this, arguments);
      }

      return _loadSettings;
    }()

    // for test used

  }, {
    key: '_loadProviderByName',
    value: function _loadProviderByName(providerName) {
      var provider = this._providers[providerName];
      if (provider) {
        this._loadProvider(provider);
      }
    }
  }, {
    key: '_loadProvider',
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(provider) {
        var success, providerSettings;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                success = true;

                this.store.dispatch({
                  type: this.actionTypes.fetch,
                  provider: provider
                });
                _context5.prev = 2;
                _context5.next = 5;
                return provider.getSettingsFn();

              case 5:
                providerSettings = _context5.sent;

                this.store.dispatch({
                  type: this.actionTypes.fetchSuccess,
                  timestamp: Date.now(),
                  provider: provider,
                  providerSettings: providerSettings
                });
                _context5.next = 13;
                break;

              case 9:
                _context5.prev = 9;
                _context5.t0 = _context5['catch'](2);

                success = false;
                this.store.dispatch({
                  type: this.actionTypes.fetchError,
                  timestamp: Date.now(),
                  provider: provider,
                  error: _context5.t0
                });

              case 13:
                this._detectPriorProvider();
                return _context5.abrupt('return', success);

              case 15:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this, [[2, 9]]);
      }));

      function _loadProvider(_x2) {
        return _ref6.apply(this, arguments);
      }

      return _loadProvider;
    }()
  }, {
    key: '_detectPriorProvider',
    value: function _detectPriorProvider() {
      var _this4 = this;

      this._priorProvider = null;
      this._providersPrioritized.forEach(function (provider) {
        if (_this4._priorProvider === null && _this4.cache.validity && (_this4.cache.validity[provider.providerName] === 'y' || _this4.cache.validity[provider.providerName] === true)) {
          _this4._priorProvider = provider;
        }
      });
    }
  }, {
    key: '_prioritizeProviders',
    value: function _prioritizeProviders() {
      var _this5 = this;

      var array = this._providersPrioritized = [];
      (0, _keys2.default)(this._providers).forEach(function (key) {
        array.push(_this5._providers[key]);
      });
      array.sort(function (a, b) {
        return b.priorityNumber - a.priorityNumber;
      });
    }
  }, {
    key: '_addFallbackProvider',
    value: function _addFallbackProvider() {
      var providerName = FallbackProviderName;
      if (!this._providers[providerName]) {
        var provider = new _browserDateTimeIntlProvider2.default({
          locale: this._locale
        });
        this._fallbackProvider = this.addProvider({
          providerName: providerName,
          priorityNumber: -1, // the lowest priority
          readyCheckFn: function readyCheckFn() {
            return provider.ready;
          },
          getSettingsFn: function getSettingsFn(args) {
            return provider.getSettings(args);
          },
          formatDateTimeFn: function formatDateTimeFn(args) {
            return provider.formatDateTime(args);
          }
        });
      }
    }
  }, {
    key: 'formatDateTime',
    value: function formatDateTime(_ref7) {
      var utcString = _ref7.utcString,
          providerName = _ref7.providerName,
          opts = (0, _objectWithoutProperties3.default)(_ref7, ['utcString', 'providerName']);

      var provider = void 0;
      if (providerName) {
        provider = this._providers[providerName];
        if (!provider) {
          throw new Error('DateTimeIntl: Can not find format provider "' + providerName + '".');
        }
      } else {
        provider = this._priorProvider || this._fallbackProvider;
        if (!provider) {
          throw new Error('DateTimeIntl: Can not find any available format provider.');
        }
      }
      var settings = this.cache.settings[provider.providerName];
      return provider.formatDateTimeFn((0, _extends3.default)({
        settings: settings,
        utcString: utcString
      }, opts));
    }

    // priorityNumber should not less than 0,
    // the greater priorityNumber the higher priority

  }, {
    key: 'addProvider',
    value: function addProvider(_ref8) {
      var providerName = _ref8.providerName,
          priorityNumber = _ref8.priorityNumber,
          readyCheckFn = _ref8.readyCheckFn,
          getSettingsFn = _ref8.getSettingsFn,
          formatDateTimeFn = _ref8.formatDateTimeFn;

      if (!providerName) {
        throw new Error('DateTimeIntl: "providerName" is required.');
      }
      if (this._providers[providerName]) {
        throw new Error('DateTimeIntl: A provider named "' + providerName + '" already exists.');
      }
      if (typeof priorityNumber !== 'number') {
        throw new Error('DateTimeIntl: "priorityNumber" must be a number.');
      }
      if (priorityNumber < 0 && providerName !== FallbackProviderName) {
        throw new Error('DateTimeIntl: "priorityNumber" should not less than 0.');
      }
      if (typeof readyCheckFn !== 'function') {
        throw new Error('DateTimeIntl: "readyCheckFn" must be a function.');
      }
      if (typeof getSettingsFn !== 'function') {
        throw new Error('DateTimeIntl: "getSettingsFn" must be a function.');
      }
      if (typeof formatDateTimeFn !== 'function') {
        throw new Error('DateTimeIntl: "formatDateTimeFn" must be a function.');
      }
      var provider = {
        providerName: providerName,
        priorityNumber: priorityNumber,
        readyCheckFn: readyCheckFn,
        getSettingsFn: getSettingsFn,
        formatDateTimeFn: formatDateTimeFn
      };
      this._providers[providerName] = provider;
      this._prioritizeProviders();
      return provider;
    }
  }, {
    key: 'status',
    get: function get() {
      return this.state.status;
    }
  }, {
    key: 'dateTimeIntlStatus',
    get: function get() {
      return this.state.dateTimeIntlStatus;
    }
  }, {
    key: 'ready',
    get: function get() {
      return this.status === _moduleStatuses2.default.ready;
    }
  }, {
    key: 'pending',
    get: function get() {
      return this.status === _moduleStatuses2.default.pending;
    }
  }, {
    key: 'cache',
    get: function get() {
      return this._storage.getItem(this._storageKey);
    }
  }]);
  return DateTimeIntl;
}(_RcModule3.default);

exports.default = DateTimeIntl;
//# sourceMappingURL=index.js.map
