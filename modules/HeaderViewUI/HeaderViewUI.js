"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.object.get-own-property-descriptor");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HeaderViewUI = void 0;
var _di = require("@ringcentral-integration/commons/lib/di");
var _core = require("@ringcentral-integration/core");
var _dec, _dec2, _dec3, _dec4, _class, _class2;
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
var HeaderViewUI = (_dec = (0, _di.Module)({
  name: 'HeaderViewUI',
  deps: ['Auth', 'CallMonitor', 'RouterInteraction', 'Locale', 'Webphone', 'Presence', {
    dep: 'UserGuide',
    optional: true
  }, {
    dep: 'QuickAccess',
    optional: true
  }, {
    dep: 'Brand',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (that) {
  return [that._deps.callMonitor.activeRingCalls];
}), _dec3 = (0, _core.computed)(function (that) {
  return [that._deps.callMonitor.activeOnHoldCalls];
}), _dec4 = (0, _core.computed)(function (that) {
  return [that._deps.callMonitor.activeCurrentCalls];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcUIModuleV) {
  _inherits(HeaderViewUI, _RcUIModuleV);
  var _super = _createSuper(HeaderViewUI);
  function HeaderViewUI(deps) {
    _classCallCheck(this, HeaderViewUI);
    return _super.call(this, {
      deps: deps
    });
  }
  _createClass(HeaderViewUI, [{
    key: "getUIProps",
    value: function getUIProps(_ref) {
      var _this$_deps$brand, _this$_deps$brand$bra;
      var standAlone = _ref.standAlone;
      var logoUrl = (_this$_deps$brand = this._deps.brand) === null || _this$_deps$brand === void 0 ? void 0 : (_this$_deps$brand$bra = _this$_deps$brand.brandConfig.assets) === null || _this$_deps$brand$bra === void 0 ? void 0 : _this$_deps$brand$bra.logo;
      return {
        standAlone: standAlone,
        logoUrl: logoUrl,
        userStatus: this._deps.auth.loggedIn && this._deps.presence.userStatus || undefined,
        dndStatus: this._deps.auth.loggedIn && this._deps.presence.dndStatus || undefined,
        ringingCalls: this.ringingCalls,
        onHoldCalls: this.onHoldCalls,
        currentCalls: this.currentCalls,
        currentPath: this._deps.routerInteraction.currentPath,
        currentLocale: this._deps.locale.currentLocale,
        activeSessionId: this._deps.webphone.activeSessionId || '',
        incomingCallPageMinimized: !this._deps.webphone.ringSession || this._deps.webphone.ringSession.minimized,
        presenceReady: this._deps.presence.ready
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(_ref2) {
      var _this = this;
      var logo = _ref2.logo;
      return {
        logo: logo,
        onCurrentCallBtnClick: function onCurrentCallBtnClick() {
          if (_this._deps.routerInteraction.currentPath !== '/calls/active') {
            _this._deps.routerInteraction.push('/calls/active');
          }
          if (_this._deps.userGuide) {
            _this._deps.userGuide.dismiss();
          }
          if (_this._deps.quickAccess) {
            _this._deps.quickAccess.exit();
          }
          // TODO: need to replace webphone with Webphone
          if (_this._deps.webphone && _this._deps.webphone.ringSession && !_this._deps.webphone.ringSession.minimized) {
            _this._deps.webphone.toggleMinimized(_this._deps.webphone.ringSession.id);
          }
        },
        onViewCallBtnClick: function onViewCallBtnClick() {
          if (_this._deps.routerInteraction.currentPath !== '/calls') {
            _this._deps.routerInteraction.push('/calls');
          }
          if (_this._deps.userGuide) {
            _this._deps.userGuide.dismiss();
          }
          if (_this._deps.quickAccess) {
            _this._deps.quickAccess.exit();
          }
          if (_this._deps.webphone && _this._deps.webphone.ringSession && !_this._deps.webphone.ringSession.minimized) {
            _this._deps.webphone.toggleMinimized(_this._deps.webphone.ringSession.id);
          }
        },
        setAvailable: function setAvailable() {
          return _this._deps.presence && _this._deps.presence.setAvailable();
        },
        setBusy: function setBusy() {
          return _this._deps.presence && _this._deps.presence.setBusy();
        },
        setDoNotDisturb: function setDoNotDisturb() {
          return _this._deps.presence && _this._deps.presence.setDoNotDisturb();
        },
        setInvisible: function setInvisible() {
          return _this._deps.presence && _this._deps.presence.setInvisible();
        }
      };
    }
  }, {
    key: "ringingCalls",
    get: function get() {
      var _this$_deps$callMonit;
      return (_this$_deps$callMonit = this._deps.callMonitor.activeRingCalls) !== null && _this$_deps$callMonit !== void 0 ? _this$_deps$callMonit : [];
    }
  }, {
    key: "onHoldCalls",
    get: function get() {
      var _this$_deps$callMonit2;
      return (_this$_deps$callMonit2 = this._deps.callMonitor.activeOnHoldCalls) !== null && _this$_deps$callMonit2 !== void 0 ? _this$_deps$callMonit2 : [];
    }
  }, {
    key: "currentCalls",
    get: function get() {
      var _this$_deps$callMonit3;
      return (_this$_deps$callMonit3 = this._deps.callMonitor.activeCurrentCalls) !== null && _this$_deps$callMonit3 !== void 0 ? _this$_deps$callMonit3 : [];
    }
  }]);
  return HeaderViewUI;
}(_core.RcUIModuleV2), (_applyDecoratedDescriptor(_class2.prototype, "ringingCalls", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "ringingCalls"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "onHoldCalls", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "onHoldCalls"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "currentCalls", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "currentCalls"), _class2.prototype)), _class2)) || _class);
exports.HeaderViewUI = HeaderViewUI;
//# sourceMappingURL=HeaderViewUI.js.map
