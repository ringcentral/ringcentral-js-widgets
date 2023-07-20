"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.object.get-own-property-descriptor");
require("core-js/modules/es.regexp.exec");
require("core-js/modules/es.string.split");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EvSettingsUI = void 0;
var _dayjs = _interopRequireDefault(require("dayjs"));
var _di = require("@ringcentral-integration/commons/lib/di");
var _core = require("@ringcentral-integration/core");
var _FormatPhoneNumber = require("../../lib/FormatPhoneNumber");
var _i18n = _interopRequireDefault(require("./i18n"));
var _dec, _dec2, _class, _class2;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
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
