"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBrandedIntegrationConsoleEndpoint = exports.AutoCallLoggingSwitchView = void 0;
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.string.replace.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/web.url.js");
require("core-js/modules/web.url.to-json.js");
require("core-js/modules/web.url-search-params.js");
var _trackEvents = require("@ringcentral-integration/commons/enums/trackEvents");
var _services = require("@ringcentral-integration/micro-auth/src/app/services");
var _services2 = require("@ringcentral-integration/micro-core/src/app/services");
var _views = require("@ringcentral-integration/micro-core/src/app/views");
var _nextCore = require("@ringcentral-integration/next-core");
var _react = _interopRequireDefault(require("react"));
var _services3 = require("../../../services");
var _AutoCallLoggingSwitchLineItem = require("./AutoCallLoggingSwitch/AutoCallLoggingSwitchLineItem");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2;
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
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
var getBrandedIntegrationConsoleEndpoint = exports.getBrandedIntegrationConsoleEndpoint = function getBrandedIntegrationConsoleEndpoint(integrationConsoleEndpoint, brandConfig) {
  if (brandConfig.code !== 'rc' && brandConfig.code !== 'att') {
    var url = new URL(integrationConsoleEndpoint);
    url.searchParams.set('brandId', brandConfig.id);
    var href = url.toString();
    // Remove the root trailing slash only when it sits right before the query string
    // e.g. https://example.com/?a=b -> https://example.com?a=b
    var normalized = href.replace('/?', '?');
    return normalized;
  }
  return integrationConsoleEndpoint;
};
var AutoCallLoggingSwitchView = exports.AutoCallLoggingSwitchView = (_dec = (0, _nextCore.injectable)({
  name: 'AutoCallLoggingSwitchView'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.inject)('AalOptions')(target, undefined, 3);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _services2.Brand === "undefined" ? Object : _services2.Brand, typeof _nextCore.RouterPlugin === "undefined" ? Object : _nextCore.RouterPlugin, typeof _services2.Theme === "undefined" ? Object : _services2.Theme, typeof AALOptions === "undefined" ? Object : AALOptions, typeof _services3.IntegrationConfig === "undefined" ? Object : _services3.IntegrationConfig]), _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (_class2 = /*#__PURE__*/function (_RcViewModule) {
  function AutoCallLoggingSwitchView(_brand, _router, _theme, _aalOptions, _integrationConfig) {
    var _this;
    _classCallCheck(this, AutoCallLoggingSwitchView);
    _this = _callSuper(this, AutoCallLoggingSwitchView);
    _this._brand = _brand;
    _this._router = _router;
    _this._theme = _theme;
    _this._aalOptions = _aalOptions;
    _this._integrationConfig = _integrationConfig;
    return _this;
  }
  _inherits(AutoCallLoggingSwitchView, _RcViewModule);
  return _createClass(AutoCallLoggingSwitchView, [{
    key: "handleAutoCallLogSettingLinkClick",
    value: function handleAutoCallLogSettingLinkClick() {
      var _this2 = this;
      var isAdmin = !!this._aalOptions.isAdmin;
      var remoteAutoLogEnabled = !!this._aalOptions.remoteAutoLog;
      var trackProps = {
        CRM: this._integrationConfig.name
      };

      // when server side AAL is enabled, open the external link if the user is admin, otherwise go to the auto log settings page
      var openExternalLink = remoteAutoLogEnabled ? isAdmin : true;
      if (openExternalLink) {
        (0, _services.trackEvent)(_trackEvents.trackEvents.clickOnIntegrationConsole, trackProps);
        var link = remoteAutoLogEnabled || isAdmin ? this.aalEndpointWithBrandId : this._aalOptions.endUserGuideLink;
        window.open(link, '_blank');
      } else {
        (0, _services.trackEvent)(_trackEvents.trackEvents.clickOnTryEnhancedCallLogLink, trackProps);
        (0, _views.slideInViewTransition)(function () {
          return _this2._router.push('/settings/autoCallLogSettings');
        }, this._theme.reducedMotion);
      }
    }
  }, {
    key: "aalEndpointWithBrandId",
    get: function get() {
      return getBrandedIntegrationConsoleEndpoint(this._aalOptions.endpoint, this._brand.brandConfig);
    }
  }, {
    key: "getUIProps",
    value: function getUIProps() {
      return {
        featureEnabled: this._aalOptions.featureEnabled,
        isAdmin: !!this._aalOptions.isAdmin,
        localAutoLog: !!this._aalOptions.localAutoLog,
        remoteAutoLog: !!this._aalOptions.remoteAutoLog,
        disableAutoLogControl: !!this._aalOptions.disableAutoLogControl
      };
    }
  }, {
    key: "component",
    value: function component(props) {
      var _this3 = this;
      var _props = (0, _nextCore.useConnector)(function () {
        return _objectSpread(_objectSpread({}, _this3.getUIProps()), props);
      });
      return /*#__PURE__*/_react["default"].createElement(_AutoCallLoggingSwitchLineItem.AutoCallLoggingSwitchLineItem, _extends({}, _props, {
        onChange: this._aalOptions.onLocalAutoLogChange,
        onAutoCallLogSettingLinkClick: function onAutoCallLogSettingLinkClick() {
          return _this3.handleAutoCallLogSettingLinkClick();
        }
      }));
    }
  }]);
}(_nextCore.RcViewModule), _applyDecoratedDescriptor(_class2.prototype, "aalEndpointWithBrandId", [_nextCore.computed, _dec5, _dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "aalEndpointWithBrandId"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class);
//# sourceMappingURL=AutoCallLoggingSwitch.view.js.map
