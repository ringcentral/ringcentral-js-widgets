"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EvAuth = void 0;

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.is-array");

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

require("regenerator-runtime/runtime");

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.map");

var _core = require("@ringcentral-integration/core");

var _format = _interopRequireDefault(require("@ringcentral-integration/phone-number/lib/format"));

var _di = require("ringcentral-integration/lib/di");

var _events = _interopRequireDefault(require("events"));

var _enums = require("../../enums");

var _enums2 = require("../../lib/EvClient/enums");

var _sortByName = require("../../lib/sortByName");

var _i18n = _interopRequireDefault(require("./i18n"));

var _dec, _class, _class2, _descriptor, _descriptor2, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

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
  deps: ['EvClient', 'Auth', 'Storage', 'Alert', 'Locale', 'RouterInteraction', 'EvSubscription', {
    dep: 'EvAuthOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_RcModuleV) {
  _inherits(EvAuth, _RcModuleV);

  var _super = _createSuper(EvAuth);

  function EvAuth(_ref) {
    var _this;

    var auth = _ref.auth,
        alert = _ref.alert,
        locale = _ref.locale,
        storage = _ref.storage,
        evClient = _ref.evClient,
        evSubscription = _ref.evSubscription,
        routerInteraction = _ref.routerInteraction,
        _ref$enableCache = _ref.enableCache,
        enableCache = _ref$enableCache === void 0 ? true : _ref$enableCache;

    _classCallCheck(this, EvAuth);

    _this = _super.call(this, {
      modules: {
        auth: auth,
        alert: alert,
        locale: locale,
        storage: storage,
        evClient: evClient,
        evSubscription: evSubscription,
        routerInteraction: routerInteraction
      },
      enableCache: enableCache,
      storageKey: 'EvAuth'
    });
    _this.connecting = void 0;
    _this.disconnecting = void 0;
    _this._eventEmitter = new _events["default"]();

    _initializerDefineProperty(_this, "connected", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "agent", _descriptor2, _assertThisInitialized(_this));

    _this._getAvailableQueues = (0, _core.createSelector)(function () {
      return _this.inboundSettings.availableQueues;
    }, function (availableQueues) {
      return [{
        gateId: '-1',
        gateName: _i18n["default"].getString('default', _this._modules.locale.currentLocale)
      }].concat(_toConsumableArray((0, _sortByName.sortByName)(availableQueues, 'gateName')));
    });
    _this.getAvailableRequeueQueues = (0, _core.createSelector)(function () {
      return _this.inboundSettings.availableRequeueQueues;
    }, function (availableRequeueQueues) {
      return (0, _sortByName.sortByName)(availableRequeueQueues, 'groupName');
    });
    _this.getCallerIds = (0, _core.createSelector)(function () {
      return _this.agentSettings.callerIds;
    }, function (callerIds) {
      return [{
        description: _i18n["default"].getString('default', _this._modules.locale.currentLocale),
        number: '-1'
      }].concat(_toConsumableArray(callerIds.map(function (callerId) {
        var number = (0, _format["default"])({
          phoneNumber: callerId.number,
          countryCode: 'US'
        }) || callerId.number;
        return _objectSpread(_objectSpread({}, callerId), {}, {
          number: number
        });
      })));
    });
    _this.getAvailableCountries = (0, _core.createSelector)(function () {
      return _this.agentConfig.applicationSettings.availableCountries;
    }, function () {
      var availableCountries = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      // The default Engage Voice service area is `USA` and `CAN` with `+1` international code.
      var countriesUsaCan = availableCountries.filter(function (_ref2) {
        var countryId = _ref2.countryId;
        return DEFAULT_COUNTRIES.includes(countryId);
      });
      return countriesUsaCan.length > 0 ? countriesUsaCan : [{
        countryId: 'USA',
        countryName: _i18n["default"].getString('us', _this._modules.locale.currentLocale)
      }];
    });
    return _this;
  }

  _createClass(EvAuth, [{
    key: "setConnectionData",
    value: function setConnectionData(_ref3) {
      var connected = _ref3.connected,
          agent = _ref3.agent;
      this.state.agent = agent;
      this.state.connected = connected;
    }
  }, {
    key: "onInitOnce",
    value: function onInitOnce() {
      var _this2 = this;

      this._modules.evSubscription.subscribe(_enums2.EvCallbackTypes.LOGOUT, /*#__PURE__*/function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(data) {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  // TODO: check it about `data.message === 'OK'`?
                  // wait for fixing `LOGOUT` event missing issue about EV multiple socket
                  _this2._modules.auth.logout();

                case 1:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function (_x) {
          return _ref4.apply(this, arguments);
        };
      }());
    }
  }, {
    key: "onLogout",
    value: function onLogout(callback) {
      this._eventEmitter.on(_enums.authStatus.LOGOUT_BEFORE, callback);
    }
  }, {
    key: "_onLogout",
    value: function _onLogout() {
      this._eventEmitter.emit(_enums.authStatus.LOGOUT_BEFORE);
    }
  }, {
    key: "disconnect",
    value: function () {
      var _disconnect = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(agentId) {
        var logoutAgentResponse;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this._onLogout(); // ensure that multi-tabs update state effect.


                if (agentId) {
                  _context2.next = 4;
                  break;
                }

                console.log('agentId does not exist');
                return _context2.abrupt("return");

              case 4:
                _context2.prev = 4;
                _context2.next = 7;
                return this._modules.evClient.logoutAgent(agentId);

              case 7:
                logoutAgentResponse = _context2.sent;

                if (!(!logoutAgentResponse.message || logoutAgentResponse.message !== 'OK')) {
                  _context2.next = 11;
                  break;
                }

                // TODO: error handle
                console.log('logoutAgent failed');
                return _context2.abrupt("return");

              case 11:
                this.setConnectionData({
                  connected: false,
                  agent: {}
                }); // create a new AgentSDK instance

                this._modules.evClient.onInit();

                _context2.next = 18;
                break;

              case 15:
                _context2.prev = 15;
                _context2.t0 = _context2["catch"](4);
                // TODO: error handle
                console.error('disconnect failed');

              case 18:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[4, 15]]);
      }));

      function disconnect(_x2) {
        return _disconnect.apply(this, arguments);
      }

      return disconnect;
    }()
  }, {
    key: "loginAgent",
    value: function () {
      var _loginAgent = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var agent;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this._modules.evClient.loginAgent(this._modules.auth.accessToken, 'Bearer');

              case 2:
                agent = _context3.sent;
                this.setConnectionData({
                  connected: true,
                  agent: agent
                });

                this._onLoginSuccess(agent);

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function loginAgent() {
        return _loginAgent.apply(this, arguments);
      }

      return loginAgent;
    }()
  }, {
    key: "onLoginSuccess",
    value: function onLoginSuccess(callback) {
      this._eventEmitter.on(_enums.authStatus.LOGIN_SUCCESS, callback);
    }
  }, {
    key: "_onLoginSuccess",
    value: function _onLoginSuccess(agent) {
      this._eventEmitter.emit(_enums.authStatus.LOGIN_SUCCESS, agent);
    }
  }, {
    key: "connect",
    value: function () {
      var _connect = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return this.loginAgent();

              case 3:
                _context4.next = 17;
                break;

              case 5:
                _context4.prev = 5;
                _context4.t0 = _context4["catch"](0);
                _context4.t1 = _context4.t0.type;
                _context4.next = _context4.t1 === _enums.messageTypes.NO_AGENT ? 10 : _context4.t1 === _enums.messageTypes.CONNECT_TIMEOUT ? 12 : _context4.t1 === _enums.messageTypes.UNEXPECTED_AGENT ? 12 : _context4.t1 === _enums.messageTypes.INVALID_BROWSER ? 12 : _context4.t1 === _enums.messageTypes.OPEN_SOCKET_ERROR ? 12 : 14;
                break;

              case 10:
                this._modules.alert.warning({
                  message: _context4.t0.type
                });

                return _context4.abrupt("break", 15);

              case 12:
                this._modules.alert.danger({
                  message: _context4.t0.type
                });

                return _context4.abrupt("break", 15);

              case 14:
                this._modules.alert.danger({
                  message: _enums.messageTypes.CONNECT_ERROR
                });

              case 15:
                _context4.next = 17;
                return this._modules.auth.logout({
                  dismissAllAlert: false
                });

              case 17:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 5]]);
      }));

      function connect() {
        return _connect.apply(this, arguments);
      }

      return connect;
    }()
  }, {
    key: "_shouldInit",
    value: function _shouldInit() {
      return _get(_getPrototypeOf(EvAuth.prototype), "_shouldInit", this).call(this) && this._modules.auth.loggedIn && this.connected;
    }
  }, {
    key: "onStateChange",
    value: function () {
      var _onStateChange = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!(this._modules.auth.loggedIn && !this.connected && !this.connecting)) {
                  _context5.next = 11;
                  break;
                }

                this.connecting = true;
                _context5.prev = 2;
                _context5.next = 5;
                return this.connect();

              case 5:
                _context5.next = 10;
                break;

              case 7:
                _context5.prev = 7;
                _context5.t0 = _context5["catch"](2);
                console.error(_context5.t0);

              case 10:
                this.connecting = false;

              case 11:
                if (!(!this._modules.auth.loggedIn && this.connected && !this.disconnecting)) {
                  _context5.next = 16;
                  break;
                }

                this.disconnecting = true;
                _context5.next = 15;
                return this.disconnect(this.agentId);

              case 15:
                this.disconnecting = false;

              case 16:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[2, 7]]);
      }));

      function onStateChange() {
        return _onStateChange.apply(this, arguments);
      }

      return onStateChange;
    }()
  }, {
    key: "agentId",
    get: function get() {
      var _this$agent$data, _this$agent$data$agen;

      return ((_this$agent$data = this.agent.data) === null || _this$agent$data === void 0 ? void 0 : (_this$agent$data$agen = _this$agent$data.agents[0]) === null || _this$agent$data$agen === void 0 ? void 0 : _this$agent$data$agen.agentId) || '';
    }
  }, {
    key: "isFreshLogin",
    get: function get() {
      return this._modules.auth.isFreshLogin;
    }
  }, {
    key: "outboundManualDefaultRingtime",
    get: function get() {
      return this.agentSettings.outboundManualDefaultRingtime;
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
    key: "agentConfig",
    get: function get() {
      return this.agent.agentConfig;
    }
  }, {
    key: "inboundSettings",
    get: function get() {
      return this.agentConfig.inboundSettings;
    }
  }, {
    key: "agentSettings",
    get: function get() {
      return this.agentConfig.agentSettings;
    }
  }, {
    key: "autoAnswerCalls",
    get: function get() {
      return this.agentSettings.autoAnswerCalls;
    }
  }, {
    key: "availableQueues",
    get: function get() {
      return this._getAvailableQueues();
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
    return {};
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setConnectionData", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setConnectionData"), _class2.prototype)), _class2)) || _class);
exports.EvAuth = EvAuth;
//# sourceMappingURL=EvAuth.js.map
