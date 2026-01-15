"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.reflect.get.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EvAuth = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
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
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _superPropGet(t, o, e, r) { var p = _get(_getPrototypeOf(1 & r ? t.prototype : t), o, e); return 2 & r && "function" == typeof p ? function (t) { return p.apply(e, t); } : p; }
function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t));); return t; }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
var DEFAULT_COUNTRIES = ['USA', 'CAN'];
var EvAuth = exports.EvAuth = (_dec = (0, _di.Module)({
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
  function EvAuth(deps) {
    var _this;
    _classCallCheck(this, EvAuth);
    _this = _callSuper(this, EvAuth, [{
      deps: deps,
      storageKey: 'EvAuth',
      enableGlobalCache: true
    }]);
    _this.connecting = false;
    _this._eventEmitter = new _events.EventEmitter();
    _this.canUserLogoutFn = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            return _context.a(2, true);
        }
      }, _callee);
    }));
    _this._logout = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.n) {
          case 0:
            _context2.n = 1;
            return _this._deps.auth.logout({
              dismissAllAlert: false
            });
          case 1:
            _this.setNotAuth(true);
          case 2:
            return _context2.a(2);
        }
      }, _callee2);
    }));
    _this._logoutByOtherTab = false;
    _this._authenticateResponseWatcher = null;
    _this._agentConfigWatcher = null;
    _initializerDefineProperty(_this, "connected", _descriptor, _this);
    _initializerDefineProperty(_this, "agent", _descriptor2, _this);
    _initializerDefineProperty(_this, "agentId", _descriptor3, _this);
    _initializerDefineProperty(_this, "loginStatus", _descriptor4, _this);
    _this.loginAgent = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
      var token,
        authenticateRes,
        _args3 = arguments;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.n) {
          case 0:
            token = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : _this._deps.auth.accessToken;
            _context3.n = 1;
            return _this.authenticateWithToken({
              rcAccessToken: token,
              shouldEmitAuthSuccess: false
            });
          case 1:
            authenticateRes = _context3.v;
            if (authenticateRes) {
              _context3.n = 2;
              break;
            }
            return _context3.a(2);
          case 2:
            _context3.n = 3;
            return _this.openSocketWithSelectedAgentId();
          case 3:
            return _context3.a(2);
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
  _inherits(EvAuth, _RcModuleV);
  return _createClass(EvAuth, [{
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
  }, {
    key: "setAgentId",
    value: function setAgentId(agentId) {
      this.agentId = agentId;
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
        availableCountries = _this$agentConfig$app.availableCountries;
      // The default Engage Voice service area is `USA` and `CAN` with `+1` international code.
      var countriesUsaCan = availableCountries.filter(function (_ref5) {
        var countryId = _ref5.countryId;
        return DEFAULT_COUNTRIES.includes(countryId);
      });
      return countriesUsaCan.length > 0 ? countriesUsaCan : [{
        countryId: 'USA',
        countryName: _i18n["default"].getString('us', this._deps.locale.currentLocale)
      }];
    }
  }, {
    key: "setConnectionData",
    value: function setConnectionData(_ref6) {
      var connected = _ref6.connected,
        agent = _ref6.agent;
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
    key: "isEvLogged",
    get: function get() {
      return this.loginStatus === _enums.loginStatus.LOGIN_SUCCESS;
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
      return _superPropGet(EvAuth, "_shouldInit", this, 3)([]) && this._deps.auth.loggedIn && this.connected;
    }
  }, {
    key: "onInitOnce",
    value: function onInitOnce() {
      var _this2 = this;
      this._deps.evSubscription.subscribe(_enums2.EvCallbackTypes.LOGOUT, /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              _this2._emitLogoutBefore();

              // if that is logout by same browser that will only trigger emit
              // if there is logout by other browser, that need redirect to home page,
              if (_this2._logoutByOtherTab) {
                _context4.n = 1;
                break;
              }
              _this2._deps.alert.info({
                message: _enums.messageTypes.FORCE_LOGOUT
              });
              _this2._logoutByOtherTab = false;
              _context4.n = 1;
              return _this2.newReconnect();
            case 1:
              return _context4.a(2);
          }
        }, _callee4);
      })));
    }
  }, {
    key: "onStateChange",
    value: function () {
      var _onStateChange = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
        var _this3 = this;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              if (!(this.tabManagerEnabled && this._deps.tabManager.ready)) {
                _context6.n = 1;
                break;
              }
              _context6.n = 1;
              return this._checkTabManagerEvent();
            case 1:
              if (!(this._deps.auth.loggedIn && this.loginStatus !== _enums.loginStatus.AUTH_SUCCESS && this.loginStatus !== _enums.loginStatus.LOGIN_SUCCESS && !this.connecting)) {
                _context6.n = 2;
                break;
              }
              this.connecting = true;
              // when login make sure the logoutByOtherTab is false
              this._logoutByOtherTab = false;
              _context6.n = 2;
              return this._deps.block.next(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
                return _regenerator().w(function (_context5) {
                  while (1) switch (_context5.n) {
                    case 0:
                      if (!_this3.agentId) {
                        _context5.n = 2;
                        break;
                      }
                      _context5.n = 1;
                      return _this3.loginAgent();
                    case 1:
                      _context5.n = 3;
                      break;
                    case 2:
                      _context5.n = 3;
                      return _this3.authenticateWithToken();
                    case 3:
                      return _context5.a(2);
                  }
                }, _callee5);
              })));
            case 2:
              return _context6.a(2);
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
      var _logout = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
        var agentId, logoutAgentResponse;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              _context7.n = 1;
              return this.canUserLogoutFn();
            case 1:
              if (_context7.v) {
                _context7.n = 2;
                break;
              }
              return _context7.a(2);
            case 2:
              console.log('logout~~');
              agentId = this.agentId;
              this.sendLogoutTabEvent();
              _context7.n = 3;
              return this._deps.block.next(this._logout);
            case 3:
              _context7.n = 4;
              return this.logoutAgent(agentId);
            case 4:
              logoutAgentResponse = _context7.v;
              // TODO: error handle when logout fail
              // TODO: when failed need tell other tab not logout => this._deps.tabManager.send(tabManagerEvents.LOGOUT);
              if (!logoutAgentResponse.message || logoutAgentResponse.message !== 'OK') {
                console.log('logoutAgent failed');
              }
              this.setConnectionData({
                connected: false,
                agent: null
              });
            case 5:
              return _context7.a(2);
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
      var _authenticateWithToken = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8() {
        var _ref9,
          _ref9$rcAccessToken,
          rcAccessToken,
          _ref9$tokenType,
          tokenType,
          _ref9$shouldEmitAuthS,
          shouldEmitAuthSuccess,
          authenticateResponse,
          agent,
          _args8 = arguments,
          _t,
          _t2;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.p = _context8.n) {
            case 0:
              _ref9 = _args8.length > 0 && _args8[0] !== undefined ? _args8[0] : {}, _ref9$rcAccessToken = _ref9.rcAccessToken, rcAccessToken = _ref9$rcAccessToken === void 0 ? this._deps.auth.accessToken : _ref9$rcAccessToken, _ref9$tokenType = _ref9.tokenType, tokenType = _ref9$tokenType === void 0 ? 'Bearer' : _ref9$tokenType, _ref9$shouldEmitAuthS = _ref9.shouldEmitAuthSuccess, shouldEmitAuthSuccess = _ref9$shouldEmitAuthS === void 0 ? true : _ref9$shouldEmitAuthS;
              console.log('authenticateWithToken', shouldEmitAuthSuccess);
              _context8.p = 1;
              this._deps.evClient.initSDK();
              _context8.n = 2;
              return this._deps.evClient.getAndHandleAuthenticateResponse(rcAccessToken, tokenType);
            case 2:
              authenticateResponse = _context8.v;
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
              return _context8.a(2, authenticateResponse);
            case 3:
              _context8.p = 3;
              _t = _context8.v;
              _t2 = _t.type;
              _context8.n = _t2 === _enums.messageTypes.NO_AGENT ? 4 : _t2 === _enums.messageTypes.CONNECT_TIMEOUT ? 5 : _t2 === _enums.messageTypes.UNEXPECTED_AGENT ? 5 : 6;
              break;
            case 4:
              this._deps.alert.warning({
                message: _t.type
              });
              return _context8.a(3, 7);
            case 5:
              this._deps.alert.danger({
                message: _t.type
              });
              return _context8.a(3, 7);
            case 6:
              this._deps.alert.danger({
                message: _enums.messageTypes.CONNECT_ERROR
              });
            case 7:
              _context8.n = 8;
              return this._logout();
            case 8:
              return _context8.a(2);
          }
        }, _callee8, this, [[1, 3]]);
      }));
      function authenticateWithToken() {
        return _authenticateWithToken.apply(this, arguments);
      }
      return authenticateWithToken;
    }()
  }, {
    key: "openSocketWithSelectedAgentId",
    value: function () {
      var _openSocketWithSelectedAgentId = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9() {
        var _this4 = this;
        var _ref0,
          _ref0$syncOtherTabs,
          syncOtherTabs,
          _ref0$retryOpenSocket,
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
          _args9 = arguments,
          _t3,
          _t4;
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.p = _context9.n) {
            case 0:
              _ref0 = _args9.length > 0 && _args9[0] !== undefined ? _args9[0] : {}, _ref0$syncOtherTabs = _ref0.syncOtherTabs, syncOtherTabs = _ref0$syncOtherTabs === void 0 ? false : _ref0$syncOtherTabs, _ref0$retryOpenSocket = _ref0.retryOpenSocket, retryOpenSocket = _ref0$retryOpenSocket === void 0 ? false : _ref0$retryOpenSocket;
              console.log('openSocketWithSelectedAgentId', syncOtherTabs, retryOpenSocket);
              _context9.p = 1;
              // TODO: here need check time when no message come back, that will block app.
              getAgentConfig = new Promise(function (resolve) {
                _this4._deps.evClient.on(_enums2.EvCallbackTypes.LOGIN_PHASE_1, resolve);
              });
              selectedAgentId = this.agentId;
              if (selectedAgentId) {
                _context9.n = 2;
                break;
              }
              throw new _EvTypeError.EvTypeError({
                type: _enums.messageTypes.NO_AGENT
              });
            case 2:
              _context9.n = 3;
              return this._deps.evClient.openSocket(selectedAgentId);
            case 3:
              openSocketResult = _context9.v;
              _context9.n = 4;
              return (0, _utils.sleep)(0);
            case 4:
              if (!openSocketResult.error) {
                _context9.n = 10;
                break;
              }
              console.log('retryOpenSocket~~', retryOpenSocket);
              if (!retryOpenSocket) {
                _context9.n = 9;
                break;
              }
              _context9.n = 5;
              return this._deps.auth.refreshToken();
            case 5:
              _yield$this$_deps$aut = _context9.v;
              access_token = _yield$this$_deps$aut.access_token;
              _context9.n = 6;
              return this.authenticateWithToken({
                rcAccessToken: access_token,
                shouldEmitAuthSuccess: false
              });
            case 6:
              authenticateRes = _context9.v;
              if (authenticateRes) {
                _context9.n = 7;
                break;
              }
              return _context9.a(2);
            case 7:
              _context9.n = 8;
              return this.openSocketWithSelectedAgentId({
                syncOtherTabs: syncOtherTabs
              });
            case 8:
              openSocketRes = _context9.v;
              return _context9.a(2, openSocketRes);
            case 9:
              throw new _EvTypeError.EvTypeError({
                type: _enums.messageTypes.OPEN_SOCKET_ERROR
              });
            case 10:
              // TODO： implement multiple sync back drop
              if (syncOtherTabs && this.tabManagerEnabled) {
                this._deps.tabManager.send(_enums.tabManagerEvents.OPEN_SOCKET);
              }
              _context9.n = 11;
              return getAgentConfig;
            case 11:
              agentConfig = _context9.v;
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
              return _context9.a(2, agentConfig);
            case 12:
              _context9.p = 12;
              _t3 = _context9.v;
              _t4 = _t3.type;
              _context9.n = _t4 === _enums.messageTypes.NO_AGENT ? 13 : _t4 === _enums.messageTypes.INVALID_BROWSER ? 14 : _t4 === _enums.messageTypes.OPEN_SOCKET_ERROR ? 14 : 15;
              break;
            case 13:
              this._deps.alert.warning({
                message: _t3.type
              });
              return _context9.a(3, 16);
            case 14:
              this._deps.alert.danger({
                message: _t3.type
              });
              return _context9.a(3, 16);
            case 15:
              this._deps.alert.danger({
                message: _enums.messageTypes.CONNECT_ERROR
              });
            case 16:
              _context9.n = 17;
              return this._logout();
            case 17:
              return _context9.a(2);
          }
        }, _callee9, this, [[1, 12]]);
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
      var _checkTabManagerEvent2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1() {
        var _this5 = this;
        var event, _t5;
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.n) {
            case 0:
              event = this._deps.tabManager.event;
              if (!event) {
                _context1.n = 6;
                break;
              }
              _t5 = event.name;
              _context1.n = _t5 === _enums.tabManagerEvents.LOGOUT ? 1 : _t5 === _enums.tabManagerEvents.OPEN_SOCKET ? 2 : _t5 === _enums.tabManagerEvents.LOGGED_OUT ? 4 : 5;
              break;
            case 1:
              this._logoutByOtherTab = true;
              return _context1.a(3, 6);
            case 2:
              _context1.n = 3;
              return this._deps.block.next(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0() {
                return _regenerator().w(function (_context0) {
                  while (1) switch (_context0.n) {
                    case 0:
                      _context0.n = 1;
                      return _this5.openSocketWithSelectedAgentId({
                        retryOpenSocket: true
                      });
                    case 1:
                      return _context0.a(2);
                  }
                }, _callee0);
              })));
            case 3:
              return _context1.a(3, 6);
            case 4:
              this.setNotAuth();
              return _context1.a(3, 6);
            case 5:
              return _context1.a(3, 6);
            case 6:
              return _context1.a(2);
          }
        }, _callee1, this);
      }));
      function _checkTabManagerEvent() {
        return _checkTabManagerEvent2.apply(this, arguments);
      }
      return _checkTabManagerEvent;
    }()
  }]);
}(_core.RcModuleV2), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "connected", [_core.globalStorage, _core.state], {
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
}), _applyDecoratedDescriptor(_class2.prototype, "setAuthSuccess", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setAuthSuccess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setLoginSuccess", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setLoginSuccess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setNotAuth", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setNotAuth"), _class2.prototype), _class2)) || _class);
//# sourceMappingURL=EvAuth.js.map
