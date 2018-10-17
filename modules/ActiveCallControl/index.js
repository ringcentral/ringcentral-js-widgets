'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _defineProperty = require('babel-runtime/core-js/object/define-property');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

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

var _dec, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3;

var _reselect = require('reselect');

var _getter = require('../../lib/getter');

var _getter2 = _interopRequireDefault(_getter);

var _di = require('../../lib/di');

var _Pollable2 = require('../../lib/Pollable');

var _Pollable3 = _interopRequireDefault(_Pollable2);

var _moduleStatuses = require('../../enums/moduleStatuses');

var _moduleStatuses2 = _interopRequireDefault(_moduleStatuses);

var _callErrors = require('../Call/callErrors');

var _callErrors2 = _interopRequireDefault(_callErrors);

var _ensureExist = require('../../lib/ensureExist');

var _ensureExist2 = _interopRequireDefault(_ensureExist);

var _actionTypes = require('./actionTypes');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

var _getActiveCallControlReducer = require('./getActiveCallControlReducer');

var _getActiveCallControlReducer2 = _interopRequireDefault(_getActiveCallControlReducer);

var _getDataReducer = require('./getDataReducer');

var _getDataReducer2 = _interopRequireDefault(_getDataReducer);

var _helpers = require('./helpers');

var _callControlError = require('./callControlError');

var _callControlError2 = _interopRequireDefault(_callControlError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  (0, _defineProperty2.default)(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

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

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

var DEFAULT_TTL = 30 * 60 * 1000;
var DEFAULT_TIME_TO_RETRY = 62 * 1000;
var telephonySessionsEndPoint = /\/telephony\/sessions$/;
var storageKey = 'activeCallControl';
var subscribeEvent = '/account/~/extension/~/telephony/sessions';

var ActiveCallControl = (_dec = (0, _di.Module)({
  deps: ['Client', 'Auth', 'Subscription', 'ConnectivityMonitor', 'RolesAndPermissions', 'CallMonitor', 'Alert', 'NumberValidate', 'AccountInfo', { dep: 'TabManager', optional: true }, { dep: 'Storage', optional: true }, { dep: 'ActiveCallControlOptions', optional: true }]
}), _dec(_class = (_class2 = function (_Pollable) {
  (0, _inherits3.default)(ActiveCallControl, _Pollable);

  function ActiveCallControl(_ref) {
    var client = _ref.client,
        auth = _ref.auth,
        _ref$ttl = _ref.ttl,
        ttl = _ref$ttl === undefined ? DEFAULT_TTL : _ref$ttl,
        _ref$timeToRetry = _ref.timeToRetry,
        timeToRetry = _ref$timeToRetry === undefined ? DEFAULT_TIME_TO_RETRY : _ref$timeToRetry,
        storage = _ref.storage,
        subscription = _ref.subscription,
        connectivityMonitor = _ref.connectivityMonitor,
        rolesAndPermissions = _ref.rolesAndPermissions,
        tabManager = _ref.tabManager,
        callMonitor = _ref.callMonitor,
        _ref$polling = _ref.polling,
        polling = _ref$polling === undefined ? false : _ref$polling,
        _ref$disableCache = _ref.disableCache,
        disableCache = _ref$disableCache === undefined ? false : _ref$disableCache,
        alert = _ref.alert,
        numberValidate = _ref.numberValidate,
        accountInfo = _ref.accountInfo,
        options = (0, _objectWithoutProperties3.default)(_ref, ['client', 'auth', 'ttl', 'timeToRetry', 'storage', 'subscription', 'connectivityMonitor', 'rolesAndPermissions', 'tabManager', 'callMonitor', 'polling', 'disableCache', 'alert', 'numberValidate', 'accountInfo']);
    (0, _classCallCheck3.default)(this, ActiveCallControl);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ActiveCallControl.__proto__ || (0, _getPrototypeOf2.default)(ActiveCallControl)).call(this, (0, _extends3.default)({}, options, {
      actionTypes: _actionTypes2.default
    })));

    _initDefineProp(_this, 'recordingId', _descriptor, _this);

    _initDefineProp(_this, 'activeSession', _descriptor2, _this);

    _initDefineProp(_this, 'activeSessions', _descriptor3, _this);

    _this._client = client;
    if (!disableCache) {
      _this._storage = storage;
    }
    _this._subscription = _ensureExist2.default.call(_this, subscription, 'subscription');
    _this._connectivityMonitor = _ensureExist2.default.call(_this, connectivityMonitor, 'connectivityMonitor');
    _this._rolesAndPermissions = _ensureExist2.default.call(_this, rolesAndPermissions, 'rolesAndPermissions');
    _this._callMonitor = _ensureExist2.default.call(_this, callMonitor, 'callMonitor');
    _this._tabManager = tabManager;
    _this._ttl = ttl;
    _this._timeToRetry = timeToRetry;
    _this._auth = _ensureExist2.default.call(_this, auth, 'auth');
    _this._promise = null;
    _this._lastSubscriptionMessage = null;
    _this._storageKey = storageKey;
    _this._polling = polling;
    _this._alert = alert;
    _this._numberValidate = numberValidate;
    _this._accountInfo = accountInfo;

    if (_this._storage) {
      _this._reducer = (0, _getActiveCallControlReducer2.default)(_this.actionTypes);
      _this._storage.registerReducer({
        key: _this._storageKey,
        reducer: (0, _getDataReducer2.default)(_this.actionTypes)
      });
    } else {
      _this._reducer = (0, _getActiveCallControlReducer2.default)(_this.actionTypes, {
        data: (0, _getDataReducer2.default)(_this.actionTypes)
      });
    }
    return _this;
  }

  (0, _createClass3.default)(ActiveCallControl, [{
    key: 'initialize',
    value: function initialize() {
      var _this2 = this;

      this.store.subscribe(function () {
        return _this2._onStateChange();
      });
    }
  }, {
    key: '_onStateChange',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this._shouldInit()) {
                  _context.next = 8;
                  break;
                }

                this.store.dispatch({
                  type: this.actionTypes.init
                });
                this._connectivity = this._connectivityMonitor.connectivity;
                _context.next = 5;
                return this._init();

              case 5:
                this.store.dispatch({
                  type: this.actionTypes.initSuccess
                });
                _context.next = 9;
                break;

              case 8:
                if (this._shouldReset()) {
                  this._resetModuleStatus();
                } else if (this.ready) {
                  this._subscriptionHandler();
                  this._checkConnectivity();
                }

              case 9:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function _onStateChange() {
        return _ref2.apply(this, arguments);
      }

      return _onStateChange;
    }()
  }, {
    key: '_shouldInit',
    value: function _shouldInit() {
      return this._auth.loggedIn && (!this._storage || this._storage.ready) && this._subscription.ready && this._connectivityMonitor.ready && this._callMonitor.ready && (!this._tabManager || this._tabManager.ready) && this._rolesAndPermissions.ready && this.pending;
    }
  }, {
    key: '_shouldReset',
    value: function _shouldReset() {
      return (!this._auth.loggedIn || !!this._storage && !this._storage.ready || !this._subscription.ready || !!this._tabManager && !this._tabManager.ready || !this._connectivityMonitor.ready || !this._callMonitor.ready || !this._rolesAndPermissions.ready) && this.ready;
    }
  }, {
    key: '_resetModuleStatus',
    value: function _resetModuleStatus() {
      this.store.dispatch({
        type: this.actionTypes.resetSuccess
      });
    }
  }, {
    key: '_shouldFetch',
    value: function _shouldFetch() {
      return !this._tabManager || this._tabManager.active;
    }
  }, {
    key: 'fetchData',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!this._promise) {
                  this._promise = this._fetchData();
                }
                _context2.next = 3;
                return this._promise;

              case 3:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function fetchData() {
        return _ref3.apply(this, arguments);
      }

      return fetchData;
    }()
  }, {
    key: '_fetchData',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return this._syncData();

              case 3:
                if (this._polling) {
                  this._startPolling();
                }
                this._promise = null;
                _context3.next = 12;
                break;

              case 7:
                _context3.prev = 7;
                _context3.t0 = _context3['catch'](0);

                this._promise = null;
                if (this._polling) {
                  this._startPolling(this.timeToRetry);
                } else {
                  this._retry();
                }
                throw _context3.t0;

              case 12:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 7]]);
      }));

      function _fetchData() {
        return _ref4.apply(this, arguments);
      }

      return _fetchData;
    }()
  }, {
    key: '_startPolling',
    value: function _startPolling() {
      var _this3 = this;

      var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.timestamp + this.ttl + 10 - Date.now();

      this._clearTimeout();
      this._timeoutId = setTimeout(function () {
        _this3._timeoutId = null;
        if (!_this3._tabManager || _this3._tabManager.active) {
          if (!_this3.timestamp || Date.now() - _this3.timestamp > _this3.ttl) {
            _this3.fetchData();
          } else {
            _this3._startPolling();
          }
        } else if (_this3.timestamp && Date.now() - _this3.timestamp < _this3.ttl) {
          _this3._startPolling();
        } else {
          _this3._startPolling(_this3.timeToRetry);
        }
      }, t);
    }
  }, {
    key: '_syncData',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
        var activeSessionsMap, sessionId, result;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                activeSessionsMap = {};
                _context4.t0 = _regenerator2.default.keys(this.activeSessions);

              case 3:
                if ((_context4.t1 = _context4.t0()).done) {
                  _context4.next = 12;
                  break;
                }

                sessionId = _context4.t1.value;

                if (!sessionId) {
                  _context4.next = 10;
                  break;
                }

                _context4.next = 8;
                return this.getPartyData(this.activeSessions[sessionId], sessionId);

              case 8:
                result = _context4.sent;

                activeSessionsMap[sessionId] = result;

              case 10:
                _context4.next = 3;
                break;

              case 12:
                this.store.dispatch({
                  type: this.actionTypes.updateActiveSessions,
                  activeSessionsMap: activeSessionsMap,
                  timestamp: Date.now()
                });
                _context4.next = 18;
                break;

              case 15:
                _context4.prev = 15;
                _context4.t2 = _context4['catch'](0);
                throw _context4.t2;

              case 18:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 15]]);
      }));

      function _syncData() {
        return _ref5.apply(this, arguments);
      }

      return _syncData;
    }()
  }, {
    key: '_init',
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (this._hasPermission) {
                  _context5.next = 2;
                  break;
                }

                return _context5.abrupt('return');

              case 2:
                if (!this._shouldFetch()) {
                  _context5.next = 13;
                  break;
                }

                _context5.prev = 3;
                _context5.next = 6;
                return this.fetchData();

              case 6:
                _context5.next = 11;
                break;

              case 8:
                _context5.prev = 8;
                _context5.t0 = _context5['catch'](3);

                this._retry();

              case 11:
                _context5.next = 14;
                break;

              case 13:
                if (this._polling) {
                  this._startPolling();
                } else {
                  this._retry();
                }

              case 14:
                this._subscription.subscribe(subscribeEvent);

              case 15:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this, [[3, 8]]);
      }));

      function _init() {
        return _ref6.apply(this, arguments);
      }

      return _init;
    }()
  }, {
    key: '_subscriptionHandler',
    value: function _subscriptionHandler() {
      if (this._storage && this._tabManager && !this._tabManager.active) {
        return;
      }
      var message = this._subscription.message;

      if (message && message !== this._lastSubscriptionMessage && telephonySessionsEndPoint.test(message.event) && message.body) {
        this._lastSubscriptionMessage = message;
        var _message$body = message.body,
            sessionId = _message$body.sessionId,
            parties = _message$body.parties;

        this.store.dispatch({
          type: this.actionTypes.updateActiveSessionStatus,
          sessionId: sessionId,
          party: parties[0]
        });
      }
    }
  }, {
    key: 'removeActiveSession',
    value: function removeActiveSession(sessionId) {
      this.store.dispatch({
        type: this.actionTypes.removeActiveSession,
        sessionId: sessionId
      });
    }
    // count it as load (should only call on container init step)

  }, {
    key: 'setActiveSessionId',
    value: function setActiveSessionId(sessionId) {
      this.store.dispatch({
        type: this.actionTypes.setActiveSessionId,
        sessionId: sessionId
      });
    }
  }, {
    key: '_checkConnectivity',
    value: function _checkConnectivity() {
      if (this._connectivityMonitor && this._connectivityMonitor.ready && this._connectivity !== this._connectivityMonitor.connectivity) {
        this._connectivity = this._connectivityMonitor.connectivity;
        if (this._connectivity) {
          this.fetchData();
        }
      }
    }
  }, {
    key: 'patch',
    value: function () {
      var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(_ref7) {
        var _ref7$url = _ref7.url,
            url = _ref7$url === undefined ? null : _ref7$url,
            _ref7$query = _ref7.query,
            query = _ref7$query === undefined ? null : _ref7$query,
            _ref7$body = _ref7.body,
            body = _ref7$body === undefined ? null : _ref7$body;
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                _context6.next = 3;
                return this._client.service._platform.send({
                  method: 'PATCH', url: url, query: query, body: body
                });

              case 3:
                _context6.next = 8;
                break;

              case 5:
                _context6.prev = 5;
                _context6.t0 = _context6['catch'](0);
                throw _context6.t0;

              case 8:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this, [[0, 5]]);
      }));

      function patch(_x2) {
        return _ref8.apply(this, arguments);
      }

      return patch;
    }()
  }, {
    key: 'mute',
    value: function () {
      var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(sessionId) {
        var activeSession, url;
        return _regenerator2.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;
                activeSession = this.activeSessions[sessionId];
                url = (0, _helpers.requestURI)(activeSession).mute;
                _context7.next = 5;
                return this.patch({
                  url: url,
                  body: {
                    muted: true
                  }
                });

              case 5:
                _context7.next = 10;
                break;

              case 7:
                _context7.prev = 7;
                _context7.t0 = _context7['catch'](0);

                if ((0, _helpers.confictError)(_context7.t0)) {
                  this._alert.warning({
                    message: _callControlError2.default.muteConflictError
                  });
                } else {
                  this._alert.warning({
                    message: _callControlError2.default.generalError
                  });
                }

              case 10:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this, [[0, 7]]);
      }));

      function mute(_x3) {
        return _ref9.apply(this, arguments);
      }

      return mute;
    }()
  }, {
    key: 'unmute',
    value: function () {
      var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(sessionId) {
        var activeSession, url;
        return _regenerator2.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.prev = 0;
                activeSession = this.activeSessions[sessionId];
                url = (0, _helpers.requestURI)(activeSession).mute;
                _context8.next = 5;
                return this.patch({
                  url: url,
                  body: {
                    muted: false
                  }
                });

              case 5:
                _context8.next = 10;
                break;

              case 7:
                _context8.prev = 7;
                _context8.t0 = _context8['catch'](0);

                if ((0, _helpers.confictError)(_context8.t0)) {
                  this._alert.warning({
                    message: _callControlError2.default.unMuteConflictError
                  });
                } else {
                  this._alert.warning({
                    message: _callControlError2.default.generalError
                  });
                }

              case 10:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this, [[0, 7]]);
      }));

      function unmute(_x4) {
        return _ref10.apply(this, arguments);
      }

      return unmute;
    }()
  }, {
    key: 'startRecord',
    value: function () {
      var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(sessionId) {
        var activeSession, url, _response, response;

        return _regenerator2.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.prev = 0;
                activeSession = this.activeSessions[sessionId];
                url = (0, _helpers.requestURI)(activeSession).record;
                _context9.next = 5;
                return this._client.service._platform.post(url);

              case 5:
                _response = _context9.sent;
                response = JSON.parse(_response._text);

                this.store.dispatch({
                  type: this.actionTypes.startRecord,
                  sessionId: sessionId,
                  response: response
                });
                _context9.next = 13;
                break;

              case 10:
                _context9.prev = 10;
                _context9.t0 = _context9['catch'](0);

                this.store.dispatch({
                  type: this.actionTypes.recordFail,
                  sessionId: sessionId
                });

              case 13:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, this, [[0, 10]]);
      }));

      function startRecord(_x5) {
        return _ref11.apply(this, arguments);
      }

      return startRecord;
    }()
  }, {
    key: 'stopRecord',
    value: function () {
      var _ref12 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10(sessionId) {
        var activeSession, recordingId, url;
        return _regenerator2.default.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.prev = 0;
                activeSession = this.activeSessions[sessionId];
                recordingId = this.recordingIds[sessionId].id;

                activeSession.recordingId = recordingId;
                url = (0, _helpers.requestURI)(activeSession).stopRecord;

                this.patch({
                  url: url,
                  body: {
                    active: false
                  }
                });
                this.store.dispatch({
                  type: this.actionTypes.stopRecord,
                  sessionId: sessionId
                });
                _context10.next = 12;
                break;

              case 9:
                _context10.prev = 9;
                _context10.t0 = _context10['catch'](0);
                throw _context10.t0;

              case 12:
              case 'end':
                return _context10.stop();
            }
          }
        }, _callee10, this, [[0, 9]]);
      }));

      function stopRecord(_x6) {
        return _ref12.apply(this, arguments);
      }

      return stopRecord;
    }()
  }, {
    key: 'hangUp',
    value: function () {
      var _ref13 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11(sessionId) {
        var activeSession, url;
        return _regenerator2.default.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.prev = 0;
                activeSession = this.activeSessions[sessionId];
                url = (0, _helpers.requestURI)(activeSession).hangUp;
                _context11.next = 5;
                return this._client.service._platform.delete(url);

              case 5:
                if (typeof this._onCallEndFunc === 'function') {
                  this._onCallEndFunc();
                }
                this.store.dispatch({
                  type: this.actionTypes.removeActiveSession,
                  sessionId: sessionId
                });
                _context11.next = 12;
                break;

              case 9:
                _context11.prev = 9;
                _context11.t0 = _context11['catch'](0);

                this._alert.warning({
                  message: _callControlError2.default.generalError
                });

              case 12:
              case 'end':
                return _context11.stop();
            }
          }
        }, _callee11, this, [[0, 9]]);
      }));

      function hangUp(_x7) {
        return _ref13.apply(this, arguments);
      }

      return hangUp;
    }()
  }, {
    key: 'reject',
    value: function () {
      var _ref14 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee12(sessionId) {
        var activeSession, url;
        return _regenerator2.default.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.prev = 0;
                activeSession = this.activeSessions[sessionId];
                url = (0, _helpers.requestURI)(activeSession).reject;
                _context12.next = 5;
                return this._client.service._platform.post(url);

              case 5:
                this.store.dispatch({
                  type: this.actionTypes.removeActiveSession,
                  sessionId: sessionId
                });
                _context12.next = 11;
                break;

              case 8:
                _context12.prev = 8;
                _context12.t0 = _context12['catch'](0);

                this._alert.warning({
                  message: _callControlError2.default.generalError
                });

              case 11:
              case 'end':
                return _context12.stop();
            }
          }
        }, _callee12, this, [[0, 8]]);
      }));

      function reject(_x8) {
        return _ref14.apply(this, arguments);
      }

      return reject;
    }()
  }, {
    key: 'hold',
    value: function () {
      var _ref15 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee13(sessionId) {
        var activeSession, url;
        return _regenerator2.default.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _context13.prev = 0;
                activeSession = this.activeSessions[sessionId];
                url = (0, _helpers.requestURI)(activeSession).hold;
                _context13.next = 5;
                return this._client.service._platform.post(url);

              case 5:
                _context13.next = 10;
                break;

              case 7:
                _context13.prev = 7;
                _context13.t0 = _context13['catch'](0);

                if ((0, _helpers.confictError)(_context13.t0)) {
                  this._alert.warning({
                    message: _callControlError2.default.holdConflictError
                  });
                } else {
                  this._alert.warning({
                    message: _callControlError2.default.generalError
                  });
                }

              case 10:
              case 'end':
                return _context13.stop();
            }
          }
        }, _callee13, this, [[0, 7]]);
      }));

      function hold(_x9) {
        return _ref15.apply(this, arguments);
      }

      return hold;
    }()
  }, {
    key: 'unHold',
    value: function () {
      var _ref16 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee14(sessionId) {
        var activeSession, url;
        return _regenerator2.default.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                _context14.prev = 0;
                activeSession = this.activeSessions[sessionId];
                url = (0, _helpers.requestURI)(activeSession).unHold;
                _context14.next = 5;
                return this._client.service._platform.post(url);

              case 5:
                _context14.next = 10;
                break;

              case 7:
                _context14.prev = 7;
                _context14.t0 = _context14['catch'](0);

                if ((0, _helpers.confictError)(_context14.t0)) {
                  this._alert.warning({
                    message: _callControlError2.default.unHoldConflictError
                  });
                } else {
                  this._alert.warning({
                    message: _callControlError2.default.generalError
                  });
                }

              case 10:
              case 'end':
                return _context14.stop();
            }
          }
        }, _callee14, this, [[0, 7]]);
      }));

      function unHold(_x10) {
        return _ref16.apply(this, arguments);
      }

      return unHold;
    }()
  }, {
    key: 'transfer',
    value: function () {
      var _ref17 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee15(transferNumber, sessionId) {
        var _this4 = this;

        var activeSession, url, validatedResult, validPhoneNumber, phoneNumber;
        return _regenerator2.default.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                _context15.prev = 0;
                activeSession = this.activeSessions[sessionId];
                url = (0, _helpers.requestURI)(activeSession).transfer;
                _context15.next = 5;
                return this._numberValidate.validateNumbers([transferNumber]);

              case 5:
                validatedResult = _context15.sent;

                if (validatedResult.result) {
                  _context15.next = 9;
                  break;
                }

                validatedResult.errors.forEach(function (error) {
                  _this4._alert.warning({
                    message: _callErrors2.default[error.type],
                    payload: {
                      phoneNumber: error.phoneNumber
                    }
                  });
                });
                return _context15.abrupt('return');

              case 9:
                validPhoneNumber = validatedResult.numbers[0] && validatedResult.numbers[0].e164;
                phoneNumber = validPhoneNumber;

                if (validPhoneNumber.indexOf('+') === -1) {
                  phoneNumber = [this._accountInfo.mainCompanyNumber, validPhoneNumber].join('*');
                }
                _context15.next = 14;
                return this._client.service._platform.post(url, {
                  phoneNumber: phoneNumber
                });

              case 14:
                _context15.next = 19;
                break;

              case 16:
                _context15.prev = 16;
                _context15.t0 = _context15['catch'](0);

                this._alert.warning({
                  message: _callControlError2.default.generalError
                });

              case 19:
              case 'end':
                return _context15.stop();
            }
          }
        }, _callee15, this, [[0, 16]]);
      }));

      function transfer(_x11, _x12) {
        return _ref17.apply(this, arguments);
      }

      return transfer;
    }()
  }, {
    key: 'flip',
    value: function () {
      var _ref18 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee16(flipValue, sessionId) {
        var activeSession, url;
        return _regenerator2.default.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                _context16.prev = 0;
                activeSession = this.activeSessions[sessionId];
                url = (0, _helpers.requestURI)(activeSession).flip;
                _context16.next = 5;
                return this._client.service._platform.post(url, {
                  callFlipId: flipValue
                });

              case 5:
                _context16.next = 10;
                break;

              case 7:
                _context16.prev = 7;
                _context16.t0 = _context16['catch'](0);
                throw _context16.t0;

              case 10:
              case 'end':
                return _context16.stop();
            }
          }
        }, _callee16, this, [[0, 7]]);
      }));

      function flip(_x13, _x14) {
        return _ref18.apply(this, arguments);
      }

      return flip;
    }()
  }, {
    key: 'forward',
    value: function () {
      var _ref19 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee17() {
        return _regenerator2.default.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
              case 'end':
                return _context17.stop();
            }
          }
        }, _callee17, this);
      }));

      function forward() {
        return _ref19.apply(this, arguments);
      }

      return forward;
    }()
  }, {
    key: 'getCallSessionStatus',
    value: function () {
      var _ref20 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee18() {
        return _regenerator2.default.wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
              case 'end':
                return _context18.stop();
            }
          }
        }, _callee18, this);
      }));

      function getCallSessionStatus() {
        return _ref20.apply(this, arguments);
      }

      return getCallSessionStatus;
    }()
  }, {
    key: 'getPartyData',
    value: function () {
      var _ref21 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee19(item, sessionId) {
        var url, _response, response, errRgx;

        return _regenerator2.default.wrap(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                url = (0, _helpers.requestURI)(item).getPartyData;
                _context19.prev = 1;
                _context19.next = 4;
                return this._client.service._platform.get(url);

              case 4:
                _response = _context19.sent;
                response = JSON.parse(_response._text);
                return _context19.abrupt('return', response);

              case 9:
                _context19.prev = 9;
                _context19.t0 = _context19['catch'](1);
                errRgx = /4[0-9][0-9]/g;

                if (errRgx.test(_context19.t0.message)) {
                  this.removeActiveSession(sessionId);
                }
                throw _context19.t0;

              case 14:
              case 'end':
                return _context19.stop();
            }
          }
        }, _callee19, this, [[1, 9]]);
      }));

      function getPartyData(_x15, _x16) {
        return _ref21.apply(this, arguments);
      }

      return getPartyData;
    }()
  }, {
    key: '_hasPermission',
    get: function get() {
      return this._rolesAndPermissions.ringoutEnabled;
    }
  }, {
    key: 'data',
    get: function get() {
      return this._storage && this._storage.ready && this._storage.getItem(this._storageKey) || this.state;
    }
  }, {
    key: 'activeSessionId',
    get: function get() {
      return this.data.activeSessionId || null;
    }
  }, {
    key: 'recordingIds',
    get: function get() {
      return this.data.recordingIds || null;
    }
  }, {
    key: 'activeSessionsStatus',
    get: function get() {
      return this.data.activeSessionsStatus || {};
    }
  }, {
    key: 'timestamp',
    get: function get() {
      return this.data.timestamp;
    }
  }, {
    key: 'timeToRetry',
    get: function get() {
      return this._timeToRetry;
    }
  }, {
    key: 'ttl',
    get: function get() {
      return this._ttl;
    }
  }, {
    key: 'status',
    get: function get() {
      return this.state.status;
    }
  }, {
    key: 'ready',
    get: function get() {
      return this.status === _moduleStatuses2.default.ready;
    }
  }]);
  return ActiveCallControl;
}(_Pollable3.default), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'recordingId', [_getter2.default], {
  enumerable: true,
  initializer: function initializer() {
    var _this5 = this;

    return (0, _reselect.createSelector)(function () {
      return _this5.activeSessionId;
    }, function () {
      return _this5.recordingIds;
    }, function (activeSessionId, recordingIds) {
      return recordingIds[activeSessionId];
    });
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'activeSession', [_getter2.default], {
  enumerable: true,
  initializer: function initializer() {
    var _this6 = this;

    return (0, _reselect.createSelector)(function () {
      return _this6.activeSessionId;
    }, function () {
      return _this6.activeSessions;
    }, function (activeSessionId, activeSessions) {
      return activeSessions[activeSessionId];
    });
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'activeSessions', [_getter2.default], {
  enumerable: true,
  initializer: function initializer() {
    var _this7 = this;

    return (0, _reselect.createSelector)(function () {
      return _this7._callMonitor.calls;
    }, function () {
      return _this7.activeSessionsStatus;
    }, function (calls, activeSessionsStatus) {
      var reducer = function reducer(accumulator, call) {
        var sessionId = call.sessionId;

        var activeSessionStatus = activeSessionsStatus[sessionId];
        accumulator[sessionId] = (0, _helpers.normalizeSession)({
          call: call,
          activeSessionStatus: activeSessionStatus
        });
        return accumulator;
      };
      return calls.reduce(reducer, {});
    });
  }
})), _class2)) || _class);
exports.default = ActiveCallControl;
//# sourceMappingURL=index.js.map
