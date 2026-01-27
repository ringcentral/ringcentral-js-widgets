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
exports.SimpleCallControlView = void 0;
require("core-js/modules/es.function.name.js");
var _callDirections = _interopRequireDefault(require("@ringcentral-integration/commons/enums/callDirections"));
var _services = require("@ringcentral-integration/micro-auth/src/app/services");
var _services2 = require("@ringcentral-integration/micro-core/src/app/services");
var _nextCore = require("@ringcentral-integration/next-core");
var _SimpleCallControlPanel = require("@ringcentral-integration/widgets/components/SimpleCallControlPanel");
var _i18n = require("@ringcentral-integration/widgets/components/SimpleCallControlPanel/i18n");
var _utils = require("@ringcentral-integration/widgets/components/SimpleCallControlPanel/utils");
var _react = _interopRequireWildcard(require("react"));
var _reactRouter = require("react-router");
var _services3 = require("../../services");
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
var SimpleCallControlView = exports.SimpleCallControlView = (_dec = (0, _nextCore.injectable)({
  name: 'SimpleCallControlView'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)('SimpleCallControlViewOptions')(target, undefined, 6);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _services2.Locale === "undefined" ? Object : _services2.Locale, typeof _nextCore.RouterPlugin === "undefined" ? Object : _nextCore.RouterPlugin, typeof _services2.Brand === "undefined" ? Object : _services2.Brand, typeof _services.RegionSettings === "undefined" ? Object : _services.RegionSettings, typeof _services3.ActiveCallControl === "undefined" ? Object : _services3.ActiveCallControl, typeof _services.AccountInfo === "undefined" ? Object : _services.AccountInfo, typeof SimpleCallControlViewOptions === "undefined" ? Object : SimpleCallControlViewOptions]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = /*#__PURE__*/function (_RcViewModule) {
  function SimpleCallControlView(_locale, _router, _brand, _regionSettings, _activeCallControl, _accountInfo, _simpleCallControlViewOptions) {
    var _this;
    _classCallCheck(this, SimpleCallControlView);
    _this = _callSuper(this, SimpleCallControlView);
    _this._locale = _locale;
    _this._router = _router;
    _this._brand = _brand;
    _this._regionSettings = _regionSettings;
    _this._activeCallControl = _activeCallControl;
    _this._accountInfo = _accountInfo;
    _this._simpleCallControlViewOptions = _simpleCallControlViewOptions;
    _this.params = {};
    return _this;
  }
  _inherits(SimpleCallControlView, _RcViewModule);
  return _createClass(SimpleCallControlView, [{
    key: "sessionId",
    get: function get() {
      return this.params.sessionId;
    }
  }, {
    key: "getUIProps",
    value: function getUIProps(_ref) {
      var renderContactName = _ref.renderContactName;
      var activeSession = this._activeCallControl.getActiveSession(this.sessionId);
      var fallBackName = '';
      var phoneNumber = '';
      var nameMatches = [];
      if (renderContactName) {
        var contactName = renderContactName({
          sessionId: activeSession === null || activeSession === void 0 ? void 0 : activeSession.sessionId,
          telephonySessionId: this.sessionId
        });
        var _pickFallBackInfo = (0, _utils.pickFallBackInfo)(activeSession, contactName, this._locale.currentLocale),
          fallBackNameFromThirdParty = _pickFallBackInfo.fallBackName,
          fallBackNumber = _pickFallBackInfo.fallBackNumber;
        phoneNumber = fallBackNumber;
        fallBackName = fallBackNameFromThirdParty;
      } else if (activeSession) {
        phoneNumber = activeSession.direction === _callDirections["default"].outbound ? activeSession.to : activeSession.from;
        if (!renderContactName) {
          var _ref2;
          nameMatches = (_ref2 = activeSession.direction === _callDirections["default"].outbound ? activeSession.toMatches : activeSession.fromMatches) !== null && _ref2 !== void 0 ? _ref2 : [];
        }
        fallBackName = (0, _i18n.t)('Unknown');
      }
      return {
        currentLocale: this._locale.currentLocale,
        activeSession: activeSession,
        sessionId: this.sessionId,
        areaCode: this._regionSettings.areaCode,
        countryCode: this._regionSettings.countryCode,
        nameMatches: nameMatches,
        phoneNumber: phoneNumber,
        fallBackName: fallBackName,
        brandName: this._brand.name,
        controlBusy: this._activeCallControl.busy,
        maxExtensionNumberLength: this._accountInfo.maxExtensionNumberLength
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions() {
      var _this2 = this;
      return {
        onBackButtonClick: function onBackButtonClick() {
          _this2._router.goBack();
        },
        onTransfer: function onTransfer() {
          var sessionId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this2.sessionId;
          _this2._router.push("/transfer/".concat(sessionId, "/active"));
        },
        onMute: function onMute() {
          return _this2._activeCallControl.mute(_this2.sessionId);
        },
        onUnmute: function onUnmute() {
          return _this2._activeCallControl.unmute(_this2.sessionId);
        },
        onHold: function onHold() {
          return _this2._activeCallControl.hold(_this2.sessionId);
        },
        onUnhold: function onUnhold() {
          return _this2._activeCallControl.unhold(_this2.sessionId);
        },
        onHangup: function onHangup() {
          return _this2._activeCallControl.hangUp(_this2.sessionId);
        }
      };
    }
  }, {
    key: "component",
    value: function component(props) {
      var _this3 = this,
        _this$_simpleCallCont;
      this.params = (0, _reactRouter.useParams)();
      var _useRef = (0, _react.useRef)(this.getUIFunctions()),
        uiFunctions = _useRef.current;
      var _props = (0, _nextCore.useConnector)(function () {
        var uiProps = _this3.getUIProps(props);
        return _objectSpread(_objectSpread({}, props), uiProps);
      });
      var Component = ((_this$_simpleCallCont = this._simpleCallControlViewOptions) === null || _this$_simpleCallCont === void 0 ? void 0 : _this$_simpleCallCont.component) || _SimpleCallControlPanel.SimpleCallControlPanel;
      return /*#__PURE__*/_react["default"].createElement(Component, _extends({}, _props, uiFunctions));
    }
  }]);
}(_nextCore.RcViewModule)) || _class) || _class) || _class) || _class);
//# sourceMappingURL=SimpleCallControl.view.js.map
