'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _defineProperty = require('babel-runtime/core-js/object/define-property');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

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

exports.default = getProxyClient;

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _RcModule2 = require('../RcModule');

var _RcModule3 = _interopRequireDefault(_RcModule2);

var _getProxyClientReducer = require('./getProxyClientReducer');

var _getProxyClientReducer2 = _interopRequireDefault(_getProxyClientReducer);

var _baseActionTypes = require('./baseActionTypes');

var _baseActionTypes2 = _interopRequireDefault(_baseActionTypes);

var _ensureExist = require('../ensureExist');

var _ensureExist2 = _interopRequireDefault(_ensureExist);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getProxyClient(Target) {
  return function (_RcModule) {
    (0, _inherits3.default)(_class, _RcModule);

    function _class(_ref) {
      var transport = _ref.transport,
          options = (0, _objectWithoutProperties3.default)(_ref, ['transport']);
      (0, _classCallCheck3.default)(this, _class);

      var _this = (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || (0, _getPrototypeOf2.default)(_class)).call(this, (0, _extends3.default)({}, options, {
        actionTypes: _baseActionTypes2.default
      })));

      _this._id = _uuid2.default.v4();
      _this._target = new Target((0, _extends3.default)({}, options, {
        getState: function getState() {
          return _this.state.target;
        },
        getProxyState: function getProxyState() {
          return _this.state.proxy;
        }
      }));
      _this._transport = _ensureExist2.default.call(_this, transport, 'transport');
      _this._setTransport(_this._target);

      var _loop = function _loop(subModule) {
        var _context;

        if ((_context = _this._target, Object.prototype.hasOwnProperty).call(_context, subModule) && _this._target[subModule] instanceof _RcModule3.default) {
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

      _this._reducer = (0, _getProxyClientReducer2.default)({
        targetReducer: _this._target.reducer,
        proxyReducer: _this._target.proxyReducer,
        transport: transport,
        types: _this.actionTypes
      });
      return _this;
    }

    (0, _createClass3.default)(_class, [{
      key: '_setTransport',
      value: function _setTransport(target) {
        target._transport = this._transport;
        target._proxyActionTypes = this.actionTypes;
        target._suppressInit = true;
        for (var subModule in target) {
          if (Object.prototype.hasOwnProperty.call(target, subModule) && target[subModule] instanceof _RcModule3.default) {
            this._setTransport(target[subModule]);
          }
        }
      }
    }, {
      key: '_sync',
      value: function () {
        var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
          var result;
          return _regenerator2.default.wrap(function _callee$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.prev = 0;
                  _context2.next = 3;
                  return this._transport.request({
                    payload: {
                      type: this.actionTypes.sync,
                      actionNumber: this.state.actionNumber
                    }
                  });

                case 3:
                  result = _context2.sent;

                  this.store.dispatch((0, _extends3.default)({}, result, {
                    type: this.actionTypes.sync
                  }));
                  _context2.next = 9;
                  break;

                case 7:
                  _context2.prev = 7;
                  _context2.t0 = _context2['catch'](0);

                case 9:
                  this._syncPromise = null;

                case 10:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee, this, [[0, 7]]);
        }));

        function _sync() {
          return _ref2.apply(this, arguments);
        }

        return _sync;
      }()
    }, {
      key: 'sync',
      value: function sync() {
        if (!this._syncPromise) {
          this._syncPromise = this._sync();
        }
        return this._syncPromise;
      }
    }, {
      key: '_initialize',
      value: function _initialize(target) {
        if (typeof target.initializeProxy === 'function' && !target._proxyInitialized) {
          target._proxyInitialized = true;
          target.initializeProxy();
        }
        for (var subModule in target) {
          if (Object.prototype.hasOwnProperty.call(target, subModule) && target[subModule] instanceof _RcModule3.default) {
            this._initialize(target[subModule]);
          }
        }
      }
    }, {
      key: 'initialize',
      value: function () {
        var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
          var _this2 = this;

          return _regenerator2.default.wrap(function _callee3$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  // initialize the instance before sync to avoid history object from
                  // becoming out of sync
                  this._initialize(this._target);
                  this._transport.on(this._transport.events.push, function () {
                    var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(payload) {
                      return _regenerator2.default.wrap(function _callee2$(_context3) {
                        while (1) {
                          switch (_context3.prev = _context3.next) {
                            case 0:
                              if (!(payload.type === _this2.actionTypes.action)) {
                                _context3.next = 10;
                                break;
                              }

                              if (!_this2._syncPromise) {
                                _context3.next = 4;
                                break;
                              }

                              _context3.next = 4;
                              return _this2._syncPromise;

                            case 4:
                              if (!(payload.actionNumber === _this2.state.actionNumber + 1)) {
                                _context3.next = 8;
                                break;
                              }

                              _this2.store.dispatch((0, _extends3.default)({}, payload, {
                                type: _this2.actionTypes.action
                              }));
                              _context3.next = 10;
                              break;

                            case 8:
                              _context3.next = 10;
                              return _this2.sync();

                            case 10:
                            case 'end':
                              return _context3.stop();
                          }
                        }
                      }, _callee2, _this2);
                    }));

                    return function (_x) {
                      return _ref4.apply(this, arguments);
                    };
                  }());
                  _context4.next = 4;
                  return this.sync();

                case 4:
                case 'end':
                  return _context4.stop();
              }
            }
          }, _callee3, this);
        }));

        function initialize() {
          return _ref3.apply(this, arguments);
        }

        return initialize;
      }()
    }]);
    return _class;
  }(_RcModule3.default);
}
//# sourceMappingURL=getProxyClient.js.map
