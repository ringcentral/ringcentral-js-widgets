"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.object.get-own-property-descriptor");
require("core-js/modules/es.regexp.exec");
require("core-js/modules/es.string.split");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EvSettingsUI = void 0;
var _di = require("@ringcentral-integration/commons/lib/di");
var _core = require("@ringcentral-integration/core");
var _dayjs = _interopRequireDefault(require("dayjs"));
var _FormatPhoneNumber = require("../../lib/FormatPhoneNumber");
var _i18n = _interopRequireDefault(require("./i18n"));
var _dec, _dec2, _class, _class2;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) { ; } } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
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
var LOGIN_TYPE = {
  RC_PHONE: 'ringCentralPhone',
  RC_SOFTPHONE: 'integratedPhone',
  RC_EXTERNAL: 'externalPhone'
};
var EvSettingsUI = (_dec = (0, _di.Module)({
  name: 'EvSettingsUI',
  deps: ['EvClient', 'Locale', 'RouterInteraction', 'EvAuth', 'EvSettings', 'Version', 'EvCallMonitor', 'EvAgentSession']
}), _dec2 = (0, _core.computed)(function (that) {
  return [that._deps.locale.currentLocale, that._deps.evAuth.agentSettings.loginDTS, that._deps.evAuth.agentSettings.loginType, that._deps.evAuth.agentSettings.dialDest, that._deps.evAuth.inboundSettings.skillProfile];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcUIModuleV) {
  _inherits(EvSettingsUI, _RcUIModuleV);
  var _super = _createSuper(EvSettingsUI);
  function EvSettingsUI(deps) {
    _classCallCheck(this, EvSettingsUI);
    return _super.call(this, {
      deps: deps
    });
  }
  _createClass(EvSettingsUI, [{
    key: "goToSessionUpdatePage",
    value: function goToSessionUpdatePage() {
      this._deps.evAgentSession.resetFormGroup();
      this._deps.routerInteraction.push('/sessionUpdate');
    }
  }, {
    key: "getUIProps",
    value: function getUIProps() {
      var _this$_deps$evAuth = this._deps.evAuth,
        agentSettings = _this$_deps$evAuth.agentSettings,
        agentPermissions = _this$_deps$evAuth.agentPermissions;
      return {
        currentLocale: this._deps.locale.currentLocale,
        version: this._deps.version,
        agentName: this.agentName,
        userName: agentSettings.username,
        sessionInfo: this.sessionInfo,
        // pendingdisposition?
        disableEditSessionButton: this._deps.evCallMonitor.isOnCall || this._deps.evSettings.isOffhooking || this._deps.evSettings.isOffhook,
        showEditSessionIcon: agentPermissions.allowLoginUpdates
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions() {
      var _this = this;
      return {
        onLogout: function onLogout() {
          return _this._deps.evAuth.logout();
        },
        goToSessionUpdatePage: function goToSessionUpdatePage() {
          return _this.goToSessionUpdatePage();
        }
      };
    }
  }, {
    key: "sessionInfo",
    get: function get() {
      var _this2 = this,
        _this$_deps$evAuth$in,
        _this$_deps$evAuth$in2,
        _LOGIN_TYPE;
      var _this$_deps$evAuth$ag = this._deps.evAuth.agentSettings,
        loginDTS = _this$_deps$evAuth$ag.loginDTS,
        loginType = _this$_deps$evAuth$ag.loginType,
        dialDest = _this$_deps$evAuth$ag.dialDest;
      var _dialDest$split = dialDest.split('@'),
        _dialDest$split2 = _slicedToArray(_dialDest$split, 2),
        phoneNumber = _dialDest$split2[0],
        _dialDest$split2$ = _dialDest$split2[1],
        type = _dialDest$split2$ === void 0 ? 'RC_EXTERNAL' : _dialDest$split2$; // TODO: find that why reponse empty phoneNumber by accident
      var formatedPhoneNumber = (0, _FormatPhoneNumber.formatPhoneNumber)({
        phoneNumber: phoneNumber,
        currentLocale: this._deps.locale.currentLocale
      });
      var loginTime = (0, _dayjs["default"])(loginDTS).format('M/DD/YY h:mm A');
      var getLocalString = function getLocalString(name) {
        return _i18n["default"].getString(name, _this2._deps.locale.currentLocale);
      };
      var profileName = (_this$_deps$evAuth$in = (_this$_deps$evAuth$in2 = this._deps.evAuth.inboundSettings.skillProfile) === null || _this$_deps$evAuth$in2 === void 0 ? void 0 : _this$_deps$evAuth$in2.profileName) !== null && _this$_deps$evAuth$in !== void 0 ? _this$_deps$evAuth$in : getLocalString('noneSkillProfile');
      return [{
        label: getLocalString((_LOGIN_TYPE = LOGIN_TYPE[type]) !== null && _LOGIN_TYPE !== void 0 ? _LOGIN_TYPE : 'integratedPhone'),
        value: LOGIN_TYPE[type] ? formatedPhoneNumber : dialDest
      }, {
        label: getLocalString('loginStyle'),
        value: loginType
      }, {
        label: getLocalString('loginTime'),
        value: loginTime
      }, {
        label: getLocalString('skillProfile'),
        value: profileName
      }];
    }
  }, {
    key: "agentName",
    get: function get() {
      var _this$_deps$evAuth$ag2 = this._deps.evAuth.agent.agentConfig.agentSettings,
        firstName = _this$_deps$evAuth$ag2.firstName,
        lastName = _this$_deps$evAuth$ag2.lastName;
      if (!firstName && !lastName) {
        return null;
      }
      return "".concat(firstName, " ").concat(lastName);
    }
  }]);
  return EvSettingsUI;
}(_core.RcUIModuleV2), (_applyDecoratedDescriptor(_class2.prototype, "sessionInfo", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "sessionInfo"), _class2.prototype)), _class2)) || _class);
exports.EvSettingsUI = EvSettingsUI;
//# sourceMappingURL=EvSettingsUI.js.map
