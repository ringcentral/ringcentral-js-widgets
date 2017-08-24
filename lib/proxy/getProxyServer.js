'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty = require('babel-runtime/core-js/object/define-property');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

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

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

exports.default = getProxyServer;

var _RcModule2 = require('../RcModule');

var _RcModule3 = _interopRequireDefault(_RcModule2);

var _baseActionTypes = require('./baseActionTypes');

var _baseActionTypes2 = _interopRequireDefault(_baseActionTypes);

var _getProxyServerReducer = require('./getProxyServerReducer');

var _getProxyServerReducer2 = _interopRequireDefault(_getProxyServerReducer);

var _ensureExist = require('../ensureExist');

var _ensureExist2 = _interopRequireDefault(_ensureExist);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getProxyServer(Target) {
  return function (_RcModule) {
    (0, _inherits3.default)(_class, _RcModule);

    function _class(_ref) {
      var _this2 = this;

      var transport = _ref.transport,
          options = (0, _objectWithoutProperties3.default)(_ref, ['transport']);
      (0, _classCallCheck3.default)(this, _class);

      var _this = (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || (0, _getPrototypeOf2.default)(_class)).call(this, (0, _extends3.default)({}, options, {
        actionTypes: _baseActionTypes2.default
      })));

      _this._target = new Target((0, _extends3.default)({}, options, {
        getState: function getState() {
          return _this.state.target;
        }
      }));

      var _loop = function _loop(subModule) {
        var _context2;

        if ((_context2 = _this._target, Object.prototype.hasOwnProperty).call(_context2, subModule) && _this._target[subModule] instanceof _RcModule3.default) {
          (0, _defineProperty2.default)(_this, subModule, {
            configurable: false,
            enumerable: true,
            get: function get() {
              return this._target[subModule];
            }
          });
        }
      };

      for (var subModule in _this._target) {
        _loop(subModule);
      }

      _this._transport = _ensureExist2.default.call(_this, transport, 'transport');
      _this._reducer = (0, _getProxyServerReducer2.default)({
        moduleReducer: _this._target.reducer,
        transport: transport,
        prefix: _this.prefix
      });

      transport.on(transport.events.request, function () {
        var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref3) {
          var requestId = _ref3.requestId,
              _ref3$payload = _ref3.payload,
              type = _ref3$payload.type,
              functionPath = _ref3$payload.functionPath,
              args = _ref3$payload.args,
              actionNumber = _ref3$payload.actionNumber;

          var _functionPath$split$s, _functionPath$split$s2, pathTokens, fnName, target, _target, result;

          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.t0 = type;
                  _context.next = _context.t0 === _this.actionTypes.execute ? 3 : _context.t0 === _this.actionTypes.sync ? 18 : 20;
                  break;

                case 3:
                  _functionPath$split$s = functionPath.split('.').slice(1), _functionPath$split$s2 = (0, _toArray3.default)(_functionPath$split$s), pathTokens = _functionPath$split$s2.slice(0);
                  fnName = pathTokens.pop();
                  target = _this._target;

                  pathTokens.forEach(function (token) {
                    target = target[token];
                  });
                  _context.prev = 7;
                  _context.next = 10;
                  return (_target = target)[fnName].apply(_target, (0, _toConsumableArray3.default)(args));

                case 10:
                  result = _context.sent;

                  transport.response({
                    requestId: requestId,
                    result: result
                  });
                  _context.next = 17;
                  break;

                case 14:
                  _context.prev = 14;
                  _context.t1 = _context['catch'](7);

                  transport.response({
                    requestId: requestId,
                    error: _context.t1
                  });

                case 17:
                  return _context.abrupt('break', 22);

                case 18:
                  if (actionNumber !== _this.state.actionNumber) {
                    transport.response({
                      requestId: requestId,
                      result: _this.state
                    });
                  } else {
                    transport.response({
                      requestId: requestId,
                      error: new Error('State is already up to date.')
                    });
                  }
                  return _context.abrupt('break', 22);

                case 20:
                  transport.response({
                    requestId: requestId,
                    error: new Error('Invalid request type \'' + type + '\'.')
                  });
                  return _context.abrupt('break', 22);

                case 22:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, _this2, [[7, 14]]);
        }));

        return function (_x) {
          return _ref2.apply(this, arguments);
        };
      }());
      return _this;
    }

    return _class;
  }(_RcModule3.default);
}
//# sourceMappingURL=getProxyServer.js.map
