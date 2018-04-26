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

var _dec, _class, _desc, _value, _class2;

var _di = require('../../lib/di');

var _Presence2 = require('../Presence');

var _Presence3 = _interopRequireDefault(_Presence2);

var _actionTypes = require('./actionTypes');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

var _getDetailedPresenceReducer = require('./getDetailedPresenceReducer');

var _getDetailedPresenceReducer2 = _interopRequireDefault(_getDetailedPresenceReducer);

var _subscriptionFilters = require('../../enums/subscriptionFilters');

var _subscriptionFilters2 = _interopRequireDefault(_subscriptionFilters);

var _callLogHelpers = require('../../lib/callLogHelpers');

var _proxify = require('../../lib/proxy/proxify');

var _proxify2 = _interopRequireDefault(_proxify);

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

var presenceRegExp = /.*\/presence\?detailedTelephonyState=true&sipData=true/;

/**
 * @class
 * @description Presence detail info managing module
 */
var DetailedPresence = (_dec = (0, _di.Module)({
  deps: [{ dep: 'DetailedPresenceOptions', optional: true }]
}), _dec(_class = (_class2 = function (_Presence) {
  (0, _inherits3.default)(DetailedPresence, _Presence);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Auth} params.auth - auth module instance
   * @param {Client} params.client - client module instance
   * @param {Subscription} params.subscription - subscription module instance
   * @param {ConnectivityMonitor} params.connectivityMonitor - connectivityMonitor module instance
   */
  function DetailedPresence(options) {
    (0, _classCallCheck3.default)(this, DetailedPresence);

    var _this = (0, _possibleConstructorReturn3.default)(this, (DetailedPresence.__proto__ || (0, _getPrototypeOf2.default)(DetailedPresence)).call(this, (0, _extends3.default)({
      getReducer: _getDetailedPresenceReducer2.default,
      subscriptionFilter: _subscriptionFilters2.default.detailedPresenceWithSip,
      actionTypes: _actionTypes2.default,
      lastNotDisturbDndStatusStorageKey: 'lastNotDisturbDndStatusDetailPresence'
    }, options)));

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
    return _this;
  }

  (0, _createClass3.default)(DetailedPresence, [{
    key: '_fetch',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var ownerId, _json, activeCalls, dndStatus, telephonyStatus, presenceStatus, userStatus, message;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.fetch
                });
                ownerId = this._auth.ownerId;
                _context.prev = 2;
                _context.next = 5;
                return this._client.service.platform().get(_subscriptionFilters2.default.detailedPresenceWithSip);

              case 5:
                _json = _context.sent.json();
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
                _context.next = 18;
                break;

              case 15:
                _context.prev = 15;
                _context.t0 = _context['catch'](2);

                if (this._auth.ownerId === ownerId) {
                  this.store.dispatch({
                    type: this.actionTypes.fetchError,
                    error: _context.t0
                  });
                  this._promise = null;
                }

              case 18:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[2, 15]]);
      }));

      function _fetch() {
        return _ref.apply(this, arguments);
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
}(_Presence3.default), (_applyDecoratedDescriptor(_class2.prototype, '_fetch', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, '_fetch'), _class2.prototype)), _class2)) || _class);
exports.default = DetailedPresence;
//# sourceMappingURL=index.js.map
