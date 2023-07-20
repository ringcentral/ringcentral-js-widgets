"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoginUI = void 0;
var _di = require("@ringcentral-integration/commons/lib/di");
var _Auth = require("@ringcentral-integration/commons/modules/Auth");
var _core = require("@ringcentral-integration/core");
var _dec, _class;
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
var LoginUI = (_dec = (0, _di.Module)({
  name: 'LoginUI',
  deps: ['Auth', 'ConnectivityMonitor', 'Locale', 'OAuth', 'RateLimiter', {
    dep: 'LoginUIOptions',
    optional: true
  }]
}), _dec(_class = /*#__PURE__*/function (_RcUIModuleV) {
  _inherits(LoginUI, _RcUIModuleV);
  var _super = _createSuper(LoginUI);
  function LoginUI(deps) {
    _classCallCheck(this, LoginUI);
    return _super.call(this, {
      deps: deps
    });
  }
  _createClass(LoginUI, [{
    key: "getUIProps",
    value: function getUIProps(props) {
      return {
        currentLocale: this._deps.locale.currentLocale,
        disabled: !this._deps.oAuth.oAuthReady || this._deps.rateLimiter.throttling || !this._deps.connectivityMonitor.connectivity,
        showSpinner: !this._deps.auth.ready || this._deps.auth.loginStatus === _Auth.loginStatus.loggingIn || this._deps.auth.loginStatus === _Auth.loginStatus.loggingOut || this._deps.auth.loginStatus === _Auth.loginStatus.beforeLogout || this._deps.auth.loginStatus === _Auth.loginStatus.loggedIn
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions() {
      var _this = this;
      return {
        onLoginButtonClick: function onLoginButtonClick() {
          _this._deps.oAuth.openOAuthPage();
        }
      };
    }
  }]);
  return LoginUI;
}(_core.RcUIModuleV2)) || _class);
exports.LoginUI = LoginUI;
//# sourceMappingURL=LoginUI.js.map
