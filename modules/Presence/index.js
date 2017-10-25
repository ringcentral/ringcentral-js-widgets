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

var _dec, _class, _desc, _value, _class2;

var _RcModule2 = require('../../lib/RcModule');

var _RcModule3 = _interopRequireDefault(_RcModule2);

var _di = require('../../lib/di');

var _getPresenceReducer = require('./getPresenceReducer');

var _getPresenceReducer2 = _interopRequireDefault(_getPresenceReducer);

var _actionTypes = require('./actionTypes');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

var _loginStatus = require('../Auth/loginStatus');

var _loginStatus2 = _interopRequireDefault(_loginStatus);

var _moduleStatuses = require('../../enums/moduleStatuses');

var _moduleStatuses2 = _interopRequireDefault(_moduleStatuses);

var _dndStatus = require('./dndStatus');

var _dndStatus2 = _interopRequireDefault(_dndStatus);

var _presenceStatus = require('./presenceStatus');

var _presenceStatus2 = _interopRequireDefault(_presenceStatus);

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

var presenceEndPoint = /.*\/presence(\?.*)?/;

/**
 * @class
 * @description Presence info module
 */
var Presence = (_dec = (0, _di.Module)({
  deps: ['Auth', 'Client', 'Storage', 'Subscription', { dep: 'PresenceOptions', optional: true }]
}), _dec(_class = (_class2 = function (_RcModule) {
  (0, _inherits3.default)(Presence, _RcModule);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Auth} params.auth - auth module instance
   * @param {Client} params.client - client module instance
   * @param {Storage} params.storage - storage module instance
   * @param {Subscription} params.subscription - subscription module instance
   * @param {Object} params.actionTypes - actionTypes enums
   */
  function Presence(_ref) {
    var auth = _ref.auth,
        client = _ref.client,
        storage = _ref.storage,
        subscription = _ref.subscription,
        _ref$actionTypes = _ref.actionTypes,
        actionTypes = _ref$actionTypes === undefined ? _actionTypes2.default : _ref$actionTypes,
        options = (0, _objectWithoutProperties3.default)(_ref, ['auth', 'client', 'storage', 'subscription', 'actionTypes']);
    (0, _classCallCheck3.default)(this, Presence);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Presence.__proto__ || (0, _getPrototypeOf2.default)(Presence)).call(this, (0, _extends3.default)({}, options, {
      actionTypes: actionTypes
    })));

    _this._subscriptionHandler = function (message) {
      if (message && presenceEndPoint.test(message.event) && message.body) {
        if (message.body.sequence) {
          if (message.body.sequence <= _this._lastSequence) {
            return;
          }
          _this._lastSequence = message.body.sequence;
        }
        _this.store.dispatch((0, _extends3.default)({
          type: _this.actionTypes.notification
        }, message.body));
      }
    };

    _this._auth = auth;
    _this._client = client;
    _this._subscription = subscription;
    _this._storage = storage;
    _this._lastMessage = null;

    _this._delayTimeoutId = null;
    _this._lastNotDisturbDndStatusStorageKey = 'lastNotDisturbDndStatus';
    if (_this._storage) {
      _this._reducer = (0, _getPresenceReducer2.default)(_this.actionTypes);
      _this._storage.registerReducer({
        key: _this._lastNotDisturbDndStatusStorageKey,
        reducer: (0, _getPresenceReducer.getLastNotDisturbDndStatusReducer)(_this.actionTypes)
      });
    } else {
      _this._reducer = (0, _getPresenceReducer2.default)(_this.actionTypes, {
        lastNotDisturbDndStatus: (0, _getPresenceReducer.getLastNotDisturbDndStatusReducer)(_this.actionTypes)
      });
    }
    _this._lastSequence = 0;
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
                if (!(_this2._auth.loginStatus === _loginStatus2.default.loggedIn && _this2._subscription.ready && _this2.status === _moduleStatuses2.default.pending)) {
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
                    type: _this2.actionTypes.reset
                  });
                  _this2._lastSequence = 0;
                  _this2._lastMessage = null;
                  _this2.store.dispatch({
                    type: _this2.actionTypes.resetSuccess
                  });
                } else if (_this2.ready && _this2._subscription.ready && _this2._subscription.message && _this2._subscription.message !== _this2._lastMessage) {
                  _this2._lastMessage = _this2._subscription.message;
                  _this2._subscriptionHandler(_this2._lastMessage);
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
                  this.store.dispatch((0, _extends3.default)({
                    type: this.actionTypes.fetchSuccess
                  }, data, {
                    lastDndStatus: this.dndStatus
                  }));
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
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!this._promise) {
                  this._promise = this._fetch();
                }
                return _context3.abrupt('return', this._promise);

              case 2:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function fetch() {
        return _ref4.apply(this, arguments);
      }

      return fetch;
    }()
  }, {
    key: '_update',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(params) {
        var ownerId, platform, response, data;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                ownerId = this._auth.ownerId;
                platform = this._client.service.platform();
                _context4.next = 5;
                return platform.put('/account/~/extension/~/presence', params);

              case 5:
                response = _context4.sent;
                data = response.json();

                if (ownerId === this._auth.ownerId) {
                  this.store.dispatch((0, _extends3.default)({
                    type: this.actionTypes.updateSuccess
                  }, data, {
                    lastDndStatus: this.dndStatus
                  }));
                }
                _context4.next = 14;
                break;

              case 10:
                _context4.prev = 10;
                _context4.t0 = _context4['catch'](0);

                this.store.dispatch({
                  type: this.actionTypes.updateError,
                  error: _context4.t0
                });
                throw _context4.t0;

              case 14:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 10]]);
      }));

      function _update(_x) {
        return _ref5.apply(this, arguments);
      }

      return _update;
    }()
  }, {
    key: '_getUpdateStatusParams',
    value: function _getUpdateStatusParams(userStatusParams) {
      var params = {
        dndStatus: this.dndStatus,
        userStatus: userStatusParams
      };
      if (params.dndStatus !== _dndStatus2.default.takeAllCalls && params.dndStatus !== _dndStatus2.default.doNotAcceptDepartmentCalls) {
        params.dndStatus = this.lastNotDisturbDndStatus || _dndStatus2.default.takeAllCalls;
      }
      return params;
    }
  }, {
    key: 'setAvailable',
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {
        var params;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!(this.presenceStatus === _presenceStatus2.default.available)) {
                  _context5.next = 2;
                  break;
                }

                return _context5.abrupt('return');

              case 2:
                params = this._getUpdateStatusParams(_presenceStatus2.default.available);
                _context5.next = 5;
                return this._update(params);

              case 5:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function setAvailable() {
        return _ref6.apply(this, arguments);
      }

      return setAvailable;
    }()
  }, {
    key: 'setBusy',
    value: function () {
      var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6() {
        var params;
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!(this.presenceStatus === _presenceStatus2.default.busy && this.dndStatus !== _dndStatus2.default.doNotAcceptAnyCalls)) {
                  _context6.next = 2;
                  break;
                }

                return _context6.abrupt('return');

              case 2:
                params = this._getUpdateStatusParams(_presenceStatus2.default.busy);
                _context6.next = 5;
                return this._update(params);

              case 5:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function setBusy() {
        return _ref7.apply(this, arguments);
      }

      return setBusy;
    }()
  }, {
    key: 'setDoNotDisturb',
    value: function () {
      var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7() {
        var params;
        return _regenerator2.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (!(this.presenceStatus === _presenceStatus2.default.busy && this.dndStatus === _dndStatus2.default.doNotAcceptAnyCalls)) {
                  _context7.next = 2;
                  break;
                }

                return _context7.abrupt('return');

              case 2:
                params = {
                  dndStatus: _dndStatus2.default.doNotAcceptAnyCalls,
                  userStatus: _presenceStatus2.default.busy
                };
                _context7.next = 5;
                return this._update(params);

              case 5:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function setDoNotDisturb() {
        return _ref8.apply(this, arguments);
      }

      return setDoNotDisturb;
    }()
  }, {
    key: 'setInvisible',
    value: function () {
      var _ref9 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8() {
        var params;
        return _regenerator2.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                if (!(this.presenceStatus === _presenceStatus2.default.offline)) {
                  _context8.next = 2;
                  break;
                }

                return _context8.abrupt('return');

              case 2:
                params = this._getUpdateStatusParams(_presenceStatus2.default.offline);
                _context8.next = 5;
                return this._update(params);

              case 5:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function setInvisible() {
        return _ref9.apply(this, arguments);
      }

      return setInvisible;
    }()
  }, {
    key: 'toggleAcceptCallQueueCalls',
    value: function () {
      var _ref10 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee9() {
        var params;
        return _regenerator2.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                params = {
                  userStatus: this.userStatus
                };

                if (this.dndStatus === _dndStatus2.default.takeAllCalls) {
                  params.dndStatus = _dndStatus2.default.doNotAcceptDepartmentCalls;
                } else if (this.dndStatus === _dndStatus2.default.doNotAcceptDepartmentCalls) {
                  params.dndStatus = _dndStatus2.default.takeAllCalls;
                }

                if (!params.dndStatus) {
                  _context9.next = 5;
                  break;
                }

                _context9.next = 5;
                return this._update(params);

              case 5:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function toggleAcceptCallQueueCalls() {
        return _ref10.apply(this, arguments);
      }

      return toggleAcceptCallQueueCalls;
    }()
  }, {
    key: 'status',
    get: function get() {
      return this.state.status;
    }
  }, {
    key: 'ready',
    get: function get() {
      return this.state.status === _moduleStatuses2.default.ready;
    }
  }, {
    key: 'dndStatus',
    get: function get() {
      return this.state.dndStatus;
    }
  }, {
    key: 'lastNotDisturbDndStatus',
    get: function get() {
      if (this._storage) {
        return this._storage.getItem(this._lastNotDisturbDndStatusStorageKey);
      }
      return this.state.lastNotDisturbDndStatus;
    }
  }, {
    key: 'userStatus',
    get: function get() {
      return this.state.userStatus;
    }
  }, {
    key: 'message',
    get: function get() {
      return this.state.message;
    }
  }, {
    key: 'presenceStatus',
    get: function get() {
      return this.state.presenceStatus;
    }
  }]);
  return Presence;
}(_RcModule3.default), (_applyDecoratedDescriptor(_class2.prototype, '_fetch', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, '_fetch'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'fetch', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'fetch'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, '_update', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, '_update'), _class2.prototype)), _class2)) || _class);
exports.default = Presence;
//# sourceMappingURL=index.js.map
