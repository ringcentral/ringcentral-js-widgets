'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

var _loganberry = require('loganberry');

var _loganberry2 = _interopRequireDefault(_loganberry);

var _keyValueMap = require('data-types/key-value-map');

var _keyValueMap2 = _interopRequireDefault(_keyValueMap);

var _rcModule = require('../../lib/rc-module');

var _rcModule2 = _interopRequireDefault(_rcModule);

var _proxy = require('../../modules/proxy');

var _getStorageReducer = require('./get-storage-reducer');

var _getStorageReducer2 = _interopRequireDefault(_getStorageReducer);

var _storageActions = require('./storage-actions');

var _storageActions2 = _interopRequireDefault(_storageActions);

var _storageStatus = require('./storage-status');

var _storageStatus2 = _interopRequireDefault(_storageStatus);

var _storageEvents = require('./storage-events');

var _storageEvents2 = _interopRequireDefault(_storageEvents);

var _utils = require('../../lib/utils');

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

var logger = new _loganberry2.default({
  prefix: 'storage'
});

var symbols = new _symbolMap2.default(['storage']);

var CONSTANTS = new _keyValueMap2.default({
  status: _storageStatus2.default,
  events: _storageEvents2.default
});

var Storage = (_class = function (_RcModule) {
  (0, _inherits3.default)(Storage, _RcModule);

  function Storage(options) {
    (0, _classCallCheck3.default)(this, Storage);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Storage.__proto__ || (0, _getPrototypeOf2.default)(Storage)).call(this, (0, _extends3.default)({}, options, {
      actions: _storageActions2.default
    })));

    var _options$storage = options.storage;
    var storage = _options$storage === undefined ? localStorage : _options$storage;
    var auth = options.auth;

    _this[symbols.storage] = storage;
    _this[symbols.auth] = auth;

    _this.on('state-update', function (_ref) {
      var oldState = _ref.oldState;
      var newState = _ref.newState;

      if (!oldState || oldState.status !== newState.status) {
        _utils.emit.call(_this, _storageEvents2.default.statusChanged, newState.status);
      }
      if (!oldState || oldState.data !== newState.data) {
        _this.emit(_storageEvents2.default.dataChanged, newState.data);
      }
    });
    return _this;
  }

  (0, _createClass3.default)(Storage, [{
    key: 'init',
    value: function init() {
      var _this2 = this;

      this[symbols.auth].on(this[symbols.auth].events.loggedIn, (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        var key, data, error, status, json;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                key = (_this2.prefix ? _this2.prefix + '-' : '') + 'storage-' + _this2[symbols.auth].ownerId;
                data = null;
                error = null;
                status = _storageStatus2.default.saved;

                if (!_this2[symbols.storage]) {
                  _context2.next = 16;
                  break;
                }

                _context2.prev = 5;
                _context2.next = 8;
                return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
                  return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          return _context.abrupt('return', _this2[symbols.storage].getItem(key));

                        case 1:
                        case 'end':
                          return _context.stop();
                      }
                    }
                  }, _callee, _this2);
                }))();

              case 8:
                json = _context2.sent;

                if (json) {
                  data = JSON.parse(json);
                }
                _context2.next = 16;
                break;

              case 12:
                _context2.prev = 12;
                _context2.t0 = _context2['catch'](5);

                status = _storageStatus2.default.dirty;
                error = _context2.t0;

              case 16:
                if (!data) data = {};

                _this2.store.dispatch({
                  type: _this2.actions.init,
                  key: key,
                  data: data,
                  error: error,
                  status: status
                });

              case 18:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this2, [[5, 12]]);
      })));

      this[symbols.auth].on(this[symbols.auth].events.notLoggedIn, function () {
        _this2.store.dispatch({
          type: _this2.actions.reset
        });
      });
    }
  }, {
    key: 'setItem',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(key, value) {
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(!this.state || this.state.status === _storageStatus2.default.pending)) {
                  _context3.next = 2;
                  break;
                }

                throw new Error('Storage is not ready');

              case 2:
                this.store.dispatch({
                  type: this.actions.update,
                  data: (0, _defineProperty3.default)({}, key, value)
                });
                _context3.next = 5;
                return this.save();

              case 5:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function setItem(_x, _x2) {
        return _ref4.apply(this, arguments);
      }

      return setItem;
    }()
  }, {
    key: 'setData',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(data) {
        var _this3 = this;

        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!(!this.state || this.state.status === _storageStatus2.default.pending)) {
                  _context5.next = 2;
                  break;
                }

                throw new Error('Storage is not ready');

              case 2:
                this.store.dispatch({
                  type: this.action.update,
                  data: data
                });

                if (!this[symbols.storage]) {
                  _context5.next = 6;
                  break;
                }

                _context5.next = 6;
                return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
                  return _regenerator2.default.wrap(function _callee4$(_context4) {
                    while (1) {
                      switch (_context4.prev = _context4.next) {
                        case 0:
                          return _context4.abrupt('return', _this3[symbols.storage].setItem(_this3.key, (0, _stringify2.default)(_this3.getData())));

                        case 1:
                        case 'end':
                          return _context4.stop();
                      }
                    }
                  }, _callee4, _this3);
                }))();

              case 6:
                this.store.dispatch({
                  type: this.action.save
                });

              case 7:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function setData(_x3) {
        return _ref5.apply(this, arguments);
      }

      return setData;
    }()
  }, {
    key: 'removeItem',
    value: function () {
      var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(key) {
        var _this4 = this;

        return _regenerator2.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (!(!this.state || this.state.status === _storageStatus2.default.pending)) {
                  _context7.next = 2;
                  break;
                }

                throw new Error('Storage is not ready');

              case 2:
                this.store.dispatch({
                  type: this.action.remove,
                  key: key
                });

                if (!this[symbols.storage]) {
                  _context7.next = 6;
                  break;
                }

                _context7.next = 6;
                return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6() {
                  return _regenerator2.default.wrap(function _callee6$(_context6) {
                    while (1) {
                      switch (_context6.prev = _context6.next) {
                        case 0:
                          return _context6.abrupt('return', _this4[symbols.storage].removeItem(_this4.key));

                        case 1:
                        case 'end':
                          return _context6.stop();
                      }
                    }
                  }, _callee6, _this4);
                }))();

              case 6:
                this.store.dispatch({
                  type: this.action.save
                });

              case 7:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function removeItem(_x4) {
        return _ref7.apply(this, arguments);
      }

      return removeItem;
    }()
  }, {
    key: 'removeData',
    value: function () {
      var _ref9 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee9() {
        var _this5 = this;

        return _regenerator2.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                if (!(!this.state || this.state.status === _storageStatus2.default.pending)) {
                  _context9.next = 2;
                  break;
                }

                throw new Error('Storage is not ready');

              case 2:
                if (this[symbols.storage]) {
                  _context9.next = 4;
                  break;
                }

                throw new Error('No storage option was supplied');

              case 4:
                _context9.next = 6;
                return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8() {
                  return _regenerator2.default.wrap(function _callee8$(_context8) {
                    while (1) {
                      switch (_context8.prev = _context8.next) {
                        case 0:
                          return _context8.abrupt('return', _this5[symbols.storage].removeItem(_this5.key));

                        case 1:
                        case 'end':
                          return _context8.stop();
                      }
                    }
                  }, _callee8, _this5);
                }))();

              case 6:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function removeData() {
        return _ref9.apply(this, arguments);
      }

      return removeData;
    }()
  }, {
    key: 'getItem',
    value: function getItem(key) {
      return this.state.data[key];
    }
  }, {
    key: 'getData',
    value: function getData() {
      return (0, _extends3.default)({}, this.state.data);
    }
  }, {
    key: 'reducer',
    get: function get() {
      return (0, _getStorageReducer2.default)(this.prefix);
    }
  }, {
    key: 'key',
    get: function get() {
      return this.state.key;
    }
  }, {
    key: 'status',
    get: function get() {
      return this.state.status;
    }
  }, {
    key: 'constants',
    get: function get() {
      return CONSTANTS;
    }
  }]);
  return Storage;
}(_rcModule2.default), (_applyDecoratedDescriptor(_class.prototype, 'init', [_rcModule.initFunction], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'init'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'setItem', [_proxy.proxify], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'setItem'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'setData', [_proxy.proxify], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'setData'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'removeItem', [_proxy.proxify], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'removeItem'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'removeData', [_proxy.proxify], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'removeData'), _class.prototype)), _class);
exports.default = Storage;
//# sourceMappingURL=index.js.map
