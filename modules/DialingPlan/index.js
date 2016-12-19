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

var _fetchList = require('../../lib/fetchList');

var _fetchList2 = _interopRequireDefault(_fetchList);

var _moduleStatus = require('../../enums/moduleStatus');

var _moduleStatus2 = _interopRequireDefault(_moduleStatus);

var _actionTypes = require('./actionTypes');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

var _getDialingPlanReducer = require('./getDialingPlanReducer');

var _getDialingPlanReducer2 = _interopRequireDefault(_getDialingPlanReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_TTL = 30 * 60 * 1000;
var DEFAULT_RETRY = 60 * 1000;

var DialingPlan = function (_RcModule) {
  (0, _inherits3.default)(DialingPlan, _RcModule);

  function DialingPlan(_ref) {
    var auth = _ref.auth,
        client = _ref.client,
        storage = _ref.storage,
        tabManager = _ref.tabManager,
        _ref$ttl = _ref.ttl,
        ttl = _ref$ttl === undefined ? DEFAULT_TTL : _ref$ttl,
        _ref$timeToRetry = _ref.timeToRetry,
        timeToRetry = _ref$timeToRetry === undefined ? DEFAULT_RETRY : _ref$timeToRetry,
        options = (0, _objectWithoutProperties3.default)(_ref, ['auth', 'client', 'storage', 'tabManager', 'ttl', 'timeToRetry']);
    (0, _classCallCheck3.default)(this, DialingPlan);

    var _this = (0, _possibleConstructorReturn3.default)(this, (DialingPlan.__proto__ || (0, _getPrototypeOf2.default)(DialingPlan)).call(this, (0, _extends3.default)({}, options, {
      actionTypes: _actionTypes2.default
    })));

    _this._auth = auth;
    _this._storage = storage;
    _this._client = client;
    _this._tabManager = tabManager;
    _this._ttl = ttl;
    _this._timeToRetry = timeToRetry;
    _this._plansStorageKey = 'dialingPlans';
    _this._timestampStorageKey = 'dialingPlanTimestamp';
    _this._reducer = (0, _getDialingPlanReducer2.default)(_this.actionTypes);

    _this._storage.registerReducer({
      key: _this._plansStorageKey,
      reducer: (0, _getDialingPlanReducer.getPlansReducer)(_this.actionTypes)
    });
    _this._storage.registerReducer({
      key: _this._timestampStorageKey,
      reducer: (0, _getDialingPlanReducer.getTimestampReducer)(_this.actionTypes)
    });

    _this._promise = null;
    _this._timeoutId = null;
    return _this;
  }

  (0, _createClass3.default)(DialingPlan, [{
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
                return _this2.loadDialingPlan();

              case 5:
                _context.next = 8;
                break;

              case 7:
                _this2._startPolling();

              case 8:
                _this2.store.dispatch({
                  type: _this2.actionTypes.initSuccess
                });
                _context.next = 12;
                break;

              case 11:
                if ((!_this2._auth.loggedIn || !_this2._storage.ready) && _this2.ready) {
                  _this2._stopPolling();
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
    key: '_startPolling',
    value: function _startPolling() {
      var _this3 = this;

      var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.timestamp + this._ttl + 10 - Date.now();

      this._stopPolling();
      this._timeoutId = setTimeout(function () {
        _this3._timeoutId = null;
        if (!_this3._tabManager || _this3._tabManager.active) {
          if (!_this3.timestamp || Date.now() - _this3.timestamp > _this3._ttl) {
            _this3.loadDialingPlan();
          } else {
            _this3._startPolling();
          }
        } else {
          if (_this3.timestamp && Date.now() - _this3.timestamp < _this3._ttl) {
            _this3._startPolling();
          } else {
            _this3._startPolling(_this3._timeToRetry);
          }
        }
      }, t);
    }
  }, {
    key: '_stopPolling',
    value: function _stopPolling() {
      if (this._timeoutId) clearTimeout(this._timeoutId);
    }
  }, {
    key: '_loadDialingPlan',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        var _this4 = this;

        var id, plans;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.fetch
                });
                id = this._auth.id;
                _context2.prev = 2;
                _context2.next = 5;
                return (0, _fetchList2.default)(function (params) {
                  return _this4._client.account().dialingPlan().list(params);
                });

              case 5:
                _context2.t0 = function (p) {
                  return {
                    id: p.id,
                    isoCode: p.isoCode,
                    callingCode: p.callingCode
                  };
                };

                plans = _context2.sent.map(_context2.t0);

                if (this._auth.id === id) {
                  this.store.dispatch({
                    type: this.actionTypes.fetchSuccess,
                    plans: plans,
                    timestamp: Date.now()
                  });
                  this._startPolling();
                  this._promise = null;
                }
                _context2.next = 17;
                break;

              case 10:
                _context2.prev = 10;
                _context2.t1 = _context2['catch'](2);

                if (!(this._auth.id === id)) {
                  _context2.next = 17;
                  break;
                }

                this._promise = null;
                this.store.dispatch({
                  type: this.actionTypes.fetchError,
                  error: _context2.t1
                });
                this._startPolling(this._timeToRetry);
                throw _context2.t1;

              case 17:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[2, 10]]);
      }));

      function _loadDialingPlan() {
        return _ref3.apply(this, arguments);
      }

      return _loadDialingPlan;
    }()
  }, {
    key: 'loadDialingPlan',
    value: function loadDialingPlan() {
      if (!this._promise) {
        this._promise = this._loadDialingPlan();
      }
      return this._promise;
    }
  }, {
    key: 'plans',
    get: function get() {
      return this._storage.getItem(this._plansStorageKey);
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
  }]);
  return DialingPlan;
}(_RcModule3.default);

exports.default = DialingPlan;
//# sourceMappingURL=index.js.map
