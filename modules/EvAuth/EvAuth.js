"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EvAuth = void 0;

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.promise");

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

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.function.name");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.array.map");

var _core = require("@ringcentral-integration/core");

var _format = _interopRequireDefault(require("@ringcentral-integration/phone-number/lib/format"));

var _events = _interopRequireDefault(require("events"));

var _di = require("ringcentral-integration/lib/di");

var _enums = require("../../enums");

var _enums2 = require("../../lib/EvClient/enums");

var _sortByName = require("../../lib/sortByName");

var _trackEvents = require("../../lib/trackEvents");

var _i18n = _interopRequireDefault(require("./i18n"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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
  deps: ['EvClient', 'Auth', 'Storage', 'Block', 'Alert', 'Locale', 'RouterInteraction', 'EvSubscription', 'TabManager', {
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

      return (_this$_deps$tabManage = this._deps.tabManager) === null || _this$_deps$tabManage === void 0 ? void 0 : _this$_deps$tabManage._tabbie.enabled;
    }
  }]);

  function EvAuth(deps) {
    var _this;

    _classCallCheck(this, EvAuth);

    _this = _super.call(this, {
      deps: deps,
      enableCache: true,
      storageKey: 'EvAuth'
    });
    _this.connecting = void 0;
    _this._eventEmitter = new _events["default"]();
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

    _this.loginAgent = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var _agent;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;

              _this._deps.evClient.initSDK();

              _context2.next = 4;
              return _this._deps.evClient.loginAgent(_this._deps.auth.accessToken, 'Bearer');

            case 4:
              _agent = _context2.sent;

              _this.setConnectionData({
                connected: true,
                agent: _agent.data
              });

              _this._eventEmitter.emit(_enums.authStatus.LOGIN_SUCCESS, _agent);

              _context2.next = 21;
              break;

            case 9:
              _context2.prev = 9;
              _context2.t0 = _context2["catch"](0);
              _context2.t1 = _context2.t0.type;
              _context2.next = _context2.t1 === _enums.messageTypes.NO_AGENT ? 14 : _context2.t1 === _enums.messageTypes.CONNECT_TIMEOUT ? 16 : _context2.t1 === _enums.messageTypes.UNEXPECTED_AGENT ? 16 : _context2.t1 === _enums.messageTypes.INVALID_BROWSER ? 16 : _context2.t1 === _enums.messageTypes.OPEN_SOCKET_ERROR ? 16 : 18;
              break;

            case 14:
              _this._deps.alert.warning({
                message: _context2.t0.type
              });

              return _context2.abrupt("break", 19);

            case 16:
              _this._deps.alert.danger({
                message: _context2.t0.type
              });

              return _context2.abrupt("break", 19);

            case 18:
              _this._deps.alert.danger({
                message: _enums.messageTypes.CONNECT_ERROR
              });

            case 19:
              _context2.next = 21;
              return _this._logout();

            case 21:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 9]]);
    }));
    return _this;
  }

  _createClass(EvAuth, [{
    key: "setConnectionData",
    value: function setConnectionData(_ref4) {
      var connected = _ref4.connected,
          agent = _ref4.agent;
      this.agent = agent;
      this.connected = connected;
    }
  }, {
    key: "setAgent",
    value: function setAgent(agent) {
      this.agent = agent;
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

      this._deps.evSubscription.subscribe(_enums2.EvCallbackTypes.LOGOUT, /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _this2._emitLogoutBefore(); // if that is logout by same browser that will only trigger emit
                // if there is logout by other browser, that need redirect to home page,


                if (!_this2._logoutByOtherTab) {
                  _this2._deps.alert.info({
                    message: _enums.messageTypes.FORCE_LOGOUT
                  });

                  _this2._logoutByOtherTab = false;

                  _this2.newReconnect();
                }

              case 2:
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
                if (this.ready && this.tabManagerEnabled && this._deps.tabManager.ready) {
                  this._checkTabManagerEvent();
                }

                if (!(this._deps.auth.loggedIn && !this.connected && !this.connecting)) {
                  _context4.next = 7;
                  break;
                }

                this.connecting = true; // when login make sure the _logoutByOtherTab is false

                this._logoutByOtherTab = false;
                _context4.next = 6;
                return this.loginAgent();

              case 6:
                this.connecting = false;

              case 7:
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

                if (!(!logoutAgentResponse.message || logoutAgentResponse.message !== 'OK')) {
                  _context5.next = 14;
                  break;
                }

                console.log('logoutAgent failed');
                return _context5.abrupt("return");

              case 14:
                this.setConnectionData({
                  connected: false,
                  agent: null
                });

              case 15:
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
    key: "onLoginSuccess",
    value: function onLoginSuccess(callback) {
      this._eventEmitter.on(_enums.authStatus.LOGIN_SUCCESS, callback);
    }
  }, {
    key: "_emitLogoutBefore",
    value: function _emitLogoutBefore() {
      this._eventEmitter.emit(_enums.authStatus.LOGOUT_BEFORE);
    }
  }, {
    key: "_checkTabManagerEvent",
    value: function _checkTabManagerEvent() {
      var event = this._deps.tabManager.event;

      if (event) {
        // const data = event.args[0];
        switch (event.name) {
          case _enums.tabManagerEvents.LOGOUT:
            this._logoutByOtherTab = true;
            break;

          default:
            break;
        }
      }
    }
  }, {
    key: "agentId",
    get: function get() {
      var _this$agent, _this$agent$authentic, _this$agent$authentic2;

      return ((_this$agent = this.agent) === null || _this$agent === void 0 ? void 0 : (_this$agent$authentic = _this$agent.authenticateResponse) === null || _this$agent$authentic === void 0 ? void 0 : (_this$agent$authentic2 = _this$agent$authentic.agents[0]) === null || _this$agent$authentic2 === void 0 ? void 0 : _this$agent$authentic2.agentId) || '';
    }
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
    key: "autoAnswerCalls",
    get: function get() {
      return this.agentConfig.agentPermissions.defaultAutoAnswerOn;
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

      var countriesUsaCan = availableCountries.filter(function (_ref6) {
        var countryId = _ref6.countryId;
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
}), _applyDecoratedDescriptor(_class2.prototype, "availableQueues", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "availableQueues"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "availableRequeueQueues", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "availableRequeueQueues"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "callerIds", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "callerIds"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "availableCountries", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "availableCountries"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setConnectionData", [_dec6, _core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setConnectionData"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setAgent", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setAgent"), _class2.prototype)), _class2)) || _class);
exports.EvAuth = EvAuth;
//# sourceMappingURL=EvAuth.js.map
