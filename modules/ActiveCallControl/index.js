"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.keys");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.promise");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.array.for-each");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.date.now");

var _ringcentralCallControl = require("ringcentral-call-control");

var _selector = require("../../lib/selector");

var _di = require("../../lib/di");

var _Pollable2 = _interopRequireDefault(require("../../lib/Pollable"));

var _moduleStatuses = _interopRequireDefault(require("../../enums/moduleStatuses"));

var _subscriptionFilters = _interopRequireDefault(require("../../enums/subscriptionFilters"));

var _callErrors = _interopRequireDefault(require("../Call/callErrors"));

var _ensureExist = _interopRequireDefault(require("../../lib/ensureExist"));

var _actionTypes = _interopRequireDefault(require("./actionTypes"));

var _getActiveCallControlReducer = _interopRequireDefault(require("./getActiveCallControlReducer"));

var _getDataReducer = _interopRequireDefault(require("./getDataReducer"));

var _helpers = require("./helpers");

var _callControlError = _interopRequireDefault(require("./callControlError"));

var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var DEFAULT_TTL = 30 * 60 * 1000;
var DEFAULT_TIME_TO_RETRY = 62 * 1000;
var DEFAULT_BUSY_TIMEOUT = 3 * 1000;
var telephonySessionsEndPoint = /\/telephony\/sessions$/;
var storageKey = 'activeCallControl';
var subscribeEvent = _subscriptionFilters["default"].telephonySessions;
var ActiveCallControl = (_dec = (0, _di.Module)({
  deps: ['Client', 'Auth', 'Subscription', 'ConnectivityMonitor', 'RolesAndPermissions', 'Presence', 'Alert', 'NumberValidate', 'AccountInfo', 'ExtensionInfo', {
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
}), _dec(_class = (_class2 = /*#__PURE__*/function (_Pollable) {
  _inherits(ActiveCallControl, _Pollable);

  var _super = _createSuper(ActiveCallControl);

  function ActiveCallControl(_ref) {
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
        presence = _ref.presence,
        _ref$polling = _ref.polling,
        polling = _ref$polling === void 0 ? false : _ref$polling,
        _ref$disableCache = _ref.disableCache,
        disableCache = _ref$disableCache === void 0 ? false : _ref$disableCache,
        alert = _ref.alert,
        numberValidate = _ref.numberValidate,
        accountInfo = _ref.accountInfo,
        extensionInfo = _ref.extensionInfo,
        options = _objectWithoutProperties(_ref, ["client", "auth", "ttl", "timeToRetry", "storage", "subscription", "connectivityMonitor", "rolesAndPermissions", "availabilityMonitor", "tabManager", "presence", "polling", "disableCache", "alert", "numberValidate", "accountInfo", "extensionInfo"]);

    _classCallCheck(this, ActiveCallControl);

    _this = _super.call(this, _objectSpread(_objectSpread({}, options), {}, {
      actionTypes: _actionTypes["default"]
    }));

    _this._updateSessionsHandler = function () {
      _this.store.dispatch({
        type: _this.actionTypes.updateActiveSessions,
        timestamp: Date.now(),
        sessionDatas: _this._rcCallControl.sessions.map(function (s) {
          return s.data;
        })
      });
    };

    _initializerDefineProperty(_this, "activeSession", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "activeSessions", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "sessionIdToTelephonySessionIdMapping", _descriptor3, _assertThisInitialized(_this));

    _this._client = client;

    if (!disableCache) {
      _this._storage = storage;
    }

    _this._subscription = _ensureExist["default"].call(_assertThisInitialized(_this), subscription, 'subscription');
    _this._connectivityMonitor = _ensureExist["default"].call(_assertThisInitialized(_this), connectivityMonitor, 'connectivityMonitor');
    _this._rolesAndPermissions = _ensureExist["default"].call(_assertThisInitialized(_this), rolesAndPermissions, 'rolesAndPermissions');
    _this._availabilityMonitor = availabilityMonitor;
    _this._presence = _ensureExist["default"].call(_assertThisInitialized(_this), presence, 'presence');
    _this._tabManager = tabManager;
    _this._ttl = ttl;
    _this._timeToRetry = timeToRetry;
    _this._auth = _ensureExist["default"].call(_assertThisInitialized(_this), auth, 'auth');
    _this._promise = null;
    _this._lastSubscriptionMessage = null;
    _this._storageKey = storageKey;
    _this._polling = polling;
    _this._alert = alert;
    _this._numberValidate = numberValidate;
    _this._accountInfo = accountInfo;
    _this._extensionInfo = extensionInfo;
    _this._rcCallControl = null;

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

    console.warn('ActiveCallControl is deprecated, please evaluate and transition to use ActiveCallControlV2');
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
      var _onStateChange2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
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
                } else if (this.ready && this._hasPermission) {
                  this._subscriptionHandler();

                  this._checkConnectivity();

                  this._checkTabActive();
                }

              case 9:
              case "end":
                return _context.stop();
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
      return this._auth.loggedIn && this._accountInfo.ready && this._extensionInfo.ready && (!this._storage || this._storage.ready) && this._subscription.ready && this._connectivityMonitor.ready && this._presence.ready && (!this._tabManager || this._tabManager.ready) && this._rolesAndPermissions.ready && (!this._availabilityMonitor || this._availabilityMonitor.ready) && this.pending;
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return (!this._auth.loggedIn || !this._accountInfo.ready || !this._extensionInfo.ready || !!this._storage && !this._storage.ready || !this._subscription.ready || !!this._tabManager && !this._tabManager.ready || !this._connectivityMonitor.ready || !this._presence.ready || !this._rolesAndPermissions.ready || !!this._availabilityMonitor && !this._availabilityMonitor.ready) && this.ready;
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
      var _fetchData2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!this._promise) {
                  this._promise = this._fetchData();
                }

                _context2.next = 3;
                return this._promise;

              case 3:
              case "end":
                return _context2.stop();
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
      var _fetchData3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
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
                _context3.t0 = _context3["catch"](0);
                this._promise = null;

                if (this._polling) {
                  this._startPolling(this.timeToRetry);
                } else {
                  this._retry();
                }

                throw _context3.t0;

              case 12:
              case "end":
                return _context3.stop();
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
      var _syncData2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var _this4 = this;

        var activeCalls;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                activeCalls = this._presence.calls;
                _context4.next = 4;
                return this._rcCallControl.loadSessions(activeCalls);

              case 4:
                this.store.dispatch({
                  type: this.actionTypes.updateActiveSessions,
                  timestamp: Date.now(),
                  sessionDatas: this._rcCallControl.sessions.map(function (s) {
                    return s.data;
                  })
                });

                this._rcCallControl.sessions.forEach(function (session) {
                  _this4._newSessionHandler(session);
                });

                _context4.next = 12;
                break;

              case 8:
                _context4.prev = 8;
                _context4.t0 = _context4["catch"](0);
                console.log('sync data error:', _context4.t0);
                throw _context4.t0;

              case 12:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 8]]);
      }));

      function _syncData() {
        return _syncData2.apply(this, arguments);
      }

      return _syncData;
    }()
  }, {
    key: "_init",
    value: function () {
      var _init2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var _this5 = this;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (this._hasPermission) {
                  _context5.next = 2;
                  break;
                }

                return _context5.abrupt("return");

              case 2:
                this._subscription.subscribe([subscribeEvent]);

                this._rcCallControl = new _ringcentralCallControl.RingCentralCallControl({
                  sdk: this._client.service,
                  preloadDevices: false,
                  preloadSessions: false,
                  extensionInfo: _objectSpread(_objectSpread({}, this._extensionInfo.info), {}, {
                    account: this._accountInfo.info
                  })
                });

                this._rcCallControl.on('new', function (session) {
                  _this5._newSessionHandler(session);
                });

                this._tabActive = this._tabManager.active;

                if (!this._shouldFetch()) {
                  _context5.next = 17;
                  break;
                }

                _context5.prev = 7;
                _context5.next = 10;
                return this.fetchData();

              case 10:
                _context5.next = 15;
                break;

              case 12:
                _context5.prev = 12;
                _context5.t0 = _context5["catch"](7);

                this._retry();

              case 15:
                _context5.next = 18;
                break;

              case 17:
                if (this._polling) {
                  this._startPolling();
                } else {
                  this._retry();
                }

              case 18:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[7, 12]]);
      }));

      function _init() {
        return _init2.apply(this, arguments);
      }

      return _init;
    }()
  }, {
    key: "_newSessionHandler",
    value: function _newSessionHandler(session) {
      this._updateSessionsHandler();

      session.removeListener('status', this._updateSessionsHandler);
      session.removeListener('muted', this._updateSessionsHandler);
      session.removeListener('recordings', this._updateSessionsHandler);
      session.on('status', this._updateSessionsHandler);
      session.on('muted', this._updateSessionsHandler);
      session.on('recordings', this._updateSessionsHandler);
    }
  }, {
    key: "_subscriptionHandler",
    value: function _subscriptionHandler() {
      if (!this.ready || this._storage && this._tabManager && !this._tabManager.active) {
        return;
      }

      var message = this._subscription.message;

      if (message && message !== this._lastSubscriptionMessage && telephonySessionsEndPoint.test(message.event) && message.body) {
        this._lastSubscriptionMessage = message;

        if (this._rcCallControl) {
          this._rcCallControl.onNotificationEvent(message);
        }
      }
    }
  }, {
    key: "removeActiveSession",
    value: function removeActiveSession() {
      this.store.dispatch({
        type: this.actionTypes.removeActiveSession
      });
    } // count it as load (should only call on container init step)

  }, {
    key: "setActiveSessionId",
    value: function setActiveSessionId(telephonySessionId) {
      this.store.dispatch({
        type: this.actionTypes.setActiveSessionId,
        telephonySessionId: telephonySessionId
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
    key: "_checkTabActive",
    value: function _checkTabActive() {
      var _this6 = this;

      if (!this._tabManager || !this._storage) {
        return;
      }

      if (this._tabActive !== this._tabManager.active) {
        this._tabActive = this._tabManager.active;

        if (this._tabManager.active && this._rcCallControl) {
          this._rcCallControl.restoreSessions(this.data.sessions);

          this._rcCallControl.sessions.forEach(function (session) {
            _this6._newSessionHandler(session);
          });
        }
      }
    }
  }, {
    key: "getActiveSession",
    value: function getActiveSession(telephonySessionId) {
      return this.activeSessions[telephonySessionId];
    }
  }, {
    key: "mute",
    value: function () {
      var _mute = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(telephonySessionId) {
        var session;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.mute,
                  timestamp: Date.now()
                });
                _context6.prev = 1;
                session = this._rcCallControl.sessions.find(function (s) {
                  return s.id === telephonySessionId;
                });
                _context6.next = 5;
                return session.mute();

              case 5:
                this.store.dispatch({
                  type: this.actionTypes.muteSuccess
                });
                _context6.next = 26;
                break;

              case 8:
                _context6.prev = 8;
                _context6.t0 = _context6["catch"](1);

                if (!(_context6.t0.response && !_context6.t0.response._text)) {
                  _context6.next = 14;
                  break;
                }

                _context6.next = 13;
                return _context6.t0.response.clone().text();

              case 13:
                _context6.t0.response._text = _context6.sent;

              case 14:
                if (!(0, _helpers.conflictError)(_context6.t0)) {
                  _context6.next = 18;
                  break;
                }

                this._alert.warning({
                  message: _callControlError["default"].muteConflictError
                });

                _context6.next = 25;
                break;

              case 18:
                _context6.t1 = !this._availabilityMonitor;

                if (_context6.t1) {
                  _context6.next = 23;
                  break;
                }

                _context6.next = 22;
                return this._availabilityMonitor.checkIfHAError(_context6.t0);

              case 22:
                _context6.t1 = !_context6.sent;

              case 23:
                if (!_context6.t1) {
                  _context6.next = 25;
                  break;
                }

                this._alert.warning({
                  message: _callControlError["default"].generalError
                });

              case 25:
                this.store.dispatch({
                  type: this.actionTypes.muteError
                });

              case 26:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[1, 8]]);
      }));

      function mute(_x) {
        return _mute.apply(this, arguments);
      }

      return mute;
    }()
  }, {
    key: "unmute",
    value: function () {
      var _unmute = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(telephonySessionId) {
        var session;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.unmute,
                  timestamp: Date.now()
                });
                _context7.prev = 1;
                session = this._rcCallControl.sessions.find(function (s) {
                  return s.id === telephonySessionId;
                });
                _context7.next = 5;
                return session.unmute();

              case 5:
                this.store.dispatch({
                  type: this.actionTypes.unmuteSuccess
                });
                _context7.next = 26;
                break;

              case 8:
                _context7.prev = 8;
                _context7.t0 = _context7["catch"](1);

                if (!(_context7.t0.response && !_context7.t0.response._text)) {
                  _context7.next = 14;
                  break;
                }

                _context7.next = 13;
                return _context7.t0.response.clone().text();

              case 13:
                _context7.t0.response._text = _context7.sent;

              case 14:
                if (!(0, _helpers.conflictError)(_context7.t0)) {
                  _context7.next = 18;
                  break;
                }

                this._alert.warning({
                  message: _callControlError["default"].unMuteConflictError
                });

                _context7.next = 25;
                break;

              case 18:
                _context7.t1 = !this._availabilityMonitor;

                if (_context7.t1) {
                  _context7.next = 23;
                  break;
                }

                _context7.next = 22;
                return this._availabilityMonitor.checkIfHAError(_context7.t0);

              case 22:
                _context7.t1 = !_context7.sent;

              case 23:
                if (!_context7.t1) {
                  _context7.next = 25;
                  break;
                }

                this._alert.warning({
                  message: _callControlError["default"].generalError
                });

              case 25:
                this.store.dispatch({
                  type: this.actionTypes.unmuteError
                });

              case 26:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this, [[1, 8]]);
      }));

      function unmute(_x2) {
        return _unmute.apply(this, arguments);
      }

      return unmute;
    }()
  }, {
    key: "startRecord",
    value: function () {
      var _startRecord = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(telephonySessionId) {
        var session, recordingId;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.prev = 0;
                session = this._rcCallControl.sessions.find(function (s) {
                  return s.id === telephonySessionId;
                });
                recordingId = this.getRecordingId(session);

                if (!recordingId) {
                  _context8.next = 8;
                  break;
                }

                _context8.next = 6;
                return session.resumeRecord(recordingId);

              case 6:
                _context8.next = 10;
                break;

              case 8:
                _context8.next = 10;
                return session.createRecord(recordingId);

              case 10:
                _context8.next = 14;
                break;

              case 12:
                _context8.prev = 12;
                _context8.t0 = _context8["catch"](0);

              case 14:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this, [[0, 12]]);
      }));

      function startRecord(_x3) {
        return _startRecord.apply(this, arguments);
      }

      return startRecord;
    }()
  }, {
    key: "getRecordingId",
    value: function getRecordingId(session) {
      var recording = session.recordings[0];
      var recodingId = recording && recording.id;
      return recodingId;
    }
  }, {
    key: "stopRecord",
    value: function () {
      var _stopRecord = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(telephonySessionId) {
        var session, recordingId, activeSession;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.prev = 0;
                session = this._rcCallControl.sessions.find(function (s) {
                  return s.id === telephonySessionId;
                });
                recordingId = this.getRecordingId(session);
                _context9.next = 5;
                return session.pauseRecord(recordingId);

              case 5:
                activeSession = this.getActiveSession(telephonySessionId);
                this.store.dispatch({
                  type: this.actionTypes.stopRecord,
                  activeSession: activeSession
                });
                _context9.next = 13;
                break;

              case 9:
                _context9.prev = 9;
                _context9.t0 = _context9["catch"](0);
                console.log('stop record error:', _context9.t0);
                throw _context9.t0;

              case 13:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this, [[0, 9]]);
      }));

      function stopRecord(_x4) {
        return _stopRecord.apply(this, arguments);
      }

      return stopRecord;
    }()
  }, {
    key: "hangUp",
    value: function () {
      var _hangUp = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(telephonySessionId) {
        var session;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.hangUp,
                  timestamp: Date.now()
                });
                _context10.prev = 1;
                session = this._rcCallControl.sessions.find(function (s) {
                  return s.id === telephonySessionId;
                });
                _context10.next = 5;
                return session.drop();

              case 5:
                if (typeof this._onCallEndFunc === 'function') {
                  this._onCallEndFunc();
                }

                this.store.dispatch({
                  type: this.actionTypes.hangUpSuccess
                });
                _context10.next = 19;
                break;

              case 9:
                _context10.prev = 9;
                _context10.t0 = _context10["catch"](1);
                _context10.t1 = !this._availabilityMonitor;

                if (_context10.t1) {
                  _context10.next = 16;
                  break;
                }

                _context10.next = 15;
                return this._availabilityMonitor.checkIfHAError(_context10.t0);

              case 15:
                _context10.t1 = !_context10.sent;

              case 16:
                if (!_context10.t1) {
                  _context10.next = 18;
                  break;
                }

                this._alert.warning({
                  message: _callControlError["default"].generalError
                });

              case 18:
                this.store.dispatch({
                  type: this.actionTypes.hangUpError
                });

              case 19:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this, [[1, 9]]);
      }));

      function hangUp(_x5) {
        return _hangUp.apply(this, arguments);
      }

      return hangUp;
    }()
  }, {
    key: "reject",
    value: function () {
      var _reject = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(telephonySessionId) {
        var session;
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.reject,
                  timestamp: Date.now()
                });
                _context11.prev = 1;
                session = this._rcCallControl.sessions.find(function (s) {
                  return s.id === telephonySessionId;
                });
                _context11.next = 5;
                return session.toVoicemail();

              case 5:
                this.store.dispatch({
                  type: this.actionTypes.rejectSuccess
                });
                _context11.next = 18;
                break;

              case 8:
                _context11.prev = 8;
                _context11.t0 = _context11["catch"](1);
                _context11.t1 = !this._availabilityMonitor;

                if (_context11.t1) {
                  _context11.next = 15;
                  break;
                }

                _context11.next = 14;
                return this._availabilityMonitor.checkIfHAError(_context11.t0);

              case 14:
                _context11.t1 = !_context11.sent;

              case 15:
                if (!_context11.t1) {
                  _context11.next = 17;
                  break;
                }

                this._alert.warning({
                  message: _callControlError["default"].generalError
                });

              case 17:
                this.store.dispatch({
                  type: this.actionTypes.rejectError
                });

              case 18:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this, [[1, 8]]);
      }));

      function reject(_x6) {
        return _reject.apply(this, arguments);
      }

      return reject;
    }()
  }, {
    key: "hold",
    value: function () {
      var _hold = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(telephonySessionId) {
        var session;
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.hold,
                  timestamp: Date.now()
                });
                _context12.prev = 1;
                session = this._rcCallControl.sessions.find(function (s) {
                  return s.id === telephonySessionId;
                });
                _context12.next = 5;
                return session.hold();

              case 5:
                this.store.dispatch({
                  type: this.actionTypes.holdSuccess
                });
                _context12.next = 26;
                break;

              case 8:
                _context12.prev = 8;
                _context12.t0 = _context12["catch"](1);

                if (!(_context12.t0.response && !_context12.t0.response._text)) {
                  _context12.next = 14;
                  break;
                }

                _context12.next = 13;
                return _context12.t0.response.clone().text();

              case 13:
                _context12.t0.response._text = _context12.sent;

              case 14:
                if (!(0, _helpers.conflictError)(_context12.t0)) {
                  _context12.next = 18;
                  break;
                }

                this._alert.warning({
                  message: _callControlError["default"].holdConflictError
                });

                _context12.next = 25;
                break;

              case 18:
                _context12.t1 = !this._availabilityMonitor;

                if (_context12.t1) {
                  _context12.next = 23;
                  break;
                }

                _context12.next = 22;
                return this._availabilityMonitor.checkIfHAError(_context12.t0);

              case 22:
                _context12.t1 = !_context12.sent;

              case 23:
                if (!_context12.t1) {
                  _context12.next = 25;
                  break;
                }

                this._alert.warning({
                  message: _callControlError["default"].generalError
                });

              case 25:
                this.store.dispatch({
                  type: this.actionTypes.holdError
                });

              case 26:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this, [[1, 8]]);
      }));

      function hold(_x7) {
        return _hold.apply(this, arguments);
      }

      return hold;
    }()
  }, {
    key: "unhold",
    value: function () {
      var _unhold = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(telephonySessionId) {
        var session;
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.unhold,
                  timestamp: Date.now()
                });
                _context13.prev = 1;
                session = this._rcCallControl.sessions.find(function (s) {
                  return s.id === telephonySessionId;
                });
                _context13.next = 5;
                return session.unhold();

              case 5:
                this.store.dispatch({
                  type: this.actionTypes.unholdSuccess
                });
                _context13.next = 26;
                break;

              case 8:
                _context13.prev = 8;
                _context13.t0 = _context13["catch"](1);

                if (!(_context13.t0.response && !_context13.t0.response._text)) {
                  _context13.next = 14;
                  break;
                }

                _context13.next = 13;
                return _context13.t0.response.clone().text();

              case 13:
                _context13.t0.response._text = _context13.sent;

              case 14:
                if (!(0, _helpers.conflictError)(_context13.t0)) {
                  _context13.next = 18;
                  break;
                }

                this._alert.warning({
                  message: _callControlError["default"].unHoldConflictError
                });

                _context13.next = 25;
                break;

              case 18:
                _context13.t1 = !this._availabilityMonitor;

                if (_context13.t1) {
                  _context13.next = 23;
                  break;
                }

                _context13.next = 22;
                return this._availabilityMonitor.checkIfHAError(_context13.t0);

              case 22:
                _context13.t1 = !_context13.sent;

              case 23:
                if (!_context13.t1) {
                  _context13.next = 25;
                  break;
                }

                this._alert.warning({
                  message: _callControlError["default"].generalError
                });

              case 25:
                this.store.dispatch({
                  type: this.actionTypes.holdError
                });

              case 26:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this, [[1, 8]]);
      }));

      function unhold(_x8) {
        return _unhold.apply(this, arguments);
      }

      return unhold;
    }()
  }, {
    key: "transfer",
    value: function () {
      var _transfer = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(transferNumber, telephonySessionId) {
        var _this7 = this;

        var session, validatedResult, validPhoneNumber, phoneNumber;
        return regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.transfer,
                  timestamp: Date.now()
                });
                _context15.prev = 1;
                session = this._rcCallControl.sessions.find(function (s) {
                  return s.id === telephonySessionId;
                });
                _context15.next = 5;
                return this._numberValidate.validateNumbers([transferNumber]);

              case 5:
                validatedResult = _context15.sent;

                if (validatedResult.result) {
                  _context15.next = 11;
                  break;
                }

                _context15.next = 9;
                return Promise.all(validatedResult.errors.map( /*#__PURE__*/function () {
                  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(error) {
                    return regeneratorRuntime.wrap(function _callee14$(_context14) {
                      while (1) {
                        switch (_context14.prev = _context14.next) {
                          case 0:
                            _context14.t0 = !_this7._availabilityMonitor;

                            if (_context14.t0) {
                              _context14.next = 5;
                              break;
                            }

                            _context14.next = 4;
                            return _this7._availabilityMonitor.checkIfHAError(error);

                          case 4:
                            _context14.t0 = !_context14.sent;

                          case 5:
                            if (!_context14.t0) {
                              _context14.next = 7;
                              break;
                            }

                            _this7._alert.warning({
                              message: _callErrors["default"][error.type],
                              payload: {
                                phoneNumber: error.phoneNumber
                              }
                            });

                          case 7:
                          case "end":
                            return _context14.stop();
                        }
                      }
                    }, _callee14);
                  }));

                  return function (_x11) {
                    return _ref2.apply(this, arguments);
                  };
                }()));

              case 9:
                this.store.dispatch({
                  type: this.actionTypes.transferError
                });
                return _context15.abrupt("return");

              case 11:
                validPhoneNumber = validatedResult.numbers[0] && validatedResult.numbers[0].e164;
                phoneNumber = validPhoneNumber;

                if (validPhoneNumber.indexOf('+') === -1) {
                  phoneNumber = [this._accountInfo.mainCompanyNumber, validPhoneNumber].join('*');
                }

                session.transfer({
                  phoneNumber: phoneNumber
                });
                this.store.dispatch({
                  type: this.actionTypes.transferSuccess
                });
                _context15.next = 28;
                break;

              case 18:
                _context15.prev = 18;
                _context15.t0 = _context15["catch"](1);
                _context15.t1 = !this._availabilityMonitor;

                if (_context15.t1) {
                  _context15.next = 25;
                  break;
                }

                _context15.next = 24;
                return this._availabilityMonitor.checkIfHAError(_context15.t0);

              case 24:
                _context15.t1 = !_context15.sent;

              case 25:
                if (!_context15.t1) {
                  _context15.next = 27;
                  break;
                }

                this._alert.warning({
                  message: _callControlError["default"].generalError
                });

              case 27:
                this.store.dispatch({
                  type: this.actionTypes.transferError
                });

              case 28:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this, [[1, 18]]);
      }));

      function transfer(_x9, _x10) {
        return _transfer.apply(this, arguments);
      }

      return transfer;
    }() // Incomplete Implementation?

  }, {
    key: "flip",
    value: function () {
      var _flip = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16(flipValue, telephonySessionId) {
        var session;
        return regeneratorRuntime.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.flip,
                  timestamp: Date.now()
                });
                _context16.prev = 1;
                session = this._rcCallControl.sessions.find(function (s) {
                  return s.id === telephonySessionId;
                });
                _context16.next = 5;
                return session.flip({
                  callFlipId: flipValue
                });

              case 5:
                this.store.dispatch({
                  type: this.actionTypes.flipSuccess
                });
                _context16.next = 12;
                break;

              case 8:
                _context16.prev = 8;
                _context16.t0 = _context16["catch"](1);
                this.store.dispatch({
                  type: this.actionTypes.flipError
                });
                throw _context16.t0;

              case 12:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, this, [[1, 8]]);
      }));

      function flip(_x12, _x13) {
        return _flip.apply(this, arguments);
      }

      return flip;
    }()
  }, {
    key: "forward",
    value: function () {
      var _forward = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17() {
        return regeneratorRuntime.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
              case "end":
                return _context17.stop();
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
}(_Pollable2["default"]), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "activeSession", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this8 = this;

    return [function () {
      return _this8.activeSessionId;
    }, function () {
      return _this8.activeSessions;
    }, function (sessionId) {
      return _this8.getActiveSession(sessionId);
    }];
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "activeSessions", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this9 = this;

    return [function () {
      return _this9._presence.calls;
    }, function () {
      return _this9.data.sessions;
    }, function () {
      return _this9.timestamp;
    }, function (calls, sessions, _t) {
      var reducer = function reducer(accumulator, call) {
        var telephonySessionId = call.telephonySessionId;
        var session = sessions.find(function (s) {
          return s.id === telephonySessionId;
        });

        if (!session) {
          return accumulator;
        }

        accumulator[telephonySessionId] = (0, _helpers.normalizeSession)({
          call: call,
          session: session
        });
        return accumulator;
      };

      return calls.reduce(reducer, {});
    }];
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "sessionIdToTelephonySessionIdMapping", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this10 = this;

    return [function () {
      return _this10._presence.calls;
    }, function (calls) {
      var reducer = function reducer(accumulator, call) {
        var telephonySessionId = call.telephonySessionId,
            sessionId = call.sessionId;
        accumulator[sessionId] = telephonySessionId;
        return accumulator;
      };

      return calls.reduce(reducer, {});
    }];
  }
})), _class2)) || _class);
exports["default"] = ActiveCallControl;
//# sourceMappingURL=index.js.map
