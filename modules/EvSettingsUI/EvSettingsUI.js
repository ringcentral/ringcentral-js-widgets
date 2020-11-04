"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EvSettingsUI = void 0;

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.function.name");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.is-array");

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

require("core-js/modules/es6.regexp.split");

var _core = require("@ringcentral-integration/core");

var _moment = _interopRequireDefault(require("moment"));

var _di = require("ringcentral-integration/lib/di");

var _FormatPhoneNumber = require("../../lib/FormatPhoneNumber");

var _i18n = _interopRequireDefault(require("./i18n"));

var _dec, _dec2, _class, _class2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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
      return {
        currentLocale: this._deps.locale.currentLocale,
        version: this._deps.version,
        agentName: this.agentName,
        userName: this._deps.evAuth.agent.agentConfig.agentSettings.username,
        sessionInfo: this.sessionInfo,
        disableEditSessionButton: this._deps.evCallMonitor.isOnCall || this._deps.evSettings.isOffhooking || this._deps.evSettings.isOffhook
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
          _this$_deps$evAuth$in2;

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
      var loginTime = (0, _moment["default"])(loginDTS).format('M/DD/YY h:mm A');

      var getLocalString = function getLocalString(name) {
        return _i18n["default"].getString(name, _this2._deps.locale.currentLocale);
      };

      var profileName = (_this$_deps$evAuth$in = (_this$_deps$evAuth$in2 = this._deps.evAuth.inboundSettings.skillProfile) === null || _this$_deps$evAuth$in2 === void 0 ? void 0 : _this$_deps$evAuth$in2.profileName) !== null && _this$_deps$evAuth$in !== void 0 ? _this$_deps$evAuth$in : getLocalString('noneSkillProfile');
      return [{
        label: getLocalString(LOGIN_TYPE[type]),
        value: formatedPhoneNumber
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
