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

var _RcModule2 = require('../../lib/RcModule');

var _RcModule3 = _interopRequireDefault(_RcModule2);

var _accountInfoStatus = require('./accountInfoStatus');

var _accountInfoStatus2 = _interopRequireDefault(_accountInfoStatus);

var _accountInfoActionTypes = require('./accountInfoActionTypes');

var _accountInfoActionTypes2 = _interopRequireDefault(_accountInfoActionTypes);

var _getAccountInfoReducer = require('./getAccountInfoReducer');

var _getAccountInfoReducer2 = _interopRequireDefault(_getAccountInfoReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AccountInfo = function (_RcModule) {
  (0, _inherits3.default)(AccountInfo, _RcModule);

  function AccountInfo(_ref) {
    var auth = _ref.auth,
        client = _ref.client,
        storage = _ref.storage,
        _ref$ttl = _ref.ttl,
        ttl = _ref$ttl === undefined ? 30 * 60 * 1000 : _ref$ttl,
        options = (0, _objectWithoutProperties3.default)(_ref, ['auth', 'client', 'storage', 'ttl']);
    (0, _classCallCheck3.default)(this, AccountInfo);

    var _this = (0, _possibleConstructorReturn3.default)(this, (AccountInfo.__proto__ || (0, _getPrototypeOf2.default)(AccountInfo)).call(this, (0, _extends3.default)({}, options, {
      actionTypes: _accountInfoActionTypes2.default
    })));

    _this._auth = auth;
    _this._storage = storage;
    _this._client = client;
    _this._ttl = ttl;
    _this._storageKey = 'accountInfo';
    _this._reducer = (0, _getAccountInfoReducer2.default)(_this.prefix);
    _this._promise = null;
    return _this;
  }

  (0, _createClass3.default)(AccountInfo, [{
    key: 'initialize',
    value: function initialize() {
      var _this2 = this;

      this.store.subscribe(function () {
        if (_this2._storage.status !== _this2._storage.storageStatus.pending && _this2.status === _accountInfoStatus2.default.pending) {
          if (_this2._auth.isFreshLogin || !_this2._storage.hasItem(_this2._storageKey) || Date.now() - _this2.data > _this2._ttl) {
            _this2.loadAccountInfo();
          } else {
            _this2.store.dispatch({
              type: _this2.actionTypes.init
            });
          }
        } else if (_this2._storage.status === _this2._storage.storageStatus.pending && _this2.status !== _accountInfoStatus2.default.pending) {
          _this2.store.dispatch({
            type: _this2.actionTypes.reset
          });
        }
      });
    }
  }, {
    key: 'loadAccountInfo',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        var _this3 = this;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!this._promise) {
                  this._promise = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
                    return _regenerator2.default.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            _this3.store.dispatch({
                              type: _this3.actionTypes.fetch
                            });
                            _context.prev = 1;
                            _context.t0 = _this3._storage;
                            _context.t1 = _this3._storageKey;
                            _context.next = 6;
                            return _this3._client.account().get();

                          case 6:
                            _context.t2 = _context.sent;
                            _context.t3 = Date.now();
                            _context.t4 = {
                              accountInfo: _context.t2,
                              timestamp: _context.t3
                            };

                            _context.t0.setItem.call(_context.t0, _context.t1, _context.t4);

                            _this3.store.dispatch({
                              type: _this3.actionTypes.fetchSuccess
                            });
                            _this3._promise = null;
                            _context.next = 19;
                            break;

                          case 14:
                            _context.prev = 14;
                            _context.t5 = _context['catch'](1);

                            _this3.store.dispatch({
                              type: _this3.actions.fetchError,
                              error: _context.t5
                            });
                            _this3._promise = null;
                            throw _context.t5;

                          case 19:
                          case 'end':
                            return _context.stop();
                        }
                      }
                    }, _callee, _this3, [[1, 14]]);
                  }))();
                }
                _context2.next = 3;
                return this._promise;

              case 3:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function loadAccountInfo() {
        return _ref2.apply(this, arguments);
      }

      return loadAccountInfo;
    }()
  }, {
    key: 'data',
    get: function get() {
      return this._storage.getItem(this._storageKey);
    }
  }, {
    key: 'status',
    get: function get() {
      return this.state.status;
    }
  }, {
    key: 'country',
    get: function get() {
      return this.data.accountInfo.serviceInfo.brand.homeCountry;
    }
  }, {
    key: 'error',
    get: function get() {
      return this.state.error;
    }
  }, {
    key: 'accountInfoStatus',
    get: function get() {
      return _accountInfoStatus2.default;
    }
  }]);
  return AccountInfo;
}(_RcModule3.default);

exports.default = AccountInfo;
//# sourceMappingURL=index.js.map
