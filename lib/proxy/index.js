'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _defineProperty = require('babel-runtime/core-js/object/define-property');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

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

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.proxify = proxify;
exports.throwOnProxy = throwOnProxy;
exports.proxyInitFunction = proxyInitFunction;
exports.getProxyClient = getProxyClient;

var _symbolMap = require('data-types/symbol-map');

var _symbolMap2 = _interopRequireDefault(_symbolMap);

var _loganberry = require('loganberry');

var _loganberry2 = _interopRequireDefault(_loganberry);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _RcModule2 = require('../../lib/RcModule');

var _RcModule3 = _interopRequireDefault(_RcModule2);

var _proxyActions = require('./proxyActions');

var _proxyActions2 = _interopRequireDefault(_proxyActions);

var _getProxyClientReducer = require('./getProxyClientReducer');

var _getProxyClientReducer2 = _interopRequireDefault(_getProxyClientReducer);

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
  prefix: 'proxy',
  level: _loganberry2.default.enums.logLevel.info
});

var symbols = new _symbolMap2.default(['reducer', 'module', 'transport', 'proxyInitFunction', 'id', 'syncPromise', 'proxyActions']);

function proxify(prototype, property, descriptor) {
  logger.trace(['proxify', {
    prototype: prototype,
    property: property,
    descriptor: descriptor
  }]);
  var configurable = descriptor.configurable;
  var enumerable = descriptor.enumerable;
  var value = descriptor.value;


  function proxyFn() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var functionPath = this.modulePath + '.' + property;
    logger.trace(functionPath + ' proxied');
    return this[symbols.transport].request({
      payload: {
        type: this[symbols.proxyActions].execute,
        functionPath: functionPath,
        args: args
      }
    }).catch(function (error) {
      var newError = new Error('Proxy execution timed out...');
      newError.originalError = error;
      return _promise2.default.reject(newError);
    });
  }
  return {
    configurable: configurable,
    enumerable: enumerable,
    get: function get() {
      if (!this[symbols.transport]) {
        return value;
      }
      return proxyFn;
    }
  };
}

function throwOnProxy(prototype, property, descriptor) {
  logger.trace(['throwOnProxy', {
    prototype: prototype,
    property: property,
    descriptor: descriptor
  }]);
  var configurable = descriptor.configurable;
  var enumerable = descriptor.enumerable;
  var value = descriptor.value;

  function proxyFunction() {
    throw new Error('function \'' + this.modulePath + '.' + property + '\' cannot be called on proxy instance');
  }
  return {
    configurable: configurable,
    enumerable: enumerable,
    get: function get() {
      if (!this[symbols.transport]) {
        return value;
      }
      return proxyFunction;
    }
  };
}

function proxyInitFunction(prototype, property, descriptor) {
  var value = descriptor.value;

  if (typeof value !== 'function') {
    throw new Error('proxyInitFunction must be a function');
  }
  var proto = prototype;
  proto[symbols.proxyInitFunction] = value;

  function proxyFunction() {
    throw new Error('proxyInit function cannot be called directly');
  }
  proxyFunction.toString = function () {
    return value.toString();
  };

  return {
    enumerable: true,
    configurable: false,
    get: function get() {
      return proxyFunction;
    }
  };
}

function initProxy() {
  if (typeof this[symbols.proxyInitFunction] === 'function') {
    this[symbols.proxyInitFunction]();
  }
  for (var subModule in this) {
    if (this.hasOwnProperty(subModule) && this[subModule] instanceof _RcModule3.default) {
      var _context;

      (_context = this[subModule], initProxy).call(_context);
    }
  }
}

function setTransport(transport, actions) {
  this[symbols.transport] = transport;
  this[symbols.proxyActions] = actions;
  for (var subModule in this) {
    if (this.hasOwnProperty(subModule) && this[subModule] instanceof _RcModule3.default) {
      var _context2;

      (_context2 = this[subModule], setTransport).call(_context2, transport, actions);
      (_context2 = this[subModule], _RcModule2.suppressInit).call(_context2);
    }
  }
}

function sync() {
  var _this = this;

  if (!this[symbols.syncPromise]) {
    this[symbols.syncPromise] = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      var result;
      return _regenerator2.default.wrap(function _callee$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _this[symbols.transport].request({
                payload: {
                  type: _this.actions.sync
                }
              });

            case 2:
              result = _context3.sent;

              _this.store.dispatch((0, _extends3.default)({}, result, {
                type: _this.actions.sync
              }));
              _this[symbols.syncPromise] = null;

            case 5:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee, _this);
    }))();
  }
}

function getProxyClient(Module) {
  var _desc, _value, _class;

  return _class = function (_RcModule) {
    (0, _inherits3.default)(_class, _RcModule);

    function _class(options) {
      var _context4;

      (0, _classCallCheck3.default)(this, _class);

      var _this2 = (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || (0, _getPrototypeOf2.default)(_class)).call(this, (0, _extends3.default)({}, options, {
        actions: _proxyActions2.default
      })));

      _this2[symbols.module] = new Module((0, _extends3.default)({}, options, {
        getState: function getState() {
          return _this2.state;
        }
      }));
      _this2[symbols.id] = _uuid2.default.v4();

      var _loop = function _loop(subModule) {
        if (_this2[symbols.module].hasOwnProperty(subModule) && _this2[symbols.module][subModule] instanceof _RcModule3.default) {
          (0, _defineProperty2.default)(_this2, subModule, {
            configurable: false,
            enumerable: true,
            get: function get() {
              return this[symbols.module][subModule];
            }
          });
        }
      };

      for (var subModule in _this2[symbols.module]) {
        _loop(subModule);
      }
      var transport = options.transport;
      // kick the module into proxied mode

      if (!transport) {
        throw new Error('getProxyClient requires a transport object...');
      }
      _this2[symbols.transport] = transport;
      (_context4 = _this2[symbols.module], setTransport).call(_context4, transport, _this2.actions);

      _this2[symbols.reducer] = (0, _getProxyClientReducer2.default)(_this2.prefix, _this2[symbols.module].reducer);
      return _this2;
    }

    (0, _createClass3.default)(_class, [{
      key: 'init',
      value: function init() {
        var _context5,
            _this3 = this;

        var transport = this[symbols.transport];
        (_context5 = this[symbols.module], initProxy).call(_context5);
        transport.on(transport.events.push, function () {
          var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(payload) {
            return _regenerator2.default.wrap(function _callee2$(_context6) {
              while (1) {
                switch (_context6.prev = _context6.next) {
                  case 0:
                    if (!(payload.type === _this3.actions.action)) {
                      _context6.next = 6;
                      break;
                    }

                    logger.trace(payload);

                    if (!_this3[symbols.syncPromise]) {
                      _context6.next = 5;
                      break;
                    }

                    _context6.next = 5;
                    return _this3[symbols.syncPromise];

                  case 5:
                    if (payload.actionNumber === _this3.proxyState.actionNumber + 1) {
                      _this3.store.dispatch((0, _extends3.default)({}, payload, {
                        type: _this3.actions.action
                      }));
                    } else {
                      sync.call(_this3);
                    }

                  case 6:
                  case 'end':
                    return _context6.stop();
                }
              }
            }, _callee2, _this3);
          }));

          return function (_x) {
            return _ref2.apply(this, arguments);
          };
        }());
        sync.call(this);
      }
    }, {
      key: 'reducer',
      get: function get() {
        return this[symbols.reducer];
      }
    }, {
      key: 'state',
      get: function get() {
        return this.store.getState().module;
      }
    }, {
      key: 'proxyState',
      get: function get() {
        return this.store.getState();
      }
    }]);
    return _class;
  }(_RcModule3.default), (_applyDecoratedDescriptor(_class.prototype, 'init', [_RcModule2.initFunction], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'init'), _class.prototype)), _class;
}
//# sourceMappingURL=index.js.map
