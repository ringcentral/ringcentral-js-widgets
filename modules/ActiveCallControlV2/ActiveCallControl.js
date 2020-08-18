"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActiveCallControl = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.date.now");

require("regenerator-runtime/runtime");

var _core = require("@ringcentral-integration/core");

var _ringcentralCall = require("ringcentral-call");

var _di = require("../../lib/di");

var _subscriptionFilters = _interopRequireDefault(require("../../enums/subscriptionFilters"));

var _callErrors = _interopRequireDefault(require("../Call/callErrors"));

var _helpers = require("./helpers");

var _Analytics = require("../Analytics");

var _callControlError = _interopRequireDefault(require("../ActiveCallControl/callControlError"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

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
var subscribeEvent = _subscriptionFilters["default"].telephonySessions;
var ActiveCallControl = (_dec = (0, _di.Module)({
  name: 'ActiveCallControl',
  deps: ['Client', 'Auth', 'ConnectivityMonitor', 'RolesAndPermissions', 'CallMonitor', 'Alert', 'NumberValidate', 'AccountInfo', 'ExtensionInfo', 'Subscription', {
    dep: 'Webphone',
    optional: true
  }, {
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
}), _dec2 = (0, _core.track)(_Analytics.trackEvents.mute), _dec3 = (0, _core.track)(_Analytics.trackEvents.unmute), _dec4 = (0, _core.track)(_Analytics.trackEvents.hangup), _dec5 = (0, _core.track)(_Analytics.trackEvents.hold), _dec6 = (0, _core.track)(_Analytics.trackEvents.unhold), _dec7 = (0, _core.computed)(function (_ref) {
  var activeSessionId = _ref.activeSessionId,
      activeSessions = _ref.activeSessions;
  return [activeSessionId, activeSessions];
}), _dec8 = (0, _core.computed)(function (that) {
  return [that._deps.callMonitor.calls, that.sessions, that.timestamp];
}), _dec9 = (0, _core.computed)(function (that) {
  return [that._deps.callMonitor.calls];
}), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_RcModuleV) {
  _inherits(ActiveCallControl, _RcModuleV);

  var _super = _createSuper(ActiveCallControl);

  function ActiveCallControl(deps) {
    var _deps$activeCallContr, _deps$activeCallContr2, _activeCallControlOpt, _activeCallControlOpt2, _activeCallControlOpt3, _activeCallControlOpt4;

    var _this;

    _classCallCheck(this, ActiveCallControl);

    _this = _super.call(this, {
      deps: deps,
      enableCache: (_deps$activeCallContr = (_deps$activeCallContr2 = deps.activeCallControlOptions) === null || _deps$activeCallContr2 === void 0 ? void 0 : _deps$activeCallContr2.enableCache) !== null && _deps$activeCallContr !== void 0 ? _deps$activeCallContr : true,
      storageKey: 'activeCallControl'
    });
    _this._ttl = void 0;
    _this._timeToRetry = void 0;
    _this._polling = void 0;
    _this._enableCache = void 0;
    _this._promise = null;
    _this._rcCall = void 0;
    _this._tabActive = void 0;
    _this._connectivity = void 0;
    _this._onCallEndFunc = void 0;
    _this._timeoutId = void 0;
    _this._lastSubscriptionMessage = void 0;

    _initializerDefineProperty(_this, "activeSessionId", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "busyTimestamp", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "timestamp", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "sessions", _descriptor4, _assertThisInitialized(_this));

    _this._updateSessionsHandler = function () {
      _this.updateActiveSessions();
    };

    var activeCallControlOptions = _this._deps.activeCallControlOptions;
    _this._ttl = (_activeCallControlOpt = activeCallControlOptions === null || activeCallControlOptions === void 0 ? void 0 : activeCallControlOptions.ttl) !== null && _activeCallControlOpt !== void 0 ? _activeCallControlOpt : DEFAULT_TTL;
    _this._timeToRetry = (_activeCallControlOpt2 = activeCallControlOptions === null || activeCallControlOptions === void 0 ? void 0 : activeCallControlOptions.timeToRetry) !== null && _activeCallControlOpt2 !== void 0 ? _activeCallControlOpt2 : DEFAULT_TIME_TO_RETRY;
    _this._polling = (_activeCallControlOpt3 = activeCallControlOptions === null || activeCallControlOptions === void 0 ? void 0 : activeCallControlOptions.polling) !== null && _activeCallControlOpt3 !== void 0 ? _activeCallControlOpt3 : false;
    _this._enableCache = (_activeCallControlOpt4 = activeCallControlOptions === null || activeCallControlOptions === void 0 ? void 0 : activeCallControlOptions.enableCache) !== null && _activeCallControlOpt4 !== void 0 ? _activeCallControlOpt4 : true;
    _this._promise = null;
    _this._rcCall = null;
    return _this;
  }

  _createClass(ActiveCallControl, [{
    key: "onStateChange",
    value: function () {
      var _onStateChange = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(this.ready && this._hasPermission)) {
                  _context.next = 5;
                  break;
                }

                this._subscriptionHandler();

                this._checkConnectivity();

                _context.next = 5;
                return this._checkTabActive();

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function onStateChange() {
        return _onStateChange.apply(this, arguments);
      }

      return onStateChange;
    }()
  }, {
    key: "onInit",
    value: function () {
      var _onInit = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var _this2 = this,
            _this$_deps$tabManage;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (this._hasPermission) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt("return");

              case 2:
                this._deps.subscription.subscribe([subscribeEvent]);

                this._rcCall = new _ringcentralCall.RingCentralCall({
                  sdk: this._deps.client.service,
                  subscriptions: null,
                  enableSubscriptionHander: false,
                  callControlOptions: {
                    preloadDevices: false,
                    preloadSessions: false,
                    extensionInfo: _objectSpread(_objectSpread({}, this._deps.extensionInfo.info), {}, {
                      // TODO: add info type in 'AccountInfo'
                      // @ts-ignore
                      account: this._deps.accountInfo.info
                    })
                  }
                });

                this._rcCall.on('new', function (session) {
                  _this2._newSessionHandler(session);
                });

                this._tabActive = (_this$_deps$tabManage = this._deps.tabManager) === null || _this$_deps$tabManage === void 0 ? void 0 : _this$_deps$tabManage.active;

                if (!this._shouldFetch()) {
                  _context2.next = 17;
                  break;
                }

                _context2.prev = 7;
                _context2.next = 10;
                return this.fetchData();

              case 10:
                _context2.next = 15;
                break;

              case 12:
                _context2.prev = 12;
                _context2.t0 = _context2["catch"](7);

                this._retry();

              case 15:
                _context2.next = 18;
                break;

              case 17:
                if (this._polling) {
                  this._startPolling();
                } else {
                  this._retry();
                }

              case 18:
                if (this._deps.webphone) {
                  (0, _core.watch)(this, function () {
                    return _this2._deps.webphone.connected;
                  }, function (newValue) {
                    if (newValue && _this2._deps.webphone._webphone) {
                      _this2._rcCall.setWebphone(_this2._deps.webphone._webphone);
                    }
                  });
                }

              case 19:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[7, 12]]);
      }));

      function onInit() {
        return _onInit.apply(this, arguments);
      }

      return onInit;
    }()
  }, {
    key: "onReset",
    value: function onReset() {
      this.resetState();
    }
  }, {
    key: "resetState",
    value: function resetState() {
      this.activeSessionId = null;
      this.busyTimestamp = 0;
      this.timestamp = 0;
      this.sessions = [];
    }
  }, {
    key: "_shouldFetch",
    value: function _shouldFetch() {
      return !this._deps.tabManager || this._deps.tabManager.active;
    }
  }, {
    key: "fetchData",
    value: function () {
      var _fetchData2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
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
        }, _callee3, this);
      }));

      function fetchData() {
        return _fetchData2.apply(this, arguments);
      }

      return fetchData;
    }()
  }, {
    key: "_clearTimeout",
    value: function _clearTimeout() {
      if (this._timeoutId) clearTimeout(this._timeoutId);
    }
  }, {
    key: "_subscriptionHandler",
    value: function _subscriptionHandler() {
      var _this$_deps$tabManage2;

      if (!this.ready || this._deps.storage && this._deps.tabManager && !((_this$_deps$tabManage2 = this._deps.tabManager) === null || _this$_deps$tabManage2 === void 0 ? void 0 : _this$_deps$tabManage2.active)) {
        return;
      }

      var message = this._deps.subscription.message;

      if (message && message !== this._lastSubscriptionMessage && telephonySessionsEndPoint.test(message.event) && message.body) {
        this._lastSubscriptionMessage = message;

        if (this._rcCall) {
          this._rcCall.onNotificationEvent(message);
        }
      }
    }
  }, {
    key: "_retry",
    value: function _retry() {
      var _this3 = this;

      var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.timeToRetry;

      this._clearTimeout();

      this._timeoutId = setTimeout(function () {
        _this3._timeoutId = null;

        if (!_this3.timestamp || Date.now() - _this3.timestamp > _this3.ttl) {
          if (!_this3._deps.tabManager || _this3._deps.tabManager.active) {
            _this3.fetchData();
          } else {
            // continue retry checks in case tab becomes main tab
            _this3._retry();
          }
        }
      }, t);
    }
  }, {
    key: "_fetchData",
    value: function () {
      var _fetchData3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
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
        }, _callee4, this, [[0, 7]]);
      }));

      function _fetchData() {
        return _fetchData3.apply(this, arguments);
      }

      return _fetchData;
    }()
  }, {
    key: "_startPolling",
    value: function _startPolling() {
      var _this4 = this;

      var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.timestamp + this.ttl + 10 - Date.now();

      this._clearTimeout();

      this._timeoutId = setTimeout(function () {
        var _this4$_deps$tabManag;

        _this4._timeoutId = null;

        if (!_this4._deps.tabManager || ((_this4$_deps$tabManag = _this4._deps.tabManager) === null || _this4$_deps$tabManag === void 0 ? void 0 : _this4$_deps$tabManag.active)) {
          if (!_this4.timestamp || Date.now() - _this4.timestamp > _this4.ttl) {
            _this4.fetchData();
          } else {
            _this4._startPolling();
          }
        } else if (_this4.timestamp && Date.now() - _this4.timestamp < _this4.ttl) {
          _this4._startPolling();
        } else {
          _this4._startPolling(_this4.timeToRetry);
        }
      }, t);
    }
  }, {
    key: "_syncData",
    value: function () {
      var _syncData2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var _this5 = this;

        var activeCalls;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                activeCalls = this._deps.callMonitor.calls;
                _context5.next = 4;
                return this._rcCall.loadSessions(activeCalls);

              case 4:
                this.updateActiveSessions();

                this._rcCall.sessions.forEach(function (session) {
                  _this5._newSessionHandler(session);
                });

                _context5.next = 12;
                break;

              case 8:
                _context5.prev = 8;
                _context5.t0 = _context5["catch"](0);
                console.log('sync data error:', _context5.t0);
                throw _context5.t0;

              case 12:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[0, 8]]);
      }));

      function _syncData() {
        return _syncData2.apply(this, arguments);
      }

      return _syncData;
    }()
  }, {
    key: "updateActiveSessions",
    value: function updateActiveSessions() {
      var _this$_rcCall, _this$_rcCall$_callCo;

      this.timestamp = Date.now();
      this.sessions = ((_this$_rcCall = this._rcCall) === null || _this$_rcCall === void 0 ? void 0 : (_this$_rcCall$_callCo = _this$_rcCall._callControl) === null || _this$_rcCall$_callCo === void 0 ? void 0 : _this$_rcCall$_callCo.sessions.map(function (session) {
        return session.data;
      })) || [];
    }
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
    key: "removeActiveSession",
    value: function removeActiveSession() {
      this.activeSessionId = null;
    } // count it as load (should only call on container init step)

  }, {
    key: "setActiveSessionId",
    value: function setActiveSessionId(telephonySessionId) {
      this.activeSessionId = telephonySessionId;
    }
  }, {
    key: "_checkConnectivity",
    value: function _checkConnectivity() {
      if (this._deps.connectivityMonitor && this._deps.connectivityMonitor.ready && this._connectivity !== this._deps.connectivityMonitor.connectivity) {
        this._connectivity = this._deps.connectivityMonitor.connectivity;

        if (this._connectivity) {
          this.fetchData();
        }
      }
    }
  }, {
    key: "_checkTabActive",
    value: function () {
      var _checkTabActive2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var _this$_deps$tabManage3,
            _this6 = this;

        var _this$_deps$tabManage4, _this$_deps$tabManage5;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!(!this._deps.tabManager || !this._deps.storage || !this._enableCache)) {
                  _context6.next = 2;
                  break;
                }

                return _context6.abrupt("return");

              case 2:
                if (!(this._tabActive !== ((_this$_deps$tabManage3 = this._deps.tabManager) === null || _this$_deps$tabManage3 === void 0 ? void 0 : _this$_deps$tabManage3.active))) {
                  _context6.next = 8;
                  break;
                }

                this._tabActive = (_this$_deps$tabManage4 = this._deps.tabManager) === null || _this$_deps$tabManage4 === void 0 ? void 0 : _this$_deps$tabManage4.active;

                if (!(((_this$_deps$tabManage5 = this._deps.tabManager) === null || _this$_deps$tabManage5 === void 0 ? void 0 : _this$_deps$tabManage5.active) && this._rcCall)) {
                  _context6.next = 8;
                  break;
                }

                _context6.next = 7;
                return this._rcCall.restoreSessions(this.sessions);

              case 7:
                this._rcCall.sessions.forEach(function (session) {
                  _this6._newSessionHandler(session);
                });

              case 8:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function _checkTabActive() {
        return _checkTabActive2.apply(this, arguments);
      }

      return _checkTabActive;
    }()
  }, {
    key: "setCallControlBusyTimestamp",
    value: function setCallControlBusyTimestamp() {
      this.busyTimestamp = Date.now();
    }
  }, {
    key: "clearCallControlBusyTimestamp",
    value: function clearCallControlBusyTimestamp() {
      this.busyTimestamp = 0;
    }
  }, {
    key: "mute",
    value: function () {
      var _mute = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(telephonySessionId) {
        var session, _this$_deps$availabil;

        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;
                this.setCallControlBusyTimestamp();
                session = this._rcCall.sessions.find(function (s) {
                  return s.id === telephonySessionId;
                });
                _context7.next = 5;
                return session.mute();

              case 5:
                this.clearCallControlBusyTimestamp();
                _context7.next = 21;
                break;

              case 8:
                _context7.prev = 8;
                _context7.t0 = _context7["catch"](0);
                _context7.next = 12;
                return (0, _helpers.conflictError)(_context7.t0);

              case 12:
                if (!_context7.sent) {
                  _context7.next = 16;
                  break;
                }

                this._deps.alert.warning({
                  message: _callControlError["default"].muteConflictError
                });

                _context7.next = 20;
                break;

              case 16:
                _context7.next = 18;
                return (_this$_deps$availabil = this._deps.availabilityMonitor) === null || _this$_deps$availabil === void 0 ? void 0 : _this$_deps$availabil.checkIfHAError(_context7.t0);

              case 18:
                if (_context7.sent) {
                  _context7.next = 20;
                  break;
                }

                this._deps.alert.warning({
                  message: _callControlError["default"].generalError
                });

              case 20:
                this.clearCallControlBusyTimestamp();

              case 21:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this, [[0, 8]]);
      }));

      function mute(_x) {
        return _mute.apply(this, arguments);
      }

      return mute;
    }()
  }, {
    key: "unmute",
    value: function () {
      var _unmute = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(telephonySessionId) {
        var session, _this$_deps$availabil2;

        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.prev = 0;
                this.setCallControlBusyTimestamp();
                session = this._rcCall.sessions.find(function (s) {
                  return s.id === telephonySessionId;
                });
                _context8.next = 5;
                return session.unmute();

              case 5:
                this.clearCallControlBusyTimestamp();
                _context8.next = 21;
                break;

              case 8:
                _context8.prev = 8;
                _context8.t0 = _context8["catch"](0);
                _context8.next = 12;
                return (0, _helpers.conflictError)(_context8.t0);

              case 12:
                if (!_context8.sent) {
                  _context8.next = 16;
                  break;
                }

                this._deps.alert.warning({
                  message: _callControlError["default"].unMuteConflictError
                });

                _context8.next = 20;
                break;

              case 16:
                _context8.next = 18;
                return (_this$_deps$availabil2 = this._deps.availabilityMonitor) === null || _this$_deps$availabil2 === void 0 ? void 0 : _this$_deps$availabil2.checkIfHAError(_context8.t0);

              case 18:
                if (_context8.sent) {
                  _context8.next = 20;
                  break;
                }

                this._deps.alert.warning({
                  message: _callControlError["default"].generalError
                });

              case 20:
                this.clearCallControlBusyTimestamp();

              case 21:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this, [[0, 8]]);
      }));

      function unmute(_x2) {
        return _unmute.apply(this, arguments);
      }

      return unmute;
    }()
  }, {
    key: "startRecord",
    value: function () {
      var _startRecord = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(telephonySessionId) {
        var session, recordingId;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.prev = 0;
                this.setCallControlBusyTimestamp();
                session = this._rcCall.sessions.find(function (s) {
                  return s.id === telephonySessionId;
                });
                recordingId = this.getRecordingId(session);
                _context9.next = 6;
                return session.startRecord(recordingId);

              case 6:
                this.clearCallControlBusyTimestamp();
                _context9.next = 12;
                break;

              case 9:
                _context9.prev = 9;
                _context9.t0 = _context9["catch"](0);
                this.clearCallControlBusyTimestamp();

              case 12:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this, [[0, 9]]);
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
      var _stopRecord = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(telephonySessionId) {
        var session, recordingId;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.prev = 0;
                this.setCallControlBusyTimestamp();
                session = this._rcCall.sessions.find(function (s) {
                  return s.id === telephonySessionId;
                });
                recordingId = this.getRecordingId(session);
                _context10.next = 6;
                return session.stopRecord(recordingId);

              case 6:
                this.clearCallControlBusyTimestamp();
                _context10.next = 14;
                break;

              case 9:
                _context10.prev = 9;
                _context10.t0 = _context10["catch"](0);
                console.log('stop record error:', _context10.t0);
                this.clearCallControlBusyTimestamp();
                throw _context10.t0;

              case 14:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this, [[0, 9]]);
      }));

      function stopRecord(_x4) {
        return _stopRecord.apply(this, arguments);
      }

      return stopRecord;
    }()
  }, {
    key: "hangUp",
    value: function () {
      var _hangUp = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(telephonySessionId) {
        var session, _this$_deps$availabil3;

        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.prev = 0;
                this.setCallControlBusyTimestamp();
                session = this._rcCall.sessions.find(function (s) {
                  return s.id === telephonySessionId;
                });
                _context11.next = 5;
                return session.hangup();

              case 5:
                if (typeof this._onCallEndFunc === 'function') {
                  this._onCallEndFunc();
                }

                this.clearCallControlBusyTimestamp();
                _context11.next = 17;
                break;

              case 9:
                _context11.prev = 9;
                _context11.t0 = _context11["catch"](0);
                console.error('hangup error', _context11.t0);
                _context11.next = 14;
                return (_this$_deps$availabil3 = this._deps.availabilityMonitor) === null || _this$_deps$availabil3 === void 0 ? void 0 : _this$_deps$availabil3.checkIfHAError(_context11.t0);

              case 14:
                if (_context11.sent) {
                  _context11.next = 16;
                  break;
                }

                this._deps.alert.warning({
                  message: _callControlError["default"].generalError
                });

              case 16:
                this.clearCallControlBusyTimestamp();

              case 17:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this, [[0, 9]]);
      }));

      function hangUp(_x5) {
        return _hangUp.apply(this, arguments);
      }

      return hangUp;
    }()
  }, {
    key: "reject",
    value: function () {
      var _reject = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(telephonySessionId) {
        var session, _this$_deps$availabil4;

        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.prev = 0;
                this.setCallControlBusyTimestamp();
                session = this._rcCall.sessions.find(function (s) {
                  return s.id === telephonySessionId;
                });
                _context12.next = 5;
                return session.toVoicemail();

              case 5:
                this.clearCallControlBusyTimestamp();
                _context12.next = 15;
                break;

              case 8:
                _context12.prev = 8;
                _context12.t0 = _context12["catch"](0);
                _context12.next = 12;
                return (_this$_deps$availabil4 = this._deps.availabilityMonitor) === null || _this$_deps$availabil4 === void 0 ? void 0 : _this$_deps$availabil4.checkIfHAError(_context12.t0);

              case 12:
                if (_context12.sent) {
                  _context12.next = 14;
                  break;
                }

                this._deps.alert.warning({
                  message: _callControlError["default"].generalError
                });

              case 14:
                this.clearCallControlBusyTimestamp();

              case 15:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this, [[0, 8]]);
      }));

      function reject(_x6) {
        return _reject.apply(this, arguments);
      }

      return reject;
    }()
  }, {
    key: "hold",
    value: function () {
      var _hold = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(telephonySessionId) {
        var session, _this$_deps$availabil5;

        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _context13.prev = 0;
                this.setCallControlBusyTimestamp();
                session = this._rcCall.sessions.find(function (s) {
                  return s.id === telephonySessionId;
                });
                _context13.next = 5;
                return session.hold();

              case 5:
                this.clearCallControlBusyTimestamp();
                _context13.next = 21;
                break;

              case 8:
                _context13.prev = 8;
                _context13.t0 = _context13["catch"](0);
                _context13.next = 12;
                return (0, _helpers.conflictError)(_context13.t0);

              case 12:
                if (!_context13.sent) {
                  _context13.next = 16;
                  break;
                }

                this._deps.alert.warning({
                  message: _callControlError["default"].holdConflictError
                });

                _context13.next = 20;
                break;

              case 16:
                _context13.next = 18;
                return (_this$_deps$availabil5 = this._deps.availabilityMonitor) === null || _this$_deps$availabil5 === void 0 ? void 0 : _this$_deps$availabil5.checkIfHAError(_context13.t0);

              case 18:
                if (_context13.sent) {
                  _context13.next = 20;
                  break;
                }

                this._deps.alert.warning({
                  message: _callControlError["default"].generalError
                });

              case 20:
                this.clearCallControlBusyTimestamp();

              case 21:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this, [[0, 8]]);
      }));

      function hold(_x7) {
        return _hold.apply(this, arguments);
      }

      return hold;
    }()
  }, {
    key: "unhold",
    value: function () {
      var _unhold = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(telephonySessionId) {
        var session, _this$_deps$availabil6;

        return regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                _context14.prev = 0;
                this.setCallControlBusyTimestamp();
                session = this._rcCall.sessions.find(function (s) {
                  return s.id === telephonySessionId;
                });
                _context14.next = 5;
                return session.unhold();

              case 5:
                this.clearCallControlBusyTimestamp();
                _context14.next = 21;
                break;

              case 8:
                _context14.prev = 8;
                _context14.t0 = _context14["catch"](0);
                _context14.next = 12;
                return (0, _helpers.conflictError)(_context14.t0);

              case 12:
                if (!_context14.sent) {
                  _context14.next = 16;
                  break;
                }

                this._deps.alert.warning({
                  message: _callControlError["default"].unHoldConflictError
                });

                _context14.next = 20;
                break;

              case 16:
                _context14.next = 18;
                return (_this$_deps$availabil6 = this._deps.availabilityMonitor) === null || _this$_deps$availabil6 === void 0 ? void 0 : _this$_deps$availabil6.checkIfHAError(_context14.t0);

              case 18:
                if (_context14.sent) {
                  _context14.next = 20;
                  break;
                }

                this._deps.alert.warning({
                  message: _callControlError["default"].generalError
                });

              case 20:
                this.clearCallControlBusyTimestamp();

              case 21:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this, [[0, 8]]);
      }));

      function unhold(_x8) {
        return _unhold.apply(this, arguments);
      }

      return unhold;
    }()
  }, {
    key: "transfer",
    value: function () {
      var _transfer = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16(transferNumber, telephonySessionId) {
        var _this7 = this;

        var session, validatedResult, validPhoneNumber, phoneNumber, _this$_deps$availabil7;

        return regeneratorRuntime.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                _context16.prev = 0;
                this.setCallControlBusyTimestamp();
                session = this._rcCall.sessions.find(function (s) {
                  return s.id === telephonySessionId;
                });
                _context16.next = 5;
                return this._deps.numberValidate.validateNumbers([transferNumber]);

              case 5:
                validatedResult = _context16.sent;

                if (validatedResult.result) {
                  _context16.next = 9;
                  break;
                }

                validatedResult.errors.forEach( /*#__PURE__*/function () {
                  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(error) {
                    var _this7$_deps$availabi;

                    var isHAError;
                    return regeneratorRuntime.wrap(function _callee15$(_context15) {
                      while (1) {
                        switch (_context15.prev = _context15.next) {
                          case 0:
                            _context15.next = 2;
                            return (_this7$_deps$availabi = _this7._deps.availabilityMonitor) === null || _this7$_deps$availabi === void 0 ? void 0 : _this7$_deps$availabi.checkIfHAError(error);

                          case 2:
                            isHAError = _context15.sent;

                            if (!isHAError) {
                              // TODO: fix `callErrors` type
                              _this7._deps.alert.warning({
                                message: _callErrors["default"][error.type],
                                payload: {
                                  phoneNumber: error.phoneNumber
                                }
                              });
                            }

                          case 4:
                          case "end":
                            return _context15.stop();
                        }
                      }
                    }, _callee15);
                  }));

                  return function (_x11) {
                    return _ref2.apply(this, arguments);
                  };
                }());
                return _context16.abrupt("return");

              case 9:
                // TODO: fix `validatedResult` type in `numberValidate` module.
                validPhoneNumber = validatedResult.numbers[0] && validatedResult.numbers[0].e164;
                phoneNumber = validPhoneNumber;

                if (validPhoneNumber.indexOf('+') === -1) {
                  phoneNumber = [this._deps.accountInfo.mainCompanyNumber, validPhoneNumber].join('*');
                }

                session.transfer(phoneNumber);
                this.clearCallControlBusyTimestamp();
                _context16.next = 23;
                break;

              case 16:
                _context16.prev = 16;
                _context16.t0 = _context16["catch"](0);
                _context16.next = 20;
                return (_this$_deps$availabil7 = this._deps.availabilityMonitor) === null || _this$_deps$availabil7 === void 0 ? void 0 : _this$_deps$availabil7.checkIfHAError(_context16.t0);

              case 20:
                if (_context16.sent) {
                  _context16.next = 22;
                  break;
                }

                this._deps.alert.warning({
                  message: _callControlError["default"].generalError
                });

              case 22:
                this.clearCallControlBusyTimestamp();

              case 23:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, this, [[0, 16]]);
      }));

      function transfer(_x9, _x10) {
        return _transfer.apply(this, arguments);
      }

      return transfer;
    }() // Incomplete Implementation?

  }, {
    key: "flip",
    value: function () {
      var _flip = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17(flipValue, telephonySessionId) {
        var session;
        return regeneratorRuntime.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                _context17.prev = 0;
                this.setCallControlBusyTimestamp();
                session = this._rcCall.sessions.find(function (s) {
                  return s.id === telephonySessionId;
                });
                _context17.next = 5;
                return session.flip({
                  callFlipId: flipValue
                });

              case 5:
                this.clearCallControlBusyTimestamp();
                _context17.next = 13;
                break;

              case 8:
                _context17.prev = 8;
                _context17.t0 = _context17["catch"](0);
                console.error('flip error', _context17.t0);
                this.clearCallControlBusyTimestamp();
                throw _context17.t0;

              case 13:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17, this, [[0, 8]]);
      }));

      function flip(_x12, _x13) {
        return _flip.apply(this, arguments);
      }

      return flip;
    }()
  }, {
    key: "forward",
    value: function () {
      var _forward = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18() {
        return regeneratorRuntime.wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18);
      }));

      function forward() {
        return _forward.apply(this, arguments);
      }

      return forward;
    }()
  }, {
    key: "sendDTMF",
    // DTMF handing by webphone session temporary, due to rc call session doesn't support currently
    value: function () {
      var _sendDTMF = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee19(dtmfValue, telephonySessionId) {
        var session, webphoneSession;
        return regeneratorRuntime.wrap(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                _context19.prev = 0;
                session = this._rcCall.sessions.find(function (s) {
                  return s.id === telephonySessionId;
                }); // TODO: using rc call session

                webphoneSession = session.webphoneSession;

                if (!webphoneSession) {
                  _context19.next = 6;
                  break;
                }

                _context19.next = 6;
                return webphoneSession.dtmf(dtmfValue, 100);

              case 6:
                _context19.next = 12;
                break;

              case 8:
                _context19.prev = 8;
                _context19.t0 = _context19["catch"](0);
                console.log('send dtmf error', _context19.t0);
                throw _context19.t0;

              case 12:
              case "end":
                return _context19.stop();
            }
          }
        }, _callee19, this, [[0, 8]]);
      }));

      function sendDTMF(_x14, _x15) {
        return _sendDTMF.apply(this, arguments);
      }

      return sendDTMF;
    }()
  }, {
    key: "getActiveSession",
    value: function getActiveSession(telephonySessionId) {
      return this.activeSessions[telephonySessionId];
    }
  }, {
    key: "activeSession",
    get: function get() {
      return this.getActiveSession(this.activeSessionId);
    }
  }, {
    key: "activeSessions",
    get: function get() {
      var _this8 = this;

      // TODO: add calls type in callMonitor modules
      var reducer = function reducer(accumulator, call) {
        var telephonySessionId = call.telephonySessionId;

        var session = _this8.sessions.find(function (s) {
          return s.id === telephonySessionId;
        });

        if (!session) {
          return accumulator;
        }

        accumulator[telephonySessionId] = (0, _helpers.normalizeSession)({
          session: session,
          call: call
        });
        return accumulator;
      };

      return this._deps.callMonitor.calls.reduce(reducer, {});
    }
  }, {
    key: "sessionIdToTelephonySessionIdMapping",
    get: function get() {
      // TODO: add calls type in callMonitor modules
      var reducer = function reducer(accumulator, call) {
        var telephonySessionId = call.telephonySessionId,
            sessionId = call.sessionId;
        accumulator[sessionId] = telephonySessionId;
        return accumulator;
      };

      return this._deps.callMonitor.calls.reduce(reducer, {});
    }
    /**
     * Mitigation strategy for avoiding 404/409 on call control endpoings.
     * This should gradually move towards per session controls rather than
     * a global busy timeout.
     */

  }, {
    key: "busy",
    get: function get() {
      return Date.now() - this.busyTimestamp < DEFAULT_BUSY_TIMEOUT;
    }
  }, {
    key: "_hasPermission",
    get: function get() {
      return this._deps.rolesAndPermissions.ringoutEnabled;
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
  }]);

  return ActiveCallControl;
}(_core.RcModuleV2), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "activeSessionId", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "busyTimestamp", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "timestamp", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "sessions", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _applyDecoratedDescriptor(_class2.prototype, "resetState", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "resetState"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateActiveSessions", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "updateActiveSessions"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "removeActiveSession", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "removeActiveSession"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setActiveSessionId", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setActiveSessionId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setCallControlBusyTimestamp", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setCallControlBusyTimestamp"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "clearCallControlBusyTimestamp", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "clearCallControlBusyTimestamp"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "mute", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "mute"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "unmute", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "unmute"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "hangUp", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "hangUp"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "hold", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "hold"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "unhold", [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "unhold"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "activeSession", [_dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "activeSession"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "activeSessions", [_dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "activeSessions"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "sessionIdToTelephonySessionIdMapping", [_dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "sessionIdToTelephonySessionIdMapping"), _class2.prototype)), _class2)) || _class);
exports.ActiveCallControl = ActiveCallControl;
//# sourceMappingURL=ActiveCallControl.js.map
