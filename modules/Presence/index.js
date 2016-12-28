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

var _getPresenceReducer = require('./getPresenceReducer');

var _getPresenceReducer2 = _interopRequireDefault(_getPresenceReducer);

var _actionTypes = require('./actionTypes');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

var _loginStatus = require('../Auth/loginStatus');

var _loginStatus2 = _interopRequireDefault(_loginStatus);

var _moduleStatus = require('../../enums/moduleStatus');

var _moduleStatus2 = _interopRequireDefault(_moduleStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var presenceEndPoint = /.*\/presence(\?.*)?/;

var Presence = function (_RcModule) {
  (0, _inherits3.default)(Presence, _RcModule);

  function Presence(_ref) {
    var auth = _ref.auth,
        client = _ref.client,
        subscription = _ref.subscription,
        options = (0, _objectWithoutProperties3.default)(_ref, ['auth', 'client', 'subscription']);
    (0, _classCallCheck3.default)(this, Presence);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Presence.__proto__ || (0, _getPrototypeOf2.default)(Presence)).call(this, (0, _extends3.default)({}, options, {
      actionTypes: _actionTypes2.default
    })));

    _this._auth = auth;
    _this._client = client;
    _this._subscription = subscription;

    _this._reducer = (0, _getPresenceReducer2.default)(_this.actionTypes);
    return _this;
  }

  (0, _createClass3.default)(Presence, [{
    key: 'initialize',
    value: function initialize() {
      var _this2 = this;

      this.store.subscribe((0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(_this2._auth.loginStatus === _loginStatus2.default.loggedIn && _this2._subscription.ready && _this2.status === _moduleStatus2.default.pending)) {
                  _context.next = 8;
                  break;
                }

                _this2.store.dispatch({
                  type: _this2.actionTypes.init
                });
                _context.next = 4;
                return _this2.fetch();

              case 4:
                _this2._subscription.subscribe('/account/~/extension/~/presence');
                _this2.store.dispatch({
                  type: _this2.actionTypes.initSuccess
                });
                _context.next = 9;
                break;

              case 8:
                if ((_this2._auth.loginStatus !== _loginStatus2.default.loggedIn || !_this2._subscription.ready) && _this2.ready) {
                  _this2.store.dispatch({
                    type: _this2.actionTypes.resetSuccess
                  });
                } else if (_this2.ready && _this2._subscription.message && presenceEndPoint.test(_this2._subscription.message.event)) {
                  _this2.store.dispatch({
                    type: _this2.actionTypes.notification,
                    dndStatus: _this2._subscription.message.body && _this2._subscription.message.body.dndStatus
                  });
                }

              case 9:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this2);
      })));
    }
  }, {
    key: '_fetch',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        var ownerId, data;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.fetch
                });
                _context2.prev = 1;
                ownerId = this._auth.ownerId;
                _context2.next = 5;
                return this._client.account().extension().presence().get();

              case 5:
                data = _context2.sent;

                if (ownerId === this._auth.ownerId) {
                  this.store.dispatch({
                    type: this.actionTypes.fetchSuccess,
                    dndStatus: data.dndStatus
                  });
                }
                this._promise = null;
                _context2.next = 15;
                break;

              case 10:
                _context2.prev = 10;
                _context2.t0 = _context2['catch'](1);

                this._promise = null;
                this.store.dispatch({
                  type: this.actionTypes.fetchError,
                  error: _context2.t0
                });
                throw _context2.t0;

              case 15:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[1, 10]]);
      }));

      function _fetch() {
        return _ref3.apply(this, arguments);
      }

      return _fetch;
    }()
  }, {
    key: 'fetch',
    value: function fetch() {
      if (!this._promise) {
        this._promise = this._fetch();
      }
      return this._promise;
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
    key: 'dndStatus',
    get: function get() {
      return this.state.dndStatus;
    }
  }]);
  return Presence;
}(_RcModule3.default);

exports.default = Presence;
//# sourceMappingURL=index.js.map
