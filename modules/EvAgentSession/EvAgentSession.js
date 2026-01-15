"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.is-array.js");
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
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EvAgentSession = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.some.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/web.timers.js");
var _di = require("@ringcentral-integration/commons/lib/di");
var _utils = require("@ringcentral-integration/commons/utils");
var _core = require("@ringcentral-integration/core");
var _phoneNumber = require("@ringcentral-integration/phone-number");
var _events = require("events");
var _ramda = require("ramda");
var _enums = require("../../enums");
var _enums2 = require("../../lib/EvClient/enums");
var _tabLife = require("../../lib/tabLife");
var _trackEvents = require("../../lib/trackEvents");
var _i18n = _interopRequireDefault(require("./i18n"));
var _tabManagerEnabled = require("./tabManagerEnabled.decorator");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor0;
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
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
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
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
var ACCEPTABLE_LOGIN_TYPES = [_enums.loginTypes.integratedSoftphone, _enums.loginTypes.RC_PHONE, _enums.loginTypes.externalPhone];
var DEFAULT_LOGIN_TYPE = _enums.loginTypes.integratedSoftphone;
var NONE = _enums.dropDownOptions.None;

// ! wait all tab is logout complete, server has some delay after logout
var WAIT_EV_SERVER_ROLLBACK_DELAY = 2000;
var DEFAULT_FORM_GROUP = {
  selectedInboundQueueIds: [],
  loginType: DEFAULT_LOGIN_TYPE,
  selectedSkillProfileId: NONE,
  extensionNumber: '',
  autoAnswer: false
};
var EvAgentSession = exports.EvAgentSession = (_dec = (0, _di.Module)({
  name: 'EvAgentSession',
  deps: ['EvClient', 'Auth', 'EvAuth', 'EvCallDataSource', 'Alert', 'Auth', 'Locale', 'Presence', 'RouterInteraction', 'ModalUI', 'Block', 'Beforeunload', 'Storage', {
    dep: 'TabManager',
    optional: true
  }, {
    dep: 'EvAgentSessionOptions',
    optional: true
  }]
}), _dec2 = (0, _tabManagerEnabled.tabManagerEnabled)(), _dec3 = (0, _tabManagerEnabled.tabManagerEnabled)(), _dec4 = (0, _core.computed)(function (that) {
  return [that._deps.locale.currentLocale];
}), _dec5 = (0, _core.computed)(function (that) {
  return [that._deps.evAuth.agentConfig, that._deps.auth.isFreshLogin];
}), _dec6 = (0, _core.computed)(function (that) {
  return [that.skillProfileList];
}), _dec7 = (0, _core.computed)(function (that) {
  return [that._deps.evAuth.agent, that._deps.locale.currentLocale];
}), _dec8 = (0, _core.computed)(function (that) {
  return [that.skillProfileList, that.selectedSkillProfileId];
}), _dec9 = (0, _core.computed)(function (that) {
  return [that.inboundQueues, that.selectedInboundQueueIds];
}), _dec0 = (0, _core.track)(function (_, type) {
  return [_trackEvents.trackEvents.agentSessionSetLoginType, {
    value: type
  }];
}), _dec1 = (0, _core.track)(function (_, skillProfileId) {
  return [_trackEvents.trackEvents.agentSessionSetSkillProfileId, {
    value: skillProfileId
  }];
}), _dec10 = (0, _core.track)(function (_, ids) {
  return [_trackEvents.trackEvents.agentSessionSetInboundQueueIds, {
    value: ids
  }];
}), _dec11 = (0, _core.track)(function (_, takingCall) {
  return [_trackEvents.trackEvents.agentSessionSetTakingCall, {
    value: takingCall
  }];
}), _dec12 = (0, _core.track)(function (_, autoAnswer) {
  return [_trackEvents.trackEvents.agentSessionSetAutoAnswer, {
    value: autoAnswer
  }];
}), _dec13 = (0, _core.computed)(function (that) {
  return [that.selectedInboundQueueIds, that.selectedSkillProfileId, that.loginType, that.extensionNumber, that.formGroup];
}), _dec14 = (0, _tabManagerEnabled.tabManagerEnabled)(), _dec15 = (0, _tabManagerEnabled.tabManagerEnabled)(), _dec16 = (0, _core.computed)(function (that) {
  return [that._deps.evAuth.isEvLogged, that.ready];
}), _dec17 = (0, _tabManagerEnabled.tabManagerEnabled)(), _dec18 = (0, _tabManagerEnabled.tabManagerEnabled)(), _dec19 = (0, _core.track)(function (that) {
  return [_trackEvents.trackEvents.agentSessionConfigureAgent, {
    'Voice Connection': that.loginType,
    'Persistent Voice Connection': that.takingCall,
    'Skill Profile': that.selectedSkillProfile,
    'Inbound Queues': that.selectedInboundQueues,
    'Auto Answer': that.autoAnswer
  }];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  function EvAgentSession(deps) {
    var _this;
    _classCallCheck(this, EvAgentSession);
    _this = _callSuper(this, EvAgentSession, [{
      deps: deps,
      enableCache: true,
      storageKey: 'EvAgentSession'
    }]);
    // ! that onceLoginSuccess for get event before onInitOnce.
    _this.isForceLogin = false;
    _this.isReconnected = false;
    _this.isAgentUpdating = false;
    _this._isReConfiguring = false;
    _this._autoConfigureRetryTimes = 0;
    _this._eventEmitter = new _events.EventEmitter();
    _this._loginPromise = void 0;
    _this._updateSessionBlockId = void 0;
    _this._isLogin = false;
    _this._tabConfigWorking = new _tabLife.TabLife("".concat(_this._deps.tabManager.prefix, "sessionConfig_working"));
    _this._tabConfigSuccess = new _tabLife.TabLife("".concat(_this._deps.tabManager.prefix, "sessionConfig_success"));
    _initializerDefineProperty(_this, "selectedSkillProfileId", _descriptor, _this);
    _initializerDefineProperty(_this, "selectedInboundQueueIds", _descriptor2, _this);
    _initializerDefineProperty(_this, "loginType", _descriptor3, _this);
    _initializerDefineProperty(_this, "extensionNumber", _descriptor4, _this);
    _initializerDefineProperty(_this, "takingCall", _descriptor5, _this);
    _initializerDefineProperty(_this, "autoAnswer", _descriptor6, _this);
    _initializerDefineProperty(_this, "configured", _descriptor7, _this);
    _initializerDefineProperty(_this, "configSuccess", _descriptor8, _this);
    _initializerDefineProperty(_this, "formGroup", _descriptor9, _this);
    _initializerDefineProperty(_this, "accessToken", _descriptor0, _this);
    _this._mainTabBeforeunloadHandler = function () {
      console.log('_mainTabBeforeunloadHandler~~', _this._deps.tabManager.hasMultipleTabs, _this.isMainTab, _this._deps.tabManager.firstTabIdExcludeMainTab);
      if (_this._deps.tabManager.hasMultipleTabs && _this.isMainTab && _this._deps.tabManager.firstTabIdExcludeMainTab) {
        return true;
      }
      return false;
    };
    _this._mainTabAfterUnloadHandler = function () {
      console.log('_mainTabAfterUnloadHandler~~', _this._deps.tabManager.firstTabIdExcludeMainTab);
      _this._deps.evCallDataSource.changeCallsLimited(false);
      if (!_this.isMainTab) return;
      var firstTabIdExcludeMainTab = _this._deps.tabManager.firstTabIdExcludeMainTab;
      _this._deps.tabManager.setMainTabId(firstTabIdExcludeMainTab);
      _this._sendTabManager(_enums.tabManagerEvents.MAIN_TAB_WILL_UNLOAD, firstTabIdExcludeMainTab);
    };
    _this._deps.evAuth.onceLoginSuccess(function () {
      // when that is seconds time get onLoginSuccess
      console.log('----------onLoginSuccess1');
      _this._isLogin = true;
    });
    // ! logout event should in constructor, when logout that will not call init.
    _this._deps.evAuth.beforeAgentLogout(function () {
      _this._resetAllState();
    });
    _this._deps.presence.beforeunloadHandler = function () {
      return _this.shouldBlockBrowser;
    };
    (0, _core.watch)(_this, function () {
      return _this.configSuccess;
    }, function (configSuccess) {
      if (configSuccess) {
        _this._emitConfigSuccess();
      }
    });
    return _this;
  }
  _inherits(EvAgentSession, _RcModuleV);
  return _createClass(EvAgentSession, [{
    key: "_configSuccessAlive",
    value: function _configSuccessAlive() {
      this._tabConfigSuccess.alive();
    }
  }, {
    key: "_configWorkingAlive",
    value: function _configWorkingAlive() {
      this._tabConfigWorking.alive();
    }
  }, {
    key: "isConfigTabAlive",
    value: function () {
      var _isConfigTabAlive = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var _this$_tabConfigSucce;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              return _context.a(2, !this.tabManagerEnabled || ((_this$_tabConfigSucce = this._tabConfigSuccess) === null || _this$_tabConfigSucce === void 0 ? void 0 : _this$_tabConfigSucce.isAlive()));
          }
        }, _callee, this);
      }));
      function isConfigTabAlive() {
        return _isConfigTabAlive.apply(this, arguments);
      }
      return isConfigTabAlive;
    }()
  }, {
    key: "shouldBlockBrowser",
    get: function get() {
      // when there is not integrated softphone and not has multiple tabs
      return !this.isIntegratedSoftphone && !this.hasMultipleTabs;
    }
  }, {
    key: "isExternalPhone",
    get: function get() {
      return this.formGroup.loginType === _enums.loginTypes.externalPhone;
    }
  }, {
    key: "isIntegratedSoftphone",
    get: function get() {
      return this.loginType === _enums.loginTypes.integratedSoftphone;
    }
  }, {
    key: "localStorage",
    get: function get() {
      var _window;
      return (_window = window) === null || _window === void 0 ? void 0 : _window.localStorage;
    }
  }, {
    key: "tabManagerEnabled",
    get: function get() {
      var _this$_deps$tabManage;
      return (_this$_deps$tabManage = this._deps.tabManager) === null || _this$_deps$tabManage === void 0 ? void 0 : _this$_deps$tabManage.enable;
    }
  }, {
    key: "hasMultipleTabs",
    get: function get() {
      var _this$_deps$tabManage2;
      return (_this$_deps$tabManage2 = this._deps.tabManager) === null || _this$_deps$tabManage2 === void 0 ? void 0 : _this$_deps$tabManage2.hasMultipleTabs;
    }
  }, {
    key: "loginTypeList",
    get: function get() {
      var currentLocale = this._deps.locale.currentLocale;
      return ACCEPTABLE_LOGIN_TYPES.map(function (type) {
        return {
          id: type,
          label: _i18n["default"].getString(type, currentLocale)
        };
      });
    }
  }, {
    key: "inboundQueues",
    get: function get() {
      var _this$_deps$evAuth = this._deps.evAuth,
        agentConfig = _this$_deps$evAuth.agentConfig,
        agentPermissions = _this$_deps$evAuth.agentPermissions;
      if (!agentConfig || !(agentConfig === null || agentConfig === void 0 ? void 0 : agentConfig.inboundSettings) || !(agentPermissions === null || agentPermissions === void 0 ? void 0 : agentPermissions.allowInbound)) {
        return [];
      }
      var _agentConfig$inboundS = agentConfig.inboundSettings.availableQueues,
        availableQueues = _agentConfig$inboundS === void 0 ? [] : _agentConfig$inboundS;
      var isFreshLogin = this._deps.auth.isFreshLogin;
      return availableQueues.map(function (queue) {
        return {
          gateId: queue.gateId,
          gateName: queue.gateName,
          checked: isFreshLogin
        };
      });
    }
  }, {
    key: "defaultSkillProfileId",
    get: function get() {
      var defaultSkill = this._pickSkillProfile(this.skillProfileList);
      return defaultSkill ? defaultSkill.profileId : NONE;
    }
  }, {
    key: "skillProfileList",
    get: function get() {
      var _ref = this._deps.evAuth.agent || {},
        agentConfig = _ref.agentConfig;
      if (!agentConfig || !agentConfig.inboundSettings) {
        return [];
      }
      var _agentConfig$inboundS2 = agentConfig.inboundSettings.availableSkillProfiles,
        availableSkillProfiles = _agentConfig$inboundS2 === void 0 ? [] : _agentConfig$inboundS2;
      var defaultSkill = this._pickSkillProfile(availableSkillProfiles);
      if (!defaultSkill && availableSkillProfiles.length > 0) {
        return [{
          profileId: NONE,
          profileName: _i18n["default"].getString(NONE, this._deps.locale.currentLocale)
        }].concat(_toConsumableArray(availableSkillProfiles));
      }
      return availableSkillProfiles;
    }
  }, {
    key: "selectedSkillProfile",
    get: function get() {
      var _this2 = this;
      var selectedSkillProfile = this.skillProfileList.find(function (profile) {
        return profile.profileId === _this2.formGroup.selectedSkillProfileId;
      });
      return selectedSkillProfile === null || selectedSkillProfile === void 0 ? void 0 : selectedSkillProfile.profileName;
    }
  }, {
    key: "selectedInboundQueues",
    get: function get() {
      var _this3 = this;
      var results = this.formGroup.selectedInboundQueueIds.map(function (id) {
        return _this3.inboundQueues.find(function (queue) {
          return queue.gateId === id;
        });
      });
      return results.filter(function (result) {
        return result;
      }).map(function (result) {
        return result.gateName;
      });
    }
  }, {
    key: "resetAllConfig",
    value: function resetAllConfig() {
      this.selectedInboundQueueIds = [];
      this.selectedSkillProfileId = NONE;
      this.loginType = DEFAULT_LOGIN_TYPE;
      this.extensionNumber = '';
      this.takingCall = true;
      this.autoAnswer = false;
      this.configSuccess = false;
      this.configured = false;
    }
  }, {
    key: "setAccessToken",
    value: function setAccessToken(token) {
      this.accessToken = token;
    }
  }, {
    key: "_setConfigSuccess",
    value: function _setConfigSuccess(status) {
      this.configSuccess = status;
    }
  }, {
    key: "setConfigSuccess",
    value: function setConfigSuccess(status) {
      console.log('setConfigSuccess~', status);
      this.configSuccess = status;
      this.configured = status;
    }
  }, {
    key: "setLoginType",
    value: function setLoginType(type) {
      this.loginType = type;
    }
  }, {
    key: "setSkillProfileId",
    value: function setSkillProfileId(skillProfileId) {
      this.selectedSkillProfileId = skillProfileId;
    }
  }, {
    key: "setInboundQueueIds",
    value: function setInboundQueueIds(ids) {
      this.selectedInboundQueueIds = ids;
    }
  }, {
    key: "setExtensionNumber",
    value: function setExtensionNumber(extensionNumber) {
      this.extensionNumber = extensionNumber;
    }
  }, {
    key: "setTakingCall",
    value: function setTakingCall(takingCall) {
      this.takingCall = takingCall;
    }
  }, {
    key: "setAutoAnswer",
    value: function setAutoAnswer(autoAnswer) {
      this.autoAnswer = autoAnswer;
    }
  }, {
    key: "_setFreshConfig",
    value: function _setFreshConfig() {
      this.loginType = DEFAULT_LOGIN_TYPE;
      this.extensionNumber = '';
      this.takingCall = true;
      this.autoAnswer = this.defaultAutoAnswerOn;
      this.configSuccess = false;
      this.configured = false;
      this.selectedSkillProfileId = this.defaultSkillProfileId;
      if (this._deps.evAuth.agentPermissions.allowInbound) {
        this.selectedInboundQueueIds = this.inboundQueues.map(function (inboundQueue) {
          return inboundQueue.gateId;
        });
      }
    }
  }, {
    key: "setFreshConfig",
    value: function setFreshConfig() {
      this._clearCalls();
      this._setFreshConfig();
    }
  }, {
    key: "defaultAutoAnswerOn",
    get: function get() {
      return this._deps.evAuth.agentPermissions.defaultAutoAnswerOn;
    }
  }, {
    key: "assignFormGroupValue",
    value: function assignFormGroupValue() {
      var _this$formGroup = this.formGroup,
        selectedInboundQueueIds = _this$formGroup.selectedInboundQueueIds,
        extensionNumber = _this$formGroup.extensionNumber,
        loginType = _this$formGroup.loginType,
        selectedSkillProfileId = _this$formGroup.selectedSkillProfileId,
        autoAnswer = _this$formGroup.autoAnswer;
      this.selectedInboundQueueIds = selectedInboundQueueIds;
      this.extensionNumber = extensionNumber;
      this.loginType = loginType;
      this.selectedSkillProfileId = selectedSkillProfileId;
      this.autoAnswer = autoAnswer;
    }
  }, {
    key: "setFormGroup",
    value: function setFormGroup(data) {
      this.formGroup = _objectSpread(_objectSpread({}, this.formGroup), data);
    }
  }, {
    key: "resetFormGroup",
    value: function resetFormGroup() {
      this.setFormGroup({
        selectedInboundQueueIds: this.selectedInboundQueueIds,
        selectedSkillProfileId: this.selectedSkillProfileId,
        loginType: this.loginType,
        extensionNumber: this.extensionNumber,
        autoAnswer: this.autoAnswer
      });
    }
  }, {
    key: "isSessionChanged",
    get: function get() {
      var sessionConfigs = {
        selectedInboundQueueIds: this.selectedInboundQueueIds,
        selectedSkillProfileId: this.selectedSkillProfileId,
        loginType: this.loginType,
        extensionNumber: this.extensionNumber,
        autoAnswer: this.autoAnswer
      };
      return !(0, _ramda.equals)(sessionConfigs, this.formGroup);
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return _superPropGet(EvAgentSession, "_shouldReset", this, 3)([]) && !this._deps.auth.loggedIn;
    }
  }, {
    key: "checkIsMainTabAlive",
    value: function () {
      var _checkIsMainTabAlive = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              return _context2.a(2, this._deps.tabManager.checkIsMainTabAlive());
          }
        }, _callee2, this);
      }));
      function checkIsMainTabAlive() {
        return _checkIsMainTabAlive.apply(this, arguments);
      }
      return checkIsMainTabAlive;
    }()
  }, {
    key: "_setMainTabId",
    value: function _setMainTabId() {
      console.log('_setMainTabId~~~');
      var id = this._deps.tabManager.id;
      this._deps.tabManager.setMainTabId(id);
      this._deps.beforeunload.add(this._mainTabBeforeunloadHandler);
      this._deps.beforeunload.onAfterUnload(this._mainTabAfterUnloadHandler, true);
    }
  }, {
    key: "onInitOnce",
    value: function onInitOnce() {
      var _this4 = this;
      this._init();
      this.onConfigSuccess(function () {
        if (_this4._deps.presence.calls.length === 0) {
          _this4._deps.presence.setDialoutStatus(_enums.dialoutStatuses.idle);
        }
        if (_this4.isAgentUpdating) {
          _this4.isAgentUpdating = false;
        } else {
          console.log('!!!!to Dialer');
          _this4._deps.routerInteraction.push('/dialer');
        }
      });
    }
  }, {
    key: "_tabReConfig",
    value: function () {
      var _tabReConfig2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
        var _this5 = this;
        var _t;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.p = _context4.n) {
            case 0:
              console.log('_tabReConfig~~~', this._isReConfiguring);
              if (!this._isReConfiguring) {
                _context4.n = 1;
                break;
              }
              return _context4.a(2);
            case 1:
              this._isReConfiguring = true;
              if (!this.isIntegratedSoftphone) {
                _context4.n = 6;
                break;
              }
              _context4.p = 2;
              _context4.n = 3;
              return this._deps.block.next(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
                return _regenerator().w(function (_context3) {
                  while (1) switch (_context3.n) {
                    case 0:
                      _context3.n = 1;
                      return _this5.configureAgent({
                        triggerEvent: false
                      });
                    case 1:
                      return _context3.a(2);
                  }
                }, _callee3);
              })));
            case 3:
              _context4.n = 5;
              break;
            case 4:
              _context4.p = 4;
              _t = _context4.v;
              console.error('re config fail', _t);
              this._emitReConfigFail();
              return _context4.a(2);
            case 5:
              _context4.n = 7;
              break;
            case 6:
              this._configWorkingAlive();
            case 7:
              this.isReconnected = true;
              this._mainTabHandle();
              this._configSuccessAlive();
              this._isReConfiguring = false;
            case 8:
              return _context4.a(2);
          }
        }, _callee4, this, [[2, 4]]);
      }));
      function _tabReConfig() {
        return _tabReConfig2.apply(this, arguments);
      }
      return _tabReConfig;
    }() // _newMainTabReConfig and _pollAskIfCanBeNewMainTab are all for handle new main tab
  }, {
    key: "_newMainTabReConfig",
    value: function () {
      var _newMainTabReConfig2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              console.log('_newMainTabReConfig~', !this.isReconnected, this._deps.evAuth.connected, this.configSuccess, this.isMainTab);
              if (!(!this.isReconnected && this._deps.evAuth.connected && this.configSuccess && this.isMainTab)) {
                _context5.n = 1;
                break;
              }
              console.log('_newMainTabReConfig success~');
              _context5.n = 1;
              return this._tabReConfig();
            case 1:
              return _context5.a(2);
          }
        }, _callee5, this);
      }));
      function _newMainTabReConfig() {
        return _newMainTabReConfig2.apply(this, arguments);
      }
      return _newMainTabReConfig;
    }()
  }, {
    key: "_pollAskIfCanBeNewMainTab",
    value: function _pollAskIfCanBeNewMainTab() {
      var _this6 = this;
      console.log('_pollAskIfCanBeNewMainTab~~');
      this._tabConfigSuccess.onLeave(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
        var _t2;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              console.log('_tabReConfig in _pollAskIfCanBeNewMainTab~', _this6._deps.tabManager.isFirstTab, _this6._deps.evAuth.connected, _this6.configSuccess, !_this6._isReConfiguring);
              _t2 = _this6._deps.tabManager.isFirstTab && _this6._deps.evAuth.connected && _this6.configSuccess && !_this6._isReConfiguring;
              if (!_t2) {
                _context6.n = 2;
                break;
              }
              _context6.n = 1;
              return _this6._tabConfigWorking.isLeave();
            case 1:
              _t2 = _context6.v;
            case 2:
              if (!_t2) {
                _context6.n = 4;
                break;
              }
              _context6.n = 3;
              return _this6._tabReConfig();
            case 3:
              _context6.n = 5;
              break;
            case 4:
              if (!_this6.isMainTab) {
                _this6._pollAskIfCanBeNewMainTab();
              }
            case 5:
              return _context6.a(2);
          }
        }, _callee6);
      })), 3000);
    }
  }, {
    key: "isOnLoginSuccess",
    get: function get() {
      return this.ready && this._deps.evAuth.isEvLogged;
    }
  }, {
    key: "_init",
    value: function () {
      var _init2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8() {
        var _this7 = this;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.n) {
            case 0:
              if (!this._isLogin) {
                _context8.n = 1;
                break;
              }
              _context8.n = 1;
              return this.initAgentSession();
            case 1:
              // ! that must call after onInitOnce, because when that is not in init once,
              // ! that configured will some times to be false because storage block
              (0, _core.watch)(this, function () {
                return _this7.isOnLoginSuccess;
              }, /*#__PURE__*/function () {
                var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(isOnLoginSuccess) {
                  return _regenerator().w(function (_context7) {
                    while (1) switch (_context7.n) {
                      case 0:
                        if (!isOnLoginSuccess) {
                          _context7.n = 1;
                          break;
                        }
                        // when that is seconds time get onLoginSuccess
                        console.log('----------onLoginSuccess2');
                        _context7.n = 1;
                        return _this7.initAgentSession();
                      case 1:
                        return _context7.a(2);
                    }
                  }, _callee7);
                }));
                return function (_x) {
                  return _ref4.apply(this, arguments);
                };
              }());
            case 2:
              return _context8.a(2);
          }
        }, _callee8, this);
      }));
      function _init() {
        return _init2.apply(this, arguments);
      }
      return _init;
    }()
  }, {
    key: "initAgentSession",
    value: function () {
      var _initAgentSession2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0() {
        var _this8 = this;
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.n) {
            case 0:
              _context0.n = 1;
              return this._deps.block.next(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9() {
                return _regenerator().w(function (_context9) {
                  while (1) switch (_context9.n) {
                    case 0:
                      _this8._initTabLife();
                      _context9.n = 1;
                      return _this8._initAgentSession();
                    case 1:
                      return _context9.a(2);
                  }
                }, _callee9);
              })));
            case 1:
              return _context0.a(2);
          }
        }, _callee0, this);
      }));
      function initAgentSession() {
        return _initAgentSession2.apply(this, arguments);
      }
      return initAgentSession;
    }()
  }, {
    key: "_initAgentSession",
    value: function () {
      var _initAgentSession3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1() {
        var _t3;
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.p = _context1.n) {
            case 0:
              console.log('_initAgentSession~', this.isAgentUpdating);
              if (!this.isAgentUpdating) {
                _context1.n = 1;
                break;
              }
              return _context1.a(2);
            case 1:
              this._afterLogin();
              console.log('autoconfig~', !this._deps.auth.isFreshLogin, this.configured);
              if (!(this._deps.auth.isFreshLogin === false && this.configured)) {
                _context1.n = 4;
                break;
              }
              _context1.p = 2;
              return _context1.a(2, this._autoConfigureAgent());
            case 3:
              _context1.p = 3;
              _t3 = _context1.v;
              console.error(_t3);
            case 4:
              this.setFreshConfig();
              this.resetFormGroup();
              this._navigateToSessionConfigPage();
            case 5:
              return _context1.a(2);
          }
        }, _callee1, this, [[2, 3]]);
      }));
      function _initAgentSession() {
        return _initAgentSession3.apply(this, arguments);
      }
      return _initAgentSession;
    }()
  }, {
    key: "_navigateToSessionConfigPage",
    value: function _navigateToSessionConfigPage() {
      this._deps.routerInteraction.push('/sessionConfig');
      console.log('to sessionConfig~~');
    }

    // ! also reset in onReset for auth logout by rc
  }, {
    key: "onReset",
    value: function onReset() {
      console.log('onReset in EvAgentSession~~');
      try {
        this._resetAllState();
        this.isAgentUpdating = false;
      } catch (error) {
        // ignore error
      }
    }
  }, {
    key: "_resetAllState",
    value: function _resetAllState() {
      console.log('_resetAllState~~', this.isMainTab);
      if (!this.isAgentUpdating) {
        this.resetAllConfig();
      }
      if (this.isMainTab) {
        this._deps.tabManager.setMainTabId(null);
      }
      this.setConfigSuccess(false);
      this.isReconnected = false;
      this._destroyTabLife();
      this._deps.evCallDataSource.changeCallsLimited(false);
      this._deps.beforeunload.clear();
      this._deps.beforeunload.removeAfterUnloadListener(this._mainTabAfterUnloadHandler);
    }
  }, {
    key: "onStateChange",
    value: function () {
      var _onStateChange = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10() {
        return _regenerator().w(function (_context10) {
          while (1) switch (_context10.n) {
            case 0:
              if (!(this.ready && this.tabManagerEnabled && this._deps.tabManager.ready)) {
                _context10.n = 1;
                break;
              }
              _context10.n = 1;
              return this._checkTabManagerEvent();
            case 1:
              return _context10.a(2);
          }
        }, _callee10, this);
      }));
      function onStateChange() {
        return _onStateChange.apply(this, arguments);
      }
      return onStateChange;
    }()
  }, {
    key: "_checkTabManagerEvent",
    value: function () {
      var _checkTabManagerEvent2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11() {
        var _this9 = this;
        var event, data, _t4, _t5, _t6;
        return _regenerator().w(function (_context11) {
          while (1) switch (_context11.p = _context11.n) {
            case 0:
              event = this._deps.tabManager.event;
              data = event === null || event === void 0 ? void 0 : event.args[0];
              if (!event) {
                _context11.n = 23;
                break;
              }
              _t4 = event.name;
              _context11.n = _t4 === _enums.tabManagerEvents.AGENT_CONFIG_SUCCESS ? 1 : _t4 === _enums.tabManagerEvents.UPDATE_SESSION ? 6 : _t4 === _enums.tabManagerEvents.MAIN_TAB_WILL_UNLOAD ? 7 : _t4 === _enums.tabManagerEvents.SET_MIAN_TAB_ID ? 9 : _t4 === _enums.tabManagerEvents.UPDATE_SESSION_SUCCESS ? 10 : _t4 === _enums.tabManagerEvents.UPDATE_SESSION_SUCCESS_ALERT ? 17 : _t4 === _enums.tabManagerEvents.UPDATE_SESSION_FAIL ? 18 : _t4 === _enums.tabManagerEvents.RELOGIN ? 19 : _t4 === _enums.tabManagerEvents.CONFIGURE_FAIL ? 21 : 22;
              break;
            case 1:
              console.log('_othersTabConfigureAgent from tabManagerEvents.AGENT_CONFIG_SUCCESS~~');
              _context11.p = 2;
              _context11.n = 3;
              return this._othersTabConfigureAgent();
            case 3:
              _context11.n = 5;
              break;
            case 4:
              _context11.p = 4;
              _t5 = _context11.v;
              this._configureFail();
            case 5:
              return _context11.a(3, 23);
            case 6:
              this._updateSessionBlockId = this._deps.block.block();
              this.isAgentUpdating = true;

              // if voiceConnectionChanged
              if (data) {
                this.onceLogoutThenLogin().then(function (loginPromise) {
                  _this9._loginPromise = loginPromise;
                });
              }
              return _context11.a(3, 23);
            case 7:
              console.log('MAIN_TAB_WILL_UNLOAD~~', data === this._deps.tabManager.tabbie.id, this.isMainTab);
              if (!(data === this._deps.tabManager.tabbie.id || this.isMainTab)) {
                _context11.n = 8;
                break;
              }
              _context11.n = 8;
              return this._newMainTabReConfig();
            case 8:
              return _context11.a(3, 23);
            case 9:
              if (this._deps.tabManager.mainTabId !== data) {
                console.log('SET_MIAN_TAB_ID in this tab~');
                this._deps.tabManager.setMainTabIdInThisTab(data);
              }
              return _context11.a(3, 23);
            case 10:
              _context11.p = 10;
              console.log('UPDATE_SESSION_SUCCESS~~', data);
              // if voiceConnectionChanged
              if (!data) {
                _context11.n = 13;
                break;
              }
              this._destroyTabLife();
              this._initTabLife();
              _context11.n = 11;
              return this._loginPromise;
            case 11:
              _context11.n = 12;
              return this._othersTabConfigureAgent();
            case 12:
              _context11.n = 14;
              break;
            case 13:
              this.setConfigSuccess(true);
            case 14:
              this._unblockUpdateSession();
              this.isAgentUpdating = false;
              _context11.n = 16;
              break;
            case 15:
              _context11.p = 15;
              _t6 = _context11.v;
              // when that auto config fail, just reload that tab
              console.log(_t6);
              window.location.reload();
            case 16:
              return _context11.a(3, 23);
            case 17:
              this._showUpdateSuccessAlert();
              return _context11.a(3, 23);
            case 18:
              this._unblockUpdateSession();
              return _context11.a(3, 23);
            case 19:
              _context11.n = 20;
              return this.reLoginAgent({
                isBlock: true,
                alertMessage: _enums.messageTypes.NOT_INBOUND_QUEUE_SELECTED
              });
            case 20:
              return _context11.a(3, 23);
            case 21:
              console.log('other tab be called to invoke _configureFail~~');
              this._configureFail();
              return _context11.a(3, 23);
            case 22:
              return _context11.a(3, 23);
            case 23:
              return _context11.a(2);
          }
        }, _callee11, this, [[10, 15], [2, 4]]);
      }));
      function _checkTabManagerEvent() {
        return _checkTabManagerEvent2.apply(this, arguments);
      }
      return _checkTabManagerEvent;
    }()
  }, {
    key: "_unblockUpdateSession",
    value: function _unblockUpdateSession() {
      this._deps.block.unblock(this._updateSessionBlockId);
    }
  }, {
    key: "_initTabLife",
    value: function _initTabLife() {
      console.log('initTabLife~');
      this._tabConfigWorking.init();
      this._tabConfigSuccess.init();
    }
  }, {
    key: "_destroyTabLife",
    value: function _destroyTabLife() {
      var _this$_tabConfigWorki, _this$_tabConfigSucce2;
      (_this$_tabConfigWorki = this._tabConfigWorking) === null || _this$_tabConfigWorki === void 0 ? void 0 : _this$_tabConfigWorki.destroy();
      (_this$_tabConfigSucce2 = this._tabConfigSuccess) === null || _this$_tabConfigSucce2 === void 0 ? void 0 : _this$_tabConfigSucce2.destroy();
    }
  }, {
    key: "_afterLogin",
    value: function _afterLogin() {
      var _this0 = this;
      // if that is not first login set SessionConfig data again
      if (!this._deps.auth.isFreshLogin) {
        var checkSelectIsInList = this.skillProfileList.some(function (profile) {
          return profile.profileId === _this0.selectedSkillProfileId;
        });
        if (!checkSelectIsInList) {
          this.setSkillProfileId(this.defaultSkillProfileId);
        }

        // check all selected queue is in inboundQueue list
        var checkedInboundQueues = this.selectedInboundQueueIds.reduce(function (result, inboundQueueId) {
          if (_this0.inboundQueues.some(function (inboundQueue) {
            return inboundQueue.gateId === inboundQueueId;
          })) {
            result.push(inboundQueueId);
          }
          return result;
        }, []);
        this.setInboundQueueIds(checkedInboundQueues);
      }
    }
  }, {
    key: "_emitTriggerConfig",
    value: function _emitTriggerConfig() {
      this._eventEmitter.emit(_enums.agentSessionEvents.TRIGGER_CONFIG);
    }
  }, {
    key: "onTriggerConfig",
    value: function onTriggerConfig(callback) {
      this._eventEmitter.on(_enums.agentSessionEvents.TRIGGER_CONFIG, callback);
      return this;
    }
  }, {
    key: "_emitConfigSuccess",
    value: function _emitConfigSuccess() {
      this._eventEmitter.emit(_enums.agentSessionEvents.CONFIG_SUCCESS);
    }
  }, {
    key: "onConfigSuccess",
    value: function onConfigSuccess(callback) {
      this._eventEmitter.on(_enums.agentSessionEvents.CONFIG_SUCCESS, callback);
      return this;
    }
  }, {
    key: "_emitReConfigFail",
    value: function _emitReConfigFail() {
      this._eventEmitter.emit(_enums.agentSessionEvents.RECONFIG_FAIL);
    }
  }, {
    key: "onReConfigFail",
    value: function onReConfigFail(callback) {
      this._eventEmitter.on(_enums.agentSessionEvents.RECONFIG_FAIL, callback);
      return this;
    }
  }, {
    key: "_mainTabHandle",
    value: function _mainTabHandle() {
      console.log('_mainTabHandle~~');
      this._setMainTabId();
      // refresh token prevent get token fail to get sip_info
      this._deps.evClient.getRefreshedToken();
      this._deps.tabManager.emitSetMainTabComplete();
    }
  }, {
    key: "updateAgentConfigs",
    value: function () {
      var _updateAgentConfigs = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12() {
        var agentConfig, agent;
        return _regenerator().w(function (_context12) {
          while (1) switch (_context12.n) {
            case 0:
              _context12.n = 1;
              return this._deps.evClient.getAgentConfig();
            case 1:
              agentConfig = _context12.v;
              agent = _objectSpread(_objectSpread({}, this._deps.evAuth.agent), {}, {
                agentConfig: agentConfig
              });
              this._deps.evAuth.setAgent(agent);
              // !! update agentConfig need before set config success.
              this.setConfigSuccess(true);
            case 2:
              return _context12.a(2);
          }
        }, _callee12, this);
      }));
      function updateAgentConfigs() {
        return _updateAgentConfigs.apply(this, arguments);
      }
      return updateAgentConfigs;
    }()
    /**
     * config agent in session config page
     * @param triggerEvent is that should trigger event, default is true
     */
  }, {
    key: "configureAgent",
    value: (function () {
      var _configureAgent = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13() {
        var _ref6,
          _ref6$config,
          config,
          _ref6$triggerEvent,
          triggerEvent,
          _ref6$needAssignFormG,
          needAssignFormGroupValue,
          connectResult,
          result,
          existingLoginFound,
          _args13 = arguments;
        return _regenerator().w(function (_context13) {
          while (1) switch (_context13.n) {
            case 0:
              _ref6 = _args13.length > 0 && _args13[0] !== undefined ? _args13[0] : {}, _ref6$config = _ref6.config, config = _ref6$config === void 0 ? this._checkFieldsResult(this.formGroup) : _ref6$config, _ref6$triggerEvent = _ref6.triggerEvent, triggerEvent = _ref6$triggerEvent === void 0 ? true : _ref6$triggerEvent, _ref6$needAssignFormG = _ref6.needAssignFormGroupValue, needAssignFormGroupValue = _ref6$needAssignFormG === void 0 ? false : _ref6$needAssignFormG;
              this._configWorkingAlive();
              console.log('configureAgent~~', triggerEvent);
              this._clearCalls();
              _context13.n = 1;
              return this._connectEvServer(config);
            case 1:
              connectResult = _context13.v;
              result = connectResult.result;
              existingLoginFound = connectResult.existingLoginFound; // Session timeout
              // this will occur when stay in session config page for long time
              if (!(result.data.status !== 'SUCCESS')) {
                _context13.n = 4;
                break;
              }
              this._navigateToSessionConfigPage();
              _context13.n = 2;
              return this._deps.evAuth.newReconnect(false);
            case 2:
              if (existingLoginFound) {
                config.isForce = true;
              }
              _context13.n = 3;
              return this._connectEvServer(config);
            case 3:
              result = _context13.v.result;
            case 4:
              this._handleAgentResult({
                config: result.data,
                needAssignFormGroupValue: needAssignFormGroupValue
              });
              if (triggerEvent) {
                this._mainTabHandle();
                this._emitTriggerConfig();
                this._configSuccessAlive();
                this._sendTabManager(_enums.tabManagerEvents.AGENT_CONFIG_SUCCESS);
                this.setConfigSuccess(true);
              }
            case 5:
              return _context13.a(2);
          }
        }, _callee13, this);
      }));
      function configureAgent() {
        return _configureAgent.apply(this, arguments);
      }
      return configureAgent;
    }())
  }, {
    key: "updateAgent",
    value: function () {
      var _updateAgent = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15(voiceConnectionChanged) {
        var _this1 = this;
        var _t7;
        return _regenerator().w(function (_context15) {
          while (1) switch (_context15.p = _context15.n) {
            case 0:
              _context15.p = 0;
              _context15.n = 1;
              return this._deps.block.next(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14() {
                var config, extensionNumberChanged, _yield$_this1$_connec, result;
                return _regenerator().w(function (_context14) {
                  while (1) switch (_context14.n) {
                    case 0:
                      if (voiceConnectionChanged) _this1._configWorkingAlive();
                      config = _this1._checkFieldsResult(_this1.formGroup);
                      _this1._clearCalls();
                      _this1.isAgentUpdating = true;
                      _this1._sendTabManager(_enums.tabManagerEvents.UPDATE_SESSION, voiceConnectionChanged);
                      extensionNumberChanged = _this1.extensionNumber !== _this1.formGroup.extensionNumber;
                      if (!(voiceConnectionChanged || extensionNumberChanged)) {
                        _context14.n = 1;
                        break;
                      }
                      _context14.n = 1;
                      return _this1.reLoginAgent();
                    case 1:
                      config.isForce = true;
                      _context14.n = 2;
                      return _this1._connectEvServer(config);
                    case 2:
                      _yield$_this1$_connec = _context14.v;
                      result = _yield$_this1$_connec.result;
                      _this1._handleAgentResult({
                        config: result.data,
                        isAgentUpdating: true,
                        needAssignFormGroupValue: true
                      });
                      if (voiceConnectionChanged) {
                        _this1._mainTabHandle();
                        _this1._emitTriggerConfig();
                      }
                      _context14.n = 3;
                      return _this1.updateAgentConfigs();
                    case 3:
                      if (voiceConnectionChanged) _this1._configSuccessAlive();

                      // * update session complete, and config ready
                      _this1._sendTabManager(_enums.tabManagerEvents.UPDATE_SESSION_SUCCESS, voiceConnectionChanged);
                      _this1.goToSettingsPage();
                      _this1._sendTabManager(_enums.tabManagerEvents.UPDATE_SESSION_SUCCESS_ALERT);
                      _this1._showUpdateSuccessAlert();
                    case 4:
                      return _context14.a(2);
                  }
                }, _callee14);
              })));
            case 1:
              _context15.n = 3;
              break;
            case 2:
              _context15.p = 2;
              _t7 = _context15.v;
              this._sendTabManager(_enums.tabManagerEvents.UPDATE_SESSION_FAIL);
              this._unblockUpdateSession();
              console.error('error', _t7);
            case 3:
              return _context15.a(2);
          }
        }, _callee15, this, [[0, 2]]);
      }));
      function updateAgent(_x2) {
        return _updateAgent.apply(this, arguments);
      }
      return updateAgent;
    }()
  }, {
    key: "reLoginAgent",
    value: function () {
      var _reLoginAgent = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee17() {
        var _this10 = this;
        var _ref8,
          isBlock,
          alertMessage,
          fn,
          _args17 = arguments;
        return _regenerator().w(function (_context17) {
          while (1) switch (_context17.n) {
            case 0:
              _ref8 = _args17.length > 0 && _args17[0] !== undefined ? _args17[0] : {}, isBlock = _ref8.isBlock, alertMessage = _ref8.alertMessage;
              fn = /*#__PURE__*/function () {
                var _ref9 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16() {
                  var _yield$_this10$_deps$, access_token;
                  return _regenerator().w(function (_context16) {
                    while (1) switch (_context16.n) {
                      case 0:
                        if (alertMessage) {
                          _this10._deps.alert.danger({
                            message: alertMessage,
                            ttl: 0
                          });
                        }
                        _this10._deps.evAuth.sendLogoutTabEvent();
                        _context16.n = 1;
                        return _this10._deps.auth.refreshToken();
                      case 1:
                        _yield$_this10$_deps$ = _context16.v;
                        access_token = _yield$_this10$_deps$.access_token;
                        _this10.setAccessToken(access_token);

                        // * then do logout send to every tab
                        _context16.n = 2;
                        return _this10._deps.evAuth.logoutAgent();
                      case 2:
                        _context16.n = 3;
                        return (0, _utils.sleep)(WAIT_EV_SERVER_ROLLBACK_DELAY);
                      case 3:
                        _context16.n = 4;
                        return _this10._deps.evAuth.loginAgent(_this10.accessToken);
                      case 4:
                        return _context16.a(2);
                    }
                  }, _callee16);
                }));
                return function fn() {
                  return _ref9.apply(this, arguments);
                };
              }();
              return _context17.a(2, isBlock ? this._deps.block.next(fn) : fn());
          }
        }, _callee17, this);
      }));
      function reLoginAgent() {
        return _reLoginAgent.apply(this, arguments);
      }
      return reLoginAgent;
    }()
  }, {
    key: "onceLogoutThenLogin",
    value: function onceLogoutThenLogin() {
      var _this11 = this;
      return new Promise(function (resolve) {
        _this11._deps.evAuth.onceLogout(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee18() {
          return _regenerator().w(function (_context18) {
            while (1) switch (_context18.n) {
              case 0:
                _context18.n = 1;
                return (0, _utils.sleep)(WAIT_EV_SERVER_ROLLBACK_DELAY);
              case 1:
                resolve(_this11._deps.evAuth.loginAgent(_this11.accessToken));
              case 2:
                return _context18.a(2);
            }
          }, _callee18);
        })));
      });
    }
  }, {
    key: "goToSettingsPage",
    value: function goToSettingsPage() {
      this._deps.routerInteraction.push('/settings');
    }
  }, {
    key: "_showUpdateSuccessAlert",
    value: function _showUpdateSuccessAlert() {
      this._deps.alert.success({
        message: _enums.messageTypes.UPDATE_AGENT_SUCCESS
      });
    }
  }, {
    key: "_handleAgentResult",
    value: function _handleAgentResult(_ref1) {
      var _ref1$config = _ref1.config,
        message = _ref1$config.message,
        status = _ref1$config.status,
        isAgentUpdating = _ref1.isAgentUpdating,
        needAssignFormGroupValue = _ref1.needAssignFormGroupValue;
      if (status !== 'SUCCESS') {
        if (typeof message === 'string') {
          this._deps.alert.danger({
            message: _enums.messageTypes.AGENT_CONFIG_DETAIL_ERROR,
            ttl: 0,
            payload: message
          });
        } else {
          this._deps.alert.danger({
            message: isAgentUpdating ? _enums.messageTypes.UPDATE_AGENT_ERROR : _enums.messageTypes.AGENT_CONFIG_ERROR,
            ttl: 0
          });
        }
        throw new Error(message);
      }
      if (needAssignFormGroupValue) {
        this.assignFormGroupValue();
      }
    }
  }, {
    key: "_autoConfigureAgent",
    value: function () {
      var _autoConfigureAgent2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee21() {
        var _this12 = this;
        var isFirstTab, timeoutId, resolves;
        return _regenerator().w(function (_context21) {
          while (1) switch (_context21.n) {
            case 0:
              console.log('_autoConfigureAgent~', this.tabManagerEnabled);
              isFirstTab = this._deps.tabManager.isFirstTab;
              if (!(this._autoConfigureRetryTimes >= 5)) {
                _context21.n = 1;
                break;
              }
              console.log('stop autoConfigureRetry~~', this._autoConfigureRetryTimes);
              this._autoConfigureRetryTimes = 0;
              return _context21.a(2, this._configureFail(isFirstTab));
            case 1:
              timeoutId = null;
              if (!this.tabManagerEnabled) {
                _context21.n = 2;
                break;
              }
              resolves = [null, null, null];
              return _context21.a(2, Promise.race([new Promise(function (res) {
                console.log('res already success~~');
                resolves[0] = function () {
                  return res('already success');
                };
                _this12._eventEmitter.once(_enums.agentSessionEvents.CONFIG_SUCCESS, resolves[0]);
              }), new Promise(function (res) {
                resolves[1] = res;
                // check isSuccess first
                if (_this12.isAgentUpdating || _this12._deps.tabManager.tabs.length !== 1) {
                  var _checkIsAlive = function checkIsAlive() {
                    console.log('checkIsAlive~~');
                    _this12._tabConfigSuccess.isAlive().then(/*#__PURE__*/function () {
                      var _ref10 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee19(result) {
                        return _regenerator().w(function (_context19) {
                          while (1) switch (_context19.n) {
                            case 0:
                              console.log('isAlive ?~', result);
                              if (result) {
                                console.log('res other tab config~~');
                                res('other tab config');
                              } else {
                                _checkIsAlive();
                              }
                            case 1:
                              return _context19.a(2);
                          }
                        }, _callee19);
                      }));
                      return function (_x3) {
                        return _ref10.apply(this, arguments);
                      };
                    }());
                  };
                  _checkIsAlive();
                }
              }), new Promise(function (res) {
                resolves[2] = res;
                // when there is too many tab, that event will block
                // then check local
                if (isFirstTab) {
                  _this12._tabConfigWorking.isLeave().then(/*#__PURE__*/function () {
                    var _ref11 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee20(result) {
                      return _regenerator().w(function (_context20) {
                        while (1) switch (_context20.n) {
                          case 0:
                            console.log('isLeave ?~', result);
                            if (result) {
                              _this12._configWorkingAlive();
                              console.log('res config~~');
                              res('config');
                            }
                          case 1:
                            return _context20.a(2);
                        }
                      }, _callee20);
                    }));
                    return function (_x4) {
                      return _ref11.apply(this, arguments);
                    };
                  }());
                }
              }), new Promise(function (res) {
                timeoutId = setTimeout(function () {
                  res('retry');
                }, 10000);
              })]).then(function (result) {
                clearTimeout(timeoutId);
                _this12._eventEmitter.off(_enums.agentSessionEvents.CONFIG_SUCCESS, resolves[0]);
                console.log('clear all memory with promise~');
                // clear all memory with promise
                resolves.forEach(function (r) {
                  return r();
                });
                resolves.length = 0;
                console.log('!!!!!', result);
                switch (result) {
                  case 'retry':
                    console.log('retry auto config~');
                    _this12._autoConfigureRetryTimes++;
                    return _this12._autoConfigureAgent();
                  case 'other tab config':
                    console.log('_othersTabConfigureAgent in auto config~~');
                    return _this12._othersTabConfigureAgent();
                  case 'config':
                    {
                      console.log('configureAgent in auto config~~');
                      //! when reConfig, if that change queue or others field in ev admin, that will get error, should redirect to sessionPage
                      var config = _this12._checkFieldsResult({
                        selectedInboundQueueIds: _this12.selectedInboundQueueIds,
                        selectedSkillProfileId: _this12.selectedSkillProfileId,
                        loginType: _this12.loginType,
                        extensionNumber: _this12.extensionNumber
                      });
                      return _this12.configureAgent({
                        config: config
                      });
                    }
                  case 'already success':
                  default:
                    return Promise.resolve();
                }
              })["catch"](function (e) {
                console.log('_autoConfigureAgent error~~', e);
                _this12._configureFail(isFirstTab);
                return e;
              }));
            case 2:
              return _context21.a(2, this.configureAgent());
          }
        }, _callee21, this);
      }));
      function _autoConfigureAgent() {
        return _autoConfigureAgent2.apply(this, arguments);
      }
      return _autoConfigureAgent;
    }()
  }, {
    key: "_configureFail",
    value: function _configureFail() {
      var needAsyncAllTabs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      console.log('_configureFail~~', this._deps.tabManager.hasMultipleTabs, needAsyncAllTabs);
      if (this._deps.tabManager.hasMultipleTabs && needAsyncAllTabs) {
        this._sendTabManager(_enums.tabManagerEvents.CONFIGURE_FAIL);
      }
      this._navigateToSessionConfigPage();
      this._setConfigSuccess(false);
    }
  }, {
    key: "_othersTabConfigureAgent",
    value: function () {
      var _othersTabConfigureAgent2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee22() {
        return _regenerator().w(function (_context22) {
          while (1) switch (_context22.n) {
            case 0:
              console.log('_othersTabConfigureAgent~~', this.configSuccess);
              if (!this.configSuccess) {
                _context22.n = 1;
                break;
              }
              return _context22.a(2);
            case 1:
              _context22.n = 2;
              return this._deps.evClient.multiLoginRequest();
            case 2:
              _context22.n = 3;
              return this.updateAgentConfigs();
            case 3:
              if (!this.notInboundQueueSelected) {
                _context22.n = 4;
                break;
              }
              this._sendTabManager(_enums.tabManagerEvents.RELOGIN);
              _context22.n = 4;
              return this.reLoginAgent({
                isBlock: true,
                alertMessage: _enums.messageTypes.NOT_INBOUND_QUEUE_SELECTED
              });
            case 4:
              this._pollAskIfCanBeNewMainTab();
            case 5:
              return _context22.a(2);
          }
        }, _callee22, this);
      }));
      function _othersTabConfigureAgent() {
        return _othersTabConfigureAgent2.apply(this, arguments);
      }
      return _othersTabConfigureAgent;
    }()
  }, {
    key: "_pickSkillProfile",
    value: function _pickSkillProfile(skillProfileList) {
      return skillProfileList.find(function (item) {
        return item.isDefault === '1';
      });
    }
  }, {
    key: "_connectEvServer",
    value: function () {
      var _connectEvServer2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee24(config) {
        var _this13 = this;
        var result, status, existingLoginFound, currentLocale, confirmed;
        return _regenerator().w(function (_context24) {
          while (1) switch (_context24.n) {
            case 0:
              console.log('configure ev agent in _connectEvServer~~', config);
              _context24.n = 1;
              return this._deps.evClient.configureAgent(config);
            case 1:
              result = _context24.v;
              status = result.data.status;
              existingLoginFound = status === _enums.messageTypes.EXISTING_LOGIN_FOUND;
              if (!existingLoginFound) {
                _context24.n = 4;
                break;
              }
              currentLocale = this._deps.locale.currentLocale; // TODO: think about sync up in all tabs?
              _context24.n = 2;
              return this._deps.modalUI.confirm({
                title: _i18n["default"].getString('multipleLoginsTitle', currentLocale),
                content: _i18n["default"].getString('multipleLoginsContent', currentLocale),
                confirmButtonText: _i18n["default"].getString('multipleLoginsConfirm', currentLocale),
                cancelButtonText: _i18n["default"].getString('multipleLoginsCancel', currentLocale),
                onConfirm: function () {
                  var _onConfirm = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee23() {
                    return _regenerator().w(function (_context23) {
                      while (1) switch (_context23.n) {
                        case 0:
                          if (!(_this13._deps.evClient.appStatus === _enums2.evStatus.CLOSED)) {
                            _context23.n = 1;
                            break;
                          }
                          _context23.n = 1;
                          return _this13._deps.evAuth.loginAgent();
                        case 1:
                          _context23.n = 2;
                          return _this13._deps.evClient.configureAgent(_objectSpread(_objectSpread({}, config), {}, {
                            isForce: true
                          }));
                        case 2:
                          result = _context23.v;
                          _this13.isForceLogin = true;
                        case 3:
                          return _context23.a(2);
                      }
                    }, _callee23);
                  }));
                  function onConfirm() {
                    return _onConfirm.apply(this, arguments);
                  }
                  return onConfirm;
                }(),
                childrenSize: 'small'
              }, true);
            case 2:
              confirmed = _context24.v;
              if (confirmed) {
                _context24.n = 3;
                break;
              }
              this.isForceLogin = false;
              throw new Error(status);
            case 3:
              _context24.n = 5;
              break;
            case 4:
              if (!(status === _enums.messageTypes.EXISTING_LOGIN_ENGAGED)) {
                _context24.n = 5;
                break;
              }
              this._deps.alert.danger({
                message: _enums.messageTypes.EXISTING_LOGIN_ENGAGED,
                ttl: 0
              });
              throw new Error(_enums.messageTypes.EXISTING_LOGIN_ENGAGED);
            case 5:
              return _context24.a(2, {
                result: result,
                existingLoginFound: existingLoginFound
              });
          }
        }, _callee24, this);
      }));
      function _connectEvServer(_x5) {
        return _connectEvServer2.apply(this, arguments);
      }
      return _connectEvServer;
    }()
  }, {
    key: "_checkFieldsResult",
    value: function _checkFieldsResult(formGroup) {
      var selectedInboundQueueIds = formGroup.selectedInboundQueueIds,
        selectedSkillProfileId = formGroup.selectedSkillProfileId;
      if (this.notInboundQueueSelected) {
        this._deps.alert.danger({
          message: _enums.messageTypes.NOT_INBOUND_QUEUE_SELECTED,
          ttl: 0
        });
        throw new Error("'queueIds' is an empty array.");
      }
      return {
        dialDest: this._getDialDest(formGroup),
        queueIds: selectedInboundQueueIds,
        skillProfileId: selectedSkillProfileId === NONE ? '' : selectedSkillProfileId
      };
    }
  }, {
    key: "_getDialDest",
    value: function _getDialDest(_ref12) {
      var loginType = _ref12.loginType,
        extensionNumber = _ref12.extensionNumber;
      // Only external phone has number input
      switch (loginType) {
        case _enums.loginTypes.externalPhone:
          {
            if (!extensionNumber) {
              this._deps.alert.danger({
                message: _enums.messageTypes.EMPTY_PHONE_NUMBER,
                ttl: 0
              });
              throw new Error("'extensionNumber' is an empty number.");
            }
            var formatPhoneNumber = (0, _phoneNumber.format)({
              phoneNumber: extensionNumber
            });
            var _parse = (0, _phoneNumber.parse)({
                input: formatPhoneNumber
              }),
              parsedNumber = _parse.parsedNumber,
              isValid = _parse.isValid;
            if (!isValid || !parsedNumber || parsedNumber === '') {
              this._deps.alert.danger({
                message: _enums.messageTypes.INVALID_PHONE_NUMBER,
                ttl: 0
              });
              throw new Error("'extensionNumber' is not a valid number.");
            }
            this.setFormGroup({
              extensionNumber: parsedNumber
            });
            return extensionNumber;
          }
        case _enums.loginTypes.integratedSoftphone:
          return 'integrated';
        case _enums.loginTypes.RC_PHONE:
        default:
          return 'RC_PHONE';
      }
    }
  }, {
    key: "_sendTabManager",
    value: function _sendTabManager(event, value) {
      var _this$_deps$tabManage3;
      (_this$_deps$tabManage3 = this._deps.tabManager) === null || _this$_deps$tabManage3 === void 0 ? void 0 : _this$_deps$tabManage3.send(event, value);
    }
  }, {
    key: "_clearCalls",
    value: function _clearCalls() {
      this._deps.presence.clearCalls();
    }
  }, {
    key: "isMainTab",
    get: function get() {
      return this._deps.tabManager.isMainTab;
    }
  }, {
    key: "notInboundQueueSelected",
    get: function get() {
      return !this._deps.evAuth.agentPermissions.allowInbound || this.formGroup.selectedInboundQueueIds.length === 0;
    }
  }]);
}(_core.RcModuleV2), _applyDecoratedDescriptor(_class2.prototype, "_configSuccessAlive", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "_configSuccessAlive"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_configWorkingAlive", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "_configWorkingAlive"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "selectedSkillProfileId", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return NONE;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "selectedInboundQueueIds", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "loginType", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return DEFAULT_LOGIN_TYPE;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "extensionNumber", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "takingCall", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return true;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "autoAnswer", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "configured", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "configSuccess", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "formGroup", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return DEFAULT_FORM_GROUP;
  }
}), _descriptor0 = _applyDecoratedDescriptor(_class2.prototype, "accessToken", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _applyDecoratedDescriptor(_class2.prototype, "loginTypeList", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "loginTypeList"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "inboundQueues", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "inboundQueues"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "defaultSkillProfileId", [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "defaultSkillProfileId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "skillProfileList", [_dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "skillProfileList"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "selectedSkillProfile", [_dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "selectedSkillProfile"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "selectedInboundQueues", [_dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "selectedInboundQueues"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "resetAllConfig", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "resetAllConfig"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setAccessToken", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setAccessToken"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setConfigSuccess", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setConfigSuccess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setConfigSuccess", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setConfigSuccess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setLoginType", [_dec0, _core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setLoginType"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setSkillProfileId", [_dec1, _core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setSkillProfileId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setInboundQueueIds", [_dec10, _core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setInboundQueueIds"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setExtensionNumber", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setExtensionNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setTakingCall", [_dec11, _core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setTakingCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setAutoAnswer", [_dec12, _core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setAutoAnswer"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setFreshConfig", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setFreshConfig"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "assignFormGroupValue", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "assignFormGroupValue"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setFormGroup", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setFormGroup"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "isSessionChanged", [_dec13], Object.getOwnPropertyDescriptor(_class2.prototype, "isSessionChanged"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setMainTabId", [_dec14], Object.getOwnPropertyDescriptor(_class2.prototype, "_setMainTabId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_pollAskIfCanBeNewMainTab", [_dec15], Object.getOwnPropertyDescriptor(_class2.prototype, "_pollAskIfCanBeNewMainTab"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "isOnLoginSuccess", [_dec16], Object.getOwnPropertyDescriptor(_class2.prototype, "isOnLoginSuccess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_initTabLife", [_dec17], Object.getOwnPropertyDescriptor(_class2.prototype, "_initTabLife"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_destroyTabLife", [_dec18], Object.getOwnPropertyDescriptor(_class2.prototype, "_destroyTabLife"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "configureAgent", [_dec19], Object.getOwnPropertyDescriptor(_class2.prototype, "configureAgent"), _class2.prototype), _class2)) || _class);
//# sourceMappingURL=EvAgentSession.js.map
