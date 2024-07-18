"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.filter");
require("core-js/modules/es.array.includes");
require("core-js/modules/es.array.map");
require("core-js/modules/es.function.name");
require("core-js/modules/es.object.get-own-property-descriptor");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.promise");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EvAuth = void 0;
require("regenerator-runtime/runtime");
var _di = require("@ringcentral-integration/commons/lib/di");
var _utils = require("@ringcentral-integration/commons/utils");
var _core = require("@ringcentral-integration/core");
var _format = _interopRequireDefault(require("@ringcentral-integration/phone-number/lib/format"));
var _events = require("events");
var _enums = require("../../enums");
var _enums2 = require("../../lib/EvClient/enums");
var _EvTypeError = require("../../lib/EvTypeError");
var _sortByName = require("../../lib/sortByName");
var _trackEvents = require("../../lib/trackEvents");
var _i18n = _interopRequireDefault(require("./i18n"));
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t));) { ; } return t; }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _createSuper(t) { var r = _isNativeReflectConstruct(); return function () { var e, o = _getPrototypeOf(t); if (r) { var s = _getPrototypeOf(this).constructor; e = Reflect.construct(o, arguments, s); } else e = o.apply(this, arguments); return _possibleConstructorReturn(this, e); }; }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
var DEFAULT_COUNTRIES = ['USA', 'CAN'];
var EvAuth = (_dec = (0, _di.Module)({
  name: 'EvAuth',
  deps: ['EvClient', 'Auth', 'Block', 'Alert', 'Locale', 'RouterInteraction', 'EvSubscription', 'TabManager', 'GlobalStorage', {
    dep: 'EvAuthOptions',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (that) {
  return [that.inboundSettings.availableQueues];
}), _dec3 = (0, _core.computed)(function (that) {
  return [that.inboundSettings.availableRequeueQueues];
}), _dec4 = (0, _core.computed)(function (that) {
  return [that.agentSettings.callerIds];
}), _dec5 = (0, _core.computed)(function (that) {
  return [that.agentConfig.applicationSettings.availableCountries, that._deps.locale.currentLocale];
}), _dec6 = (0, _core.track)(function (_, _ref) {
  var _agent$authenticateRe, _agent$authenticateRe2, _agent$authenticateRe3, _agent$authenticateRe4;
  var connected = _ref.connected,
    agent = _ref.agent;
  return [_trackEvents.trackEvents.loginAgent, connected ? {
    'agentId(s)': (_agent$authenticateRe = agent.authenticateResponse) === null || _agent$authenticateRe === void 0 ? void 0 : (_agent$authenticateRe2 = _agent$authenticateRe.agents) === null || _agent$authenticateRe2 === void 0 ? void 0 : _agent$authenticateRe2.map(function (agent) {
      return agent.agentId;
    }),
    'userId(s)': (_agent$authenticateRe3 = agent.authenticateResponse) === null || _agent$authenticateRe3 === void 0 ? void 0 : (_agent$authenticateRe4 = _agent$authenticateRe3.agents) === null || _agent$authenticateRe4 === void 0 ? void 0 : _agent$authenticateRe4.map(function (agent) {
      return agent.rcUserId;
    })
  } : undefined];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  _inherits(EvAuth, _RcModuleV);
  var _super = _createSuper(EvAuth);
  _createClass(EvAuth, [{
    key: "tabManagerEnabled",
    get: function get() {
      var _this$_deps$tabManage;
      return (_this$_deps$tabManage = this._deps.tabManager) === null || _this$_deps$tabManage === void 0 ? void 0 : _this$_deps$tabManage.enable;
    }
  }, {
    key: "isOnlyOneAgent",
    get: function get() {
      var _this$agent;
      return ((_this$agent = this.agent) === null || _this$agent === void 0 ? void 0 : _this$agent.authenticateResponse.agents.length) === 1;
    }
  }]);
  function EvAuth(deps) {
    var _this;
    _classCallCheck(this, EvAuth);
    _this = _super.call(this, {
      deps: deps,
      storageKey: 'EvAuth',
      enableGlobalCache: true
    });
    _this.connecting = false;
    _this._eventEmitter = new _events.EventEmitter();
    _this.canUserLogoutFn = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", true);
            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    _this._logout = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _this._deps.auth.logout({
                dismissAllAlert: false
              });
            case 2:
              _this.setNotAuth(true);
            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));
    _this._logoutByOtherTab = false;
    _this._authenticateResponseWatcher = null;
    _this._agentConfigWatcher = null;
    _initializerDefineProperty(_this, "connected", _descriptor, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "agent", _descriptor2, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "agentId", _descriptor3, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "loginStatus", _descriptor4, _assertThisInitialized(_this));
    _this.loginAgent = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var token,
        authenticateRes,
        _args3 = arguments;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              token = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : _this._deps.auth.accessToken;
              _context3.next = 3;
              return _this.authenticateWithToken({
                rcAccessToken: token,
                shouldEmitAuthSuccess: false
              });
            case 3:
              authenticateRes = _context3.sent;
              if (authenticateRes) {
                _context3.next = 6;
                break;
              }
              return _context3.abrupt("return");
            case 6:
              _context3.next = 8;
              return _this.openSocketWithSelectedAgentId();
            case 8:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));
    _this._deps.auth.addAfterLoggedInHandler(function () {
      console.log('addAfterLoggedInHandler~~');
      _this.clearAgentId();
    });
    _this._deps.auth.addBeforeLogoutHandler(function () {
      console.log('addBeforeLogoutHandler~~');
      _this.clearAgentId();
    });
    return _this;
  }
  _createClass(EvAuth, [{
    key: "setAgentId",
    value: function setAgentId(agentId) {
      this.agentId = agentId;
    }
  }, {
    key: "setConnectionData",
    value: function setConnectionData(_ref5) {
      var connected = _ref5.connected,
        agent = _ref5.agent;
      // ! agent must be set before connected
      this.agent = agent;
      this.connected = connected;
    }
  }, {
    key: "setAgent",
    value: function setAgent(agent) {
      this.agent = agent;
    }
  }, {
    key: "clearAgentId",
    value: function clearAgentId() {
      this.agentId = '';
    }
  }, {
    key: "setAuthSuccess",
    value: function setAuthSuccess() {
      this.loginStatus = _enums.loginStatus.AUTH_SUCCESS;
    }
  }, {
    key: "setLoginSuccess",
    value: function setLoginSuccess() {
      this.loginStatus = _enums.loginStatus.LOGIN_SUCCESS;
    }
  }, {
    key: "setNotAuth",
    value: function setNotAuth() {
      var asyncAllTabs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      this.loginStatus = _enums.loginStatus.NOT_AUTH;
      if (asyncAllTabs && this.tabManagerEnabled) {
        this._deps.tabManager.send(_enums.tabManagerEvents.LOGGED_OUT);
      }
    }
  }, {
    key: "_shouldInit",
    value: function _shouldInit() {
      return _get(_getPrototypeOf(EvAuth.prototype), "_shouldInit", this).call(this) && this._deps.auth.loggedIn && this.connected;
    }
  }, {
    key: "onInitOnce",
    value: function onInitOnce() {
      var _this2 = this;
      this._deps.evSubscription.subscribe(_enums2.EvCallbackTypes.LOGOUT, /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _this2._emitLogoutBefore();

                // if that is logout by same browser that will only trigger emit
                // if there is logout by other browser, that need redirect to home page,
                if (_this2._logoutByOtherTab) {
                  _context4.next = 6;
                  break;
                }
                _this2._deps.alert.info({
                  message: _enums.messageTypes.FORCE_LOGOUT
                });
                _this2._logoutByOtherTab = false;
                _context4.next = 6;
                return _this2.newReconnect();
              case 6:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      })));
    }
  }, {
    key: "onStateChange",
    value: function () {
      var _onStateChange = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var _this3 = this;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!(this.tabManagerEnabled && this._deps.tabManager.ready)) {
                  _context6.next = 3;
                  break;
                }
                _context6.next = 3;
                return this._checkTabManagerEvent();
              case 3:
                if (!(this._deps.auth.loggedIn && this.loginStatus !== _enums.loginStatus.AUTH_SUCCESS && this.loginStatus !== _enums.loginStatus.LOGIN_SUCCESS && !this.connecting)) {
                  _context6.next = 8;
                  break;
                }
                this.connecting = true;
                // when login make sure the logoutByOtherTab is false
                this._logoutByOtherTab = false;
                _context6.next = 8;
                return this._deps.block.next( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
                  return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                      switch (_context5.prev = _context5.next) {
                        case 0:
                          if (!_this3.agentId) {
                            _context5.next = 5;
                            break;
                          }
                          _context5.next = 3;
                          return _this3.loginAgent();
                        case 3:
                          _context5.next = 7;
                          break;
                        case 5:
                          _context5.next = 7;
                          return _this3.authenticateWithToken();
                        case 7:
                        case "end":
                          return _context5.stop();
                      }
                    }
                  }, _callee5);
                })));
              case 8:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));
      function onStateChange() {
        return _onStateChange.apply(this, arguments);
      }
      return onStateChange;
    }()
  }, {
    key: "onceLogout",
    value: function onceLogout(cb) {
      return this._deps.evSubscription.once(_enums2.EvCallbackTypes.LOGOUT, cb);
    }
  }, {
    key: "logout",
    value: function () {
      var _logout = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        var agentId, logoutAgentResponse;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return this.canUserLogoutFn();
              case 2:
                if (_context7.sent) {
                  _context7.next = 4;
                  break;
                }
                return _context7.abrupt("return");
              case 4:
                console.log('logout~~');
                agentId = this.agentId;
                this.sendLogoutTabEvent();
                _context7.next = 9;
                return this._deps.block.next(this._logout);
              case 9:
                _context7.next = 11;
                return this.logoutAgent(agentId);
              case 11:
                logoutAgentResponse = _context7.sent;
                // TODO: error handle when logout fail
                // TODO: when failed need tell other tab not logout => this._deps.tabManager.send(tabManagerEvents.LOGOUT);
                if (!logoutAgentResponse.message || logoutAgentResponse.message !== 'OK') {
                  console.log('logoutAgent failed');
                }
                this.setConnectionData({
                  connected: false,
                  agent: null
                });
              case 14:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));
      function logout() {
        return _logout.apply(this, arguments);
      }
      return logout;
    }()
  }, {
    key: "sendLogoutTabEvent",
    value: function sendLogoutTabEvent() {
      this._emitLogoutBefore();
      if (this.tabManagerEnabled) {
        this._deps.tabManager.send(_enums.tabManagerEvents.LOGOUT);
      }
    }
  }, {
    key: "logoutAgent",
    value: function logoutAgent() {
      var agentId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.agentId;
      return this._deps.evClient.logoutAgent(agentId);
    }
  }, {
    key: "beforeAgentLogout",
    value: function beforeAgentLogout(callback) {
      this._eventEmitter.on(_enums.loginStatus.LOGOUT_BEFORE, callback);
    }
  }, {
    key: "newReconnect",
    value: function newReconnect() {
      var isBlock = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      this._deps.evClient.closeSocket();
      var fn = this.loginAgent;
      return isBlock ? this._deps.block.next(fn) : fn();
    }
  }, {
    key: "authenticateWithToken",
    value: function () {
      var _authenticateWithToken = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
        var _ref8,
          _ref8$rcAccessToken,
          rcAccessToken,
          _ref8$tokenType,
          tokenType,
          _ref8$shouldEmitAuthS,
          shouldEmitAuthSuccess,
          authenticateResponse,
          agent,
          _args8 = arguments;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _ref8 = _args8.length > 0 && _args8[0] !== undefined ? _args8[0] : {}, _ref8$rcAccessToken = _ref8.rcAccessToken, rcAccessToken = _ref8$rcAccessToken === void 0 ? this._deps.auth.accessToken : _ref8$rcAccessToken, _ref8$tokenType = _ref8.tokenType, tokenType = _ref8$tokenType === void 0 ? 'Bearer' : _ref8$tokenType, _ref8$shouldEmitAuthS = _ref8.shouldEmitAuthSuccess, shouldEmitAuthSuccess = _ref8$shouldEmitAuthS === void 0 ? true : _ref8$shouldEmitAuthS;
                console.log('authenticateWithToken', shouldEmitAuthSuccess);
                _context8.prev = 2;
                this._deps.evClient.initSDK();
                _context8.next = 6;
                return this._deps.evClient.getAndHandleAuthenticateResponse(rcAccessToken, tokenType);
              case 6:
                authenticateResponse = _context8.sent;
                agent = _objectSpread(_objectSpread({}, this.agent), {}, {
                  authenticateResponse: authenticateResponse
                }); // if (shouldEmitAuthSuccess && !this._authenticateResponseWatcher) {
                //   this._authenticateResponseWatcher = watch(
                //     this,
                //     () => this.agent?.authenticateResponse,
                //     (authenticateResponse) => {
                //       if (authenticateResponse) {
                //         this._emitAuthSuccess();
                //         this._authenticateResponseWatcher();
                //         this._authenticateResponseWatcher = null;
                //       }
                //     },
                //   );
                // }
                this.setAgent(agent);
                this.setAuthSuccess();
                if (shouldEmitAuthSuccess) {
                  this._emitAuthSuccess();
                }
                return _context8.abrupt("return", authenticateResponse);
              case 14:
                _context8.prev = 14;
                _context8.t0 = _context8["catch"](2);
                _context8.t1 = _context8.t0.type;
                _context8.next = _context8.t1 === _enums.messageTypes.NO_AGENT ? 19 : _context8.t1 === _enums.messageTypes.CONNECT_TIMEOUT ? 21 : _context8.t1 === _enums.messageTypes.UNEXPECTED_AGENT ? 21 : 23;
                break;
              case 19:
                this._deps.alert.warning({
                  message: _context8.t0.type
                });
                return _context8.abrupt("break", 24);
              case 21:
                this._deps.alert.danger({
                  message: _context8.t0.type
                });
                return _context8.abrupt("break", 24);
              case 23:
                this._deps.alert.danger({
                  message: _enums.messageTypes.CONNECT_ERROR
                });
              case 24:
                _context8.next = 26;
                return this._logout();
              case 26:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this, [[2, 14]]);
      }));
      function authenticateWithToken() {
        return _authenticateWithToken.apply(this, arguments);
      }
      return authenticateWithToken;
    }()
  }, {
    key: "openSocketWithSelectedAgentId",
    value: function () {
      var _openSocketWithSelectedAgentId = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
        var _this4 = this;
        var _ref9,
          _ref9$syncOtherTabs,
          syncOtherTabs,
          _ref9$retryOpenSocket,
          retryOpenSocket,
          getAgentConfig,
          selectedAgentId,
          openSocketResult,
          _yield$this$_deps$aut,
          access_token,
          authenticateRes,
          openSocketRes,
          agentConfig,
          agent,
          _args9 = arguments;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _ref9 = _args9.length > 0 && _args9[0] !== undefined ? _args9[0] : {}, _ref9$syncOtherTabs = _ref9.syncOtherTabs, syncOtherTabs = _ref9$syncOtherTabs === void 0 ? false : _ref9$syncOtherTabs, _ref9$retryOpenSocket = _ref9.retryOpenSocket, retryOpenSocket = _ref9$retryOpenSocket === void 0 ? false : _ref9$retryOpenSocket;
                console.log('openSocketWithSelectedAgentId', syncOtherTabs, retryOpenSocket);
                _context9.prev = 2;
                // TODO: here need check time when no message come back, that will block app.
                getAgentConfig = new Promise(function (resolve) {
                  _this4._deps.evClient.on(_enums2.EvCallbackTypes.LOGIN_PHASE_1, resolve);
                });
                selectedAgentId = this.agentId;
                if (selectedAgentId) {
                  _context9.next = 7;
                  break;
                }
                throw new _EvTypeError.EvTypeError({
                  type: _enums.messageTypes.NO_AGENT
                });
              case 7:
                _context9.next = 9;
                return this._deps.evClient.openSocket(selectedAgentId);
              case 9:
                openSocketResult = _context9.sent;
                _context9.next = 12;
                return (0, _utils.sleep)(0);
              case 12:
                if (!openSocketResult.error) {
                  _context9.next = 29;
                  break;
                }
                console.log('retryOpenSocket~~', retryOpenSocket);
                if (!retryOpenSocket) {
                  _context9.next = 28;
                  break;
                }
                _context9.next = 17;
                return this._deps.auth.refreshToken();
              case 17:
                _yield$this$_deps$aut = _context9.sent;
                access_token = _yield$this$_deps$aut.access_token;
                _context9.next = 21;
                return this.authenticateWithToken({
                  rcAccessToken: access_token,
                  shouldEmitAuthSuccess: false
                });
              case 21:
                authenticateRes = _context9.sent;
                if (authenticateRes) {
                  _context9.next = 24;
                  break;
                }
                return _context9.abrupt("return");
              case 24:
                _context9.next = 26;
                return this.openSocketWithSelectedAgentId({
                  syncOtherTabs: syncOtherTabs
                });
              case 26:
                openSocketRes = _context9.sent;
                return _context9.abrupt("return", openSocketRes);
              case 28:
                throw new _EvTypeError.EvTypeError({
                  type: _enums.messageTypes.OPEN_SOCKET_ERROR
                });
              case 29:
                // TODO： implement multiple sync back drop
                if (syncOtherTabs && this.tabManagerEnabled) {
                  this._deps.tabManager.send(_enums.tabManagerEvents.OPEN_SOCKET);
                }
                _context9.next = 32;
                return getAgentConfig;
              case 32:
                agentConfig = _context9.sent;
                agent = _objectSpread(_objectSpread({}, this.agent), {}, {
                  agentConfig: agentConfig
                }); // if (!this._agentConfigWatcher) {
                //   this._agentConfigWatcher = watch(
                //     this,
                //     () => this.agent?.agentConfig,
                //     (agentConfig) => {
                //       if (agentConfig) {
                //         this._emitLoginSuccess();
                //         this._agentConfigWatcher();
                //         this._agentConfigWatcher = null;
                //       }
                //     },
                //   );
                // }
                this.setConnectionData({
                  agent: agent,
                  connected: true
                });
                this.connecting = false;
                this.setLoginSuccess();
                this._emitLoginSuccess();
                return _context9.abrupt("return", agentConfig);
              case 41:
                _context9.prev = 41;
                _context9.t0 = _context9["catch"](2);
                _context9.t1 = _context9.t0.type;
                _context9.next = _context9.t1 === _enums.messageTypes.NO_AGENT ? 46 : _context9.t1 === _enums.messageTypes.INVALID_BROWSER ? 48 : _context9.t1 === _enums.messageTypes.OPEN_SOCKET_ERROR ? 48 : 50;
                break;
              case 46:
                this._deps.alert.warning({
                  message: _context9.t0.type
                });
                return _context9.abrupt("break", 51);
              case 48:
                this._deps.alert.danger({
                  message: _context9.t0.type
                });
                return _context9.abrupt("break", 51);
              case 50:
                this._deps.alert.danger({
                  message: _enums.messageTypes.CONNECT_ERROR
                });
              case 51:
                _context9.next = 53;
                return this._logout();
              case 53:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this, [[2, 41]]);
      }));
      function openSocketWithSelectedAgentId() {
        return _openSocketWithSelectedAgentId.apply(this, arguments);
      }
      return openSocketWithSelectedAgentId;
    }()
  }, {
    key: "onceLoginSuccess",
    value: function onceLoginSuccess(callback) {
      this._eventEmitter.once(_enums.loginStatus.LOGIN_SUCCESS, callback);
    }
  }, {
    key: "onAuthSuccess",
    value: function onAuthSuccess(callback) {
      this._eventEmitter.on(_enums.loginStatus.AUTH_SUCCESS, callback);
    }
  }, {
    key: "_emitLogoutBefore",
    value: function _emitLogoutBefore() {
      this._eventEmitter.emit(_enums.loginStatus.LOGOUT_BEFORE);
    }
  }, {
    key: "_emitLoginSuccess",
    value: function _emitLoginSuccess() {
      this._eventEmitter.emit(_enums.loginStatus.LOGIN_SUCCESS);
    }
  }, {
    key: "_emitAuthSuccess",
    value: function _emitAuthSuccess() {
      this._eventEmitter.emit(_enums.loginStatus.AUTH_SUCCESS);
    }
  }, {
    key: "_checkTabManagerEvent",
    value: function () {
      var _checkTabManagerEvent2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
        var _this5 = this;
        var event;
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                event = this._deps.tabManager.event;
                if (!event) {
                  _context11.next = 13;
                  break;
                }
                _context11.t0 = event.name;
                _context11.next = _context11.t0 === _enums.tabManagerEvents.LOGOUT ? 5 : _context11.t0 === _enums.tabManagerEvents.OPEN_SOCKET ? 7 : _context11.t0 === _enums.tabManagerEvents.LOGGED_OUT ? 10 : 12;
                break;
              case 5:
                this._logoutByOtherTab = true;
                return _context11.abrupt("break", 13);
              case 7:
                _context11.next = 9;
                return this._deps.block.next( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
                  return regeneratorRuntime.wrap(function _callee10$(_context10) {
                    while (1) {
                      switch (_context10.prev = _context10.next) {
                        case 0:
                          _context10.next = 2;
                          return _this5.openSocketWithSelectedAgentId({
                            retryOpenSocket: true
                          });
                        case 2:
                        case "end":
                          return _context10.stop();
                      }
                    }
                  }, _callee10);
                })));
              case 9:
                return _context11.abrupt("break", 13);
              case 10:
                this.setNotAuth();
                return _context11.abrupt("break", 13);
              case 12:
                return _context11.abrupt("break", 13);
              case 13:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));
      function _checkTabManagerEvent() {
        return _checkTabManagerEvent2.apply(this, arguments);
      }
      return _checkTabManagerEvent;
    }()
  }, {
    key: "isFreshLogin",
    get: function get() {
      return this._deps.auth.isFreshLogin;
    }
  }, {
    key: "agentConfig",
    get: function get() {
      var _this$agent2;
      return ((_this$agent2 = this.agent) === null || _this$agent2 === void 0 ? void 0 : _this$agent2.agentConfig) || null;
    }
  }, {
    key: "authenticateResponse",
    get: function get() {
      var _this$agent3;
      return ((_this$agent3 = this.agent) === null || _this$agent3 === void 0 ? void 0 : _this$agent3.authenticateResponse) || null;
    }
  }, {
    key: "agentSettings",
    get: function get() {
      var _this$agentConfig;
      return (_this$agentConfig = this.agentConfig) === null || _this$agentConfig === void 0 ? void 0 : _this$agentConfig.agentSettings;
    }
  }, {
    key: "outboundManualDefaultRingtime",
    get: function get() {
      var _this$agentSettings;
      return (_this$agentSettings = this.agentSettings) === null || _this$agentSettings === void 0 ? void 0 : _this$agentSettings.outboundManualDefaultRingtime;
    }
  }, {
    key: "inboundSettings",
    get: function get() {
      return this.agentConfig.inboundSettings || {
        availableQueues: [],
        availableSkillProfiles: [],
        queues: [],
        skillProfile: {},
        availableRequeueQueues: []
      };
    }
  }, {
    key: "assignedQueue",
    get: function get() {
      return this.inboundSettings.queues;
    }
  }, {
    key: "agentPermissions",
    get: function get() {
      var _this$agentConfig2;
      return (_this$agentConfig2 = this.agentConfig) === null || _this$agentConfig2 === void 0 ? void 0 : _this$agentConfig2.agentPermissions;
    }
  }, {
    key: "availableQueues",
    get: function get() {
      return [{
        gateId: '-1',
        gateName: _i18n["default"].getString('default', this._deps.locale.currentLocale)
      }].concat(_toConsumableArray((0, _sortByName.sortByName)(_toConsumableArray(this.inboundSettings.availableQueues), 'gateName')));
    }
  }, {
    key: "availableRequeueQueues",
    get: function get() {
      return (0, _sortByName.sortByName)(_toConsumableArray(this.inboundSettings.availableRequeueQueues), 'groupName');
    }
  }, {
    key: "callerIds",
    get: function get() {
      return [{
        description: _i18n["default"].getString('default', this._deps.locale.currentLocale),
        number: '-1'
      }].concat(_toConsumableArray(this.agentSettings.callerIds.map(function (callerId) {
        var number = (0, _format["default"])({
          phoneNumber: callerId.number,
          countryCode: 'US'
        }) || callerId.number;
        return _objectSpread(_objectSpread({}, callerId), {}, {
          number: number
        });
      })));
    }
  }, {
    key: "availableCountries",
    get: function get() {
      var _this$agentConfig3;
      var _this$agentConfig$app = (_this$agentConfig3 = this.agentConfig) === null || _this$agentConfig3 === void 0 ? void 0 : _this$agentConfig3.applicationSettings,
        availableCountries = _this$agentConfig$app.availableCountries; // The default Engage Voice service area is `USA` and `CAN` with `+1` international code.
      var countriesUsaCan = availableCountries.filter(function (_ref11) {
        var countryId = _ref11.countryId;
        return DEFAULT_COUNTRIES.includes(countryId);
      });
      return countriesUsaCan.length > 0 ? countriesUsaCan : [{
        countryId: 'USA',
        countryName: _i18n["default"].getString('us', this._deps.locale.currentLocale)
      }];
    }
  }, {
    key: "isEvLogged",
    get: function get() {
      return this.loginStatus === _enums.loginStatus.LOGIN_SUCCESS;
    }
  }]);
  return EvAuth;
}(_core.RcModuleV2), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "connected", [_core.globalStorage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "agent", [_core.globalStorage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "agentId", [_core.globalStorage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setAgentId", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setAgentId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "availableQueues", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "availableQueues"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "availableRequeueQueues", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "availableRequeueQueues"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "callerIds", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "callerIds"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "availableCountries", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "availableCountries"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setConnectionData", [_dec6, _core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setConnectionData"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setAgent", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setAgent"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "clearAgentId", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "clearAgentId"), _class2.prototype), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "loginStatus", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setAuthSuccess", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setAuthSuccess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setLoginSuccess", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setLoginSuccess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setNotAuth", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setNotAuth"), _class2.prototype)), _class2)) || _class);
exports.EvAuth = EvAuth;
//# sourceMappingURL=EvAuth.js.map
