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

var _RcModule2 = require('../../lib/RcModule');

var _RcModule3 = _interopRequireDefault(_RcModule2);

var _proxy = require('../../lib/proxy');

var _extensionInfoStatus = require('./extensionInfoStatus');

var _extensionInfoStatus2 = _interopRequireDefault(_extensionInfoStatus);

var _extensionInfoActions = require('./extensionInfoActions');

var _extensionInfoActions2 = _interopRequireDefault(_extensionInfoActions);

var _getExtensionInfoReducer = require('./getExtensionInfoReducer');

var _getExtensionInfoReducer2 = _interopRequireDefault(_getExtensionInfoReducer);

var _extensionInfoEvents = require('./extensionInfoEvents');

var _extensionInfoEvents2 = _interopRequireDefault(_extensionInfoEvents);

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
  storage: 'extension-info-data'
});

var DEFAULT_TTL = 30 * 60 * 1000;

var symbols = new _symbolMap2.default(['api', 'auth', 'storage', 'ttl']);

var ExtensionInfo = (_class = function (_RcModule) {
  (0, _inherits3.default)(ExtensionInfo, _RcModule);

  function ExtensionInfo() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, ExtensionInfo);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ExtensionInfo.__proto__ || (0, _getPrototypeOf2.default)(ExtensionInfo)).call(this, (0, _extends3.default)({}, options, {
      actions: _extensionInfoActions2.default
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
          _this.emit(_extensionInfoEvents2.default.statusChange, {
            oldStatus: oldState.status,
            newStatus: newState.status
          });
        }
      }
    });
    _this[symbols.storage].on(_this[symbols.storage].storageEvents.dataChange, function (_ref2) {
      var oldData = _ref2.oldData;
      var newData = _ref2.newData;

      if (!oldData[keys.storage] && !newData[keys.storage]) return;
      if (oldData[keys.storage] && !newData[keys.storage] || !oldData[keys.storage] && newData[keys.storage] || oldData[keys.storage] !== newData[keys.storage] && (0, _stringify2.default)(oldData[keys.storage].extensionInfo) !== (0, _stringify2.default)(newData[keys.storage].extensionInfo)) {
        _this.emit(_extensionInfoEvents2.default.extensionInfoChange, {
          oldData: oldData[keys.storage] && oldData[keys.storage].extensionInfo,
          newData: newData[keys.storage] && newData[keys.storage].extensionInfo
        });
      }
    });
    return _this;
  }

  (0, _createClass3.default)(ExtensionInfo, [{
    key: 'init',
    value: function init() {
      var _this2 = this;

      this[symbols.storage].on(this[symbols.storage].storageEvents.ready, (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _this2.loadExtensionInfo();

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
    key: 'loadExtensionInfo',
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
                return this[symbols.api].account().extension().get();

              case 8:
                _context2.t0 = _context2.sent;
                _context2.t1 = Date.now();
                data = {
                  extensionInfo: _context2.t0,
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

      function loadExtensionInfo(_x2) {
        return _ref4.apply(this, arguments);
      }

      return loadExtensionInfo;
    }()
  }, {
    key: 'data',
    get: function get() {
      return this[symbols.storage].getItem(keys.storage);
    }
  }, {
    key: 'reducer',
    get: function get() {
      return (0, _getExtensionInfoReducer2.default)(this.prefix);
    }
  }, {
    key: 'extensionInfoStatus',
    get: function get() {
      return _extensionInfoStatus2.default;
    }
  }, {
    key: 'extensionInfoEvents',
    get: function get() {
      return _extensionInfoEvents2.default;
    }
  }, {
    key: 'status',
    get: function get() {
      return this.state.status;
    }
  }], [{
    key: 'extensionInfoStatus',
    get: function get() {
      return _extensionInfoStatus2.default;
    }
  }, {
    key: 'extensionInfoEvents',
    get: function get() {
      return _extensionInfoEvents2.default;
    }
  }]);
  return ExtensionInfo;
}(_RcModule3.default), (_applyDecoratedDescriptor(_class.prototype, 'init', [_RcModule2.initFunction], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'init'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'loadExtensionInfo', [_proxy.proxify], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'loadExtensionInfo'), _class.prototype)), _class);
exports.default = ExtensionInfo;
//# sourceMappingURL=index.js.map
