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

var _Presence2 = require('../Presence');

var _Presence3 = _interopRequireDefault(_Presence2);

var _moduleStatus = require('../../enums/moduleStatus');

var _moduleStatus2 = _interopRequireDefault(_moduleStatus);

var _actionTypes = require('./actionTypes');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

var _getDetailedPresenceReducer = require('./getDetailedPresenceReducer');

var _getDetailedPresenceReducer2 = _interopRequireDefault(_getDetailedPresenceReducer);

var _subscriptionFilters = require('../../enums/subscriptionFilters');

var _subscriptionFilters2 = _interopRequireDefault(_subscriptionFilters);

var _callLogHelpers = require('../../lib/callLogHelpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var presenceRegExp = /\/presence(\?.*)?/;

var DetailedPresence = function (_Presence) {
  (0, _inherits3.default)(DetailedPresence, _Presence);

  function DetailedPresence(_ref) {
    var _this2 = this;

    var auth = _ref.auth,
        client = _ref.client,
        subscription = _ref.subscription,
        connectivityMonitor = _ref.connectivityMonitor,
        options = (0, _objectWithoutProperties3.default)(_ref, ['auth', 'client', 'subscription', 'connectivityMonitor']);
    (0, _classCallCheck3.default)(this, DetailedPresence);

    var _this = (0, _possibleConstructorReturn3.default)(this, (DetailedPresence.__proto__ || (0, _getPrototypeOf2.default)(DetailedPresence)).call(this, (0, _extends3.default)({}, options, {
      actionTypes: _actionTypes2.default
    })));

    _this._subscriptionHandler = function (message) {
      if (presenceRegExp.test(message.event) && message.body) {
        var _message$body = message.body,
            activeCalls = _message$body.activeCalls,
            dndStatus = _message$body.dndStatus,
            telephonyStatus = _message$body.telephonyStatus;

        _this.store.dispatch({
          type: _this.actionTypes.notification,
          activeCalls: activeCalls,
          dndStatus: dndStatus,
          telephonyStatus: telephonyStatus,
          timestamp: Date.now()
        });
      }
    };

    _this._onStateChange = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(_this._auth.loggedIn && _this._subscription.ready && (!_this._connectivityMonitor || _this._connectivityMonitor.ready) && _this.status === _moduleStatus2.default.pending)) {
                _context.next = 9;
                break;
              }

              _this.store.dispatch({
                type: _this.actionTypes.init
              });
              if (_this._connectivityMonitor) {
                _this._connectivity = _this._connectivityMonitor.connectivity;
              }
              _context.next = 5;
              return _this.fetch();

            case 5:
              _this._subscription.subscribe(_subscriptionFilters2.default.detailedPresence);
              _this.store.dispatch({
                type: _this.actionTypes.initSuccess
              });
              _context.next = 10;
              break;

            case 9:
              if ((!_this._auth.loggedIn || !_this._subscription.ready || _this._connectivityMonitor && !_this._connectivityMonitor.ready) && _this.ready) {
                _this.store.dispatch({
                  type: _this.actionTypes.resetSuccess
                });
              } else if (_this.ready && _this._subscription.ready && _this._subscription.message && _this._subscription.message !== _this._lastMessage) {
                _this._lastMessage = _this._subscription.message;
                _this._subscriptionHandler(_this._lastMessage);
              } else if (_this.ready && _this._connectivityMonitor && _this._connectivityMonitor.ready && _this._connectivity !== _this._connectivityMonitor.connectivity) {
                _this._connectivity = _this._connectivityMonitor.connectivity;
                // fetch data on regain connectivity
                if (_this._connectivity) {
                  _this._fetch();
                }
              }

            case 10:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this2);
    }));

    _this._auth = auth;
    _this._client = client;
    _this._subscription = subscription;
    _this._connectivityMonitor = connectivityMonitor;

    _this._reducer = (0, _getDetailedPresenceReducer2.default)(_this.actionTypes);
    _this._lastMessage = null;
    _this.addSelector('sessionIdList', function () {
      return _this.state.calls;
    }, function (calls) {
      return calls.map(function (call) {
        return call.sessionId;
      });
    });

    _this.addSelector('calls', function () {
      return _this.state.data;
    }, function (data) {
      return (0, _callLogHelpers.removeInboundRingOutLegs)(data).filter(function (call) {
        return !(0, _callLogHelpers.isEnded)(call);
      });
    });

    _this._lastTelephonyStatus = null;
    return _this;
  }

  (0, _createClass3.default)(DetailedPresence, [{
    key: 'initialize',
    value: function initialize() {
      this.store.subscribe(this._onStateChange);
    }
  }, {
    key: '_fetch',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        var ownerId, _json, activeCalls, dndStatus, telephonyStatus;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.fetch
                });
                ownerId = this._auth.ownerId;
                _context2.prev = 2;
                _context2.next = 5;
                return this._client.service.platform().get(_subscriptionFilters2.default.detailedPresence);

              case 5:
                _json = _context2.sent.json();
                activeCalls = _json.activeCalls;
                dndStatus = _json.dndStatus;
                telephonyStatus = _json.telephonyStatus;

                if (this._auth.ownerId === ownerId) {
                  this.store.dispatch({
                    type: this.actionTypes.fetchSuccess,
                    activeCalls: activeCalls,
                    dndStatus: dndStatus,
                    telephonyStatus: telephonyStatus,
                    timestamp: Date.now()
                  });
                  this._promise = null;
                }
                _context2.next = 15;
                break;

              case 12:
                _context2.prev = 12;
                _context2.t0 = _context2['catch'](2);

                if (this._auth.ownerId === ownerId) {
                  this.store.dispatch({
                    type: this.actionTypes.fetchError,
                    error: _context2.t0
                  });
                  this._promise = null;
                }

              case 15:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[2, 12]]);
      }));

      function _fetch() {
        return _ref3.apply(this, arguments);
      }

      return _fetch;
    }()
  }, {
    key: 'data',
    get: function get() {
      return this.state.data;
    }
  }, {
    key: 'calls',
    get: function get() {
      return this._selectors.calls();
    }
  }, {
    key: 'telephonyStatus',
    get: function get() {
      return this.state.telephonyStatus;
    }
  }, {
    key: 'sessionIdList',
    get: function get() {
      return this._selectors.sessionIdList();
    }
  }]);
  return DetailedPresence;
}(_Presence3.default);

exports.default = DetailedPresence;
//# sourceMappingURL=index.js.map
