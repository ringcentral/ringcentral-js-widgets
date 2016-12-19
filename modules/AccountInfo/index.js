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

var _jsonMask = require('json-mask');

var _jsonMask2 = _interopRequireDefault(_jsonMask);

var _RcModule2 = require('../../lib/RcModule');

var _RcModule3 = _interopRequireDefault(_RcModule2);

var _actionTypes = require('./actionTypes');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

var _getAccountInfoReducer = require('./getAccountInfoReducer');

var _getAccountInfoReducer2 = _interopRequireDefault(_getAccountInfoReducer);

var _moduleStatus = require('../../enums/moduleStatus');

var _moduleStatus2 = _interopRequireDefault(_moduleStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_MASK = ['id,mainNumber,status', 'operator(id,extensionNumber)', 'serviceInfo(brand(id,homeCountry(isoCode)))', 'regionalSettings(' + ['timezone(id,name,bias)', 'homeCountry(id)', 'language(localeCode)', 'formattingLocale(localeCode)', 'timeFormat'].join(',') + ')'].join(',');

var DEFAULT_TTL = 30 * 60 * 1000;
var DEFAULT_RETRY = 60 * 1000;

var AccountInfo = function (_RcModule) {
  (0, _inherits3.default)(AccountInfo, _RcModule);

  function AccountInfo(_ref) {
    var auth = _ref.auth,
        client = _ref.client,
        storage = _ref.storage,
        tabManager = _ref.tabManager,
        _ref$ttl = _ref.ttl,
        ttl = _ref$ttl === undefined ? DEFAULT_TTL : _ref$ttl,
        _ref$timeToRetry = _ref.timeToRetry,
        timeToRetry = _ref$timeToRetry === undefined ? DEFAULT_RETRY : _ref$timeToRetry,
        options = (0, _objectWithoutProperties3.default)(_ref, ['auth', 'client', 'storage', 'tabManager', 'ttl', 'timeToRetry']);
    (0, _classCallCheck3.default)(this, AccountInfo);

    var _this = (0, _possibleConstructorReturn3.default)(this, (AccountInfo.__proto__ || (0, _getPrototypeOf2.default)(AccountInfo)).call(this, (0, _extends3.default)({}, options, {
      actionTypes: _actionTypes2.default
    })));

    _this._auth = auth;
    _this._storage = storage;
    _this._client = client;
    _this._tabManager = tabManager;
    _this._ttl = ttl;
    _this._timeToRetry = timeToRetry;
    _this._infoStorageKey = 'accountInfo';
    _this._timestampStorageKey = 'accountInfoTimestamp';
    _this._reducer = (0, _getAccountInfoReducer2.default)(_this.actionTypes);

    _this._storage.registerReducer({
      key: _this._infoStorageKey,
      reducer: (0, _getAccountInfoReducer.getInfoReducer)(_this.actionTypes)
    });
    _this._storage.registerReducer({
      key: _this._timestampStorageKey,
      reducer: (0, _getAccountInfoReducer.getTimestampReducer)(_this.actionTypes)
    });

    _this._promise = null;
    _this._timeoutId = null;
    return _this;
  }

  (0, _createClass3.default)(AccountInfo, [{
    key: 'initialize',
    value: function initialize() {
      var _this2 = this;

      this.store.subscribe((0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(_this2._auth.loggedIn && _this2._storage.ready && _this2.status === _moduleStatus2.default.pending)) {
                  _context.next = 11;
                  break;
                }

                _this2.store.dispatch({
                  type: _this2.actionTypes.init
                });

                if (!((!_this2._tabManager || _this2._tabManager.active) && (_this2._auth.isFreshLogin || !_this2.timestamp || Date.now() - _this2.timestamp > _this2._ttl))) {
                  _context.next = 7;
                  break;
                }

                _context.next = 5;
                return _this2.loadAccountInfo();

              case 5:
                _context.next = 8;
                break;

              case 7:
                _this2._retry();

              case 8:
                _this2.store.dispatch({
                  type: _this2.actionTypes.initSuccess
                });
                _context.next = 12;
                break;

              case 11:
                if ((!_this2._auth.loggedIn || !_this2._storage.ready) && _this2.ready) {
                  _this2._stopRetry();
                  _this2._promise = null;
                  _this2.store.dispatch({
                    type: _this2.actionTypes.reset
                  });
                }

              case 12:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this2);
      })));
    }
  }, {
    key: '_retry',
    value: function _retry() {
      var _this3 = this;

      var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._timeToRetry;

      this._stopRetry();
      this._timeoutId = setTimeout(function () {
        _this3._timeoutId = null;
        if (!_this3.timestamp || Date.now() - _this3.timestamp > _this3._ttl) {
          if (!_this3._tabManager || _this3._tabManager.active) {
            _this3.loadAccountInfo();
          } else {
            // continue retry checks in case tab becomes main tab
            _this3._retry();
          }
        }
      }, t);
    }
  }, {
    key: '_stopRetry',
    value: function _stopRetry() {
      if (this._timeoutId) clearTimeout(this._timeoutId);
    }
  }, {
    key: '_loadAccountInfo',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        var id, info;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.fetch
                });
                id = this._auth.id;
                _context2.prev = 2;
                _context2.t0 = _jsonMask2.default;
                _context2.next = 6;
                return this._client.account().get();

              case 6:
                _context2.t1 = _context2.sent;
                _context2.t2 = DEFAULT_MASK;
                info = (0, _context2.t0)(_context2.t1, _context2.t2);

                if (this._auth.id === id) {
                  this.store.dispatch({
                    type: this.actionTypes.fetchSuccess,
                    info: info,
                    timestamp: Date.now()
                  });
                  this._promise = null;
                }
                _context2.next = 19;
                break;

              case 12:
                _context2.prev = 12;
                _context2.t3 = _context2['catch'](2);

                if (!(this._auth.id === id)) {
                  _context2.next = 19;
                  break;
                }

                this._promise = null;
                this.store.dispatch({
                  type: this.actionTypes.fetchError,
                  error: _context2.t3
                });
                this._retry();
                throw _context2.t3;

              case 19:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[2, 12]]);
      }));

      function _loadAccountInfo() {
        return _ref3.apply(this, arguments);
      }

      return _loadAccountInfo;
    }()
  }, {
    key: 'loadAccountInfo',
    value: function loadAccountInfo() {
      if (!this._promise) {
        this._promise = this._loadAccountInfo();
      }
      return this._promise;
    }
  }, {
    key: 'info',
    get: function get() {
      return this._storage.getItem(this._infoStorageKey);
    }
  }, {
    key: 'timestamp',
    get: function get() {
      return this._storage.getItem(this._timestampStorageKey);
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
    key: 'id',
    get: function get() {
      return this.info.id;
    }
  }, {
    key: 'country',
    get: function get() {
      return this.info.serviceInfo && this.info.serviceInfo.brand.homeCountry;
    }
  }, {
    key: 'mainCompanyNumber',
    get: function get() {
      return this.info.mainNumber;
    }
  }]);
  return AccountInfo;
}(_RcModule3.default);

exports.default = AccountInfo;
//# sourceMappingURL=index.js.map
