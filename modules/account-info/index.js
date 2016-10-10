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

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _desc, _value, _class;

var _symbolMap = require('data-types/symbol-map');

var _symbolMap2 = _interopRequireDefault(_symbolMap);

var _keyValueMap = require('data-types/key-value-map');

var _keyValueMap2 = _interopRequireDefault(_keyValueMap);

var _rcModule = require('../../lib/rc-module');

var _rcModule2 = _interopRequireDefault(_rcModule);

var _proxy = require('../proxy');

var _accountInfoStatus = require('./account-info-status');

var _accountInfoStatus2 = _interopRequireDefault(_accountInfoStatus);

var _accountInfoActions = require('./account-info-actions');

var _accountInfoActions2 = _interopRequireDefault(_accountInfoActions);

var _getAccountInfoReducer = require('./get-account-info-reducer');

var _getAccountInfoReducer2 = _interopRequireDefault(_getAccountInfoReducer);

var _accountInfoEvents = require('./account-info-events');

var _accountInfoEvents2 = _interopRequireDefault(_accountInfoEvents);

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

var keys = new _keyValueMap2.default({
  storage: 'account-info-data'
});

var DEFAULT_TTL = 30 * 60 * 1000;

var symbols = new _symbolMap2.default(['api', 'auth', 'storage', 'ttl']);

var AccountInfo = (_class = function (_RcModule) {
  (0, _inherits3.default)(AccountInfo, _RcModule);

  function AccountInfo() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, AccountInfo);

    var _this = (0, _possibleConstructorReturn3.default)(this, (AccountInfo.__proto__ || (0, _getPrototypeOf2.default)(AccountInfo)).call(this, (0, _extends3.default)({}, options, {
      actions: _accountInfoActions2.default
    })));

    var api = options.api;
    var auth = options.auth;
    var storage = options.storage;
    var _options$ttl = options.ttl;
    var ttl = _options$ttl === undefined ? DEFAULT_TTL : _options$ttl;

    _this[symbols.api] = api;
    _this[symbols.auth] = auth;
    _this[symbols.storage] = storage;
    _this[symbols.ttl] = ttl;

    _this.on('state-change', function (_ref) {
      var oldState = _ref.oldState;
      var newState = _ref.newState;

      if (oldState) {
        if (oldState.status !== newState.status) {
          _this.emit(_accountInfoEvents2.default.statusChange, {
            oldStatus: oldState.status,
            newStatus: newState.status
          });
        }
        if (newState.error && newState.error !== oldState.error) {
          _this.emit(_accountInfoEvents2.default.error, newState.error);
        }
      }
    });
    _this[symbols.storage].on(_this[symbols.storage].storageEvents.dataChange, function (_ref2) {
      var oldData = _ref2.oldData;
      var newData = _ref2.newData;

      if (!oldData[keys.storage] && !newData[keys.storage]) return;
      if (oldData[keys.storage] && !newData[keys.storage] || !oldData[keys.storage] && newData[keys.storage] || oldData[keys.storage] !== newData[keys.storage] && (0, _stringify2.default)(oldData[keys.storage].accountInfo) !== (0, _stringify2.default)(newData[keys.storage].accountInfo)) {
        _this.emit(_accountInfoEvents2.default.accountInfoChange, {
          oldData: oldData[keys.storage] && oldData[keys.storage].accountInfo,
          newData: newData[keys.storage] && newData[keys.storage].accountInfo
        });
      }
    });
    return _this;
  }

  (0, _createClass3.default)(AccountInfo, [{
    key: 'init',
    value: function init() {
      var _this2 = this;

      this[symbols.storage].on(this[symbols.storage].storageEvents.ready, (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _this2.loadAccountInfo();

              case 2:
                _this2.store.dispatch({
                  type: _this2.actions.ready
                });

              case 3:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this2);
      })));
      this[symbols.storage].on(this[symbols.storage].storageEvents.pending, function () {
        _this2.store.dispatch({
          type: _this2.actions.reset
        });
      });
    }
  }, {
    key: 'loadAccountInfo',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        var _options$force, force, data;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _options$force = options.force;
                force = _options$force === undefined ? false : _options$force;
                data = this[symbols.storage].getItem(keys.storage);

                if (!(force || !data || Date.now() - data.timestamp > this[symbols.ttl])) {
                  _context2.next = 19;
                  break;
                }

                _context2.prev = 4;

                this.store.dispatch({
                  type: this.actions.fetch
                });
                _context2.next = 8;
                return this[symbols.api].account().get();

              case 8:
                _context2.t0 = _context2.sent;
                _context2.t1 = Date.now();
                data = {
                  accountInfo: _context2.t0,
                  timestamp: _context2.t1
                };

                this[symbols.storage].setItem(keys.storage, data);
                this.store.dispatch({
                  type: this.actions.fetchSuccess
                });
                _context2.next = 19;
                break;

              case 15:
                _context2.prev = 15;
                _context2.t2 = _context2['catch'](4);

                this.store.dispatch({
                  type: this.actions.fetchError,
                  error: _context2.t2
                });
                throw _context2.t2;

              case 19:
                return _context2.abrupt('return', data);

              case 20:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[4, 15]]);
      }));

      function loadAccountInfo(_x2) {
        return _ref4.apply(this, arguments);
      }

      return loadAccountInfo;
    }()
  }, {
    key: 'data',
    get: function get() {
      return this[symbols.storage].getItem(keys.storage);
    }
  }, {
    key: 'reducer',
    get: function get() {
      return (0, _getAccountInfoReducer2.default)(this.prefix);
    }
  }, {
    key: 'accountInfoStatus',
    get: function get() {
      return _accountInfoStatus2.default;
    }
  }, {
    key: 'accountInfoEvents',
    get: function get() {
      return _accountInfoEvents2.default;
    }
  }, {
    key: 'status',
    get: function get() {
      return this.state.status;
    }
  }], [{
    key: 'accountInfoStatus',
    get: function get() {
      return _accountInfoStatus2.default;
    }
  }, {
    key: 'accountInfoEvents',
    get: function get() {
      return _accountInfoEvents2.default;
    }
  }]);
  return AccountInfo;
}(_rcModule2.default), (_applyDecoratedDescriptor(_class.prototype, 'init', [_rcModule.initFunction], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'init'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'loadAccountInfo', [_proxy.proxify], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'loadAccountInfo'), _class.prototype)), _class);
exports.default = AccountInfo;
//# sourceMappingURL=index.js.map
