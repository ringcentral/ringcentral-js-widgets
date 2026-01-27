"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConnectivityBadgeView = void 0;
var _services = require("@ringcentral-integration/micro-core/src/app/services");
var _nextCore = require("@ringcentral-integration/next-core");
var _ConnectivityBadge = _interopRequireDefault(require("@ringcentral-integration/widgets/components/ConnectivityBadge"));
var _react = _interopRequireWildcard(require("react"));
var _services2 = require("../../services");
var _dec, _dec2, _dec3, _dec4, _class;
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
/**
 * View module for displaying connectivity status as a badge
 * Shows different icons and colors based on connectivity state
 *
 * @class
 */
var ConnectivityBadgeView = exports.ConnectivityBadgeView = (_dec = (0, _nextCore.injectable)({
  name: 'ConnectivityBadgeView'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)('ConnectivityBadgeViewOptions')(target, undefined, 2);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _services.Locale === "undefined" ? Object : _services.Locale, typeof _services2.ConnectivityManager === "undefined" ? Object : _services2.ConnectivityManager, typeof ConnectivityBadgeViewOptions === "undefined" ? Object : ConnectivityBadgeViewOptions]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = /*#__PURE__*/function (_RcViewModule) {
  function ConnectivityBadgeView(_locale, _connectivityManager, _connectivityBadgeViewOptions) {
    var _this;
    _classCallCheck(this, ConnectivityBadgeView);
    _this = _callSuper(this, ConnectivityBadgeView);
    _this._locale = _locale;
    _this._connectivityManager = _connectivityManager;
    _this._connectivityBadgeViewOptions = _connectivityBadgeViewOptions;
    return _this;
  }
  _inherits(ConnectivityBadgeView, _RcViewModule);
  return _createClass(ConnectivityBadgeView, [{
    key: "getUIProps",
    value: function getUIProps() {
      var mode = this._connectivityManager.ready && this._connectivityManager.mode || null;
      return {
        currentLocale: this._locale.currentLocale,
        // @ts-ignore in old version we need to use connectivityTypes-xxx for pass into the old version ConnectivityBadge
        mode: mode ? "connectivityTypes-".concat(mode) : null,
        webphoneConnecting: this._connectivityManager.ready && this._connectivityManager.webphoneConnecting,
        hasLimitedStatusError: this._connectivityManager.ready && this._connectivityManager.hasLimitedStatusError
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions() {
      var _this2 = this;
      return {
        onClick: function onClick() {
          if (_this2._connectivityManager.isWebphoneUnavailableMode) {
            _this2._connectivityManager.checkWebphoneAndConnect();
          } else if (_this2._connectivityManager.hasLimitedStatusError) {
            _this2._connectivityManager.checkStatus();
          } else {
            _this2._connectivityManager.showConnectivityToast();
          }
        },
        showBadgeAlert: function showBadgeAlert() {
          _this2._connectivityManager.showConnectivityToast();
        }
      };
    }

    /**
     * Renders the connectivity badge component with appropriate status indicators
     *
     * @param {object} props - Props for the component
     * @returns {React.ReactNode} Rendered component
     */
  }, {
    key: "component",
    value: function component(props) {
      var _this3 = this,
        _this$_connectivityBa;
      var _useRef = (0, _react.useRef)(this.getUIFunctions()),
        uiFunctions = _useRef.current;
      var _props = (0, _nextCore.useConnector)(function () {
        var uiProps = _this3.getUIProps();
        return _objectSpread(_objectSpread({}, props), uiProps);
      });
      var Component = ((_this$_connectivityBa = this._connectivityBadgeViewOptions) === null || _this$_connectivityBa === void 0 ? void 0 : _this$_connectivityBa.component) || _ConnectivityBadge["default"];
      return /*#__PURE__*/_react["default"].createElement(Component, _extends({}, _props, uiFunctions));
    }
  }]);
}(_nextCore.RcViewModule)) || _class) || _class) || _class) || _class);
//# sourceMappingURL=ConnectivityBadge.view.js.map
