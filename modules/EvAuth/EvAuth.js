"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EvAuth = void 0;

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.reflect.get");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.array.map");

var _core = require("@ringcentral-integration/core");

var _format = _interopRequireDefault(require("@ringcentral-integration/phone-number/lib/format"));

var _events = require("events");

var _di = require("ringcentral-integration/lib/di");

var _sleep = _interopRequireDefault(require("ringcentral-integration/lib/sleep"));

var _enums = require("../../enums");

var _enums2 = require("../../lib/EvClient/enums");

var _EvTypeError = require("../../lib/EvTypeError");

var _sortByName = require("../../lib/sortByName");

var _trackEvents = require("../../lib/trackEvents");

var _i18n = _interopRequireDefault(require("./i18n"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

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

var DEFAULT_COUNTRIES = ['USA', 'CAN'];
var EvAuth = (_dec = (0, _di.Module)({
  name: 'EvAuth',
  deps: ['EvClient', 'Auth', 'Storage', 'Block', 'Alert', 'Locale', 'RouterInteraction', 'EvSubscription', 'TabManager', 'GlobalStorage', {
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
}), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_RcModuleV) {
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
      enableCache: true,
      storageKey: 'EvAuth',
      enableGlobalCache: true
    });
    _this.connecting = void 0;
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

    _this._logout = function () {
      return _this._deps.auth.logout({
        dismissAllAlert: false
      });
    };

    _this._logoutByOtherTab = false;

    _initializerDefineProperty(_this, "connected", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "agent", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "agentId", _descriptor3, _assertThisInitialized(_this));

    _this.loginAgent = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var token,
          authenticateRes,
          _args2 = arguments;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              token = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : _this._deps.auth.accessToken;
              _context2.next = 3;
              return _this.authenticateWithToken(token);

            case 3:
              authenticateRes = _context2.sent;

              if (authenticateRes) {
                _context2.next = 6;
                break;
              }

              return _context2.abrupt("return");

            case 6:
              _context2.next = 8;
              return _this.openSocketWithSelectedAgentId();

            case 8:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));
    return _this;
  }

  _createClass(EvAuth, [{
    key: "setAgentId",
    value: function setAgentId(agentId) {
      var syncTabs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      this.agentId = agentId;

      if (syncTabs) {
        this._deps.tabManager.send(_enums.tabManagerEvents.SET_AGENT_ID, agentId);
      }
    }
  }, {
    key: "setConnectionData",
    value: function setConnectionData(_ref4) {
      var connected = _ref4.connected,
          agent = _ref4.agent;
      // ! agent must be set before connected
      this.agent = agent;
      this.connected = connected;
    }
  }, {
    key: "setConnected",
    value: function setConnected(connected) {
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
      var syncTabs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      this.agentId = '';

      if (syncTabs) {
        this._deps.tabManager.send(_enums.tabManagerEvents.SET_AGENT_ID, '');
      }
    }
  }, {
    key: "_shouldInit",
    value: function _shouldInit() {
      return _get(_getPrototypeOf(EvAuth.prototype), "_shouldInit", this).call(this) && this._deps.auth.loggedIn && this.connected;
    }
  }, {
    key: "onBeforeRCLogout",
    value: function onBeforeRCLogout() {
      console.log('_onBeforeRCLogout~');
      this.clearAgentId();
    }
  }, {
    key: "onInitOnce",
    value: function onInitOnce() {
      var _this2 = this;

      this._deps.auth.addBeforeLogoutHandler(function () {
        return _this2.onBeforeRCLogout();
      });

      this._deps.evSubscription.subscribe(_enums2.EvCallbackTypes.LOGOUT, /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _this2._emitLogoutBefore(); // if that is logout by same browser that will only trigger emit
                // if there is logout by other browser, that need redirect to home page,


                if (_this2._logoutByOtherTab) {
                  _context3.next = 6;
                  break;
                }

                _this2._deps.alert.info({
                  message: _enums.messageTypes.FORCE_LOGOUT
                });

                _this2._logoutByOtherTab = false;
                _context3.next = 6;
                return _this2.newReconnect();

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      })));
    }
  }, {
    key: "onStateChange",
    value: function () {
      var _onStateChange = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!(this.tabManagerEnabled && this._deps.tabManager.ready)) {
                  _context4.next = 3;
                  break;
                }

                _context4.next = 3;
                return this._checkTabManagerEvent();

              case 3:
                if (!(this._deps.auth.loggedIn && !this.connected && !this.connecting)) {
                  _context4.next = 14;
                  break;
                }

                console.log('evAuth onStateChange~~');
                this.connecting = true; // when login make sure the logoutByOtherTab is false

                this._logoutByOtherTab = false;

                if (!this.agentId) {
                  _context4.next = 12;
                  break;
                }

                _context4.next = 10;
                return this.loginAgent();

              case 10:
                _context4.next = 14;
                break;

              case 12:
                _context4.next = 14;
                return this.authenticateWithToken();

              case 14:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
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
      var _logout = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var agentId, logoutAgentResponse;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.canUserLogoutFn();

              case 2:
                if (_context5.sent) {
                  _context5.next = 4;
                  break;
                }

                return _context5.abrupt("return");

              case 4:
                agentId = this.agentId;
                this.sendLogoutTabEvent();
                _context5.next = 8;
                return this._deps.block.next(this._logout);

              case 8:
                _context5.next = 10;
                return this.logoutAgent(agentId);

              case 10:
                logoutAgentResponse = _context5.sent;

                // TODO: error handle when logout fail
                // TODO: when failed need tell other tab not logout => this._deps.tabManager.send(tabManagerEvents.LOGOUT);
                if (!logoutAgentResponse.message || logoutAgentResponse.message !== 'OK') {
                  console.log('logoutAgent failed');
                }

                this.setConnectionData({
                  connected: false,
                  agent: null
                });

              case 13:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
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
      this._eventEmitter.on(_enums.authStatus.LOGOUT_BEFORE, callback);
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
      var _authenticateWithToken = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var rcAccessToken,
            tokenType,
            authenticateResponse,
            agent,
            _args6 = arguments;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                rcAccessToken = _args6.length > 0 && _args6[0] !== undefined ? _args6[0] : this._deps.auth.accessToken;
                tokenType = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : 'Bearer';
                _context6.prev = 2;

                this._deps.evClient.initSDK();

                _context6.next = 6;
                return this._deps.evClient.getAndHandleAuthenticateResponse(rcAccessToken, tokenType);

              case 6:
                authenticateResponse = _context6.sent;
                agent = _objectSpread(_objectSpread({}, this.agent), {}, {
                  authenticateResponse: authenticateResponse
                });
                this.setAgent(agent);

                this._emitAuthSuccess();

                return _context6.abrupt("return", authenticateResponse);

              case 13:
                _context6.prev = 13;
                _context6.t0 = _context6["catch"](2);
                _context6.t1 = _context6.t0.type;
                _context6.next = _context6.t1 === _enums.messageTypes.NO_AGENT ? 18 : _context6.t1 === _enums.messageTypes.CONNECT_TIMEOUT ? 20 : _context6.t1 === _enums.messageTypes.UNEXPECTED_AGENT ? 20 : 22;
                break;

              case 18:
                this._deps.alert.warning({
                  message: _context6.t0.type
                });

                return _context6.abrupt("break", 23);

              case 20:
                this._deps.alert.danger({
                  message: _context6.t0.type
                });

                return _context6.abrupt("break", 23);

              case 22:
                this._deps.alert.danger({
                  message: _enums.messageTypes.CONNECT_ERROR
                });

              case 23:
                _context6.next = 25;
                return this._logout();

              case 25:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[2, 13]]);
      }));

      function authenticateWithToken() {
        return _authenticateWithToken.apply(this, arguments);
      }

      return authenticateWithToken;
    }()
  }, {
    key: "openSocketWithSelectedAgentId",
    value: function () {
      var _openSocketWithSelectedAgentId = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        var _this3 = this;

        var _ref6,
            _ref6$syncOtherTabs,
            syncOtherTabs,
            _ref6$retryOpenSocket,
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
            _args7 = arguments;

        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _ref6 = _args7.length > 0 && _args7[0] !== undefined ? _args7[0] : {}, _ref6$syncOtherTabs = _ref6.syncOtherTabs, syncOtherTabs = _ref6$syncOtherTabs === void 0 ? false : _ref6$syncOtherTabs, _ref6$retryOpenSocket = _ref6.retryOpenSocket, retryOpenSocket = _ref6$retryOpenSocket === void 0 ? false : _ref6$retryOpenSocket;
                _context7.prev = 1;
                // TODO: here need check time when no message come back, that will block app.
                getAgentConfig = new Promise(function (resolve) {
                  _this3._deps.evClient.on(_enums2.EvCallbackTypes.LOGIN_PHASE_1, resolve);
                });
                selectedAgentId = this.agentId;
                console.log('selectedAgentId~~~', selectedAgentId);

                if (selectedAgentId) {
                  _context7.next = 7;
                  break;
                }

                throw new _EvTypeError.EvTypeError({
                  type: _enums.messageTypes.NO_AGENT
                });

              case 7:
                _context7.next = 9;
                return this._deps.evClient.openSocket(selectedAgentId);

              case 9:
                openSocketResult = _context7.sent;
                _context7.next = 12;
                return (0, _sleep["default"])(0);

              case 12:
                if (!openSocketResult.error) {
                  _context7.next = 29;
                  break;
                }

                console.log('retryOpenSocket~~', retryOpenSocket);

                if (!retryOpenSocket) {
                  _context7.next = 28;
                  break;
                }

                _context7.next = 17;
                return this._deps.auth.refreshToken();

              case 17:
                _yield$this$_deps$aut = _context7.sent;
                access_token = _yield$this$_deps$aut.access_token;
                _context7.next = 21;
                return this.authenticateWithToken(access_token);

              case 21:
                authenticateRes = _context7.sent;

                if (authenticateRes) {
                  _context7.next = 24;
                  break;
                }

                return _context7.abrupt("return");

              case 24:
                _context7.next = 26;
                return this.openSocketWithSelectedAgentId({
                  syncOtherTabs: syncOtherTabs
                });

              case 26:
                openSocketRes = _context7.sent;
                return _context7.abrupt("return", openSocketRes);

              case 28:
                throw new _EvTypeError.EvTypeError({
                  type: _enums.messageTypes.OPEN_SOCKET_ERROR
                });

              case 29:
                // TODO： implement multiple sync back drop
                if (syncOtherTabs && this.tabManagerEnabled) {
                  this._deps.tabManager.send(_enums.tabManagerEvents.OPEN_SOCKET);
                }

                _context7.next = 32;
                return getAgentConfig;

              case 32:
                agentConfig = _context7.sent;
                agent = _objectSpread(_objectSpread({}, this.agent), {}, {
                  agentConfig: agentConfig
                });
                this.setConnectionData({
                  agent: agent,
                  connected: true
                });
                this.connecting = false;

                this._emitLoginSuccess();

                return _context7.abrupt("return", agentConfig);

              case 40:
                _context7.prev = 40;
                _context7.t0 = _context7["catch"](1);
                _context7.t1 = _context7.t0.type;
                _context7.next = _context7.t1 === _enums.messageTypes.NO_AGENT ? 45 : _context7.t1 === _enums.messageTypes.INVALID_BROWSER ? 47 : _context7.t1 === _enums.messageTypes.OPEN_SOCKET_ERROR ? 47 : 49;
                break;

              case 45:
                this._deps.alert.warning({
                  message: _context7.t0.type
                });

                return _context7.abrupt("break", 50);

              case 47:
                this._deps.alert.danger({
                  message: _context7.t0.type
                });

                return _context7.abrupt("break", 50);

              case 49:
                this._deps.alert.danger({
                  message: _enums.messageTypes.CONNECT_ERROR
                });

              case 50:
                _context7.next = 52;
                return this._logout();

              case 52:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this, [[1, 40]]);
      }));

      function openSocketWithSelectedAgentId() {
        return _openSocketWithSelectedAgentId.apply(this, arguments);
      }

      return openSocketWithSelectedAgentId;
    }()
  }, {
    key: "onLoginSuccess",
    value: function onLoginSuccess(callback) {
      this._eventEmitter.on(_enums.authStatus.LOGIN_SUCCESS, callback);
    }
  }, {
    key: "onceLoginSuccess",
    value: function onceLoginSuccess(callback) {
      this._eventEmitter.once(_enums.authStatus.LOGIN_SUCCESS, callback);
    }
  }, {
    key: "onAuthSuccess",
    value: function onAuthSuccess(callback) {
      this._eventEmitter.on(_enums.authStatus.AUTH_SUCCESS, callback);
    }
  }, {
    key: "_emitLogoutBefore",
    value: function _emitLogoutBefore() {
      this._eventEmitter.emit(_enums.authStatus.LOGOUT_BEFORE);
    }
  }, {
    key: "_emitLoginSuccess",
    value: function _emitLoginSuccess() {
      this._eventEmitter.emit(_enums.authStatus.LOGIN_SUCCESS);
    }
  }, {
    key: "_emitAuthSuccess",
    value: function _emitAuthSuccess() {
      console.log('_emitAuthSuccess~~');

      this._eventEmitter.emit(_enums.authStatus.AUTH_SUCCESS);
    }
  }, {
    key: "_checkTabManagerEvent",
    value: function () {
      var _checkTabManagerEvent2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
        var _this4 = this;

        var event, data;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                event = this._deps.tabManager.event;

                if (!event) {
                  _context9.next = 15;
                  break;
                }

                data = event.args[0];
                _context9.t0 = event.name;
                _context9.next = _context9.t0 === _enums.tabManagerEvents.LOGOUT ? 6 : _context9.t0 === _enums.tabManagerEvents.OPEN_SOCKET ? 8 : _context9.t0 === _enums.tabManagerEvents.SET_AGENT_ID ? 12 : 14;
                break;

              case 6:
                this._logoutByOtherTab = true;
                return _context9.abrupt("break", 15);

              case 8:
                console.log('tabManagerEvents.OPEN_SOCKET~~');
                _context9.next = 11;
                return this._deps.block.next( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
                  return regeneratorRuntime.wrap(function _callee8$(_context8) {
                    while (1) {
                      switch (_context8.prev = _context8.next) {
                        case 0:
                          _context8.next = 2;
                          return _this4.openSocketWithSelectedAgentId({
                            retryOpenSocket: true
                          });

                        case 2:
                        case "end":
                          return _context8.stop();
                      }
                    }
                  }, _callee8);
                })));

              case 11:
                return _context9.abrupt("break", 15);

              case 12:
                this.setAgentId(data);
                return _context9.abrupt("break", 15);

              case 14:
                return _context9.abrupt("break", 15);

              case 15:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
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
      return this.agentConfig.agentSettings;
    }
  }, {
    key: "outboundManualDefaultRingtime",
    get: function get() {
      return this.agentSettings.outboundManualDefaultRingtime;
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
      return this.agentConfig.agentPermissions;
    }
  }, {
    key: "availableQueues",
    get: function get() {
      return [{
        gateId: '-1',
        gateName: _i18n["default"].getString('default', this._deps.locale.currentLocale)
      }].concat(_toConsumableArray((0, _sortByName.sortByName)(this.inboundSettings.availableQueues, 'gateName')));
    }
  }, {
    key: "availableRequeueQueues",
    get: function get() {
      return (0, _sortByName.sortByName)(this.inboundSettings.availableRequeueQueues, 'groupName');
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
      var availableCountries = this.agentConfig.applicationSettings.availableCountries; // The default Engage Voice service area is `USA` and `CAN` with `+1` international code.

      var countriesUsaCan = availableCountries.filter(function (_ref8) {
        var countryId = _ref8.countryId;
        return DEFAULT_COUNTRIES.includes(countryId);
      });
      return countriesUsaCan.length > 0 ? countriesUsaCan : [{
        countryId: 'USA',
        countryName: _i18n["default"].getString('us', this._deps.locale.currentLocale)
      }];
    }
  }]);

  return EvAuth;
}(_core.RcModuleV2), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "connected", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "agent", [_core.storage, _core.state], {
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
}), _applyDecoratedDescriptor(_class2.prototype, "setAgentId", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setAgentId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "availableQueues", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "availableQueues"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "availableRequeueQueues", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "availableRequeueQueues"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "callerIds", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "callerIds"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "availableCountries", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "availableCountries"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setConnectionData", [_dec6, _core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setConnectionData"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setConnected", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setConnected"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setAgent", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setAgent"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "clearAgentId", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "clearAgentId"), _class2.prototype)), _class2)) || _class);
exports.EvAuth = EvAuth;
//# sourceMappingURL=EvAuth.js.map
