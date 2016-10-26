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

var _blockedNumberStatus = require('./blockedNumberStatus');

var _blockedNumberStatus2 = _interopRequireDefault(_blockedNumberStatus);

var _blockedNumberActionTypes = require('./blockedNumberActionTypes');

var _blockedNumberActionTypes2 = _interopRequireDefault(_blockedNumberActionTypes);

var _getBlockedNumberReducer = require('./getBlockedNumberReducer');

var _getBlockedNumberReducer2 = _interopRequireDefault(_getBlockedNumberReducer);

var _fetchList = require('../../lib/fetchList');

var _fetchList2 = _interopRequireDefault(_fetchList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BlockedNumber = function (_RcModule) {
  (0, _inherits3.default)(BlockedNumber, _RcModule);

  function BlockedNumber(_ref) {
    var auth = _ref.auth,
        client = _ref.client,
        storage = _ref.storage,
        _ref$ttl = _ref.ttl,
        ttl = _ref$ttl === undefined ? 30 * 60 * 1000 : _ref$ttl,
        options = (0, _objectWithoutProperties3.default)(_ref, ['auth', 'client', 'storage', 'ttl']);
    (0, _classCallCheck3.default)(this, BlockedNumber);

    var _this = (0, _possibleConstructorReturn3.default)(this, (BlockedNumber.__proto__ || (0, _getPrototypeOf2.default)(BlockedNumber)).call(this, (0, _extends3.default)({}, options, {
      actionTypes: _blockedNumberActionTypes2.default
    })));

    _this._auth = auth;
    _this._storage = storage;
    _this._client = client;
    _this._ttl = ttl;
    _this._storageKey = 'blockedNumber';
    _this._reducer = (0, _getBlockedNumberReducer2.default)(_this.prefix);
    _this._promise = null;
    return _this;
  }

  (0, _createClass3.default)(BlockedNumber, [{
    key: 'initialize',
    value: function initialize() {
      var _this2 = this;

      this.store.subscribe(function () {
        if (_this2._storage.status !== _this2._storage.storageStatus.pending && _this2.status === _blockedNumberStatus2.default.pending) {
          _this2.store.dispatch({
            type: _this2.actionTypes.init
          });
          if (_this2._auth.isFreshLogin || !_this2._storage.hasItem(_this2._storageKey) || Date.now() - _this2.data.timestamp > _this2._ttl) {
            _this2.loadBlockedNumber();
          }
        } else if (_this2._storage.status === _this2._storage.storageStatus.pending && _this2.status !== _blockedNumberStatus2.default.pending) {
          _this2.store.dispatch({
            type: _this2.actionTypes.reset
          });
        }
      });
    }
  }, {
    key: 'loadBlockedNumber',
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
                            return (0, _fetchList2.default)(function (params) {
                              return _this3._client.account().extension().blockedNumber().list(params);
                            });

                          case 6:
                            _context.t2 = _context.sent;
                            _context.t3 = Date.now();
                            _context.t4 = {
                              blockedNumbers: _context.t2,
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

      function loadBlockedNumber() {
        return _ref2.apply(this, arguments);
      }

      return loadBlockedNumber;
    }()
  }, {
    key: 'data',
    get: function get() {
      return this._storage.getItem(this._storageKey);
    }
  }, {
    key: 'numbers',
    get: function get() {
      return this.data.blockedNumbers;
    }
  }, {
    key: 'status',
    get: function get() {
      return this.state.status;
    }
  }, {
    key: 'error',
    get: function get() {
      return this.state.error;
    }
  }, {
    key: 'blockedNumberStatus',
    get: function get() {
      return _blockedNumberStatus2.default;
    }
  }]);
  return BlockedNumber;
}(_RcModule3.default);

exports.default = BlockedNumber;
//# sourceMappingURL=index.js.map
