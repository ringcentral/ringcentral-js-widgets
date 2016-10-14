'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _toArray2 = require('babel-runtime/helpers/toArray');

var _toArray3 = _interopRequireDefault(_toArray2);

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

exports.default = getProxyServer;

var _symbolMap = require('data-types/symbol-map');

var _symbolMap2 = _interopRequireDefault(_symbolMap);

var _RcModule2 = require('..//RcModule');

var _RcModule3 = _interopRequireDefault(_RcModule2);

var _proxyActions = require('./proxyActions');

var _proxyActions2 = _interopRequireDefault(_proxyActions);

var _getProxyServerReducer = require('./getProxyServerReducer');

var _getProxyServerReducer2 = _interopRequireDefault(_getProxyServerReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var symbols = new _symbolMap2.default(['reducer']);

function getProxyServer(Module) {
  return function (_RcModule) {
    (0, _inherits3.default)(_class, _RcModule);

    function _class(options) {
      var _this2 = this;

      (0, _classCallCheck3.default)(this, _class);

      var _this = (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || (0, _getPrototypeOf2.default)(_class)).call(this, (0, _extends3.default)({}, options, {
        actions: _proxyActions2.default
      })));

      _RcModule2.addModule.call(_this, 'module', new Module((0, _extends3.default)({}, options, {
        getState: function getState() {
          return _this.state.module;
        }
      })));

      var transport = options.transport;

      if (!transport) {
        throw new Error('options.transport is missing');
      }
      transport.on(transport.events.request, function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(request) {
          var requestId, _request$payload, type, functionPath, args;

          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  requestId = request.requestId;
                  _request$payload = request.payload;
                  type = _request$payload.type;
                  functionPath = _request$payload.functionPath;
                  args = _request$payload.args;

                  if (!(type === _this.actions.execute)) {
                    _context2.next = 9;
                    break;
                  }

                  return _context2.delegateYield(_regenerator2.default.mark(function _callee() {
                    var _functionPath$split$s, _functionPath$split$s2, pathTokens, fnName, module, _module, result;

                    return _regenerator2.default.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            // omit the root part of the path
                            _functionPath$split$s = functionPath.split('.').slice(1);
                            _functionPath$split$s2 = (0, _toArray3.default)(_functionPath$split$s);
                            pathTokens = _functionPath$split$s2;
                            fnName = pathTokens.pop();
                            module = _this.module;

                            pathTokens.forEach(function (token) {
                              module = module[token];
                            });
                            _context.prev = 6;
                            _context.next = 9;
                            return (_module = module)[fnName].apply(_module, (0, _toConsumableArray3.default)(args));

                          case 9:
                            result = _context.sent;

                            transport.response({
                              requestId: requestId,
                              result: result
                            });
                            _context.next = 16;
                            break;

                          case 13:
                            _context.prev = 13;
                            _context.t0 = _context['catch'](6);

                            transport.response({
                              requestId: requestId,
                              error: _context.t0
                            });

                          case 16:
                          case 'end':
                            return _context.stop();
                        }
                      }
                    }, _callee, _this2, [[6, 13]]);
                  })(), 't0', 7);

                case 7:
                  _context2.next = 10;
                  break;

                case 9:
                  if (type === _this.actions.sync) {
                    transport.response({
                      requestId: requestId,
                      result: _this.state
                    });
                  } else {
                    transport.response({
                      requestId: requestId,
                      error: new Error('request type \'' + type + ' not recognized')
                    });
                  }

                case 10:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, _this2);
        }));

        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }());

      _this[symbols.reducer] = (0, _getProxyServerReducer2.default)(_this.prefix, transport, _this.module.reducer);
      return _this;
    }

    (0, _createClass3.default)(_class, [{
      key: 'reducer',
      get: function get() {
        return this[symbols.reducer];
      }
    }]);
    return _class;
  }(_RcModule3.default);
}
//# sourceMappingURL=getProxyServer.js.map
