"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.date.now");

require("regenerator-runtime/runtime");

var _selector = require("../../lib/selector");

var _di = require("../../lib/di");

var _Pollable2 = _interopRequireDefault(require("../../lib/Pollable"));

var _moduleStatuses = _interopRequireDefault(require("../../enums/moduleStatuses"));

var _callErrors = _interopRequireDefault(require("../Call/callErrors"));

var _ensureExist = _interopRequireDefault(require("../../lib/ensureExist"));

var _actionTypes = _interopRequireDefault(require("./actionTypes"));

var _getActiveCallControlReducer = _interopRequireDefault(require("./getActiveCallControlReducer"));

var _getDataReducer = _interopRequireDefault(require("./getDataReducer"));

var _helpers = require("./helpers");

var _callControlError = _interopRequireDefault(require("./callControlError"));

var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and set to use loose mode. ' + 'To use proposal-class-properties in spec mode with decorators, wait for ' + 'the next major version of decorators in stage 2.'); }

var DEFAULT_TTL = 30 * 60 * 1000;
var DEFAULT_TIME_TO_RETRY = 62 * 1000;
var DEFAULT_BUSY_TIMEOUT = 3 * 1000;
var telephonySessionsEndPoint = /\/telephony\/sessions$/;
var storageKey = 'activeCallControl';
var subscribeEvent = '/account/~/extension/~/telephony/sessions';
var ActiveCallControl = (_dec = (0, _di.Module)({
  deps: ['Client', 'Auth', 'Subscription', 'ConnectivityMonitor', 'RolesAndPermissions', 'CallMonitor', 'Alert', 'NumberValidate', 'AccountInfo', {
    dep: 'TabManager',
    optional: true
  }, {
    dep: 'Storage',
    optional: true
  }, {
    dep: 'ActiveCallControlOptions',
    optional: true
  }, {
    dep: 'AvailabilityMonitor',
    optional: true
  }]
}), _dec(_class = (_class2 = (_temp =
/*#__PURE__*/
function (_Pollable) {
  _inherits(ActiveCallControl, _Pollable);

  function ActiveCallControl(_ref) {
    var _context;

    var _this;

    var client = _ref.client,
        auth = _ref.auth,
        _ref$ttl = _ref.ttl,
        ttl = _ref$ttl === void 0 ? DEFAULT_TTL : _ref$ttl,
        _ref$timeToRetry = _ref.timeToRetry,
        timeToRetry = _ref$timeToRetry === void 0 ? DEFAULT_TIME_TO_RETRY : _ref$timeToRetry,
        storage = _ref.storage,
        subscription = _ref.subscription,
        connectivityMonitor = _ref.connectivityMonitor,
        rolesAndPermissions = _ref.rolesAndPermissions,
        availabilityMonitor = _ref.availabilityMonitor,
        tabManager = _ref.tabManager,
        callMonitor = _ref.callMonitor,
        _ref$polling = _ref.polling,
        polling = _ref$polling === void 0 ? false : _ref$polling,
        _ref$disableCache = _ref.disableCache,
        disableCache = _ref$disableCache === void 0 ? false : _ref$disableCache,
        alert = _ref.alert,
        numberValidate = _ref.numberValidate,
        accountInfo = _ref.accountInfo,
        options = _objectWithoutProperties(_ref, ["client", "auth", "ttl", "timeToRetry", "storage", "subscription", "connectivityMonitor", "rolesAndPermissions", "availabilityMonitor", "tabManager", "callMonitor", "polling", "disableCache", "alert", "numberValidate", "accountInfo"]);

    _classCallCheck(this, ActiveCallControl);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ActiveCallControl).call(this, _objectSpread({}, options, {
      actionTypes: _actionTypes["default"]
    })));

    _initializerDefineProperty(_this, "callPartyIdMap", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "recordingId", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "activeSession", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "activeSessions", _descriptor4, _assertThisInitialized(_this));

    _this._client = client;

    if (!disableCache) {
      _this._storage = storage;
    }

    _this._subscription = (_context = _assertThisInitialized(_this), _ensureExist["default"]).call(_context, subscription, 'subscription');
    _this._connectivityMonitor = (_context = _assertThisInitialized(_this), _ensureExist["default"]).call(_context, connectivityMonitor, 'connectivityMonitor');
    _this._rolesAndPermissions = (_context = _assertThisInitialized(_this), _ensureExist["default"]).call(_context, rolesAndPermissions, 'rolesAndPermissions');
    _this._availabilityMonitor = availabilityMonitor;
    _this._callMonitor = (_context = _assertThisInitialized(_this), _ensureExist["default"]).call(_context, callMonitor, 'callMonitor');
    _this._tabManager = tabManager;
    _this._ttl = ttl;
    _this._timeToRetry = timeToRetry;
    _this._auth = (_context = _assertThisInitialized(_this), _ensureExist["default"]).call(_context, auth, 'auth');
    _this._promise = null;
    _this._lastSubscriptionMessage = null;
    _this._storageKey = storageKey;
    _this._polling = polling;
    _this._alert = alert;
    _this._numberValidate = numberValidate;
    _this._accountInfo = accountInfo;

    if (_this._storage) {
      _this._reducer = (0, _getActiveCallControlReducer["default"])(_this.actionTypes);

      _this._storage.registerReducer({
        key: _this._storageKey,
        reducer: (0, _getDataReducer["default"])(_this.actionTypes)
      });
    } else {
      _this._reducer = (0, _getActiveCallControlReducer["default"])(_this.actionTypes, {
        data: (0, _getDataReducer["default"])(_this.actionTypes)
      });
    }

    return _this;
  }

  _createClass(ActiveCallControl, [{
    key: "initialize",
    value: function initialize() {
      var _this2 = this;

      this.store.subscribe(function () {
        return _this2._onStateChange();
      });
    }
  }, {
    key: "_onStateChange",
    value: function () {
      var _onStateChange2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!this._shouldInit()) {
                  _context2.next = 8;
                  break;
                }

                this.store.dispatch({
                  type: this.actionTypes.init
                });
                this._connectivity = this._connectivityMonitor.connectivity;
                _context2.next = 5;
                return this._init();

              case 5:
                this.store.dispatch({
                  type: this.actionTypes.initSuccess
                });
                _context2.next = 9;
                break;

              case 8:
                if (this._shouldReset()) {
                  this._resetModuleStatus();
                } else if (this.ready) {
                  this._subscriptionHandler();

                  this._checkConnectivity();
                }

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee, this);
      }));

      function _onStateChange() {
        return _onStateChange2.apply(this, arguments);
      }

      return _onStateChange;
    }()
  }, {
    key: "_shouldInit",
    value: function _shouldInit() {
      return this._auth.loggedIn && (!this._storage || this._storage.ready) && this._subscription.ready && this._connectivityMonitor.ready && this._callMonitor.ready && (!this._tabManager || this._tabManager.ready) && this._rolesAndPermissions.ready && (!this._availabilityMonitor || this._availabilityMonitor.ready) && this.pending;
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return (!this._auth.loggedIn || !!this._storage && !this._storage.ready || !this._subscription.ready || !!this._tabManager && !this._tabManager.ready || !this._connectivityMonitor.ready || !this._callMonitor.ready || !this._rolesAndPermissions.ready || !!this._availabilityMonitor && !this._availabilityMonitor.ready) && this.ready;
    }
  }, {
    key: "_resetModuleStatus",
    value: function _resetModuleStatus() {
      this.store.dispatch({
        type: this.actionTypes.resetSuccess
      });
    }
  }, {
    key: "_shouldFetch",
    value: function _shouldFetch() {
      return !this._tabManager || this._tabManager.active;
    }
  }, {
    key: "fetchData",
    value: function () {
      var _fetchData2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!this._promise) {
                  this._promise = this._fetchData();
                }

                _context3.next = 3;
                return this._promise;

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee2, this);
      }));

      function fetchData() {
        return _fetchData2.apply(this, arguments);
      }

      return fetchData;
    }()
  }, {
    key: "_fetchData",
    value: function () {
      var _fetchData3 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return this._syncData();

              case 3:
                if (this._polling) {
                  this._startPolling();
                }

                this._promise = null;
                _context4.next = 12;
                break;

              case 7:
                _context4.prev = 7;
                _context4.t0 = _context4["catch"](0);
                this._promise = null;

                if (this._polling) {
                  this._startPolling(this.timeToRetry);
                } else {
                  this._retry();
                }

                throw _context4.t0;

              case 12:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee3, this, [[0, 7]]);
      }));

      function _fetchData() {
        return _fetchData3.apply(this, arguments);
      }

      return _fetchData;
    }()
  }, {
    key: "_startPolling",
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
    key: "_syncData",
    value: function () {
      var _syncData2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4() {
        var activeSessionsMap, sessionId, result;
        return regeneratorRuntime.wrap(function _callee4$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                activeSessionsMap = {};
                _context5.t0 = regeneratorRuntime.keys(this.activeSessions);

              case 3:
                if ((_context5.t1 = _context5.t0()).done) {
                  _context5.next = 12;
                  break;
                }

                sessionId = _context5.t1.value;

                if (!sessionId) {
                  _context5.next = 10;
                  break;
                }

                _context5.next = 8;
                return this.getPartyData(sessionId);

              case 8:
                result = _context5.sent;
                activeSessionsMap[sessionId] = result;

              case 10:
                _context5.next = 3;
                break;

              case 12:
                this.store.dispatch({
                  type: this.actionTypes.updateActiveSessions,
                  activeSessionsMap: activeSessionsMap,
                  timestamp: Date.now()
                });
                _context5.next = 18;
                break;

              case 15:
                _context5.prev = 15;
                _context5.t2 = _context5["catch"](0);
                throw _context5.t2;

              case 18:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee4, this, [[0, 15]]);
      }));

      function _syncData() {
        return _syncData2.apply(this, arguments);
      }

      return _syncData;
    }()
  }, {
    key: "_init",
    value: function () {
      var _init2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (this._hasPermission) {
                  _context6.next = 2;
                  break;
                }

                return _context6.abrupt("return");

              case 2:
                this._subscription.subscribe(subscribeEvent);

                if (!this._shouldFetch()) {
                  _context6.next = 14;
                  break;
                }

                _context6.prev = 4;
                _context6.next = 7;
                return this.fetchData();

              case 7:
                _context6.next = 12;
                break;

              case 9:
                _context6.prev = 9;
                _context6.t0 = _context6["catch"](4);

                this._retry();

              case 12:
                _context6.next = 15;
                break;

              case 14:
                if (this._polling) {
                  this._startPolling();
                } else {
                  this._retry();
                }

              case 15:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee5, this, [[4, 9]]);
      }));

      function _init() {
        return _init2.apply(this, arguments);
      }

      return _init;
    }()
  }, {
    key: "_subscriptionHandler",
    value: function _subscriptionHandler() {
      if (!this.ready || this._storage && this._tabManager && !this._tabManager.active) {
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
    key: "removeActiveSession",
    value: function removeActiveSession(sessionId) {
      this.store.dispatch({
        type: this.actionTypes.removeActiveSession,
        sessionId: sessionId
      });
    } // count it as load (should only call on container init step)

  }, {
    key: "setActiveSessionId",
    value: function setActiveSessionId(sessionId) {
      this.store.dispatch({
        type: this.actionTypes.setActiveSessionId,
        sessionId: sessionId
      });
    }
  }, {
    key: "_checkConnectivity",
    value: function _checkConnectivity() {
      if (this._connectivityMonitor && this._connectivityMonitor.ready && this._connectivity !== this._connectivityMonitor.connectivity) {
        this._connectivity = this._connectivityMonitor.connectivity;

        if (this._connectivity) {
          this.fetchData();
        }
      }
    }
  }, {
    key: "patch",
    value: function () {
      var _patch = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(_ref2) {
        var _ref2$url, url, _ref2$query, query, _ref2$body, body;

        return regeneratorRuntime.wrap(function _callee6$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _ref2$url = _ref2.url, url = _ref2$url === void 0 ? null : _ref2$url, _ref2$query = _ref2.query, query = _ref2$query === void 0 ? null : _ref2$query, _ref2$body = _ref2.body, body = _ref2$body === void 0 ? null : _ref2$body;
                _context7.prev = 1;
                _context7.next = 4;
                return this._client.service._platform.send({
                  method: 'PATCH',
                  url: url,
                  query: query,
                  body: body
                });

              case 4:
                _context7.next = 9;
                break;

              case 6:
                _context7.prev = 6;
                _context7.t0 = _context7["catch"](1);
                throw _context7.t0;

              case 9:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee6, this, [[1, 6]]);
      }));

      function patch(_x) {
        return _patch.apply(this, arguments);
      }

      return patch;
    }()
  }, {
    key: "getActiveSession",
    value: function getActiveSession(sessionId) {
      var partyId = this.callPartyIdMap[sessionId];
      var activeSession = this.activeSessions[sessionId];
      return activeSession && activeSession[partyId];
    }
  }, {
    key: "mute",
    value: function () {
      var _mute = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7(sessionId) {
        var activeSession, url;
        return regeneratorRuntime.wrap(function _callee7$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.mute,
                  timestamp: Date.now()
                });
                _context8.prev = 1;
                activeSession = this.getActiveSession(sessionId);
                url = (0, _helpers.requestURI)(activeSession).mute;
                _context8.next = 6;
                return this.patch({
                  url: url,
                  body: {
                    muted: true
                  }
                });

              case 6:
                this.store.dispatch({
                  type: this.actionTypes.muteSuccess
                });
                _context8.next = 13;
                break;

              case 9:
                _context8.prev = 9;
                _context8.t0 = _context8["catch"](1);

                if ((0, _helpers.confictError)(_context8.t0)) {
                  this._alert.warning({
                    message: _callControlError["default"].muteConflictError
                  });
                } else if (!this._availabilityMonitor || !this._availabilityMonitor.checkIfHAError(_context8.t0)) {
                  this._alert.warning({
                    message: _callControlError["default"].generalError
                  });
                }

                this.store.dispatch({
                  type: this.actionTypes.muteError
                });

              case 13:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee7, this, [[1, 9]]);
      }));

      function mute(_x2) {
        return _mute.apply(this, arguments);
      }

      return mute;
    }()
  }, {
    key: "unmute",
    value: function () {
      var _unmute = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee8(sessionId) {
        var activeSession, url;
        return regeneratorRuntime.wrap(function _callee8$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.unmute,
                  timestamp: Date.now()
                });
                _context9.prev = 1;
                activeSession = this.getActiveSession(sessionId);
                url = (0, _helpers.requestURI)(activeSession).mute;
                _context9.next = 6;
                return this.patch({
                  url: url,
                  body: {
                    muted: false
                  }
                });

              case 6:
                this.store.dispatch({
                  type: this.actionTypes.unmuteSuccess
                });
                _context9.next = 13;
                break;

              case 9:
                _context9.prev = 9;
                _context9.t0 = _context9["catch"](1);

                if ((0, _helpers.confictError)(_context9.t0)) {
                  this._alert.warning({
                    message: _callControlError["default"].unMuteConflictError
                  });
                } else if (!this._availabilityMonitor || !this._availabilityMonitor.checkIfHAError(_context9.t0)) {
                  this._alert.warning({
                    message: _callControlError["default"].generalError
                  });
                }

                this.store.dispatch({
                  type: this.actionTypes.unmuteError
                });

              case 13:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee8, this, [[1, 9]]);
      }));

      function unmute(_x3) {
        return _unmute.apply(this, arguments);
      }

      return unmute;
    }()
  }, {
    key: "startRecord",
    value: function () {
      var _startRecord = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee9(sessionId) {
        var activeSession, url, _response, response;

        return regeneratorRuntime.wrap(function _callee9$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.prev = 0;
                activeSession = this.getActiveSession(sessionId);
                url = (0, _helpers.requestURI)(activeSession).record;
                _context10.next = 5;
                return this._client.service._platform.post(url);

              case 5:
                _response = _context10.sent;
                response = JSON.parse(_response._text);
                this.store.dispatch({
                  type: this.actionTypes.startRecord,
                  activeSession: activeSession,
                  response: response
                });
                _context10.next = 13;
                break;

              case 10:
                _context10.prev = 10;
                _context10.t0 = _context10["catch"](0);
                this.store.dispatch({
                  type: this.actionTypes.recordFail,
                  sessionId: sessionId
                });

              case 13:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee9, this, [[0, 10]]);
      }));

      function startRecord(_x4) {
        return _startRecord.apply(this, arguments);
      }

      return startRecord;
    }()
  }, {
    key: "getRecordingId",
    value: function getRecordingId(sessionId) {
      var partyId = this.callPartyIdMap[sessionId];
      var recodingId = this.recordingIds[sessionId];
      return recodingId[partyId].id;
    }
  }, {
    key: "stopRecord",
    value: function () {
      var _stopRecord = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee10(sessionId) {
        var activeSession, recordingId, url;
        return regeneratorRuntime.wrap(function _callee10$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.prev = 0;
                activeSession = this.getActiveSession(sessionId);
                recordingId = this.getRecordingId(sessionId);
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
                  activeSession: activeSession
                });
                _context11.next = 12;
                break;

              case 9:
                _context11.prev = 9;
                _context11.t0 = _context11["catch"](0);
                throw _context11.t0;

              case 12:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee10, this, [[0, 9]]);
      }));

      function stopRecord(_x5) {
        return _stopRecord.apply(this, arguments);
      }

      return stopRecord;
    }()
  }, {
    key: "hangUp",
    value: function () {
      var _hangUp = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee11(sessionId) {
        var activeSession, url;
        return regeneratorRuntime.wrap(function _callee11$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.hangUp,
                  timestamp: Date.now()
                });
                _context12.prev = 1;
                activeSession = this.getActiveSession(sessionId);
                url = (0, _helpers.requestURI)(activeSession).hangUp;
                _context12.next = 6;
                return this._client.service._platform["delete"](url);

              case 6:
                if (typeof this._onCallEndFunc === 'function') {
                  this._onCallEndFunc();
                }

                this.store.dispatch({
                  type: this.actionTypes.hangUpSuccess,
                  sessionId: sessionId
                });
                _context12.next = 14;
                break;

              case 10:
                _context12.prev = 10;
                _context12.t0 = _context12["catch"](1);

                if (!this._availabilityMonitor || !this._availabilityMonitor.checkIfHAError(_context12.t0)) {
                  this._alert.warning({
                    message: _callControlError["default"].generalError
                  });
                }

                this.store.dispatch({
                  type: this.actionTypes.hangUpError
                });

              case 14:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee11, this, [[1, 10]]);
      }));

      function hangUp(_x6) {
        return _hangUp.apply(this, arguments);
      }

      return hangUp;
    }()
  }, {
    key: "reject",
    value: function () {
      var _reject = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee12(sessionId) {
        var activeSession, url;
        return regeneratorRuntime.wrap(function _callee12$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.reject,
                  timestamp: Date.now()
                });
                _context13.prev = 1;
                activeSession = this.getActiveSession(sessionId);
                url = (0, _helpers.requestURI)(activeSession).reject;
                _context13.next = 6;
                return this._client.service._platform.post(url);

              case 6:
                this.store.dispatch({
                  type: this.actionTypes.rejectSuccess,
                  sessionId: sessionId
                });
                _context13.next = 13;
                break;

              case 9:
                _context13.prev = 9;
                _context13.t0 = _context13["catch"](1);

                if (!this._availabilityMonitor || !this._availabilityMonitor.checkIfHAError(_context13.t0)) {
                  this._alert.warning({
                    message: _callControlError["default"].generalError
                  });
                }

                this.store.dispatch({
                  type: this.actionTypes.rejectError
                });

              case 13:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee12, this, [[1, 9]]);
      }));

      function reject(_x7) {
        return _reject.apply(this, arguments);
      }

      return reject;
    }()
  }, {
    key: "hold",
    value: function () {
      var _hold = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee13(sessionId) {
        var activeSession, url;
        return regeneratorRuntime.wrap(function _callee13$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.hold,
                  timestamp: Date.now()
                });
                _context14.prev = 1;
                activeSession = this.getActiveSession(sessionId);
                url = (0, _helpers.requestURI)(activeSession).hold;
                _context14.next = 6;
                return this._client.service._platform.post(url);

              case 6:
                this.store.dispatch({
                  type: this.actionTypes.holdSuccess,
                  activeSession: activeSession
                });
                _context14.next = 13;
                break;

              case 9:
                _context14.prev = 9;
                _context14.t0 = _context14["catch"](1);

                if ((0, _helpers.confictError)(_context14.t0)) {
                  this._alert.warning({
                    message: _callControlError["default"].holdConflictError
                  });
                } else if (!this._availabilityMonitor || !this._availabilityMonitor.checkIfHAError(_context14.t0)) {
                  this._alert.warning({
                    message: _callControlError["default"].generalError
                  });
                }

                this.store.dispatch({
                  type: this.actionTypes.holdError
                });

              case 13:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee13, this, [[1, 9]]);
      }));

      function hold(_x8) {
        return _hold.apply(this, arguments);
      }

      return hold;
    }()
  }, {
    key: "unhold",
    value: function () {
      var _unhold = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee14(sessionId) {
        var activeSession, url;
        return regeneratorRuntime.wrap(function _callee14$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.unhold,
                  timestamp: Date.now()
                });
                _context15.prev = 1;
                activeSession = this.getActiveSession(sessionId);
                url = (0, _helpers.requestURI)(activeSession).unhold;
                _context15.next = 6;
                return this._client.service._platform.post(url);

              case 6:
                this.store.dispatch({
                  type: this.actionTypes.unholdSuccess,
                  activeSession: activeSession
                });
                _context15.next = 13;
                break;

              case 9:
                _context15.prev = 9;
                _context15.t0 = _context15["catch"](1);

                if ((0, _helpers.confictError)(_context15.t0)) {
                  this._alert.warning({
                    message: _callControlError["default"].unHoldConflictError
                  });
                } else if (!this._availabilityMonitor || !this._availabilityMonitor.checkIfHAError(_context15.t0)) {
                  this._alert.warning({
                    message: _callControlError["default"].generalError
                  });
                }

                this.store.dispatch({
                  type: this.actionTypes.holdError
                });

              case 13:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee14, this, [[1, 9]]);
      }));

      function unhold(_x9) {
        return _unhold.apply(this, arguments);
      }

      return unhold;
    }()
  }, {
    key: "transfer",
    value: function () {
      var _transfer = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee15(transferNumber, sessionId) {
        var _this4 = this;

        var activeSession, url, validatedResult, validPhoneNumber, phoneNumber;
        return regeneratorRuntime.wrap(function _callee15$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.transfer,
                  timestamp: Date.now()
                });
                _context16.prev = 1;
                activeSession = this.getActiveSession(sessionId);
                url = (0, _helpers.requestURI)(activeSession).transfer;
                _context16.next = 6;
                return this._numberValidate.validateNumbers([transferNumber]);

              case 6:
                validatedResult = _context16.sent;

                if (validatedResult.result) {
                  _context16.next = 11;
                  break;
                }

                validatedResult.errors.forEach(function (error) {
                  if (!_this4._availabilityMonitor || !_this4._availabilityMonitor.checkIfHAError(error)) {
                    _this4._alert.warning({
                      message: _callErrors["default"][error.type],
                      payload: {
                        phoneNumber: error.phoneNumber
                      }
                    });
                  }
                });
                this.store.dispatch({
                  type: this.actionTypes.transferError
                });
                return _context16.abrupt("return");

              case 11:
                validPhoneNumber = validatedResult.numbers[0] && validatedResult.numbers[0].e164;
                phoneNumber = validPhoneNumber;

                if (validPhoneNumber.indexOf('+') === -1) {
                  phoneNumber = [this._accountInfo.mainCompanyNumber, validPhoneNumber].join('*');
                }

                _context16.next = 16;
                return this._client.service._platform.post(url, {
                  phoneNumber: phoneNumber
                });

              case 16:
                this.store.dispatch({
                  type: this.actionTypes.transferSuccess
                });
                _context16.next = 23;
                break;

              case 19:
                _context16.prev = 19;
                _context16.t0 = _context16["catch"](1);

                if (!this._availabilityMonitor || !this._availabilityMonitor.checkIfHAError(_context16.t0)) {
                  this._alert.warning({
                    message: _callControlError["default"].generalError
                  });
                }

                this.store.dispatch({
                  type: this.actionTypes.transferError
                });

              case 23:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee15, this, [[1, 19]]);
      }));

      function transfer(_x10, _x11) {
        return _transfer.apply(this, arguments);
      }

      return transfer;
    }() // Incomplete Implementation?

  }, {
    key: "flip",
    value: function () {
      var _flip = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee16(flipValue, sessionId) {
        var activeSession, url;
        return regeneratorRuntime.wrap(function _callee16$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.flip,
                  timestamp: Date.now()
                });
                _context17.prev = 1;
                activeSession = this.getActiveSession(sessionId);
                url = (0, _helpers.requestURI)(activeSession).flip;
                _context17.next = 6;
                return this._client.service._platform.post(url, {
                  callFlipId: flipValue
                });

              case 6:
                this.store.dispatch({
                  type: this.actionTypes.flipSuccess
                });
                _context17.next = 13;
                break;

              case 9:
                _context17.prev = 9;
                _context17.t0 = _context17["catch"](1);
                this.store.dispatch({
                  type: this.actionTypes.flipError
                });
                throw _context17.t0;

              case 13:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee16, this, [[1, 9]]);
      }));

      function flip(_x12, _x13) {
        return _flip.apply(this, arguments);
      }

      return flip;
    }()
  }, {
    key: "forward",
    value: function () {
      var _forward = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee17() {
        return regeneratorRuntime.wrap(function _callee17$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee17);
      }));

      function forward() {
        return _forward.apply(this, arguments);
      }

      return forward;
    }()
  }, {
    key: "getCallSessionStatus",
    value: function () {
      var _getCallSessionStatus = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee18() {
        return regeneratorRuntime.wrap(function _callee18$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
              case "end":
                return _context19.stop();
            }
          }
        }, _callee18);
      }));

      function getCallSessionStatus() {
        return _getCallSessionStatus.apply(this, arguments);
      }

      return getCallSessionStatus;
    }()
  }, {
    key: "getPartyData",
    value: function () {
      var _getPartyData = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee19(sessionId) {
        var activeSession, url, telephonySessionId, partyId, _response, response, errRgx;

        return regeneratorRuntime.wrap(function _callee19$(_context20) {
          while (1) {
            switch (_context20.prev = _context20.next) {
              case 0:
                activeSession = this.getActiveSession(sessionId);
                url = (0, _helpers.requestURI)(activeSession).getPartyData;
                telephonySessionId = activeSession.telephonySessionId, partyId = activeSession.partyId;

                if (!(!telephonySessionId || !partyId)) {
                  _context20.next = 5;
                  break;
                }

                return _context20.abrupt("return");

              case 5:
                _context20.prev = 5;
                _context20.next = 8;
                return this._client.service._platform.get(url);

              case 8:
                _response = _context20.sent;
                response = JSON.parse(_response._text);
                return _context20.abrupt("return", response);

              case 13:
                _context20.prev = 13;
                _context20.t0 = _context20["catch"](5);
                errRgx = /4[0-9][0-9]/g;

                if (errRgx.test(_context20.t0.message)) {
                  this.removeActiveSession(sessionId);
                }

                throw _context20.t0;

              case 18:
              case "end":
                return _context20.stop();
            }
          }
        }, _callee19, this, [[5, 13]]);
      }));

      function getPartyData(_x14) {
        return _getPartyData.apply(this, arguments);
      }

      return getPartyData;
    }()
  }, {
    key: "_hasPermission",
    get: function get() {
      return this._rolesAndPermissions.ringoutEnabled;
    }
  }, {
    key: "data",
    get: function get() {
      return this._storage && this._storage.ready && this._storage.getItem(this._storageKey) || this.state;
    }
  }, {
    key: "activeSessionId",
    get: function get() {
      return this.data.activeSessionId || null;
    }
  }, {
    key: "recordingIds",
    get: function get() {
      return this.data.recordingIds || null;
    }
  }, {
    key: "activeSessionsStatus",
    get: function get() {
      return this.data.activeSessionsStatus || {};
    }
    /**
     * Mitigation strategy for avoiding 404/409 on call control endpoings.
     * This should gradually move towards per session controls rather than
     * a global busy timeout.
     */

  }, {
    key: "busy",
    get: function get() {
      return Date.now() - this.data.busy < DEFAULT_BUSY_TIMEOUT;
    }
  }, {
    key: "timestamp",
    get: function get() {
      return this.data.timestamp;
    }
  }, {
    key: "timeToRetry",
    get: function get() {
      return this._timeToRetry;
    }
  }, {
    key: "ttl",
    get: function get() {
      return this._ttl;
    }
  }, {
    key: "status",
    get: function get() {
      return this.state.status;
    }
  }, {
    key: "ready",
    get: function get() {
      return this.status === _moduleStatuses["default"].ready;
    }
  }]);

  return ActiveCallControl;
}(_Pollable2["default"]), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "callPartyIdMap", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this5 = this;

    return [function () {
      return _this5._callMonitor.calls;
    }, function (calls) {
      return calls.reduce(function (accumulator, call) {
        var sessionId = call.sessionId,
            partyId = call.partyId;
        accumulator[sessionId] = partyId;
        return accumulator;
      }, {});
    }];
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "recordingId", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this6 = this;

    return [function () {
      return _this6.activeSessionId;
    }, function () {
      return _this6.recordingIds;
    }, function (activeSessionId, recordingIds) {
      return recordingIds[activeSessionId];
    }];
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "activeSession", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this7 = this;

    return [function () {
      return _this7.activeSessionId;
    }, function () {
      return _this7.activeSessions;
    }, function (sessionId) {
      return _this7.getActiveSession(sessionId);
    }];
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "activeSessions", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this8 = this;

    return [function () {
      return _this8._callMonitor.calls;
    }, function () {
      return _this8.activeSessionsStatus;
    }, function (calls, activeSessionsStatus) {
      var reducer = function reducer(accumulator, call) {
        var sessionId = call.sessionId,
            partyId = call.partyId;
        var activeSessionStatuses = activeSessionsStatus[sessionId];
        var activeSessionStatus = activeSessionStatuses && activeSessionStatuses[partyId] || {};

        if (!accumulator[sessionId]) {
          accumulator[sessionId] = {};
        }

        accumulator[sessionId][partyId] = (0, _helpers.normalizeSession)({
          call: call,
          activeSessionStatus: activeSessionStatus
        });
        return accumulator;
      };

      return calls.reduce(reducer, {});
    }];
  }
})), _class2)) || _class);
exports["default"] = ActiveCallControl;
//# sourceMappingURL=index.js.map
