"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.object.get-own-property-descriptor");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HeaderViewUI = void 0;
var _di = require("@ringcentral-integration/commons/lib/di");
var _core = require("@ringcentral-integration/core");
var _dec, _dec2, _dec3, _dec4, _class, _class2;
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
    value: function getUIFunctions(_) {
      var _this = this;
      return {
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
