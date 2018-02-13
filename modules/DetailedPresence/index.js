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

var _dec, _class;

var _di = require('../../lib/di');

var _Presence2 = require('../Presence');

var _Presence3 = _interopRequireDefault(_Presence2);

var _moduleStatuses = require('../../enums/moduleStatuses');

var _moduleStatuses2 = _interopRequireDefault(_moduleStatuses);

var _getPresenceReducer = require('../Presence/getPresenceReducer');

var _actionTypes = require('./actionTypes');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

var _getDetailedPresenceReducer = require('./getDetailedPresenceReducer');

var _getDetailedPresenceReducer2 = _interopRequireDefault(_getDetailedPresenceReducer);

var _subscriptionFilters = require('../../enums/subscriptionFilters');

var _subscriptionFilters2 = _interopRequireDefault(_subscriptionFilters);

var _callLogHelpers = require('../../lib/callLogHelpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var presenceRegExp = /.*\/presence\?detailedTelephonyState=true&sipData=true/;

/**
 * @class
 * @description Presence detail info managing module
 */
var DetailedPresence = (_dec = (0, _di.Module)({
  deps: ['Auth', 'Client', 'Storage', 'Subscription', 'RolesAndPermissions', 'ConnectivityMonitor']
}), _dec(_class = function (_Presence) {
  (0, _inherits3.default)(DetailedPresence, _Presence);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Auth} params.auth - auth module instance
   * @param {Client} params.client - client module instance
   * @param {Subscription} params.subscription - subscription module instance
   * @param {ConnectivityMonitor} params.connectivityMonitor - connectivityMonitor module instance
   */
  function DetailedPresence(_ref) {
    var _this2 = this;

    var auth = _ref.auth,
        client = _ref.client,
        subscription = _ref.subscription,
        connectivityMonitor = _ref.connectivityMonitor,
        rolesAndPermissions = _ref.rolesAndPermissions,
        storage = _ref.storage,
        options = (0, _objectWithoutProperties3.default)(_ref, ['auth', 'client', 'subscription', 'connectivityMonitor', 'rolesAndPermissions', 'storage']);
    (0, _classCallCheck3.default)(this, DetailedPresence);

    var _this = (0, _possibleConstructorReturn3.default)(this, (DetailedPresence.__proto__ || (0, _getPrototypeOf2.default)(DetailedPresence)).call(this, (0, _extends3.default)({}, options, {
      actionTypes: _actionTypes2.default
    })));

    _this._subscriptionHandler = function (message) {
      if (presenceRegExp.test(message.event) && message.body) {
        if (message.body.sequence) {
          if (message.body.sequence <= _this._lastSequence) {
            return;
          }
          _this._lastSequence = message.body.sequence;
        }
        var _message$body = message.body,
            activeCalls = _message$body.activeCalls,
            dndStatus = _message$body.dndStatus,
            telephonyStatus = _message$body.telephonyStatus,
            presenceStatus = _message$body.presenceStatus,
            userStatus = _message$body.userStatus;

        _this.store.dispatch({
          type: _this.actionTypes.notification,
          activeCalls: activeCalls,
          dndStatus: dndStatus,
          telephonyStatus: telephonyStatus,
          presenceStatus: presenceStatus,
          userStatus: userStatus,
          message: message.body.message,
          lastDndStatus: _this.dndStatus,
          timestamp: Date.now()
        });
      }
    };

    _this._onStateChange = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(_this._auth.loggedIn && _this._subscription.ready && _this._rolesAndPermissions.ready && (!_this._connectivityMonitor || _this._connectivityMonitor.ready) && _this.status === _moduleStatuses2.default.pending)) {
                _context.next = 10;
                break;
              }

              _this.store.dispatch({
                type: _this.actionTypes.init
              });
              if (_this._connectivityMonitor) {
                _this._connectivity = _this._connectivityMonitor.connectivity;
              }

              if (!_this._rolesAndPermissions.hasPresencePermission) {
                _context.next = 7;
                break;
              }

              _context.next = 6;
              return _this.fetch();

            case 6:
              _this._subscription.subscribe(_subscriptionFilters2.default.detailedPresenceWithSip);

            case 7:
              _this.store.dispatch({
                type: _this.actionTypes.initSuccess
              });
              _context.next = 11;
              break;

            case 10:
              if ((!_this._auth.loggedIn || !_this._subscription.ready || _this._connectivityMonitor && !_this._connectivityMonitor.ready) && _this.ready) {
                _this.store.dispatch({
                  type: _this.actionTypes.reset
                });
                _this._lastTelephonyStatus = null;
                _this._lastSequence = 0;
                _this._lastMessage = null;
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
                  if (_this._rolesAndPermissions.hasPresencePermission) {
                    _this._fetch();
                  }
                }
              }

            case 11:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this2);
    }));

    _this._auth = auth;
    _this._client = client;
    _this._storage = storage;
    _this._subscription = subscription;
    _this._connectivityMonitor = connectivityMonitor;
    _this._rolesAndPermissions = rolesAndPermissions;
    _this._lastNotDisturbDndStatusStorageKey = 'lastNotDisturbDndStatusDetailPresence';
    if (_this._storage) {
      _this._reducer = (0, _getDetailedPresenceReducer2.default)(_this.actionTypes);
      _this._storage.registerReducer({
        key: _this._lastNotDisturbDndStatusStorageKey,
        reducer: (0, _getPresenceReducer.getLastNotDisturbDndStatusReducer)(_this.actionTypes)
      });
    } else {
      _this._reducer = (0, _getDetailedPresenceReducer2.default)(_this.actionTypes, {
        lastNotDisturbDndStatus: (0, _getPresenceReducer.getLastNotDisturbDndStatusReducer)(_this.actionTypes)
      });
    }
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
    _this._lastMessage = null;
    _this._lastTelephonyStatus = null;
    _this._lastSequence = 0;
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
        var ownerId, _json, activeCalls, dndStatus, telephonyStatus, presenceStatus, userStatus, message;

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
                return this._client.service.platform().get(_subscriptionFilters2.default.detailedPresenceWithSip);

              case 5:
                _json = _context2.sent.json();
                activeCalls = _json.activeCalls;
                dndStatus = _json.dndStatus;
                telephonyStatus = _json.telephonyStatus;
                presenceStatus = _json.presenceStatus;
                userStatus = _json.userStatus;
                message = _json.message;

                if (this._auth.ownerId === ownerId) {
                  this.store.dispatch({
                    type: this.actionTypes.fetchSuccess,
                    activeCalls: activeCalls,
                    dndStatus: dndStatus,
                    telephonyStatus: telephonyStatus,
                    presenceStatus: presenceStatus,
                    userStatus: userStatus,
                    message: message,
                    timestamp: Date.now()
                  });
                  this._promise = null;
                }
                _context2.next = 18;
                break;

              case 15:
                _context2.prev = 15;
                _context2.t0 = _context2['catch'](2);

                if (this._auth.ownerId === ownerId) {
                  this.store.dispatch({
                    type: this.actionTypes.fetchError,
                    error: _context2.t0
                  });
                  this._promise = null;
                }

              case 18:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[2, 15]]);
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
}(_Presence3.default)) || _class);
exports.default = DetailedPresence;
//# sourceMappingURL=index.js.map
