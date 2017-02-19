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

var _actionTypes = require('./actionTypes');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

var _moduleStatus = require('../../enums/moduleStatus');

var _moduleStatus2 = _interopRequireDefault(_moduleStatus);

var _getConnectivityMonitorReducer = require('./getConnectivityMonitorReducer');

var _getConnectivityMonitorReducer2 = _interopRequireDefault(_getConnectivityMonitorReducer);

var _connectivityMonitorMessages = require('./connectivityMonitorMessages');

var _connectivityMonitorMessages2 = _interopRequireDefault(_connectivityMonitorMessages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_TIME_TO_RETRY = 5000;

var ConnectivityMonitor = function (_RcModule) {
  (0, _inherits3.default)(ConnectivityMonitor, _RcModule);

  function ConnectivityMonitor(_ref) {
    var alert = _ref.alert,
        client = _ref.client,
        environment = _ref.environment,
        _ref$timeToRetry = _ref.timeToRetry,
        timeToRetry = _ref$timeToRetry === undefined ? DEFAULT_TIME_TO_RETRY : _ref$timeToRetry,
        options = (0, _objectWithoutProperties3.default)(_ref, ['alert', 'client', 'environment', 'timeToRetry']);
    (0, _classCallCheck3.default)(this, ConnectivityMonitor);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ConnectivityMonitor.__proto__ || (0, _getPrototypeOf2.default)(ConnectivityMonitor)).call(this, (0, _extends3.default)({}, options, {
      actionTypes: _actionTypes2.default
    })));

    _this._requestSuccessHandler = function () {
      if (!_this.connectivity) {
        _this.store.dispatch({
          type: _this.actionTypes.connectSuccess
        });
        if (_this._alert) {
          // dismiss disconnected alerts if found
          var alertIds = _this._alert.messages.filter(function (m) {
            return m.message === _connectivityMonitorMessages2.default.disconnected;
          }).map(function (m) {
            return m.id;
          });
          if (alertIds.length) {
            _this._alert.dismiss(alertIds);
          }
        }
      }
      _this._clearTimeout();
    };

    _this._requestErrorHandler = function (apiResponse) {
      if (apiResponse instanceof Error && apiResponse.message === 'Failed to fetch') {
        if (_this.connectivity) {
          _this.store.dispatch({
            type: _this.actionTypes.connectFail
          });
          _this.showAlert();
        }
        _this._retry();
      }
    };

    _this._alert = alert;
    _this._client = client;
    _this._environment = environment;
    _this._timeToRetry = timeToRetry;
    _this._reducer = (0, _getConnectivityMonitorReducer2.default)(_this.actionTypes);
    _this._timeoutId = null;
    return _this;
  }

  (0, _createClass3.default)(ConnectivityMonitor, [{
    key: 'initialize',
    value: function initialize() {
      var _this2 = this;

      this.store.subscribe((0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!_this2.ready && (!_this2._environment || _this2._environment.ready)) {
                  _this2._bindHandlers();
                  _this2.store.dispatch({
                    type: _this2.actionTypes.initSuccess
                  });
                } else if (_this2.ready && _this2._environment && _this2._environment.changed) {
                  _this2._bindHandlers();
                }

              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this2);
      })));
    }
  }, {
    key: 'showAlert',
    value: function showAlert() {
      if (!this.connectivity && this._alert) {
        this._alert.danger({
          message: _connectivityMonitorMessages2.default.disconnected,
          allowDuplicates: false
        });
      }
    }
  }, {
    key: '_bindHandlers',
    value: function _bindHandlers() {
      var _this3 = this;

      if (this._unbindHandlers) {
        this._unbindHandlers();
      }
      var client = this._client.service.platform().client();
      client.on(client.events.requestSuccess, this._requestSuccessHandler);
      client.on(client.events.requestError, this._requestErrorHandler);
      this._unbindHandlers = function () {
        client.off(client.events.requestSuccess, _this3._requestSuccessHandler);
        client.off(client.events.requestError, _this3._requestErrorHandler);
        _this3._unbindHandlers = null;
      };
    }
  }, {
    key: '_checkConnection',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return this._client.service.platform().get('', null, { skipAuthCheck: true });

              case 3:
                _context2.next = 7;
                break;

              case 5:
                _context2.prev = 5;
                _context2.t0 = _context2['catch'](0);

              case 7:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 5]]);
      }));

      function _checkConnection() {
        return _ref3.apply(this, arguments);
      }

      return _checkConnection;
    }()
  }, {
    key: '_clearTimeout',
    value: function _clearTimeout() {
      if (this._timeoutId) clearTimeout(this._timeoutId);
    }
  }, {
    key: '_retry',
    value: function _retry() {
      var _this4 = this;

      var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._timeToRetry;

      this._clearTimeout();
      this._timeoutId = setTimeout(function () {
        _this4._timeoutId = null;
        _this4._checkConnection();
      }, t);
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
  }, {
    key: 'connectivity',
    get: function get() {
      return this.state.connectivity;
    }
  }]);
  return ConnectivityMonitor;
}(_RcModule3.default);

exports.default = ConnectivityMonitor;
//# sourceMappingURL=index.js.map
