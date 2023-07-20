"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.object.get-own-property-descriptor");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DialerAndCallsTabUI = void 0;
var _di = require("@ringcentral-integration/commons/lib/di");
var _core = require("@ringcentral-integration/core");
var _hasActiveCalls = require("../../lib/hasActiveCalls");
var _i18n = _interopRequireDefault(require("./i18n"));
var _dec, _dec2, _class, _class2;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
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
var DialerAndCallsTabUI = (_dec = (0, _di.Module)({
  name: 'DialerAndCallsTabUI',
  deps: ['Locale', 'RouterInteraction', 'CallingSettings', {
    dep: 'Webphone',
    optional: true
  }, {
    dep: 'CallMonitor',
    optional: true
  }, {
    dep: 'DialerAndCallsTabUIOptions',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (that) {
  return [that._deps.locale.currentLocale, that._deps.routerInteraction.currentPath];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcUIModuleV) {
  _inherits(DialerAndCallsTabUI, _RcUIModuleV);
  var _super = _createSuper(DialerAndCallsTabUI);
  function DialerAndCallsTabUI(deps) {
    _classCallCheck(this, DialerAndCallsTabUI);
    return _super.call(this, {
      deps: deps
    });
  }
  _createClass(DialerAndCallsTabUI, [{
    key: "getUIProps",
    value: function getUIProps(props) {
      return {
        showTabs: props.hasActiveCalls ? props.hasActiveCalls({
          callingSettings: this._deps.callingSettings,
          webphone: this._deps.webphone,
          callMonitor: this._deps.callMonitor
        }) : (0, _hasActiveCalls.hasActiveCalls)({
          callingSettings: this._deps.callingSettings,
          webphone: this._deps.webphone,
          callMonitor: this._deps.callMonitor
        }),
        showSpinner: !this._deps.locale.ready,
        tabs: this.tabs
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(props) {
      var _this = this;
      return {
        goTo: function goTo(path) {
          _this._deps.routerInteraction.push(path);
        }
      };
    }
  }, {
    key: "tabs",
    get: function get() {
      var _this2 = this;
      return [{
        path: '/dialer',
        label: _i18n["default"].getString('dialer', this._deps.locale.currentLocale),
        dataSign: 'dialer',
        isActive: function isActive() {
          return _this2._deps.routerInteraction.currentPath === '/dialer';
        }
      }, {
        path: '/calls',
        label: _i18n["default"].getString('allCalls', this._deps.locale.currentLocale),
        dataSign: 'allCalls',
        isActive: function isActive() {
          return _this2._deps.routerInteraction.currentPath === '/calls';
        }
      }];
    }
  }]);
  return DialerAndCallsTabUI;
}(_core.RcUIModuleV2), (_applyDecoratedDescriptor(_class2.prototype, "tabs", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "tabs"), _class2.prototype)), _class2)) || _class);
exports.DialerAndCallsTabUI = DialerAndCallsTabUI;
//# sourceMappingURL=DialerAndCallsTabUI.js.map
