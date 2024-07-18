"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConnectivityBadgeUI = void 0;
var _module = _interopRequireDefault(require("@ringcentral-integration/commons/lib/di/decorators/module"));
var _core = require("@ringcentral-integration/core");
var _dec, _class;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
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
var ConnectivityBadgeUI = (_dec = (0, _module["default"])({
  name: 'ConnectivityBadgeUI',
  deps: ['Locale', 'ConnectivityManager', {
    dep: 'ConnectivityBadgeUIOptions',
    optional: true
  }]
}), _dec(_class = /*#__PURE__*/function (_RcUIModuleV) {
  _inherits(ConnectivityBadgeUI, _RcUIModuleV);
  var _super = _createSuper(ConnectivityBadgeUI);
  function ConnectivityBadgeUI(deps) {
    _classCallCheck(this, ConnectivityBadgeUI);
    return _super.call(this, {
      deps: deps
    });
  }
  _createClass(ConnectivityBadgeUI, [{
    key: "getUIProps",
    value: function getUIProps() {
      return {
        currentLocale: this._deps.locale.currentLocale,
        // @ts-expect-error TS(2322): Type 'string | null' is not assignable to type 'st... Remove this comment to see the full error message
        mode: this._deps.connectivityManager.ready && this._deps.connectivityManager.mode || null,
        webphoneConnecting: this._deps.connectivityManager.ready && this._deps.connectivityManager.webphoneConnecting,
        hasLimitedStatusError: this._deps.connectivityManager.ready && this._deps.connectivityManager.hasLimitedStatusError
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions() {
      var _this = this;
      return {
        onClick: function onClick() {
          if (_this._deps.connectivityManager.isWebphoneUnavailableMode) {
            _this._deps.connectivityManager.checkWebphoneAndConnect();
          } else if (_this._deps.connectivityManager.hasLimitedStatusError) {
            _this._deps.connectivityManager.checkStatus();
          } else {
            _this._deps.connectivityManager.showConnectivityAlert();
          }
        },
        showBadgeAlert: function showBadgeAlert() {
          _this._deps.connectivityManager.showConnectivityAlert();
        }
      };
    }
  }]);
  return ConnectivityBadgeUI;
}(_core.RcUIModuleV2)) || _class);
exports.ConnectivityBadgeUI = ConnectivityBadgeUI;
//# sourceMappingURL=ConnectivityBadgeUI.js.map
